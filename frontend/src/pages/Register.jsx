import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import api from "../services/api";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  // State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Register Function
  const handleRegister = async () => {
    if (name === "" || email === "" || password === "") {
      toast.error("Please fill all fields");
      return;
    }

    try {

  await api.post("/users/register", {
  name,
  email,
  password,
});

  toast.success("Registration Successful");

setTimeout(() => {
  navigate("/");
}, 1000);

}catch (error) {

  console.log(error);

  console.log(error.response);

  toast.error(
error.response?.data?.message || "Something went wrong"
);

}
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