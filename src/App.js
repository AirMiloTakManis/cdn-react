import './App.css';
import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import TopBar from './Components/TopBar.js';
import { Grid } from '@mui/material';
import Homepage from './Pages/HomePage';
import ProfilePage from './Pages/ProfilePage';
import { AuthProvider, AuthContext } from './Context/Auth';
import AuthPage from './Pages/Auth';
import Logout from './Components/Logout';
import useHook from './hook'

const MainPage = (h) => {
  if (h.user === 'logged out') {
    return <Navigate to="/login" />;
  }
  return <Navigate to="/home" />;
};

function App() {
  const h = useHook();
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<MainContainer child={<MainPage {...h} />} />} />
          <Route path='/home' element={<MainContainer child={<Homepage {...h}  />} />} />
          <Route path='/profile-page' element={<MainContainer child={<ProfilePage {...h}  />} />} />
          <Route path='/login' element={<AuthPage {...h}  />} />
          <Route path='/reset-password' element={<AuthPage {...h}  />} />
          <Route path='/logout' element={<Logout {...h}  />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function MainContainer(props) {
  const location = useLocation();

  return (
    <Grid className="content"
      style={{
        position: 'fixed',
        top: '0px',
        left: '0px',
        right: '0px',
        bottom: '0px',
        overflow: location.pathname === '/' || location.pathname === '/home' ? 'hidden' : 'auto',
      }}
    >
      <TopBar />
      <Grid item xs={12}>
        {props.child}
      </Grid>
    </Grid>
  )
}

function PrivateRoute({ children, accessible = true, ...rest }) {
  const Auth = useContext(AuthContext);
  if (!accessible && !!rest.user) return <Navigate to="/" />;
  return (
    <Route
      {...rest}
      render={({ location }) => (Auth.token ? (
        children
      ) : (
        <Navigate
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      ))}
    />
  );
}

export default App;
