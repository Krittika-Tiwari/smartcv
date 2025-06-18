import prisma from "@/lib/prisma";
import { ResumeDataInclude } from "@/lib/type";
import ResumePreviewContainer from "../ResumePreviewContainer";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ resumeId?: string }>;
}

export default async function PreviewPage({ params }: PageProps) {
  const { resumeId } = await params;

  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: { id: resumeId },
        include: ResumeDataInclude,
      })
    : null;

  if (!resumeToEdit) {
    return <p className="text-center mt-10 text-red-500">Resume not found</p>;
  }

  return <ResumePreviewContainer resumeData={resumeToEdit} />;
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { resumeId } = await params;
  const resume = await prisma.resume.findUnique({
    where: { id: resumeId },
    include: ResumeDataInclude,
  });

  if (!resume) {
    return {
      title: "Resume Not Found",
    };
  }

  const title = resume.title || "My Resume";
  const description = resume.summary || "Check out this awesome resume!";
  //   const image = `${process.env.NEXT_PUBLIC_BASE_URL}/preview.png`; // Or dynamic OG image

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/preview/${resumeId}`,
      type: "website",
      //   images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      //   images: [image],
    },
  };
}
