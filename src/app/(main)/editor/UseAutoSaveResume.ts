import { useDebounce } from "@/hooks/useDebounce";
import { ResumeType } from "@/lib/validation";
import { useEffect, useState } from "react";

export default function UseAutoSaveResume(resumeData: ResumeType) {
  const resumeDebounceResumeData = useDebounce(resumeData, 500);

  const [lastSavedResumeData, setLastSavedResumeData] = useState(
    structuredClone(resumeData),
  );

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function save() {
      setIsSaving(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setLastSavedResumeData(resumeDebounceResumeData);
      setIsSaving(false);
    }

    const hasUnsavedChanges =
      JSON.stringify(lastSavedResumeData) !==
      JSON.stringify(resumeDebounceResumeData);
    if (hasUnsavedChanges && resumeDebounceResumeData && !isSaving) {
      console.log("saving");
      save();
    }
  }, [resumeDebounceResumeData, lastSavedResumeData, isSaving]);
  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(lastSavedResumeData) !==
      JSON.stringify(resumeDebounceResumeData),
  };
}
