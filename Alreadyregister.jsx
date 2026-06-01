import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Alreadyregister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    try {
      // Call backend login API
      const res = await axios.post("http://localhost:8080/passenger/login", {
        username,
        password,
      });

      // Save passenger info in localStorage
      localStorage.setItem("passenger", JSON.stringify(res.data));

      // Redirect to dashboard
      navigate("/passengerdashboard");
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">Already Registered - Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-success w-100">
          Login
        </button>
      </form>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}
