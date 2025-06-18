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
    <div className="flex flex-col items-center gap-4">
      <ResumePreview resumeData={mapToResumeValues(resumeData)} />
    </div>
  );
}
