import { createSupabaseAdmin, createSupabaseServerClient } from "./create";

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

export async function createMedication(data) {
  const supabase = supabaseAdmin;

  const medicationData = {
    name: data.name,
    description: data.description,
    unit_price: data.unit_price,
    dosage_form: data.dosage_form,
  };

  const createResult = await supabase.from("medication").insert(medicationData);

  if (createResult.error) {
    return JSON.stringify(createResult);
  } else {
    return JSON.stringify(createResult);
  }
}
