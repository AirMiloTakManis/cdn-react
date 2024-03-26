import {
  Grid, Button, TextField, CircularProgress
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Api, { endpoints } from '../../Helpers/api'
import queryString from 'query-string';
import { Password, ArrowBack } from '@mui/icons-material';
// import ConfirmPasswordLogo from '@Assets/Icons/ConfirmPassword.svg';

const useStyles = makeStyles(() => ({
  wrapper: {
    position: 'relative',
  },
  buttonProgress: {
    color: '#7723CA',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function ResetPasswordForm() {
  const classes = useStyles();
  const location = useLocation();
  const [token, set_token] = useState(false);
  const [is_loading, set_is_loading] = useState(false);
  const [password, set_password] = useState('');
  const [repassword, set_repassword] = useState('');
  const [error_password, set_error_password] = useState('');
  const [error_repassword, set_error_repassword] = useState('');

  const send_api = () => {
    const pw_err = !password ? 'Password is required' : null;
    const repw_err = (repassword !== password) ? 'Password does not match' : null;
    set_error_password(pw_err);
    set_error_repassword(repw_err);

    if (pw_err || repw_err) return;

    set_is_loading(true);
    Api({
      endpoint: endpoints.resetPassword(),
      data: { password, token },
      onSuccess: () => {
        toast('success', 'Reset password successful. Please login using new password');
        setTimeout(() => window.location = '/', 5000);
        set_is_loading(false);
      },
      onFail: () => {
        toast('error', 'Failed to reset password');
        set_is_loading(false);
      },
    });
  };

  useEffect(() => {
    const { token: tokenFromURL } = queryString.parse(location.search);
    if (!tokenFromURL) {
      window.location = '/';
      return;
    }
    set_is_loading(true);
    Api({
      endpoint: endpoints.verifyResetPasswordToken(),
      data: { token: tokenFromURL },
      onSuccess: () => {
        set_is_loading(false);
        set_token(tokenFromURL);
      },
      onFail: () => {
        toast('error', 'Reset password token invalid, please request forget password again.');
        setTimeout(() => window.location = '/', 5000);
        set_is_loading(false);
      },
    });
  }, []);

  const onKeyDown = ({ key }) => {
    if (key === 'Enter') {
      send_api();
    }
  };

  if (!token) return (<></>);

  return (
    <div>
      <Grid container>
        <Grid container item xs={12} justifyContent="space-around" alignItems="center">
          <Grid item xs={2} className="d-flex justify-content-center">
            <img src={Password} style={{ width: 20 }} />
          </Grid>
          <Grid item xs={10}>
            <TextField
              onKeyDown={onKeyDown}
              id="standard-password-input"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => set_password(e.target.value)}
              autoComplete="current-password"
              style={{ width: '100%' }}
              error={!!error_password}
              helperText={error_password}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} justifyContent="space-around" alignItems="center" className="mt-2">
          <Grid item xs={2} className="d-flex justify-content-center">
            <img src={Password} style={{ width: 20 }} />
          </Grid>
          <Grid item xs={10}>
            <TextField
              onKeyDown={onKeyDown}
              id="standard-password-input"
              label="Confirm Password"
              type="password"
              value={repassword}
              onChange={(e) => set_repassword(e.target.value)}
              autoComplete="current-password"
              style={{ width: '100%' }}
              error={!!error_repassword}
              helperText={error_repassword}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} justifyContent="flex-end" className="pb-2">
          <Grid item xs={10}>
            <Link to="/login">
              <h6
                className="d-flex align-items-center py-2 pointer"
                style={{ color: '#6082c2', fontSize: 12 }}
              >
                <ArrowBack style={{ fontSize: 14 }} />&nbsp;Back to Login
              </h6>
            </Link>
          </Grid>
        </Grid>
        <Grid container item xs={12} justifyContent="flex-end" className="pb-2">
          <Grid item xs={10}>
            <Button
              className="mx-auto w-100"
              style={{
                backgroundColor: 'var(--primary-color)', borderRadius: '10px', borderColor: 'none',
              }}
              onClick={send_api}
              disabled={is_loading}
            >
              <p className="text-white">RESET PASSWORD</p>
              {is_loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </Button>
          </Grid>
          {error_password && (
            <Grid item xs={10}>
              <div className="pt-2 d-flex justify-content-center" style={{ color: 'red' }}>
                {error_password}
              </div>
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
