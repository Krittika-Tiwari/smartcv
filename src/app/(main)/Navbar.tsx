"use client";

import { UserButton } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import { ModeToggle } from "@/components/theme-toggle";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export default function Navbar() {
  const { theme } = useTheme();
  return (
    <header className="w-full mt-2 border-1 rounded-lg  shadow-sm bg-transparent backdrop-blur-3xl">
      <div className=" w-full mx-auto p-3 flex items-center justify-between gap-3">
        <SidebarTrigger className="" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex items-center gap-3">
          <ModeToggle />
          <UserButton
            appearance={{
              baseTheme: theme === "dark" ? dark : undefined,
              elements: {
                avatarBox: {
                  width: 35,
                  height: 35,
                },
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Link
                label="Billing"
                labelIcon={<CreditCard size={15} />}
                href="/billing"
              />
            </UserButton.MenuItems>
          </UserButton>
        </div>
      </div>
    </header>
  );
}
