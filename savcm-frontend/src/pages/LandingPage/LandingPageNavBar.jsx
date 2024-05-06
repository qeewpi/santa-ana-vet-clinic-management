import { ModeToggle } from "@/components/ui/toggle-mode";
import Logo from "../../components/ui/logo";

export function LandingPageNavBar() {
  return (
    <div className="grid grid-cols-2 justify-between items-center ">
      <div className="transform transition-transform duration-500 ease-in-out hover:scale-110">
      <Logo />
      </div>

      <div className="flex justify-end">
        <ModeToggle />
      </div>
    </div>
  );
}
