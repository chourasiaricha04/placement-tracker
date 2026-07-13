import "../styles/header.css";
import { useState } from "react";
import { Bell, UserCircle } from "lucide-react";

 function Header({ companies }) {

  

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

  const [showNotifications, setShowNotifications] = useState(false);

const todayDate = new Date();

const notifications = companies.filter(company => {

  if (!company.deadline) return false;

  const diff = Math.ceil(

    (new Date(company.deadline) - todayDate)

    /(1000*60*60*24)

  );

  return diff <= 2;

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

        <div
  className="notification"
  onClick={() => setShowNotifications(!showNotifications)}
>

  <Bell size={21} />

  {notifications.length > 0 && (
    <span className="notification-count">
      {notifications.length}
    </span>
  )}

  {showNotifications && (
    <div className="notification-dropdown">

      <h3>Upcoming Deadlines</h3>

      {notifications.length === 0 ? (

        <p>No Notifications 🎉</p>

      ) : (

        notifications.map((company) => {

  const diff = Math.ceil(
    (new Date(company.deadline) - new Date()) /
    (1000 * 60 * 60 * 24)
  );

  let label = "";
  let badge = "";

  if (diff < 0) {
    label = "Overdue";
    badge = "danger";
  } else if (diff === 0) {
    label = "Today";
    badge = "today";
  } else if (diff === 1) {
    label = "Tomorrow";
    badge = "tomorrow";
  } else {
    label = `${diff} days left`;
    badge = "upcoming";
  }

  return (

    <div
      key={company._id}
      className="notification-item"
    >

      <div>

        <strong>{company.companyName}</strong>

        <span>{company.role}</span>

      </div>

      <div className={`notify-badge ${badge}`}>
        {label}
      </div>

    </div>

  );

})

      )}

    </div>
  )}

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