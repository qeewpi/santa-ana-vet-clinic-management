import Sidebar from "@/components/Sidebar";
import { supabase } from "@/lib/supabase/create";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Appointments from "../Appointments/Appointments";
import Clients from "../Clients/Clients";
import Invoice from "../Invoice/invoice";
import Pets from "../Pets/Pets";
import Service from "../Services/Services";
import UserProfile from "../UserProfile/Profile";

import Medications from "../Medications/Medications";
import Staff from "../Staff/Staff";
export default function Dashboard() {
  let { page } = useParams();
  let content;

  const [expanded, setExpanded] = useState(false);

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

  switch (page) {
    case "appointments":
      content = <Appointments />;
      break;
    case "clients":
      content = <Clients role={role} />;
      break;
    case "invoice":
      content = <Invoice />;
      break;
    case "medications":
      content = <Medications />;
      break;
    case "pets":
      content = <Pets />;
      break;
    case "my-pets":
      content = <Pets />;
      break;
    case "members":
      content = <Clients role={role} />;
      break;
    case "profile":
      content = <UserProfile />;
      break;
    case "veterinarians":
      content = <Staff />;
      break;
    case "services":
      content = <Service />;
      break;

    // Add more cases as needed.
    case "":
      content = "Default Page";
      break;
  }

  return (
    <div className="flex flex-row min-h-screen">
      <div
        className={`sidebar-container overflow-hidden max-h-screen transition-all ease-in-out ${
          !expanded
            ? "min-w-[300px] max-w-[300px]"
            : "min-w-[86px] max-w-[86px]"
        }`}
      >
        <Sidebar
          role={role}
          session={session}
          isExpanded={expanded}
          setIsExpanded={setExpanded}
        />
      </div>
      <div className="flex content-div w-full overflow-hidden min-h-screen">
        {/* <h1>{session?.user?.email}</h1>
        <h1>{session?.user?.user_metadata.role}</h1> */}
        {content}
      </div>
    </div>
  );
}
