"use server";

import prisma from "@/lib/prisma";
import { resumeSchema, ResumeType } from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import { del, put } from "@vercel/blob";
import path from "path";
import { v4 as uuidv4 } from "uuid";
export async function saveResume(values: ResumeType) {
  const { id } = values;

  const { photo, workExperiences, educations, ...resumeValues } =
    resumeSchema.parse(values);

  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
    //TODO: add toast or modal to show error message
  }

  const existingResume = id
    ? await prisma.resume.findUnique({ where: { id, userId } })
    : null;

  if (id && !existingResume) {
    throw new Error("Resume not found");
  }

  let newPhotoUrl: string | undefined | null = undefined;

  if (photo instanceof File) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }
    const ext = path.extname(photo.name); // e.g., ".png"
    const uniqueFileName = `resume_photos/${uuidv4()}${ext}`;

    const blob = await put(uniqueFileName, photo, {
      access: "public",
    });

    newPhotoUrl = blob.url;
  } else if (photo === null) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }
    newPhotoUrl = null;
  }

  if (id) {
    return prisma.resume.update({
      where: { id },
      data: {
        ...resumeValues,
        photoUrl: newPhotoUrl,
        workExperiences: {
          deleteMany: {},
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        educations: {
          deleteMany: {},
          create: educations?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        projects: {
          deleteMany: {},
          create: values.projects?.map((pro) => ({
            ...pro,
            startDate: pro.startDate ? new Date(pro.startDate) : undefined,
            endDate: pro.endDate ? new Date(pro.endDate) : undefined,
          })),
        },
        skills: {
          deleteMany: {},
          create: values.skills?.map((skill) => ({
            ...skill,
          })),
        },
        achievements: {
          deleteMany: {},
          create: values.achievements?.map((achievement) => ({
            ...achievement,
            startDate: achievement.startDate
              ? new Date(achievement.startDate)
              : undefined,
            endDate: achievement.endDate
              ? new Date(achievement.endDate)
              : undefined,
          })),
        },
        certificates: {
          deleteMany: {},
          create: values.certificates?.map((certificate) => ({
            ...certificate,
            date: certificate.date ? new Date(certificate.date) : undefined,
          })),
        },
        updatedAt: new Date(),
      },
    });
  } else {
    return prisma.resume.create({
      data: {
        ...resumeValues,
        userId,
        photoUrl: newPhotoUrl,
        workExperiences: {
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        educations: {
          create: educations?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        projects: {
          create: values.projects?.map((pro) => ({
            ...pro,
            startDate: pro.startDate ? new Date(pro.startDate) : undefined,
            endDate: pro.endDate ? new Date(pro.endDate) : undefined,
          })),
        },
        skills: {
          create: values.skills?.map((skill) => ({
            ...skill,
          })),
        },
        achievements: {
          create: values.achievements?.map((achievement) => ({
            ...achievement,
            startDate: achievement.startDate
              ? new Date(achievement.startDate)
              : undefined,
            endDate: achievement.endDate
              ? new Date(achievement.endDate)
              : undefined,
          })),
        },
        certificates: {
          create: values.certificates?.map((certificate) => ({
            ...certificate,
            date: certificate.date ? new Date(certificate.date) : undefined,
          })),
        },
      },
    });
  }
}
