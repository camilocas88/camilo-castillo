'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const { translations } = useLanguage();
  
  // Usar los proyectos desde las traducciones
  const projects = translations.projects?.items || [];
  
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Registrar ScrollTrigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);
  
  // Configurar animaciones
  useEffect(() => {
    if (sectionRef.current) {
      // Añadir la clase animated para asegurar que la sección sea visible
      sectionRef.current.classList.add('animated');
      
      // Animar título
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
      
      // Animar proyectos con efecto escalonado
      projectsRef.current.forEach((project, index) => {
        gsap.fromTo(
          project,
          { 
            y: 100, 
            opacity: 0 
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.2 * index,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }
  }, []);
  
  // Inicializar refs para los proyectos
  const setProjectRef = (el: HTMLDivElement | null, index: number) => {
    projectsRef.current[index] = el;
  };
  
  return (
    <section id="projects" className="section animated" ref={sectionRef}>
      <h2 className="section-title" ref={titleRef}>{translations.nav.projects}</h2>
      
      <div className="projects-container">
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            ref={(el) => setProjectRef(el, index)}
            style={{ height: '100%' }}
          >
            <ProjectCard
              title={project.title}
              company={project.company}
              date={project.date}
              stack={project.stack}
              description={project.description}
            />
          </div>
        ))}
      </div>
    </section>
  );
} 