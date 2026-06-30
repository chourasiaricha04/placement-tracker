import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Login.css";
import { toast } from "react-toastify";

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