import { EditorFormProps } from "@/lib/type";
import GeneralInfoForm from "./form/GeneralInfoForm";
import PersonalInfoForm from "./form/PersonalInfoForm";
import WorkExperision from "./form/WorkExperisionForm";
import EductionForm from "./form/EductionForm";
import SkillForm from "./form/SkillForm";
import SummaryForm from "./form/SummaryForm";
import ProjectForm from "./form/ProjectForm";
import CertificateForm from "./form/CertificateForm";
import AchievementForm from "./form/AchievementForm";

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
  {
    title: "Projects",
    component: ProjectForm,
    key: "projects",
  },
  {
    title: "Education",
    component: EductionForm,
    key: "education",
  },

  {
    title: "Skills",
    component: SkillForm,
    key: "skills",
  },
  {
    title: "Achievements",
    component: AchievementForm,
    key: "achievements",
  },

  {
    title: "Certificates",
    component: CertificateForm,
    key: "certificates",
  },
  {
    title: "Summary",
    component: SummaryForm,
    key: "summary",
  },
];
