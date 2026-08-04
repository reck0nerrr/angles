import React, { useState, useEffect } from 'react';
import { fetchAlbums, searchAlbums } from './api/albumApi';
import { fetchUsers } from './api/userApi';
import AlbumList from './components/AlbumList';
import TrackList from './components/TrackList';
import UserList from './components/UserList';
import './App.css';

const App = () => {
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [search, setSearch] = useState('');
  
  // Состояния для пагинации
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка пользователей
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

  // Сброс страницы на 0 при изменении поискового запроса
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(0);
  };

  // Загрузка альбомов при изменении search или page
  useEffect(() => {
    const getAlbums = async () => {
      try {
        setError(null);
        let data;

        if (search.trim()) {
          data = await searchAlbums(search, page, 10);
        } else {
          data = await fetchAlbums(page, 10);
        }

        // Берем массив альбомов из поля content
        setAlbums(data.content || []);
        // Сохраняем общее количество страниц
        setTotalPages(data.totalPages || 0);
      } catch (err) {
        setError(err.message || 'Failed to retrieve albums');
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      getAlbums();
    }, 300);

    return () => clearTimeout(timer);
  }, [search, page]);

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
                <input
                  type="text"
                  className="search-input"
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Search albums..."
                />
              </div>

              <AlbumList
                albums={albums}
                selectedAlbumId={selectedAlbum?.id}
                onSelectAlbum={handleSelectAlbum}
              />

              {/* Элементы управления пагинацией */}
              {totalPages > 0 && (
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                    disabled={page === 0}
                  >
                    Previous
                  </button>

                  <span className="pagination-info">
                    Page {page + 1} of {totalPages}
                  </span>

                  <button
                    className="pagination-btn"
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={page >= totalPages - 1}
                  >
                    Next
                  </button>
                </div>
              )}
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