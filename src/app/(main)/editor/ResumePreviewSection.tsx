import BorderStyleButton from "@/components/BorderStyleButton";
import ColorPicker from "@/components/ColorPicker";
import ResumePreview from "@/components/ResumePreview";
import TemplatePickerPopover from "@/components/Template";
import { cn } from "@/lib/utils";
import { ResumeType } from "@/lib/validation";

interface ResumePreviewSectionProps {
  resumeData: ResumeType;
  setResumeDate: (data: ResumeType) => void;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}
export default function ResumePreviewSection({
  resumeData,
  setResumeDate,
  className,
  contentRef,
}: ResumePreviewSectionProps) {
  return (
    <div
      className={cn("group relative hidden md:w-1/2 md:flex w-full", className)}
    >
      <div className=" absolute top-1 left-1 flex flex-none flex-col gap-3 opacity-50 xl:opacity-100 group-hover:opacity-100 transition-opacity lg:left-3 lg:top-3">
        <ColorPicker
          color={resumeData.colorHex}
          onChange={(color) =>
            setResumeDate({ ...resumeData, colorHex: color.hex })
          }
        />
        <BorderStyleButton
          borderStyle={resumeData.borderStyle}
          onChange={(borderStyle) =>
            setResumeDate({ ...resumeData, borderStyle })
          }
        />
        <TemplatePickerPopover
          selectedTemplateId={resumeData.template}
          onSelect={(id) => setResumeDate({ ...resumeData, template: id })}
        />
      </div>
      <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
        <ResumePreview
          resumeData={resumeData}
          className="max-w-2xl shadow-md"
          contentRef={contentRef}
        />
      </div>
    </div>
  );
}
