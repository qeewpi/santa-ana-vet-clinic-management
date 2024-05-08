import { createSupabaseAdmin, createSupabaseServerClient } from "./create";
import { getUserSession } from "./session";

let supabaseAdmin;
let supabaseServer;

(async function initializeClients() {
  supabaseAdmin = await createSupabaseAdmin();
  supabaseServer = await createSupabaseServerClient();
})();

export async function getMedications() {
  const supabase = supabaseServer;
  const { data, error } = await supabase.from("medication").select("*");
  if (error) {
    return JSON.stringify(error);
  } else {
    return JSON.stringify(data);
  }
}
