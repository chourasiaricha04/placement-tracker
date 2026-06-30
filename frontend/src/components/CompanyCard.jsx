import { FaBuilding, FaEdit, FaTrash } from "react-icons/fa";
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