import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();
const LanguageContext = createContext();

const translations = {
  id: {
    all: 'Semua',
    archive: 'Arsip',
    newNote: '+ Catatan baru',
    logout: 'Keluar',
    light: 'Terang',
    dark: 'Gelap',
    english: 'English',
    indonesian: 'Bahasa Indonesia',
    loading: 'Memuat...',
    apiError: 'Terjadi kesalahan saat menghubungi server.',
  },
  en: {
    all: 'All',
    archive: 'Archive',
    newNote: '+ New note',
    logout: 'Log out',
    light: 'Light',
    dark: 'Dark',
    english: 'English',
    indonesian: 'Bahasa Indonesia',
    loading: 'Loading...',
    apiError: 'There was a problem contacting the server.',
  },
};

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme((value) => (value === 'light' ? 'dark' : 'light')) }}>
      {children}
    </ThemeContext.Provider>
  );
}

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'id');

  useEffect(() => localStorage.setItem('language', language), [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

function useTheme() {
  return useContext(ThemeContext);
}

function useLanguage() {
  return useContext(LanguageContext);
}

export { LanguageProvider, ThemeProvider, useLanguage, useTheme };
