'use client';

import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const cursorPosition = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const isClicking = useRef(false);
  const animationFrame = useRef<number>(0);

  // Función para crear partículas al hacer click
  const createClickParticles = (x: number, y: number) => {
    const particleCount = 6;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'cursor-particle';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      
      // Direcciones aleatorias para las partículas
      const angle = (i / particleCount) * Math.PI * 2;
      const distance = 20 + Math.random() * 20;
      const randomX = Math.cos(angle) * distance;
      const randomY = Math.sin(angle) * distance;
      
      particle.style.setProperty('--random-x', `${randomX}px`);
      particle.style.setProperty('--random-y', `${randomY}px`);
      
      document.body.appendChild(particle);
      
      // Remover partícula después de la animación
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 800);
    }
  };

  // Función para detectar elementos interactivos
  const isInteractiveElement = (element: Element): boolean => {
    const interactiveTags = ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'];
    const interactiveClasses = ['clickable', 'skill-category-card', 'capability-card', 'project-card'];
    
    return (
      interactiveTags.includes(element.tagName) ||
      element.getAttribute('role') === 'button' ||
      (element as HTMLElement).style.cursor === 'pointer' ||
      interactiveClasses.some(className => element.classList.contains(className)) ||
      element.closest('a, button, [role="button"], .clickable, .skill-category-card, .capability-card, .project-card') !== null
    );
  };

  useEffect(() => {
    // Animación suave del cursor
    const animateCursor = () => {
      if (!cursorRef.current || !cursorDotRef.current) return;

      // Movimiento suave con lerp (interpolación lineal)
      const speed = 0.15;
      const dotSpeed = 0.08;
      
      cursorPosition.current.x += (mousePosition.current.x - cursorPosition.current.x) * speed;
      cursorPosition.current.y += (mousePosition.current.y - cursorPosition.current.y) * speed;

      // Posicionar cursor principal (punto)
      cursorRef.current.style.transform = `translate(${cursorPosition.current.x - 4}px, ${cursorPosition.current.y - 4}px)`;
      
      // Posicionar cursor secundario (círculo) con delay
      const dotX = cursorPosition.current.x + (mousePosition.current.x - cursorPosition.current.x) * dotSpeed;
      const dotY = cursorPosition.current.y + (mousePosition.current.y - cursorPosition.current.y) * dotSpeed;
      cursorDotRef.current.style.transform = `translate(${dotX - 16}px, ${dotY - 16}px)`;

      animationFrame.current = requestAnimationFrame(animateCursor);
    };
    // Verificar si es un dispositivo táctil
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!cursor || !cursorDot) return;

    // Manejar movimiento del mouse
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current.x = e.clientX;
      mousePosition.current.y = e.clientY;

      // Detectar si está sobre un elemento interactivo
      const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
      const shouldHover = elementUnderCursor ? isInteractiveElement(elementUnderCursor) : false;

      if (shouldHover !== isHovering.current) {
        isHovering.current = shouldHover;
        
        if (shouldHover) {
          cursor.classList.add('hover');
          cursorDot.classList.add('hover');
        } else {
          cursor.classList.remove('hover');
          cursorDot.classList.remove('hover');
        }
      }
    };

    // Manejar entrada del mouse
    const handleMouseEnter = () => {
      cursor.classList.remove('hidden');
      cursorDot.classList.remove('hidden');
      cursor.classList.add('appear');
      cursorDot.classList.add('appear');
    };

    // Manejar salida del mouse
    const handleMouseLeave = () => {
      cursor.classList.add('hidden');
      cursorDot.classList.add('hidden');
      cursor.classList.remove('appear');
      cursorDot.classList.remove('appear');
    };

    // Manejar click
    const handleMouseDown = (e: MouseEvent) => {
      isClicking.current = true;
      cursor.classList.add('active');
      cursorDot.classList.add('active');
      
      // Crear partículas en la posición del click
      createClickParticles(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      isClicking.current = false;
      cursor.classList.remove('active');
      cursorDot.classList.remove('active');
    };

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Iniciar animación
    animationFrame.current = requestAnimationFrame(animateCursor);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  // No renderizar en dispositivos táctiles
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  if (isTouchDevice) return null;

  return (
    <>
      {/* Cursor principal (punto) */}
      <div 
        ref={cursorRef} 
        className="custom-cursor hidden"
        style={{ 
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999
        }}
      />
      
      {/* Cursor secundario (círculo) */}
      <div 
        ref={cursorDotRef} 
        className="custom-cursor-dot hidden"
        style={{ 
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9998
        }}
      />
    </>
  );
};

export default CustomCursor;
