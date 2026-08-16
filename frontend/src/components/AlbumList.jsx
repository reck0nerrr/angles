import React from 'react';
import AlbumCard from './AlbumCard';

const AlbumList = ({ albums, selectedAlbumId, onSelectAlbum }) => {
  if (!albums || albums.length === 0) {
    return <p className="empty-message">No albums available.</p>;
  }

  return (
    <div className="album-grid">
      {albums.map((album) => (
        <AlbumCard
          key={album.id}
          album={album}
          isSelected={selectedAlbumId === album.id}
          onSelectAlbum={onSelectAlbum}
        />
      ))}
    </div>
  );
};

export default AlbumList;