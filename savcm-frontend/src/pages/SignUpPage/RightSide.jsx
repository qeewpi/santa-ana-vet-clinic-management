import React from "react";
import { CalendarDays, ShieldCheck } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import catAndDogImage from "@/assets/images/cats-and-dogs.png";
import { useTheme } from "@/components/ui/theme-provider";
const App = () => {
  return (
    <div>
      <CalendarDays />
      <ShieldCheck />
    </div>
  );
};

function RightSide() {
  const theme = useTheme();

  return (
    <div className="flex flex-col py-24 px-8 md:px-16 lg:px-32 :px-36 min-h-full text-foreground">
      <div className="text-container p-8">
        <h1 className="text-3xl font-bold text-center">
          Simplify Your Pet Care Experience with Our App
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Take the stress out of caring for your furry friend with our all-in-one pet care app.
        </p>
      </div>
      <div className="px-12">
        <div className="benefit transform transition-transform duration-300 ease-in-out hover:scale-105">
          <Card>
            <div className="flex justify-center items-center mt-6">
              <CalendarDays className="w-12 h-12" /> 
            </div>
            <CardHeader>
              <CardTitle>Easy Appointment Scheduling</CardTitle>
              <CardDescription>
                Schedule vet visits, grooming sessions, and dog walking services – all in one place, anytime.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="benefit transform transition-transform duration-300 ease-in-out hover:scale-105 mt-2">
          <Card>
            <div className="flex justify-center items-center mt-6">
              <ShieldCheck className="w-12 h-12" />
            </div>
            <CardHeader>
              <CardTitle>Secure Access to Pet Records</CardTitle>
              <CardDescription>
                Keep track of your pet's vaccination history, medications, and medical notes – all organized and readily available.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="">
          <img src={catAndDogImage} alt="catAndDogImage" />
        </div>
      </div>

      {theme.theme === "light" ? (
        <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#735C3C_100%)]"></div>
      ) : (
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#735C3C_100%)]"></div>
      )}
    </div>
  );
}

export default RightSide;
