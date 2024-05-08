import React from "react";
import { ProfileForm } from "./ProfileForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CircleUserRound } from "lucide-react";

export default function UserProfile() {
  return (
    <div className="min-w-full min-h-screen px-[2rem] py-[2rem]">
      <div className="flex m-10">
        <CircleUserRound className="w-12 h-12" />
      </div>
      <Card className="">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Profile Description</CardDescription>
        </CardHeader>
        <Separator />
        <ProfileForm className="" />
        <CardFooter>
          <Button className="w-1/4">Save</Button>{" "}
        </CardFooter>
      </Card>

      {/* <Appointments className="h-96"/> */}
    </div>
  );
}
