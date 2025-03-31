'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { FaGraduationCap } from 'react-icons/fa';

export default function About() {
  const { translations } = useLanguage();
  const aboutData = translations.about;
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Registrar el plugin ScrollTrigger
  useEffect(() => {
    if (typeof window !== 'undefined' && gsap && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          if (sectionRef.current) {
            sectionRef.current.classList.add('animated');
          }
        },
        onLeaveBack: () => {
          if (sectionRef.current) {
            sectionRef.current.classList.remove('animated');
          }
        }
      });
    }
  }, []);
  
  // Configurar las animaciones cuando el componente se monte
  useEffect(() => {
    if (sectionRef.current) {
      // Animar el título
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
      
      // Animar la imagen
      gsap.fromTo(
        imageRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
      
      // Animar el contenido
      gsap.fromTo(
        contentRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  }, []);

  return (
    <section id="sobre-mi" className="section" ref={sectionRef}>
      <h2 className="section-title" ref={titleRef}>{aboutData.title}</h2>
      <div className="about-container">
        <div className="about-image-container" ref={imageRef}>
          <Image
            src="/images/profile.png" 
            alt="Camilo Castillo - Professional Photo"
            fill
            className="about-image"
            priority
          />
        </div>
        <div className="about-content" ref={contentRef}>
          {aboutData.paragraphs.map((paragraph: string, index: number) => (
            <p key={index} className="about-paragraph">
              {paragraph}
            </p>
          ))}
          
          <div className="about-info">
            <div className="about-info-item">
              <FaGraduationCap className="about-info-icon" />
              <span className="about-info-label">{aboutData.education_label}</span>
              <span>{aboutData.education}</span>
            </div>
          </div>
          
          <div className="about-languages">
            <h3 className="about-languages-title">{aboutData.languages.title}</h3>
            <div className="about-languages-list">
              {aboutData.languages.list.map((language: string, index: number) => (
                <span key={index} className="about-language">
                  {language}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 