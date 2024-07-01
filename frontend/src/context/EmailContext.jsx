// EmailContext.jsx

import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL, API_ENDPOINTS } from '../utils/constants';

const EmailContext = createContext();

export const useEmail = () => useContext(EmailContext);

export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(''); // Initialize username state

  useEffect(() => {
    const fetchUserData = async () => {
      const storedEmail = Cookies.get("email");
      const storedSessionId = Cookies.get("sessionId");
      const storedUserId = Cookies.get("userId");
      const storedUsername = Cookies.get("username"); // Retrieve username from cookie

      if (storedEmail) {
        setEmail(storedEmail);
      }

      if (storedSessionId) {
        setSessionId(storedSessionId);
      }

      if (storedUserId) {
        setUserId(storedUserId);
      }

      if (storedUsername) {
        setUsername(storedUsername); // Set username from cookie
      }

      setLoading(false);
    };

    fetchUserData();
  }, []);

  const saveUserData = async (emailInput, metadata) => {
    try {
      const url = `${BASE_URL}${API_ENDPOINTS.email}`;
      const response = await axios.post(url, {
        email: emailInput,
        metadata,
      });

      setEmail(emailInput);
      setSessionId(response.data.sessionId);
      setUserId(response.data.userId);
      Cookies.set("email", emailInput, { expires: 7 });
      Cookies.set("sessionId", response.data.sessionId, { expires: 7 });
      Cookies.set("userId", response.data.userId, { expires: 7 });
    } catch (error) {
      console.error("Failed to save email:", error);
    }
  };

  const setUsernameContext = (newUsername) => {
    setUsername(newUsername);
    Cookies.set("username", newUsername, { expires: 7 }); // Store username in cookie for 7 days
  };

  return (
    <EmailContext.Provider
      value={{ email, setEmail, loading, saveUserData, sessionId, userId, setUsernameContext, username }}
    >
      {children}
    </EmailContext.Provider>
  );
};
