import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import './Register.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const navigate = useNavigate();

  // Password validation function
  const validatePassword = (password) => {
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordError) return; // Don't submit if password validation fails

    const userData = { name, email, password };

    try {
      const response = await axios.post('http://localhost:8080/api/users/register', userData);
      if (response.status === 200 || response.status === 201) {
        setSuccess('Registration successful!');
        setError('');
        setName('');
        setEmail('');
        setPassword('');

        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        // Check for specific error related to email
        if (error.response.status === 409) {
          setError('This email is already registered.');
        } else {
          setError(`Error: ${error.response.data.message || 'Registration failed.'}`);
        }
      } else if (error.request) {
        setError('No response from the server. Please try again later.');
      } else {
        setError('An error occurred. Please try again.');
      }
      setSuccess('');
    }
  };

  return (
    <div className="register-body">
      <div className="register-container">
        <Navbar />
        <div className="form-container">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group password-group">
              <label>Password:</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
                />
                <span
                  className="password-toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                  role="button"
                  aria-label="Toggle password visibility"
                  tabIndex={0} // Make it focusable for accessibility
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setShowPassword(!showPassword);
                    }
                  }}
                >
                  {showPassword ? '🙈' : '👁️'}
                </span>
              </div>
              {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
            </div>
            <button type="submit" disabled={!name || !email || passwordError || !password}>
              Register
            </button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
