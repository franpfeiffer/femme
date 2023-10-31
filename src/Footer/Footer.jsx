import React from 'react';
import { Container } from 'react-bootstrap';

export const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 ">
      <Container className="text-center">
        <div className="social-links">
          <a href="https://www.instagram.com/femmelenceria/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i> Instagram
          </a>
          <a href="https://www.facebook.com/Femmeventaonline" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i> Facebook
          </a>
        </div>
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Femme. Todos los derechos reservados.</p>
        </div>
      </Container>
    </footer>
  );
};
