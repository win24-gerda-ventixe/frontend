import React from 'react';
import PortalLayout from '../layouts/PortalLayout';
import SocialMedia from '../images/SocialMedia.png';

const Footer = () => {
  return (
<footer className="footer">
  <div className="footer-content">
    <p className="footer-text">Copyright © {new Date().getFullYear()} Peterdraw.</p>
    <p className="footer-text-links">
      <a href="#">Privacy Policy</a>  <a href="#">Terms & Conditions</a>  <a href="#">Contact</a>
      <img src={SocialMedia} alt="SocialMedia" className="social-media-icon" />
    </p>
  </div>
</footer>

  );
};

export default Footer;
