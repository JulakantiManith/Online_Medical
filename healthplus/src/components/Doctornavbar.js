import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import './DoctorNavbar.css';

function DoctorNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any session or authentication data here if necessary
    navigate('/doctorlogin'); // Redirect to login page on logout
  };

  return (
    <nav className="doc-navbar-container">
      <ul className="doc-navbar-links">
        <li>
          <Link to="/DoctorDash">Home</Link>
        </li>
        <li>
          <Link to="/AppointmentsPage">Appointments</Link> {/* Link to the Appointments page */}
        </li>
        <li>
          <Link to="/patientdetails">Patients</Link>
        </li>
        <li>
        <Link to="/PrescriptionsPage">Prescriptions</Link>
        </li>
        <li>
          <button onClick={handleLogout} className="doc-navbar-logout-button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default DoctorNavbar;
