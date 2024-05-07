import { createClient } from "@supabase/supabase-js";

const supabase_url = import.meta.env.VITE_APP_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_APP_SUPABASE_KEY;
const service_role_key = import.meta.env.VITE_APP_SERVICE_ROLE_KEY;

export const supabase = createClient(supabase_url, supabaseKey);

export async function createSupabaseAdmin() {
  return createClient(supabase_url, service_role_key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function createSupabaseServerClient() {
  return createClient(supabase_url, service_role_key);
}