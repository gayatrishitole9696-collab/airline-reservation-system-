import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Airadminnavbar from "./Airadminnavbar";

export default function Getflight() {
  const [flights, setFlights] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const [searchSource, setSearchSource] = useState("");
  const [searchDestination, setSearchDestination] = useState("");
  const [searchAirline, setSearchAirline] = useState("");

  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL || "http://localhost:8080";

  /* ===== Fetch All Flights ===== */
  const fetchFlights = () => {
    axios
      .get(`${API}/getallflights`)
      .then((res) => {
        setFlights(res.data);
        setSearchResult([]);
      })
      .catch(() => alert("Error fetching flights"));
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  /* ===== Search by Source & Destination ===== */
  const searchBySourceDestination = () => {
    if (!searchSource || !searchDestination) {
      alert("Please enter source and destination");
      return;
    }

    axios
      .get(`${API}/search?source=${searchSource}&destination=${searchDestination}`)
      .then((res) => setSearchResult(res.data))
      .catch(() => alert("Error searching flights"));
  };

  /* ===== Search by Airline ===== */
  const searchByAirline = () => {
    if (!searchAirline) {
      alert("Please enter airline name");
      return;
    }

    axios
      .get(`${API}/findbyname?airlineName=${searchAirline}`)
      .then((res) => setSearchResult(res.data))
      .catch(() => alert("Error searching airline"));
  };

  /* ===== Delete Flight ===== */
  const deleteFlight = (flightId) => {
    if (!window.confirm("Are you sure you want to delete this flight?")) return;

    axios
      .delete(`${API}/deletebyid?id=${flightId}`)
      .then((res) => {
        alert(res.data);
        fetchFlights(); // refresh table after delete
      })
      .catch(() => alert("Error deleting flight"));
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "N/A";
    // Backend usually sends ISO string: "2026-01-15T10:30:00"
    const dateObj = new Date(dateTimeString);
    return dateObj.toLocaleString(); // you can use toLocaleDateString() or toLocaleTimeString() if you prefer
  };

  const dataToShow = searchResult.length > 0 ? searchResult : flights;

  return (
    <div>
      <Airadminnavbar />

      {/* ===== Search Section ===== */}
      <div className="container mt-4">
        <div className="row g-3">

          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Source"
              value={searchSource}
              onChange={(e) => setSearchSource(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Destination"
              value={searchDestination}
              onChange={(e) => setSearchDestination(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <button className="btn btn-info w-100" onClick={searchBySourceDestination}>
              Search Route
            </button>
          </div>

          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Airline"
              value={searchAirline}
              onChange={(e) => setSearchAirline(e.target.value)}
            />
          </div>

          <div className="col-md-1">
            <button className="btn btn-info w-100" onClick={searchByAirline}>
              Go
            </button>
          </div>

        </div>
      </div>

      {/* ===== Flights Table ===== */}
      <div className="container mt-4">
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover text-center">
            <thead className="table-dark">
              <tr>
                <th>Flight No</th>
                <th>Airline</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Price (₹)</th>
                <th>Available Seats</th>
                <th>Total Seats</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {dataToShow.length > 0 ? (
                dataToShow.map((flight) => (
                  <tr key={flight.flightId}>
                    <td>{flight.flightNumber}</td>
                    <td>{flight.airlineName}</td>
                    <td>{flight.source}</td>
                    <td>{flight.destination}</td>
                    <td>{formatDateTime(flight.departureTime)}</td>
                    <td>{formatDateTime(flight.arrivalTime)}</td>
                    <td>{flight.ticketPrice}</td>
                    <td>{flight.availableSeats}</td>
                    <td>{flight.totalSeats}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm me-2"
                        onClick={() => deleteFlight(flight.flightId)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => navigate(`/updateflight/${flight.flightId}`)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-danger fw-bold">
                    No flights found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
