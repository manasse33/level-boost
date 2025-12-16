import api from './axios';

const profileService = {
  // Récupérer tous les profils
  async getAllProfiles(params = {}) {
    try {
      const response = await api.get('/profiles', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Récupérer un profil par son ID ou son slug
  async getProfileById(idOrSlug) {
    try {
      const response = await api.get(`/profiles/${idOrSlug}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Créer un nouveau profil
  async createProfile(profileData) {
    try {
      const response = await api.post('/profiles', profileData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Mettre à jour un profil
  async updateProfile(id, profileData) {
    try {
      const response = await api.post(`/profiles/${id}`, profileData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Supprimer un profil
  async deleteProfile(id) {
    try {
      const response = await api.delete(`/profiles/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Rechercher des profils
  async searchProfiles(query, filters = {}) {
    try {
      const response = await api.get('/profiles/search', {
        params: {
          q: query,
          ...filters,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Suivre un artiste
  async followArtist(artistId) {
    try {
      const response = await api.post(`/profiles/${artistId}/follow`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Ne plus suivre un artiste
  async unfollowArtist(artistId) {
    try {
      const response = await api.post(`/profiles/${artistId}/unfollow`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Récupérer les profils populaires
  async getPopularProfiles(limit = 10) {
    try {
      const response = await api.get('/profiles/popular', {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Récupérer les profils récemment ajoutés
  async getRecentProfiles(limit = 10) {
    try {
      const response = await api.get('/profiles/recent', {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default profileService;