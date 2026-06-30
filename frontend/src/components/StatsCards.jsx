import {
  FaBuilding,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaBriefcase,
} from "react-icons/fa";

import "../styles/stats.css";

function StatsCards({ companies }) {

  const total = companies.length;

  const applied = companies.filter(
    (company) => company.status === "Applied"
  ).length;

  const interview = companies.filter(
    (company) => company.status === "Interview"
  ).length;

  const selected = companies.filter(
    (company) => company.status === "Selected"
  ).length;

  const rejected = companies.filter(
    (company) => company.status === "Rejected"
  ).length;

  const stats = [
    {
      title: "Total",
      value: total,
      icon: <FaBuilding />,
      color: "#6366F1",
    },
    {
      title: "Applied",
      value: applied,
      icon: <FaBriefcase />,
      color: "#F59E0B",
    },
    {
      title: "Interview",
      value: interview,
      icon: <FaClock />,
      color: "#3B82F6",
    },
    {
      title: "Selected",
      value: selected,
      icon: <FaCheckCircle />,
      color: "#22C55E",
    },
    {
      title: "Rejected",
      value: rejected,
      icon: <FaTimesCircle />,
      color: "#EF4444",
    },
  ];

  return (

    <div className="stats-container">

      {

        stats.map((item, index) => (

          <div
            className="stats-card"
            key={index}
          >

            <div
              className="stats-icon"
              style={{
                background: item.color,
              }}
            >
              {item.icon}
            </div>

            <div>

              <h3>{item.value}</h3>

              <p>{item.title}</p>

            </div>

          </div>

        ))

      }

    </div>

  );

}

export default StatsCards;