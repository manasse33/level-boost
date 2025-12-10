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