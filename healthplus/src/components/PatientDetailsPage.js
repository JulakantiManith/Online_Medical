import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorNavbar from '../components/Doctornavbar';
import LoadingSpinner from './LoadingSpinner';
import './Viewbooking.css';

function PatientDetailsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingSpinnerVisible, setIsLoadingSpinnerVisible] = useState(false);
  const [spinnerMessage, setSpinnerMessage] = useState('');
  const [hiddenButtons, setHiddenButtons] = useState(() => {
    const savedState = localStorage.getItem('hiddenButtons');
    return savedState ? JSON.parse(savedState) : {};
  });
  const [ setMeetingEnded] = useState({});
  
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/bookings');
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleJoinSession = (bookingId) => {
    setIsLoadingSpinnerVisible(true);
    setSpinnerMessage('Joining session...');
    setTimeout(() => {
      setIsLoadingSpinnerVisible(false);

      // Redirect to the Google Meet link
      window.location.href = 'https://meet.google.com/wuh-homn-mzb';

      // Update hidden buttons state
      setHiddenButtons((prevState) => {
        const updatedState = { ...prevState, [bookingId]: true };
        localStorage.setItem('hiddenButtons', JSON.stringify(updatedState));
        return updatedState;
      });

      // Delay to show the "Meeting Ended" message
      setTimeout(() => {
        setMeetingEnded((prevState) => ({ ...prevState, [bookingId]: true }));
      }, 5000); // 5 seconds delay
    }, 4000); // 4 seconds delay for loading spinner
  };

  return (
    <div>
      <DoctorNavbar />
      {isLoadingSpinnerVisible && (
        <div className="loading-overlay">
          <LoadingSpinner message={spinnerMessage} />
        </div>
      )}
      <div className="bookings-container">
        <h2 className="bookings-heading">Patient Details</h2>
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
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{new Date(booking.appointmentDateTime).toLocaleString()}</td>
                  <td>{booking.doctorSpecialty}</td>
                  <td>{booking.userName}</td>
                  <td>{booking.reason}</td>
                  <td>{booking.status}</td>
                  <td>
                    {hiddenButtons[booking.id] ? (
                      <span>Meeting Ended</span>
                    ) : (
                      booking.status === 'Accepted' && (
                        <button onClick={() => handleJoinSession(booking.id)}>
                          Join Session
                        </button>
                      )
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
    </div>
  );
}

export default PatientDetailsPage;
  