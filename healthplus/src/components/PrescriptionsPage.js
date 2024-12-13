import React, { useEffect, useState } from "react";
import axios from "axios";
import DoctorNavbar from "../components/Doctornavbar";
import "./PrescriptionsPage.css";

function PrescriptionsPage() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [medicines, setMedicines] = useState([{ name: "", dosage: "", frequency: "" }]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
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
  }, []);

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index][field] = value;
    setMedicines(updatedMedicines);
  };

  const addMedicineField = () => {
    setMedicines([...medicines, { name: "", dosage: "", frequency: "" }]);
  };

  const removeMedicineField = (index) => {
    const updatedMedicines = medicines.filter((_, i) => i !== index);
    setMedicines(updatedMedicines);
  };

  const handlePrescriptionSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBooking) {
      setMessage("Please select a booking.");
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/prescriptions", {
        bookingId: selectedBooking.id,
        medicines,
      });
      setMessage("Prescription added successfully!");
      setMedicines([{ name: "", dosage: "", frequency: "" }]);
    } catch (error) {
      console.error("Error saving prescription:", error);
      setMessage("Failed to add prescription.");
    }
  };

  return (
    <div>
      <DoctorNavbar />
      <div className="prescriptions-container">
        <h2>Prescriptions</h2>
        {loading ? (
          <p>Loading bookings...</p>
        ) : (
          <div>
            <label htmlFor="booking">Select Booking:</label>
            <select
              id="booking"
              value={selectedBooking ? selectedBooking.id : ""}
              onChange={(e) =>
                setSelectedBooking(
                  bookings.find((b) => b.id === parseInt(e.target.value))
                )
              }
            >
              <option value="">-- Select a Booking --</option>
              {bookings.map((booking) => (
                <option key={booking.id} value={booking.id}>
                  {`${booking.userName} - ${new Date(
                    booking.appointmentDateTime
                  ).toLocaleString()}`}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedBooking && (
          <form onSubmit={handlePrescriptionSubmit} className="prescription-form">
            <h3>Add Medicines for {selectedBooking.userName}</h3>
            {medicines.map((medicine, index) => (
              <div key={index} className="medicine-row">
                <input
                  type="text"
                  placeholder="Medicine Name"
                  value={medicine.name}
                  onChange={(e) => handleMedicineChange(index, "name", e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Dosage (e.g., 500mg)"
                  value={medicine.dosage}
                  onChange={(e) => handleMedicineChange(index, "dosage", e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Frequency (e.g., 3 times a day)"
                  value={medicine.frequency}
                  onChange={(e) => handleMedicineChange(index, "frequency", e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => removeMedicineField(index)}
                  disabled={medicines.length === 1}
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addMedicineField}>
              Add Another Medicine
            </button>
            <button type="submit">Save Prescription</button>
          </form>
        )}
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default PrescriptionsPage;
