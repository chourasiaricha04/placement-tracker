import "../styles/interviewModal.css";
import interviewData from "../data/interviewData";

function InterviewModal({ companyName, onClose }) {

  const data = interviewData[companyName];

  if (!data) {
    return (
      <div className="modal-overlay">
        <div className="interview-modal">
          <h2>No Interview Data Available</h2>

          <p>
            We don't have interview information for
            <strong> {companyName}</strong> yet.
          </p>

          <button onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">

      <div className="interview-modal">

        <h2>{companyName}</h2>

        <p className="difficulty">
          Difficulty : {data.difficulty}
        </p>

        <h3>📌 DSA Questions</h3>

        <ul>
          {data.dsa.map((question, index) => (
            <li key={index}>{question}</li>
          ))}
        </ul>

        <h3>💼 HR Questions</h3>

        <ul>
          {data.hr.map((question, index) => (
            <li key={index}>{question}</li>
          ))}
        </ul>

        <h3>📝 OA Pattern</h3>

        <p>{data.oa}</p>

        <a
          href={data.website}
          target="_blank"
          rel="noreferrer"
        >
          🌐 Visit Careers Website
        </a>

        <button
          className="close-btn"
          onClick={onClose}
        >
          Close
        </button>

      </div>

    </div>
  );
}

export default InterviewModal;