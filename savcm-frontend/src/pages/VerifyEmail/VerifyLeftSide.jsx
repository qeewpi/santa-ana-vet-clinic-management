import Logo from "@/components/ui/logo";
import { ModeToggle } from "@/components/ui/toggle-mode";
import React from "react";
import { Link } from "react-router-dom";

export default function VerifyLeftSide() {
  return (
    <div className="flex flex-col py-24 px-8 md:px-16 lg:px-32 :px-36 min-h-full grow">
      <div className="signup-navBar flex flex-row items-center">
        <div className="logo-container flex w-full items-center justify-center">
          <Logo />
        </div>
        <ModeToggle />
      </div>
      <div className="form-header flex flex-col justify-center grow pt-12 md:items-start md:text-start md:border-b md:pb-8">
        <h1 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl">
          Verify your email address.
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
          To start using your account, please verify your email address.
        </p>
      </div>
      <div className="text-container text-start">
        <p className="text-sm mt-4">
          Already verified your email?{" "}
          <Link to="/login" className="text-destructive">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
