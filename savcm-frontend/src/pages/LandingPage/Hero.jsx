import { ChevronRight } from "lucide-react";
import { Button } from "../../components/ui/button";

function Hero() {
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
        Simplify Veterinary Care with Our Clinic Management System
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Streamline operations, improve patient care, and boost efficiency at
        Santa Ana Animal Health Clinic.
      </p>

      <div className="button-group flex flex-row items-center justify-center gap-4 pt-4">
        <Button variant="ghost">Log in</Button>
        <Button variant="outline">
          Sign up
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

export default Hero;
