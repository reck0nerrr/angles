import React, { useState, useEffect } from 'react';
import { fetchAlbums, searchAlbums } from './api/albumApi'; // Imported searchAlbums
import { fetchUsers } from './api/userApi';
import AlbumList from './components/AlbumList';
import TrackList from './components/TrackList';
import UserList from './components/UserList';
import './App.css';

const App = () => {
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [search, setSearch] = useState(''); // 1. Search state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initial load: Fetch users once when component mounts
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (err) {
        console.error('Failed to load users:', err);
      }
    };

    loadUsers();
  }, []);

  // Effect to handle album fetching and search query changes
  useEffect(() => {
    const getAlbums = async () => {
      try {
        setError(null);
        let data;
        
        // If search term is present, hit search endpoint; otherwise fetch all
        if (search.trim()) {
          data = await searchAlbums(search);
        } else {
          data = await fetchAlbums();
        }
        
        setAlbums(data);
      } catch (err) {
        setError(err.message || 'Failed to retrieve albums');
      } finally {
        setLoading(false);
      }
    };

    // Debounce to avoid firing API requests on every single keystroke
    const timer = setTimeout(() => {
      getAlbums();
    }, 300);

    return () => clearTimeout(timer); // Clean up timer if user types fast
  }, [search]);

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
            <section className="users-section">
              <UserList users={users} />
            </section>

            <section className="albums-section">
              <div className="section-header">
                <h2>Albums</h2>
                {/* 2. Search Input */}
                <input
                  type="text"
                  className="search-input"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search albums..."
                />
              </div>

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