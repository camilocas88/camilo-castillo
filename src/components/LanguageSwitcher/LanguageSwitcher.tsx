'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const { language, changeLanguage, translations } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="language-switcher">
      <button
        onClick={toggleDropdown}
        className="language-button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {language.toUpperCase()}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`language-arrow ${isOpen ? 'open' : ''}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          <button
            onClick={() => handleLanguageChange('en')}
            className={`language-option ${language === 'en' ? 'active' : ''}`}
          >
            {translations.language.en}
          </button>
          <button
            onClick={() => handleLanguageChange('es')}
            className={`language-option ${language === 'es' ? 'active' : ''}`}
          >
            {translations.language.es}
          </button>
        </div>
      )}
    </div>
  );
} 