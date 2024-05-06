import AOS from "aos";
import "aos/dist/aos.css";
import { ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { useTheme } from "../../components/ui/theme-provider";

function Hero() {
  const { theme } = useTheme();
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="text-center">
      <h1
        className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl"
        data-aos="fade-down"
      >
        Simplify Veterinary Care with Our Clinic Management System
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6" data-aos="fade-up">
        Streamline operations, improve patient care, and boost efficiency at
        Santa Ana Animal Health Clinic.
      </p>

      <div className="button-group flex flex-row items-center justify-center gap-4 pt-4">
        <Link to="/login">
          <Button variant="ghost" data-aos="fade-right">
            Log in
          </Button>
        </Link>
        <Link to="/sign-up">
          <Button variant="outline" data-aos="fade-right">
            Sign up
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
