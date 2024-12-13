import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PrescriptionView.css"; // Custom styling

function PrescriptionView() {
  const { bookingId } = useParams();
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/prescriptions/${bookingId}`);
        console.log("Response data:", response.data); // Debug response
        setPrescriptions(response.data); // Adjust based on the response structure
        setLoading(false);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, [bookingId]);

  return (
    <div className="prescription-view">
      <h2>Prescription Details for Booking ID: {bookingId}</h2>
      {loading ? (
        <p>Loading prescriptions...</p>
      ) : prescriptions.length > 0 ? (
        <table className="prescription-table">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Dosage</th>
              <th>Frequency</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription, index) => (
              <tr key={index}>
                <td>{prescription.medicineName}</td>
                <td>{prescription.dosage}</td>
                <td>{prescription.frequency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No prescriptions available for this booking.</p>
      )}
    </div>
  );
}

export default PrescriptionView;
