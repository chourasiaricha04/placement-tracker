import "../styles/progressTimeline.css";

function ProgressTimeline({ status }) {

  const steps = [
    "Applied",
    "Online Assessment",
    "Interview",
    "HR Round",
    "Selected",
  ];

  let currentStep = 0;

  switch (status) {

    case "Applied":
      currentStep = 0;
      break;

    case "Interview":
      currentStep = 2;
      break;

    case "Selected":
      currentStep = 4;
      break;

    case "Rejected":
      currentStep = 2;
      break;

    default:
      currentStep = 0;
  }

  return (

    <div className="timeline">

      {

        steps.map((step,index)=>(

          <div
            key={index}
            className="timeline-step"
          >

            <div
              className={`timeline-circle ${
                index<=currentStep
                ? "active"
                : ""
              }`}
            >

              {
                index<=currentStep
                ? "✓"
                : ""
              }

            </div>

            <span>{step}</span>

          </div>

        ))

      }

    </div>

  );

}

export default ProgressTimeline;