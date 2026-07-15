import "../styles/resumeScore.css";

function ResumeScore({ analysis }) {

  return (
    <div className="resume-score-card">

      <h2>📄 AI Resume Analysis</h2>

      <div className="score-circle">
        <h1>{analysis.atsScore}%</h1>
        <span>ATS Score</span>
      </div>

      <div className="summary-box">
        <h3>📌 Summary</h3>
        <p>{analysis.summary}</p>
      </div>

      <div className="skills-container">

        <div>

          <h3>✅ Matched Skills</h3>

          {analysis.matchedSkills?.map((skill) => (
            <p key={skill}>✔ {skill}</p>
          ))}

        </div>

        <div>

          <h3>❌ Missing Skills</h3>

          {analysis.missingSkills?.map((skill) => (
            <p key={skill}>✖ {skill}</p>
          ))}

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

    </div>
  );

}

export default ResumeScore;