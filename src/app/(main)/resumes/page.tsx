import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { ResumeDataInclude } from "@/lib/type";
import { auth } from "@clerk/nextjs/server";
import { PlusSquare } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import ResumeItem from "./ResumeItem";

export const metadata: Metadata = {
  title: "Your Resumes",
};
export default async function page() {
  const { userId } = await auth();

  if (!userId) return <p>Not authenticated</p>;

  const [resumes, totalCount] = await Promise.all([
    prisma.resume.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: ResumeDataInclude,
    }),
    prisma.resume.count({ where: { userId } }),
  ]);

  return (
    <main className="max-w-7xl mx-auto w-full px-3 py-6 space-x-6">
      <Button asChild className="mx-auto w-fit flex gap-2">
        <Link href="/editor">
          <PlusSquare className="size-5" />
          New resume
        </Link>
      </Button>
      <div className="space-y-1 ">
        <h1 className="text-3xl font-bold">Your resumes</h1>
        <p>Total:{totalCount}</p>
      </div>
      <div className="flex flex-col sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-3">
        {resumes.map((resume) => (
          <ResumeItem key={resume.id} resume={resume} />
        ))}
      </div>
    </main>
  );
}
