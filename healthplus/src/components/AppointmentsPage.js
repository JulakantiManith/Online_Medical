import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AppointmentsPage.css";
import DoctorNavbar from "./Doctornavbar";

function DoctorResponse() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/api/bookings");
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to load bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      if (status === "Accepted") {
        await axios.put(`http://localhost:8080/api/bookings/${id}`, { status });
        setBookings((prev) =>
          prev.map((booking) =>
            booking.id === id ? { ...booking, status } : booking
          )
        );
      } else if (status === "Rejected") {
        const confirmDelete = window.confirm(
          "Are you sure you want to reject and delete this booking?"
        );
        if (confirmDelete) {
          await axios.delete(`http://localhost:8080/api/bookings/${id}`);
          setBookings((prev) => prev.filter((booking) => booking.id !== id));
        }
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setError("Failed to update booking status. Please try again later.");
    }
  };

  return (
    <div className="doctor-response-container">
      <DoctorNavbar />
      <h2>Manage Appointments</h2>
      {loading ? (
        <p>Loading bookings...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : bookings.length > 0 ? (
        <table className="doctor-response-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient Name</th>
              <th>Doctor Specialty</th>
              <th>Reason</th>
              <th>Appointment Date & Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.userName}</td>
                <td>{booking.doctorSpecialty}</td>
                <td>{booking.reason}</td>
                <td>{new Date(booking.appointmentDateTime).toLocaleString()}</td>
                <td>
                  <span className={`status-badge ${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </span>
                </td>
                <td>
                  {booking.status === "Pending" && (
                    <>
                      <button
                        className="accept-btn"
                        onClick={() => updateStatus(booking.id, "Accepted")}
                      >
                        Accept
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => updateStatus(booking.id, "Rejected")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {booking.status === "Accepted" && (
                    <span className="status-badge accepted">Accepted</span>
                  )}
                  {booking.status === "Rejected" && (
                    <span className="status-badge rejected">Rejected</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
}

export default DoctorResponse;
