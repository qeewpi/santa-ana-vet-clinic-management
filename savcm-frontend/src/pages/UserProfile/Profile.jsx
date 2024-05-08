import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getUserSession } from "@/lib/supabase/session";
import React, { useEffect, useState } from "react";
import { ProfileForm } from "./ProfileForm";

export default function UserProfile() {
  const [userSession, setUserSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const session = await getUserSession();
        setUserSession(session);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchUserSession();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Or replace with a loading spinner
  }

  return (
    <div className="min-w-full min-h-screen px-[2rem] py-[2rem]">
      <Card className="">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Profile Description</CardDescription>
        </CardHeader>
        <Separator />
        {/* Pass userSession as a prop to ProfileForm */}
        <ProfileForm className="" userSession={userSession} />
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
