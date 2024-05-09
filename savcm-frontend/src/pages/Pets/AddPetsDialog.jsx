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

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { createPet } from "@/lib/supabase/pet-service";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getMembers } from "@/lib/supabase/member-service";

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
  birthdate: z.date({
    required_error: "A date of birth is required.",
  }),
  gender: z
    .string()
    .min(2, { message: "Gender must be at least 2 characters." })
    .max(20, { message: "Gender must be at most 20 characters." })
    .optional(),
  memberId: z.string(),
});

export default function AddPetsDialog(props) {
  let navigate = useNavigate();

  const [isPending, startTransition] = useTransition();

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const resetForm = () => {
    form.reset();
  };

  const [membersData, setMembersData] = useState([]);

  const fetchMembersData = async () => {
    const members = await getMembers();
    if (members && members !== "") {
      const parsedMembers = JSON.parse(members);
      parsedMembers.forEach((member) => {
        if (member.created_at) {
          const date = new Date(member.created_at);
          member.created_at = date.toDateString();
        }
      });
      setMembersData(parsedMembers);
    }
  };

  useEffect(() => {
    fetchMembersData();
    console.log("Members data:", membersData);
  }, []);

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      species: "",
      breed: "",
      color: "",
      gender: "",
      memberId: "",
      birthdate: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values) {
    console.log("onSubmit called with values:", values);
    setLoading(true);

    const petData = {
      name: values.name,
      species: values.species,
      breed: values.breed,
      color: values.color,
      birthdate: values.birthdate,
      gender: values.gender,
      memberId: values.memberId,
    };

    startTransition(async () => {
      const result = await createPet(petData);
      const parsedResult = JSON.parse(result);

      if (parsedResult.error) {
        console.error("Error adding pet:", parsedResult.error);
        // toast notification
        toast({
          title: "Error adding pet",
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
          Add Pet
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[750px]">
        <DialogHeader>
          <DialogTitle>Add Pet</DialogTitle>
          <DialogDescription>
            Fill in the form below to add a new pet.
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 border md:border-0 p-4 md:p-0 rounded-lg"
            >
              <div className="grid gap-2">
                {/*               
                <FormField
                  control={form.control}
                  name="memberId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Member ID</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the member's ID which the pet belongs to"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                <FormField
                  control={form.control}
                  name="memberId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Member ID</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a member ID" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {membersData.map((member) => (
                            <SelectItem
                              key={member.member_id}
                              value={member.member_id}
                            >
                              {member.member_id}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                        <Input placeholder="Enter pet's name" {...field} />
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
                        <Input placeholder="Enter pet's species" {...field} />
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
                        <Input placeholder="Enter pet's breed" {...field} />
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
                        <Input placeholder="Enter pet's color" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birthdate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col pt-2 ">
                      <FormLabel>Date of birth</FormLabel>
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
                                <span>Enter pet's birthdate</span>
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
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
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
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select the pet's gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <div className="button-container pt-2">
                  {!loading ? (
                    <Button type="submit" className="w-full">
                      Add Pet
                    </Button>
                  ) : (
                    <Button disabled className="w-full">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding pet...
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
