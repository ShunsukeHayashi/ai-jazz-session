
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabaseClient } from "../_shared/supabase-client.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Agent system with enhanced capabilities
interface AgentTool {
  name: string;
  description: string;
  execute: (params: Record<string, any>) => Promise<string>;
}

// Define advanced agent tools with specific capabilities
const agentTools: AgentTool[] = [
  {
    name: 'search_transactions',
    description: 'Search for transaction records in the database',
    execute: async (params) => {
      const query = params.query || 'recent';
      const limit = params.limit || 5;
      
      // In a real implementation, this would connect to a database
      // For now simulating response for demo purposes
      const sampleData = [
        { id: '001', date: '2024-07-10', amount: '¥15,800', guest: '田中様', status: '確定' },
        { id: '002', date: '2024-07-11', amount: '¥24,500', guest: '佐藤様', status: '確定' },
        { id: '003', date: '2024-07-12', amount: '¥18,300', guest: '鈴木様', status: 'キャンセル' }
      ];
      
      return `Transaction information (${query}, showing ${limit} records):
${sampleData.map(tx => `- ID: ${tx.id}, Date: ${tx.date}, Amount: ${tx.amount}, Guest: ${tx.guest}, Status: ${tx.status}`).join('\n')}`;
    }
  },
  {
    name: 'get_reservation_data',
    description: 'Retrieve reservation data and statistics',
    execute: async (params) => {
      const period = params.period || 'current';
      const date = params.date || '今月';
      
      // In a real implementation, this would fetch actual reservation data
      // For now returning static data for demo purposes
      const occupancyRate = period === 'weekend' ? '92%' : '78%';
      const avgStay = '2.3泊';
      const cancellationRate = '5.2%';
      
      return `${date}の予約状況:
- 客室稼働率: ${occupancyRate}
- 平均宿泊日数: ${avgStay}
- キャンセル率: ${cancellationRate}
- 最も予約の多い部屋タイプ: 和洋室スイート`;
    }
  },
  {
    name: 'calculate_revenue',
    description: 'Calculate revenue metrics based on transaction data',
    execute: async (params) => {
      const period = params.period || 'monthly';
      
      // In a real implementation, this would calculate based on actual transaction data
      // For now generating sample data for demo purposes
      const revenue = Math.floor(Math.random() * 1000000) + 5000000;
      const formattedRevenue = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(revenue);
      
      let trend = '';
      const trendPercentage = (Math.random() * 10 + 2).toFixed(1);
      if (Math.random() > 0.5) {
        trend = `前年同期比 ${trendPercentage}%増`;
      } else {
        trend = `前年同期比 ${trendPercentage}%減`;
      }
      
      return `${period === 'yearly' ? '年間' : '月間'}収益分析:
- 総売上: ${formattedRevenue}
- ${trend}
- 客室単価: ${new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(Math.floor(Math.random() * 5000) + 15000)}
- RevPAR: ${new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(Math.floor(Math.random() * 4000) + 12000)}`;
    }
  },
  {
    name: 'analyze_guest_feedback',
    description: 'Analyze guest feedback and reviews',
    execute: async (params) => {
      const category = params.category || 'all';
      
      // In a real implementation, this would analyze actual guest reviews
      // For now returning simulated analysis results
      return `顧客フィードバック分析 (${category}):
- 総合満足度: 4.7/5.0
- 最も評価の高い項目: 接客サービス (4.9/5.0)
- 改善が求められる項目: Wi-Fi接続 (3.8/5.0)
- 最近のトレンド: 朝食メニューの多様性に関するポジティブなコメントが増加中`;
    }
  }
];

