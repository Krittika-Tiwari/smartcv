import { EditorFormProps } from "@/lib/type";
import GeneralInfoForm from "./form/GeneralInfoForm";
import PersonalInfoForm from "./form/PersonalInfoForm";
import WorkExperision from "./form/WorkExperisionForm";

export const steps: {
  title: string;
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  {
    title: "General info",
    component: GeneralInfoForm,
    key: "general-info",
  },
  {
    title: "Personal info",
    component: PersonalInfoForm,
    key: "personal-info",
  },
  {
    title: "Work experience",
    component: WorkExperision,
    key: "work-experience",
  },
];
