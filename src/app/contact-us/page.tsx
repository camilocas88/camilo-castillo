'use client';

import Navbar from '@/components/Navbar';
import { useLanguage } from '@/i18n/LanguageContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

export default function ContactUs() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectDescription: ''
  });

  const heroRef = useRef(null);
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);

  const t = {
    title: language === 'es' ? "CONECTEMOS Y\nCOLABOREMOS" : "LET'S CONNECT &\nCOLLABORATE",
    subtitle: language === 'es' ? '// Ponte en Contacto' : '// Get In Touch',
    description: language === 'es' ? 
      '¿Tienes un proyecto en mente? ¡Hagámoslo realidad! Envíanos un mensaje y nos conectaremos contigo pronto.' :
      'Have a project in mind? Let\'s make it happen! Drop us a message, and we\'ll connect with you soon.',
    nameLabel: language === 'es' ? 'Nombre' : 'Name',
    emailLabel: language === 'es' ? 'Email' : 'Email',
    projectLabel: language === 'es' ? 'Descripción del Proyecto' : 'Project Description',
    namePlaceholder: language === 'es' ? 'Tu nombre' : 'Your name',
    emailPlaceholder: language === 'es' ? 'Dirección de email' : 'Email address',
    projectPlaceholder: language === 'es' ? 'Escribe los detalles de tu proyecto' : 'Write your project details',
    sendButton: language === 'es' ? 'Enviar Mensaje' : 'Send Your Message',
    bookMeeting: language === 'es' ? 'Reservar una Reunión' : 'Book a Meeting',
    socialLinks: {
      twitter: { text: 'Twitter (X)', url: 'https://twitter.com/camilocas88' },
      linkedin: { text: 'LinkedIn', url: 'https://www.linkedin.com/in/camilocas88/' },
      github: { text: 'GitHub', url: 'https://github.com/camilocas88' },
      codepen: { text: 'CodePen', url: 'https://codepen.io/camilocas88' }
    }
  };

  // Animaciones GSAP
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (heroRef.current) {
      const tl = gsap.timeline({ delay: 0.5 });

      // Animación del título
      tl.fromTo(
        titleRef.current,
        { 
          y: 100, 
          opacity: 0,
          rotationX: -45
        },
        { 
          y: 0, 
          opacity: 1, 
          rotationX: 0,
          duration: 1.2, 
          ease: "power3.out" 
        }
      );

      // Animación del subtítulo
      tl.fromTo(
        ".contact-subtitle",
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.8"
      );

      // Animación de la descripción
      tl.fromTo(
        ".contact-description",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      );

      // Animación del formulario
      tl.fromTo(
        formRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.4"
      );

      // Animación de la imagen de código
      tl.fromTo(
        imageRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)" },
        "-=1"
      );

      // Animación de los links sociales
      tl.fromTo(
        ".contact-social",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      );
    }
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Limpiar mensaje de estado al escribir
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: language === 'es' 
            ? '¡Mensaje enviado exitosamente! Te contactaré pronto.' 
            : 'Message sent successfully! I\'ll get back to you soon.'
        });
        
        // Limpiar formulario
        setFormData({
          name: '',
          email: '',
          projectDescription: ''
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || (
            language === 'es' 
              ? 'Error al enviar el mensaje. Inténtalo de nuevo.' 
              : 'Error sending message. Please try again.'
          )
        });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus({
        type: 'error',
        message: language === 'es' 
          ? 'Error de conexión. Verifica tu internet e inténtalo de nuevo.' 
          : 'Connection error. Check your internet and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="contact-page">
      <Navbar />
      <section className="contact-hero" ref={heroRef}>
        {/* Subtitle */}
        <div className="contact-subtitle-container">
          <span className="contact-subtitle">{t.subtitle}</span>
        </div>

        {/* Main Content Grid */}
        <div className="contact-main-grid">
          {/* Left Side - Content & Image */}
          <div className="contact-left-section">
            {/* Title */}
            <h1 className="contact-title" ref={titleRef}>
              {t.title}
            </h1>
            
            <p className="contact-description">
              {t.description}
            </p>

            {/* Code Image */}
            <div className="contact-image" ref={imageRef}>
              <div className="code-image-container">
                <div className="status-indicator"></div>
                <div className="code-mockup">
                  <div className="code-line">{'<div class="portfolio">'}</div>
                  <div className="code-line">{'  <h1>Camilo Castillo</h1>'}</div>
                  <div className="code-line">{'  <p>Full Stack Developer</p>'}</div>
                  <div className="code-line">{'  <skills>'}</div>
                  <div className="code-line">{'    Angular | React | Node.js'}</div>
                  <div className="code-line">{'    AI & Machine Learning'}</div>
                  <div className="code-line">{'  </skills>'}</div>
                  <div className="code-line">{'</div>'}</div>
                </div>
              </div>
            </div>

            {/* Bottom Section with Services */}
            <div className="contact-services">
              <div className="service-item">
                <span className="service-number">(01)</span>
                <div className="service-content">
                  <h3 className="service-title">Custom Web Development</h3>
                  <p className="service-desc">Build complete web applications from scratch — frontend to backend — optimized for speed, security, and scalability.</p>
                </div>
              </div>

              <div className="service-item">
                <span className="service-number">(02)</span>
                <div className="service-content">
                  <h3 className="service-title">Frontend Engineering</h3>
                </div>
              </div>

              <div className="service-item">
                <span className="service-number">(03)</span>
                <div className="service-content">
                  <h3 className="service-title">Server logic & API Development</h3>
                </div>
              </div>

              <div className="service-item">
                <span className="service-number">(04)</span>
                <div className="service-content">
                  <h3 className="service-title">Full Stack Application Development</h3>
                </div>
              </div>
            </div>

            {/* Social Links & Contact Info */}
            <div className="contact-bottom">
              <div className="contact-social">
                <span className="social-separator">/</span>
                <a 
                  href={t.socialLinks.twitter.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  {t.socialLinks.twitter.text}
                </a>
                <span className="social-separator">/</span>
                <a 
                  href={t.socialLinks.linkedin.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  {t.socialLinks.linkedin.text}
                </a>
                <span className="social-separator">/</span>
                <a 
                  href={t.socialLinks.github.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  {t.socialLinks.github.text}
                </a>
                <span className="social-separator">/</span>
                <a 
                  href={t.socialLinks.codepen.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  {t.socialLinks.codepen.text}
                </a>
              </div>

              <div className="contact-info">
                <div className="contact-info-item">
                  <span className="contact-icon">📅</span>
                  <a 
                    href="https://calendly.com/camilo-castillo88" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    {t.bookMeeting}
                  </a>
                </div>
                <div className="contact-info-item">
                  <span className="contact-icon">✉️</span>
                  <a 
                    href="mailto:camilo.castillo88@outlook.com"
                    className="contact-link"
                  >
                    camilo.castillo88@outlook.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="contact-form-container" ref={formRef}>
            <form className="contact-form" onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  {t.nameLabel}<span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t.namePlaceholder}
                  className="form-input"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  {t.emailLabel}<span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t.emailPlaceholder}
                  className="form-input"
                  required
                />
              </div>

              {/* Project Description Field */}
              <div className="form-group">
                <label htmlFor="projectDescription" className="form-label">
                  {t.projectLabel}<span className="required">*</span>
                </label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  placeholder={t.projectPlaceholder}
                  className="form-textarea"
                  rows={6}
                  required
                />
              </div>

              {/* Status Message */}
              {submitStatus.type && (
                <div className={`form-status ${submitStatus.type === 'success' ? 'form-status-success' : 'form-status-error'}`}>
                  {submitStatus.message}
                </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit" 
                className={`btn btn-primary btn-lg ${isSubmitting ? 'btn-loading' : ''}`}
                disabled={isSubmitting}
              >
                <span>
                  {isSubmitting 
                    ? (language === 'es' ? 'Enviando...' : 'Sending...') 
                    : t.sendButton
                  }
                </span>
                {!isSubmitting && <span className="ml-2">→</span>}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
