import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

import "../styles/chart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function AnalyticsChart({ companies }) {

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

  const data = {
    labels: [
      "Applied",
      "Interview",
      "Selected",
      "Rejected",
    ],

    datasets: [
      {
        label: "Applications",

        data: [
          applied,
          interview,
          selected,
          rejected,
        ],

        backgroundColor: [
          "#F59E0B",
          "#3B82F6",
          "#22C55E",
          "#EF4444",
        ],

        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="chart-card">
      <h2>Application Analytics</h2>

      <Bar data={data} options={options} />
    </div>
  );
}

export default AnalyticsChart;