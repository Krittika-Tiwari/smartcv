"use client";

import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import BreadCrumbs from "./BreadCrumbs";
import Footer from "./Footer";
import { useState } from "react";
import { ResumeType } from "@/lib/validation";
import ResumePreviewSection from "./ResumePreviewSection";
import { cn } from "@/lib/utils";

export default function ResumeEditor() {
  const searchParams = useSearchParams();

  const [resumeData, setResumeData] = useState<ResumeType>({});
  const [showSmResumePreview, setShowSmRensumePreview] =
    useState<boolean>(false);
  const currentStep = searchParams.get("step") || steps[0].key;

  function setSteps(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.component;
  return (
    <div className="flex grow flex-col">
      <header className="space-y-1.5 border-b px-3 py-5 text-center">
        <h1 className="text-2xl font-bold">Design your resume</h1>
        <p className="text-sm text-muted-foreground">
          Follow the step below to create your resume. Your progress will be
          saved automatically.
        </p>
      </header>
      <main className="relative grow">
        <div className="absolute top-0  bottom-0 flex w-full">
          <div
            className={cn(
              "w-full p-3 md:w-1/2 overflow-y-auto space-y-6 md:block",
              showSmResumePreview && "hidden",
            )}
          >
            <BreadCrumbs currentStep={currentStep} setCurrentStep={setSteps} />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>
          <div className="grow md:border-r" />
          <ResumePreviewSection
            resumeData={resumeData}
            setResumeDate={setResumeData}
            className={cn(showSmResumePreview && "flex")}
          />
        </div>
      </main>
      <Footer
        currentStep={currentStep}
        setCurrentStep={setSteps}
        setShowSmRensumePreview={setShowSmRensumePreview}
        showSmResumePreview={showSmResumePreview}
      />
    </div>
  );
}
