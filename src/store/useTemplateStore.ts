// stores/useTemplateStore.ts
import { create } from "zustand";

type TemplateStore = {
  selectedTemplateId: string | null;
  setSelectedTemplate: (id: string) => void;
};

export const useTemplateStore = create<TemplateStore>((set) => ({
  selectedTemplateId: null,
  setSelectedTemplate: (id) => set({ selectedTemplateId: id }),
}));
