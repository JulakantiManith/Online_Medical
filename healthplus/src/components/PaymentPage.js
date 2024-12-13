import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import './PaymentPage.css';
import paymentImage from "../images/qr.jpg"; // Replace with the actual path to your image

function PaymentPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { appointmentData } = location.state || {};

    if (!appointmentData) {
        return <p>Error: No appointment data found. Please try again.</p>;
    }

    const handlePaymentSuccess = async () => {
        try {
            // Simulate booking the appointment after payment
            await axios.post("http://localhost:8080/api/bookings", appointmentData, {
                headers: { "Content-Type": "application/json" },
            });
            alert("Payment successful! Appointment booked.");
            navigate("/home"); // Navigate to a confirmation page
        } catch (error) {
            console.error("Error booking appointment:", error);
            alert("Failed to book appointment after payment. Try again later.");
        }
    };

    const handlePaymentFailure = () => {
        alert("Payment failed. Please try again.");
        navigate("/appointment"); // Redirect back to the booking form
    };

    return (
        <div className="payment-container">
            <h2>Payment Page</h2>
            <img src={paymentImage} alt="Payment illustration" className="payment-image" />
            <p>Simulate the payment process for your appointment.</p>
            <div>
                <button onClick={handlePaymentSuccess}>Simulate Successful Payment</button>
                <button onClick={handlePaymentFailure}>Simulate Payment Failure</button>
            </div>
        </div>
    );
}

export default PaymentPage;
