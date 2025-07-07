import { string, z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));

export const generalInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
});

export type GeneralInfoType = z.infer<typeof generalInfoSchema>;

export const personalInfoSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "Must be an image file",
    )
    .refine(
      (file) => !file || file.size <= 1024 * 1024 * 4,
      "File must be less than 4MB",
    ),
  firstName: optionalString,
  lastName: optionalString,
  jobTitle: optionalString,
  city: optionalString,
  country: optionalString,
  phone: optionalString,
  email: optionalString,
});

export type PersonalInfoType = z.infer<typeof personalInfoSchema>;

export const workExperienceSchema = z.object({
  workExperiences: z
    .array(
      z.object({
        company: optionalString,
        position: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        description: optionalString,
      }),
    )
    .optional(),
});

export type WorkExperienceType = z.infer<typeof workExperienceSchema>;

export const eductionSchema = z.object({
  educations: z
    .array(
      z.object({
        school: optionalString,
        degree: optionalString,
        startDate: optionalString,
        endDate: optionalString,
      }),
    )
    .optional(),
});
export type EducationType = z.infer<typeof eductionSchema>;
export const projectSchema = z.object({
  projects: z
    .array(
      z.object({
        name: optionalString,
        description: optionalString,
        url: optionalString,
        startDate: optionalString,
        endDate: optionalString,
      }),
    )
    .optional(),
});

export type ProjectType = z.infer<typeof projectSchema>;
export const skillSchema = z.object({
  skills: z.array(string().trim()).optional(),
});

export type SkillType = z.infer<typeof skillSchema>;

export const summarySchema = z.object({
  summary: optionalString,
});

export type SummaryType = z.infer<typeof summarySchema>;
export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
  ...eductionSchema.shape,
  ...projectSchema.shape,
  ...skillSchema.shape,
  ...summarySchema.shape,
  colorHex: optionalString,
  borderStyle: optionalString,
  template: optionalString,
});

export type ResumeType = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: string | File | null;
};
