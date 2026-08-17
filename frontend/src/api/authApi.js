const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/auth';

export const loginUser = async (credentials) => {
  const response = await fetch(`${BASE_URL}/authenticate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Неверные данные для входа');
  }

  const data = await response.json();
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  return data;
};

export const registerUser = async ({ email, username, password }) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, username, password }),
  });

  if (!response.ok) {
    throw new Error('Ошибка при регистрации. Возможно, email или имя пользователя уже заняты.');
  }

  const data = await response.json();
  
  if (data && data.token) {
    localStorage.setItem('token', data.token);
  }
  return data;
};
export const getUsername = () => {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    return payload.username || null;
  } catch {
    return null;
  }
};
export const getToken = () => localStorage.getItem('token');
export const removeToken = () => localStorage.removeItem('token');
export const isAuthenticated = () => !!localStorage.getItem('token');