import { supabase } from "@/lib/supabase/create";

export async function getUserSession() {
  return new Promise((resolve, reject) => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        const role = session.user.user_metadata.role;
        resolve({ session, role });
      } else {
        reject("No session");
      }
    });
  });
}
