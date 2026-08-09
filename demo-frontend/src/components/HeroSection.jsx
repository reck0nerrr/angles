import React from 'react';

const HeroSection = ({ totalAlbums = 0 }) => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Ваша музыкальная коллекция</h1>
        <p className="hero-subtitle">
          Исследуйте лучшие альбомы, находите любимые треки и управляйте своей медиатекой в едином месте.
        </p>
        {totalAlbums > 0 && (
          <div className="hero-stats">
            <span className="badge">Доступно альбомов: {totalAlbums}</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;