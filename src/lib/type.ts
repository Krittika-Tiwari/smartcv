import { ResumeType } from "./validation";

export interface EditorFormProps {
  resumeData: ResumeType;
  setResumeData: (data: ResumeType) => void;
}
