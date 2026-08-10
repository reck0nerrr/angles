import React from 'react';
import RatingInput from './RatingInput';
import StarRating from './StarRating';

const TrackList = ({ album, onClose }) => {
  if (!album) return null;

  const { id: albumId, albumName, artist, tracks } = album;

  return (
    <div className="track-list-container">
      <div className="track-list-header">
        <div>
          <h2>{albumName}</h2>
          <p className="subheading">Tracks by {artist}</p>
        </div>
        <button className="close-btn" onClick={onClose} aria-label="Close track list">
          &times;
        </button>
      </div>

      <div className="album-rating-section">
        <h4>Rate this album</h4>
        <RatingInput albumId={albumId} />
      </div>

      {!tracks || tracks.length === 0 ? (
        <p className="empty-message">No tracks found in this album.</p>
      ) : (
        <div className="table-responsive">
          <table className="track-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Track Name</th>
                <th>Genre</th>
                <th>Duration</th>
                <th>Rating</th>
                <th>Your Rating</th>
              </tr>
            </thead>
            <tbody>
              {tracks.map((track, index) => (
                <tr key={track.id || index}>
                  <td>{index + 1}</td>
                  <td className="track-name">{track.trackName}</td>
                  <td><span className="badge">{track.genre}</span></td>
                  <td>{track.duration}</td>
                  <td>★ {track.rate}</td>
                  <td><StarRating trackId={track.id} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TrackList;