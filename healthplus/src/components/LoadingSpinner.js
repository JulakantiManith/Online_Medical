// LoadingSpinner.js
import React from 'react';
import './LoadingSpinner.css';

function LoadingSpinner({ message }) {
  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
      <p className="loading-text">{message}</p>
    </div>
  );
}

export default LoadingSpinner;
