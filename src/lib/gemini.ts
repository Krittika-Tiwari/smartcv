import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure the GOOGLE_API_KEY environment variable is set
const apiKey = process.env.GOOGLE_API_KEY!;

console.log(apiKey);

if (!apiKey) {
  throw new Error("GOOGLE_API_KEY environment variable is not set.");
}

// Pass your API key directly to the constructor
const genAI = new GoogleGenerativeAI(apiKey);

export default genAI;
