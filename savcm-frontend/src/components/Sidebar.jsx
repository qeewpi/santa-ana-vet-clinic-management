import React, { useState } from "react";

import {
  Briefcase,
  BriefcaseMedical,
  Calendar,
  ChevronFirst,
  ChevronLast,
  CircleUserRound,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  Moon,
  PawPrint,
  Pill,
  Sun,
  SunMoon,
  User,
  Users,
} from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { supabase } from "@/lib/supabase/create";
import { Link, useNavigate } from "react-router-dom";
import LogoDarkImg from "../assets/images/logo-dark.png";
import LogoImg from "../assets/images/logo.png";
import { Button } from "./ui/button";
import { useTheme } from "./ui/theme-provider";
import { ToastAction } from "./ui/toast";
import { useToast } from "./ui/use-toast";

// Define the commands for each role
const commands = {
  user: {
    mainMenu: [
      { icon: LayoutDashboard, label: "Dashboard" },
      { icon: PawPrint, label: "My Pets" },
      { icon: Calendar, label: "Appointments" },
    ],
    settings: [
      { icon: User, label: "Profile" },
      { icon: CreditCard, label: "Invoice" },
    ],
  },
  admin: {
    mainMenu: [
      {
        icon: LayoutDashboard,
        label: "Dashboard",
      },
      { icon: PawPrint, label: "Pets" },
      {
        icon: Calendar,
        label: "Appointments",
      },
      {
        icon: Users,
        label: "Members",
      },
      { icon: BriefcaseMedical, label: "Staff", shortcut: "⌘S" },
      { icon: Briefcase, label: "Services", to: "/services" },
      { icon: Pill, label: "Medications", to: "/medications" },
    ],
    settings: [
      {
        icon: CreditCard,
        label: "Invoice",
      },
      {
        icon: FileText,
        label: "Reports",
      },
      { icon: User, label: "Profile" },
    ],
  },
  // Add commands for other roles here
};

function processLabel(label) {
  return label.toLowerCase().replace(" ", "-");
}

export default function Sidebar({ role, session, isExpanded, setIsExpanded }) {
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const { setTheme } = useTheme();
  const theme = useTheme();

  const { toast } = useToast();

  let navigate = useNavigate();

  const handleLogout = async () => {
    toast({
      title: "You are being logged out.",
      description: "Please wait while we log you out.",
      action: (
        <ToastAction onClick={() => navigate("/login")} altText="Log In">
          Log In
        </ToastAction>
      ),
    });
    await supabase.auth.signOut();

    toast({
      title: "You have been logged out.",
      description: "You can log back in at any time",
      action: (
        <ToastAction onClick={() => navigate("/login")} altText="Log In">
          Log In
        </ToastAction>
      ),
    });
  };

  const handleToggle = () => {
    setExpanded((prevExpanded) => !prevExpanded);
    setIsExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div
      className={`max-h-screen overflow-hidden transition-all fixed flex grow h-full border-r p-4 rounded-none text-left ${
        expanded ? "min-w-[300px] max-w-[300px]" : "min-w-[86px] max-w-[86px]"
      }`}
    >
      <div className="flex flex-col justify-between grow">
        {role && (
          <Command className="flex flex-grow">
            <div
              className={`logo-container flex flex-row py-4 items-center ${
                expanded ? "justify-between" : "justify-center"
              }`}
            >
              <Link to="/dashboard">
                {theme.theme === "light" ? (
                  <img
                    src={LogoImg}
                    alt="Logo"
                    className={`overflow-hidden transition-all ease-in-out ${
                      expanded ? "w-48" : "w-0"
                    }`}
                  />
                ) : (
                  <img
                    src={LogoDarkImg}
                    alt="Logo"
                    className={`overflow-hidden transition-all ease-in-out ${
                      expanded ? "w-48" : "w-0"
                    }`}
                  />
                )}
              </Link>

              <Button variant="outline" size="icon" onClick={handleToggle}>
                {expanded ? (
                  <ChevronFirst className="h-4 w-4" />
                ) : (
                  <ChevronLast className="h-4 w-4" />
                )}
              </Button>
            </div>
            <CommandInput
              placeholder="Type a command or search..."
              className={`overflow-hidden transition-all ease-in-out flex flex-col text-xs pl-1 ${
                expanded ? "w-48" : "w-0"
              }`}
            />

            <CommandList className="min-h-full">
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup className="overflow-hidden transition-all ease-in-out flex flex-col text-xs pl-1">
                <div
                  className={`overflow-hidden transition-all ease-in-out ${
                    expanded ? "w-full" : "hidden"
                  }`}
                >
                  <h2 className="px-2 py-1.5 font-medium text-muted-foreground">
                    Main Menu
                  </h2>
                </div>
                {commands[role].mainMenu.map(({ icon: Icon, label }) => {
                  let to =
                    label === "Dashboard"
                      ? "/dashboard"
                      : "/dashboard/" + processLabel(label);
                  return (
                    <Link to={to} key={to}>
                      <CommandItem>
                        <Icon className="mr-2 h-4 w-4" />
                        <span
                          className={`overflow-hidden transition-all ease-in-out flex flex-col text-xs pl-1 ${
                            expanded ? "w-48" : "w-0"
                          }`}
                        >
                          {label}
                        </span>
                      </CommandItem>
                    </Link>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup className="overflow-hidden transition-all ease-in-out flex flex-col text-xs pl-1">
                <div
                  className={`overflow-hidden transition-all ease-in-out ${
                    expanded ? "w-full" : "hidden"
                  }`}
                >
                  <h2 className="px-2 py-1.5 font-medium text-muted-foreground">
                    Settings
                  </h2>
                </div>
                {commands[role].settings.map(({ icon: Icon, label }) => {
                  let to = "/dashboard/" + processLabel(label);
                  return (
                    <Link to={to} key={to}>
                      <CommandItem>
                        <Icon className="mr-2 h-4 w-4" />
                        <span
                          className={`overflow-hidden transition-all ease-in-out flex flex-col text-xs pl-1 ${
                            expanded ? "w-48" : "w-0"
                          }`}
                        >
                          {label}
                        </span>
                      </CommandItem>
                    </Link>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        )}

        <DropdownMenu className="min-w-full">
          <DropdownMenuTrigger>
            <div
              className={`userdetails-container flex flex-row items-center px-1  rounded-sm hover:text-accent-foreground hover:bg-accent gap-x-1 text-start justify-between ${
                expanded ? "py-2" : "justify-center items-center h-10 w-8"
              }`}
            >
              <div
                className={`flex ${
                  expanded
                    ? ""
                    : "py-0 pb-2 justify-center items-center h-8 w-8"
                }`}
              >
                <CircleUserRound
                  className={`overflow-hidden transition-all ease-in-out w-8 h-8 stroke-1 ${
                    expanded ? "" : "mt-2"
                  }`}
                />
                <div
                  className={`overflow-hidden transition-all ease-in-out flex flex-col text-xs pl-1 ${
                    expanded ? "w-48" : "w-0"
                  }`}
                >
                  <p className="font-medium">{`${session?.user?.user_metadata.first_name} ${session?.user?.user_metadata.last_name}`}</p>
                  <p className="text-muted-foreground">
                    {session?.user?.email}
                  </p>
                </div>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="justify-start min-w-[272px]">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Theme</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <SunMoon className="mr-2 h-4 w-4" />
                System
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <div onClick={handleLogout}>
              <DropdownMenuItem className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
