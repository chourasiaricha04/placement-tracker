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
//import UpcomingDeadlines from "../components/UpcomingDeadlines";
import DashboardInsights from "../components/DashboardInsights";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ProgressRing from "../components/ProgressRing";
import RecentActivity from "../components/RecentActivity";
import InterviewModal from "../components/InterviewModal";
import ActivityLog from "../components/ActivityLog";
import ResumeAnalyzer from "../components/ResumeAnalyzer";
import DashboardActions from "../components/DashboardActions";
import CompanyForm from "../components/CompanyForm";
import CompanyList from "../components/CompanyList";

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

  const [showInterviewModal, setShowInterviewModal] = useState(false);

  const [selectedCompany, setSelectedCompany] = useState("");

  const [activities, setActivities] = useState([]);

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

      // ================= UPDATE =================

      await api.put(`/company/${editingId}`, {
        companyName,
        role,
        status,
        deadline,
        notes,
      });

      toast.success("Company Updated Successfully");

      setActivities((prev) => [
        {
          icon: "🟡",
          title: `Updated ${companyName}`,
          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);

    } else {

      // ================= ADD =================

      await api.post("/company/add", {
        companyName,
        role,
        status,
        deadline,
        notes,
      });

      toast.success("Company Added Successfully");

      setActivities((prev) => [
        {
          icon: "🟢",
          title: `Added ${companyName}`,
          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);

    }

    // ================= Clear Form =================

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

    // Find company before deleting
    const deletedCompany = companies.find(
      (company) => company._id === id
    );

    await api.delete(`/company/${id}`);

    toast.success("Company Deleted Successfully");

    // Add activity
    setActivities((prev) => [
      {
        icon: "🔴",
        title: `Deleted ${deletedCompany?.companyName || "Company"}`,
        time: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);

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

  const file = new Blob(
    [excelBuffer],
    {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    }
  );

  saveAs(file, "PlacementTracker.xlsx");

};
const exportToPDF = () => {

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Placement Tracker Report", 14, 20);

  const tableData = companies.map((company) => [

    company.companyName,

    company.role,

    company.status,

    company.deadline
      ? new Date(company.deadline).toLocaleDateString()
      : "N/A",

    company.notes || "-",

  ]);

  autoTable(doc, {
    head: [["Company", "Role", "Status", "Deadline", "Notes"]],
    body: tableData,
    startY: 30,
    styles: {
      fontSize: 10,
    },
    headStyles: {
      fillColor: [99, 102, 241],
    },
  });

  doc.save("PlacementTracker.pdf");

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

     <Header companies={companies} />

<DashboardInsights companies={companies} />
<ProgressRing companies={companies} />

<StatsCards companies={companies} />

<AnalyticsChart companies={companies} />
<ResumeAnalyzer />


<RecentActivity companies={companies} />
<ActivityLog activities={activities} />





<SearchBar
  search={search}
  setSearch={setSearch}
  filter={filter}
  setFilter={setFilter}
/>

<DashboardActions

  exportToExcel={exportToExcel}

  exportToPDF={exportToPDF}

/>
<CompanyForm
  editingId={editingId}

  companyName={companyName}
  setCompanyName={setCompanyName}

  role={role}
  setRole={setRole}

  deadline={deadline}
  setDeadline={setDeadline}

  notes={notes}
  setNotes={setNotes}

  status={status}
  setStatus={setStatus}

  handleSubmit={handleSubmit}
/>
      <h2
        style={{
          color: "white",
          marginBottom: "20px",
        }}
      >
        Your Companies
      </h2>

      <CompanyList

  loading={loading}

  filteredCompanies={filteredCompanies}

  setEditingId={setEditingId}

  setCompanyName={setCompanyName}

  setRole={setRole}

  setStatus={setStatus}

  setDeadline={setDeadline}

  setNotes={setNotes}

  setDeleteId={setDeleteId}

  setShowModal={setShowModal}

  setSelectedCompany={setSelectedCompany}

  setShowInterviewModal={setShowInterviewModal}

/>

    </div>


    {showInterviewModal && (

  <InterviewModal

    companyName={selectedCompany}

    onClose={() => setShowInterviewModal(false)}

  />

)}

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