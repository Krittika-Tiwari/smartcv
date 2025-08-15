import { ResumeTemplate } from "@prisma/client";

import { z } from "zod";

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
  linkedin: optionalString,
  github: optionalString,
  leetcode: optionalString,
  portfolio: optionalString,
  rollNumber: optionalString,
  degree: optionalString,
  branch: optionalString,
  institute: optionalString,
  instituteEmail: optionalString,
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
export type WorkExperience = NonNullable<z.infer<typeof workExperienceSchema>["workExperiences"]>[number];

export const eductionSchema = z.object({
  educations: z
    .array(
      z.object({
        school: optionalString,
        degree: optionalString,
        cgpa: optionalString,
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
        github: optionalString,
        stack: z.array(z.string().trim()),
        startDate: optionalString,
        endDate: optionalString,
      }),
    )
    .optional(),
});

export type ProjectType = z.infer<typeof projectSchema>;

export const skillSchema = z.object({
  skills: z
    .array(
      z.object({
        category: optionalString,
        values: z.array(z.string().trim()),
      }),
    )
    .optional(),
});

export type SkillType = z.infer<typeof skillSchema>;

export const achievementSchema = z.object({
  achievements: z
    .array(
      z.object({
        title: optionalString,
        issuer: optionalString,
        startDate: optionalString,
        endDate: optionalString,
      }),
    )
    .optional(),
});

export type AchievementType = z.infer<typeof achievementSchema>;

export const certificateSchema = z.object({
  certificates: z
    .array(
      z.object({
        name: optionalString,
        issuer: optionalString,
        url: optionalString,
        date: optionalString,
      }),
    )
    .optional(),
});

export type CertificateType = z.infer<typeof certificateSchema>;

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
  ...achievementSchema.shape,
  ...certificateSchema.shape,
  colorHex: optionalString,
  borderStyle: optionalString,

  template: z.nativeEnum(ResumeTemplate).optional(),
});

export type ResumeType = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: string | File | null;
};

export const generateWorkExperienceSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .min(20, "Description must be at least 20 characters"),
});

export type GenerateWorkExperienceType = z.infer<
  typeof generateWorkExperienceSchema
>;

export const generateSummerySchema = z.object({
  jobTitle: optionalString,
  ...workExperienceSchema.shape,
  ...eductionSchema.shape,
  ...projectSchema.shape,
  ...skillSchema.shape,
  ...achievementSchema.shape,
});

export type GenerateSummeryType = z.infer<typeof generateSummerySchema>;
