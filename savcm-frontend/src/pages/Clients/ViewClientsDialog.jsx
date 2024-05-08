import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Eye } from "lucide-react";
import React, { useState, useTransition } from "react";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(20, {
      message: "Username must be at most 20 characters.",
    })
    .optional(),
  email: z
    .string()
    .email()
    .min(6, { message: "Email must be at least 6 characters." })
    .max(50, { message: "Email must be at most 50 characters." })
    .optional(),
  firstname: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." })
    .max(50, { message: "First name must be at most 50 characters." })
    .optional(),
  lastname: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." })
    .max(50, { message: "Last name must be at most 50 characters." })
    .optional(),
  address: z
    .string()
    .min(6, { message: "Address must be at least 6 characters." })
    .max(100, { message: "Address must be at most 100 characters." })
    .optional(),
  role: z
    .string({
      required_error: "You need to select a role.",
    })
    .optional(),
  status: z
    .string({
      required_error: "You need to select a status.",
    })
    .optional(),
  specialization: z.string().optional(),
});

export default function ViewClientsDialog({ id, getData, data }) {
  let navigate = useNavigate();

  const [isPending, startTransition] = useTransition();

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const resetForm = () => {
    form.reset();
  };

  const user = data.find((user) => user.member.id === id);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.member?.email,
      firstname: user?.member?.first_name,
      lastname: user?.member?.last_name,
      address: user?.member?.address,
      role: user?.role,
      status: user?.status,
      specialization: user?.member?.specialization,
    },
  });

  return (
    <Dialog isOpen={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="smallerIcon">
          <Eye className="h-4 w-4"></Eye>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] lg:min-w-[750px]">
        <DialogHeader>
          <DialogTitle>View Client</DialogTitle>
          <DialogDescription>View the client's record below.</DialogDescription>
        </DialogHeader>
        <div className="">
          <Form {...form}>
            <form className="space-y-3 border md:border-0 p-4 md:p-0 rounded-lg">
              <div className="grid lg:grid-cols-2 gap-2">
                <div className="grid gap-y-2">
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
                            readOnly
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
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Juan" {...field} readOnly />
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
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Dela Cruz"
                              {...field}
                              readOnly
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-row justify-between gap-2">
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Role</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="user">User</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="veterinarian">
                                Veterinarian
                              </SelectItem>
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Status</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-y-2">
                  <FormField
                    control={form.control}
                    name="specialization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specialization</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Veterinarian specialization, if any (optional)"
                            {...field}
                            readOnly
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="123 Rizal St, Barangay, City, Philippines"
                            {...field}
                            readOnly
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <DialogFooter></DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
