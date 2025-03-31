'use client';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Camilo Castillo. Todos los derechos reservados.
          </p>
        </div>
        
        <div className="footer-right">
          <div className="footer-links">
            <a href="https://github.com/camilocas88" target="_blank" rel="noopener noreferrer" className="footer-link">
              GitHub
            </a>
            <a href="https://linkedin.com/in/camilo-castilloc" target="_blank" rel="noopener noreferrer" className="footer-link">
              LinkedIn
            </a>
            <a href="https://twitter.com/camilocastillo" target="_blank" rel="noopener noreferrer" className="footer-link">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 