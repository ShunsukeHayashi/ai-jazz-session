
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

export const supabaseClient = (req: Request) => {
  // Get the authorization header from the request if available
  const authHeader = req.headers.get('Authorization');
  const supabaseUrl = Deno.env.get('SUPABASE_URL') || 'https://zrjbqubkctepwgntxqft.supabase.co';
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyamJxdWJrY3RlcHdnbnR4cWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2NzE0MzUsImV4cCI6MjA1NzI0NzQzNX0.PERD0l6LW2IXiJ0fKb7rP5A8cH62clPF4_w4fVZeEPI';
  
  // Create client options with authorization header only if it exists
  const options = authHeader 
    ? {
        global: {
          headers: {
            Authorization: authHeader,
          },
        },
      } 
    : {};
  
  return createClient(supabaseUrl, supabaseAnonKey, options);
};
