import "../styles/resumeScore.css";

function ResumeScore({ analysis }) {

  return (
    <div className="resume-score-card">

      <h2>📄 Resume Analysis</h2>

      <div className="score-circle">
        <h1>{analysis.score}%</h1>
        <span>ATS Score</span>
      </div>

      <div className="skills-container">

        <div>

          <h3>✅ Matched Skills</h3>

          {analysis.matchedSkills.length > 0 ? (
            analysis.matchedSkills.map((skill) => (
              <p key={skill}>✔ {skill}</p>
            ))
          ) : (
            <p>No skills matched.</p>
          )}

        </div>

        <div>

          <h3>❌ Missing Skills</h3>

          {analysis.missingSkills.length > 0 ? (
            analysis.missingSkills.map((skill) => (
              <p key={skill}>✖ {skill}</p>
            ))
          ) : (
            <p>No missing skills 🎉</p>
          )}

        </div>

      </div>

      <div className="suggestions">

        <h3>💡 Suggestions</h3>

        <ul>

          {analysis.missingSkills.slice(0, 5).map((skill) => (
            <li key={skill}>
              Add <strong>{skill}</strong> to improve your resume.
            </li>
          ))}

        </ul>

      </div>

    </div>
  );

}

export default ResumeScore;