"use client";

import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ModernCapabilities from "@/components/ModernCapabilities";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import SmartLoader from "@/components/SmartLoader";
import SmoothTransition from "@/components/SmoothTransition";
import { useLanguage } from "@/i18n/LanguageContext";
import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Home() {
  const profileImage = "/images/camilo-castillo.png";
  const { language } = useLanguage();

  // Referencias para elementos animados
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const overlayRef = useRef(null);
  const imageRef = useRef(null);

  // Variable para usar mientras se arregla la importación de translations
  const t = {
    hero_greeting_start: language === "es" ? "Hola," : "Hey,",
    hero_greeting_end:
      language === "es"
        ? "Soy un Desarrollador Full Stack"
        : "I'm a Full Stack Developer",
    hero_description:
      language === "es"
        ? "Creo aplicaciones web rápidas, escalables y fáciles de usar con frameworks de JavaScript modernos — combinando React en el frontend con soluciones robustas del lado del servidor usando Node.js y tecnologías de IA."
        : "I craft fast, scalable, and user-friendly web applications with modern JavaScript frameworks — combining React on the frontend with robust server-side solutions using Node.js and AI technologies.",
    hero_subtitle: language === "es" ? "Desarrollador Web" : "Web Developer",
    projects_button: language === "es" ? "Proyectos" : "Projects",
    contact_button: language === "es" ? "Contacto" : "Contact",
    scroll_text: language === "es" ? "SCROLL" : "SCROLL",
  };

  // Animación cuando la página se carga completamente
  useEffect(() => {
    if (heroRef.current) {
      // Inicializar todos los elementos como invisibles para controlar la secuencia
      gsap.set([
        titleRef.current,
        subtitleRef.current,
        ".description-text",
        ".hire-me-button", 
        ".hero-contact",
        ".hero-social",
        ".hero-scroll",
        ".status-dot"
      ], { 
        opacity: 0,
        visibility: "hidden"
      });

      // Timeline principal con secuencia organizada
      const tl = gsap.timeline({ delay: 0.3 });

      // 1. FONDO - Animación del overlay de gradiente (base visual)
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.inOut" }
      );

      // 2. TÍTULO - Animación del nombre principal (elemento principal)
      tl.fromTo(
        titleRef.current,
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
          rotationX: -45,
          transformOrigin: "center bottom",
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          visibility: "visible",
          duration: 1.2,
          ease: "back.out(1.3)",
        },
        "-=0.8"
      );

      // 3. SALUDO - Animación del subtítulo con mano saludando
      tl.fromTo(
        subtitleRef.current,
        { x: -60, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          visibility: "visible",
          duration: 0.8, 
          ease: "power2.out" 
        },
        "-=0.4"
      );

      // 4. MANO SALUDANDO - Animación especial para la mano
      tl.call(() => {
        // Animación inicial más enérgica
        gsap.to(".waving-hand", {
          rotation: 20,
          duration: 0.3,
          ease: "power2.inOut",
          yoyo: true,
          repeat: 3,
          repeatDelay: 0.2,
        });
        
        // Loop infinito más sutil después
        setTimeout(() => {
          gsap.to(".waving-hand", {
            rotation: 15,
            duration: 0.4,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            repeatDelay: 2.5,
          });
        }, 2000);
      });

      // 5. DESCRIPCIÓN - Texto descriptivo
      tl.fromTo(
        ".description-text",
        { x: 40, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          visibility: "visible",
          duration: 0.8, 
          ease: "power2.out" 
        },
        "-=0.3"
      );

      // 6. BOTÓN CTA - Call to action (elemento importante)
      tl.fromTo(
        ".hire-me-button",
        { 
          y: 20, 
          opacity: 0,
          scale: 0.9
        },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          visibility: "visible",
          duration: 0.6, 
          ease: "back.out(1.5)" 
        },
        "-=0.2"
      );

      // 7. INFORMACIÓN DE CONTACTO - Datos de contacto
      tl.fromTo(
        ".hero-contact",
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          visibility: "visible",
          duration: 0.7, 
          ease: "power2.out" 
        },
        "-=0.4"
      );

      // 8. REDES SOCIALES - Links sociales con stagger
      tl.fromTo(
        ".hero-social",
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          visibility: "visible",
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.5"
      );

      tl.fromTo(
        ".hero-social .social-link",
        { x: 20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.08,
        },
        "-=0.3"
      );

      // 9. STATUS DOT - Indicador de disponibilidad
      tl.fromTo(
        ".status-dot",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          visibility: "visible",
          duration: 0.5,
          ease: "back.out(2)",
        },
        "-=0.8"
      );

      // 10. SCROLL INDICATOR - Último elemento de navegación
      tl.fromTo(
        ".hero-scroll",
        { opacity: 0, scale: 0, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          visibility: "visible",
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );

      // 11. IMAGEN DE FONDO - Aparece inmediatamente en su posición final
      tl.call(() => {
        if (imageRef.current) {
          (imageRef.current as HTMLElement).classList.add('loaded');
        }
      }, undefined, "+=0.1");

      // 12. EFECTO FINAL - Resplandor sutil en el título
      tl.to(titleRef.current, {
        textShadow: "0 0 20px rgba(126, 74, 231, 0.3)",
        duration: 0.8,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1
      }, "+=0.3");
    }
  }, []);

  return (
    <main>
      {/* Loader inteligente que se muestra solo mientras se cargan los recursos */}
      <SmartLoader minimumDisplayTime={800} />

      <div className="min-h-screen">
        {/* Hero Section - Modern Layout */}
        <section className="hero-modern" ref={heroRef}>
          {/* Status indicator */}
          <div className="hero-status">
            <div className="status-dot"></div>
          </div>

          {/* Main Name Brand */}
          <div className="hero-brand">
            <h1 className="brand-name" ref={titleRef}>
              CAMILO CASTILLO
            </h1>
          </div>

          {/* Greeting and Description */}
          <div className="hero-greeting">
            <p className="greeting-text" ref={subtitleRef}>
              {t.hero_greeting_start} <span className="waving-hand">👋</span>{" "}
              {t.hero_greeting_end}
            </p>
          </div>

          <div className="hero-description">
            <p className="description-text">{t.hero_description}</p>

            <SmoothTransition
              targetUrl="/contact-us"
              className="hire-me-button"
            >
              <span className="button-text">
                {language === "es" ? "Contrátame" : "Hire Me"}
              </span>
              <span className="button-arrow">↗</span>
            </SmoothTransition>
          </div>

          {/* Contact Info - Bottom Left */}
          <div className="hero-contact">
            <div className="contact-item">
              <span className="contact-label">E</span>
              <a
                href="mailto:camilo.castillo88@outlook.com"
                className="contact-link clickable"
              >
                camilo.castillo88@outlook.com
              </a>
            </div>
          </div>

          {/* Social Links - Bottom Right */}
          <div className="hero-social">
            <span className="social-separator">/</span>
            <a
              href="https://twitter.com/camilocas88"
              className="social-link clickable"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter (X)
            </a>
            <span className="social-separator">/</span>
            <a
              href="https://www.linkedin.com/in/camilocastillodev/"
              className="social-link clickable"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <span className="social-separator">/</span>
            <a
              href="https://github.com/camilocas88"
              className="social-link clickable"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <span className="social-separator">/</span>
            <a
              href="https://codepen.io/camilocas88"
              className="social-link clickable"
              target="_blank"
              rel="noopener noreferrer"
            >
              CodePen
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="hero-scroll">
            <span className="scroll-text">{t.scroll_text}</span>
          </div>

          {/* Background Image (subtle) */}
          <div className="hero-bg-container">
            <Image
              ref={imageRef}
              src={profileImage}
              alt="Camilo Castillo"
              fill
              priority
              className="hero-bg-subtle"
            />
            <div className="hero-overlay-modern" ref={overlayRef}></div>
          </div>
        </section>

        {/* About Section */}
        <About />
        <Skills />
        <ModernCapabilities />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
