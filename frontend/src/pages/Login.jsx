import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <h1>Placement Tracker</h1>

      <h2>Login</h2>

      <input type="email" placeholder="Enter Email" />

      <br /><br />

      <input type="password" placeholder="Enter Password" />

      <br /><br />

      <button>Login</button>

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;