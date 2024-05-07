import Sidebar from "@/components/Sidebar";
import { supabase } from "@/lib/supabase/create";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Appointments from "../Appointments/Appointments";
import Clients from "../Clients/Clients";
import Pets from "../Pets/Pets";
import Profile from "../Profile/Profile";

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
    case "billing":
      content = "Billing Page";
      break;
    case "profile":
      content = <Profile />;
      break;
    case "appointments":
      content = <Appointments />;
      break;
    case "pets":
      content = <Pets />;
      break;
    case "clients":
      content = <Clients role={role} />;
      break;
    // Add more cases as needed.
    case "":
      content = "Default Page";
      break;
  }

  return (
    <div className="flex flex-row min-h-screen">
      <div
        className={`sidebar-container overflow-hidden transition-all ease-in-out ${
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
