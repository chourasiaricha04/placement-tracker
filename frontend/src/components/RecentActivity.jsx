import "../styles/recentActivity.css";

function RecentActivity({ companies }) {

  const recent = [...companies]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 5);

  return (

    <div className="activity-card">

      <h2>Recent Activity</h2>

      {

        recent.length === 0 ?

        (

          <p>No activity yet.</p>

        )

        :

        (

          recent.map(company => (

            <div
              key={company._id}
              className="activity-item"
            >

              <div className="activity-dot"></div>

              <div>

                <h4>
                  {company.companyName}
                </h4>

                <p>

                  Applied for

                  {" "}

                  {company.role}

                </p>

              </div>

            </div>

          ))

        )

      }

    </div>

  );

}

export default RecentActivity;