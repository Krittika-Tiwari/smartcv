"use client";
import LoadingButton from "@/components/LoadingButton";
import { ResumeType } from "@/lib/validation";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { generateSummary } from "./action";

interface GenerateSummaryButtonProps {
  resumeData: ResumeType;
  onSummaryGenerated: (summary: string) => void;
}
export default function GenerateSummaryButton({
  resumeData,
  onSummaryGenerated,
}: GenerateSummaryButtonProps) {
  const [loading, setLoading] = useState(false);
  async function handelClick() {
    try {
      setLoading(true);
      const aiResponse = await generateSummary(resumeData);
      onSummaryGenerated(aiResponse.summary);
    } catch {
      toast.error("Failed to generate summary. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <LoadingButton
      variant={"outline"}
      type="button"
      loading={loading}
      onClick={handelClick}
    >
      <WandSparklesIcon className="size-4" />
      Generate (AI)
    </LoadingButton>
  );
}
