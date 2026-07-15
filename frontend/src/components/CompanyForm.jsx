function CompanyForm({
  editingId,
  companyName,
  setCompanyName,
  role,
  setRole,
  deadline,
  setDeadline,
  notes,
  setNotes,
  status,
  setStatus,
  handleSubmit,
}) {
  return (
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
  );
}

export default CompanyForm;