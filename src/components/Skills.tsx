'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

type SkillCategory = 'frontend' | 'mobile' | 'backend' | 'testing' | 'devops' | 'soft';

interface SkillGroup {
  category: SkillCategory;
  items: string[];
}

export default function Skills() {
  const { translations } = useLanguage();
  
  const skills: SkillGroup[] = [
    { 
      category: 'frontend', 
      items: [
        'HTML5', 
        'CSS3', 
        'JavaScript', 
        'TypeScript',
        'Angular', 
        'React', 
        'Next.js', 
        'Vue.js',
        'TailwindCSS',
        'Bootstrap',
        'Material UI',
        'PrimeNG'
      ] 
    },
    { 
      category: 'mobile', 
      items: [
        'Flutter', 
        'Ionic', 
        'Mobile Applications'
      ] 
    },
    { 
      category: 'backend', 
      items: [
        'Node.js', 
        'NestJS',
        'Express', 
        'MongoDB', 
        'PostgreSQL',
        'MEAN Stack',
        'AWS',
        'Kafka',
        'Cognito',
        'Firebase',
        'Cloudflare'
      ] 
    },
    { 
      category: 'testing', 
      items: [
        'Jasmine',
        'Jest.js',
        'Unit Testing',
        'Cypress',
        'Selenium',
        'Postman',
        'Swagger'
      ] 
    },
    { 
      category: 'devops', 
      items: [
        'Jenkins',
        'Git', 
        'GitHub', 
        'VS Code', 
        'Figma', 
        'Docker',
        'Microservices',
        'Feature Flags',
        'CI/CD',
        'Rancher',
        'Kubernetes',
        'Grafana',
        'Harness',
        'Azure DevOps'
      ]
    },
    { 
      category: 'soft', 
      items: [
        'Negotiation',
        'Leadership',
        'Team Collaboration',
        'Communication',
        'Problem Solving',
        'Adaptability',
        'Time Management',
        'Proactivity',
        'Creativity',
        'Teamwork'
      ] 
    }
  ];
  
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Asegurarse de que ScrollTrigger esté registrado
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);
  
  // Configurar las animaciones
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
      
      // Animar cada tarjeta de habilidades con un ligero retraso entre ellas
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 70, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.2 * index,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      });
      
      // Añadir clase para animaciones CSS
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
  
  // Inicializar la referencia para las tarjetas
  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    cardsRef.current[index] = el;
  };
  
  return (
    <section id="skills" className="section" ref={sectionRef}>
      <h2 className="section-title" ref={titleRef}>{translations.nav.skills}</h2>
      
      <div className="skills-container">
        {skills.map((skillGroup, groupIndex) => (
          <div 
            key={skillGroup.category} 
            className="skill-card"
            ref={(el) => setCardRef(el, groupIndex)}
          >
            <h3 className="skill-category">{translations.skills.categories[skillGroup.category]}</h3>
            
            <div className="skills-grid">
              {skillGroup.items.map((skill, index) => (
                <div 
                  key={skill} 
                  className="skill-item"
                  style={{ 
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 