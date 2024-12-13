import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomeNavbar from "./HomeNavbar";
import './Bookinform.css';

function BookingForm() {
    const [appointmentDateTime, setAppointmentDateTime] = useState("");
    const [doctorSpecialty, setDoctorSpecialty] = useState("");
    const [userName, setUserName] = useState("");
    const [reason, setReason] = useState("");
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const specialties = [
        "General Physician",
        "Cardiologist",
        "Dermatologist",
        "Orthopedist",
        "Pediatrician",
        "Neurologist",
        "Gynecologist",
        "Psychiatrist",
    ];

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!file) {
            alert("Please upload a file.");
            return;
        }
    
        const formData = new FormData();
        formData.append("appointmentDateTime", appointmentDateTime);
        formData.append("doctorSpecialty", doctorSpecialty);
        formData.append("userName", userName);
        formData.append("reason", reason);
        formData.append("status", "Pending");
        formData.append("image", file);
    
        // Log FormData for debugging
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
    
        try {
            const response = await axios.post("http://localhost:8080/api/bookings", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
    
            if (response.status === 200) {
                alert("Appointment booked successfully!");
                navigate("/payment", { state: { bookingId: response.data.id } });
            } else {
                alert("Failed to book the appointment. Status: " + response.status);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Something went wrong. Please try again.");
        }
    };
    
    return (
        <div>
            <HomeNavbar />
            <div className="form-container">
                <h2>Book an Appointment</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Date and Time:
                        <input
                            type="datetime-local"
                            value={appointmentDateTime}
                            onChange={(e) => setAppointmentDateTime(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Doctor Specialty:
                        <select
                            value={doctorSpecialty}
                            onChange={(e) => setDoctorSpecialty(e.target.value)}
                            required
                        >
                            <option value="" disabled>
                                Select a specialty
                            </option>
                            {specialties.map((specialty, index) => (
                                <option key={index} value={specialty}>
                                    {specialty}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Patient Name:
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Reason:
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Upload File:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                        />
                    </label>
                    <button type="submit">Proceed to Payment</button>
                </form>
            </div>
        </div>
    );
}

export default BookingForm;