// Enhanced tool request detection with more specific pattern matching
const detectToolRequest = (message: string): { toolName: string, params: Record<string, any> } | null => {
  // More sophisticated matching patterns
  const patterns = [
    {
      tool: 'search_transactions',
      patterns: [
        { regex: /取引|トランザクション|予約.*(?:履歴|確認|検索|リスト)/i, params: { query: 'recent' } },
        { regex: /予約.*(?:キャンセル|変更)/i, params: { query: 'cancellations' } },
        { regex: /transaction|booking.*(?:history|record|list)/i, params: { query: 'all' } }
      ]
    },
    {
      tool: 'get_reservation_data',
      patterns: [
        { regex: /(?:予約|部屋|客室).*(?:状況|空き|空室|稼働率)/i, params: { period: 'current' } },
        { regex: /(?:週末|土日).*(?:予約|空室|稼働)/i, params: { period: 'weekend' } },
        { regex: /(?:reservation|occupancy|booking).*(?:rate|status)/i, params: { period: 'current' } }
      ]
    },
    {
      tool: 'calculate_revenue',
      patterns: [
        { regex: /(?:売上|収益|収入|利益).*(?:計算|分析|予測|レポート)/i, params: { period: 'monthly' } },
        { regex: /(?:年間|去年|昨年).*(?:売上|収益|収入)/i, params: { period: 'yearly' } },
        { regex: /(?:revenue|profit|income).*(?:analysis|report)/i, params: { period: 'monthly' } }
      ]
    },
    {
      tool: 'analyze_guest_feedback',
      patterns: [
        { regex: /(?:客|顧客|ゲスト).*(?:フィードバック|評価|レビュー|口コミ)/i, params: { category: 'all' } },
        { regex: /(?:サービス|料理|食事|部屋|施設).*(?:評価|レビュー|評判)/i, params: { category: 'service' } },
        { regex: /(?:feedback|review|rating).*(?:analysis|guest)/i, params: { category: 'all' } }
      ]
    }
  ];
  
  // Check each tool's patterns for a match
  for (const toolDef of patterns) {
    for (const pattern of toolDef.patterns) {
      if (pattern.regex.test(message)) {
        return {
          toolName: toolDef.tool,
          params: pattern.params
        };
      }
    }
  }
  
  return null;
};

// Execute a tool by name with given parameters
const executeAgentTool = async (toolName: string, params: Record<string, any>): Promise<string> => {
  const tool = agentTools.find(t => t.name === toolName);
  
  if (tool) {
    try {
      return await tool.execute(params);
    } catch (error) {
      console.error(`Error executing tool ${toolName}:`, error);
      return `Error executing ${toolName}: ${error.message}`;
    }
  }
  
  return null;
};

