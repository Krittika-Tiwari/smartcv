"use server";
import genAI from "@/lib/gemini";
import {
  generateProjectSchema,
  GenerateProjectType,
  generateSummerySchema,
  GenerateSummeryType,
  generateWorkExperienceSchema,
  GenerateWorkExperienceType,
} from "./../../../../lib/validation";
import { SchemaType } from "@google/generative-ai";

/**
 * @description Generates a professional resume summary using the Gemini API.
 * This version now returns the full parsed JSON object for the client.
 *
 * @param input The candidate's resume data.
 * @returns A promise that resolves to the full JSON object containing the summary.
 */
export async function generateSummary(input: GenerateSummeryType) {
  try {
    // 1. Validate and parse the input data.
    const {
      jobTitle,
      workExperiences,
      educations,
      projects,
      skills,
      achievements,
    } = generateSummerySchema.parse(input);

    // 2. Combine the instructions and user data into a single, clean prompt.
    const prompt = `You are an expert resume writer trained in crafting high-impact, ATS-optimized summaries tailored to specific job roles. Your goal is to write a professional summary in 3-5 sentences that:

- Aligns closely with the provided job title using industry-relevant keywords
- Emphasizes technical or domain-specific skills, experience, and accomplishments
- References the candidate’s project experience and education without naming companies, institutions, or specific projects
- Uses strong, active language and avoids personal pronouns (e.g., I, my)
- Maintains a clean, professional tone suitable for Applicant Tracking Systems (ATS)

Format your response as a **JSON object** with a single key "summary". Do not include any formatting, explanation, or headings—only the plain summary content.

Use the following data to create the summary:

Job Title: "${jobTitle}"

Work Experiences:
${workExperiences?.map((exp) => `- Position: ${exp.position || "N/A"}`).join("\n") || "N/A"}

Education:
${educations?.map((edu) => `- Degree: ${edu.degree || "N/A"}, Institution: ${edu.school || "N/A"}`).join("\n") || "N/A"}

Projects:
${projects?.map((proj) => `- Description: ${proj.description || "N/A"}`).join("\n") || "N/A"}

Skills:
${skills?.map((skill) => `- ${skill.category || "N/A"}: ${skill.values?.join(", ") || "N/A"}`).join("\n") || "N/A"}

Achievements:
${achievements?.map((ach) => `- ${ach.title || "N/A"} (${ach.issuer || "N/A"})`).join("\n") || "N/A"}
`;

    // 3. Initialize the model with the generation configuration to specifically request a JSON response.
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            summary: { type: SchemaType.STRING },
          },
        },
      },
    });

    // 4. Generate the content using only the 'user' role.
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const response = await result.response;
    const jsonText = await response.text();

    const cleanJsonText = jsonText.replace(/^```json\n|```$/g, "");

    // 6. Parse the cleaned JSON and return the full object.
    const parsedResponse = JSON.parse(cleanJsonText);

    // This is the key change. We now return the full object, not just the summary string.
    return parsedResponse;
  } catch (error) {
    console.error("An error occurred while generating the summary:", error);
    return {
      summary:
        "An error occurred while generating the summary. Please check your input and try again.",
    };
  }
}

export async function generateWorkExperience(
  input: GenerateWorkExperienceType,
) {
  const { description } = generateWorkExperienceSchema.parse(input);
  console.log(description, "Work experience description");

  const prompt = `
You are a job resume generator AI.
Your task: Return a JSON object with ALL of these fields:
- position (string)
- company (string)
- startDate (YYYY-MM-DD)
- endDate (YYYY-MM-DD)
- description (string) → must contain **at least 3 bullet points**, each bullet starting with "- " and separated by "\\n".

Guidelines for description:
- Make bullets detailed and professional.
- Include specific responsibilities, tools/technologies used, and measurable achievements.
- Expand on user input — infer additional realistic details if needed.
- Avoid generic filler like "worked hard" or "did my job".
- If dates are not given, add random dates.

User's provided description:
${description}
`;

  // Initialize the Gemini model
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.OBJECT,
        required: [
          "position",
          "company",
          "startDate",
          "endDate",
          "description",
        ],
        properties: {
          position: { type: SchemaType.STRING },
          company: { type: SchemaType.STRING },
          startDate: { type: SchemaType.STRING },
          endDate: { type: SchemaType.STRING },
          description: { type: SchemaType.STRING },
        },
      },
    },
  });

  // Generate content
  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  const response = await result.response;
  const jsonText = await response.text();

  const cleanJsonText = jsonText.replace(/^```json\n|```$/g, "");
  console.log(cleanJsonText, "Clean json text");

  const parsedResponse = JSON.parse(cleanJsonText);

  return parsedResponse;
}

export async function generateProject(input: GenerateProjectType) {
  const { description } = generateProjectSchema.parse(input);
  console.log(description, "Project description");

  const prompt = `
You are a job resume generator AI.
Your task: Return a JSON object with ALL of these fields:
- name (string)
- description (string) → must contain **at least 3 bullet points**, each bullet starting with "- " and separated by "\\n".
- stack (array of strings)
- startDate (YYYY-MM-DD)
- endDate (YYYY-MM-DD)

Guidelines for description:
- Make bullets detailed and professional.
- Include specific responsibilities, tools/technologies used, and measurable achievements.
- Expand on user input — infer additional realistic details if needed.
- Avoid generic filler like "worked hard" or "did my job".
- If dates are not given, add random dates.

User's provided description:
${description}
`;

  // Initialize the Gemini model
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.OBJECT,
        required: ["name", "description", "stack", "startDate", "endDate"],
        properties: {
          name: { type: SchemaType.STRING },
          description: { type: SchemaType.STRING },
          stack: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
          startDate: { type: SchemaType.STRING },
          endDate: { type: SchemaType.STRING },
        },
      },
    },
  });

  // Generate content
  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  const response = await result.response;
  const jsonText = await response.text();

  const cleanJsonText = jsonText.replace(/^```json\n|```$/g, "");
  console.log(cleanJsonText, "Clean json text");

  const parsedResponse = JSON.parse(cleanJsonText);

  return parsedResponse;
}
