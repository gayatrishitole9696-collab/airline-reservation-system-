import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Airadminnavbar from "./Airadminnavbar";

export default function Updateflight() {

  const navigate = useNavigate();
  const { id } = useParams();
  const API = process.env.REACT_APP_API_URL || "http://localhost:8080";

  /* ===== States ===== */
  const [airlineName, setAirlineName] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [totalSeats, setTotalSeats] = useState("");

  /* ===== Fix datetime-local ===== */
  const formatDateTime = (value) => {
    if (!value) return "";
    return value.substring(0, 16);
  };

  /* ===== Load existing flight ===== */
  useEffect(() => {
    axios
      .get(`${API}/findbyfid?id=${id}`)
      .then((res) => {
        const f = res.data;

        setAirlineName(f.airlineName);
        setFlightNumber(f.flightNumber);
        setSource(f.source);
        setDestination(f.destination);
        setDepartureTime(formatDateTime(f.departureTime));
        setArrivalTime(formatDateTime(f.arrivalTime));
        setTicketPrice(f.ticketPrice);
        setTotalSeats(f.totalSeats);
      })
      .catch(() => alert("Error fetching flight details"));
  }, [id]);

  /* ===== Update flight ===== */
  const Updateflight = (e) => {
    e.preventDefault();

    if (!airlineName || !source || !destination) {
      alert("Airline, Source and Destination are required");
      return;
    }

    const updateflight = {
      airlineName,
      flightNumber,
      source,
      destination,
      departureTime,
      arrivalTime,
      ticketPrice,
      totalSeats
      // availableSeats NOT sent (system controlled)
    };

    axios
      .put(`${API}/updatebyfid?id=${id}`, updateflight)
      .then((res) => {
        alert(res.data);
        navigate(-1);
      })
      .catch(() => alert("Error updating flight"));
  };

  return (
    <div>
      <Airadminnavbar />

      <div className="container mt-4">
        <form onSubmit={Updateflight}>

          <h2 className="bg-info text-white text-center p-3 rounded shadow">
            Update Flight
          </h2>

          <div className="row g-3">

            <div className="col-md-6">
              <label className="form-label">Airline Name</label>
              <input
                type="text"
                className="form-control"
                value={airlineName}
                onChange={(e) => setAirlineName(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Flight Number</label>
              <input
                type="number"
                className="form-control"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Source</label>
              <input
                type="text"
                className="form-control"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Destination</label>
              <input
                type="text"
                className="form-control"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Departure Time</label>
              <input
                type="datetime-local"
                className="form-control"
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Arrival Time</label>
              <input
                type="datetime-local"
                className="form-control"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Ticket Price (₹)</label>
              <input
                type="number"
                className="form-control"
                value={ticketPrice}
                onChange={(e) => setTicketPrice(e.target.value)}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Total Seats</label>
              <input
                type="number"
                className="form-control"
                value={totalSeats}
                onChange={(e) => setTotalSeats(e.target.value)}
                required
              />
            </div>

          </div>

          <div className="mt-4">
            <button type="submit" className="btn btn-primary">
              Update Flight
            </button>
            &nbsp;&nbsp;
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
