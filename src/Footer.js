// src/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      textAlign: 'center',
      padding: '10px 0',
      position: 'fixed',
      bottom: 0,
      width: '100%',
      backgroundImage: 'linear-gradient(to right, #facc15, #ef4444)',
      fontWeight: 'bold',
      borderTop: '1px solid #ccc'
    }}>
      Made with love by Saloni Sikriwal!!
    </footer>
  );
};

export default Footer;
