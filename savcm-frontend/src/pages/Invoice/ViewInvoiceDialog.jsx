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
import { format } from "date-fns";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye } from "lucide-react";
import React, { useState, useTransition } from "react";

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

export default function ViewInvoiceDialog({ id, getData, data }) {
  let navigate = useNavigate();
  // console.log(data);
  // console.log(id);

  const [isPending, startTransition] = useTransition();

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const resetForm = () => {
    form.reset();
  };

  // Find the user with the matching id
  // console.log(data);
  const invoice = Array.isArray(data)
    ? data.find((invoice) => invoice.id === id)
    : null;
  // console.log(invoice);

  // convert birthdate to Date object
  if (invoice?.birthdate) {
    invoice.birthdate = new Date(invoice.birthdate);
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      appointment_id: invoice?.appointment_id,
      member_id: invoice?.member_id,
      total_amount: invoice?.total_amount,
      status: invoice?.status,
    },
  });

  async function onSubmit(values) {
    // console.log("onSubmit called with values:", values);
    setLoading(true);
    console.log(values);

    startTransition(async () => {
      const result = await updateInvoice(id, values);
      const parsedResult = JSON.parse(result);

      if (parsedResult.error) {
        console.error("Error updating invoice:", parsedResult.error);
        toast({
          title: "Error updating invoice",
          description: parsedResult.error,
          status: "error",
        });
      } else {
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

        getData();

        resetForm(); // clear the form
      }

      setLoading(false);
    });
  }

  return (
    <Dialog isOpen={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <DialogTrigger asChild>
            <TooltipTrigger>
              <Button variant="outline" size="smallerIcon">
                <Eye className="h-4 w-4"></Eye>
              </Button>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent>View</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="max-w-[425px] lg:min-w-[750px]">
        <DialogHeader>
          <DialogTitle>View Invoice</DialogTitle>
          <DialogDescription>View the Invoice record below.</DialogDescription>
        </DialogHeader>
        <div className="">
          <Form {...form}>
            <form
              className="space-y-3 border md:border-0 p-4 md:p-0 rounded-lg"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="grid gap-y-2">
                <FormField
                  control={form.control}
                  name="appointment_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Appointment ID</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Appointment ID"
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
                  name="member_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Member ID</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Member ID"
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
                  name="total_amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Amount</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Total Amount"
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
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter status" {...field} readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter></DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
