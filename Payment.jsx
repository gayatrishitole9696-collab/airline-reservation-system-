import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const [bookingId, setBookingId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("CARD");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const API = process.env.REACT_APP_API_URL || "http://localhost:8080";

  useEffect(() => {
    if (location.state?.bookingId) setBookingId(location.state.bookingId);
    if (location.state?.amount) setAmount(location.state.amount);
  }, [location.state]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!bookingId || !amount) {
      setError("Booking ID or amount missing");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API}/payment/pay`, {
        bookingId: Number(bookingId),
        paymentMode: paymentMode,
        paymentStatus: "SUCCESS"
      });

      setSuccess(`✅ Payment successful! Booking updated`);
      setTimeout(() => navigate("/mybookings"), 1500);
    } catch (err) {
      console.error(err);
      setError("❌ Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <h2 className="text-center text-primary mb-4">💳 Payment</h2>

      <form onSubmit={handlePayment}>
        <div className="mb-3">
          <label className="form-label">Booking ID</label>
          <input type="number" className="form-control" value={bookingId} disabled />
        </div>

        <div className="mb-3">
          <label className="form-label">Amount (₹)</label>
          <input type="number" className="form-control" value={amount} disabled />
        </div>

        <div className="mb-3">
          <label className="form-label">Payment Mode</label>
          <select className="form-control" value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
            <option value="CARD">CARD</option>
            <option value="UPI">UPI</option>
          </select>
        </div>

        <button className="btn btn-success w-100" disabled={loading}>
          {loading ? "Processing..." : `Pay ₹ ${amount}`}
        </button>
      </form>

      {success && <div className="alert alert-success mt-3">{success}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}
