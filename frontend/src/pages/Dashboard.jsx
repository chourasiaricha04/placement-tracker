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
        });

        toast.success("Company Updated Successfully");
      } else {
        // ADD

        await api.post("/company/add", {
          companyName,
          role,
          status,
        });

        toast.success("Company Added Successfully");
      }

      // Clear Form

      setCompanyName("");
      setRole("");
      setStatus("Applied");
      setEditingId(null);

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

    }}

    onDelete={() => handleDelete(company._id)}

  />

))
      )}

    </div>

  </div>
);
}

export default Dashboard;