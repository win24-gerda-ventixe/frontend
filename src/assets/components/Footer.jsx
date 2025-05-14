import React from 'react';
import PortalLayout from '../layouts/PortalLayout';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-text"> Copyright © {new Date().getFullYear()} Peterdraw.</p>
    </footer>
  );
};

export default Footer;
