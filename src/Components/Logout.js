import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { removeCookie } from '../Helpers/authUtils';

export default ({ user, setUser = () => null }) => {
  if (user === 'logged out') {
    return <Navigate to="/login" />;
  }
  useEffect(() => {
    async function logout() {
      try {
        await removeCookie();
        setUser('logged out');
      } catch (e) {
        console.log('error remove cookie', e);
      }
    }
    logout();
  }, []);
  return <Navigate to="/logout" />;
};
