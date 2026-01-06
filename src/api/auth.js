import api from './axios';

const authService = {
  // --- Inscription ---
  async register(userData) {
    const response = await api.post('/register', userData);
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // --- Connexion ---
  async login(credentials) {
    const response = await api.post('/login', credentials);
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // --- NOUVEAU : Récupérer les infos fraîches du serveur ---
  async getMe() {
    // Cette route doit exister dans ton api.php (ex: Route::get('/me', ...))
    const response = await api.get('/me');
    return response.data;
  },

  // --- NOUVEAU : Mettre à jour le profil ---
  async updateAccount(formData) {
    // On utilise souvent POST même pour une mise à jour quand il y a une photo
    // car PHP/Laravel gère mieux les fichiers en POST
    const response = await api.post('/profile-update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    
    // Si l'user est mis à jour, on rafraîchit le localStorage
    if (response.data?.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // --- Déconnexion ---
  async logout() {
    try {
      await api.post('/logout');
    } catch (error) {
      console.warn('Logout API ignoré');
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.replace('/login');
    }
  },

  // --- Utilisateur local (synchrone) ---
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