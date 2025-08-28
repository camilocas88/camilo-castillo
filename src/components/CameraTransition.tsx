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

    // Mostrar el overlay de transición
    overlayRef.current.style.display = 'block';
    
    // Crear timeline de animación suave
    const tl = gsap.timeline({
      onComplete: () => {
        router.push(targetUrl);
      }
    });

    // 1. Fade in del overlay con blur
    tl.to(overlayRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out"
    });

    // 2. Efecto de desenfoque de la página
    tl.to("body", {
      filter: "blur(10px)",
      duration: 0.3,
      ease: "power2.inOut"
    }, "-=0.2");

    // 3. Escala suave de salida
    tl.to("main", {
      scale: 0.95,
      opacity: 0.7,
      duration: 0.3,
      ease: "power2.inOut"
    }, "-=0.2");
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
