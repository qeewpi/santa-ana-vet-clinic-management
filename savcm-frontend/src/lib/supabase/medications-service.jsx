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

export async function deleteMedicationById(id) {
  const supabase = supabaseServer;
  const { error } = await supabase.from("medication").delete().eq("id", id);
  if (error) {
    return JSON.stringify(error);
  } else {
    return JSON.stringify({ message: "Medication deleted successfully" });
  }
}

export async function updateMedication(id, data) {
  const supabase = supabaseServer;

  const medicationData = {
    name: data.name,
    description: data.description,
    unit_price: data.unit_price,
    dosage_form: data.dosage_form,
  };

  const updateResult = await supabase
    .from("medication")
    .update(medicationData)
    .eq("id", id);

  if (updateResult.error) {
    return JSON.stringify(updateResult);
  } else {
    return JSON.stringify(updateResult);
  }
}
