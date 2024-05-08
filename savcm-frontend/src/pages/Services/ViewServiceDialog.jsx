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
    }),
  description: z
    .string()
    .min(2, {
      message: "Description must be at least 2 characters.",
    })
    .max(50, {
      message: "Description must be at most 50 characters.",
    }),
  price: z
    .string()
    .min(2, {
      message: "Price must be at least 2 characters.",
    })
    .max(50, {
      message: "Price must be at most 50 characters.",
    }),
});

export default function ViewServiceDialog({ id, getData, data }) {
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
  const service = Array.isArray(data)
    ? data.find((service) => service.id === id)
    : null;
  // console.log(pet);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceId: service.id,
      name: service.name,
      description: service.description,
      price: service?.price.toString(),
    },
  });

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
          <DialogTitle>View Service</DialogTitle>
          <DialogDescription>
            View the service's record below.
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <Form {...form}>
            <form className="space-y-3 border md:border-0 p-4 md:p-0 rounded-lg">
              <div className="grid gap-y-2">
                <FormField
                  control={form.control}
                  name="serviceId"
                  disabled
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service ID</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the service's ID"
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
                          placeholder="Enter the name of the service"
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
                          placeholder="Enter the description of the service"
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
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the price of the service"
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
