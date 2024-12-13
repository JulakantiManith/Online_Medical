import React from 'react';
import './PatientPage.css'; // Update CSS filename accordingly

const DoctorPatientPage = () => {
  return (
    <div className="doctor-patient-page-container">
      <header className="doctor-header">
        <h1>Patient Management</h1>
        <p>Manage patient information and appointments efficiently.</p>
      </header>

      <section className="patients-section">
        <h2>Patient Appointments</h2>
        <div className="patient-card">
          <p><strong>Patient Name:</strong> Alice Johnson</p>
          <p><strong>Appointment Date:</strong> Oct 30, 2024</p>
          <p><strong>Time:</strong> 10:00 AM</p>
          <button className="view-details-btn">View Details</button>
          <button className="update-status-btn">Update Status</button>
        </div>
        <div className="patient-card">
          <p><strong>Patient Name:</strong> Bob Smith</p>
          <p><strong>Appointment Date:</strong> Nov 5, 2024</p>
          <p><strong>Time:</strong> 2:00 PM</p>
          <button className="view-details-btn">View Details</button>
          <button className="update-status-btn">Update Status</button>
        </div>
        {/* Add more patient appointments as needed */}
      </section>

      <section className="patient-info-section">
        <h2>All Patients</h2>
        <div className="info-card">
          <p><strong>Name:</strong> Alice Johnson</p>
          <p><strong>Email:</strong> alice.johnson@example.com</p>
          <p><strong>Phone:</strong> (123) 456-7890</p>
          <button className="edit-info-btn">Edit Information</button>
          <button className="delete-patient-btn">Delete Patient</button>
        </div>
        <div className="info-card">
          <p><strong>Name:</strong> Bob Smith</p>
          <p><strong>Email:</strong> bob.smith@example.com</p>
          <p><strong>Phone:</strong> (987) 654-3210</p>
          <button className="edit-info-btn">Edit Information</button>
          <button className="delete-patient-btn">Delete Patient</button>
        </div>
        {/* Add more patient records as needed */}
      </section>
    </div>
  );
};

export default DoctorPatientPage;
