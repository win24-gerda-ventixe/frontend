import React from 'react';
import logoutIcon from '../images/logout.png';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { isLoggedIn, logout, getUser } from '../../auth'; // ✅ now includes getUser




const routeMeta = {
  '/dashboard': {
    title: 'Dashboard',
    breadcrumb: ['Dashboard']
  },
  '/events': {
    title: 'Events',
    breadcrumb: ['Dashboard', 'Events']
  },
  '/bookings': {
    title: 'Bookings',
    breadcrumb: ['Dashboard', 'Bookings']
  },
  '/invoices': {
    title: 'Invoices',
    breadcrumb: ['Dashboard', 'Invoices']
  },
  '/inbox': {
    title: 'Inbox',
    breadcrumb: ['Dashboard', 'Inbox']
  },
  '/calendar': {
    title: 'Calendar',
    breadcrumb: ['Dashboard', 'Calendar']
  },
  '/financials': {
    title: 'Financials',
    breadcrumb: ['Dashboard', 'Financials']
  },
  '/gallery': {
    title: 'Gallery',
    breadcrumb: ['Dashboard', 'Gallery']
  },
  '/feedback': {
    title: 'Feedback',
    breadcrumb: ['Dashboard', 'Feedback']
  }
};

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const user = getUser();

  const loggedIn = isLoggedIn();

  let current = routeMeta[path];
  let showBackButton = false;
  let backPath = '/dashboard';

  if (!current && path.startsWith('/events/')) {
    current = {
      title: 'Event Details',
      breadcrumb: ['Dashboard', 'Events', 'Details']
    };
    showBackButton = true;
    backPath = '/events';
  }

  if (!current) {
    current = {
      title: 'Untitled',
      breadcrumb: ['Dashboard']
    };
  }

  return (
    <header className="header">
      <div className="header-left">
        <div className="breadcrumb">
          {current.breadcrumb.map((item, index) => (
            <span key={index} className={index === 0 ? 'breadcrumb-link' : ''}>
              {index !== 0 && ' / '}
              {item}
            </span>
          ))}
        </div>

        <div className="page-title-container">
          {showBackButton && (
            <button
              className="back-button"
              onClick={() => navigate(backPath)}
              aria-label="Go back"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
          )}
          <h1 className="page-title">{current.title}</h1>
        </div>
      </div>

<div className="header-right">
    <NavLink to="/settings" className="settings-btn">
    <i className="fa-solid fa-gear nav-icon"></i>
  </NavLink>
    {loggedIn ? (
      <>
        <span className="user-info">
          Welcome, {user?.name || user?.email || "User"}!
        </span>
      </>
    ) : (
      <>
        <button className="login-button" onClick={() => navigate('/login')}>
          <img src={logoutIcon} alt="Log in" className="button-icon" />
          <span>Log In</span>
        </button>
        <button className="login-button" onClick={() => navigate('/signup')}>
          <img src={logoutIcon} alt="Sign Up" className="button-icon" />
          <span>Sign Up</span>
        </button>
      </>
    )}
</div>

    </header>
  );
};

export default Header;
