import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import HomeNavbar from "./HomeNavbar";
import LoadingSpinner from "./LoadingSpinner"; // Import the new LoadingSpinner component
import "./Viewbooking.css"; // External CSS for styling

function BookingsList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingSpinnerVisible, setIsLoadingSpinnerVisible] = useState(false);
  const [spinnerMessage, setSpinnerMessage] = useState(''); // State for the spinner message
  const [hiddenButtons, setHiddenButtons] = useState(() => {
    // Retrieve hidden buttons state from local storage
    const savedState = localStorage.getItem('hiddenButtons');
    return savedState ? JSON.parse(savedState) : {};
  });

  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Fetch bookings on component load
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/bookings");
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  const handleJoinSession = (bookingId) => {
    setIsLoadingSpinnerVisible(true);
    setSpinnerMessage('Joining session...');
    setTimeout(() => {
      setIsLoadingSpinnerVisible(false);

      // Redirect to the specific Google Meet link
      window.location.href = "https://meet.google.com/bcf-iuwx-tub";

      // Update hidden buttons state and persist it to local storage
      setHiddenButtons((prevState) => {
        const updatedState = { ...prevState, [bookingId]: true };
        localStorage.setItem('hiddenButtons', JSON.stringify(updatedState)); // Save to local storage
        return updatedState;
      });
    }, 4000); // 4 seconds delay for loading
  };

  const handleViewPrescription = (bookingId, userName) => {
    // Navigate to the prescription details page with the patient name
    navigate(`/details/${userName}`);
  };

  return (
    <div>
      {/* Include Navbar */}
      <HomeNavbar />

      {/* Display loading spinner and message when isLoadingSpinnerVisible is true */}
      {isLoadingSpinnerVisible && (
        <div className="loading-overlay">
          <LoadingSpinner message={spinnerMessage} /> {/* Pass the custom message */}
        </div>
      )}

      {/* Bookings Content */}
      <div className="bookings-container">
        <h2 className="bookings-heading">All Bookings</h2>
        {loading ? (
          <p>Loading bookings...</p>
        ) : bookings.length > 0 ? (
          <table className="bookings-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date & Time</th>
                <th>Specialty</th>
                <th>Patient Name</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
                <th>Prescription</th> {/* New column for prescription link */}
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.appointmentDateTime}</td>
                  <td>{booking.doctorSpecialty}</td>
                  <td>{booking.userName}</td>
                  <td>{booking.reason}</td>
                  <td>{booking.status}</td>
                  <td>
                    {hiddenButtons[booking.id] ? (
                      <span>Meeting Ended</span>
                    ) : (
                      booking.status === "Accepted" && (
                        <button onClick={() => handleJoinSession(booking.id)}>
                          Join Session
                        </button>
                      )
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleViewPrescription(booking.id, booking.userName)}>
                      View Prescription
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
}

export default BookingsList;
 