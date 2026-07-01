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
}) {

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

  return (

    <div className="company-card">

      <div className="company-top">

        <FaBuilding className="company-icon" />

        <div>

          <h2>{company.companyName}</h2>

          <p>{company.role}</p>

        </div>

      </div>

      <span className={`status ${getStatusClass()}`}>
        {company.status}
      </span>

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
    <p>
      <FaStickyNote />
      {company.notes}
    </p>
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