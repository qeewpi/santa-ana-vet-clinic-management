import Logo from "@/components/ui/logo";
import { ModeToggle } from "@/components/ui/toggle-mode";
import React from "react";
import { SignUpForm } from "./SignUpForm";

function LeftSide() {
  return (
    <div className="flex flex-col p-[2rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem] justify-center min-h-screen">
      <div className="signup-navBar flex flex-row items-center">
        <div className="logo-container flex w-full items-center justify-center">
          <Logo />
        </div>
        <ModeToggle />
      </div>

      <div className="form-header pt-12 md:items-start md:text-start md:border-b md:pb-8">
        <h1 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl">
          Get Started Now
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Welcome to Santa Ana Animal Vet Clinic, your trusted partner in pet
          healthcare.
        </p>
      </div>
      <div className="form-container pt-6 text-start">
        <SignUpForm />
      </div>
    </div>
  );
}

export default LeftSide;
