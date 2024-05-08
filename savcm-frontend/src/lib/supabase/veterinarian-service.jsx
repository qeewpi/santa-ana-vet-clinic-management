import { createSupabaseAdmin, createSupabaseServerClient } from "./create";

let supabaseAdmin;
let supabaseServer;

(async function initializeClients() {
  supabaseAdmin = await createSupabaseAdmin();
  supabaseServer = await createSupabaseServerClient();
})();
export async function createVeterinarian(data) {
  const supabase = supabaseAdmin;

  const veterinarianData = {
    name: data.name,
    first_name: data.first_name,
    last_name: data.last_name,
    specialization: data.specialization,
  };

  const createResult = await supabase
    .from("veterinarian")
    .insert(veterinarianData);

  if (createResult.error) {
    return JSON.stringify(createResult);
  } else {
    return JSON.stringify(createResult);
  }
}

export async function getVeterinarians() {
  const supabase = supabaseServer;
  const { data, error } = await supabase.from("veterinarian").select("*");
  if (error) {
    return JSON.stringify(error);
  } else {
    return JSON.stringify(data);
  }
}
export async function getVeterinarianById(id) {
  const supabase = supabaseServer;
  const { data, error } = await supabase
    .from("veterinarian")
    .select("*")
    .eq("id", id);
  if (error) {
    return JSON.stringify(error);
  } else {
    return JSON.stringify(data);
  }
}

export async function updateVeterinarian(id, data) {
  const supabase = supabaseServer;

  const veterinarianData = {
    name: data.name,
    first_name: data.first_name,
    last_name: data.last_name,
    specialization: data.specialization,
  };

  const updateResult = await supabase
    .from("veterinarian")
    .update(veterinarianData)
    .eq("id", id);

  if (updateResult.error) {
    return JSON.stringify(updateResult);
  } else {
    return JSON.stringify(updateResult);
  }
}

export async function deleteVeterianById(id) {
  const supabase = supabaseServer;
  const { error } = await supabase.from("veterinarian").delete().eq("id", id);
  if (error) {
    return JSON.stringify(error);
  } else {
    return JSON.stringify({ message: "Veterinarian deleted successfully" });
  }
}
