import React from "react";

import {
  Calendar,
  CircleUserRound,
  CreditCard,
  LayoutDashboard,
  LogOut,
  PawPrint,
  User,
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

import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase/admin";
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
      { icon: LayoutDashboard, label: "Dashboard", shortcut: "⌘D" },
      { icon: PawPrint, label: "Pets", shortcut: "⌘P" },
      { icon: Calendar, label: "Appointments", shortcut: "⌘A" },
    ],
    settings: [
      { icon: User, label: "Users", shortcut: "⌘U" },
      { icon: CreditCard, label: "Billing", shortcut: "⌘B" },
    ],
  },
  // Add commands for other roles here
};

export default function Sidebar({ role, session }) {
  const { toast } = useToast();

  const handleLogout = async () => {
    toast({
      title: "Logging you out...",
      description: "You have been successfully logged out.",
    });
    await supabase.auth.signOut();
  };

  return (
    <div className="fixed h-full min-w-[300px] max-w-[300px] border-r p-4 rounded-none text-left">
      <div className="flex flex-col justify-between h-full">
        {role && (
          <Command>
            <div className="logo-container flex flex-row py-4 justify-between items-center">
              <Logo />
              <ModeToggle />
            </div>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Main Menu">
                {commands[role].mainMenu.map(
                  ({ icon: Icon, label, shortcut }) => (
                    <CommandItem key={label}>
                      <Icon className="mr-2 h-4 w-4" />
                      <span>{label}</span>
                      <CommandShortcut>{shortcut}</CommandShortcut>
                    </CommandItem>
                  )
                )}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                {commands[role].settings.map(
                  ({ icon: Icon, label, shortcut }) => (
                    <CommandItem key={label}>
                      <Icon className="mr-2 h-4 w-4" />
                      <span>{label}</span>
                      <CommandShortcut>{shortcut}</CommandShortcut>
                    </CommandItem>
                  )
                )}
                <div onClick={handleLogout}>
                  <CommandItem key="Log Out">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log Out</span>
                    <CommandShortcut>⌘L</CommandShortcut>
                  </CommandItem>
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        )}
        <div className="userdetails-container flex flex-row items-center pl-1 pr-4 py-2 rounded-sm hover:text-accent-foreground hover:bg-accent gap-x-1">
          <CircleUserRound className="w-8 h-8 stroke-1" />
          <div className="flex flex-col text-xs">
            <p className="font-medium">{`${session?.user?.user_metadata.first_name} ${session?.user?.user_metadata.last_name}`}</p>
            <p className="text-muted-foreground">{session?.user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
