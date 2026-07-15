const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const analyzeResume = async (resumeText) => {
  console.log("➡️ Calling Gemini...");

  const prompt = `
You are an experienced ATS evaluator and senior technical recruiter.

Analyze the resume below.

Return ONLY valid JSON.
Do not use markdown.
Do not add explanations outside JSON.

Return exactly this structure:

{
  "atsScore": 0,
  "summary": "",
  "matchedSkills": [],
  "missingSkills": [],
  "strengths": [],
  "weaknesses": [],
  "suggestions": []
}

Rules:
- atsScore must be between 0 and 100.
- matchedSkills must only include skills present in the resume.
- missingSkills should contain relevant skills that would strengthen the profile.
- strengths, weaknesses and suggestions must be specific to the resume.

Resume:

${resumeText}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
  });

  console.log("✅ Gemini responded");

  return response.text;
};

module.exports = {
  analyzeResume,
};