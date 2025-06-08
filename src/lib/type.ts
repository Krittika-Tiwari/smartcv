import { ResumeType } from "./validation";
import { Prisma } from "@prisma/client";

export interface EditorFormProps {
  resumeData: ResumeType;
  setResumeData: (data: ResumeType) => void;
}

export const ResumeDataInclude = {
  educations: true,
  workExperiences: true,
} satisfies Prisma.ResumeInclude;

export type ResumeServerData = Prisma.ResumeGetPayload<{
  include: typeof ResumeDataInclude;
}>;
