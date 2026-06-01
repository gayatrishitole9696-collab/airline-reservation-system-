import axios from "axios";
import React, { useState } from "react";
import Airadminnavbar from "./Airadminnavbar";

export default function Addflight() {
  const [flightNumber, setFlightNumber] = useState("");
  const [airlineName, setAirlineName] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [departureLocalTime, setDepartureLocalTime] = useState("");
  const [arrivalLocalTime, setArrivalLocalTime] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [totalSeats, setTotalSeats] = useState("");

  const addFlightData = async (e) => {
    e.preventDefault();

    if (!flightNumber || !airlineName || !source || !destination) {
      alert("Please fill all required fields");
      return;
    }

    if (source === destination) {
      alert("Source and Destination cannot be same");
      return;
    }

    if (ticketPrice <= 0) {
      alert("Ticket price must be greater than 0");
      return;
    }

    if (!departureLocalTime || !arrivalLocalTime) {
      alert("Please select departure and arrival time");
      return;
    }

    if (arrivalLocalTime <= departureLocalTime) {
      alert("Arrival time must be after departure time");
      return;

     
    }

    // Combine LocalTime with today's date for backend LocalDateTime
    const today = new Date().toISOString().split("T")[0]; // e.g., "2026-01-15"
    const departureDateTime = `${today}T${departureLocalTime}:00`;
    const arrivalDateTime = `${today}T${arrivalLocalTime}:00`;

    const flight = {
      flightNumber,
      airlineName,
      source,
      destination,
      departureTime: departureDateTime,
      arrivalTime: arrivalDateTime,
      ticketPrice,
      totalSeats,
      availableSeats: totalSeats // automatically set availableSeats same as totalSeats
    };

    try {
      const res = await axios.post("http://localhost:8080/addflight", flight);
      if (res.data === "Flight added successfully!") {
        alert("Flight added successfully");
        window.location = "/getflight";
      } else {
        alert("Error while adding flight");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div>
      <Airadminnavbar />

      <form onSubmit={addFlightData} className="container mt-4">
        <h1 className="bg-info text-white p-3 rounded shadow text-center">
          Add Flight
        </h1>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Flight Number</label>
            <input type="number" className="form-control" required onChange={e => setFlightNumber(e.target.value)} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Airline Name</label>
            <input type="text" className="form-control" required onChange={e => setAirlineName(e.target.value)} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Source</label>
            <input type="text" className="form-control" required onChange={e => setSource(e.target.value)} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Destination</label>
            <input type="text" className="form-control" required onChange={e => setDestination(e.target.value)} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Departure Time</label>
            <input type="time" className="form-control" required onChange={e => setDepartureLocalTime(e.target.value)} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Arrival Time</label>
            <input type="time" className="form-control" required onChange={e => setArrivalLocalTime(e.target.value)} />
          </div>

          <div className="col-md-4">
            <label className="form-label">Ticket Price (₹)</label>
            <input type="number" step="0.01" className="form-control" required onChange={e => setTicketPrice(e.target.value)} />
          </div>

          <div className="col-md-4">
            <label className="form-label">Total Seats</label>
            <input type="number" className="form-control" required onChange={e => setTotalSeats(e.target.value)} />
          </div>

          {/* Available seats removed, auto-calculated */}
        </div>

        <div className="mt-4">
          <button type="submit" className="btn btn-primary">Submit</button>
          &nbsp;&nbsp;
          <button type="reset" className="btn btn-secondary">Reset</button>
        </div>
      </form>
    </div>
  );
}
