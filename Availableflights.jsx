import React, { useEffect, useState } from "react";
import axios from "axios";
import Airadminnavbar from "./Airadminnavbar";

export default function Availableflights() {
  const API = process.env.REACT_APP_API_URL || "http://localhost:8080";
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Load available flights
  const loadAvailableFlights = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/findavailableflight`);
      setFlights(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch available flights");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAvailableFlights();

    // 🔄 Auto-refresh every 5 seconds
    const interval = setInterval(() => {
      loadAvailableFlights();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Airadminnavbar />

      <div className="container mt-4">
        <h2 className="text-center mb-4 bg-info text-white p-2 rounded shadow">
          ✈️ Available Flights
        </h2>

        {loading ? (
          <div className="text-center text-secondary">Loading flights...</div>
        ) : (
          <div className="table-responsive shadow">
            <table className="table table-bordered table-striped">
              <thead className="table-dark text-center">
                <tr>
                  <th>Flight ID</th>
                  <th>Airline</th>
                  <th>Flight No</th>
                  <th>Source</th>
                  <th>Destination</th>
                  <th>Departure</th>
                  <th>Arrival</th>
                  <th>Available Seats</th>
                  <th>Total Seats</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {flights.length > 0 ? (
                  flights.map(f => (
                    <tr key={f.flightId}>
                      <td>{f.flightId}</td>
                      <td>{f.airlineName}</td>
                      <td>{f.flightNumber}</td>
                      <td>{f.source}</td>
                      <td>{f.destination}</td>
                      <td>{f.departureTime}</td>
                      <td>{f.arrivalTime}</td>
                      <td>
                        <span
                          className={
                            f.availableSeats === 0
                              ? "badge bg-danger"
                              : "badge bg-success"
                          }
                        >
                          {f.availableSeats}
                        </span>
                      </td>
                      <td>{f.totalSeats}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-danger fw-bold">
                      No flights with available seats
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
