import React, { useState } from 'react';
import './PatientScreen.css'; // Make sure to have your CSS for styling

function PatientScreen() {
  // State to manage chat messages and input from the patient
  const [chatMessages, setChatMessages] = useState([
    { sender: 'Doctor', text: 'Hello, how can I assist you today?' },
  ]);
  const [chatInput, setChatInput] = useState('');

  // Handle sending a message by the patient
  const handleSendMessage = () => {
    if (chatInput) {
      setChatMessages([...chatMessages, { sender: 'Patient', text: chatInput }]);
      setChatInput('');
    }
  };

  // Handle canceling the call
  const handleCancelCall = () => {
    alert('Call has been canceled');
    // Add call cancellation logic here (for example, stop video stream)
  };

  return (
    <div className="patientscreen-container">
      {/* Video Call Section */}
      <div className="patientscreen-video-call">
        <button onClick={handleCancelCall} className="patientscreen-cancel-call-button">
          Cancel Call
        </button>
        <p>Video Call</p>
      </div>

      {/* Chat Section */}
      <div className="patientscreen-chat-box">
        <h3>Chat with Doctor</h3>
        <div className="patientscreen-chat-messages">
          {chatMessages.map((msg, index) => (
            <p
              key={index}
              className={msg.sender === 'Doctor' ? 'patientscreen-doctor-message' : 'patientscreen-patient-message'}
            >
              <strong>{msg.sender}:</strong> {msg.text}
            </p>
          ))}
        </div>

        <div className="patientscreen-input-section">
          <input
            type="text"
            placeholder="Type a message"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            className="patientscreen-input"
          />
          <button onClick={handleSendMessage} className="patientscreen-button">Send</button>
        </div>
      </div>
    </div>
  );
}

export default PatientScreen;
