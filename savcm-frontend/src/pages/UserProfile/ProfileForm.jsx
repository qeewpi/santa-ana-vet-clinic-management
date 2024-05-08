"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { createMember } from "@/lib/supabase/member-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(20, {
      message: "Username must be at most 20 characters.",
    }),
  email: z
    .string()
    .email()
    .min(6, { message: "Email must be at least 6 characters." })
    .max(50, { message: "Email must be at most 50 characters." }),
  firstname: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." })
    .max(50, { message: "First name must be at most 50 characters." }),
  lastname: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." })
    .max(50, { message: "Last name must be at most 50 characters." }),
  address: z
    .string()
    .min(6, { message: "Address must be at least 6 characters." })
    .max(100, { message: "Address must be at most 100 characters." }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .max(120, {
      message: "Password must be at most 120 characters.",
    }),
});

export function ProfileForm() {
  let navigate = useNavigate();

  const [isPending, startTransition] = useTransition();

  const [loading, setLoading] = useState(false);

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      firstname: "",
      lastname: "",
      address: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values) {
    setLoading(true);
    values.role = "user";
    values.status = "active";
    values.specialization = "N/A";
    console.log(values);

    startTransition(async () => {
      const result = await createMember(values);
      const parsedResult = JSON.parse(result);

      if (parsedResult.error) {
        console.error("Error signing up:", parsedResult.error);
        // toast notification
      } else {
        console.log("Success! Signed up with:", result);
        // toast notification
        navigate("/verify-email");
      }

      setLoading(false);
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full py-4 grid gap-6"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="grid grid-cols-2 px-6 items-center">
              <div className="form-description-container grid items-center">
                <FormLabel className="text-semibold font-extrabold ">
                  Username
                </FormLabel>
                <FormDescription>This is your unique username.</FormDescription>
              </div>
              <FormControl className="">
                <Input
                  placeholder="juandelacruz"
                  {...field}
                  autoComplete="username"
                  className="h-12"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="grid grid-cols-2 px-6 items-center">
              <div className="form-description-container grid items-center">
                <FormLabel className="text-semibold font-extrabold ">
                  Email
                </FormLabel>
                <FormDescription> This is your email address.</FormDescription>
              </div>
              <FormControl className="">
                <Input
                  placeholder="juandelacruz@gmail.com"
                  {...field}
                  autoComplete="username"
                  className="h-12"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <div className=" gap-2">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem className="grid grid-cols-2 px-6 items-center">
                <div className="form-description-container grid items-center">
                  <FormLabel className="text-semibold font-extrabold">
                    First Name
                  </FormLabel>
                  <FormDescription> This is your first name.</FormDescription>
                </div>
                <FormControl>
                  <Input placeholder="Juan" {...field} className="h-12" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem className="grid grid-cols-2 px-6 items-center">
                <div className="form-description-container grid items-center">
                  <FormLabel className="text-semibold font-extrabold">
                    Last Name
                  </FormLabel>
                  <FormDescription> This is your last name.</FormDescription>
                </div>
                <FormControl>
                  <Input placeholder="Dela Cruz" {...field} className="h-12" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Separator />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="grid grid-cols-2 px-6 items-center">
              <div className="form-description-container grid items-center">
                <FormLabel className="text-semibold font-extrabold ">
                  Address
                </FormLabel>
                <FormDescription>
                  {" "}
                  This is your current address.
                </FormDescription>
              </div>
              <FormControl className="">
                <Input
                  placeholder="123 Rizal St, Barangay, City, Philippines"
                  {...field}
                  autoComplete="address"
                  className="h-12"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
      </form>
    </Form>
  );
}
