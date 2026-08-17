const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const fetchUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);
  if (!response.ok) {
    throw new Error(`Failed to fetch users (Status: ${response.status})`);
  }
  return await response.json();
};