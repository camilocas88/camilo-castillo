/**
 * Archivo de utilidades para gestionar la información de versión de la aplicación
 */

// Importar configuración de versión
import versionConfig from '../config/version.config';

// Versión desde la configuración 
export const APP_VERSION = versionConfig.VERSION;

// Entorno de ejecución (desarrollo o producción)
export const IS_PRODUCTION = versionConfig.isProd;

// Fecha de compilación
export const BUILD_DATE = versionConfig.BUILD_DATE;

// Obtiene la información completa de versión
export const getVersionInfo = () => {
  return {
    version: APP_VERSION,
    buildDate: BUILD_DATE,
    environment: versionConfig.ENVIRONMENT,
    buildId: versionConfig.BUILD_NUMBER,
    fullVersion: versionConfig.getFullVersionString()
  };
};

// Retorna un texto formateado con la información de versión
export const getVersionText = () => {
  return versionConfig.getFullVersionString();
}; 