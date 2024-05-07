import Sidebar from "@/components/Sidebar";
import { supabase } from "@/lib/supabase/admin";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Appointments from "../Appointments/Appointments";
import Pets from "../Pets/Pets";

export default function Dashboard() {
  let { page } = useParams();
  let content;

  switch (page) {
    case "billing":
      content = "Billing Page";
      break;
    case "profile":
      content = "Profile Page";
      break;
    case "pets":
      content = <Pets />;
      break;
    case "appointments":
      content = <Appointments />;
      break;
   
    // Add more cases as needed.
    case "":
      content = "Default Page";
      break;
  }

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
      <div className="content-div w-full overflow-hidden">
        {/* <h1>{session?.user?.email}</h1>
        <h1>{session?.user?.user_metadata.role}</h1> */}
        {content}
      </div>
    </div>
  );
}
