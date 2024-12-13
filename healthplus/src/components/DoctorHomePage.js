import React from 'react';
import './DoctorHomePage.css';

function DoctorHomePage() {
  return (
    <div className="doctor-home-page">
      <header className="doctor-header">
        <h1>Welcome, Dr. John Doe</h1>
        <p>Here's a summary of your recent activity and upcoming appointments.</p>
      </header>

      <section className="appointments-section">
        <h2>Upcoming Appointments</h2>
        <div className="appointment">
          <p><strong>Patient:</strong> Jane Smith</p>
          <p><strong>Date:</strong> Oct 30, 2024</p>
          <p><strong>Time:</strong> 10:00 AM</p>
          <button className="view-details-btn">View Details</button>
        </div>
        <div className="appointment">
          <p><strong>Patient:</strong> Tom Brown</p>
          <p><strong>Date:</strong> Oct 30, 2024</p>
          <p><strong>Time:</strong> 11:30 AM</p>
          <button className="view-details-btn">View Details</button>
        </div>
        {/* Add more appointments as needed */}
      </section>

      <section className="recent-patients-section">
        <h2>Recent Patient Activity</h2>
        <div className="patient-activity">
          <p><strong>Patient:</strong> Sarah Connor</p>
          <p><strong>Last Visit:</strong> Oct 20, 2024</p>
          <button className="view-history-btn">View History</button>
        </div>
        <div className="patient-activity">
          <p><strong>Patient:</strong> Michael Thompson</p>
          <p><strong>Last Visit:</strong> Oct 18, 2024</p>
          <button className="view-history-btn">View History</button>
        </div>
        {/* Add more patient activities as needed */}
      </section>

      <section className="navigation-section">
        <h2>Navigation</h2>
        <div className="navigation-options">
          <button onClick={() => alert('Navigate to Patient List')}>Patient List</button>
          <button onClick={() => alert('Navigate to Reports')}>Reports</button>
          <button onClick={() => alert('Navigate to Settings')}>Settings</button>
          <button onClick={() => alert('Logout')}>Logout</button>
        </div>
      </section>
    </div>
  );
}

export default DoctorHomePage;
