import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Airadminnavbar from "./Airadminnavbar";
import Passengernavbar from "./Passengernavbar";

export default function Bookticket({ passenger }) {
  const [flightId, setFlightId] = useState("");
  const [seatNumber, setSeatNumber] = useState("");
  const [passengerId, setPassengerId] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [newBookingId, setNewBookingId] = useState(null);
  const [ticketPrice, setTicketPrice] = useState(null);
  const [flightValid, setFlightValid] = useState(true);
  const [seatsAvailable, setSeatsAvailable] = useState(true);

  const navigate = useNavigate();

  // ✅ Get passenger ID safely
  useEffect(() => {
    let pid = passenger?.id || passenger?.passengerId || passenger?.pid || "";
    if (!pid) {
      const stored = localStorage.getItem("passenger");
      if (stored) {
        try {
          const obj = JSON.parse(stored);
          pid = obj?.id || obj?.passengerId || obj?.pid || "";
        } catch {}
      }
    }
    setPassengerId(pid);
  }, [passenger]);

  // ⭐ Fetch flight price + validate flight + check seats
  const fetchFlightPrice = async (fid) => {
    if (!fid) {
      setTicketPrice(null);
      setFlightValid(true);
      setSeatsAvailable(true);
      return;
    }

    try {
      const res = await axios.get(`http://localhost:8080/findbyfid?id=${fid}`);
      if (res.data && res.data.ticketPrice != null) {
        setTicketPrice(res.data.ticketPrice);
        setFlightValid(true);
        setSeatsAvailable(res.data.availableSeats > 0);
      } else {
        setTicketPrice(null);
        setFlightValid(false);
        setSeatsAvailable(false);
      }
    } catch (err) {
      console.error("Error fetching flight:", err);
      setTicketPrice(null);
      setFlightValid(false);
      setSeatsAvailable(false);
    }
  };

  // 🔹 Book ticket
  const handleBooking = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setNewBookingId(null);

    if (!passengerId || !flightId || !seatNumber || !bookingDate || !bookingTime) {
      setError("All fields are required.");
      return;
    }

    if (!flightValid) {
      alert("❌ Invalid Flight ID. This flight does not exist.");
      return;
    }

    if (!seatsAvailable) {
      alert("❌ No seats available on this flight.");
      return;
    }

    try {
      setLoading(true);

      // ✅ FIXED HERE (space instead of T)
      const bookingDateTime = `${bookingDate} ${bookingTime}:00`;

      const res = await axios.post("http://localhost:8080/booking/book", {
        passengerId: Number(passengerId),
        flightId: Number(flightId),
        seatNumber: seatNumber.trim(),
        bookingDateTime,
      });

      if (res.data && res.data.bookingId) {
        setSuccess(`✈️ Ticket booked successfully! Booking ID: ${res.data.bookingId}`);
        setNewBookingId(res.data.bookingId);
        setTicketPrice(res.data.ticketPrice || ticketPrice);
      } else {
        setError("Booking failed: Invalid response from server.");
      }

    } catch (err) {
      console.error("Booking error:", err);
      if (err.response) setError(err.response.data?.message || "Booking failed from server.");
      else setError("Backend server not responding.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Go to payment
  const goToPayment = () => {
    if (!newBookingId || !ticketPrice) {
      alert("Booking ID or amount missing!");
      return;
    }

    navigate("/payment", {
      state: {
        bookingId: newBookingId,
        amount: ticketPrice,
      },
    });
  };

  return (
    <div>
      <Passengernavbar />  
   
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center text-primary mb-4">✈️ Book Ticket</h2>

      {passengerId && (
        <div className="alert alert-info text-center">
          Logged in Passenger ID: <b>{passengerId}</b>
        </div>
      )}

      <form onSubmit={handleBooking}>
        <input
          type="number"
          className="form-control mb-3"
          placeholder="Passenger ID"
          value={passengerId}
          onChange={(e) => setPassengerId(e.target.value)}
          required
        />

        <input
          type="number"
          className="form-control mb-1"
          placeholder="Flight ID"
          value={flightId}
          onChange={(e) => {
            setFlightId(e.target.value);
            fetchFlightPrice(e.target.value);
          }}
          required
        />

        {!flightValid && (
          <div className="text-danger mb-2">
            ❌ Flight ID not found. Please enter a valid flight.
          </div>
        )}

        {!seatsAvailable && flightValid && (
          <div className="text-danger mb-2">
            ❌ No seats available on this flight.
          </div>
        )}

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Seat Number (ex: A1)"
          value={seatNumber}
          onChange={(e) => setSeatNumber(e.target.value)}
          required
        />

        <input
          type="date"
          className="form-control mb-3"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          required
        />

        <input
          type="time"
          className="form-control mb-3"
          value={bookingTime}
          onChange={(e) => setBookingTime(e.target.value)}
          required
        />

        {ticketPrice !== null && flightValid && seatsAvailable && (
          <div className="alert alert-warning text-center">
            Ticket Price: ₹ <b>{ticketPrice}</b>
          </div>
        )}

        <button className="btn btn-success w-100" disabled={loading}>
          {loading ? "Booking..." : "Book Ticket"}
        </button>
      </form>

      {success && <div className="alert alert-success mt-3">{success}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {newBookingId && ticketPrice !== null && (
        <button className="btn btn-primary w-100 mt-3" onClick={goToPayment}>
          Proceed to Payment 💳
        </button>
      )}
    </div>
    </div>
  );
}
