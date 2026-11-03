import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { login, putAccessToken, register } from '../utils/network-data';
import { useLanguage } from '../contexts/AppContexts';

function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [isRegister, setIsRegister] = useState(false);
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    if (isRegister && password !== confirmPassword) {
      setError(language === 'id' ? 'Konfirmasi password tidak cocok.' : 'Passwords do not match.');
      return;
    }

    setIsLoading(true);
    if (isRegister) {
      const result = await register({ name, email, password });
      setIsLoading(false);
      if (result.error) {
        setError(result.message || (language === 'id' ? 'Registrasi gagal.' : 'Registration failed.'));
        return;
      }
      setIsRegister(false);
      setError(language === 'id' ? 'Registrasi berhasil. Silakan masuk.' : 'Registration succeeded. Please log in.');
      return;
    }

    const result = await login({ email, password });
    if (result.error) {
      setIsLoading(false);
      setError(result.message || (language === 'id' ? 'Login gagal.' : 'Login failed.'));
      return;
    }
    putAccessToken(result.data.accessToken);
    await onLogin();
    navigate('/');
    setIsLoading(false);
  };

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <p className="eyebrow">NOTEBOOK / {isRegister ? 'JOIN' : 'WELCOME'}</p>
        <h1>{isRegister ? 'Buat ruang catatanmu.' : 'Selamat datang kembali.'}</h1>
        <p className="page-intro__description">
          {isRegister ? 'Simpan ide-ide pentingmu di satu tempat.' : 'Masuk untuk membaca dan menulis catatanmu.'}
        </p>
        <form className="auth-form" onSubmit={submit}>
          {isRegister && <input aria-label="Nama" placeholder="Nama" value={name} onChange={onNameChange} required />}
          <input type="email" aria-label="Email" placeholder="Email" value={email} onChange={onEmailChange} required />
          <input type="password" aria-label="Password" placeholder="Password" value={password} onChange={onPasswordChange} required />
          {isRegister && <input type="password" aria-label="Konfirmasi password" placeholder="Konfirmasi password" value={confirmPassword} onChange={onConfirmPasswordChange} required />}
          {error && <p className="auth-form__feedback">{error}</p>}
          <button className="button button--yellow" type="submit" disabled={isLoading}>
            {isLoading ? '...' : (isRegister ? 'Daftar' : 'Masuk')}
          </button>
        </form>
        <button className="auth-switch" type="button" onClick={() => { setIsRegister((value) => !value); setError(''); }}>
          {isRegister ? 'Sudah punya akun? Masuk' : 'Belum punya akun? Daftar'}
        </button>
      </section>
    </main>
  );
}

export default LoginPage;
