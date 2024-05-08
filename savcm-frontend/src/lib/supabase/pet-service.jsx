import { createSupabaseAdmin, createSupabaseServerClient } from "./create";

let supabaseAdmin;
let supabaseServer;

(async function initializeClients() {
  supabaseAdmin = await createSupabaseAdmin();
  supabaseServer = await createSupabaseServerClient();
})();

export async function createPet(data) {
  const supabase = supabaseAdmin;

  const petData = {
    name: data.name,
    species: data.species,
    breed: data.breed,
    color: data.color,
    birthdate: data.birthdate,
    member_id: data.memberId,
    gender: data.gender,
  };

  const createResult = await supabase.from("pet").insert(petData);

  if (createResult.error) {
    return JSON.stringify(createResult);
  } else {
    return JSON.stringify(createResult);
  }
}

export async function getPets() {
  const supabase = supabaseServer;
  const { data, error } = await supabase.from("pet").select("*");
  if (error) {
    return JSON.stringify(error);
  } else {
    return JSON.stringify(data);
  }
}

export async function getPetById(id) {
  const supabase = supabaseServer;
  const { data, error } = await supabase.from("pet").select("*").eq("id", id);
  if (error) {
    return JSON.stringify(error);
  } else {
    return JSON.stringify(data);
  }
}

export async function updatePet(id, data) {
  const supabase = supabaseServer;

  const petData = {
    name: data.name,
    species: data.species,
    breed: data.breed,
    color: data.color,
    birthdate: data.birthdate,
    gender: data.gender,
    member_id: data.memberId,
  };

  const updateResult = await supabase.from("pet").update(petData).eq("id", id);

  if (updateResult.error) {
    return JSON.stringify(updateResult);
  } else {
    return JSON.stringify(updateResult);
  }
}

export async function deletePetById(id) {
  const supabase = supabaseServer;
  const { error } = await supabase.from("pet").delete().eq("id", id);
  if (error) {
    return JSON.stringify(error);
  } else {
    return JSON.stringify({ message: "Pet deleted successfully" });
  }
}
