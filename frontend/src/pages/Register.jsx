import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Register() {
  const navigate = useNavigate();

  // State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Register Function
  const handleRegister = () => {
    if (name === "" || email === "" || password === "") {
      alert("Please fill all fields");
      return;
    }

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);

    // Temporary Navigation
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Placement Tracker</h1>

        <h2>Register</h2>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />
        <br />

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

        <button onClick={handleRegister}>Register</button>

        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;