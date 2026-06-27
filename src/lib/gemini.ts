import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Issue } from "@/types";

export async function classifyCivicImage(imageBase64?: string) {
  if (!process.env.GEMINI_API_KEY || !imageBase64) {
    return {
      category: "pothole",
      severity: "high",
      title: "Likely road surface hazard",
      description: "AI demo mode detected a civic hazard that should be reviewed and geo-tagged before submission.",
      confidence: 0.86
    };
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent([
    "Classify this civic issue image. Return compact JSON with category, severity, title, description, confidence.",
    { inlineData: { data: imageBase64.replace(/^data:image\/\w+;base64,/, ""), mimeType: "image/jpeg" } }
  ]);

  try {
    return JSON.parse(result.response.text().replace(/```json|```/g, "").trim());
  } catch {
    return {
      category: "other",
      severity: "medium",
      title: "Civic issue needs review",
      description: result.response.text(),
      confidence: 0.7
    };
  }
}

export async function generateComplaint(issue: Partial<Issue>) {
  const fallback = `To,\nThe Municipal Ward Officer,\n\nSubject: Urgent civic complaint regarding ${issue.title ?? "reported issue"}\n\nDear Sir/Madam,\n\nResidents request immediate inspection and action for this issue at ${issue.address ?? "the reported location"}. ${issue.description ?? "The issue is affecting public safety and daily movement."}\n\nPriority: ${issue.severity ?? "medium"}\nCategory: ${issue.category ?? "civic issue"}\n\nPlease acknowledge this complaint and share an expected resolution timeline.\n\nSincerely,\nConcerned residents`;

  if (!process.env.GEMINI_API_KEY) return fallback;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(`Write a formal municipal complaint letter for this issue:\n${JSON.stringify(issue)}`);
  return result.response.text();
}
