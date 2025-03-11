
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
    const { documents } = await req.json();
    
    if (!documents || !Array.isArray(documents) || documents.length === 0) {
      throw new Error('Invalid documents format');
    }

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('Missing OpenAI API key');
    }

    const supabase = supabaseClient(req);

    // Process each document to generate embeddings
    const processedDocs = [];
    for (const doc of documents) {
      const { content, metadata } = doc;
      
      // Call OpenAI embedding API
      const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'text-embedding-3-small',
          input: content
        })
      });

      if (!embeddingResponse.ok) {
        const error = await embeddingResponse.json();
        console.error('OpenAI API error:', error);
        throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
      }

      const { data } = await embeddingResponse.json();
      const embedding = data[0].embedding;

      // Store document and embedding in Supabase
      const { data: insertedDoc, error } = await supabase
        .from('documents')
        .insert({
          content,
          embedding,
          metadata: metadata || {}
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
    console.error('Error in generate-embeddings:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
