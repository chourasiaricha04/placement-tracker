import CompanyCard from "../components/CompanyCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import StatsCards from "../components/StatsCards";
import { toast } from "react-toastify";
import "../styles/dashboard.css";
import AnalyticsChart from "../components/AnalyticsChart";
import DeleteModal from "../components/DeleteModal";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Dashboard() {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [deadline, setDeadline] = useState("");
  const [notes, setNotes] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  // ================= Fetch Companies =================

  const fetchCompanies = async () => {
    try {
      const response = await api.get("/company");

      setCompanies(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // ================= Add / Update Company =================

  const handleSubmit = async () => {
    if (companyName === "" || role === "") {
      toast.error("Please fill all fields");
      return;
    }

    try {
      if (editingId) {
        // UPDATE

       await api.put(`/company/${editingId}`, {
  companyName,
  role,
  status,
  deadline,
  notes,
});

        toast.success("Company Updated Successfully");
      } else {
        // ADD

        await api.post("/company/add", {
  companyName,
  role,
  status,
  deadline,
  notes,
});

        toast.success("Company Added Successfully");
      }

      // Clear Form

      setCompanyName("");
      setRole("");
      setStatus("Applied");
      setEditingId(null);
      setDeadline("");
      setNotes("");

      fetchCompanies();

    } catch (error) {
      toast.error(
  error.response?.data?.message || "Something went wrong"
);
    }
  };

  // ================= Delete Company =================

  const handleDelete = async (id) => {
    try {
      await api.delete(`/company/${id}`);

      toast.success("Company Deleted Successfully");

      fetchCompanies();

    } catch (error) {
      toast.error(
  error.response?.data?.message || "Something went wrong"
);
    }
  };

  const exportToExcel = () => {

  const data = companies.map((company) => ({

    Company: company.companyName,

    Role: company.role,

    Status: company.status,

    Deadline: company.deadline
      ? new Date(company.deadline).toLocaleDateString()
      : "N/A",

    Notes: company.notes || "",

  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Placements"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(file, "PlacementTracker.xlsx");

};

  const filteredCompanies = companies.filter((company) => {

  const matchesSearch =
    company.companyName
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesFilter =
    filter === "All" || company.status === filter;

  return matchesSearch && matchesFilter;

});

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
  <div className="dashboard">

    <Sidebar
      onLogout={() => {

  localStorage.removeItem("token");

  toast.success("Logged Out Successfully");

  setTimeout(() => {
    navigate("/");
  }, 1000);

}}
    />

    <div className="dashboard-content">

      <Header />

      <StatsCards companies={companies} />

      <AnalyticsChart companies={companies} />



      <SearchBar
  search={search}
  setSearch={setSearch}
  filter={filter}
  setFilter={setFilter}
/>

<div style={{ marginBottom: "20px" }}>
  <button
    onClick={exportToExcel}
    style={{
      background: "#22c55e",
      color: "white",
      border: "none",
      padding: "12px 20px",
      borderRadius: "10px",
      cursor: "pointer",
      fontSize: "15px",
      fontWeight: "600",
    }}
  >
    📥 Export to Excel
  </button>
</div>

      <div className="form-card">

        <h2>
          {editingId ? "Update Company" : "Add Company"}
        </h2>

        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <input
  type="date"
  value={deadline}
  onChange={(e) => setDeadline(e.target.value)}
/>

<textarea
  placeholder="Notes..."
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
  rows="4"
/>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Rejected</option>
          <option>Selected</option>
        </select>

        <button onClick={handleSubmit}>
          {editingId ? "Update Company" : "Add Company"}
        </button>

      </div>

      <h2
        style={{
          color: "white",
          marginBottom: "20px",
        }}
      >
        Your Companies
      </h2>

      {loading ? (
        <h2 style={{ color: "white" }}>
          Loading...
        </h2>
      ) : companies.length === 0 ? (
        <h2 style={{ color: "white" }}>
          No Companies Found
        </h2>
      ) : (
        filteredCompanies.map((company) => (

  <CompanyCard

    key={company._id}

    company={company}

    onEdit={() => {

      setEditingId(company._id);

      setCompanyName(company.companyName);

      setRole(company.role);

      setStatus(company.status);

      setDeadline(company.deadline || "");
      setNotes(company.notes || "");

    }}

  onDelete={() => {

  setDeleteId(company._id);

  setShowModal(true);

}}

  />

))
      )}

    </div>

    <DeleteModal
  isOpen={showModal}
  onClose={() => {
    setShowModal(false);
    setDeleteId(null);
  }}
  onConfirm={() => {
    handleDelete(deleteId);
    setShowModal(false);
    setDeleteId(null);
  }}
/>

  </div>
);
}

export default Dashboard;