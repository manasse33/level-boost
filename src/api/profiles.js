// src/api/profiles.js
import api from './axios'; // Assurez-vous que ce chemin pointe bien vers votre fichier de config axios

const ProfileService = {
  /**
   * Récupère la liste des profils (Talents)
   * @param {Object} params - Filtres optionnels (ex: { type: 'artist', page: 1 })
   * Route Laravel: GET /profiles
   */
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/profiles', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Récupère les détails d'un profil spécifique via son slug
   * @param {string} slug - Le slug unique du profil
   * Route Laravel: GET /profiles/{slug}
   */
  getBySlug: async (slug) => {
    try {
      const response = await api.get(`/profiles/${slug}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Créer un nouveau profil (Pour le Dashboard Client plus tard)
   * Gère l'envoi de fichiers (logo, cover)
   * Route Laravel: POST /profiles
   */
  create: async (formData) => {
    try {
      const response = await api.post('/profiles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Mettre à jour un profil (Pour le Dashboard Client plus tard)
   * Route Laravel: PUT /profiles/{profile}
   * Note: Avec Laravel et FormData, on utilise souvent POST avec _method="PUT"
   */
  update: async (id, formData) => {
    try {
      // Astuce Laravel pour l'upload de fichiers en modification
      formData.append('_method', 'PUT'); 
      const response = await api.post(`/profiles/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default ProfileService;