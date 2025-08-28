'use client';

import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

interface SmoothTransitionProps {
  targetUrl: string;
  className?: string;
  children: React.ReactNode;
}

export default function SmoothTransition({ targetUrl, className = '', children }: SmoothTransitionProps) {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!overlayRef.current) return;

    // Agregar clases de transición temporalmente
    document.body.classList.add('transitioning');
    document.querySelector('main')?.classList.add('transitioning');

    // Mostrar el overlay de transición
    overlayRef.current.style.display = 'block';
    
    // Crear timeline de animación suave
    const tl = gsap.timeline({
      onComplete: () => {
        // Limpiar clases antes de navegar
        document.body.classList.remove('transitioning');
        document.querySelector('main')?.classList.remove('transitioning');
        
        // Limpiar estilos inline
        gsap.set("main", { clearProps: "all" });
        gsap.set("body", { clearProps: "all" });
        
        router.push(targetUrl);
      }
    });

    // 1. Fade in del overlay
    tl.to(overlayRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out"
    });

    // 2. Efecto suave solo en el main
    tl.to("main", {
      filter: "blur(3px)",
      scale: 0.99,
      opacity: 0.9,
      duration: 0.2,
      ease: "power2.inOut"
    }, "-=0.1");
  };

  return (
    <>
      <button 
        onClick={handleClick}
        className={`smooth-transition-trigger ${className}`}
      >
        {children}
      </button>

      {/* Overlay de transición suave */}
      <div 
        ref={overlayRef}
        className="smooth-transition-overlay"
        style={{ display: 'none', opacity: 0 }}
      >
        <div className="transition-content">
          <div className="loading-spinner"></div>
          <p className="transition-text">Navegando...</p>
        </div>
      </div>
    </>
  );
}
