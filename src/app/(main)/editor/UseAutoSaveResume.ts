import { useDebounce } from "@/hooks/useDebounce";
import { ResumeType } from "@/lib/validation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { saveResume } from "./action";
import { toast } from "sonner";

export default function UseAutoSaveResume(resumeData: ResumeType) {
  const searchParams = useSearchParams();

  const DebounceResumeData = useDebounce(resumeData, 500);

  const [resumeId, setResumeId] = useState(resumeData.id);

  const [lastSavedResumeData, setLastSavedResumeData] = useState(
    structuredClone(resumeData),
  );

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [DebounceResumeData]);

  useEffect(() => {
    async function save() {
      try {
        setIsSaving(true);
        setError(false);

        const newData = structuredClone(DebounceResumeData);

        const updatedData = await saveResume({
          ...newData,
          ...(lastSavedResumeData.photo?.toString() ===
            newData.photo?.toString() && {
            photo: undefined,
          }),
          id: resumeId,
        });

        setResumeId(updatedData.id);
        setLastSavedResumeData(newData);
        if (searchParams.get("resumeId") != updatedData.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("resumeId", updatedData.id);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`,
          );
        }
        setIsSaving(false);
      } catch (error) {
        setError(true);
        console.error(error);
      }
    }

    const hasUnsavedChanges =
      JSON.stringify(lastSavedResumeData) !==
      JSON.stringify(DebounceResumeData);
    if (hasUnsavedChanges && DebounceResumeData && !isSaving) {
      console.log("saving");
      save();
    }
  }, [DebounceResumeData, lastSavedResumeData, isSaving]);
  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(lastSavedResumeData) !==
      JSON.stringify(DebounceResumeData),
  };
}
