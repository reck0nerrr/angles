import React from 'react';

const Navbar = ({ search, onSearchChange, onLogout, username = 'User' }) => {
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <span className="logo-icon">🎵</span>
        <span className="logo-text">Angles</span>
      </div>

      <div className="navbar-search">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="navbar-search-input"
          value={search}
          onChange={onSearchChange}
          placeholder="Поиск альбомов или исполнителей..."
        />
      </div>

      <div className="navbar-actions">
        <div className="user-profile-btn" title="Профиль пользователя">
          <span className="user-avatar">👤</span>
          <span className="username">{username}</span>
        </div>
        <button className="logout-btn" onClick={onLogout} title="Выйти из системы">
          Выйти
        </button>
      </div>
    </header>
  );
};

export default Navbar;