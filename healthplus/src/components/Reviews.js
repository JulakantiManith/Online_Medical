import React, { useState, useEffect } from "react";
import { customerReviews } from "../components/Scripts/customerReviews"; // Updated to match the renamed file
import "../components/Reviews.css";
import HomeNavbar from "../components/HomeNavbar"; // Import the HomeNavbar component

function Reviews() {
  const reviewsLength = customerReviews.length - 1;
  const [review, setReview] = useState(0);

  // Update review index every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setReview(prevReview => (prevReview >= reviewsLength ? 0 : prevReview + 1));
    }, 3000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [reviewsLength]);

  const { name, location, message } = customerReviews[review]; // Destructure current review details

  return (
    <div className="review-section" id="reviews">
      {/* Add HomeNavbar at the top */}
      <HomeNavbar />

      <div className="rw-text-content">
        <p className="rw-text-title">
          More than <span className="rw-text-num">1500+ Customers</span>
        </p>

        <p className="rw-text-desc">Don't believe us? Check out what clients say:</p>

        <p className="rw-text-format">
          <span className="rw-text-quote1">''</span>
          <span className="rw-review">{message}</span>
          <span className="rw-text-quote2">''</span>
        </p>

        <div className="rw-authors">
          <div className="rw-names">
            <p className="rw-reviewer-name">{name}</p>
            <p className="rw-reviewer-place">{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
