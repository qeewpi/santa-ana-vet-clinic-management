"use client";
import { supabase } from "@/lib/supabase/create";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  email: z
    .string()
    .email()
    .min(6, { message: "Email must be at least 6 characters." })
    .max(50, { message: "Email must be at most 50 characters." }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .max(120, {
      message: "Password must be at most 120 characters.",
    }),
});

export function LoginForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  let navigate = useNavigate();

  async function onSubmit(values) {
    setLoading(true);

    let { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    setLoading(false);
    navigate("/dashboard/pets");

    if (error) {
      console.error("Error logging in:", error);
    } else {
      console.log("Success! Logged in with:", data);
    }
  }

  const [loading, setLoading] = useState(false);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 border md:border-0 p-4 md:p-0 rounded-lg"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="juandelacruz@example.com"
                  {...field}
                  type="email"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="At least 6 characters"
                  {...field}
                  type="password"
                  autoComplete="new-password"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="button-container pt-2">
          {!loading ? (
            <Button type="submit" className="w-full">
              Log In
            </Button>
          ) : (
            <Button disabled className="w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </Button>
          )}
        </div>

        <div className="text-container">
          <p className="text-sm mt-2">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-destructive">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
