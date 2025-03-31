/**
 * Este archivo contiene la configuración de versión del proyecto.
 * Se puede actualizar manualmente o mediante scripts durante el despliegue.
 */

// Establecer la versión actual del proyecto (siguiendo SemVer: MAJOR.MINOR.PATCH)
const VERSION = {
  // Versión del proyecto (actualizar manualmente al hacer cambios importantes)
  MAJOR: 0,
  MINOR: 2,
  PATCH: 0,
  
  // Información de despliegue (se actualiza automáticamente durante el deployment)
  BUILD_NUMBER: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'dev',
  BUILD_DATE: new Date().toISOString(),
  ENVIRONMENT: process.env.NODE_ENV || 'development',
};

// Formatear la versión en formato semántico: MAJOR.MINOR.PATCH
const VERSION_STRING = `${VERSION.MAJOR}.${VERSION.MINOR}.${VERSION.PATCH}`;

// Crear configuración de versión
const versionConfig = {
  // Versión semántica completa: X.Y.Z
  VERSION: VERSION_STRING,
  
  // Componentes individuales de la versión
  VERSION_MAJOR: VERSION.MAJOR,
  VERSION_MINOR: VERSION.MINOR,
  VERSION_PATCH: VERSION.PATCH,
  
  // Información del despliegue
  BUILD_NUMBER: VERSION.BUILD_NUMBER,
  BUILD_DATE: VERSION.BUILD_DATE,
  ENVIRONMENT: VERSION.ENVIRONMENT,
  
  // Métodos para obtener información formateada
  getFullVersionString: () => {
    // Versión con build: X.Y.Z (build)
    const buildId = typeof VERSION.BUILD_NUMBER === 'string' 
      ? VERSION.BUILD_NUMBER.substring(0, 7) 
      : VERSION.BUILD_NUMBER;
    return `${VERSION_STRING} (${buildId})`;
  },
  
  // Es versión de desarrollo o producción
  isDev: VERSION.ENVIRONMENT !== 'production',
  isProd: VERSION.ENVIRONMENT === 'production',
};

export default versionConfig; 