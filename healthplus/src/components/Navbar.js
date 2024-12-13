import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../images/plus.png'; // Adjust the path as needed

const Navbar = forwardRef((props, ref) => {
  return (
    <nav className="nav1-dashboard" ref={ref}> {/* Apply ref to the nav element */}
      <img src={logo} alt="HealthPlus Logo" className="nav1-logo-img" />
      <h1 className="nav1-logo">HealthPlus</h1>
      
      <div className="nav1-links">
        <Link to="/">Dashboard</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/Doctorlogin">Doctor Login</Link>
      </div>
    </nav>
  );
});

export default Navbar;
