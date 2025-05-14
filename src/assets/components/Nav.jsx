import { NavLink } from 'react-router-dom';
import logo from '../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import dashboardIcon from '../images/1.png';
import bookingsIcon from '../images/2.png';
import invoicesIcon from '../images/3.png';
import inboxIcon from '../images/4.png';
import calendarIcon from '../images/5.png';
import eventsIcon from '../images/6.png';
import financialsIcon from '../images/7.png';
import galleryIcon from '../images/8.png';
import feedbackIcon from '../images/9.png';

const Nav = () => {
  return (
    <nav className="sidebar">
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-img" />
        <span>Ventixe</span>
      </div>
      <ul className="nav-items">
        <li>
          <NavLink to="/dashboard">
            <img src={dashboardIcon} alt="Dashboard" className="nav-icon" />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/bookings">
            <img src={bookingsIcon} alt="Bookings" className="nav-icon" />
            <span>Bookings</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/invoices">
            <img src={invoicesIcon} alt="Invoices" className="nav-icon" />
            <span>Invoices</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/inbox">
            <img src={inboxIcon} alt="Inbox" className="nav-icon" />
            <span>Inbox</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/calendar">
            <img src={calendarIcon} alt="Calendar" className="nav-icon" />
            <span>Calendar</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/events">
            <img src={eventsIcon} alt="Events" className="nav-icon" />
            <span>Events</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/financials">
            <img src={financialsIcon} alt="Financials" className="nav-icon" />
            <span>Financials</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/gallery">
            <img src={galleryIcon} alt="Gallery" className="nav-icon" />
            <span>Gallery</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/feedback">
            <img src={feedbackIcon} alt="Feedback" className="nav-icon" />
            <span>Feedback</span>
          </NavLink>
        </li>
      </ul>

      <button className="signout-button">Sign Out</button>
    </nav>
  );
};

export default Nav;
