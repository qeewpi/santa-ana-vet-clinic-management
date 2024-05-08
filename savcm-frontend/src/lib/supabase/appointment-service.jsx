import { createSupabaseAdmin, createSupabaseServerClient } from "./create";

let supabaseAdmin;
let supabaseServer;

(async function initializeClients() {
  supabaseAdmin = await createSupabaseAdmin();
  supabaseServer = await createSupabaseServerClient();
})();

export async function createAppointment(data) {
  const supabase = supabaseAdmin; // Likely want admin privileges for creation

  const appointmentResult = await supabase.from("appointment").insert([
    {
      pet_id: data.pet_id,
      veterinarian_id: data.veterinarian_id,
      date: data.date,
      time: data.time,
      status: data.status,
      reason_for_visit: data.reason_for_visit,
      notes: data.notes,
    },
  ]);

  if (appointmentResult.error) {
    return JSON.stringify(appointmentResult);
  } else {
    // You could return the newly created appointment data if needed
    return JSON.stringify({ message: "Appointment created successfully" });
  }
}

export async function getAppointments() {
  const supabase = supabaseServer;

  const { data, error } = await supabase.from("appointment").select(`
      *, 
      pet:pet_id (member:member_id(id))  
    `);

  if (error) {
    return JSON.stringify(error);
  } else {
    return JSON.stringify(data);
  }
}

export async function deleteAppointmentById(id) {
  const supabase = supabaseServer;
  const { error } = await supabase.from("appointment").delete().eq("id", id);
  if (error) {
    return JSON.stringify(error);
  } else {
    return JSON.stringify({ message: "Appointment deleted successfully" });
  }
}

export async function updateAppointment(id, data) {
  const supabase = supabaseServer;

  const appointmentData = {
    pet_id: data.pet_id,
    veterinarian_id: data.veterinarian_id,
    date: data.date,
    time: data.time,
    status: data.status,
    reason_for_visit: data.reason_for_visit,
    notes: data.notes,
  };

  const updateResult = await supabase
    .from("appointment")
    .update(appointmentData)
    .eq("id", id);

  if (updateResult.error) {
    return JSON.stringify(updateResult);
  } else {
    return JSON.stringify(updateResult);
  }
}
