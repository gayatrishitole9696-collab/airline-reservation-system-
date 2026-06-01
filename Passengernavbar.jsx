import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Passengernavbar() {

  let navigate = useNavigate();

  let logout = () => {
    navigate("/");
  }

  // 🔐 safely get passenger info from localStorage
  let passenger = null;
  try {
    passenger = JSON.parse(localStorage.getItem("passengerinfo"));
  } catch (e) {
    passenger = null;
  }

  // ✅ support different possible name fields
  const passengerName =
    passenger?.firstname ||
    passenger?.firstName ||
    passenger?.name ||
    passenger?.passengerName ||
    "";

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-danger">
        <div className="container-fluid">

          <Link className="navbar-brand d-flex align-items-center text-white fw-bold fs-2" to="/homepassenger">
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

              <li className="nav-item">
                <Link to="/searchflights" className="nav-link text-dark fs-3">
                  Search Flights
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/bookticket" className="nav-link text-dark fs-3">
                  Book Ticket
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/mybookings" className="nav-link text-dark fs-3">
                  My Bookings
                </Link>
              </li>

            </ul>

            {/* ✅ Welcome text */}
            <p className="text-light fs-4" style={{ paddingRight: "20px" }}>
              <strong>
                Welcome{passengerName ? `, ${passengerName}` : ""}
              </strong>
            </p>

            <button
              className="btn btn-danger text-light fs-4"
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
