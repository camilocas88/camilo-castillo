'use client';

import { useEffect, useState } from 'react';
import { FaCode } from 'react-icons/fa';

interface SmartLoaderProps {
  minimumDisplayTime?: number; // Tiempo mínimo en milisegundos que se mostrará el loader
}

const SmartLoader = ({ minimumDisplayTime = 500 }: SmartLoaderProps) => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Variable para rastrear cuándo comenzó a cargarse la página
    const startTime = Date.now();
    
    // Función que comprueba si debe ocultarse el loader
    const hideLoader = () => {
      const elapsedTime = Date.now() - startTime;
      
      // Si ha pasado al menos el tiempo mínimo, iniciar animación de desvanecimiento
      if (elapsedTime >= minimumDisplayTime) {
        setFadeOut(true);
        // Después de la animación, ocultar completamente
        setTimeout(() => setLoading(false), 500);
      } else {
        // Si no ha pasado suficiente tiempo, esperar lo que falte
        const remainingTime = minimumDisplayTime - elapsedTime;
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => setLoading(false), 500);
        }, remainingTime);
      }
    };

    // Esperar a que todas las imágenes y fuentes estén cargadas
    Promise.all([
      // Esperar a que se cargue el documento completo
      document.readyState === 'complete' 
        ? Promise.resolve() 
        : new Promise(resolve => {
            window.addEventListener('load', resolve, { once: true });
          }),
      
      // Esperar a que las fuentes se carguen
      document.fonts.ready
    ])
    .then(hideLoader)
    .catch(error => {
      console.error('Error al cargar recursos:', error);
      hideLoader(); // Ocultar el loader incluso si hay errores
    });

    return () => {
      // Limpieza (por si el componente se desmonta antes)
    };
  }, [minimumDisplayTime]);

  // No renderizar nada si no está cargando
  if (!loading) return null;

  return (
    <div className={`smart-loader ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loader-content">
        <div className="loader-spinner">
          <FaCode className="loader-icon" />
        </div>
        <p className="loader-text">Cargando recursos...</p>
      </div>
    </div>
  );
};

export default SmartLoader; 