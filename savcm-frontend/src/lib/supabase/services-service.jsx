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

export async function createService(data) {
  const supabase = supabaseAdmin;

  const serviceData = {
    name: data.name,
    description: data.description,
    price: data.price,
  };

  const createResult = await supabase.from("service").insert(serviceData);

  if (createResult.error) {
    return JSON.stringify(createResult);
  } else {
    return JSON.stringify(createResult);
  }
}

export async function deleteServiceById(id) {
  const supabase = supabaseServer;
  const { error } = await supabase.from("service").delete().eq("id", id);
  if (error) {
    return JSON.stringify(error);
  } else {
    return JSON.stringify({ message: "Service deleted successfully" });
  }
}

export async function updateService(id, data) {
  const supabase = supabaseServer;

  const serviceData = {
    name: data.name,
    description: data.description,
    price: data.price,
  };

  const updateResult = await supabase
    .from("service")
    .update(serviceData)
    .eq("id", id);

  if (updateResult.error) {
    return JSON.stringify(updateResult);
  } else {
    return JSON.stringify(updateResult);
  }
}
