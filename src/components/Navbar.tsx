'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { gsap } from 'gsap';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { translations } = useLanguage();
  const menuRef = useRef(null);
  
  // Detectar ancho de la ventana para determinar si es móvil
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Establecer el valor inicial
    handleResize();
    
    // Agregar event listener
    window.addEventListener('resize', handleResize);
    
    // Limpiar event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Detectar scroll para cambiar fondo
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animación del menú móvil
  useEffect(() => {
    if (menuRef.current) {
      if (isMenuOpen) {
        gsap.fromTo(
          menuRef.current,
          { height: 0, opacity: 0 },
          { 
            height: 'auto', 
            opacity: 1, 
            duration: 0.3, 
            ease: 'power2.out'
          }
        );
      } else {
        gsap.to(
          menuRef.current,
          { 
            height: 0, 
            opacity: 0, 
            duration: 0.2, 
            ease: 'power2.in'
          }
        );
      }
    }
  }, [isMenuOpen]);

  const mobileBackgroundStyle = {
    background: isScrolled 
      ? 'rgba(67, 32, 144, 0.85)' 
      : 'transparent',
    backdropFilter: isScrolled ? 'blur(10px)' : 'none'
  };

  const desktopBackgroundStyle = {
    background: isScrolled 
      ? 'rgba(10, 10, 10, 0.8)' 
      : 'transparent',
    backdropFilter: isScrolled ? 'blur(10px)' : 'none'
  };

  return (
    <nav 
      style={isMobile ? mobileBackgroundStyle : desktopBackgroundStyle}
      className="navbar-container"
    >
      <div className="nav-content">
        <a href="#" className="logo">
          <Image 
            src="/images/logo-camilodev.png" 
            alt="Camilo Castillo Logo" 
            width={40} 
            height={40} 
            className="logo-image"
          />
        </a>
        
        {/* Desktop menu */}
        <div className="nav-links desktop-only">
          <a href="#sobre-mi" className="nav-link">
            {translations.nav.about}
          </a>
          <a href="#skills" className="nav-link">
            {translations.nav.skills}
          </a>
          <a href="#projects" className="nav-link">
            {translations.nav.projects}
          </a>
          <a href="#contact" className="nav-link">
            {translations.nav.contact}
          </a>
          <LanguageSwitcher />
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="mobile-menu-button"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {!isMenuOpen ? (
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          ) : (
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div 
        ref={menuRef}
        className="mobile-menu"
        style={{ height: 0, opacity: 0, overflow: 'hidden' }}
      >
        <div className="mobile-menu-content">
          <a href="#sobre-mi" className="mobile-nav-link">
            {translations.nav.about}
          </a>
          <a href="#skills" className="mobile-nav-link">
            {translations.nav.skills}
          </a>
          <a href="#projects" className="mobile-nav-link">
            {translations.nav.projects}
          </a>
          <a href="#experience" className="mobile-nav-link">
            {translations.nav.experience}
          </a>
          <a href="#contact" className="mobile-nav-link">
            {translations.nav.contact}
          </a>
          <div className="mobile-language-switcher">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
} 