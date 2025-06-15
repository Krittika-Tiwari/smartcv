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
    <main className="max-w-7xl mx-auto w-full px-6 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Your Resumes
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            You have <span className="font-medium">{totalCount}</span> resume
            {totalCount !== 1 && "s"} saved.
          </p>
        </div>

        <Button
          asChild
          size="lg"
          className="bg-violet-700 hover:bg-violet-800 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-transform hover:scale-105"
        >
          <Link href="/editor" className="flex items-center gap-2">
            <PlusSquare className="size-5" />
            New Resume
          </Link>
        </Button>
      </div>

      {/* Resume Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {resumes.map((resume) => (
          <ResumeItem key={resume.id} resume={resume} />
        ))}
      </div>
    </main>
  );
}
