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
        <aside className="w-[30%] bg-gray-50 p-4 space-y-6 border-r border-gray-200">
          <SidebarHeader resumeData={resumeData} />
          <SkillsSection resumeData={resumeData} />
        </aside>
        <main className="w-[70%] p-4 space-y-4">
          <SummarySection resumeData={resumeData} />
          <EductionSection resumeData={resumeData} />
          <WorkExperisionSection resumeData={resumeData} />
          <ProjectSection resumeData={resumeData} />
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
  } = resumeData;

  return (
    <div className="text-left space-y-2">
      <h1
        className="text-xl font-extrabold uppercase tracking-wide leading-tight"
        style={{ color: colorHex, fontFamily: "Georgia, serif" }}
      >
        {firstName} {lastName}
      </h1>
      <p
        className="text-sm font-medium uppercase tracking-wider"
        style={{ color: colorHex }}
      >
        {jobTitle}
      </p>
      <div className="text-xs text-gray-600 leading-relaxed">
        <p>{[city, country].filter(Boolean).join(", ")}</p>
        {[phone, email].filter(Boolean).map((item, i) => (
          <p key={i}>{item}</p>
        ))}
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
            <div className="whitespace-pre-line text-xs px-4">
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
                  <span
                    onClick={() => window.open(pro.url, "_blank")}
                    className="hover:underline cursor-pointer"
                  >
                    {pro.name}
                  </span>
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

            <div className="whitespace-pre-line text-xs px-4">
              {pro.description}
            </div>
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
