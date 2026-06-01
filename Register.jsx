import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Airadminnavbar from "./Airadminnavbar";

export default function Register() {

  // 🔹 States
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [contactno, setContactNo] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("ADMIN");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();
  const API = "http://localhost:8080";

  // 🔹 Validation
  const validate = () => {
    if (!firstname || !lastname || !email || !contactno || !gender || !username || !password) {
      alert("All fields are required");
      return false;
    }
    if (!/^[A-Za-z]{2,20}$/.test(firstname)) {
      alert("Invalid first name");
      return false;
    }
    if (!/^[A-Za-z]{2,20}$/.test(lastname)) {
      alert("Invalid last name");
      return false;
    }
    if (!/^\d{10}$/.test(contactno)) {
      alert("Contact number must be 10 digits");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Invalid email");
      return false;
    }
    return true;
  };

  // 🔹 Register Admin
  const registerUser = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const user = { firstname, lastname, email, contactno: Number(contactno), gender, role, username, password };

    try {
      const res = await axios.post(`${API}/register`, user);
      alert(res.data || "Registration successful");
      setIsLogin(true);
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  };

  // 🔹 Admin Login
  const loginUser = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Username and password are required");
      return;
    }

    try {
      const res = await axios.post(`${API}/login`, { username, password });
      const user = res.data;

      if (!user || user.role !== "ADMIN") {
        alert("Unauthorized access (Admin only)");
        return;
      }

      localStorage.setItem("userinfo", JSON.stringify(user));
      navigate("/Airadmindashboard");

    } catch (error) {
      alert("Invalid username or password");
    }
  };

  return (
    <>
    <div>
      {/* <Airadminnavbar /> */}

      <div className="container mt-5" style={{ maxWidth: "700px" }}>
        {!isLogin ? (
          <>
            {/* 🔹 REGISTER */}
            <h2 className="bg-primary text-white text-center p-3 rounded mb-4">
              Admin Registration
            </h2>

            <form onSubmit={registerUser}>
              <div className="row g-3">

                <div className="col-md-6">
                  <label>First Name</label>
                  <input className="form-control" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                </div>

                <div className="col-md-6">
                  <label>Last Name</label>
                  <input className="form-control" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                </div>

                <div className="col-md-6">
                  <label>Email</label>
                  <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="col-md-6">
                  <label>Contact Number</label>
                  <input type="tel" maxLength="10" className="form-control" value={contactno} onChange={(e) => setContactNo(e.target.value)} />
                </div>

                <div className="col-md-6">
                  <label>Gender</label>
                  <select className="form-select" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label>Role</label>
                  <select className="form-select" value={role} disabled>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label>Username</label>
                  <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className="col-md-6">
                  <label>Password</label>
                  <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

              </div>

              <div className="mt-4 text-center">
                <button className="btn btn-success px-4">Register</button>
                <button type="button" className="btn btn-secondary ms-3" onClick={() => setIsLogin(true)}>
                  Already Registered? Login
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            {/* 🔹 LOGIN */}
            <h2 className="bg-dark text-white text-center p-3 rounded mb-4">
              Admin Login
            </h2>

            <form onSubmit={loginUser}>
              <div className="mb-3">
                <label>Username</label>
                <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>

              <div className="mb-3">
                <label>Password</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>

              <div className="text-center">
                <button className="btn btn-primary px-4">Login</button>
                <button type="button" className="btn btn-danger ms-3" onClick={() => setIsLogin(false)}>
                  New Admin? Register
                </button>
              </div>
            </form>
          </>
        )}
      </div>
      </div>
    </>
  );
}
