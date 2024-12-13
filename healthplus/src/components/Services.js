import React from "react";
import HomeNavbar from "./HomeNavbar"; // Import HomeNavbar component
import "../components/Services.css"; // Import CSS for styling

function Services() {
  return (
    <div className="custom-body">
      <div className="custom-html">
        <HomeNavbar /> {/* HomeNavbar component at the top */}

        <div className="info-section" id="services">
          <div className="info-title-content">
            <h3 className="info-title">What We Do</h3>
            <p className="info-description">
              We bring healthcare to your convenience, offering a comprehensive range of on-demand medical services tailored to your needs. Our platform allows you to connect with experienced online doctors who provide expert medical advice, issue online prescriptions, and offer quick refills whenever you require them.
            </p>
          </div>
          <div className="info-cards-content">
            {/* Emergency Care Card */}
            <div className="info-card">
              <div className="info-card-icons">
                <div className="circle-icon">
                  {/* Emoji for emergency: 🚑 */}
                  <span className="dummy-symbol">🚑</span>
                </div>
              </div>
              <h4 className="info-card-title">Emergency Care</h4>
              <p className="info-card-description">
                Our Emergency Care service is designed to be your reliable support in critical situations. Whether it's a sudden illness, injury, or any medical concern that requires immediate attention, our team of dedicated healthcare professionals is available 24/7 to provide prompt and efficient care.
              </p>
            </div>

            {/* Heart Disease Card */}
            <div className="info-card">
              <div className="info-card-icons">
                <div className="circle-icon">
                  {/* Emoji for heart: ❤️ */}
                  <span className="dummy-symbol">❤️</span>
                </div>
              </div>
              <h4 className="info-card-title">Heart Disease</h4>
              <p className="info-card-description">
                Our team of experienced cardiologists and medical experts use state-of-the-art technology to assess your cardiovascular health and design personalized treatment plans. From comprehensive screenings to advanced interventions, we are committed to helping you maintain a healthy heart and lead a fulfilling life.
              </p>
            </div>

            {/* Dental Care Card */}
            <div className="info-card">
              <div className="info-card-icons">
                <div className="circle-icon">
                  {/* Emoji for tooth: 🦷 */}
                  <span className="dummy-symbol">🦷</span>
                </div>
              </div>
              <h4 className="info-card-title">Dental Care</h4>
              <p className="info-card-description">
                Smile with confidence as our Dental Care services cater to all your oral health needs. Our skilled dentists provide a wide range of treatments, from routine check-ups and cleanings to cosmetic procedures and restorative treatments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
