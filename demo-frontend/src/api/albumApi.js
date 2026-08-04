const BASE_URL = 'http://localhost:8080';

export const fetchAlbums = async () => {
  const response = await fetch(`${BASE_URL}/albums`);
  if (!response.ok) {
    throw new Error(`Failed to fetch albums (Status: ${response.status})`);
  }
  return await response.json();
};