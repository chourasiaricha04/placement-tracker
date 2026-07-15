import { useState } from "react";
import "../styles/resumeAnalyzer.css";
import ResumeScore from "./ResumeScore";
import axios from "axios";

function ResumeAnalyzer() {

   const [resume, setResume] = useState(null);
   const [analysis, setAnalysis] = useState(null);
  const handleUpload = (e) => {
    setResume(e.target.files[0]);
  };

  const analyzeResume = async () => {

  const formData = new FormData();

  formData.append("resume", resume);

  try{

    const response = await axios.post(
  "http://localhost:5000/api/resume/analyze",
  formData
);

console.log("BACKEND RESPONSE:");
console.log(response.data);

setAnalysis(response.data);

  }

  catch(err){

    console.log(err);

  }

};

  return (
    <div className="resume-card">

      <h2>📄 AI Resume Analyzer</h2>

      <p>
        Upload your resume and receive an ATS score with skill suggestions.
      </p>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleUpload}
      />

      {resume && (
        <div className="resume-info">

          <h4>Selected Resume</h4>

          <p>{resume.name}</p>

          <button
className="analyze-btn"
onClick={analyzeResume}
>
Analyze Resume
</button>

        </div>
      )}

      {analysis && (

<ResumeScore

analysis={analysis}

/>

)}

    </div>
  );
}

export default ResumeAnalyzer;