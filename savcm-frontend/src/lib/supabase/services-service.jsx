import { createSupabaseAdmin, createSupabaseServerClient } from "./create";

let supabaseAdmin;
let supabaseServer;

(async function initializeClients() {
  supabaseAdmin = await createSupabaseAdmin();
  supabaseServer = await createSupabaseServerClient();
})();

export async function getServices() {
  const supabase = supabaseServer;
  const { data, error } = await supabase.from("service").select("*");
  if (error) {
    return JSON.stringify(error);
  } else {
    return JSON.stringify(data);
  }
}
