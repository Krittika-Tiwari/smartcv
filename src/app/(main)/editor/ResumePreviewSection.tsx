import ColorPicker from "@/components/ColorPicker";
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
    <div className="relative hidden w-1/2 md:flex">
      <div className="absolute top-1 left-1 flex flex-none flex-col gap-3 lg:left-3 lg:top-3">
        <ColorPicker
          color={resumeData.colorHex}
          onChange={(color) =>
            setResumeDate({ ...resumeData, colorHex: color.hex })
          }
        />
      </div>
      <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
        <ResumePreview
          resumeData={resumeData}
          className="max-w-2xl shadow-md"
        />
      </div>
    </div>
  );
}
