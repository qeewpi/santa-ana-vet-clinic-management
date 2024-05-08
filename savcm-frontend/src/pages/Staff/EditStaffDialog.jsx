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
import { updateVeterinarian } from "@/lib/supabase/veterinarian-service";
import { cn } from "@/lib/utils";
import { CalendarIcon, Edit, Loader2 } from "lucide-react";
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
  species: z
    .string()
    .min(2, { message: "Species must be at least 2 characters." })
    .max(50, { message: "Species must be at most 50 characters." }),
  breed: z
    .string()
    .min(2, { message: "Breed must be at least 2 characters." })
    .max(50, { message: "Breed must be at most 50 characters." }),
  color: z
    .string()
    .min(2, { message: "Color must be at least 2 characters." })
    .max(50, { message: "Color must be at most 50 characters." })
    .optional(),
  birthdate: z.date().optional(),
  gender: z
    .string()
    .min(2, { message: "Gender must be at least 2 characters." })
    .max(20, { message: "Gender must be at most 20 characters." })
    .optional(),
  memberId: z.string().optional(),
});

export default function EditVeterinarianDialog({ id, getData, data }) {
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
  const veterinarian = Array.isArray(data)
    ? data.find((veterinarian) => veterinarian.id === id)
    : null;
  // console.log(veterinarian);

  // convert birthdate to Date object
  if (veterinarian?.birthdate) {
    veterinarian.birthdate = new Date(veterinarian.birthdate);
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: veterinarian?.name,
      first_name: veterinarian?.first_name,
      last_name: veterinarian?.last_name,
      specialization: veterinarian?.specialization,
    },
  });

  async function onSubmit(values) {
    // console.log("onSubmit called with values:", values);
    setLoading(true);
    console.log(values);

    startTransition(async () => {
      const result = await updateVeterinarian(id, values);
      const parsedResult = JSON.parse(result);

      if (parsedResult.error) {
        console.error("Error updating veterinarian:", parsedResult.error);
        toast({
          title: "Error updating veterinarian",
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
                <Edit className="h-4 w-4"></Edit>
              </Button>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent>Edit</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="max-w-[425px] lg:min-w-[750px]">
        <DialogHeader>
          <DialogTitle>Edit Veterinarian</DialogTitle>
          <DialogDescription>
            Fill in the form below to edit a veterinarian's record.
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <Form {...form}>
            <form
              className="space-y-3 border md:border-0 p-4 md:p-0 rounded-lg"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter first name" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter last name" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="specialization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specialization</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Veterinarian's specialization"
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
                      Edit Client
                    </Button>
                  ) : (
                    <Button disabled className="w-full">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Editing client...
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
