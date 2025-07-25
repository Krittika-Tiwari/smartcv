import useDimension from "@/hooks/useDimension";
import { cn } from "@/lib/utils";
import { ResumeType } from "@/lib/validation";
import { formatDate } from "date-fns";
import { useRef } from "react";
import { SiLeetcode } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFolder } from "react-icons/fa";

interface MinimalTemplateProps {
  resumeData: ResumeType;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}
export default function MinimalTemplate({
  resumeData,
  contentRef,
  className,
}: MinimalTemplateProps) {
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
        <SkillsSection resumeData={resumeData} />
        <WorkExperisionSection resumeData={resumeData} />
        <ProjectSection resumeData={resumeData} />
        <EductionSection resumeData={resumeData} />
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
    firstName,
    lastName,
    jobTitle,
    phone,
    email,
    colorHex,
    linkedin,
    github,
    portfolio,
    leetcode,
  } = resumeData;

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
    <div className="flex flex-col  gap-1 break-inside-avoid">
      {/* Name and Job Title */}
      <div>
        <h1
          className="text-4xl font-extrabold uppercase"
          style={{ color: colorHex }}
        >
          {firstName} {lastName}
        </h1>
        {jobTitle && (
          <p
            className="text-sm font-medium tracking-wide uppercase"
            style={{ color: colorHex }}
          >
            {jobTitle}
          </p>
        )}
      </div>

      {/* Combined Contact Info in One Line */}
      <div className="text-xs text-gray-800 flex flex-wrap  items-center gap-1">
        {/* Email */}
        {email && <span>{email}</span>}
        {email && phone && <span>|</span>}

        {/* Phone */}
        {phone && <span>{phone}</span>}

        {(email || phone) && contactLinks.length > 0 && <span>|</span>}

        {/* Links */}
        {contactLinks.map((link, index) => (
          <span key={index} className="flex items-center gap-1">
            {index !== 0 && <span>|</span>}
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {link.label}
            </a>
          </span>
        ))}
      </div>
    </div>
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
      {/* Wrap the entire Education section in one break-avoiding container */}
      <div className="space-y-2 font-serif break-inside-avoid-page">
        <div className="space-y-2">
          <h2
            className="text-base font-medium uppercase tracking-wide mb-0"
            style={{ color: colorHex }}
          >
            Education
          </h2>
          <hr
            className="border-0.5 bg-gray-300"
            style={{ borderColor: colorHex }}
          />
        </div>

        <div className="space-y-2">
          {eductionsNotEmpty.map((edu, index) => (
            <div
              key={index}
              className="flex justify-between items-start text-sm break-inside-avoid"
            >
              {/* Left Side */}
              <div className="flex flex-col">
                <div className="flex items-start gap-1">
                  <span className="text-base leading-none">•</span>
                  <div>
                    <span className="font-semibold text-gray-800">
                      {edu.school}
                    </span>
                    <div className="text-sm text-gray-800 italic">
                      {edu.degree}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side */}
              <div className="flex flex-col items-end text-sm text-gray-800 whitespace-nowrap pl-4">
                {edu.startDate && (
                  <div>
                    {edu.endDate
                      ? `${formatDate(edu.startDate, "yy")}–${formatDate(
                          edu.endDate,
                          "yyyy",
                        )}`
                      : formatDate(edu.startDate, "yyyy")}
                  </div>
                )}
                {edu.cgpa && <div>CGPA: {edu.cgpa}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary, colorHex } = resumeData;
  if (!summary) return null;
  return (
    <>
      <div className="space-y-2 break-inside-avoid font-serif">
        <h2
          className="text-base font-medium uppercase tracking-wide mb-0 font-serif "
          style={{ color: colorHex }}
        >
          Professional Summary
        </h2>
        <hr
          className="border-0.5 border-gray-300"
          style={{ borderColor: colorHex }}
        />
        <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
          {summary}
        </p>
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
      <div className=" space-y-2 break-inside-avoid font-serif">
        <h2
          className="text-base font-medium uppercase tracking-wide mb-0 font-serif "
          style={{ color: colorHex }}
        >
          Work experience
        </h2>
        <hr
          className="border-0.5 bg-gray-300"
          style={{ borderColor: colorHex }}
        />
        {workExperiencesNotEmpty.map((exp, index) => (
          <div key={index} className="flex gap-1 items-start break-after-avoid">
            <span className="text-base leading-none">•</span>
            <div className="space-y-1 w-full">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <p className="text-sm font-semibold text-gray-800 font-serif">
                  {exp.position}
                </p>
                {exp.startDate && (
                  <p className="text-sm text-gray-800 font-serif">
                    {formatDate(exp.startDate, "MMM yyyy")} –{" "}
                    {exp.endDate
                      ? formatDate(exp.endDate, "MMM yyyy")
                      : "Present"}
                  </p>
                )}
              </div>
              <p className="text-sm text-gray-800 italic font-serif">
                {exp.company}
              </p>
              {exp.description && (
                <p className="text-sm leading-relaxed text-gray-800 whitespace-pre-line">
                  {exp.description}
                </p>
              )}
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
      <div className=" space-y-2 break-inside-avoid font-serif">
        <h2
          className="text-base font-medium uppercase tracking-wide mb-0 font-serif "
          style={{ color: colorHex }}
        >
          Personal Project
        </h2>
        <hr
          className="border-0.5 bg-gray-300"
          style={{ borderColor: colorHex }}
        />
        {projectsNotEmpty.map((pro, index) => (
          <div key={index} className="break-after-avoid space-y-1">
            <div className="flex items-start gap-1">
              <span className="text-base leading-none text-gray-800">•</span>
              <div className="flex-1 space-y-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <p className="text-sm font-semibold text-gray-800">
                    {pro.name}
                  </p>

                  {pro.startDate && (
                    <p className="text-sm text-gray-800">
                      {formatDate(pro.startDate, "MMM yyyy")} –{" "}
                      {pro.endDate
                        ? formatDate(pro.endDate, "MMM yyyy")
                        : "Present"}
                    </p>
                  )}
                </div>
                {(pro.github || pro.url) && (
                  <div className="text-sm text-gray-800  font-bold space-x-1">
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
                    {pro.github && pro.url && <span>|</span>}
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
                {/* Description */}
                {pro.description && (
                  <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">
                    {pro.description}
                  </p>
                )}

                {/* Links */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export function SkillsSection({ resumeData }: ResumeSectionProps) {
  const { skills, colorHex } = resumeData;

  if (!skills || skills.length === 0) return null;

  return (
    <div className="space-y-2 break-inside-avoid font-serif">
      <h2
        className="text-base font-medium uppercase tracking-wide mb-0 font-serif"
        style={{ color: colorHex }}
      >
        Techinical Skills and Interests
      </h2>
      <hr
        className="border-0.5 bg-gray-300"
        style={{ borderColor: colorHex }}
      />

      <div className="">
        {skills.map(({ category, values }, i) => (
          <div
            key={i}
            className="flex items-start gap-1 px-2 break-after-avoid"
          >
            <span className="text-base leading-none text-gray-800">•</span>
            <div className="flex gap-1 flex-wrap">
              {category && (
                <div className="text-sm font-bold text-gray-800 capitalize font-serif">
                  {category}:
                </div>
              )}
              <div className="text-sm text-gray-800">
                {values.filter(Boolean).join(", ")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AchievementSection({ resumeData }: ResumeSectionProps) {
  const { achievements, colorHex } = resumeData;

  const achievementsNotEmpty = achievements?.filter(
    (ach) => ach.title || ach.issuer || ach.startDate || ach.endDate,
  );

  if (!achievementsNotEmpty?.length) return null;

  return (
    <div className="space-y-2 break-inside-avoid font-serif">
      <h2
        className="text-base font-medium uppercase tracking-wide mb-0"
        style={{ color: colorHex }}
      >
        Achievements
      </h2>
      <hr
        className="border-0.5 bg-gray-300"
        style={{ borderColor: colorHex }}
      />

      {achievementsNotEmpty.map((ach, index) => (
        <div key={index} className="break-after-avoid space-y-1">
          <div className="flex items-start gap-1">
            <span className="text-base leading-none text-gray-800">•</span>

            <div className="flex">
              <p className="text-sm font-semibold text-gray-800">
                {ach.title}
                {ach.issuer && (
                  <span className="text-gray-800 font-normal">
                    {" "}
                    — {ach.issuer}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
