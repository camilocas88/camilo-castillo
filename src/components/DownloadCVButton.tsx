'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { FaFileDownload } from 'react-icons/fa';

interface DownloadCVButtonProps {
  className?: string;
  style?: React.CSSProperties;
}

const DownloadCVButton = ({ className = '', style = {} }: DownloadCVButtonProps) => {
  const { translations } = useLanguage();

  return (
    <a 
      href="/Camilo-Castillo Software Developer.pdf" 
      download
      className={`download-cv-button ${className}`}
      style={style}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaFileDownload className="download-icon" />
      <span>{translations.download_cv}</span>
    </a>
  );
};

export default DownloadCVButton; 