import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Login.css";
import { toast } from "react-toastify";
import { FaChartLine } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Login Function
  const handleLogin = async () => {

  if (email === "" || password === "") {
    toast.error("Please fill all fields");
    return;
  }

  try {

  const response = await api.post("/users/login", {
  email,
  password,
});

localStorage.setItem("token", response.data.token);

toast.success("Login Successful");

setTimeout(() => {
  navigate("/dashboard");
}, 1000);

} catch (error) {

  toast.error(
error.response?.data?.message || "Something went wrong"
);

}
};

  return (
  <div className="login-container">

    <div className="login-left">

  <div className="hero-icon">
    <FaChartLine />
  </div>

  <h1>Placement Tracker</h1>

  <h2>
    Land Your Dream Job Faster.
  </h2>

  <p>
    Track applications, interviews,
    deadlines and offers from one
    beautiful dashboard.
  </p>

</div>

    <div className="login-card">

      <h3>Welcome Back 👋</h3>

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>
        Continue →
      </button>

      <p>
        Don't have an account?
        <Link to="/register"> Register</Link>
      </p>

    </div>

  </div>
);
}

export default Login;