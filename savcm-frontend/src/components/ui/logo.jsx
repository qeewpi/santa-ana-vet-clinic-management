import { Cat } from "lucide-react";

function Logo() {
  return (
    <div className="flex flex-row items-center gap-2">
      <Cat className="stroke-2 stroke-primary" />
      <h1 className="text-2xl font-bold text-primary">SAAHC</h1>
    </div>
  );
}

export default Logo;
