import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Context/Auth';
import LoginForm from './LoginForm.js';
import SignUpDialog from './components/SignUpDialog'
import useHook from './hook'

export default function LandingPage(props) {
  const h = useHook(props);
  const { token } = useContext(AuthContext);
  const is_login = h.location?.pathname.includes('login');
  const is_reset = h.location?.pathname.includes('reset-password');
  if (token && h.user !== 'logged out') return <Navigate to={h.from} />;
  return (
    <div className="content-login">
      <SignUpDialog {...h} />
      <div className="flex-div">
        <div className="name-content">
          <h1 className="logo">Complete Developer Network</h1>
          <p>Connect with developers and the freelance world around you.</p>
        </div>
        <LoginForm {...h} />
      </div>
    </div>
  );
}
