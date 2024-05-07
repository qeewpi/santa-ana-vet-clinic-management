import React, { useState } from "react";

import {
  BriefcaseMedical,
  Calendar,
  CircleUserRound,
  Cog,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  PawPrint,
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
  CommandShortcut,
} from "@/components/ui/command";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { supabase } from "@/lib/supabase/admin";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Logo from "./ui/logo";
import { ModeToggle } from "./ui/toggle-mode";

// Define the commands for each role
const commands = {
  user: {
    mainMenu: [
      { icon: LayoutDashboard, label: "Dashboard", shortcut: "⌘D" },
      { icon: PawPrint, label: "My Pets", shortcut: "⌘P" },
      { icon: Calendar, label: "Appointments", shortcut: "⌘A" },
    ],
    settings: [
      { icon: User, label: "Profile", shortcut: "⌘P" },
      { icon: CreditCard, label: "Billing", shortcut: "⌘B" },
    ],
  },
  admin: {
    mainMenu: [
      {
        icon: LayoutDashboard,
        label: "Dashboard",
        shortcut: "⌘D",
      },
      { icon: PawPrint, label: "Pets", shortcut: "⌘P" },
      {
        icon: Calendar,
        label: "Appointments",
        shortcut: "⌘A",
      },
      {
        icon: Users,
        label: "Clients",
        shortcut: "⌘C",
      },
      { icon: BriefcaseMedical, label: "Staff", shortcut: "⌘S" },
    ],
    settings: [
      {
        icon: CreditCard,
        label: "Billing",
        shortcut: "⌘B",
      },
      {
        icon: FileText,
        label: "Reports",
        shortcut: "⌘R",
      },
      {
        icon: Cog,
        label: "System Settings",
        shortcut: "⌘,",
      },
    ],
  },
  // Add commands for other roles here
};

function processLabel(label) {
  return label.toLowerCase().replace(" ", "-");
}

export default function Sidebar({ role, session }) {
  const { loading, setLoading } = useState(false);
  let navigate = useNavigate();

  const handleLogout = async () => {
    toast("You have been logged out", {
      description: "You can log back in at any time",
      action: {
        label: "Log In",
        onClick: () => {
          navigate("/login");
        },
      },
    });
    await supabase.auth.signOut();
  };

  return (
    <div className="fixed h-full min-w-[300px] max-w-[300px] border-r p-4 rounded-none text-left">
      <div className="flex flex-col justify-between h-full">
        {role && (
          <Command className="min-h-full">
            <div className="logo-container flex flex-row py-4 justify-between items-center">
              <Logo />
              <ModeToggle />
            </div>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList className="min-h-full">
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Main Menu">
                {commands[role].mainMenu.map(
                  ({ icon: Icon, label, shortcut }) => {
                    let to =
                      label === "Dashboard"
                        ? "/dashboard"
                        : "/dashboard/" + processLabel(label);
                    return (
                      <Link to={to} key={to}>
                        <CommandItem>
                          <Icon className="mr-2 h-4 w-4" />
                          <span>{label}</span>
                          <CommandShortcut>{shortcut}</CommandShortcut>
                        </CommandItem>
                      </Link>
                    );
                  }
                )}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                {commands[role].settings.map(
                  ({ icon: Icon, label, shortcut }) => {
                    let to = "/dashboard/" + processLabel(label);
                    return (
                      <Link to={to} key={to}>
                        <CommandItem>
                          <Icon className="mr-2 h-4 w-4" />
                          <span>{label}</span>
                          <CommandShortcut>{shortcut}</CommandShortcut>
                        </CommandItem>
                      </Link>
                    );
                  }
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        )}

        <DropdownMenu className="min-w-full">
          <DropdownMenuTrigger>
            <div className="userdetails-container flex flex-row items-center pl-1 pr-4 py-2 rounded-sm hover:text-accent-foreground hover:bg-accent gap-x-1 text-start">
              <CircleUserRound className="w-8 h-8 stroke-1" />
              <div className="flex flex-col text-xs">
                <p className="font-medium">{`${session?.user?.user_metadata.first_name} ${session?.user?.user_metadata.last_name}`}</p>
                <p className="text-muted-foreground">{session?.user?.email}</p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="justify-start min-w-[16rem]">
            <div onClick={handleLogout}>
              <DropdownMenuItem className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
