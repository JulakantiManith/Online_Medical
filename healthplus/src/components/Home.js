import React, { useEffect, useState } from "react";
import HomeNavbar from "./HomeNavbar";
import Doctor from "../images/doctor-picture1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Home.css";

// Custom component for displaying the welcome message
function WelcomeMessage({ name }) {
  return (
    <div className="welcome-message">
      <h2>Welcome, {name}!</h2>
    </div>
  );
}

function HealthcareHome() {
  const [userName, setUserName] = useState(""); // State for username
  const navigate = useNavigate();
  const location = useLocation(); // Move the useLocation hook inside the component

  // Get the username from navigation state or fetch dynamically
  useEffect(() => {
    if (location.state?.userName) {
      // If userName is passed via state, use it
      setUserName(location.state.userName);
    } else {
      // Otherwise, fetch it from the backend
      const fetchUserName = async () => {
        try {
          const email = localStorage.getItem("userEmail"); // Retrieve email from localStorage
          if (!email) return;

          const response = await axios.get(`http://localhost:8080/api/users/${email}`);
          const { name } = response.data; // Extract username from the response
          setUserName(name);
        } catch (error) {
          console.error("Error fetching username:", error);
          setUserName(""); // Fallback to Guest if an error occurs
        }
      };

      fetchUserName();
    }
  }, [location.state]);

  const handleBookAppointmentClick = () => {
    navigate("/appointment");
  };

  return (
    <div>
      <HomeNavbar />

      <div className="hero-section">
        <div className="headline-image-container">
          <div className="hero-image-section">
            <img className="hero-image1" src={Doctor} alt="Doctor" />
          </div>
        </div>

        <div className="text-section">
          <WelcomeMessage name={userName || "Guest"} />

          <h2 className="text-title">
            Find your Doctor and make an Appointment
          </h2>
          <p className="text-description">
            Talk to online doctors and get medical advice, online prescriptions,
            refills, and medical notes within minutes. On-demand healthcare
            services at your fingertips.
          </p>
          <button
            className="text-appointment-btn"
            type="button"
            onClick={handleBookAppointmentClick}
          >
            <FontAwesomeIcon icon={faCalendarCheck} /> Book Appointment
          </button>

          <div className="text-stats">
            <div className="text-stats-container">
              <p>145k+</p>
              <p>Receive Patients</p>
            </div>

            <div className="text-stats-container">
              <p>50+</p>
              <p>Expert Doctors</p>
            </div>

            <div className="text-stats-container">
              <p>10+</p>
              <p>Years of Experience</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HealthcareHome;
