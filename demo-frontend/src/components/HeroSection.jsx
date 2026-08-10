import React from 'react';

const HeroSection = ({ totalAlbums = 0 }) => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Your music collection</h1>
        <p className="hero-subtitle">
          Explore best albums, find your favorite tracks, and manage your media library in one place.
        </p>
        {totalAlbums > 0 && (
          <div className="hero-stats">
            <span className="badge">Total albums: {totalAlbums}</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;