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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
    })
    .optional(),
  species: z
    .string()
    .min(2, { message: "Species must be at least 2 characters." })
    .max(50, { message: "Species must be at most 50 characters." })
    .optional(),
  breed: z
    .string()
    .min(2, { message: "Breed must be at least 2 characters." })
    .max(50, { message: "Breed must be at most 50 characters." })
    .optional(),
  color: z
    .string()
    .min(2, { message: "Color must be at least 2 characters." })
    .max(50, { message: "Color must be at most 50 characters." })
    .optional(),
  birthdate: z.date().nullable(),
  gender: z
    .string()
    .min(2, { message: "Gender must be at least 2 characters." })
    .max(20, { message: "Gender must be at most 20 characters." })
    .optional(),
});

export default function ViewPetsDialog({ id, data }) {
  let navigate = useNavigate();

  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const pet = Array.isArray(data) ? data.find((pet) => pet.id === id) : null;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: pet?.name,
      species: pet?.species,
      breed: pet?.breed,
      color: pet?.color,
      birthdate: pet?.birthdate,
      gender: pet?.gender,
    },
  });

  const resetForm = () => {
    form.reset();
  };

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
          <DialogTitle>View Pet</DialogTitle>
          <DialogDescription>View the pet's record below.</DialogDescription>
        </DialogHeader>
        <div className="">
          <Form {...form}>
            <form className="space-y-3 border md:border-0 p-4 md:p-0 rounded-lg">
              <div className="grid gap-y-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter pet's name"
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
                  name="species"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Species</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter pet's species"
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
                  name="breed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Breed</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter pet's breed"
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
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter pet's color"
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
                  name="birthdate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Birthdate</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          placeholder="Select pet's birthdate"
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
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter pet's gender"
                          {...field}
                          readOnly
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
