import React, { useState, useEffect } from 'react';
import { fetchAlbums, searchAlbums } from '../api/albumApi';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AlbumList from '../components/AlbumList';
import TrackList from '../components/TrackList';

const HomePage = ({ onLogout }) => {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [search, setSearch] = useState('');
  
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(0); // Сброс на первую страницу при поиске
  };

  useEffect(() => {
    const getAlbums = async () => {
      try {
        setLoading(true);
        setError(null);
        let data;

        if (search.trim()) {
          data = await searchAlbums(search, page, 10);
        } else {
          data = await fetchAlbums(page, 10);
        }

        setAlbums(data.content || []);
        setTotalPages(data.totalPages || 0);
        setTotalElements(data.totalElements || 0);
      } catch (err) {
        setError(err.message || 'Couldnt get albums');
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
    <div className="home-container">
      <Navbar 
        search={search} 
        onSearchChange={handleSearchChange} 
        onLogout={onLogout} 
      />

      <main className="home-main">
        <HeroSection totalAlbums={totalElements} />

        <section className="catalog-section">
          <div className="section-title-row">
            <h2>{search.trim() ? `Query results: "${search}"` : 'Album catalog'}</h2>
          </div>

          {loading && <div className="status-message">Loading...</div>}

          {error && (
            <div className="status-message error-message">
              <p>Ошибка: {error}</p>
              <button onClick={() => window.location.reload()}>Retry</button>
            </div>
          )}

          {!loading && !error && albums.length === 0 && (
            <div className="empty-search-container">
              <span className="empty-icon">💿</span>
              <h3>Not found</h3>
              <p>Couldnt find anything by «{search}» query.</p>
              {search && (
                <button className="clear-search-btn" onClick={() => setSearch('')}>
                  Reset
                </button>
              )}
            </div>
          )}

          {!loading && !error && albums.length > 0 && (
            <>
              <AlbumList
                albums={albums}
                selectedAlbumId={selectedAlbum?.id}
                onSelectAlbum={handleSelectAlbum}
              />

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                    disabled={page === 0}
                  >
                    ← Назад
                  </button>

                  <span className="pagination-info">
                    Страница {page + 1} из {totalPages}
                  </span>

                  <button
                    className="pagination-btn"
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={page >= totalPages - 1}
                  >
                    Вперед →
                  </button>
                </div>
              )}
            </>
          )}

          {selectedAlbum && (
            <div className="modal-overlay" onClick={() => setSelectedAlbum(null)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <TrackList
                  album={selectedAlbum}
                  onClose={() => setSelectedAlbum(null)}
                />
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomePage;