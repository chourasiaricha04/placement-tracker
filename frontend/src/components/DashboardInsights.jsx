import "../styles/dashboardInsights.css";

function DashboardInsights({ companies }) {

  const total = companies.length;

  const selected = companies.filter(
    c => c.status === "Selected"
  ).length;

  const interviews = companies.filter(
    c => c.status === "Interview"
  ).length;

  const successRate =
    total === 0
      ? 0
      : Math.round((selected / total) * 100);

  const nextDeadline = companies
    .filter(c => c.deadline)
    .sort(
      (a, b) =>
        new Date(a.deadline) -
        new Date(b.deadline)
    )[0];

  return (

    <div className="insights">

      <div className="insight-card">

        <h4>🎯 Success Rate</h4>

        <h2>{successRate}%</h2>

      </div>

      <div className="insight-card">

        <h4>💼 Interviews</h4>

        <h2>{interviews}</h2>

      </div>

      <div className="insight-card">

        <h4>📅 Next Deadline</h4>

        <h2>

          {

            nextDeadline

              ?

              new Date(
                nextDeadline.deadline
              ).toLocaleDateString()

              :

              "None"

          }

        </h2>

      </div>

    </div>

  );

}

export default DashboardInsights;