import { supabase } from "@/lib/supabase/create";
import { useEffect, useState } from "react";

export const useUserRole = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then((session) => {
      if (session && session.user && session.user.user_metadata) {
        setRole(session.user.user_metadata.role);
      }
    });
  }, []);

  return role;
};
