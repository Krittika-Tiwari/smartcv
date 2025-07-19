import { BorderStyles } from "@/components/BorderStyleButton";
import useDimension from "@/hooks/useDimension";
import { cn } from "@/lib/utils";
import { ResumeType } from "@/lib/validation";
import { formatDate } from "date-fns";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { SiLeetcode } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFolder } from "react-icons/fa";

interface ClassicTemplateProps {
  resumeData: ResumeType;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}
export default function ClassicTemplate({
  resumeData,
  contentRef,
  className,
}: ClassicTemplateProps) {
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
        ref={contentRef}
        id="resumePreviewContent"
        className={cn("space-y-4 p-6", !width && "invisible")}
        style={{ zoom: (1 / 794) * width }}
      >
        <PersonalInfoHeader resumeData={resumeData} />
        <SummarySection resumeData={resumeData} />
        <WorkExperisionSection resumeData={resumeData} />
        <ProjectSection resumeData={resumeData} />
        <EductionSection resumeData={resumeData} />
        <SkillsSection resumeData={resumeData} />
        <AchievementSection resumeData={resumeData} />
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
    linkedin,
    github,
    portfolio,
    leetcode,
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

  const contactLinks = [
    {
      label: "LinkedIn",
      url: linkedin,
      icon: <FaLinkedin className="w-4 h-4" />,
    },
    {
      label: "GitHub",
      url: github,
      icon: <FaGithub className="w-4 h-4" />,
    },
    {
      label: "Leetcode",
      url: leetcode,
      icon: <SiLeetcode className="w-4 h-4" />,
    },
    {
      label: "Portfolio",
      url: portfolio,
      icon: <FaFolder className="w-4 h-4" />,
    },
  ].filter((link) => !!link.url);
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
      <div className="space-y-1">
        <div className="space-y-1">
          <p className="text-3xl font-bold" style={{ color: colorHex }}>
            {firstName} {lastName}
          </p>
          <p className="font-medium" style={{ color: colorHex }}>
            {jobTitle}
          </p>
        </div>
        {contactLinks.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 text-xs">
            {contactLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:underline cursor-pointer"
              >
                {link.icon}
                <span className="break-all">{link.label}</span>
              </a>
            ))}
          </div>
        )}

        <p className="text-xs ">
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
            <p className="text-sm font-medium">{exp.company}</p>
            <div className="whitespace-pre-line text-sm px-4">
              {exp.description}
            </div>
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
          Projects
        </p>
        {projectsNotEmpty.map((pro, index) => (
          <div key={index} className="break-after-avoid space-y-1">
            <div
              className="flex justify-between items-start text-sm font-semibold"
              style={{ color: colorHex }}
            >
              <div className="flex flex-col gap-0.5">
                <span>{pro.name}</span>

                {(pro.github || pro.url) && (
                  <div className="flex items-center gap-1 font-medium  text-sm">
                    {pro.github && (
                      <a
                        href={pro.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        GitHub
                      </a>
                    )}
                    {pro.github && pro.url && (
                      <span className="text-gray-500">|</span>
                    )}
                    {pro.url && (
                      <a
                        href={pro.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Right: Dates */}
              {pro.startDate && (
                <span>
                  {formatDate(pro.startDate, "MM/yyyy")} -{" "}
                  {pro.endDate ? formatDate(pro.endDate, "MM/yyyy") : "Present"}
                </span>
              )}
            </div>

            {/* Description */}
            {pro.description && (
              <div className="whitespace-pre-line text-sm px-4">
                {pro.description}
              </div>
            )}
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
              {edu.startDate && (
                <span>
                  {formatDate(edu.startDate, "MM/yyyy")}{" "}
                  {edu.endDate
                    ? ` - ${formatDate(edu.endDate, "MM/yyyy")}`
                    : ""}
                </span>
              )}
            </div>
            <div className="flex items-center justify-between text-sm">
              <p className="font-medium">{edu.school}</p>
              {edu.cgpa && <p className=" font-semibold">CGPA: {edu.cgpa}</p>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export function SkillsSection({ resumeData }: ResumeSectionProps) {
  const { skills, colorHex, borderStyle } = resumeData;

  if (!skills || skills.length === 0) return null;

  return (
    <>
      <hr className="border-2 bg-gray-300" style={{ borderColor: colorHex }} />
      <div className="break-inside-avoid space-y-2">
        <p className="text-lg font-semibold">Skills</p>
        <div className=" flex gap-1">
          {skills.map(({ values }, index) => (
            <div className="flex flex-wrap gap-1 " key={index}>
              {values.map((skill, idx) => (
                <Badge
                  key={idx}
                  className="text-white"
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
          ))}
        </div>
      </div>
    </>
  );
}

function AchievementSection({ resumeData }: ResumeSectionProps) {
  const { achievements, colorHex } = resumeData;

  const achievementsNotEmpty = achievements?.filter(
    (a) => a.title || a.issuer || a.startDate || a.endDate,
  );

  if (!achievementsNotEmpty || achievementsNotEmpty.length === 0) return null;

  return (
    <>
      <hr className="border-2 bg-gray-300" style={{ borderColor: colorHex }} />
      <div className="break-inside-avoid space-y-2">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          Achievements
        </p>
        <div className="space-y-1">
          {achievementsNotEmpty.map((ach, index) => (
            <div
              key={index}
              className="flex justify-between items-start px-4 text-sm break-inside-avoid"
            >
              <p className="text-gray-800">
                <span className="font-semibold">{ach.title}</span>
                {ach.issuer && (
                  <span className="font-normal"> – {ach.issuer}</span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