serve(async (req) => {
  console.log("Chat function received request");
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const requestData = await req.json();
    console.log("Request data:", JSON.stringify(requestData));
    
    const { message, conversationId, includeContext = true, agentMode = false } = requestData;
    
    if (!message) {
      throw new Error('Message is required');
    }

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('Missing OpenAI API key');
    }

    console.log("Creating Supabase client");
    const supabase = supabaseClient(req);
    
    // Get user ID - anonymously if not authenticated
    const { data: { user } } = await supabase.auth.getUser();
    // Use a default anonymous user ID if not authenticated
    const userId = user?.id || 'anonymous-user';
    console.log("User ID:", userId);
    
    // Create conversation if not provided
    let activeConversationId = conversationId;
    if (!activeConversationId) {
      console.log("Creating new conversation");
      const { data: newConversation, error: conversationError } = await supabase
        .from('conversations')
        .insert({
          user_id: userId,
          title: message.substring(0, 50) + (message.length > 50 ? '...' : '')
        })
        .select('id')
        .single();
      
      if (conversationError) {
        console.error("Error creating conversation:", conversationError);
        throw new Error(`Conversation creation failed: ${conversationError.message}`);
      }
      
      activeConversationId = newConversation.id;
      console.log("Created conversation with ID:", activeConversationId);
    }
    
    // Save user message
    console.log("Saving user message to conversation:", activeConversationId);
    const { error: messageError } = await supabase
      .from('messages')
      .insert({
        conversation_id: activeConversationId,
        role: 'user',
        content: message
      });
    
    if (messageError) {
      console.error("Error saving message:", messageError);
      throw new Error(`Message saving failed: ${messageError.message}`);
    }
    
    // Generate embeddings for the query
    console.log("Generating embeddings");
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
      console.error("Embedding API error:", error);
      throw new Error(`OpenAI embedding API error: ${error.error?.message || 'Unknown error'}`);
    }

    const { data: embeddingData } = await embeddingResponse.json();
    const embedding = embeddingData[0].embedding;
    
    // Retrieve relevant documents if context is requested
    let contextText = '';
    if (includeContext) {
      console.log("Retrieving context from documents");
      const { data: documents, error: searchError } = await supabase.rpc(
        'match_documents',
        {
          query_embedding: embedding,
          match_threshold: 0.7,
          match_count: 5
        }
      );
      
      if (searchError) {
        console.error("Error matching documents:", searchError);
        // Don't throw here, continue without context
        console.log("Continuing without document context");
      } else if (documents && documents.length > 0) {
        contextText = 'Relevant information:\n' + 
          documents.map(doc => doc.content).join('\n\n');
        console.log("Found relevant documents:", documents.length);
      } else {
        console.log("No relevant documents found");
      }
    }
    
    // Handle agent capabilities if enabled
    let agentResponse = '';
    if (agentMode) {
      console.log("Agent mode enabled, detecting tool requests in:", message);
      const toolRequest = detectToolRequest(message);
      if (toolRequest) {
        console.log(`Tool request detected: ${toolRequest.toolName}`, toolRequest.params);
        const toolResult = await executeAgentTool(toolRequest.toolName, toolRequest.params);
        if (toolResult) {
          agentResponse = toolResult;
          console.log("Tool execution result:", agentResponse);
        }
      } else {
        console.log("No specific tool request detected");
      }
    }
    
    // Prepare conversation history
    console.log("Retrieving message history");
    const { data: messageHistory, error: historyError } = await supabase
      .from('messages')
      .select('role, content')
      .eq('conversation_id', activeConversationId)
      .order('created_at', { ascending: true })
      .limit(10);
    
    if (historyError) {
      console.error("Error retrieving message history:", historyError);
      // Don't throw here, continue with empty history
      console.log("Continuing with empty conversation history");
    }
    
    // Prepare the prompt with system message, context, and history
    const systemContent = `あなたは「シュンスケの旅」というAI駆動開発ハッカソンの専門アシスタントです。ホテル・旅館業界の課題解決や、AIを活用したビジネス改善について詳しく、丁寧かつ実用的な回答を日本語で提供してください。${contextText ? '\n\n' + contextText : ''}`;
    
    // Add agent information if available
    const messages = [
      {
        role: 'system',
        content: agentResponse 
          ? `${systemContent}\n\nユーザーの質問に関連して以下の情報を取得しました：\n${agentResponse}` 
          : systemContent
      }
    ];
    
    // Add conversation history if available
    if (messageHistory && messageHistory.length > 0) {
      messages.push(...messageHistory);
    }
    
    console.log("Calling OpenAI API");
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
      console.error("OpenAI chat API error:", error);
      throw new Error(`OpenAI chat API error: ${error.error?.message || 'Unknown error'}`);
    }

    const completion = await chatResponse.json();
    const aiResponse = completion.choices[0].message.content;
    console.log("Received AI response");
    
    // Save AI response
    console.log("Saving AI response to database");
    const { error: aiMessageError } = await supabase
      .from('messages')
      .insert({
        conversation_id: activeConversationId,
        role: 'assistant',
        content: aiResponse
      });
    
    if (aiMessageError) {
      console.error("Error saving AI response:", aiMessageError);
      // Continue even if there's an error saving the response
      console.log("Continuing despite error saving AI response");
    }
    
    console.log("Returning successful response");
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
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
