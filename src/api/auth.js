// src/api/auth.js
import api from './axios';

const authService = {
  // Inscription
  async register(userData) {
    // Laravel attend souvent 'password_confirmation'
    const response = await api.post('/register', userData);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  },

  // Connexion
  async login(credentials) {
    const response = await api.post('/login', credentials);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  },

  // Déconnexion
  async logout() {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error("Erreur logout API", error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
  },

  // Récupérer l'utilisateur courant
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  }
};

export default authService;