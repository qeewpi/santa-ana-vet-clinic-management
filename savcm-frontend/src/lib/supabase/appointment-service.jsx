import { createSupabaseAdmin, createSupabaseServerClient } from "./create";

let supabaseAdmin;
let supabaseServer;

(async function initializeClients() {
  supabaseAdmin = await createSupabaseAdmin();
  supabaseServer = await createSupabaseServerClient();
})();

export async function createAppointment(data) {
  const supabase = supabaseAdmin; // Likely want admin privileges for creation

  const appointmentResult = await supabase.from("appointments").insert([
    {
      pet_id: data.petId,
      veterinarian_id: data.veterinarianId,
      date: data.date,
      time: data.time,
      status: data.status,
      reason_for_visit: data.reasonforvisit,
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

  const { data, error } = await supabase.from("appointment").select("*"); // Tailor your select as needed

  if (error) {
    return JSON.stringify(error);
  } else {
    return JSON.stringify(data);
  }
}
