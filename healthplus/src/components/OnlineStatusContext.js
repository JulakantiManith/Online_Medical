import React, { createContext, useState, useContext } from 'react';

const OnlineStatusContext = createContext();

export const OnlineStatusProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [onlineDoctors, setOnlineDoctors] = useState([]);

  const joinSession = (userType, name) => {
    if (userType === 'doctor') {
      setOnlineDoctors((prev) => [...prev, name]);
    } else if (userType === 'user') {
      setOnlineUsers((prev) => [...prev, name]);
    }
  };

  const leaveSession = (userType, name) => {
    if (userType === 'doctor') {
      setOnlineDoctors((prev) => prev.filter((doc) => doc !== name));
    } else if (userType === 'user') {
      setOnlineUsers((prev) => prev.filter((user) => user !== name));
    }
  };

  return (
    <OnlineStatusContext.Provider value={{ onlineUsers, onlineDoctors, joinSession, leaveSession }}>
      {children}
    </OnlineStatusContext.Provider>
  );
};

export const useOnlineStatus = () => {
  return useContext(OnlineStatusContext);
};
