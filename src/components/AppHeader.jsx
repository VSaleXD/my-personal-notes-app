import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage, useTheme } from '../contexts/AppContexts';
import { soundProps } from '../utils/sound';

function AppHeader({ notes, user, onLogout }) {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const activeCount = notes.filter((note) => !note.archived).length;
  const archivedCount = notes.filter((note) => note.archived).length;

  return (
    <header className="site-header">
      <Link className="brand" to="/" {...soundProps()}><span className="brand__mark">✦</span><span>NOTEBOOK</span></Link>
      <nav className="main-nav" aria-label="Navigasi utama">
        <NavLink className="main-nav__link" to="/" end {...soundProps()}>{t.all} <span>{activeCount}</span></NavLink>
        <NavLink className="main-nav__link" to="/archive" {...soundProps()}>{t.archive} <span>{archivedCount}</span></NavLink>
      </nav>
      <div className="header-tools">
        <button className="button button--small" type="button" onClick={toggleTheme}>{theme === 'light' ? '◐' : '☀'} {theme === 'light' ? t.dark : t.light}</button>
        <button className="button button--small" type="button" onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}>{language === 'id' ? 'EN' : 'ID'}</button>
        <button className="button button--small button--coral" type="button" onClick={onLogout}>{user.name || t.logout}</button>
      </div>
    </header>
  );
}

export default AppHeader;
