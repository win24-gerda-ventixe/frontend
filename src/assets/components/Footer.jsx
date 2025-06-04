import React from 'react';
import PortalLayout from '../layouts/PortalLayout';
import SocialMedia from '../images/SocialMedia.png';

const Footer = () => {
  return (
<footer className="footer">
  <div className="footer-content">
    <p className="footer-text">
      Copyright © {new Date().getFullYear()} Peterdraw.
    </p>

    <div className="footer-text-links">
      <div>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms & Conditions</a>
        <a href="#">Contact</a>
      </div>
    </div>

      <div className="footer-media-content">
        <img src={SocialMedia} alt="SocialMedia" className="social-media-icon" />
      </div>
  </div>
</footer>


  );
};

export default Footer;
