"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { createMember } from "@/lib/supabase/members";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";



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
    <div className="h-auto ">
      
        <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 md:p-0 br-4 rounded-lg mx-4 my-4  md:rounded-xl md:overflow-hidden p-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className ="text-semibold font-extrabold ">Username</FormLabel>
                <FormControl>
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
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className ="text-semibold font-extrabold">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="juandelacruz@example.com"
                    {...field}
                    type="email"
                    className="h-12"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="join-container flex flex-col md:grid md:grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className ="text-semibold font-extrabold">First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Juan" {...field} className="h-12"/>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className ="text-semibold font-extrabold">Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Dela Cruz" {...field} className="h-12"/>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel >Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="123 Rizal St, Barangay, City, Philippines"
                    {...field}
                    className="h-12"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

        
      
    </div>
  );
}
