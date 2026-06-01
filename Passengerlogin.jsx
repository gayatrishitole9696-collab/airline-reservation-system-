// import React, { useState } from "react";
// import axios from "axios";

// export default function Passengerlogin() {
//   const [passenger, setPassenger] = useState({
//     firstname: "",
//     lastname: "",
//     username: "",
//     password: "",
//     email: "",
//     contactno: "",
//     passportNumber: "",
//     gender: "",
//     nationality: "",
//   });

//   const [message, alert] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPassenger((prevPassenger) => ({
//       ...prevPassenger,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => { 
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:8080/passenger/login", passenger);
//       alert("Registration successful! You can now log in.");
//       setPassenger({  
//         firstname: "",
//         lastname: "",
//         username: "", 
//         password: "",
//         email: "",
//         contactno: "",
//         passportNumber: "",
//         gender: "",
//         nationality: "",
//       });
//     } catch (error) {
//       alert("Registration failed. Please try again.");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Passenger Registration</h2>
//       {message && <div className="alert alert-info">{message}</div>}
//       <form onSubmit={handleSubmit}>
//         <div className="row g-3">
//           <div className="col-md-6">
//             <label className="form-label">First Name</label>
//             <input
//               type="text"
//               className="form-control"
//               name="firstname"
//               value={passenger.firstname}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Last Name</label>
//             <input
//               type="text"
//               className="form-control"
//               name="lastname"
//               value={passenger.lastname}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Username</label>
//             <input
//               type="text"
//               className="form-control"
//               name="username"
//               value={passenger.username}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               name="password"
//               value={passenger.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Email</label>
//             <input
//               type="email"
//               className="form-control"
//               name="email"
//               value={passenger.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="col-md-6">    
//             <label className="form-label">Contact Number</label>
//             <input
//               type="text"
//               className="form-control"
//               name="contactno"
//               value={passenger.contactno}
//               onChange={handleChange}
//               required
//             />  
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Passport Number</label>
//             <input
//               type="text"
//               className="form-control"
//               name="passportNumber"
//               value={passenger.passportNumber}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Gender</label>
//             <select
//               className="form-select" 
//               name="gender"
//               value={passenger.gender}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select Gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Nationality</label>
//             <input
//               type="text"
//               className="form-control"
//               name    ="nationality"
//               value={passenger.nationality}
//               onChange={handleChange}
//               required  
//             />
//           </div>
//         </div>    
//         <button type="submit" className="btn btn-primary mt-4 w-100">
//           Login
//         </button> 
//       </form>
//     </div>
//   );
// }   

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";   // ✅ added

export default function Passengerlogin() {

  const navigate = useNavigate();   // ✅ added

  const [passenger, setPassenger] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    email: "",
    contactno: "",
    passportNumber: "",
    gender: "",
    nationality: "",
  });

  const [message, alert] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassenger((prevPassenger) => ({
      ...prevPassenger,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/passenger/login", passenger);

      alert("Login successful!");

      // ✅ store passenger if you want later
      localStorage.setItem("passengerinfo", JSON.stringify(response.data));

      // ✅ redirect to passenger dashboard
      navigate("/passengerdashboard");

      //already registered button issue fixed
      navigate("/alreadyregister");

      setPassenger({  
        firstname: "",
        lastname: "",
        username: "", 
        password: "",
        email: "",
        contactno: "",
        passportNumber: "",
        gender: "",
        nationality: "",
      });

    } catch (error) {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Passenger Registration</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">First Name</label>
            <input type="text" className="form-control" name="firstname" value={passenger.firstname} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Last Name</label>
            <input type="text" className="form-control" name="lastname" value={passenger.lastname} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" name="username" value={passenger.username} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={passenger.password} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={passenger.email} onChange={handleChange} required />
          </div>

          <div className="col-md-6">    
            <label className="form-label">Contact Number</label>
            <input type="text" className="form-control" name="contactno" value={passenger.contactno} onChange={handleChange} required />  
          </div>

          <div className="col-md-6">
            <label className="form-label">Passport Number</label>
            <input type="text" className="form-control" name="passportNumber" value={passenger.passportNumber} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Gender</label>
            <select className="form-select" name="gender" value={passenger.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Nationality</label>
            <input type="text" className="form-control" name="nationality" value={passenger.nationality} onChange={handleChange} required />
          </div>
        </div>    

        <button type="submit" className="btn btn-primary mt-4 w-100">
          Login
        </button> 
        <button type="submit" className="btn btn-secondary mt-2 w-100" onClick={() => navigate("/alreadyregister")}>
          Already registered
        </button>
      </form>
    </div>
  );
}
