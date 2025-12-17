// src/api/auth.js
import api from './axios';

const authService = {
  // Inscription
  async register(userData) {
    const response = await api.post('/register', userData);

    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response.data;
  },

  // Connexion
  async login(credentials) {
    const response = await api.post('/login', credentials);

    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response.data;
  },

  // Déconnexion (backend facultatif)
  async logout() {
    try {
      // ⚠️ optionnel : seulement si la route existe côté backend
      await api.post('/logout');
    } catch (error) {
      // Pas bloquant : on force le logout côté frontend
      console.warn('Logout API ignoré');
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.replace('/login');
    }
  },

  // Utilisateur courant
  getCurrentUser() {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },
};

export default authService;
