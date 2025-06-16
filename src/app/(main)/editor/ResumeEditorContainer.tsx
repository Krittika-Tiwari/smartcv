"use client";
import { ResumeServerData } from "@/lib/type";
import EditorNavbar from "./EditorNavbar";
import ResumeEditor from "./ResumeEditor";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

interface ResumeFormProps {
  resumeToEdit: ResumeServerData | null;
}
export default function ResumeEditorContainer({
  resumeToEdit,
}: ResumeFormProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: resumeToEdit?.title || "Resume",
  });

  return (
    <>
      <EditorNavbar resume={resumeToEdit} handelToPrint={handlePrint} />
      <ResumeEditor resumeToEdit={resumeToEdit} contentRef={contentRef} />
    </>
  );
}
