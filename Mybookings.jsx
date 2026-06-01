import React, { useEffect, useState } from "react";
import axios from "axios";
import Passengernavbar from "./Passengernavbar";

export default function Mybookings() {
  const [bookings, setBookings] = useState([]);
  const [passengerId, setPassengerId] = useState("");
  const [tempPid, setTempPid] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [editId, setEditId] = useState(null);
  const [newSeat, setNewSeat] = useState("");
  const [newFlightId, setNewFlightId] = useState("");
  const [newBookingDateTime, setNewBookingDateTime] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("passenger");
    if (stored) {
      try {
        const obj = JSON.parse(stored);
        const pid = obj?.id || obj?.passengerId || obj?.pid;
        if (pid) {
          setPassengerId(pid);
          fetchBookings(pid);
        }
      } catch {}
    }
  }, []);

  const fetchBookings = async (pid) => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`http://localhost:8080/booking/mybookings/${pid}`);
      setBookings(res.data);
    } catch {
      setError("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  const handleManualLoad = () => {
    if (!tempPid) return alert("Enter passenger ID");
    setPassengerId(tempPid);
    fetchBookings(tempPid);
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this ticket?")) return;
    try {
      await axios.delete(`http://localhost:8080/booking/cancel/${id}`);
      setBookings(bookings.filter((b) => b.bookingId !== id));
    } catch {
      alert("Cancel failed");
    }
  };

  const updateBooking = async (id) => {
    if (!newFlightId || !newSeat || !newBookingDateTime)
      return alert("All fields are required");

    try {
      await axios.put(`http://localhost:8080/booking/update/${id}`, {
        flightId: Number(newFlightId),
        seatNumber: newSeat,
        bookingDateTime: newBookingDateTime, // MUST be full ISO string
      });

      setEditId(null);
      setNewFlightId("");
      setNewSeat("");
      setNewBookingDateTime("");

      fetchBookings(passengerId);
    } catch {
      alert("Update failed");
    }
  };

  const formatBookingDateTime = (dtString) => {
    if (!dtString) return "N/A";
    try {
      const dt = new Date(dtString);
      return dt.toLocaleString(); // human readable
    } catch {
      return "N/A";
    }
  };

  return (
    <div>
      <Passengernavbar />
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-3">✈️ My Bookings</h2>

      {!passengerId && (
        <div className="card p-3 mb-4">
          <h5>Enter Passenger ID</h5>
          <input
            className="form-control mb-2"
            placeholder="Passenger ID"
            value={tempPid}
            onChange={(e) => setTempPid(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleManualLoad}>
            Load My Bookings
          </button>
        </div>
      )}

      {loading && <h5 className="text-center">Loading bookings...</h5>}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      {bookings.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered table-striped text-center">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Flight</th>
                <th>Seat</th>
                <th>Date & Time</th>
                <th>Update</th>
                <th>Cancel</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => {
                const bookingDateTime = b.bookingDateTime || b.bookingDateTime;
                const displayDateTime = formatBookingDateTime(bookingDateTime);

                return (
                  <tr key={b.bookingId}>
                    <td>{b.bookingId}</td>

                    <td>
                      {editId === b.bookingId ? (
                        <input
                          className="form-control"
                          value={newFlightId}
                          onChange={(e) => setNewFlightId(e.target.value)}
                        />
                      ) : (
                        b.flightId
                      )}
                    </td>

                    <td>
                      {editId === b.bookingId ? (
                        <input
                          className="form-control"
                          value={newSeat}
                          onChange={(e) => setNewSeat(e.target.value)}
                        />
                      ) : (
                        b.seatNumber || b.seat
                      )}
                    </td>

                    <td>
                      {editId === b.bookingId ? (
                        <input
                          type="datetime-local"
                          className="form-control"
                          value={newBookingDateTime}
                          onChange={(e) => setNewBookingDateTime(e.target.value)}
                        />
                      ) : (
                        displayDateTime
                      )}
                    </td>

                    <td>
                      {editId === b.bookingId ? (
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => updateBooking(b.bookingId)}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => {
                            setEditId(b.bookingId);
                            setNewFlightId(String(b.flightId || ""));
                            setNewSeat(String(b.seatNumber || b.seat || ""));
                            setNewBookingDateTime(
                              bookingDateTime
                                ? new Date(bookingDateTime)
                                    .toISOString()
                                    .slice(0, 16)
                                : ""
                            );
                          }}
                        >
                          Update
                        </button>
                      )}
                    </td>

                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => cancelBooking(b.bookingId)}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  );
}
