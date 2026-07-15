function DashboardActions({

  exportToExcel,
  exportToPDF,

}) {

  return (

    <div
      style={{
        marginBottom: "20px",
        display: "flex",
        gap: "12px",
      }}
    >

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

      <button
        onClick={exportToPDF}
        style={{
          background: "#ef4444",
          color: "white",
          border: "none",
          padding: "12px 20px",
          borderRadius: "10px",
          cursor: "pointer",
          fontSize: "15px",
          fontWeight: "600",
        }}
      >
        📄 Export to PDF
      </button>

    </div>

  );

}

export default DashboardActions;