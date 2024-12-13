import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomeNavbar.css'; // Import your custom CSS
import logo from '../images/plus.png'; // Adjust the path to your logo image

function HomeNavbar() {
  const navigate = useNavigate(); // Use navigate instead of useHistory

  const handleLogout = () => {
    // Perform logout logic here (e.g., clear tokens, session data)
    // Redirect the user after logging out
    navigate('/login'); // Redirect to the login page after logout
  };

  return (
    <nav className="home-navbar">
      <div className="logo">
        <Link to="/dashboard"> {/* Logo as link to dashboard */}
          <img src={logo} alt="HealthPlus Logo" className="navbar-logo" />
        </Link>
        <span className="app-name" style={{ fontWeight: 'bold' }}>HealthPlus</span> {/* App name as bold text */}
      </div>
      <ul className="nav-links">
        <li><Link to="/Home">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/Bookings">View Bookings</Link></li>
        <li><Link to="/Reviews">Reviews</Link></li> 
        <li><Link to="/ContactUs">Contact Us</Link></li>
        
        <li>
        <button className="logout-btn" onClick={handleLogout}>
            Logout
        </button>
      </li>
      </ul>
    </nav>
  );
        
        
      
}

export default HomeNavbar;
