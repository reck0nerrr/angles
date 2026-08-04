import React, { useState, useEffect } from 'react';
import { fetchAlbums } from './api/albumApi';
import { fetchUsers } from './api/userApi'; // 1. Import new user API
import AlbumList from './components/AlbumList';
import TrackList from './components/TrackList';
import UserList from './components/UserList'; // 2. Import UserList component
import './App.css';

const App = () => {
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]); // 3. State for users
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch albums and users concurrently
        const [albumsData, usersData] = await Promise.all([
          fetchAlbums(),
          fetchUsers()
        ]);

        setAlbums(albumsData);
        setUsers(usersData);
      } catch (err) {
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleSelectAlbum = (album) => {
    if (selectedAlbum?.id === album.id) {
      setSelectedAlbum(null);
    } else {
      setSelectedAlbum(album);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Admin Dashboard</h1>
      </header>

      <main className="app-main">
        {loading && <div className="status-message">Loading dashboard...</div>}
        
        {error && (
          <div className="status-message error-message">
            <p>Error: {error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        )}

        {!loading && !error && (
          <div className="content-layout">
            {/* 4. Users section rendered above Albums */}
            <section className="users-section">
              <UserList users={users} />
            </section>

            <section className="albums-section">
              <h2>Albums</h2>
              <AlbumList
                albums={albums}
                selectedAlbumId={selectedAlbum?.id}
                onSelectAlbum={handleSelectAlbum}
              />
            </section>

            {selectedAlbum && (
              <section className="tracks-section">
                <TrackList
                  album={selectedAlbum}
                  onClose={() => setSelectedAlbum(null)}
                />
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;