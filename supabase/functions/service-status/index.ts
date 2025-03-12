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
    
    // Check if the service is active for this conversation
    // In a real implementation, this would check a service_status table
    // For now, we'll simulate by checking if the conversation exists and has messages
    
    let isActive = false;
    
    if (conversationId) {
      // Check if conversation exists
      const { data: conversation, error: conversationError } = await supabase
        .from('conversations')
        .select('id')
        .eq('id', conversationId)
        .single();
      
      if (conversationError) {
        throw new Error(`Error checking conversation: ${conversationError.message}`);
      }
      
      if (conversation) {
        // Check if conversation has messages
        const { count, error: countError } = await supabase
          .from('messages')
          .select('*', { count: 'exact', head: true })
          .eq('conversation_id', conversationId);
        
        if (countError) {
          throw new Error(`Error checking messages: ${countError.message}`);
        }
        
        // If there are messages, the service is active
        isActive = count !== null && count > 0;
      }
    }
    
    return new Response(
      JSON.stringify({ active: isActive }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in service-status:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
