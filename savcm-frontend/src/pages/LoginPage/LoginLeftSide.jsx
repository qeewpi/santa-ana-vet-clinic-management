import Logo from "@/components/ui/logo";
import { ModeToggle } from "@/components/ui/toggle-mode";
import React from "react";

import { LoginForm } from "./LoginForm";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://azcjslcguxorljszgnbx.supabase.co";
const supabaseKey = import.meta.env.VITE_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
export default function LoginLeftSide() {
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
          Welcome Back
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
          Log in to your account at Santa Ana Animal Vet Clinic to manage your
          pet's healthcare records, schedule appointments, and more.
        </p>
      </div>
      <div className="form-container pt-6 text-start">
        <LoginForm />
      </div>
    </div>
  );
}
