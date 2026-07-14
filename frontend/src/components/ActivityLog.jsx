import "../styles/activityLog.css";

function ActivityLog({ activities }) {

  return (

    <div className="activity-card">

      <h2>📋 Recent Activity</h2>

      {

        activities.length === 0 ?

        (

          <p className="empty">
            No activity yet
          </p>

        )

        :

        (

          activities.map((item,index)=>(

            <div
              className="activity-item"
              key={index}
            >

              <div className="activity-icon">

                {item.icon}

              </div>

              <div>

                <h4>{item.title}</h4>

                <span>{item.time}</span>

              </div>

            </div>

          ))

        )

      }

    </div>

  );

}

export default ActivityLog;