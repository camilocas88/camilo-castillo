'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

interface SkillItem {
  name: string;
  percentage: number;
  icon: string;
}

interface SkillCategory {
  title: string;
  icon: string;
  skills: SkillItem[];
}

export default function Skills() {
  const { language } = useLanguage();
  
  const skillCategories: SkillCategory[] = [
    {
      title: language === 'es' ? 'Desarrollo Frontend' : 'Frontend Development',
      icon: '🎨',
      skills: [
        { name: 'Angular (2-19)', percentage: 95, icon: '🅰️' },
        { name: 'TypeScript', percentage: 90, icon: '📘' },
        { name: 'RxJS', percentage: 88, icon: '🔄' },
        { name: 'React', percentage: 85, icon: '⚛️' },
        { name: 'Vue.js', percentage: 80, icon: '💚' },
        { name: 'Next.js', percentage: 80, icon: '⚫' },
        { name: 'HTML5 & CSS3', percentage: 95, icon: '🌐' },
        { name: 'SCSS/SASS', percentage: 90, icon: '🎨' },
        { name: 'TailwindCSS', percentage: 85, icon: '🌊' },
        { name: 'JavaScript (ES6+)', percentage: 92, icon: '💛' }
      ]
    },
    {
      title: language === 'es' ? 'Backend & APIs' : 'Backend & APIs',
      icon: '⚡',
      skills: [
        { name: 'Node.js', percentage: 90, icon: '💚' },
        { name: 'NestJS', percentage: 85, icon: '🐱' },
        { name: 'Express.js', percentage: 88, icon: '🚂' },
        { name: 'Go (Golang)', percentage: 70, icon: '🐹' },
        { name: 'MongoDB', percentage: 88, icon: '🍃' },
        { name: 'PostgreSQL', percentage: 85, icon: '🐘' },
        { name: 'REST APIs', percentage: 95, icon: '🔗' },
        { name: 'GraphQL', percentage: 80, icon: '📊' }
      ]
    },
    {
      title: language === 'es' ? 'IA & DevOps' : 'AI & DevOps',
      icon: '🚀',
      skills: [
        { name: 'LangChain & OpenAI', percentage: 85, icon: '🤖' },
        { name: 'Docker & Kubernetes', percentage: 82, icon: '📦' },
        { name: 'AWS Services', percentage: 78, icon: '☁️' },
        { name: 'CI/CD (Jenkins)', percentage: 88, icon: '🔄' },
        { name: 'Apache Kafka', percentage: 75, icon: '📡' },
        { name: 'Microservices', percentage: 86, icon: '🏗️' },
        { name: 'Git & GitHub', percentage: 95, icon: '🌟' },
        { name: 'TDD & Testing', percentage: 85, icon: '🧪' }
      ]
    }
  ];
  
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);
  const isAnimationCompleted = useRef(false);
  
  // Asegurarse de que ScrollTrigger esté registrado
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);
  
  // Detectar velocidad de scroll para animaciones inteligentes
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity.current = Math.abs(currentScrollY - lastScrollY.current);
      lastScrollY.current = currentScrollY;
      
      // Si el scroll es muy rápido (> 50px), completar animaciones inmediatamente
      if (scrollVelocity.current > 50 && !isAnimationCompleted.current) {
        completeAllAnimations();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para completar todas las animaciones instantáneamente
  const completeAllAnimations = () => {
    if (isAnimationCompleted.current) return;
    
    isAnimationCompleted.current = true;
    
    progressBarRefs.current.forEach((progressBar) => {
      if (progressBar) {
        const percentage = parseInt(progressBar.getAttribute('data-percentage') || '0');
        const percentageElement = progressBar.parentElement?.previousElementSibling?.querySelector('.skill-percentage');
        
        // Completar barra inmediatamente
        gsap.set(progressBar, {
          width: percentage + '%',
          opacity: 1,
          scale: 1
        });
        
        // Mostrar porcentaje final
        if (percentageElement) {
          percentageElement.textContent = percentage + '%';
        }
      }
    });
  };

  // Configurar las animaciones GSAP mejoradas
  useEffect(() => {
    if (sectionRef.current) {
      // Asegurar que la sección sea visible inmediatamente
      sectionRef.current.classList.add('animated');
      sectionRef.current.style.opacity = '1';
      sectionRef.current.style.visibility = 'visible';
      sectionRef.current.style.display = 'block';
      
      // Timeout para asegurar que el DOM esté listo
      const timer = setTimeout(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            onEnter: () => {
              if (sectionRef.current) {
                sectionRef.current.classList.add('animated');
              }
            },
            onLeave: () => {
              // Al salir de la vista, marcar como completado para evitar re-animaciones
              isAnimationCompleted.current = true;
            },
            onLeaveBack: () => {
              if (sectionRef.current) {
                sectionRef.current.classList.remove('animated');
              }
              // Reset para permitir re-animación si vuelve
              isAnimationCompleted.current = false;
            }
          }
        });

      // Animación del título con efecto de escritura
      tl.fromTo(
        titleRef.current,
        { 
          y: 100, 
          opacity: 0,
          scale: 0.8,
          rotationX: 45
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1.2,
          ease: "back.out(1.7)"
        }
      );
      
      // Animar cada categoría con efectos 3D
      categoryRefs.current.forEach((category, index) => {
        if (category) {
          tl.fromTo(
            category,
            { 
              y: 150, 
              opacity: 0,
              scale: 0.7,
              rotationY: 45,
              transformOrigin: "center center"
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotationY: 0,
              duration: 1,
              ease: "power3.out"
            },
            `-=${0.7 - (index * 0.2)}`
          );

          // Animación hover para las categorías
          category.addEventListener('mouseenter', () => {
            gsap.to(category, {
              scale: 1.05,
              rotationY: 5,
              duration: 0.3,
              ease: "power2.out"
            });
          });

          category.addEventListener('mouseleave', () => {
            gsap.to(category, {
              scale: 1,
              rotationY: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        }
      });
      
      // Animaciones avanzadas para las barras de progreso con orden secuencial
      progressBarRefs.current.forEach((progressBar, globalIndex) => {
        if (progressBar) {
          const percentage = parseInt(progressBar.getAttribute('data-percentage') || '0');
          
          // Calcular índices de categoría y skill
          const currentCategoryIndex = Math.floor(globalIndex / 10);
          const currentSkillIndex = globalIndex % 10;
          
          // Delay secuencial: primero por categoría, luego por skill dentro de la categoría
          const sequentialDelay = (currentCategoryIndex * 0.3) + (currentSkillIndex * 0.15);
          
          // Animación de la barra con efecto elástico
          const barAnimation = tl.fromTo(
            progressBar,
            { 
              width: '0%',
              opacity: 0,
              scale: 0.8
            },
            {
              width: percentage + '%',
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: "power2.out",
              onUpdate: function() {
                // Efecto de parpadeo durante el llenado
                if (this.progress() < 0.9) {
                  gsap.to(progressBar, {
                    boxShadow: `0 0 ${8 + Math.random() * 8}px rgba(126, 74, 231, 0.6)`,
                    duration: 0.1
                  });
                }
              },
              onComplete: function() {
                // Pulso final cuando se completa
                gsap.to(progressBar, {
                  boxShadow: '0 0 15px rgba(126, 74, 231, 0.8)',
                  duration: 0.3,
                  yoyo: true,
                  repeat: 1
                });
              }
            },
            0.5 + sequentialDelay
          );

          // Animación del porcentaje contador sincronizada
          const percentageElement = progressBar.parentElement?.previousElementSibling?.querySelector('.skill-percentage');
          if (percentageElement) {
            const counterObject = { value: 0 };
            tl.to(
              counterObject,
              { 
                value: percentage,
                duration: 1.2,
                ease: "power2.out",
                onUpdate: function() {
                  if (percentageElement) {
                    percentageElement.textContent = Math.round(counterObject.value) + '%';
                  }
                }
              },
              0.5 + sequentialDelay
            );
          }

          // Sistema inteligente: auto-completar después de cierto tiempo
          const quickScrollTimer = setTimeout(() => {
            if (progressBar && percentageElement && !isAnimationCompleted.current) {
              // Si después de 4 segundos la animación no ha completado, acelerar suavemente
              gsap.to(progressBar, {
                width: percentage + '%',
                duration: 0.5,
                ease: "power2.out"
              });
              
              if (percentageElement) {
                const currentValue = parseInt(percentageElement.textContent?.replace('%', '') || '0');
                gsap.to({ value: currentValue }, {
                  value: percentage,
                  duration: 0.5,
                  ease: "power2.out",
                  onUpdate: function() {
                    if (percentageElement) {
                      percentageElement.textContent = Math.round(this.targets()[0].value) + '%';
                    }
                  }
                });
              }
            }
          }, 4000);

          // Cleanup del timer
          barAnimation.eventCallback("onComplete", () => {
            clearTimeout(quickScrollTimer);
          });

          // Marcar como completada cuando termine
          barAnimation.eventCallback("onComplete", () => {
            if (globalIndex === progressBarRefs.current.length - 1) {
              // Última animación completada
              isAnimationCompleted.current = true;
            }
          });
        }
      });

      // Efecto de partículas flotantes
      const createFloatingParticles = () => {
        const particles = [];
        for (let i = 0; i < 15; i++) {
          const particle = document.createElement('div');
          particle.className = 'floating-particle';
          particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
            border-radius: 50%;
            pointer-events: none;
            opacity: 0;
          `;
          sectionRef.current?.appendChild(particle);
          particles.push(particle);

          gsap.set(particle, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * 200 + 100
          });

          gsap.to(particle, {
            y: '-=200',
            x: `+=${Math.random() * 100 - 50}`,
            opacity: 1,
            duration: Math.random() * 3 + 2,
            ease: "none",
            repeat: -1,
            delay: Math.random() * 2
          });
        }
      };

        // Crear partículas cuando la sección está visible
        tl.call(createFloatingParticles, [], 0.5);
      }, 100);

      return () => {
        clearTimeout(timer);
      };
    }
  }, []);
  
  // Funciones para referencias
  const setCategoryRef = (el: HTMLDivElement | null, index: number) => {
    categoryRefs.current[index] = el;
  };
  
  const setProgressBarRef = (el: HTMLDivElement | null, index: number) => {
    progressBarRefs.current[index] = el;
  };
  
  return (
    <section id="skills" className="section skills-section animated" ref={sectionRef} style={{ opacity: 1, visibility: 'visible', display: 'block' }}>
      <h2 className="section-title skills-title" ref={titleRef}>
        {language === 'es' ? 'Experiencia Técnica' : 'Technical Expertise'}
      </h2>
      
      <div className="skills-progress-container">
        {skillCategories.map((category, categoryIndex) => (
                           <div
                   key={categoryIndex}
                   className="skill-category-card clickable"
                   ref={(el) => setCategoryRef(el, categoryIndex)}
                 >
            <div className="skill-category-header">
              <span className="skill-category-icon">{category.icon}</span>
              <h3 className="skill-category-title">{category.title}</h3>
            </div>
            
            <div className="skill-items">
              {category.skills.map((skill, skillIndex) => {
                const progressIndex = categoryIndex * 10 + skillIndex;
                return (
                  <div key={skillIndex} className="skill-progress-item">
                    <div className="skill-info">
                      <span className="skill-icon">{skill.icon}</span>
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.percentage}%</span>
                    </div>
                    <div className="progress-bar-container">
                      <div 
                        className="progress-bar"
                        data-percentage={skill.percentage}
                        ref={(el) => setProgressBarRef(el, progressIndex)}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 