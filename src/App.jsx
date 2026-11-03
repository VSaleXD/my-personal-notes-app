import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import AuthenticatedPages from './pages/authenticatedPages';
import LandingPage from './pages/landingPage';
import LoginPage from './pages/loginPage';
import { getAccessToken, getUserLogged, putAccessToken } from './utils/network-data';

function PublicPages({ onLogin }) {
  return <Routes><Route path="/" element={<LandingPage />} /><Route path="/login" element={<LoginPage onLogin={onLogin} />} /><Route path="*" element={<LandingPage />} /></Routes>;
}

function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const loadUser = async () => {
    const result = await getUserLogged();
    if (!result.error) setUser(result.data);
    else { localStorage.removeItem('accessToken'); setUser(null); }
    setCheckingAuth(false);
  };

  useEffect(() => {
    if (getAccessToken()) loadUser();
    else setCheckingAuth(false);
  }, []);

  const onLogout = () => { putAccessToken(''); localStorage.removeItem('accessToken'); setUser(null); };
  if (checkingAuth) return <p className="loading-state">Memuat...</p>;

  return <BrowserRouter>{user ? <AuthenticatedPages user={user} onLogout={onLogout} /> : <PublicPages onLogin={loadUser} />}</BrowserRouter>;
}

export default App;
