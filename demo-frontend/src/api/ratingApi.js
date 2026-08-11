import { getToken } from './authApi';

const BASE_URL = 'http://localhost:8080';

const getAuthHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
};

export const submitRating = async ({ albumId, trackId, rate, comment }) => {
  const response = await fetch(`${BASE_URL}/ratings`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      albumId: albumId ?? null,
      trackId: trackId ?? null,
      rate,
      comment: comment ?? null,
    }),
  });
  if (!response.ok) {
    throw new Error(`Failed to submit rating (Status: ${response.status})`);
  }
  return await response.json();
};
export const fetchAlbumRatings = async (albumId) => {
  const response = await fetch(`${BASE_URL}/ratings/album/${albumId}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ratings (Status: ${response.status})`);
  }
  return await response.json();
};
