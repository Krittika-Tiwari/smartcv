import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { ResumeDataInclude } from "@/lib/type";
import { auth } from "@clerk/nextjs/server";
import { PlusSquare } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import ResumeItem from "./ResumeItem";
import EmptyResume from "./EmptyResume";

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
    <main className="relative  max-w-7xl mx-auto w-full px-6 py-24">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Your Resumes
          </h1>
          <p className="text-xs text-muted-foreground">
            You have <span className="font-medium">{totalCount}</span> resume
            {totalCount !== 1 && "s"} saved.
          </p>
        </div>

        <Button
          asChild
          size="xl"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-transform hover:scale-105"
        >
          <Link href="/editor" className="flex items-center gap-2">
            <PlusSquare className="size-5" />
            New Resume
          </Link>
        </Button>
      </div>

      {resumes.length === 0 ? (
        <div className="relative max-w-2xl mx-auto px-6 sm:px-8 lg:px-10 py-14 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24 animate-fade-in">
          <EmptyResume />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
          {resumes.map((resume) => (
            <ResumeItem key={resume.id} resume={resume} />
          ))}
        </div>
      )}
    </main>
  );
}
