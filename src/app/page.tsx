'use client';

import About from '@/components/About';
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import { useLanguage } from '@/i18n/LanguageContext';
import { gsap } from 'gsap';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const profileImage = "/images/camilo-castillo.png";
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  
  // Referencias para elementos animados
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const overlayRef = useRef(null);
  
  // Variable para usar mientras se arregla la importación de translations
  const t = {
    hero_subtitle: language === 'es' ? 'Desarrollador Web' : 'Web Developer',
    projects_button: language === 'es' ? 'Proyectos' : 'Projects',
    contact_button: language === 'es' ? 'Contacto' : 'Contact'
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  
  // Animación cuando la página se carga completamente
  useEffect(() => {
    if (!loading && heroRef.current) {
      // Timeline para secuenciar las animaciones
      const tl = gsap.timeline();
      
      // Animación del overlay de gradiente
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.inOut" }
      );
      
      // Animación del título con efecto de aparecer desde abajo
      tl.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" },
        "-=0.8" // Comenzar antes de que termine la animación anterior
      );
      
      // Animación del subtítulo
      tl.fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      );
      
      // Animación de los botones
      tl.fromTo(
        buttonsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      );
      
      // Animación sutil para toda la sección hero
      tl.fromTo(
        heroRef.current,
        { scale: 1.05 },
        { scale: 1, duration: 1.5, ease: "power2.out" },
        "-=1.2"
      );
    }
  }, [loading]);

  return (
    <main>
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="hero" ref={heroRef}>
          <div className="hero-background">
            <Image 
              src={profileImage} 
              alt="Camilo Castillo" 
              fill
              priority
              className="hero-bg-image"
            />
            <div className="hero-overlay" ref={overlayRef}></div>
          </div>
          
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title" ref={titleRef}>Camilo Castillo</h1>
              <h2 className="hero-subtitle" ref={subtitleRef}>{t.hero_subtitle}</h2>
            </div>
            <div className="hero-buttons" ref={buttonsRef}>
              <a href="#projects" className="button-primary">{t.projects_button}</a>
              <a href="#contact" className="button-secondary">{t.contact_button}</a>
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
