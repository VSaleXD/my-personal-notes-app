import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage, useTheme } from '../contexts/AppContexts';
import { soundProps } from '../utils/sound';

function LandingPage() {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const isIndonesian = language === 'id';

  return (
    <main className="landing-page">
      <nav className="landing-nav">
        <Link className="brand" to="/" {...soundProps()}><span className="brand__mark">✦</span><span>NOTEBOOK</span></Link>
        <div className="landing-nav__actions">
          <button className="button button--small" type="button" onClick={toggleTheme}>{theme === 'light' ? '◐' : '☀'}</button>
          <button className="button button--small" type="button" onClick={() => setLanguage(isIndonesian ? 'en' : 'id')}>{isIndonesian ? 'EN' : 'ID'}</button>
          <Link className="button button--small button--coral" to="/login" {...soundProps()}>{isIndonesian ? 'Masuk' : 'Log in'}</Link>
        </div>
      </nav>
      <section className="landing-hero">
        <div className="landing-hero__copy">
          <h1>{isIndonesian ? 'Tulis yang penting. Simpan yang berarti.' : 'Write what matters. Save what means.'}</h1>
          <p>{isIndonesian ? 'Notebook adalah ruang tenang untuk menyimpan ide, rencana, dan catatan yang ingin kamu ingat.' : 'Notebook is a quiet space for ideas, plans, and the notes you want to remember.'}</p>
          <div className="landing-hero__actions">
            <Link className="button button--yellow" to="/login" {...soundProps()}>{isIndonesian ? 'Mulai menulis' : 'Start writing'} →</Link>
          </div>
        </div>
        <div className="landing-hero__visual" aria-label="Pratinjau Gary Game Hub">
          <div className="landing-hero__window-bar"><span /> <span /> <span /></div>
          <div className="landing-hero__window-content"><p>ALSO MADE BY ME</p><strong>GARY<br /><b>GAME HUB</b></strong><a href="https://www.gary-ipb.web.id/" target="_blank" rel="noreferrer">OPEN SITE ↗</a></div>
        </div>
      </section>
      <section className="landing-footer"><span>NOTES FOR YOUR NEXT CHAPTER</span></section>
    </main>
  );
}

export default LandingPage;
