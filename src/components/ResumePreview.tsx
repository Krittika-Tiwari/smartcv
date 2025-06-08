import useDimension from "@/hooks/useDimension";
import { cn } from "@/lib/utils";
import { ResumeType } from "@/lib/validation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { formatDate } from "date-fns";
import { Badge } from "./ui/badge";
import { BorderStyles } from "./BorderStyleButton";

interface ResumePreviewProps {
  resumeData: ResumeType;
  className?: string;
}
export default function ResumePreview({
  resumeData,
  className,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimension(containerRef);
  return (
    <div
      className={cn(
        "bg-white text-black h-fit w-full aspect-[210/297]",
        className,
      )}
      ref={containerRef}
    >
      <div
        className={cn("space-y-6 p-6", !width && "invisible")}
        style={{ zoom: (1 / 794) * width }}
      >
        <PersonalInfoHeader resumeData={resumeData} />
        <SummarySection resumeData={resumeData} />
        <WorkExperisionSection resumeData={resumeData} />
        <ProjectSection resumeData={resumeData} />
        <EductionSection resumeData={resumeData} />
        <SkillsSection resumeData={resumeData} />
      </div>
    </div>
  );
}

interface ResumeSectionProps {
  resumeData: ResumeType;
}

function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
  const {
    photo,
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    phone,
    email,
    colorHex,
    borderStyle,
  } = resumeData;

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) {
      setPhotoSrc(objectUrl);
    }

    if (photo === null) {
      setPhotoSrc("");
    }

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [photo]);

  return (
    <div className="flex items-center gap-6">
      {photoSrc && (
        <Image
          src={photoSrc}
          width={100}
          height={100}
          alt="Author photo"
          className="aspect-square object-cover"
          style={{
            borderRadius:
              borderStyle === BorderStyles.SQUARE
                ? "0px"
                : borderStyle === BorderStyles.CIRCLE
                  ? "9999px"
                  : "10%",
          }}
        />
      )}
      <div className="space-y-2.5">
        <div className="space-y-1">
          <p className="text-3xl font-bold" style={{ color: colorHex }}>
            {firstName} {lastName}
          </p>
          <p className="font-medium" style={{ color: colorHex }}>
            {jobTitle}
          </p>
        </div>
        <p className="text-xs text-gray-500">
          {city}
          {city && country ? ", " : ""} {country}
          {(city || country) && (phone || email) ? " ● " : ""}
          {[phone, email].filter(Boolean).join(" ● ")}
        </p>
      </div>
    </div>
  );
}

function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary, colorHex } = resumeData;
  if (!summary) return null;
  return (
    <>
      <hr className="border-2 bg-gray-300" style={{ borderColor: colorHex }} />
      <div className="space-y-3 break-inside-avoid">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          Professional profile
        </p>
        <div className="whitespace-pre-line text-sm ">{summary}</div>
      </div>
    </>
  );
}

function WorkExperisionSection({ resumeData }: ResumeSectionProps) {
  const { workExperiences, colorHex } = resumeData;

  const workExperiencesNotEmpty = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0,
  );

  if (!workExperiencesNotEmpty?.length) return null;

  return (
    <>
      <hr className="border-2 bg-gray-300" style={{ borderColor: colorHex }} />
      <div className="space-y-3">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          Work experience
        </p>
        {workExperiencesNotEmpty.map((exp, index) => (
          <div key={index} className="break-after-avoid space-y-1">
            <div
              className="flex items-center justify-between text-sm font-semibold"
              style={{ color: colorHex }}
            >
              <span>{exp.position}</span>
              {exp.startDate && (
                <span>
                  {formatDate(exp.startDate, "MM/yyyy")} -{" "}
                  {exp.endDate
                    ? formatDate(exp.endDate, "MM/yyyy")
                    : "Present"}{" "}
                </span>
              )}
            </div>
            <p className="text-sm font-semibold">{exp.company}</p>
            <div className="whitespace-pre-line text-xs">{exp.description}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function ProjectSection({ resumeData }: ResumeSectionProps) {
  const { projects, colorHex } = resumeData;

  const projectsNotEmpty = projects?.filter(
    (pro) => Object.values(pro).filter(Boolean).length > 0,
  );

  if (!projectsNotEmpty?.length) return null;

  return (
    <>
      <hr className="border-2 bg-gray-300" style={{ borderColor: colorHex }} />
      <div className="space-y-3">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          Project
        </p>
        {projectsNotEmpty.map((pro, index) => (
          <div key={index} className="break-after-avoid space-y-1">
            <div
              className="flex items-center justify-between text-sm font-semibold"
              style={{ color: colorHex }}
            >
              <span>
                {pro.url ? (
                  <a
                    href={pro.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {pro.name}
                  </a>
                ) : (
                  pro.name
                )}
              </span>

              {pro.startDate && (
                <span>
                  {formatDate(pro.startDate, "MM/yyyy")} -{" "}
                  {pro.endDate
                    ? formatDate(pro.endDate, "MM/yyyy")
                    : "Present"}{" "}
                </span>
              )}
            </div>

            <div className="whitespace-pre-line text-xs">{pro.description}</div>
          </div>
        ))}
      </div>
    </>
  );
}
function EductionSection({ resumeData }: ResumeSectionProps) {
  const { educations, colorHex } = resumeData;

  const eductionsNotEmpty = educations?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0,
  );

  if (!eductionsNotEmpty?.length) return null;

  return (
    <>
      <hr className="border-2 bg-gray-300" style={{ borderColor: colorHex }} />
      <div className="space-y-3">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          Education
        </p>
        {eductionsNotEmpty.map((edu, index) => (
          <div key={index} className="break-after-avoid space-y-1">
            <div
              className="flex items-center justify-between text-sm font-semibold"
              style={{ color: colorHex }}
            >
              <span>{edu.degree}</span>
              {edu.startDate &&
                `${formatDate(edu.startDate, "MM/yyyy")} ${edu.endDate ? ` - ${formatDate(edu.endDate, "MM/yyyy")}` : ""}`}
            </div>
            <p className="text-sm font-semibold">{edu.school}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function SkillsSection({ resumeData }: ResumeSectionProps) {
  const { skills, colorHex, borderStyle } = resumeData;

  if (!skills?.length) return null;

  return (
    <>
      <hr className="border-2 bg-gray-300" style={{ borderColor: colorHex }} />
      <div className="break-inside-avoid space-y-3">
        <p className="text-lg font-semibold">Skills</p>
        <div className="flex break-inside-avoid flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              className="bg-black hover:bg-black text-white rounded-md"
              style={{
                backgroundColor: colorHex,
                borderRadius:
                  borderStyle === BorderStyles.SQUARE
                    ? "0px"
                    : borderStyle === BorderStyles.CIRCLE
                      ? "9999px"
                      : "8px",
              }}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
}
