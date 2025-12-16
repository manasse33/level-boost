// src/api/services.js
import api from './axios';

// ============= AUTH =============
export const authAPI = {
  register: (data) => api.post('/register', data),
  login: (data) => api.post('/login', data),
  logout: () => api.post('/logout'),
  getMe: () => api.get('/me'),
};

// ============= PROFILES =============
export const profilesAPI = {
  getAll: (params) => api.get('/profiles', { params }),
  getBySlug: (slug) => api.get(`/profiles/${slug}`),
  create: (data) => api.post('/profiles', data),
  update: (id, data) => api.put(`/profiles/${id}`, data),
  delete: (id) => api.delete(`/profiles/${id}`),
};

// ============= PACKAGES =============
export const packagesAPI = {
  getAll: () => api.get('/packages'),
  getById: (id) => api.get(`/packages/${id}`),
};

// ============= ORDERS =============
export const ordersAPI = {
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  create: (data) => api.post('/orders', data),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
  updatePayment: (id, data) => api.patch(`/orders/${id}/payment`, data),
};

// ============= SUBSCRIPTIONS =============
export const subscriptionsAPI = {
  getAll: () => api.get('/subscriptions'),
  create: (data) => api.post('/subscriptions', data),
  cancel: (id) => api.post(`/subscriptions/${id}/cancel`),
  renew: (id) => api.post(`/subscriptions/${id}/renew`),
};

// ============= POSTS =============
export const postsAPI = {
  getAll: (params) => api.get('/posts', { params }),
  getById: (id) => api.get(`/posts/${id}`),
  create: (data) => api.post('/posts', data),
  update: (id, data) => api.put(`/posts/${id}`, data),
  publish: (id) => api.post(`/posts/${id}/publish`),
  updateMetrics: (id, metrics) => api.patch(`/posts/${id}/metrics`, metrics),
};

// ============= CAMPAIGNS =============
export const campaignsAPI = {
  getAll: () => api.get('/campaigns'),
  create: (data) => api.post('/campaigns', data),
  start: (id) => api.post(`/campaigns/${id}/start`),
  pause: (id) => api.post(`/campaigns/${id}/pause`),
  complete: (id) => api.post(`/campaigns/${id}/complete`),
};

// ============= CONTESTS =============
export const contestsAPI = {
  getAll: () => api.get('/contests'),
  getBySlug: (slug) => api.get(`/contests/${slug}`),
  participate: (id, data) => api.post(`/contests/${id}/participate`, data),
  vote: (contestId, participantId) => 
    api.post(`/contests/${contestId}/participants/${participantId}/vote`),
};

// ============= SERVICES =============
const servicesAPI = {
  // Récupérer tous les services
  async getAllServices() {
    try {
      const response = await api.get('/services');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Récupérer un service par son ID
  async getServiceById(id) {
    try {
      const response = await api.get(`/services/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Créer un nouveau service (admin)
  async createService(serviceData) {
    try {
      const response = await api.post('/services', serviceData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Mettre à jour un service (admin)
  async updateService(id, serviceData) {
    try {
      const response = await api.put(`/services/${id}`, serviceData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Supprimer un service (admin)
  async deleteService(id) {
    try {
      const response = await api.delete(`/services/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Récupérer les services par catégorie
  async getServicesByCategory(category, params = {}) {
    try {
      const response = await api.get(`/services/category/${category}`, { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Rechercher des services
  async searchServices(query, filters = {}) {
    try {
      const response = await api.get('/services/search', {
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

  // Récupérer les services populaires
  async getPopularServices(limit = 6) {
    try {
      const response = await api.get('/services/popular', {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Récupérer les services recommandés pour un utilisateur
  async getRecommendedServices(userId, limit = 6) {
    try {
      const response = await api.get(`/users/${userId}/recommended-services`, {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Soumettre un avis sur un service
  async submitReview(serviceId, reviewData) {
    try {
      const response = await api.post(`/services/${serviceId}/reviews`, reviewData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Récupérer les avis d'un service
  async getServiceReviews(serviceId, params = {}) {
    try {
      const response = await api.get(`/services/${serviceId}/reviews`, { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Récupérer les statistiques d'un service
  async getServiceStats(serviceId) {
    try {
      const response = await api.get(`/services/${serviceId}/stats`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export const services = servicesAPI;

// ============= REPORTS =============
export const reportsAPI = {
  generate: (orderId) => api.post(`/orders/${orderId}/reports/generate`),
  getByProfile: (profileId) => api.get(`/profiles/${profileId}/reports`),
};

// ============= ADMIN =============
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  getOrders: (params) => api.get('/admin/orders', { params }),
  getLeads: (params) => api.get('/admin/leads', { params }),
  getLeadsStats: () => api.get('/admin/leads/stats'),
  createPackage: (data) => api.post('/admin/packages', data),
  createContest: (data) => api.post('/admin/contests', data),
};