import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DoctorScreen.css';
import LoadingSpinner from './LoadingSpinner'; // Import the LoadingSpinner component

function DoctorScreen() {
  const [medicines, setMedicines] = useState([]);
  const [medicineInput, setMedicineInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'Doctor', text: 'Hello, how can I assist you today?' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isLoadingSpinnerVisible, setIsLoadingSpinnerVisible] = useState(false);
  const [isDoctorOnline, setIsDoctorOnline] = useState(true); // Track doctor status
  const navigate = useNavigate();
  const videoRef = useRef(null); // Ref for video element

  useEffect(() => {
    // Ensure the doctor is set as online initially
    setIsDoctorOnline(true);

    // Access the camera and stream video
    const startVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        alert("Unable to access the camera. Please check permissions and try again.");
      }
    };

    startVideoStream();

    // Copy videoRef.current to a local variable for cleanup
    const currentVideoRef = videoRef.current;

    return () => {
      setIsDoctorOnline(false); // Cleanup to mark doctor as offline
      // Stop video stream when component unmounts
      if (currentVideoRef && currentVideoRef.srcObject) {
        const tracks = currentVideoRef.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const handleAddMedicine = () => {
    if (medicineInput) {
      setMedicines([...medicines, medicineInput]);
      setMedicineInput('');
    }
  };

  const handleRemoveMedicine = (medicine) => {
    setMedicines(medicines.filter((med) => med !== medicine));
  };

  const handleSendMessage = () => {
    if (chatInput) {
      setChatMessages([...chatMessages, { sender: 'Doctor', text: chatInput }]);
      setChatInput('');
    }
  };

  const handleCancelCall = () => {
    setIsLoadingSpinnerVisible(true);
    // Stop video stream when the session ends
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }

    setTimeout(() => {
      setIsLoadingSpinnerVisible(false);
      setIsDoctorOnline(false); // Set doctor status to offline when call ends
      navigate('/DoctorDash');
    }, 4000);
  };

  return (
    <div className="doctorscreen-container">
      {/* Display loading spinner and message when isLoadingSpinnerVisible is true */}
      {isLoadingSpinnerVisible && (
        <div className="loading-overlay">
          <LoadingSpinner message="Ending session..." />
        </div>
      )}

      {/* Display doctor status box when isDoctorOnline is true */}
      {isDoctorOnline && (
        <div className="doctor-status-box">
          <p>Doctor is online</p>
        </div>
      )}

      {/* Video Call Section */}
      <div className="doctorscreen-video-call">
        <video ref={videoRef} autoPlay muted className="doctorscreen-video" />
        <button onClick={handleCancelCall} className="doctorscreen-cancel-call-button">
          Cancel Call
        </button>
      </div>

      {/* Medicine Checkout Section */}
      <div className="doctorscreen-medicine-checkout">
        <h3>Medicine Checkout</h3>
        <div className="doctorscreen-medicine-list">
          {medicines.map((medicine, index) => (
            <div key={index} className="doctorscreen-medicine-item">
              <span>{medicine}</span>
              <button onClick={() => handleRemoveMedicine(medicine)} className="doctorscreen-remove-medicine">
                Remove
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Add medicine"
          value={medicineInput}
          onChange={(e) => setMedicineInput(e.target.value)}
          className="doctorscreen-input"
        />
        <button onClick={handleAddMedicine} className="doctorscreen-button">Add Medicine</button>
      </div>

      {/* Chat Section */}
      <div className="doctorscreen-chat-section">
        <div className="doctorscreen-chat-box">
          <h3>Chat</h3>
          <div className="doctorscreen-chat-messages">
            {chatMessages.map((msg, index) => (
              <p key={index} className={msg.sender === 'Doctor' ? 'doctorscreen-doctor-message' : 'doctorscreen-patient-message'}>
                <strong>{msg.sender}:</strong> {msg.text}
              </p>
            ))}
          </div>
          <input
            type="text"
            placeholder="Type a message"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            className="doctorscreen-input"
          />
          <button onClick={handleSendMessage} className="doctorscreen-button">Send</button>
        </div>
      </div>
    </div>
  );
}

export default DoctorScreen;
