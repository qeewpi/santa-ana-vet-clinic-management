import { createSupabaseAdmin, createSupabaseServerClient } from "./create";

export async function createMember(data) {
  const supabase = await createSupabaseAdmin();

  const createResult = await supabase.auth.admin.createUser({
    email: data.email,
    password: data.password,
    user_metadata: {
      first_name: data.firstname,
      last_name: data.lastname,
      role: data.role,
      address: data.address,
    },
    email_confirm: true,
  });

  if (createResult.error) {
    return JSON.stringify(createResult);
  } else {
    const memberResult = await supabase.from("member").insert([
      {
        id: createResult.data.user?.id,
        first_name: data.firstname,
        last_name: data.lastname,
        address: data.address,
        specialization: data.specialization,
      },
    ]);
    if (memberResult.error) {
      return JSON.stringify(memberResult);
    } else {
      const permissionResult = await supabase.from("permission").insert([
        {
          role: data.role,
          member_id: createResult.data.user?.id,
          status: data.status,
        },
      ]);
      return JSON.stringify(permissionResult);
    }
  }
}

export async function getMembers() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("permission")
    .select("*, member(*)");
  if (error) {
    return JSON.stringify(error);
  } else {
    return JSON.stringify(data);
  }
}
