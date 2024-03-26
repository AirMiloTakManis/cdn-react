import { useEffect, useState } from 'react';
import Api, { endpoints } from './Helpers/api';
import {
  getUserFromCookie, getTokenCookie, setCookies, removeCookie,
} from './Helpers/authUtils';

export default function Hook() {
  const tokenCookie = getTokenCookie();
  const userCookie = getUserFromCookie();
  const [token, setToken] = useState(tokenCookie);
  const [user, setUser] = useState(userCookie);
  const [refreshProfile, setRefreshProfile] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const login = ({ email, password }) => {
    setIsLoading(true);
    setLoginError('');
    Api({
      endpoint: endpoints.getToken(),
      data: { email, password },
      onSuccess: (response) => {
        setToken(response.token);
        setCookies('token', response.token);
        setIsLoading(false);
      },
      onFail: (err) => {
        setToken();
        removeCookie();
        setIsLoading(false);
        setLoginError(err);
      },
    });
  };

  const getUser = () => {
    Api({
      endpoint: endpoints.getProfile(),
      token,
      onSuccess: (response) => {
        setUser(response.data);
        setCookies('user', response.data);
      },
      onFail: setUser(),
    });
  };

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token, refreshProfile])

  return {
    login,
    loginError,
    token,
    user,
    setUser,
    isLoading,
    setIsLoading,
    setLoginError,
    setRefreshProfile,
    getUser,
  };
}
