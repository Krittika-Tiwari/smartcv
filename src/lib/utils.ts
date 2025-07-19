import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ResumeServerData } from "./type";
import { ResumeType } from "./validation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function fileReplacer(key: unknown, value: unknown) {
  return value instanceof File
    ? {
        name: value.name,
        size: value.size,
        type: value.type,
        lastModified: value.lastModified,
      }
    : value;
}
export function mapToResumeValues(data: ResumeServerData): ResumeType {
  return {
    id: data.id,
    title: data.title || undefined,
    description: data.description || undefined,
    photo: data.photoUrl || undefined,
    firstName: data.firstName || undefined,
    lastName: data.lastName || undefined,
    jobTitle: data.jobTitle || undefined,
    city: data.city || undefined,
    country: data.country || undefined,
    phone: data.phone || undefined,
    email: data.email || undefined,
    linkedin: data.linkedin || undefined,
    leetcode: data.leetcode || undefined,
    github: data.github || undefined,
    portfolio: data.portfolio || undefined,
    template: data.template,
    rollNumber: data.rollNumber || undefined,
    degree: data.degree || undefined,
    branch: data.branch || undefined,
    institute: data.institute || undefined,
    instituteEmail: data.instituteEmail || undefined,
    workExperiences: data.workExperiences.map((exp) => ({
      position: exp.position || undefined,
      company: exp.company || undefined,
      startDate: exp.startDate?.toISOString().split("T")[0],
      endDate: exp.endDate?.toISOString().split("T")[0],
      description: exp.description || undefined,
    })),
    educations: data.educations.map((edu) => ({
      degree: edu.degree || undefined,
      school: edu.school || undefined,
      cgpa: edu.cgpa || undefined,
      startDate: edu.startDate?.toISOString().split("T")[0],
      endDate: edu.endDate?.toISOString().split("T")[0],
    })),
    projects: data.projects.map((project) => ({
      name: project.name || undefined,
      description: project.description || undefined,
      url: project.url || undefined,
      github: project.github || undefined,
      stack: project.stack || undefined,
      startDate: project.startDate?.toISOString().split("T")[0],
      endDate: project.endDate?.toISOString().split("T")[0],
    })),
    skills: data.skills.map((skill) => ({
      category: skill.category || undefined,
      values: skill.values || undefined,
    })),
    achievements: data.achievements.map((achievement) => ({
      title: achievement.title || undefined,
      issuer: achievement.issuer || undefined,
      startDate: achievement.startDate?.toISOString().split("T")[0],
      endDate: achievement.endDate?.toISOString().split("T")[0],
    })),

    certificates: data.certificates.map((certificate) => ({
      name: certificate.name || undefined,
      issuer: certificate.issuer || undefined,
      url: certificate.url || undefined,
      date: certificate.date?.toISOString().split("T")[0],
    })),
    borderStyle: data.borderStyle,
    colorHex: data.colorHex,
    summary: data.summary || undefined,
  };
}
