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

  useEffect(() => {
    const fetchEmail = async () => {
      const storedEmail = Cookies.get("email");
      if (storedEmail) {
        setEmail(storedEmail);
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
      Cookies.set("email", emailInput, { expires: 7 }); // Store email in cookie for 7 days
    } catch (error) {
      console.error("Failed to save email:", error);
    }
  };

  return (
    <EmailContext.Provider
      value={{ email, setEmail, loading, saveEmail, sessionId }}
    >
      {children}
    </EmailContext.Provider>
  );
};
