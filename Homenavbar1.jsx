import React from 'react'
import { Link } from 'react-router-dom'

export default function Homenavbar() {

  const user = JSON.parse(localStorage.getItem("userinfo"));

  return (
    <nav 
      className="navbar navbar-expand-lg shadow"
      style={{ background: "linear-gradient(90deg, #c31432, #240b36)" }}
    >
      <div className="container-fluid px-4">

        {/* Logo & Brand */}
        <Link className="navbar-brand d-flex align-items-center text-white fw-bold fs-2" to="/home">
          ✈️ <span className="ms-2">Airline Reservation</span>
        </Link>

        <button 
          className="navbar-toggler bg-light" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          {/* Center Menu */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-3">

            <li className="nav-item">
              <Link to="/home" className='nav-link text-white fs-5 fw-semibold'>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/aboutus" className='nav-link text-white fs-5 fw-semibold'>
                About Us
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/ourservices" className='nav-link text-white fs-5 fw-semibold'>
                Our Services
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/contactus" className='nav-link text-white fs-5 fw-semibold'>
                Contact Us
              </Link>
            </li>
          </ul>

          {/* Right Side */}
          <div className="d-flex align-items-center gap-3">

            {/* Welcome */}
            {user && (
              <span className="text-white fs-5 fw-semibold">
                Welcome, {user.firstname}
              </span>
            )}

            {/* Login Dropdown */}
            <div className="dropdown">
              <button
                className="btn btn-warning dropdown-toggle fw-bold px-4 py-2"
                type="button"
                data-bs-toggle="dropdown"
              >
                Login
              </button>

              <ul className="dropdown-menu dropdown-menu-end shadow">
                <li>
                  <Link className="dropdown-item fw-semibold" to="/register">
                    👨‍✈️ Admin Login
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item fw-semibold" to="/passengerlogin">
                    🧍 Passenger Login
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </nav>
  )
}
