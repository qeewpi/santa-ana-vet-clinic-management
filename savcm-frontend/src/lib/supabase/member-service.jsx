import { createSupabaseAdmin, createSupabaseServerClient } from "./create";
import { getUserSession } from "./session";

let supabaseAdmin;
let supabaseServer;

(async function initializeClients() {
  supabaseAdmin = await createSupabaseAdmin();
  supabaseServer = await createSupabaseServerClient();
})();

export async function createMember(data) {
  const supabase = supabaseAdmin;

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
        email: data.email,
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
  const supabase = supabaseServer;
  const { data, error } = await supabase
    .from("permission")
    .select("*, member(*)");
  if (error) {
    return JSON.stringify(error);
  } else {
    return JSON.stringify(data);
  }
}

export async function getMemberById(user_id) {
  const supabase = supabaseServer;
  const { data, error } = await supabase
    .from("permission")
    .select("*, member(*)")
    .eq("member_id", user_id);
  if (error) {
    return JSON.stringify(error);
  } else {
    return JSON.stringify(data);
  }
}

export async function updateMember(id, data) {
  const supabase = supabaseServer;
  const supabaseAdminClient = supabaseAdmin;

  const mappedData = {
    first_name: data.firstname,
    last_name: data.lastname,
    address: data.address,
    specialization: data.specialization,
    email: data.email,
    // role: data.role,
    // status: data.status,
    // Add other fields as needed
  };

  // console.log(data);
  // console.log(mappedData);

  const memberResult = await supabase
    .from("member")
    .update(mappedData)
    .eq("id", id);

  if (memberResult.error) {
    return JSON.stringify(memberResult);
  } else {
    const permissionResult = await supabase
      .from("permission")
      .update([
        {
          role: data.role,
          status: data.status,
        },
      ])
      .match({ member_id: id });

    if (data.email || data.password) {
      const userUpdateResult =
        await supabaseAdminClient.auth.admin.updateUserById(id, {
          email: data.email,
          password: data.password,
        });

      if (userUpdateResult.error) {
        return JSON.stringify(userUpdateResult);
      }
    }

    return JSON.stringify(permissionResult);

    return JSON.stringify(permissionResult);
  }
}

export async function deleteMemberById(user_id) {
  // get user session
  const { role } = await getUserSession();
  // console.log(role);

  // admin only
  if (role !== "admin") {
    return JSON.stringify({
      error: "You are not authorized to perform this action",
    });
  }

  // perform delete
  const supabase = supabaseAdmin;

  const deleteResult = await supabase.auth.admin.deleteUser(user_id);

  if (deleteResult?.error?.message) {
    return JSON.stringify(deleteResult);
  } else {
    const supabase = supabaseServer;
    const result = await supabase.from("member").delete().eq("id", user_id);
    return JSON.stringify(result);
  }
}
