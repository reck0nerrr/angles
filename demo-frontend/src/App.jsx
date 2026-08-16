import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import { isAuthenticated, removeToken, loginUser, registerUser, getUsername } from './api/authApi';

import './App.css';

const App = () => {
  const [authed, setAuthed] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [authSuccess, setAuthSuccess] = useState(null);
  
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });

  useEffect(() => {
    setAuthed(isAuthenticated());
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    try {
      if (isRegistering) {
        // Отправка { email, username, password }
        await registerUser(formData);
        
        if (isAuthenticated()) {
          setAuthed(true);
        } else {
          setAuthSuccess('Registration completed, now sign in');
          setIsRegistering(false);
          setFormData({ email: formData.email, username: '', password: '' });
        }
      } else {
        // Запрос на вход
        await loginUser({
          email: formData.email,
          password: formData.password,
        });
        setAuthed(true);
      }
    } catch (err) {
      setAuthError(err.message || 'Error occured');
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setAuthError(null);
    setAuthSuccess(null);
  };

  const handleLogout = () => {
    removeToken();
    setAuthed(false);
  };

  if (!authed) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2>🎵 {isRegistering ? 'Registration' : 'Login'}</h2>
          <p className="subheading">
            {isRegistering 
              ? 'Create an account' 
              : 'Login'}
          </p>
          
          {authError && <div className="auth-error">{authError}</div>}
          {authSuccess && <div className="auth-success">{authSuccess}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {isRegistering && (
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit" className="auth-submit-btn">
              {isRegistering ? 'Create account' : 'Login'}
            </button>
          </form>

          <div className="auth-toggle">
            {isRegistering ? (
              <p>
                Have account already?{' '}
                <button type="button" className="toggle-btn" onClick={toggleMode}>
                  Login
                </button>
              </p>
            ) : (
              <p>
                Don't have an account yet?{' '}
                <button type="button" className="toggle-btn" onClick={toggleMode}>
                  Sign up
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <HomePage onLogout={handleLogout} username={getUsername()} />;
};

export default App;