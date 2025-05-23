import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Your Resumes",
};
export default function page() {
  return (
    <main className="max-w-7xl mx-auto w-full px-3 py-6 space-x-6">
      <Button asChild className="mx-auto w-fit flex gap-2">
        <Link href="/editor">
          <PlusSquare className="size-5" />
          New resume
        </Link>
      </Button>
    </main>
  );
}
