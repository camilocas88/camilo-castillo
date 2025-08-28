'use client';

import { gsap } from 'gsap';
import { useEffect } from 'react';

export default function TransitionCleanup() {
  useEffect(() => {
    // Limpiar cualquier efecto de transición residual al cargar la página
    const cleanupEffects = () => {
      // Limpiar filtros y transformaciones del body
      gsap.set("body", {
        filter: "none",
        transform: "none",
        clearProps: "all"
      });

      // Limpiar filtros y transformaciones del main
      gsap.set("main", {
        filter: "none",
        transform: "none",
        scale: 1,
        opacity: 1,
        clearProps: "all"
      });

      // Ocultar cualquier overlay de transición
      const overlays = document.querySelectorAll('.smooth-transition-overlay');
      overlays.forEach(overlay => {
        if (overlay instanceof HTMLElement) {
          overlay.style.display = 'none';
          overlay.style.opacity = '0';
        }
      });
    };

    // Ejecutar limpieza inmediatamente
    cleanupEffects();

    // También ejecutar después de un pequeño delay para asegurar que se aplique
    const timeoutId = setTimeout(cleanupEffects, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return null; // Este componente no renderiza nada
}
