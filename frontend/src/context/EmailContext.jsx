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
const[userId,setUserId]=useState(null);
  useEffect(() => {
    const fetchEmail = async () => {
      const storedEmail = Cookies.get("email"); 
    const storedSessionId = Cookies.get("sessionId");
    const storedUserId = Cookies.get("userId");

      if (storedEmail) {
        setEmail(storedEmail);
      }

      if (storedSessionId) {
        setSessionId(storedSessionId);
      }

      if (storedUserId) {
        setUserId(storedUserId);
      }
      setLoading(false);
    };
    fetchEmail();
  }, []);

  const saveEmail = async (emailInput, metadata) => {
    try {
      const url = `${BASE_URL}${API_ENDPOINTS.email}`;
      
      const response = await axios.post(url, {
        email: emailInput,
        metadata,
      });
      
      setEmail(emailInput);
      setSessionId(response.data.sessionId);
      setUserId(response.data.userId);
      Cookies.set("email", emailInput, { expires: 7 }); // Store email in cookie for 7 days
      Cookies.set("sessionId", response.data.sessionId, { expires: 7 }); // Store sessionId in cookie for 7 days
      Cookies.set("userId", response.data.userId, { expires: 7 }); // Store userId in cookie for 7 days
    } catch (error) {
      console.error("Failed to save email:", error);
    }
  };

  return (
    <EmailContext.Provider
      value={{ email, setEmail, loading, saveEmail, sessionId,userId,setUserId }}
    >
      {children}
    </EmailContext.Provider>
  );
};
