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

import { Calendar } from "@/components/ui/calendar";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Eye } from "lucide-react";
import React, { useState, useTransition } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const formSchema = z.object({
  date: z.date({
    required_error: "A date of birth is required.",
  }),
  time: z.string({
    required_error: "A time is required.",
  }),
  reason_for_visit: z.string({
    required_error: "A reason for visit is required.",
  }),
  status: z.string({
    required_error: "A status is required.",
  }),
  veterinarian_id: z.string({
    required_error: "A veterinarian is required.",
  }),
  pet_id: z.string({
    required_error: "A pet is required.",
  }),
  notes: z.string().optional(),
});

export default function ViewAppointmentDialog({ id, data }) {
  let navigate = useNavigate();

  const [isPending, startTransition] = useTransition();

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const resetForm = () => {
    form.reset();
  };

  const appointment = Array.isArray(data)
    ? data.find((appointment) => appointment.id === id)
    : null;

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: appointment?.date,
      time: appointment?.time,
      reason_for_visit: appointment?.reason_for_visit,
      status: appointment?.status,
      veterinarian_id: appointment?.veterinarian_id,
      pet_id: appointment?.pet_id,
      appointment_id: appointment?.id,
      notes: appointment?.notes,
    },
  });

  return (
    <Dialog isOpen={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <DialogTrigger asChild>
              <Button variant="outline" size="smallerIcon">
                <Eye className="h-4 w-4"></Eye>
              </Button>
            </DialogTrigger>
          </TooltipTrigger>

          <TooltipContent>View</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="max-w-[425px] lg:min-w-[750px]">
        <DialogHeader>
          <DialogTitle>Add Appointment</DialogTitle>
          <DialogDescription>
            Fill in the form below to add a new appointment.
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <Form {...form}>
            <form className="space-y-3 border md:border-0 p-4 md:p-0 rounded-lg">
              <div className="grid gap-y-2">
                <FormField
                  control={form.control}
                  name="appointment_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Appointment ID</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="View the ID of the appointment ID of this appointment"
                          {...field}
                          readOnly
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col pt-2">
                      <FormLabel>Date of Appointment</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                              disabled
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Enter the date of the appointment</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            readOnly
                            disabled
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time of Appointment</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        readOnly
                        disabled
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a time slot" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="09:00 AM">09:00 AM</SelectItem>
                          <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                          <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                          <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                          <SelectItem value="01:00 PM">01:00 PM</SelectItem>
                          <SelectItem value="02:00 PM">02:00 PM</SelectItem>
                          <SelectItem value="03:00 PM">03:00 PM</SelectItem>
                          <SelectItem value="04:00 PM">04:00 PM</SelectItem>
                          <SelectItem value="05:00 PM">05:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reason_for_visit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason for Visit</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter reason for visit"
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        readOnly
                        disabled
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Confirmed">Confirmed</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter notes for this appointment"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pet_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pet ID</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the ID of the pet assigned to this appointment"
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
                  name="veterinarian_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Veterinarian ID</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the ID of the veterinarian assigned to this appointment"
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
