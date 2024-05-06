import Sidebar from "@/components/Sidebar";
import { supabase } from "@/lib/supabase/admin";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [session, setSession] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setRole(session.user.user_metadata.role);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [role]);

  return (
    <div className="flex flex-row min-h-screen">
      <div className="sidebar-container min-w-[300px] max-w-[300px] flex grow">
        <Sidebar role={role} session={session} />
      </div>
      <div className="content-div w-full">
        {/* <h1>{session?.user?.email}</h1>
        <h1>{session?.user?.user_metadata.role}</h1> */}
      </div>
    </div>
  );
}
