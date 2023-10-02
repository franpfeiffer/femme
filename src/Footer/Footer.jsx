import React from 'react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-links">
        <a href="https://www.instagram.com/femmelenceria/" target="_blank">
          <i className="fa-brands fa-instagram"></i> Instagram
        </a>

        <a href="https://www.facebook.com/Femmeventaonline" target="_blank">
          <i className="fa-brands fa-facebook"></i> Facebook
        </a>
      </div>
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Femme. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
