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
          placeholder="Search"
        />
      </div>

      <div className="navbar-actions">
        <div className="user-profile-btn" title="Profile">
          <span className="user-avatar">👤</span>
          <span className="username">{username}</span>
        </div>
        <button className="logout-btn" onClick={onLogout} title="Quit">
          Quit
        </button>
      </div>
    </header>
  );
};

export default Navbar;