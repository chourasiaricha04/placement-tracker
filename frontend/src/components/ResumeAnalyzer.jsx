
import "../styles/resumeAnalyzer.css";
import ResumeScore from "./ResumeScore";
import axios from "axios";
import { useEffect, useState } from "react";

function ResumeAnalyzer() {
  const [resume, setResume] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("🤖 Analyzing...");
  const [jobDescription, setJobDescription] = useState("");

 

  const handleUpload = (e) => {
    setResume(e.target.files[0]);
    setAnalysis(null);
  };

  const analyzeResume = async () => {
  if (!resume || !jobDescription.trim()) {
    alert("Please upload a resume and paste the job description.");
    return;
  }

  setLoading(true);

  const formData = new FormData();

  formData.append("resume", resume);
  formData.append("jobDescription", jobDescription);

  try {
    const response = await axios.post(
      "http://localhost:5000/api/resume/analyze",
      formData
    );

    setAnalysis(response.data);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {

  if (!loading) {
    setLoadingText("🤖 Analyzing...");
    return;
  }

  const messages = [
    "📄 Reading Resume...",
    "🔍 Extracting Skills...",
    "🧠 Calculating ATS Score...",
    "✨ Generating Suggestions...",
  ];

  let index = 0;

  setLoadingText(messages[index]);

  const interval = setInterval(() => {

    index = (index + 1) % messages.length;

    setLoadingText(messages[index]);

  }, 1200);

  return () => clearInterval(interval);

}, [loading]);useEffect(() => {

  if (!loading) {
    setLoadingText("🤖 Analyzing...");
    return;
  }

  const messages = [
    "📄 Reading Resume...",
    "🔍 Extracting Skills...",
    "🧠 Calculating ATS Score...",
    "✨ Generating Suggestions...",
  ];

  let index = 0;

  setLoadingText(messages[index]);

  const interval = setInterval(() => {

    index = (index + 1) % messages.length;

    setLoadingText(messages[index]);

  }, 1200);

  return () => clearInterval(interval);

}, [loading]);

  return (
    <div className="resume-card">
      <h2>📄 AI Resume Analyzer</h2>

      <p>
        Upload your resume and receive an ATS score with skill suggestions.
      </p>

      <input
        type="file"
        accept=".pdf"
        onChange={handleUpload}
      />

      <textarea
  className="job-description-input"
  placeholder="Paste the job description here..."
  value={jobDescription}
  onChange={(e) => setJobDescription(e.target.value)}
  rows="8"
/>

      {resume && (
        <div className="resume-info">
          <h4>Selected Resume</h4>

          <p>{resume.name}</p>

          <button
  className="analyze-btn"
  onClick={analyzeResume}
  disabled={loading}
>
  {loading ? loadingText : "Analyze Resume"}
</button>
        </div>
      )}

      {analysis && (
        <ResumeScore analysis={analysis} />
      )}
    </div>
  );
}

export default ResumeAnalyzer;