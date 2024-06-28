// useValidateUser.js

import { useEffect } from 'react';
import { useEmail } from '../context/EmailContext';

const useValidateUser = () => {
  const { email } = useEmail();

  useEffect(() => {
    if (!email) {
      // Redirect to home page or show a message
      window.location.href = '/'; // Or show a message
    }
  }, [email]);

  return { validateUser: () => !!email };
};

export default useValidateUser;
