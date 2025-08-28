'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { gsap } from 'gsap';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { translations } = useLanguage();
  const menuRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  // Función para manejar navegación a secciones
  const handleNavigation = (sectionId: string) => {
    // Si no estamos en la página principal, navegar primero a home
    if (pathname !== '/') {
      router.push(`/#${sectionId}`);
    } else {
      // Si ya estamos en home, simplemente hacer scroll a la sección
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    // Cerrar menú móvil si está abierto
    setIsMenuOpen(false);
  };

  // Función para navegar al home
  const handleHomeNavigation = () => {
    router.push('/');
    setIsMenuOpen(false);
  };
  
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
        <button onClick={handleHomeNavigation} className="logo">
          <Image 
            src="/images/logo-camilodev.png" 
            alt="Camilo Castillo Logo" 
            width={40} 
            height={40} 
            className="logo-image"
          />
        </button>
        
        {/* Desktop menu */}
        <div className="nav-links desktop-only">
          <button onClick={() => handleNavigation('sobre-mi')} className="nav-link">
            {translations.nav.about}
          </button>
          <button onClick={() => handleNavigation('skills')} className="nav-link">
            {translations.nav.skills}
          </button>
          <button onClick={() => handleNavigation('projects')} className="nav-link">
            {translations.nav.projects}
          </button>
          <button onClick={() => handleNavigation('experience')} className="nav-link">
            {translations.nav.experience}
          </button>
          <button onClick={() => handleNavigation('contact')} className="nav-link">
            {translations.nav.contact}
          </button>
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
          <button onClick={() => handleNavigation('sobre-mi')} className="mobile-nav-link">
            {translations.nav.about}
          </button>
          <button onClick={() => handleNavigation('skills')} className="mobile-nav-link">
            {translations.nav.skills}
          </button>
          <button onClick={() => handleNavigation('projects')} className="mobile-nav-link">
            {translations.nav.projects}
          </button>
          <button onClick={() => handleNavigation('experience')} className="mobile-nav-link">
            {translations.nav.experience}
          </button>
          <button onClick={() => handleNavigation('contact')} className="mobile-nav-link">
            {translations.nav.contact}
          </button>
          <div className="mobile-language-switcher">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
} 