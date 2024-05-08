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
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(50, {
      message: "Name must be at most 50 characters.",
    }),
  description: z
    .string()
    .min(2, {
      message: "Description must be at least 2 characters.",
    })
    .max(50, {
      message: "Description must be at most 50 characters.",
    }),
  unit_price: z
    .string()
    .min(2, {
      message: "Price must be at least 2 characters.",
    })
    .max(50, {
      message: "Price must be at most 50 characters.",
    }),
  dosage_form: z
    .string()
    .min(2, {
      message: "Price must be at least 2 characters.",
    })
    .max(50, {
      message: "Price must be at most 50 characters.",
    }),
});

export default function AddMedicationsDialog(props) {
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
      name: "",
      description: "",
      unit_price: "",
      dosage_form: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values) {
    console.log("onSubmit called with values:", values);
    setLoading(true);

    const medicationData = {
      name: values.name,
      description: values.description,
      unit_price: values.unit_price,
      dosage_form: values.dosage_form,
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
          Add Medication
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] lg:min-w-[750px]">
        <DialogHeader>
          <DialogTitle>Add Medication</DialogTitle>
          <DialogDescription>
            Fill in the form below to add a new medication.
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the name of the medication"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the description of the medication"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="unit_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the unit price of the medication"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dosage_form"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dosage Form</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the dosage form of the medication"
                          {...field}
                        />
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
                      Add Medication
                    </Button>
                  ) : (
                    <Button disabled className="w-full">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding medication...
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
