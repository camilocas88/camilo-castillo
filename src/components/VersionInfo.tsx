'use client';

import { getVersionInfo } from '@/utils/version';
import { useEffect, useState } from 'react';
import { FaCode } from 'react-icons/fa';

/**
 * Componente que muestra la información de versión de la aplicación
 * Muestra la versión del package.json y opcionalmente el hash de commit corto si está disponible
 */
const VersionInfo = () => {
  const [versionInfo, setVersionInfo] = useState({
    version: '',
    buildDate: '',
    environment: '',
    buildId: '',
  });

  useEffect(() => {
    // Obtener información de versión
    const info = getVersionInfo();
    setVersionInfo(info);
  }, []);
  
  // Formatear la fecha en formato legible
  const formattedDate = versionInfo.buildDate 
    ? new Date(versionInfo.buildDate).toLocaleDateString() 
    : '';
  
  // Obtener hash corto para mostrar
  const shortHash = versionInfo.buildId 
    ? (typeof versionInfo.buildId === 'string' 
      ? versionInfo.buildId.substring(0, 7) 
      : versionInfo.buildId)
    : '';
  
  return (
    <div className="version-info">
      <span className="version-icon">
        <FaCode />
      </span>
      <span className="version-text">
        v{versionInfo.version}
        {shortHash && <span className="version-commit"> ({shortHash})</span>}
        {formattedDate && <span className="version-date"> - {formattedDate}</span>}
        {versionInfo.environment === 'development' && (
          <span className="version-env"> [DEV]</span>
        )}
      </span>
    </div>
  );
};

export default VersionInfo; 