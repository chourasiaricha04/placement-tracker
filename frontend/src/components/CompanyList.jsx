import CompanyCard from "./CompanyCard";

function CompanyList({
  loading,
  filteredCompanies,
  setEditingId,
  setCompanyName,
  setRole,
  setStatus,
  setDeadline,
  setNotes,
  setDeleteId,
  setShowModal,
  setSelectedCompany,
  setShowInterviewModal,
}) {

  if (loading) {
    return <h2 style={{ color: "white" }}>Loading...</h2>;
  }

  if (filteredCompanies.length === 0) {
    return <h2 style={{ color: "white" }}>No Companies Found</h2>;
  }

  return (
    <>
      {filteredCompanies.map((company) => (

        <CompanyCard
          key={company._id}
          company={company}

          onEdit={() => {

            setEditingId(company._id);

            setCompanyName(company.companyName);

            setRole(company.role);

            setStatus(company.status);

            setDeadline(
              company.deadline
                ? company.deadline.split("T")[0]
                : ""
            );

            setNotes(company.notes || "");

          }}

          onDelete={() => {

            setDeleteId(company._id);

            setShowModal(true);

          }}

          onPrepare={() => {

            setSelectedCompany(company.companyName);

            setShowInterviewModal(true);

          }}

        />

      ))}
    </>
  );
}

export default CompanyList;