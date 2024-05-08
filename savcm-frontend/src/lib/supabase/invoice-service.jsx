import { createSupabaseAdmin, createSupabaseServerClient } from "./create";

let supabaseAdmin;
let supabaseServer;

(async function initializeClients() {
  supabaseAdmin = await createSupabaseAdmin();
  supabaseServer = await createSupabaseServerClient();
})();

export async function createInvoice(data) {
  const supabase = supabaseAdmin;

  const invoiceData = {
    appointment_id: data.appointment_id,
    member_id: data.member_id,
    total_amount: data.total_amount,
    status: data.status,
  };

  const createResult = await supabase.from("invoice").insert(invoiceData);

  if (createResult.error) {
    return JSON.stringify(createResult);
  } else {
    return JSON.stringify(createResult);
  }
}

export async function getInvoices() {
  const supabase = supabaseServer;
  const { data, error } = await supabase.from("invoice").select("*");
  if (error) {
    return JSON.stringify(error);
  } else {
    return JSON.stringify(data);
  }
}

export async function getInvoicesById(id) {
  const supabase = supabaseServer;
  const { data, error } = await supabase
    .from("invoice")
    .select("*")
    .eq("id", id);
  if (error) {
    return JSON.stringify(error);
  } else {
    return JSON.stringify(data);
  }
}

export async function updateInvoice(id, data) {
  const supabase = supabaseServer;

  const invoiceData = {
    appointment_id: data.appointment_id,
    member_id: data.member_id,
    total_amount: data.total_amount,
    status: data.status,
  };

  const updateResult = await supabase
    .from("invoice")
    .update(invoiceData)
    .eq("id", id);

  if (updateResult.error) {
    return JSON.stringify(updateResult);
  } else {
    return JSON.stringify(updateResult);
  }
}

export async function deleteInvoiceById(id) {
  const supabase = supabaseServer;
  const { error } = await supabase.from("invoice").delete().eq("id", id);
  if (error) {
    return JSON.stringify(error);
  } else {
    return JSON.stringify({ message: "Invoice deleted successfully" });
  }
}
