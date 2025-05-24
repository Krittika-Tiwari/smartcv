import GeneralInfoForm from "./form/GeneralInfoForm";
import PersonalInfoForm from "./form/PersonalInfoForm";

export const steps: {
  title: string;
  component: React.ComponentType;
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
];
