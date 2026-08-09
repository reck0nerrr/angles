import { getToken } from './authApi';

const BASE_URL = 'http://localhost:8080';

const getAuthHeaders = () => {
  const token = getToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const fetchAlbums = async (page = 0, size = 10) => {
  const response = await fetch(`${BASE_URL}/albums?page=${page}&size=${size}`, {
    headers: { ...getAuthHeaders() }
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch albums (Status: ${response.status})`);
  }
  return await response.json();
};

export const searchAlbums = async (query, page = 0, size = 10) => {
  const response = await fetch(
    `${BASE_URL}/albums/search?query=${encodeURIComponent(query)}&page=${page}&size=${size}`,
    { headers: { ...getAuthHeaders() } }
  );
  if (!response.ok) {
    throw new Error(`Failed to search albums (Status: ${response.status})`);
  }
  return await response.json();
};