
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabaseClient } from "../_shared/supabase-client.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const hackathonDocuments = [
  {
    content: `「シュンスケの旅」はホテル・旅館業界向けのAI駆動開発ハッカソンです。2ヶ月に1回、全国の宿泊施設で開催され、AIを活用して実際の業務課題を解決します。参加費は1人5万円で、30名限定です。宿泊・食事込みの充実したサービスが提供されます。`,
    metadata: { type: 'overview' }
  },
  {
    content: `AIハッカソンの参加プラン詳細: 参加費は1人5万円（30名限定）、ホテル・旅館でのリアルな課題解決に取り組みます。プロによるAI駆動開発の指導があり、宿泊・食事込みのサービスが含まれます。開催は2ヶ月に1回で、カレンダーから日程を選択できます。お支払い方法はSquare、銀行振込、現金払いから選択可能です。`,
    metadata: { type: 'pricing' }
  },
  {
    content: `AIハッカソンの会場となるホテル・旅館は、宿泊や飲食の提供だけで参加可能です。特別な予算は必要なく、AI駆動開発によって業務課題の解決をお約束します。施設としての応募も歓迎しています。`,
    metadata: { type: 'venue' }
  },
  {
    content: `AIハッカソンでは、予約管理の効率化、客室稼働率の最適化、顧客データ分析、レコメンデーションシステムの構築、チャットボットによる自動応答、エネルギー使用の最適化、在庫管理の効率化、従業員スケジュール最適化などの課題に取り組みます。`,
    metadata: { type: 'use_cases' }
  },
  {
    content: `AIを活用した旅館業務の改善例: 予約キャンセルの予測と対策、繁閑期に合わせた動的価格設定、顧客の好みを学習するレコメンデーションシステム、多言語対応の自動チャットサポート、顧客レビュー分析による施設改善点の特定、食材在庫の最適化と廃棄ロスの削減など。`,
    metadata: { type: 'ai_benefits' }
  }
];

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('Missing OpenAI API key');
    }

    const supabase = supabaseClient(req);
    
    // Check if documents already exist
    const { count, error: countError } = await supabase
      .from('documents')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      throw countError;
    }
    
    // Skip if documents already exist
    if (count && count > 0) {
      return new Response(
        JSON.stringify({ success: true, message: 'Documents already exist, skipping seeding' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Process each document to generate embeddings
    const processedDocs = [];
    for (const doc of hackathonDocuments) {
      // Call OpenAI embedding API
      const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'text-embedding-3-small',
          input: doc.content
        })
      });

      if (!embeddingResponse.ok) {
        const error = await embeddingResponse.json();
        throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
      }

      const { data } = await embeddingResponse.json();
      const embedding = data[0].embedding;

      // Store document and embedding in Supabase
      const { data: insertedDoc, error } = await supabase
        .from('documents')
        .insert({
          content: doc.content,
          embedding,
          metadata: doc.metadata
        })
        .select();

      if (error) {
        throw error;
      }

      processedDocs.push(insertedDoc[0]);
    }

    return new Response(
      JSON.stringify({ success: true, count: processedDocs.length }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in seed-documents:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
