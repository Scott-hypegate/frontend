import React, { useContext } from 'react';
import './VerticalNavbar.css';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';

import { VerticalNavbarContext } from './VerticalNavbarContext';
import dashboardicon from '../../assets/dashboardicon.svg';
import profileicon from '../../assets/profileicon.svg';
import settingsicon from '../../assets/settingsicon.svg';
import logouticon from '../../assets/logouticon.svg';
import hypegatenavbarlogo from '../../assets/hypegatenavbarlogo.svg';
import navbarlogoicon from '../../assets/navbarlogoicon.svg';
import '../../assets/hypegatenavbarlogo.css';
import { auth } from '../../firebaseConfig';

const VerticalNavbar = () => {
  const navigate = useNavigate();
  const { isClosed, toggleNavbar, user } = useContext(VerticalNavbarContext);
    // ...
    const location = useLocation();
    const isSelected = (path) => {
      if (location.pathname.startsWith(path)) {
        return true;
      }
      return false;
    };
      const handleLogout = () => {
    // Sign out the user using Firebase Auth
    auth.signOut();
    navigate('/');
    // Redirect the user to the home page
  };
  return (
    <>


      <nav className={`vertical-navbar${isClosed ? ' closed' : ''}`}>
          {isClosed && <img src={navbarlogoicon} alt="navbarlogoicon" className="navbar-logo-icon" />}
          {!isClosed && <img src={hypegatenavbarlogo} alt="hypegatenavbarlogo" className="hypegate-navbar-logo" />}
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
        <NavLink to="/dashboard/" className={`nav-link${isSelected('/dashboard') ? ' selected' : ''}`}>
          <img src={dashboardicon} alt="dashboardicon" className="button-icon" />
          {!isClosed && <span className="button-text">Dashboard</span>}
        </NavLink>
        <NavLink to="/favorites" className={`nav-link${isSelected('/favorites') ? ' selected' : ''}`}>
        <img src={dashboardicon} alt="dashboardicon" className="button-icon" /> {/* Use the favorites icon here */}
        {!isClosed && <span className="button-text">Favorites</span>}
      </NavLink>
        {user && (
          <NavLink
            to={`/profile/${user.uid}`}
            className={`nav-link${isSelected(`/profile/${user.uid}`) ? ' selected' : ''}`}
          >
            <img src={profileicon} alt="profileicon" className="button-icon" />
            {!isClosed && <span className="button-text">Profile</span>}
          </NavLink>
        )}
        <NavLink to="/settings" className={`nav-link${isSelected('/settings') ? ' selected' : ''}`}>
          <img src={settingsicon} alt="settingsicon" className="button-icon" />
          {!isClosed && <span className="button-text">Settings</span>}
        </NavLink>
        <NavLink to="/messaging" className={`nav-link${isSelected('/settings') ? ' selected' : ''}`}>
          <img src={settingsicon} alt="settingsicon" className="button-icon" />
          {!isClosed && <span className="button-text">Messages</span>}
        </NavLink>
        <NavLink onClick={handleLogout} className={`nav-link${isSelected('/logout') ? ' selected' : ''}`}>
          <img src={logouticon} alt="logouticon" className="button-icon" />
          {!isClosed && <span className="button-text">Logout</span>}
        </NavLink>
        </div>
        <button onClick={toggleNavbar} className={'vertical-navbar-toggle-btn'}>
          {isClosed ? 'Open' : 'Close'}
        </button>
      </nav>
    </>
  );
}


export default VerticalNavbar;
