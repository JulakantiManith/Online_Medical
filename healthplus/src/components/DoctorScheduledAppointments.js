import React, { useState, useEffect } from 'react';
import HomeNavbar from './HomeNavbar'; // Import your extracted navbar
import './DoctorScheduledAppointments.css'; // Add styling for the doctor page

function DoctorScheduledAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating fetching appointments (replace with an API call)
    const fetchAppointments = () => {
      setLoading(false);
      setAppointments([
        {
          id: 1,
          patientName: 'John Doe',
          appointmentTime: '2024-11-25 10:00 AM',
          reason: 'General Checkup',
          status: 'Pending',
        },
        {
          id: 2,
          patientName: 'Jane Smith',
          appointmentTime: '2024-11-25 11:00 AM',
          reason: 'Dental Checkup',
          status: 'Pending',
        },
      ]);
    };

    fetchAppointments();
  }, []);

  const handleInputChange = (e, id, field) => {
    const value = e.target.value;
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id ? { ...appointment, [field]: value } : appointment
      )
    );
  };

  const saveAppointment = (id) => {
    const updatedAppointment = appointments.find((appointment) => appointment.id === id);
    console.log('Saving updated appointment:', updatedAppointment);

    // Simulate saving the data (replace with an API call)
    alert(`Appointment with ID ${id} has been updated!`);
  };

  return (
    <div className="doctor-scheduled-appointments">
      {/* Include Navbar */}
      <HomeNavbar />

      <h2>Manage Scheduled Appointments</h2>
      {loading ? (
        <p>Loading appointments...</p>
      ) : appointments.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Appointment Time</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.patientName}</td>
                <td>
                  <input
                    type="datetime-local"
                    value={appointment.appointmentTime}
                    onChange={(e) => handleInputChange(e, appointment.id, 'appointmentTime')}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={appointment.reason}
                    onChange={(e) => handleInputChange(e, appointment.id, 'reason')}
                  />
                </td>
                <td>
                  <select
                    value={appointment.status}
                    onChange={(e) => handleInputChange(e, appointment.id, 'status')}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => saveAppointment(appointment.id)}>Save</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No appointments to manage.</p>
      )}
    </div>
  );
}

export default DoctorScheduledAppointments;
