import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserScreen.css';
import LoadingSpinner from './LoadingSpinner'; // Import the LoadingSpinner component

function UserScreen() {
  const [chatMessages, setChatMessages] = useState([
    { sender: 'User', text: 'Hello, I need help with my health today.' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isLoadingSpinnerVisible, setIsLoadingSpinnerVisible] = useState(false);
  const [isUserOnline, setIsUserOnline] = useState(true); // Track user status
  const navigate = useNavigate();
  const videoRef = useRef(null); // Ref for video element

  useEffect(() => {
    // Ensure the user is set as online initially
    setIsUserOnline(true);

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
      setIsUserOnline(false); // Cleanup to mark user as offline
      // Stop video stream when component unmounts
      if (currentVideoRef && currentVideoRef.srcObject) {
        const tracks = currentVideoRef.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (chatInput) {
      setChatMessages([...chatMessages, { sender: 'User', text: chatInput }]);
      setChatInput('');
    }
  };

  const handleEndSession = () => {
    setIsLoadingSpinnerVisible(true);
    // Stop video stream when the session ends
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }

    setTimeout(() => {
      setIsLoadingSpinnerVisible(false);
      setIsUserOnline(false); // Set user status to offline
      navigate('/home');
    }, 4000);
  };

  return (
    <div className="userscreen-container">
      {/* Display loading spinner */}
      {isLoadingSpinnerVisible && (
        <div className="loading-overlay">
          <LoadingSpinner message="Ending session..." />
        </div>
      )}

      {/* User online status */}
      {isUserOnline && (
        <div className="user-status-box">
          <p>User is online</p>
        </div>
      )}

      {/* Video Call Section */}
      <div className="userscreen-video-call">
        <video ref={videoRef} autoPlay muted className="userscreen-video" />
        <button onClick={handleEndSession} className="userscreen-end-session-button">
          End Session
        </button>
      </div>

      {/* Chat Section */}
      <div className="userscreen-chat-section">
        <div className="userscreen-chat-box">
          <h3>Chat</h3>
          <div className="userscreen-chat-messages">
            {chatMessages.map((msg, index) => (
              <p key={index} className={msg.sender === 'User' ? 'userscreen-user-message' : 'userscreen-doctor-message'}>
                <strong>{msg.sender}:</strong> {msg.text}
              </p>
            ))}
          </div>
          <input
            type="text"
            placeholder="Type a message"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            className="userscreen-input"
          />
          <button onClick={handleSendMessage} className="userscreen-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserScreen;
