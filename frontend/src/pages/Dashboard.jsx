import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Dashboard Page</h2>

      <button onClick={() => navigate("/")}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;