import { BorderStyles } from "@/components/BorderStyleButton";
import { Badge } from "@/components/ui/badge";
import useDimension from "@/hooks/useDimension";
import { cn } from "@/lib/utils";
import { ResumeType } from "@/lib/validation";
import { formatDate } from "date-fns";
import { useRef } from "react";

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
        <EductionSection resumeData={resumeData} />
        <SummarySection resumeData={resumeData} />
        <WorkExperisionSection resumeData={resumeData} />
        <ProjectSection resumeData={resumeData} />

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
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    phone,
    email,
    colorHex,
  } = resumeData;

  return (
    <div className="flex flex-col items-center text-center gap-2">
      <div>
        <h1
          className="text-4xl font-extrabold uppercase"
          style={{ color: colorHex }}
        >
          {firstName} {lastName}
        </h1>
        <p
          className="text-sm font-medium tracking-wide uppercase mt-1"
          style={{ color: colorHex }}
        >
          {jobTitle}
        </p>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-2 text-xs text-gray-500 mt-1">
        {[city, country].filter(Boolean).join(", ")}
        {(city || country) && (phone || email) ? " • " : ""}
        {[phone, email].filter(Boolean).join(" • ")}
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
      <div className=" space-y-2 break-inside-avoid">
        <h2
          className="text-base font-semibold uppercase tracking-wide mb-0 "
          style={{ color: colorHex }}
        >
          Education
        </h2>
        <hr
          className="border-1 bg-gray-300"
          style={{ borderColor: colorHex }}
        />

        {eductionsNotEmpty.map((edu, index) => (
          <div
            key={index}
            className="flex justify-between items-start text-sm break-inside-avoid"
          >
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">{edu.degree}</span>
              <span className="text-sm text-gray-600 italic font-serif ">
                {edu.school}
              </span>
            </div>
            {edu.startDate && (
              <div className="text-xs text-gray-500 whitespace-nowrap pl-4">
                {formatDate(edu.startDate, "MM/yyyy")}{" "}
                {edu.endDate ? `– ${formatDate(edu.endDate, "MM/yyyy")}` : ""}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary, colorHex } = resumeData;
  if (!summary) return null;
  return (
    <>
      <div className="space-y-2 break-inside-avoid">
        <h2
          className="text-base font-semibold uppercase tracking-wide mb-0 "
          style={{ color: colorHex }}
        >
          Summary
        </h2>
        <hr
          className="border-1 border-gray-300"
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
      <div className=" space-y-2 break-inside-avoid">
        <h2
          className="text-base font-semibold uppercase tracking-wide mb-0 "
          style={{ color: colorHex }}
        >
          Work experience
        </h2>
        <hr
          className="border-1 bg-gray-300"
          style={{ borderColor: colorHex }}
        />
        {workExperiencesNotEmpty.map((exp, index) => (
          <div key={index} className="space-y-1 break-after-avoid">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <p className="text-sm font-semibold text-gray-800">
                {exp.position}
              </p>
              {exp.startDate && (
                <p className="text-xs text-gray-500">
                  {formatDate(exp.startDate, "MM/yyyy")} –{" "}
                  {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
                </p>
              )}
            </div>
            <p className="text-sm text-gray-600 font-medium italic font-serif">
              {exp.company}
            </p>
            <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line px-5">
              {exp.description}
            </p>
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
      <div className=" space-y-2 break-inside-avoid">
        <h2
          className="text-base font-semibold uppercase tracking-wide mb-0 "
          style={{ color: colorHex }}
        >
          Project
        </h2>
        <hr
          className="border-1 bg-gray-300"
          style={{ borderColor: colorHex }}
        />
        {projectsNotEmpty.map((pro, index) => (
          <div key={index} className="break-after-avoid space-y-1">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <span>
                {pro.url ? (
                  <span
                    onClick={() => window.open(pro.url, "_blank")}
                    className="hover:underline cursor-pointer text-sm font-semibold text-gray-800"
                  >
                    {pro.name}
                  </span>
                ) : (
                  pro.name
                )}
              </span>

              {pro.startDate && (
                <p className="text-xs text-gray-500">
                  {formatDate(pro.startDate, "MM/yyyy")} -{" "}
                  {pro.endDate
                    ? formatDate(pro.endDate, "MM/yyyy")
                    : "Present"}{" "}
                </p>
              )}
            </div>

            <div className="text-sm leading-relaxed text-gray-700 whitespace-pre-line px-5">
              {pro.description}
            </div>
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
      <div className="break-inside-avoid space-y-3">
        <h2
          className="text-base font-semibold uppercase tracking-wide mb-0 "
          style={{ color: colorHex }}
        >
          Skills
        </h2>
        <hr
          className="border-1 bg-gray-300"
          style={{ borderColor: colorHex }}
        />
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
