import { createSupabaseAdmin, createSupabaseServerClient } from "./create";
import { getUserSession } from "./session";

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
        user_id: createResult.data.user?.id,
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

export async function deleteMemberById(user_id) {
  // get user session
  const { role } = await getUserSession();
  console.log(role);

  // admin only
  if (role !== "admin") {
    return JSON.stringify({
      error: "You are not authorized to perform this action",
    });
  }

  // perform delete
  const supabaseAdmin = await createSupabaseAdmin();

  const deleteResult = await supabaseAdmin.auth.admin.deleteUser(user_id);

  if (deleteResult?.error?.message) {
    return JSON.stringify(deleteResult);
  } else {
    const supabase = await createSupabaseServerClient();
    const result = await supabase.from("member").delete().eq("id", user_id);
    return JSON.stringify(result);
  }
}
