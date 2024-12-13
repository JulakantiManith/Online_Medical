import React from 'react';
import './PrescriptionDetails.css';

const PrescriptionDetails = () => {
  // Sample data for the prescription details
  const prescription = {
    doctorName: 'Dr. John Smith',
    hospitalName: 'Sunshine Medical Center',
    patientName: 'Alex Johnson',
    date: '2024-12-08',
    medication: [
      { name: 'Paracetamol', dosage: '500mg', instructions: 'Take 1 tablet every 6 hours' },
      { name: 'Amoxicillin', dosage: '250mg', instructions: 'Take 1 capsule twice a day' },
    ],
  };

  return (
    <div className="prescription-container">
      <h1>Prescription Details</h1>
      <div className="prescription-info">
        <p><strong>Doctor:</strong> {prescription.doctorName}</p>
        <p><strong>Hospital:</strong> {prescription.hospitalName}</p>
        <p><strong>Patient:</strong> {prescription.patientName}</p>
        <p><strong>Date:</strong> {prescription.date}</p>
      </div>
      <div className="medications">
        <h2>Medications</h2>
        <ul>
          {prescription.medication.map((med, index) => (
            <li key={index}>
              <strong>Name:</strong> {med.name} | <strong>Dosage:</strong> {med.dosage} | <strong>Instructions:</strong> {med.instructions}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PrescriptionDetails;
