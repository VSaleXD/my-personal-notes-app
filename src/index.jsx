import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { LanguageProvider, ThemeProvider } from './contexts/AppContexts';

// import style
import './styles/style.css';

const root = createRoot(document.getElementById('root'));
root.render(<ThemeProvider><LanguageProvider><App /></LanguageProvider></ThemeProvider>);
