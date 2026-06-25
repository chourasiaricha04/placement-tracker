import { Link } from "react-router-dom";

function Register() {
  return (
    <div>
      <h1>Placement Tracker</h1>

      <h2>Register</h2>

      <input type="text" placeholder="Enter Name" />

      <br /><br />

      <input type="email" placeholder="Enter Email" />

      <br /><br />

      <input type="password" placeholder="Enter Password" />

      <br /><br />

      <button>Register</button>

      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Register;