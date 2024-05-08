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

import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import React, { useState, useTransition } from "react";

import { createMedication } from "@/lib/supabase/medications-service";

const formSchema = z.object({
  appointment_id: z
    .string()
    .min(2, { message: "Appointment Id must be at least 2 characters." })
    .max(50, { message: "Appointment Id must be at most 50 characters." }),

  member_id: z
    .string()
    .min(2, { message: "Member Id must be at least 2 characters." })
    .max(50, { message: "Member Id must be at most 50 characters." }),

  total_amount: z
    .number()
    .min(0, { message: "Total amount must be at least 0." })
    .max(1000000, { message: "Total amount must be at most 1000000." }),
  status: z
    .string()
    .min(2, { message: "Status must be at least 2 characters." })
    .max(50, { message: "Status must be at most 50 characters." }),
});

export default function AddInvoiceDialog(props) {
  let navigate = useNavigate();

  const [isPending, startTransition] = useTransition();

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const resetForm = () => {
    form.reset();
  };

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      appointment_id: "",
      member_id: "",
      total_amount: "",
      status: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values) {
    console.log("onSubmit called with values:", values);
    setLoading(true);

    const medicationData = {
      appointment_id: values.appointment_id,
      member_id: values.member_id,
      total_amount: values.total_amount,
      status: values.status,
    };

    startTransition(async () => {
      const result = await createMedication(medicationData);
      const parsedResult = JSON.parse(result);

      if (parsedResult.error) {
        console.error("Error adding medication:", parsedResult.error);
        // toast notification
        toast({
          title: "Error adding medication",
          description: parsedResult.error,
          status: "error",
        });
      } else {
        // console.log("Success! Signed up :", result);
        // Refresh the page
        // window.location.reload();
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(values, null, 2)}
              </code>
            </pre>
          ),
        });
        setOpen(false); // close the dialog
        // console.log(open);

        // fetch data
        props.getData();

        resetForm(); // clear the form
      }

      setLoading(false);
    });
  }
  return (
    <Dialog isOpen={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="" className="w-full overflow-hidden md:w-auto">
          Add Invoice
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] lg:min-w-[750px]">
        <DialogHeader>
          <DialogTitle>Add Invoice</DialogTitle>
          <DialogDescription>
            Fill in the form below to add a new invoice.
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 border md:border-0 p-4 md:p-0 rounded-lg"
            >
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="appointmentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Appointment ID</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the appointment ID"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="memberId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Member ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the member ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="totalAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Amount</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the total amount"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the status" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <div className="button-container pt-2">
                  {!loading ? (
                    <Button type="submit" className="w-full">
                      Add Invoice
                    </Button>
                  ) : (
                    <Button disabled className="w-full">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding Invoice...
                    </Button>
                  )}
                </div>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
