import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/admin";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {session && (
        <div>
          Welcome, {session.user.email}. Your ID is {session.user.id}
          {""} You are a {session.user.user_metadata.role}
        </div>
      )}
      <Button onClick={handleLogout}>Log Out</Button>
    </div>
  );
}
