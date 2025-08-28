'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

interface CapabilityItem {
  name: string;
  icon: string;
  description: string[];
}

export default function ModernCapabilities() {
  const { language } = useLanguage();
  
  const capabilities: CapabilityItem[] = [
    {
      name: language === 'es' ? 'WebGL & 3D' : 'WebGL & 3D',
      icon: '🎮',
      description: [
        'Three.js',
        'WebGL Shaders',
        language === 'es' ? 'Optimización de rendimiento' : 'Performance optimization'
      ]
    },
    {
      name: language === 'es' ? 'Progressive Web Apps' : 'Progressive Web Apps',
      icon: '📱',
      description: [
        language === 'es' ? 'Soporte offline' : 'Offline support',
        language === 'es' ? 'Notificaciones push' : 'Push notifications',
        language === 'es' ? 'Experiencia tipo app' : 'App-like experience'
      ]
    },
    {
      name: language === 'es' ? 'Características en Tiempo Real' : 'Real-time Features',
      icon: '⚡',
      description: [
        'WebSockets',
        'WebRTC',
        language === 'es' ? 'Eventos Server-Sent' : 'Server-Sent Events'
      ]
    },
    {
      name: language === 'es' ? 'APIs del Navegador' : 'Browser APIs',
      icon: '🔧',
      description: [
        language === 'es' ? 'Acceso al sistema de archivos' : 'File System Access',
        'Web Workers',
        'Service Workers'
      ]
    },
    {
      name: language === 'es' ? 'Rendimiento' : 'Performance',
      icon: '🚀',
      description: [
        'Code splitting',
        'Tree shaking',
        language === 'es' ? 'Optimización de recursos' : 'Resource optimization'
      ]
    },
    {
      name: language === 'es' ? 'Seguridad' : 'Security',
      icon: '🔒',
      description: [
        'CSP',
        language === 'es' ? 'Configuración CORS' : 'CORS configuration',
        language === 'es' ? 'Headers de seguridad' : 'Security headers'
      ]
    }
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Registrar ScrollTrigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  // Configurar animaciones GSAP
  useEffect(() => {
    if (sectionRef.current) {
      // Asegurar que la sección sea visible
      sectionRef.current.classList.add('animated');
      
      // Timeline principal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      });

      // Animación del título
      tl.fromTo(
        titleRef.current,
        { 
          y: 100, 
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)"
        }
      );

      // Animación de las tarjetas con efecto stagger
      cardRefs.current.forEach((card, index) => {
        if (card) {
          tl.fromTo(
            card,
            { 
              y: 120, 
              opacity: 0,
              scale: 0.8,
              rotationY: 25
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotationY: 0,
              duration: 0.8,
              ease: "power3.out"
            },
            `-=${0.6 - (index * 0.1)}`
          );

          // Animación hover para cada tarjeta
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              scale: 1.05,
              rotationY: 5,
              z: 50,
              duration: 0.3,
              ease: "power2.out"
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              scale: 1,
              rotationY: 0,
              z: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        }
      });
    }
  }, []);

  // Función para establecer referencias de tarjetas
  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    cardRefs.current[index] = el;
  };

  return (
    <section id="capabilities" className="section capabilities-section animated" ref={sectionRef}>
      <h2 className="section-title capabilities-title" ref={titleRef}>
        {language === 'es' ? 'Capacidades Web Modernas' : 'Modern Web Capabilities'}
      </h2>
      
      <div className="capabilities-container">
        {capabilities.map((capability, index) => (
          <div 
            key={index}
            className="capability-card"
            ref={(el) => setCardRef(el, index)}
          >
            <div className="capability-icon">
              {capability.icon}
            </div>
            <h3 className="capability-title">
              {capability.name}
            </h3>
            <div className="capability-description">
              {capability.description.map((item, itemIndex) => (
                <div key={itemIndex} className="capability-item">
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
