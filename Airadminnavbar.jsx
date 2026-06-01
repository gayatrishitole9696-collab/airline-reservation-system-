import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Airadminnavbar() {
  // for log out button
  const navigate = useNavigate();

  const logout = () => {
    // Optionally clear user info from localStorage
    localStorage.removeItem("userinfo");
    // Navigate to register page
    navigate("/home");
  }

  const user = JSON.parse(localStorage.getItem("userinfo"));

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-danger">
        <div className="container-fluid">
          {/* <a className="navbar-brand text-light fs-1" href="#">Airline Reservation</a> */}
         <Link className="navbar-brand d-flex align-items-center text-white fw-bold fs-2" to="/homeadmin">
                   ✈️ <span className="ms-2">Airline Reservation</span>
                 </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <Link to="/home" className='nav-link active text-light fs-4'>Home</Link>
              </li> */}
              <li className="nav-item">
                <Link to="/addflight" className='nav-link text-light fs-4'>Add Flight</Link>
              </li>
              <li className="nav-item">
                <Link to="/getflight" className='nav-link text-light fs-4'>View Flights</Link>
              </li>
              <li className="nav-item">
                <Link to="/getallbookings" className='nav-link text-light fs-4'>View Bookings</Link>
              </li>
              <li className="nav-item">
                <Link to="/availableflights" className='nav-link text-light fs-4'>Available Flights</Link>
              </li>
              
            </ul>

            {/* Welcome message */}
            <p className="text-light fs-4" style={{ paddingRight: "20px" }}>
              <strong>Welcome, {user?.firstname}</strong>
            </p>

            {/* Logout button */}
            <button 
              className="btn btn-secondary text-light fs-4" 
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}
