const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const analyzeResume = async (
  resumeText,
  jobDescription
) => {
  const prompt = `
You are an ATS evaluator and senior technical recruiter.

Compare the candidate resume against the supplied job description.

Return a realistic ATS-style match analysis.

Scoring criteria:
- Job-description keyword match
- Relevant technical skills
- Education relevance
- Project relevance
- Experience relevance
- Resume clarity and ATS readability

Return ONLY valid JSON in exactly this structure:

{
  "atsScore": 0,
  "summary": "",
  "matchedSkills": [],
  "missingSkills": [],
  "strengths": [],
  "weaknesses": [],
  "suggestions": [],
  "interviewReadiness": "",
  "keywordMatchScore": 0
}

Rules:
- atsScore and keywordMatchScore must be numbers from 0 to 100.
- Do not claim that this is an official vendor ATS score.
- matchedSkills must be supported by both the resume and job description.
- missingSkills must come from the job description but be absent from the resume.
- Suggestions must be specific and honest.
- Do not recommend adding skills the candidate does not possess as if they already have them.

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  return response.text;
};

module.exports = {
  analyzeResume,
};