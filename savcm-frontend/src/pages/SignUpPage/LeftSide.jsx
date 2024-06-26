import Logo from "@/components/ui/logo";
import React from "react";
import { ModeToggle } from "../../components/ui/toggle-mode";
import { SignUpForm } from "./SignUpForm";

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://azcjslcguxorljszgnbx.supabase.co";
const supabaseKey = import.meta.env.VITE_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function LeftSide() {
  return (
    <div className="flex flex-col py-24 px-8 md:px-16 lg:px-32 :px-36 min-h-full">
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
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
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
