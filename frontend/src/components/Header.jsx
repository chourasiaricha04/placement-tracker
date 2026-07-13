import "../styles/header.css";
import { Bell, UserCircle } from "lucide-react";

function Header() {

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  }

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="header">

      <div className="header-left">

        <span className="greeting">
          👋 {greeting}, Richa
        </span>

        <h1>
          Welcome Back
        </h1>

        <p>
          Keep tracking your applications.
          Every application brings you one step
          closer to your dream offer.
        </p>

        <small>{today}</small>

      </div>

      <div className="header-right">

        <div className="notification">

          <Bell size={21}/>

          <span></span>

        </div>

        <div className="profile">

          <UserCircle size={42}/>

          <div>

            <h4>Richa</h4>

            <span>Software Engineer Aspirant</span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Header;