import ResumePreview from "@/components/ResumePreview";
import { ResumeType } from "@/lib/validation";

interface ResumePreviewSectionProps {
  resumeData: ResumeType;
  setResumeDate: (data: ResumeType) => void;
}
export default function ResumePreviewSection({
  resumeData,
  setResumeDate,
}: ResumePreviewSectionProps) {
  return (
    <div className="hidden w-1/2 md:flex">
      <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
        <ResumePreview
          resumeData={resumeData}
          className="max-w-2xl shadow-md"
        />
      </div>
    </div>
  );
}
