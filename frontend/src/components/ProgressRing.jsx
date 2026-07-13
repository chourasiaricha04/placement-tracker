import "../styles/progressRing.css";

function ProgressRing({ companies }) {

  const total = companies.length;

  const completed = companies.filter(
    company =>
      company.status === "Selected" ||
      company.status === "Rejected"
  ).length;

  const percent =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  return (

    <div className="progress-card">

      <h2>Application Progress</h2>

      <div className="circle">

        <svg>

          <circle
            cx="80"
            cy="80"
            r="65"
          />

          <circle
            cx="80"
            cy="80"
            r="65"
            style={{
              strokeDashoffset:
                408 - (408 * percent) / 100,
            }}
          />

        </svg>

        <div className="number">
          {percent}%
        </div>

      </div>

    </div>

  );

}

export default ProgressRing;