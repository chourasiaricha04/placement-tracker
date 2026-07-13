import {
  FaBuilding,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaStickyNote,
  FaHourglassHalf,
} from "react-icons/fa";
import "../styles/companycard.css";


function CompanyCard({
  company,
  onEdit,
  onDelete,
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

  initial={{
    opacity: 0,
    y: 40,
    scale: 0.95,
  }}

  animate={{
    opacity: 1,
    y: 0,
    scale: 1,
  }}

  transition={{
    duration: 0.45,
    ease: "easeOut",
  }}

  whileHover={{
    y: -10,
    scale: 1.02,
  }}
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
          className="edit-btn"
          onClick={onEdit}
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