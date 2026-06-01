import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Updatebooking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState({
    passengerId: "",
    flightId: "",
    seatNumber: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Load booking details
  useEffect(() => {
    axios
      .get(`http://localhost:8080/booking/get/${id}`)
      .then((res) => {
        setBooking(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load booking.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/booking/update/${id}`, booking);
      setSuccess("✅ Booking updated successfully!");
      setTimeout(() => {
        navigate("/mybookings");
      }, 1200);
    } catch (err) {
      console.error(err);
      setError("Update failed.");
    }
  };

  if (loading) return <h4 className="text-center mt-5">Loading booking...</h4>;

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center text-warning mb-4">✏️ Update Booking</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleUpdate}>
        <input
          type="number"
          name="passengerId"
          className="form-control mb-3"
          value={booking.passengerId}
          disabled
        />

        <input
          type="number"
          name="flightId"
          className="form-control mb-3"
          value={booking.flightId}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="seatNumber"
          className="form-control mb-3"
          value={booking.seatNumber}
          onChange={handleChange}
          required
        />

        <button className="btn btn-warning w-100">Update Booking</button>
      </form>
    </div>
  );
}
