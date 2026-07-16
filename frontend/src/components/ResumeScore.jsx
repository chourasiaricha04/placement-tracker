import { useEffect, useState } from "react";
import "../styles/resumeScore.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function ResumeScore({ analysis }) {

  const score = analysis.atsScore;

  const [animatedScore, setAnimatedScore] = useState(0);

useEffect(() => {
  let current = 0;

  const timer = setInterval(() => {
    current++;

    setAnimatedScore(current);

    if (current >= score) {
      clearInterval(timer);
    }
  }, 15);

  return () => clearInterval(timer);

}, [score]);

let scoreColor = "#ef4444";
let scoreText = "Needs Improvement";

if (score >= 90) {
  scoreColor = "#22c55e";
  scoreText = "Excellent ⭐";
} else if (score >= 75) {
  scoreColor = "#3b82f6";
  scoreText = "Good 👍";
} else if (score >= 60) {
  scoreColor = "#f59e0b";
  scoreText = "Average 🙂";
}

const downloadReport = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("AI Resume Analysis Report", 14, 20);

  doc.setFontSize(12);
  doc.text(`ATS Score: ${analysis.atsScore}%`, 14, 32);
  doc.text(
    `Keyword Match: ${analysis.keywordMatchScore || 0}%`,
    14,
    40
  );

  doc.text("Summary", 14, 52);

  const summaryLines = doc.splitTextToSize(
    analysis.summary || "No summary available.",
    180
  );

  doc.text(summaryLines, 14, 60);

  let startY = 60 + summaryLines.length * 6 + 8;

  autoTable(doc, {
    startY,
    head: [["Matched Skills", "Missing Skills"]],
    body: [
      [
        (analysis.matchedSkills || []).join(", ") || "None",
        (analysis.missingSkills || []).join(", ") || "None",
      ],
    ],
    styles: {
      fontSize: 10,
      cellWidth: "wrap",
    },
    headStyles: {
      fillColor: [99, 102, 241],
    },
  });

  startY = doc.lastAutoTable.finalY + 12;

  autoTable(doc, {
    startY,
    head: [["Strengths", "Weaknesses"]],
    body: [
      [
        (analysis.strengths || []).join("\n") || "None",
        (analysis.weaknesses || []).join("\n") || "None",
      ],
    ],
    styles: {
      fontSize: 10,
      cellWidth: "wrap",
    },
    headStyles: {
      fillColor: [34, 197, 94],
    },
  });

  startY = doc.lastAutoTable.finalY + 12;

  autoTable(doc, {
    startY,
    head: [["AI Suggestions"]],
    body: (analysis.suggestions || []).map((item) => [item]),
    styles: {
      fontSize: 10,
    },
    headStyles: {
      fillColor: [239, 68, 68],
    },
  });

  doc.save("AI_Resume_Analysis_Report.pdf");
};

  return (
    <div className="resume-score-card">

      <h2>📄 AI Resume Analysis</h2>

      <div
  className="score-circle"
  style={{
    "--score": score,
    "--score-color": scoreColor,
  }}
>
  <h1 style={{ color: scoreColor }}>
    {animatedScore}%
  </h1>

  <span>ATS Score</span>

  <p
    className="score-label"
    style={{ color: scoreColor }}
  >
    {scoreText}
  </p>
</div>

<div className="match-details">
  <div className="match-card">
    <h3>🎯 Keyword Match</h3>
    <strong>{analysis.keywordMatchScore}%</strong>
  </div>

  <div className="match-card">
    <h3>🧑‍💼 Interview Readiness</h3>
    <strong>{analysis.interviewReadiness}</strong>
  </div>
</div>

      <div className="summary-box">
        <h3>📌 Summary</h3>
        <p>{analysis.summary}</p>
      </div>

      <div className="skills-container">

        <div>

          <h3>✅ Matched Skills</h3>

          <div className="skill-chips">
  {analysis.matchedSkills?.map((skill) => (
    <span
      key={skill}
      className="skill-chip matched-chip"
    >
      ✔ {skill}
    </span>
  ))}
</div>

        </div>

        <div>

          <h3>❌ Missing Skills</h3>

          <div className="skill-chips">
  {analysis.missingSkills?.map((skill) => (
    <span
      key={skill}
      className="skill-chip missing-chip"
    >
      ✖ {skill}
    </span>
  ))}
</div>

        </div>

      </div>

      <div className="keyword-progress">
  <div className="keyword-progress-header">
    <span>Keyword Match</span>
    <strong>{analysis.keywordMatchScore}%</strong>
  </div>

  <div className="keyword-progress-track">
    <div
      className="keyword-progress-fill"
      style={{
        width: `${analysis.keywordMatchScore}%`,
      }}
    />
  </div>
</div>

      <div className="strength-box">

        <h3>💪 Strengths</h3>

        <ul>

          {analysis.strengths?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}

        </ul>

      </div>

      <div className="weakness-box">

        <h3>⚠️ Weaknesses</h3>

        <ul>

          {analysis.weaknesses?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}

        </ul>

      </div>

      <div className="suggestions">

        <h3>💡 AI Suggestions</h3>

        <ul>

          {analysis.suggestions?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}

        </ul>

      </div>

      <button
  className="download-report-btn"
  onClick={downloadReport}
>
  📄 Download AI Report
</button>

    </div>
  );

  

}

export default ResumeScore;