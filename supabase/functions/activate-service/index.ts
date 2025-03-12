import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabaseClient } from "../_shared/supabase-client.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { conversationId } = await req.json();
    
    const supabase = supabaseClient(req);
    
    // Create a new conversation if one doesn't exist
    let activeConversationId = conversationId;
    
    if (!activeConversationId) {
      console.log("Creating new conversation for service activation");
      const { data: newConversation, error: conversationError } = await supabase
        .from('conversations')
        .insert({
          user_id: 'anonymous-user',
          title: 'AIジャズセッション'
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
    
    // Add a welcome message to the conversation
    const welcomeMessage = `AIジャズセッションサービスへようこそ！

このサービスでは、AIを活用した旅館・ホテルの業務改善について質問やご相談ができます。以下のような内容についてお気軽にお尋ねください：

• 予約管理の効率化
• 客室稼働率の最適化
• 顧客データ分析
• レコメンデーションシステム
• チャットボットによる自動応答
• エネルギー使用の最適化
• 在庫管理の効率化
• 従業員スケジュール最適化

どのようなご質問でもお気軽にどうぞ。`;
    
    // Save welcome message
    const { error: messageError } = await supabase
      .from('messages')
      .insert({
        conversation_id: activeConversationId,
        role: 'assistant',
        content: welcomeMessage
      });
    
    if (messageError) {
      console.error("Error saving welcome message:", messageError);
      throw new Error(`Message saving failed: ${messageError.message}`);
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        conversationId: activeConversationId 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in activate-service:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
