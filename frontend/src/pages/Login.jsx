import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Login Function
  const handleLogin = () => {

  if (email === "" || password === "") {
    alert("Please fill all fields");
    return;
  }

  console.log("Email:", email);
  console.log("Password:", password);

  navigate("/dashboard");
};

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Placement Tracker</h1>

        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <button onClick={handleLogin}>Login</button>

        <p>
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;