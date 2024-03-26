import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Api, { endpoints } from '../../Helpers/api';
import queryString from 'query-string';

export default (props) => {
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleForgotPassword = () => {
    setIsForgotPassword(!isForgotPassword);
    props.setLoginError();
  };

  const onKeyDown = ({ key }) => {
    if (key === 'Enter') attemptLoginOrPasswordReset();
  };

  const attemptLoginOrPasswordReset = ({ email, password }) => {
    if (!email) return props.setLoginError('Email required');
    if (!isForgotPassword) return props.login({ email, password });
    props.setIsLoading(true);
    Api({
      endpoint: endpoints.requestTokenToResetPassword(),
      data: { email, redirect_url: `${window.location.origin}/reset-password` },
      onSuccess: () => {
        props.setIsLoading(false);
        alert('Reset password successful. Please check your email to proceed');
        setIsForgotPassword(false);
      },
      onFail: () => {
        props.setIsLoading(false);
        alert("Failed to reset password")
      },
    });
  };

  const signUp = (data) => {
    if(!data) return;
    Api({
      endpoint: endpoints.register(),
      data,
      isSignUp: true,
      onSuccess: (res) => {
        alert('Sign Up successfull');
        setOpen(false);
        attemptLoginOrPasswordReset({ email: data.email, password: data.password });
      },
      onFail: (err) => {
        alert('Sign Up failed, please try again later');
        setOpen(false);
      }
    })
  }

  useEffect(() => {
    const { code } = queryString.parse(location.search);
    if (!code) return;
    props.ssologin({ code });
  }, []);

  return {
    onKeyDown,
    attemptLoginOrPasswordReset,
    toggleForgotPassword,
    from,
    open,
    setOpen,
    isForgotPassword,
    setIsForgotPassword,
    location,
    signUp,
  };
};
