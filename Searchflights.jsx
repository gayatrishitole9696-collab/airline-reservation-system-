import React, { useState, useEffect } from "react";
import axios from "axios";
import Passengernavbar from "./Passengernavbar";
import { useNavigate } from "react-router-dom";

export default function Searchflights() {
  const API = process.env.REACT_APP_API_URL || "http://localhost:8080";

  const [flights, setFlights] = useState([]);
  const [airlineName, setAirlineName] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // 🔹 Load all flights
  const loadAllFlights = () => {
    axios
      .get(`${API}/getallflights`)
      .then((res) => {
        setFlights(res.data);
        setMessage(res.data.length === 0 ? "❌ No flights found" : "");
      })
      .catch((err) => {
        console.error("API Error:", err);
        setMessage("❌ Error fetching flights");
      });
  };

  useEffect(() => {
    loadAllFlights();
  }, []);

  // 🔍 Find by Airline
  const findByAirline = () => {
    if (!airlineName) {
      setMessage("⚠️ Please enter airline name");
      return;
    }

    axios
      .get(`${API}/findbyname`, { params: { airlineName } })
      .then((res) => {
        setFlights(res.data);
        setMessage(res.data.length === 0 ? "❌ No flights found" : "");
      })
      .catch((err) => {
        console.error("API Error:", err);
        setMessage("❌ Error fetching flights");
      });

    setSource("");
    setDestination("");
    setAirlineName("");
  };

  // 🔍 Find by Source & Destination
  const findBySourceDestination = () => {
    if (!source || !destination) {
      setMessage("⚠️ Please enter source and destination");
      return;
    }

    axios
      .get(`${API}/search`, { params: { source, destination } })
      .then((res) => {
        setFlights(res.data);
        setMessage(res.data.length === 0 ? "❌ No flights found" : "");
      })
      .catch((err) => {
        console.error("API Error:", err);
        setMessage("❌ Error fetching flights");
      });

    setAirlineName("");
  };

  // ⭐ Book button handler
  const bookFlight = (flightId) => {
    navigate("/bookticket", { state: { flightId } });
  };

  return (
    <div>
      <Passengernavbar />

      {/* 🔹 HEADER */}
      <div
        className="p-2 text-center text-white rounded"
        style={{
          backgroundImage:
            "url('https://tse1.mm.bing.net/th/id/OIP.TKggQHX-h_BXB6UjDio-2gHaE5?pid=Api&P=0&h=180')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        }}
      >
        <h2 className="text-white p-2">Passenger – View & Search Flights</h2>
      </div>

      {/* 🔍 SEARCH SECTION */}
      <div className="container mt-4">
        <div className="row mb-3">
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <button
              className="btn btn-success w-100"
              onClick={findBySourceDestination}
            >
              Search Route
            </button>
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Airline Name"
              value={airlineName}
              onChange={(e) => setAirlineName(e.target.value)}
            />
          </div>

          <div className="col-md-1">
            <button className="btn btn-success w-100" onClick={findByAirline}>
              Go
            </button>
          </div>
        </div>

        <div className="text-center mb-3">
          <button className="btn btn-secondary" onClick={loadAllFlights}>
            🔄 View All Flights
          </button>
        </div>

        {/* ⚠️ MESSAGE */}
        {message && <div className="alert alert-warning text-center">{message}</div>}

        {/* ✈️ FLIGHT TABLE */}
        <table className="table table-bordered table-striped mt-3 shadow">
          <thead className="table-dark text-center">
            <tr>
              <th>ID</th>
              <th>Airline</th>
              <th>Flight No</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Price (₹)</th>
              <th>Available Seats</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {flights.map((f) => (
              <tr key={f.flightId}>
                <td>{f.flightId}</td>
                <td>{f.airlineName}</td>
                <td>{f.flightNumber}</td>
                <td>{f.source}</td>
                <td>{f.destination}</td>
                <td>{f.departureTime}</td>
                <td>{f.arrivalTime}</td>
                <td>{f.ticketPrice}</td>
                <td>{f.availableSeats}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm"
                    disabled={f.availableSeats === 0}
                    onClick={() => bookFlight(f.flightId)}
                  >
                    {f.availableSeats === 0 ? "Full" : "Book"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
