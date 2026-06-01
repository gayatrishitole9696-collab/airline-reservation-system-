import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./Airadminnavbar";

export default function Viewbookings() {
  const API = process.env.REACT_APP_API_URL || "http://localhost:8080";

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Format LocalDateTime for display
  const formatDateTime = (dt) => {
    if (!dt) return "-";
    // Replace "T" with space for parsing
    return new Date(dt.replace("T", " ")).toLocaleString();
  };

  // Load all bookings with their payment info
  const loadAllBookings = async () => {
    try {
      setLoading(true);

      // Step 1: Get all bookings
      const bookingRes = await axios.get(`${API}/booking/getall`);
      const bookingsData = bookingRes.data;

      // Step 2: For each booking, get its payment
      const updatedBookings = await Promise.all(
        bookingsData.map(async (b) => {
          try {
            const paymentRes = await axios.get(`${API}/payment/getbybooking/${b.bookingId}`);
            const payment = paymentRes.data || {};
            return {
              ...b,
              paymentStatus: payment.paymentStatus || "PENDING",
              paymentMode: payment.paymentMode || "-",
            };
          } catch {
            return {
              ...b,
              paymentStatus: "PENDING",
              paymentMode: "-",
            };
          }
        })
      );

      setBookings(updatedBookings);
      setError(updatedBookings.length === 0 ? "No bookings found" : "");
    } catch (err) {
      console.error(err);
      setBookings([]);
      setError("Error fetching bookings from server");
    } finally {
      setLoading(false);
    }
  };

  // Cancel a booking (only if not paid)
  const cancelBooking = async (id, paymentStatus) => {
    if (paymentStatus === "SUCCESS") {
      alert("Cannot cancel a booking that is already paid!");
      return;
    }

    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await axios.delete(`${API}/booking/cancel/${id}`);
      alert("Booking cancelled successfully!");
      loadAllBookings();
    } catch {
      alert("Failed to cancel booking");
    }
  };

  useEffect(() => {
    loadAllBookings();
  }, []);

  return (
    <div>
      <AdminNavbar />

      <div className="container mt-4">
        <h2 className="text-center mb-4 bg-info text-white p-2 rounded">
          All Bookings
        </h2>

        {loading && <div className="text-center">Loading bookings...</div>}
        {error && !loading && <div className="alert alert-warning text-center">{error}</div>}

        {!loading && bookings.length > 0 && (
          <div className="table-responsive shadow">
            <table className="table table-bordered table-striped">
              <thead className="table-dark text-center">
                <tr>
                  <th>Booking ID</th>
                  <th>Passenger ID</th>
                  <th>Flight ID</th>
                  <th>Seat Number</th>
                  <th>Booking Date & Time</th>
                  <th>Payment Status</th>
                  <th>Payment Mode</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {bookings.map((b) => (
                  <tr key={b.bookingId}>
                    <td>{b.bookingId}</td>
                    <td>{b.passengerId}</td>
                    <td>{b.flightId}</td>
                    <td>{b.seatNumber || "-"}</td>
                    <td>{formatDateTime(b.bookingDateTime)}</td>
                    <td>{b.paymentStatus}</td>
                    <td>{b.paymentMode}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => cancelBooking(b.bookingId, b.paymentStatus)}
                        disabled={b.paymentStatus === "SUCCESS"}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
