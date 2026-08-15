import React from 'react';

const AlbumCard = ({ album, onSelectAlbum, isSelected }) => {
  const { albumName, artist, genre, releaseDate, averageRating, ratingCount, tracks } = album;
  const trackCount = tracks ? tracks.length : 0;

  return (
    <div
      className={`album-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelectAlbum(album)}
    >
      <div className="album-card-header">
        <h3 className="album-title">{albumName}</h3>
        <span className="album-rating">
          {averageRating != null ? `★ ${averageRating} (${ratingCount})` : 'No ratings yet'}
        </span>
      </div>
      <p className="album-artist">By {artist}</p>
      <div className="album-meta">
        <span className="badge">{genre}</span>
        <span className="album-date">{releaseDate}</span>
      </div>
      <div className="album-footer">
        <span>{trackCount} {trackCount === 1 ? 'Track' : 'Tracks'}</span>
        <button className="view-tracks-btn">
          {isSelected ? 'Viewing Tracks' : 'View Tracks'}
        </button>
      </div>
    </div>
  );
};

export default AlbumCard;