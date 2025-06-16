"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { UserButton } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import { ModeToggle } from "@/components/theme-toggle";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import { Button } from "@/components/ui/button";
import { ResumeServerData } from "@/lib/type";

interface EditorNavbar {
  resume: ResumeServerData | null;
  handelToPrint: () => void;
}

export default function EditorNavbar({ resume, handelToPrint }: EditorNavbar) {
  const { theme } = useTheme();

  return (
    <header className="shadow-sm">
      <div className="max-w-7xl mx-auto p-3 flex items-center justify-between gap-3">
        <Link href="/resumes" className="flex items-center">
          <Image
            src={logo}
            alt="logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-xl font-bold tracking-tight">SmartCv</span>
        </Link>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => resume && handelToPrint()}
              disabled={!resume}
            >
              Print
            </Button>

            {/* <Button variant="secondary">Share</Button> */}
          </div>

          <div className="flex items-center gap-2">
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
      </div>
    </header>
  );
}
