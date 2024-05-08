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

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { updateMedication } from "@/lib/supabase/medications-service";
import { Eye } from "lucide-react";
import React, { useState, useTransition } from "react";

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

export default function ViewMedicationsDialog({ id, getData, data }) {
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
  const medication = Array.isArray(data)
    ? data.find((medication) => medication.id === id)
    : null;
  // console.log(pet);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      medicationId: medication.id,
      name: medication.name,
      description: medication.description,
      unit_price: medication?.unit_price.toString(),
      dosage_form: medication?.dosage_form,
    },
  });

  async function onSubmit(values) {
    // console.log("onSubmit called with values:", values);
    setLoading(true);
    console.log(values);

    startTransition(async () => {
      const result = await updateMedication(id, values);
      const parsedResult = JSON.parse(result);

      if (parsedResult.error) {
        console.error("Error updating medication:", parsedResult.error);
        toast({
          title: "Error updating medication",
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
          <DialogTitle>View Medication</DialogTitle>
          <DialogDescription>
            Fill in the form below to view a medication's record.
          </DialogDescription>
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
                  name="medicationId"
                  disabled
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medication ID</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the medication's ID"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the name of the medication"
                          readOnly
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
                          readOnly
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
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the unit price of the medication"
                          readOnly
                          {...field}
                        />
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
