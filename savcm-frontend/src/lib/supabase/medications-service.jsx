import { createSupabaseAdmin, createSupabaseServerClient } from "./create";
import { getUserSession } from "./session";

let supabaseAdmin;
let supabaseServer;

(async function initializeClients() {
  supabaseAdmin = await createSupabaseAdmin();
  supabaseServer = await createSupabaseServerClient();
})();
