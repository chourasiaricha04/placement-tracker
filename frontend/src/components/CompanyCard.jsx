import {
  FaBuilding,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaStickyNote,
  FaHourglassHalf,
} from "react-icons/fa";
import "../styles/companycard.css";
import ProgressTimeline from "./ProgressTimeline";


function CompanyCard({
  company,
  onEdit,
  onDelete,
  onPrepare,
}){ 

const avatarColors = {
  Microsoft: "#2563eb",
  Google: "#ef4444",
  Amazon: "#f59e0b",
  Adobe: "#dc2626",
  Netflix: "#e50914",
  Infosys: "#06b6d4",
  TCS: "#0f766e",
  Wipro: "#7c3aed",
  Accenture: "#9333ea",
};


  const getStatusClass = () => {

    switch (company.status) {

      case "Applied":
        return "applied";

      case "Interview":
        return "interview";

      case "Selected":
        return "selected";

      case "Rejected":
        return "rejected";

      default:
        return "";

    }

  };

  const avatarColor =
  avatarColors[company.companyName] || "#6366f1";

const firstLetter =
  company.companyName.charAt(0).toUpperCase();

  return (

    <div
  className="company-card"
>

      <div className="company-top">

      <div
  className="company-avatar"
  style={{
    background: avatarColor,
  }}
>
  {firstLetter}
</div>

        <div>

          <h2>{company.companyName}</h2>

          <p>{company.role}</p>

        </div>

      </div>

      <div className="status-wrapper">
  <span className={`status ${getStatusClass()}`}>
    {company.status}
  </span>
</div>

<ProgressTimeline status={company.status} />

      <div className="company-details">

  <p>
    <FaCalendarAlt />
    Applied :
    {" "}
    {new Date(company.appliedDate).toLocaleDateString()}
  </p>

  {company.deadline && (
    <p>
      <FaHourglassHalf />
      Deadline :
      {" "}
      {new Date(company.deadline).toLocaleDateString()}
    </p>
  )}

  {company.notes && (
  <div className="notes-box">
    <FaStickyNote />
    <span>{company.notes}</span>
  </div>
)}

</div>

      <div className="company-actions">

        <button
  className="prepare-btn"
  onClick={onPrepare}
>
  📚 Prepare
</button>

        <button
  className="edit-btn"
  onClick={() => {
    console.log("Edit button clicked");
    onEdit();
  }}
>
  <FaEdit />
  Edit
</button>

        <button
          className="delete-btn"
          onClick={onDelete}
        >
          <FaTrash />

          Delete
        </button>

      </div>

    </div>

  );

}

export default CompanyCard;