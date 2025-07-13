import { ResumeType } from "@/lib/validation";
import ClassicTemplate from "@/templates/ClassicTemplate";
import MinimalTemplate from "@/templates/MinimalTemplate";
import ModernTemplate from "@/templates/ModernTemplate";
import CreativeTemplate from "@/templates/CreativeTemplate";

interface ResumePreviewProps {
  resumeData: ResumeType;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}

const templates: Record<string, React.FC<ResumePreviewProps>> = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  creative: CreativeTemplate,
};

export default function ResumePreview({
  resumeData,
  contentRef,
  className,
}: ResumePreviewProps) {
  const templateKey = resumeData.template || "classic";
  const SelectedTemplate = templates[templateKey];

  return (
    <SelectedTemplate
      resumeData={resumeData}
      contentRef={contentRef}
      className={className}
    />
  );
}
