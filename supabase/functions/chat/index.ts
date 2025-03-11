
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabaseClient } from "../_shared/supabase-client.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simplified agent capability - executing predefined tools
const executeAgentTool = async (toolName: string, params: any) => {
  switch (toolName) {
    case 'search_transactions':
      // This would connect to a database to search transactions
      return `Transaction information: Found records for ${params.query}`;
    
    case 'get_reservation_data':
      // This would fetch reservation data
      return `Reservation data for ${params.date || 'this month'}: Occupancy rate is 78%`;
    
    case 'calculate_revenue':
      // This would calculate revenue based on transaction data
      return `Revenue calculation: ¥${Math.floor(Math.random() * 1000000)} for the requested period`;
    
    default:
      return null;
  }
};

// Function to detect if a message contains a tool request
const detectToolRequest = (message: string): { toolName: string, params: any } | null => {
  // Simple keyword-based detection for demo purposes
  if (message.includes('予約状況') || message.includes('reservation')) {
    return {
      toolName: 'get_reservation_data',
      params: { date: 'current' }
    };
  }
  
  if (message.includes('取引') || message.includes('transaction') || message.includes('トランザクション')) {
    return {
      toolName: 'search_transactions',
      params: { query: 'recent' }
    };
  }
  
  if (message.includes('収益') || message.includes('売上') || message.includes('revenue')) {
    return {
      toolName: 'calculate_revenue',
      params: { period: 'monthly' }
    };
  }
  
  return null;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationId, includeContext = true, agentMode = false } = await req.json();
    
    if (!message) {
      throw new Error('Message is required');
    }

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('Missing OpenAI API key');
    }

    const supabase = supabaseClient(req);
    
    // Get user ID from auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('Authentication required');
    }
    
    // Create conversation if not provided
    let activeConversationId = conversationId;
    if (!activeConversationId) {
      const { data: newConversation, error: conversationError } = await supabase
        .from('conversations')
        .insert({
          user_id: user.id,
          title: message.substring(0, 50) + (message.length > 50 ? '...' : '')
        })
        .select('id')
        .single();
      
      if (conversationError) {
        throw conversationError;
      }
      
      activeConversationId = newConversation.id;
    }
    
    // Save user message
    const { error: messageError } = await supabase
      .from('messages')
      .insert({
        conversation_id: activeConversationId,
        role: 'user',
        content: message
      });
    
    if (messageError) {
      throw messageError;
    }
    
    // Generate embeddings for the query
    const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: message
      })
    });

    if (!embeddingResponse.ok) {
      const error = await embeddingResponse.json();
      throw new Error(`OpenAI embedding API error: ${error.error?.message || 'Unknown error'}`);
    }

    const { data: embeddingData } = await embeddingResponse.json();
    const embedding = embeddingData[0].embedding;
    
    // Retrieve relevant documents if context is requested
    let contextText = '';
    if (includeContext) {
      const { data: documents, error: searchError } = await supabase.rpc(
        'match_documents',
        {
          query_embedding: embedding,
          match_threshold: 0.7,
          match_count: 5
        }
      );
      
      if (searchError) {
        throw searchError;
      }
      
      if (documents && documents.length > 0) {
        contextText = 'Relevant information:\n' + 
          documents.map(doc => doc.content).join('\n\n');
      }
    }
    
    // Handle agent capabilities if enabled
    let agentResponse = '';
    if (agentMode) {
      const toolRequest = detectToolRequest(message);
      if (toolRequest) {
        agentResponse = await executeAgentTool(toolRequest.toolName, toolRequest.params);
      }
    }
    
    // Prepare conversation history
    const { data: messageHistory, error: historyError } = await supabase
      .from('messages')
      .select('role, content')
      .eq('conversation_id', activeConversationId)
      .order('created_at', { ascending: true })
      .limit(10);
    
    if (historyError) {
      throw historyError;
    }
    
    // Prepare the prompt with system message, context, and history
    const systemContent = `あなたは「シュンスケの旅」というAI駆動開発ハッカソンの専門アシスタントです。ホテル・旅館業界の課題解決や、AIを活用したビジネス改善について詳しく、丁寧かつ実用的な回答を日本語で提供してください。${contextText ? '\n\n' + contextText : ''}`;
    
    // Add agent information if available
    const messages = [
      {
        role: 'system',
        content: agentResponse 
          ? `${systemContent}\n\nI've retrieved some information that might be helpful: ${agentResponse}` 
          : systemContent
      },
      ...messageHistory
    ];
    
    // Call OpenAI chat API
    const chatResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.7,
        max_tokens: 800
      })
    });

    if (!chatResponse.ok) {
      const error = await chatResponse.json();
      throw new Error(`OpenAI chat API error: ${error.error?.message || 'Unknown error'}`);
    }

    const completion = await chatResponse.json();
    const aiResponse = completion.choices[0].message.content;
    
    // Save AI response
    const { error: aiMessageError } = await supabase
      .from('messages')
      .insert({
        conversation_id: activeConversationId,
        role: 'assistant',
        content: aiResponse
      });
    
    if (aiMessageError) {
      throw aiMessageError;
    }
    
    return new Response(
      JSON.stringify({ 
        message: aiResponse, 
        conversationId: activeConversationId 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
