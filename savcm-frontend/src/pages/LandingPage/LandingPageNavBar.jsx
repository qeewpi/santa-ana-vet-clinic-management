import { ModeToggle } from "@/components/ui/toggle-mode";
import Logo from "../../components/ui/logo";

export function LandingPageNavBar() {
  return (
    <div className="grid grid-cols-2 justify-between items-center">
      <Logo />

      <div className="flex justify-end">
        <ModeToggle />
      </div>
    </div>
  );
}
