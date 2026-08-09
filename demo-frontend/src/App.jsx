import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import { isAuthenticated, removeToken, loginUser } from './api/authApi';
import './App.css';

const App = () => {
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  useEffect(() => {
    setAuthed(isAuthenticated());
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError(null);
    try {
      await loginUser(credentials);
      setAuthed(true);
    } catch (err) {
      setAuthError(err.message || 'Ошибка авторизации');
    }
  };

  const handleLogout = () => {
    removeToken();
    setAuthed(false);
  };

  // Если пользователь не авторизован (нет JWT в localStorage)
  if (!authed) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2>🎵 Вход в Angles</h2>
          <p className="subheading">Авторизуйтесь для доступа к библиотеке</p>
          
          {authError && <div className="auth-error">{authError}</div>}

          <form onSubmit={handleLogin} className="auth-form">
            <input
              type="text"
              placeholder="Почта"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Пароль"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
            <button type="submit" className="auth-submit-btn">
              Войти
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Если пользователь авторизован — отображаем главную страницу
  return <HomePage onLogout={handleLogout} />;
};

export default App;