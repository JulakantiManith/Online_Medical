import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar component
import './Doctorlogin.css';

function DoctorLogin() {
  const [doctorId, setDoctorId] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isNaN(doctorId)) {
      setErrorMessage('Doctor ID must be numeric.');
      setSuccessMessage('');
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/doctor/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ doctorId: parseInt(doctorId, 10), password }),
      });

      const data = await response.text();
      if (response.ok) {
        setSuccessMessage(data);
        setErrorMessage('');
        setTimeout(() => {
          navigate('/DoctorDash');
        }, 1000);
      } else {
        setErrorMessage(data);
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      setSuccessMessage('');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="doctor-login-container">
      {/* Add Navbar at the top */}
      <Navbar />
      
      <h2>Doctor Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Doctor ID:</label>
          <input
            type="text"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
}

export default DoctorLogin;
