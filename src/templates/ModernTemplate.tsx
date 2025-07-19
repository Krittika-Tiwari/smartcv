import { BorderStyles } from "@/components/BorderStyleButton";
import { Badge } from "@/components/ui/badge";
import useDimension from "@/hooks/useDimension";
import { cn } from "@/lib/utils";
import { ResumeType } from "@/lib/validation";
import { formatDate } from "date-fns";
import { useRef } from "react";

interface ModernTemplateProps {
  resumeData: ResumeType;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}
export default function ModernTemplate({
  resumeData,
  contentRef,
  className,
}: ModernTemplateProps) {
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
        className={cn("flex space-y-6 p-6", !width && "invisible")}
        style={{ zoom: (1 / 794) * width }}
      >
        <aside className="w-[30%] bg-gray-200 p-4 space-y-6 border-r border-gray-200">
          <SidebarHeader resumeData={resumeData} />
          <SkillsSection resumeData={resumeData} />
        </aside>
        <main className="w-[70%] p-4 space-y-4">
          <SummarySection resumeData={resumeData} />
          <EductionSection resumeData={resumeData} />
          <WorkExperisionSection resumeData={resumeData} />
          <ProjectSection resumeData={resumeData} />
          <AchievementSection resumeData={resumeData} />
        </main>
      </div>
    </div>
  );
}

interface ResumeSectionProps {
  resumeData: ResumeType;
}
function SidebarHeader({ resumeData }: ResumeSectionProps) {
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
    portfolio,
    leetcode,
  } = resumeData;

  const links = [
    { label: "LinkedIn", url: linkedin },
    { label: "GitHub", url: github },
    { label: "Portfolio", url: portfolio },
    { label: "LeetCode", url: leetcode },
  ].filter((link) => !!link.url);

  return (
    <div className="text-left space-y-3  break-inside-avoid">
      {/* Name */}
      <h1
        className="text-2xl font-extrabold uppercase tracking-wide leading-tight"
        style={{ color: colorHex }}
      >
        {firstName} {lastName}
      </h1>

      {/* Job Title */}
      {jobTitle && (
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: colorHex }}
        >
          {jobTitle}
        </p>
      )}

      {/* Contact & Location */}
      <div className="text-xs text-gray-700 space-y-1">
        {/* Location */}
        {(city || country) && (
          <p>{[city, country].filter(Boolean).join(", ")}</p>
        )}

        {/* Phone and Email */}
        {[phone, email].filter(Boolean).map((item, i) => (
          <p key={i}>{item}</p>
        ))}

        {/* Link Row */}
        {links.length > 0 && (
          <p className="flex flex-wrap gap-1 text-xs text-gray-700">
            {links.map((link, index) => (
              <span key={index} className="flex items-center">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline break-all"
                >
                  {link.label}
                </a>
                {index < links.length - 1 && <span className="px-1">|</span>}
              </span>
            ))}
          </p>
        )}
      </div>
    </div>
  );
}

// function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
//   const {
//     photo,
//     firstName,
//     lastName,
//     jobTitle,
//     city,
//     country,
//     phone,
//     email,
//     colorHex,
//     borderStyle,
//   } = resumeData;

//   const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

//   useEffect(() => {
//     const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
//     if (objectUrl) {
//       setPhotoSrc(objectUrl);
//     }

//     if (photo === null) {
//       setPhotoSrc("");
//     }

//     return () => {
//       URL.revokeObjectURL(objectUrl);
//     };
//   }, [photo]);

//   return (
//     <div className="flex items-center gap-6">
//       {photoSrc && (
//         <Image
//           src={photoSrc}
//           width={100}
//           height={100}
//           alt="Author photo"
//           className="aspect-square object-cover"
//           style={{
//             borderRadius:
//               borderStyle === BorderStyles.SQUARE
//                 ? "0px"
//                 : borderStyle === BorderStyles.CIRCLE
//                   ? "9999px"
//                   : "10%",
//           }}
//         />
//       )}
//       <div className="space-y-2.5">
//         <div className="space-y-1">
//           <p className="text-3xl font-bold" style={{ color: colorHex }}>
//             {firstName} {lastName}
//           </p>
//           <p className="font-medium" style={{ color: colorHex }}>
//             {jobTitle}
//           </p>
//         </div>
//         <p className="text-xs text-gray-500">
//           {city}
//           {city && country ? ", " : ""} {country}
//           {(city || country) && (phone || email) ? " ● " : ""}
//           {[phone, email].filter(Boolean).join(" ● ")}
//         </p>
//       </div>
//     </div>
//   );
// }

function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary, colorHex } = resumeData;
  if (!summary) return null;
  return (
    <>
      {/* <hr className="border-2 bg-gray-300" style={{ borderColor: colorHex }} /> */}
      <div className="space-y-2 break-inside-avoid">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          Professional Summay
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
      <hr className="border-1 bg-gray-300" style={{ borderColor: colorHex }} />
      <div className="space-y-3">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          Work Experience
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
      <hr className="border-1 bg-gray-300" style={{ borderColor: colorHex }} />
      <div className="space-y-3">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          Projects
        </p>
        {projectsNotEmpty.map((pro, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
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
      <hr className="border-1 bg-gray-300" style={{ borderColor: colorHex }} />
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
      <hr className="border-1 bg-gray-300" style={{ borderColor: colorHex }} />
      <div className="break-inside-avoid space-y-2">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          Skills
        </p>
        <div className="flex flex-wrap break-inside-avoid gap-1">
          {skills
            .flatMap(({ values }) => values)
            .map((skill, idx) => (
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
      <hr className="border-1 bg-gray-300" style={{ borderColor: colorHex }} />
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
                <span className="font-semibold" style={{ color: colorHex }}>
                  {ach.title}
                </span>
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
