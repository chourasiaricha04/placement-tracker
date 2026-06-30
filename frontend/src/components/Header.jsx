import "../styles/header.css";
import { Bell, UserCircle } from "lucide-react";

function Header() {

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="header">

      <div className="header-left">
        <h1>Welcome Back 👋</h1>
        <p>{today}</p>
      </div>

      <div className="header-right">

        <div className="icon-box">
          <Bell size={20} />
        </div>

        <div className="profile">

          <UserCircle size={38} />

          <div>
            <h4>Richa</h4>
            <span>Placement Tracker</span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Header;