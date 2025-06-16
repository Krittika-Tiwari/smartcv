import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { ResumeDataInclude } from "@/lib/type";
import ResumeEditorContainer from "./ResumeEditorContainer";

interface PageProps {
  searchParams: Promise<{ resumeId?: string }>;
}

export const metadata: Metadata = {
  title: "Design your resume",
};
export default async function Page({ searchParams }: PageProps) {
  const { resumeId } = await searchParams;

  const { userId } = await auth();

  if (!userId) return <p>Not authenticated</p>;

  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: { id: resumeId, userId },
        include: ResumeDataInclude,
      })
    : null;

  return <ResumeEditorContainer resumeToEdit={resumeToEdit} />;
}
