'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import VersionInfo from './VersionInfo';

export default function Footer() {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  // Textos según el idioma
  const t = {
    copyright: language === 'es' 
      ? `© ${currentYear} Camilo Castillo. Todos los derechos reservados.`
      : `© ${currentYear} Camilo Castillo. All rights reserved.`
  };
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <p className="footer-copyright">
            {t.copyright}
          </p>
          <VersionInfo />
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