import {
  LayoutDashboard,
  BarChart3,
  Building2,
  LogOut,
} from "lucide-react";

function Sidebar({ onLogout }) {
  return (
    <div className="sidebar">

      <div>

        <h1 className="logo">
          Placement Tracker
        </h1>

        <div className="menu">

          <div className="menu-item active">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </div>

          <div className="menu-item">
            <BarChart3 size={20} />
            <span>Analytics</span>
          </div>

          <div className="menu-item">
            <Building2 size={20} />
            <span>Companies</span>
          </div>

        </div>

      </div>

      <button
        className="logout-btn"
        onClick={onLogout}
      >
        <LogOut size={18} />
        Logout
      </button>

    </div>
  );
}

export default Sidebar;