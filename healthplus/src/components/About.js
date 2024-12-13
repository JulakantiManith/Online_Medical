import React from "react";
import Doctor from "../images/doctor-group.png";
import SolutionStep from "./SolutionStep";
import "../components/About.css";
import HomeNavbar from "./HomeNavbar"; // Import the HomeNavbar component

function About() {
  return (
    <div>
      {/* Render the HomeNavbar at the top */}
      <HomeNavbar />

      {/* About Section */}
      <div className="about-section">
        <div className="about-image-content">
          <img src={Doctor} alt="Doctor Group" className="about-image1" />
        </div>

        <div className="about-text-content">
          <h3 className="about-title">
            <span>About Us</span>
          </h3>
          <p className="about-description">
            Welcome to Health Plus, your trusted partner for accessible and
            personalized healthcare. Our expert doctors offer online consultations
            and specialized services, prioritizing your well-being. Join us on
            this journey towards a healthier you.
          </p>

          <button className="btn btn-primary">
            See Solutions
          </button>

          {/* Solutions section */}
          <h4 className="about-text-title">Your Solutions</h4>

          <SolutionStep
            title="Choose a Specialist"
            description="Find your perfect specialist and book with ease at Health Plus. Expert doctors prioritize your health, offering tailored care."
          />

          <SolutionStep
            title="Make a Schedule"
            description="Choose the date and time that suits you best, and let our dedicated team of medical professionals ensure your well-being with personalized care."
          />

          <SolutionStep
            title="Get Your Solutions"
            description="Our experienced doctors and specialists are here to provide expert advice and personalized treatment plans, helping you achieve your best possible health."
          />
        </div>
      </div>
    </div>
  );
}

export default About;
