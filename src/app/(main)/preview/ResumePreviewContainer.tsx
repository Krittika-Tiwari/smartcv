"use client";

import ResumePreview from "@/components/ResumePreview";
import { ResumeServerData } from "@/lib/type";
import { mapToResumeValues } from "@/lib/utils";
interface ResumePreviewContainerProps {
  resumeData: ResumeServerData;
}

export default function ResumePreviewContainer({
  resumeData,
}: ResumePreviewContainerProps) {
  return (
    <div className="flex w-full justify-center overflow-y-auto bg-secondary p-7 px-16">
      <ResumePreview resumeData={mapToResumeValues(resumeData)} />
    </div>
  );
}
