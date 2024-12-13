import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './Dashboard.css';

import doctor1 from '../images/Doctor1.jpg';
import doctor2 from '../images/Doctor2.jpg';
import doctor3 from '../images/Doctor3.jpg';


function Dashboard() {
  const servicesRef = useRef(null);
  const navbarRef = useRef(null);
  const servicesListRef = useRef(null);
  const navigate = useNavigate();

  const handleSeeMore = () => {
    const navbarHeight = navbarRef.current.offsetHeight; // Get the height of the navbar
    const servicesTop = servicesRef.current.getBoundingClientRect().top + window.scrollY; // Get the top position of the services section
    window.scrollTo({
      top: servicesTop - navbarHeight, // Scroll to services section minus navbar height
      behavior: 'smooth' // Smooth scrolling
    });
  };

  const handleServiceClick = () => {
    navigate('/login');
  };

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (servicesListRef.current) {
        servicesListRef.current.scrollBy({
          left: 150,
          behavior: 'smooth'
        });
        if (
          servicesListRef.current.scrollLeft + servicesListRef.current.clientWidth >=
          servicesListRef.current.scrollWidth
        ) {
          servicesListRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }
    }, 1500);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="dashboard-container">
      <Navbar ref={navbarRef} />
      <div className="welcome-section">
        <h1>
        Welcome to the HealthPlus </h1>
        <h3>Your Health, Our Priority</h3>
        <h4>Access top-tier medical professionals and cutting-edge treatments.
        Your well-being, reimagined.</h4>
        <button className="see-more-button" onClick={handleSeeMore}>
          See More
        </button>
      </div>
      
      <div ref={servicesRef} className="services-section">
        <h2>Our Doctors</h2>
        
        <div className="doctor-images">
          <div className="doctor-image-container">
            <img src={doctor1} alt="Doctor 1" className="doctor-image" />
            <div className="doctor-table">
              <h3>Dr. John Doe</h3>
              <p>Specialty: Family Medicine</p>
              <p>Experienced in treating a variety of health conditions.</p>
            </div>
          </div>
          <div className="doctor-image-container">
            <img src={doctor2} alt="Doctor 2" className="doctor-image" />
            <div className="doctor-table">
              <h3>Dr. Jane Smith</h3>
              <p>Specialty: Dermatology</p>
              <p>Focused on skin treatments and care.</p>
            </div>
          </div>
          <div className="doctor-image-container">
            <img src={doctor3} alt="Doctor 3" className="doctor-image" />
            <div className="doctor-table">
              <h3>Dr. Emily Johnson</h3>
              <p>Specialty: Otolaryngology</p>
              <p>Expert in ear, nose, and throat conditions.</p>
            </div>
          </div>
        </div>
      </div>

      {/* White box at the bottom containing horizontally scrollable service containers */}
      <div className="white-box">
        <h2>Services </h2>
        <div ref={servicesListRef} className="services-list">
          <div className="service-container" onClick={handleServiceClick}>
            <p>24/7 Emergency Care</p>
          </div>
          <div className="service-container" onClick={handleServiceClick}>
            <p>Diagnostic Services</p>
          </div>
          <div className="service-container" onClick={handleServiceClick}>
            <p>Health Checkups</p>
          </div>
          <div className="service-container" onClick={handleServiceClick}>
            <p>Rehabilitation</p>
          </div>
          <div className="service-container" onClick={handleServiceClick}>
            <p>Outpatient Clinics</p>
          </div>
          
          
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
