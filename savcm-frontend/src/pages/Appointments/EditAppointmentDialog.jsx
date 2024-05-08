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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { updateAppointment } from "@/lib/supabase/appointment-service";
import { cn } from "@/lib/utils";
import { CalendarIcon, Edit, Loader2 } from "lucide-react";
import React, { useState, useTransition } from "react";

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
});

export default function EditappointmentDialog({ id, getData, data }) {
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
  const appointment = Array.isArray(data)
    ? data.find((appointment) => appointment.id === id)
    : null;

  let timeString;

  if (appointment?.date) {
    let date = new Date(appointment.date);
    appointment.date = date;

    // Extract the time
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();

    // Convert to 12-hour format
    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Format the time as a string
    let timeString = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;

    appointment.time = timeString;
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: appointment?.date,
      time: appointment?.time,
      reason_for_visit: appointment?.reason_for_visit,
      status: appointment?.status,
      veterinarian_id: appointment?.veterinarian_id,
      pet_id: appointment?.pet_id,
    },
  });

  async function onSubmit(values) {
    // console.log("onSubmit called with values:", values);
    setLoading(true);
    console.log(values);

    startTransition(async () => {
      const result = await updateAppointment(id, values);
      const parsedResult = JSON.parse(result);

      if (parsedResult.error) {
        console.error("Error updating appointment:", parsedResult.error);
        toast({
          title: "Error updating appointment",
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
          <TooltipContent>View</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="max-w-[425px] lg:min-w-[750px]">
        <DialogHeader>
          <DialogTitle>Edit Appointment</DialogTitle>
          <DialogDescription>
            Fill in the form below to edit a new appointment.
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 border md:border-0 p-4 md:p-0 rounded-lg"
            >
              <div className="grid gap-y-2">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col pt-2 ">
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
                            disabled={(date) => date < new Date()}
                            initialFocus
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
                  name="pet_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pet ID</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the ID of the pet assigned to this appointment"
                          {...field}
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
                      Edit Appointment
                    </Button>
                  ) : (
                    <Button disabled className="w-full">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Editing appointment...
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
