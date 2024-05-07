// "use client";
// import { useState, useTransition } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Loader2 } from "lucide-react";
// import {
//     Button,
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
//     Input,
// } from "@/components/ui";

// const formSchema = z.object({
//     username: z
//         .string()
//         .min(2, {
//             message: "Username must be at least 2 characters.",
//         })
//         .max(20, {
//             message: "Username must be at most 20 characters.",
//         }),
//     email: z
//         .string()
//         .email()
//         .min(6, { message: "Email must be at least 6 characters." })
//         .max(50, { message: "Email must be at most 50 characters." }),
//     firstname: z
//         .string()
//         .min(2, { message: "First name must be at least 2 characters." })
//         .max(50, { message: "First name must be at most 50 characters." }),
//     lastname: z
//         .string()
//         .min(2, { message: "Last name must be at least 2 characters." })
//         .max(50, { message: "Last name must be at most 50 characters." }),
//     address: z
//         .string()
//         .min(6, { message: "Address must be at least 6 characters." })
//         .max(100, { message: "Address must be at most 100 characters." }),
//     preferredDate: z.date().message("Please select a preferred date."),
//     preferredTime: z.string().message("Please enter a preferred time."),
//     reason: z.string().min(1, { message: "Please enter a reason for the appointment." }),
// });

// export default function AppointmentPage() {
//     let navigate = useNavigate();

//     const [isPending, startTransition] = useTransition();

//     const [loading, setLoading] = useState(false);

//     // 1. Define your form.
//     const form = useForm({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             username: "",
//             email: "",
//             firstname: "",
//             lastname: "",
//             address: "",
//             preferredDate: "",
//             preferredTime: "",
//             reason: "",
//         },
//     });

//     // 2. Define a submit handler.
//     async function onSubmit(values) {
//         setLoading(true);
//         values.role = "user";
//         values.status = "active";
//         values.specialization = "N/A";
//         console.log(values);

//         startTransition(async () => {
//             const result = await createMember(values);
//             const parsedResult = JSON.parse(result);

//             if (parsedResult.error) {
//                 console.error("Error signing up:", parsedResult.error);
//                 // toast notification
//             } else {
//                 console.log("Success! Signed up with:", result);
//                 // toast notification
//                 navigate("/verify-email");
//             }

//             setLoading(false);
//         });
//     }

//     return (
//         <Form {...form}>
//             <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="space-y-3 border md:border-0 p-4 md:p-0 rounded-lg"
//             >
//                 <FormField
//                     control={form.control}
//                     name="username"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Username</FormLabel>
//                             <FormControl>
//                                 <Input
//                                     placeholder="juandelacruz"
//                                     {...field}
//                                     autoComplete="username"
//                                 />
//                             </FormControl>

//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 {/* Rest of the form fields */}
//                 {/* ... */}
//                 <div className="button-container pt-2">
//                     {!loading ? (
//                         <Button type="submit" className="w-full">
//                             Book
//                         </Button>
//                     ) : (
//                         <Button disabled className="w-full">
//                             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                             Booking
//                         </Button>
//                     )}
//                 </div>
//             </form>
//         </Form>
//     );
// }
