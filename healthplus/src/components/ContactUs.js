import React, { useState } from 'react';
import './ContactUs.css';
import HomeNavbar from './HomeNavbar';  // Import your HomeNavbar component

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // Handle form data changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // You can add form submission logic here (e.g., sending to a backend server)
  };

  return (
    <div className="contactus-container">
      {/* Include the HomeNavbar at the top */}
      <HomeNavbar />

      <div className="contactus-content">
        <h2 className="contactus-title">Contact Us</h2>

        {submitted ? (
          <div className="contactus-success">
            <p>Thank you for contacting us! We will get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contactus-form">
            <div className="contactus-form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="contactus-form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="contactus-form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Enter your message"
                required
              ></textarea>
            </div>

            <button type="submit" className="contactus-submit-btn">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ContactUs;
