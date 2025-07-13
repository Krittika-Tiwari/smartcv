import { BorderStyles } from "@/components/BorderStyleButton";
import useDimension from "@/hooks/useDimension";
import { cn } from "@/lib/utils";
import { ResumeType } from "@/lib/validation";
import { formatDate } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { Linkedin, Github, Phone, Mail } from "lucide-react";
import Image from "next/image";

interface CreativeTemplateProps {
  resumeData: ResumeType;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}
export default function CreativeTemplate({
  resumeData,
  contentRef,
  className,
}: CreativeTemplateProps) {
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
        className={cn("space-y-4 p-6 font-serif", !width && "invisible")}
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
    linkedin,
    github,
    photo,
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
    <div className="flex justify-between text-center gap-2 font-serif">
      <div className="flex gap-4">
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
        <div className="text-left  text-gray-800 space-y-1 ">
          <h1
            className="text-2xl font-extrabold uppercase"
            style={{ color: colorHex }}
          >
            {firstName} {lastName}
          </h1>
          <p className="text-sm text-gray-800  " style={{ color: colorHex }}>
            {jobTitle}
          </p>
          <p className="text-sm text-gray-800 " style={{ color: colorHex }}>
            {city}
            {city && country ? ", " : ""} {country}
          </p>
        </div>
      </div>
      <div className="flex flex-col text-right text-sm text-gray-800 space-y-1">
        {phone && (
          <div className="break-all flex items-center justify-end gap-1">
            <Phone style={{ color: colorHex }} className="w-3.5 h-3.5" />
            <span>{phone}</span>
          </div>
        )}
        {email && (
          <div className="break-all flex items-center justify-end gap-1">
            <Mail style={{ color: colorHex }} className="w-3.5 h-3.5" />
            <span>{email}</span>
          </div>
        )}
        {github && (
          <div
            className="break-all flex items-center justify-end gap-1 hover:underline cursor-pointer"
            onClick={() => window.open(github, "_blank")}
          >
            <Github style={{ color: colorHex }} className="w-3.5 h-3.5" />
            <span>GitHub Profile</span>
          </div>
        )}
        {linkedin && (
          <div
            className="break-all flex items-center justify-end gap-1 hover:underline cursor-pointer"
            onClick={() => window.open(linkedin, "_blank")}
          >
            <Linkedin style={{ color: colorHex }} className="w-3.5 h-3.5" />
            <span>LinkedIn Profile</span>
          </div>
        )}
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
      <div className=" space-y-2 break-inside-avoid font-serif">
        <h2
          className="text-base font-semibold uppercase tracking-wide mb-0 font-serif "
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
              <div className="flex items-start gap-1">
                <span className=" text-base leading-none">•</span>
                <div>
                  <span className="font-semibold text-gray-800 font-serif">
                    {edu.school}
                  </span>
                  <div className="text-sm text-gray-800 italic font-serif">
                    {edu.degree}
                  </div>
                </div>
              </div>
            </div>
            {edu.startDate && (
              <div className="text-xs text-gray-800 whitespace-nowrap pl-4 font-serif">
                {formatDate(edu.startDate, "yy")}{" "}
                {edu.endDate ? `– ${formatDate(edu.endDate, "yyyy")}` : ""}
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
      <div className="space-y-2 break-inside-avoid font-serif">
        <h2
          className="text-base font-semibold uppercase tracking-wide mb-0 font-serif "
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
      <div className=" space-y-2 break-inside-avoid font-serif">
        <h2
          className="text-base font-semibold uppercase tracking-wide mb-0 font-serif "
          style={{ color: colorHex }}
        >
          Work experience
        </h2>
        <hr
          className="border-1 bg-gray-300"
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
                    {formatDate(exp.startDate, "MMM.yyyy")} –{" "}
                    {exp.endDate
                      ? formatDate(exp.endDate, "MMM.yyyy")
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
          className="text-base font-semibold uppercase tracking-wide mb-0 font-serif "
          style={{ color: colorHex }}
        >
          Personal Project
        </h2>
        <hr
          className="border-1 bg-gray-300"
          style={{ borderColor: colorHex }}
        />
        {projectsNotEmpty.map((pro, index) => (
          <div key={index} className="break-after-avoid space-y-1">
            <div className="flex items-start gap-1">
              <span className="text-base leading-none text-gray-800">•</span>
              <div className="flex-1 space-y-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <p className="text-sm font-semibold text-gray-800">
                    {pro.url ? (
                      <span
                        onClick={() => window.open(pro.url, "_blank")}
                        className="hover:underline cursor-pointer"
                      >
                        {pro.name}
                      </span>
                    ) : (
                      pro.name
                    )}
                  </p>

                  {pro.startDate && (
                    <p className="text-sm text-gray-800">
                      {formatDate(pro.startDate, "MMM.yyyy")} –{" "}
                      {pro.endDate
                        ? formatDate(pro.endDate, "MMM.yyyy")
                        : "Present"}
                    </p>
                  )}
                </div>

                {pro.description && (
                  <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line ">
                    {pro.description}
                  </p>
                )}
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
    <div className="space-y-2 break-inside-avoid">
      <h2
        className="text-base font-semibold uppercase tracking-wide mb-0 font-serif"
        style={{ color: colorHex }}
      >
        Techinical Skills and Interests
      </h2>
      <hr className="border-1 bg-gray-300" style={{ borderColor: colorHex }} />

      <div className="">
        {skills.map(({ category, values }, i) => (
          <div key={i} className="flex gap-1 px-2">
            {category && (
              <div className="text-sm font-bold text-gray-800 capitalize">
                {category}:
              </div>
            )}
            <div className="text-sm text-gray-800">
              {values.filter(Boolean).join(", ")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
