const BASE_URL = 'http://localhost:8080/auth';

// Авторизация пользователя
export const loginUser = async (credentials) => {
  const response = await fetch(`${BASE_URL}/authenticate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Неверное имя пользователя или пароль');
  }

  const data = await response.json();
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  return data;
};

// Регистрация
export const registerUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Ошибка при регистрации');
  }

  return await response.json();
};

// Вспомогательные функции для токена
export const getToken = () => localStorage.getItem('token');
export const removeToken = () => localStorage.removeItem('token');
export const isAuthenticated = () => !!localStorage.getItem('token');