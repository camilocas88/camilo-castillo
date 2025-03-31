'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Contact() {
  const { translations } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Register ScrollTrigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);
  
  // Configure animations
  useEffect(() => {
    if (sectionRef.current) {
      // Add animated class to ensure section is visible
      sectionRef.current.classList.add('animated');
      
      // Animate title
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
      
      // Animate contact content
      gsap.fromTo(
        formRef.current,
        { 
          x: -50, 
          opacity: 0 
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
      
      // Animate social links
      gsap.fromTo(
        socialRef.current,
        { 
          x: 50, 
          opacity: 0 
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  }, []);
  
  return (
    <section id="contact" className="section animated" ref={sectionRef}>
      <h2 className="section-title" ref={titleRef}>{translations.contact_title}</h2>
      
      <div className="contact-container">
        <div className="contact-form" ref={formRef}>
          <p className="contact-text">
            {translations.contact_description}
          </p>
          
          <a href="mailto:camilo.castillo88@outlook.com" className="contact-email-button" title="camilo.castillo88@outlook.com">
            <FaEnvelope className="contact-icon" />
            {isMobile ? translations.email_me : 'camilo.castillo88@outlook.com'}
          </a>
        </div>
        
        <div className="contact-social" ref={socialRef}>
          <h3 className="contact-social-title">{translations.social_title}</h3>
          
          <div className="social-links">
            <a href="https://github.com/camilocas88" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaGithub className="social-icon" />
              <span>GitHub</span>
            </a>
            
            <a href="https://linkedin.com/in/camilo-castilloc" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaLinkedin className="social-icon" />
              <span>LinkedIn</span>
            </a>
            
            <a href="https://twitter.com/camilocastillo_" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaTwitter className="social-icon" />
              <span>Twitter</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 