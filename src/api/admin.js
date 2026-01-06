import api from './axios';

const adminService = {

  // ============================================================
  // 1. UTILISATEUR & PROFIL (Tous connectés)
  // ============================================================
  getMe: async () => {
    return await api.get('/me');
  },
  updateProfile: async (data) => {
    return await api.put('/profile', data);
  },
  logout: async () => {
    return await api.post('/logout');
  },

  // ============================================================
  // 2. DASHBOARD (Adaptatif)
  // ============================================================
  getStats: async (role) => {
    // Cas 1 : Admin -> Route Admin
    if (role === 'admin') {
      return await api.get('/admin/dashboard');
    }
    
    // Cas 2 : Client -> Route Client
    if (role === 'client') {
      return await api.get('/dashboard');
    }

    // Cas 3 : Sales, CM, DA -> Pas de route dashboard backend pour l'instant.
    // On simule une réponse vide pour ne pas provoquer d'erreur 403.
    return Promise.resolve({
      data: {
        stats: {
          revenue: 0,
          total_orders: 0,
          new_leads_this_week: 0, // Idéalement, faire une route dédiée pour les Sales plus tard
          total_users: 0
        },
        top_packages: []
      }
    });
  },

  // ============================================================
  // 3. GESTION DES COMMANDES (Orders)
  // ============================================================
  getOrders: async (role) => {
    // Admin -> /admin/orders (Vue globale)
    // Client -> /orders (Ses commandes)
    const url = role === 'admin' ? '/admin/orders' : '/orders';
    return await api.get(url);
  },
  getOrderDetails: async (id) => {
    // Note: Pour l'instant vos routes sont /orders/{id} pour le client
    // Si l'admin doit voir le détail, assurez-vous que la route existe pour lui ou utilisez la route client si accessible
    return await api.get(`/orders/${id}`);
  },
  createOrder: async (data) => {
    return await api.post('/orders', data);
  },

  // ============================================================
  // 4. CLIENTS (Profils, Abonnements, Participation)
  // ============================================================
  // Profils (Artiste, Startup...)
  createProfile: async (data) => {
    return await api.post('/profiles', data);
  },
  updateProfileData: async (id, data) => {
    return await api.put(`/profiles/${id}`, data);
  },

  // Abonnements
  getSubscriptions: async () => {
    return await api.get('/subscriptions');
  },
  createSubscription: async (data) => {
    return await api.post('/subscriptions', data);
  },
  cancelSubscription: async (id) => {
    return await api.post(`/subscriptions/${id}/cancel`);
  },

  // Concours (Participation)
  participateContest: async (contestId, data) => {
    return await api.post(`/contests/${contestId}/participate`, data);
  },

  // ============================================================
  // 5. SALES & ADMIN (Leads / CRM)
  // ============================================================
  getLeads: async () => {
    return await api.get('/admin/leads');
  },
  getLeadStats: async () => {
    return await api.get('/admin/leads/stats');
  },
  getLeadDetails: async (id) => {
    return await api.get(`/admin/leads/${id}`);
  },
  updateLead: async (id, data) => {
    return await api.put(`/admin/leads/${id}`, data);
  },
  assignLead: async (leadId, userId) => {
    // Attention: userId doit être envoyé dans un objet { assigned_to: ID }
    return await api.post(`/admin/leads/${leadId}/assign`, { assigned_to: userId });
  },
  convertLead: async (id) => {
    return await api.post(`/admin/leads/${id}/convert`);
  },

  // ============================================================
  // 6. CM & ADMIN (Campagnes, Posts, Rapports)
  // ============================================================
  // Campagnes
  getCampaigns: async () => {
    return await api.get('/campaigns');
  },
  createCampaign: async (data) => {
    return await api.post('/campaigns', data);
  },
  getCampaignDetails: async (id) => {
    return await api.get(`/campaigns/${id}`);
  },
  // Actions Campagne
  startCampaign: async (id) => { return await api.post(`/campaigns/${id}/start`); },
  pauseCampaign: async (id) => { return await api.post(`/campaigns/${id}/pause`); },
  completeCampaign: async (id) => { return await api.post(`/campaigns/${id}/complete`); },
  updateCampaignMetrics: async (id, metrics) => { 
    return await api.patch(`/campaigns/${id}/metrics`, metrics); 
  },

  // Posts
  createPost: async (data) => {
    return await api.post('/posts', data);
  },
  updatePost: async (id, data) => {
    return await api.put(`/posts/${id}`, data);
  },

  // Rapports
  generateReport: async (orderId, data) => {
    return await api.post(`/orders/${orderId}/reports`, data);
  },

  // ============================================================
  // 7. DA & ADMIN (Livrables)
  // ============================================================
  getDeliverables: async (orderId) => {
    return await api.get(`/orders/${orderId}/deliverables`);
  },
  createDeliverable: async (orderId, data) => {
    // Note: Votre route est /orders/{order}/deliverables pour le POST
    return await api.post(`/orders/${orderId}/deliverables`, data);
  },
  // Actions Livrables
  deliverWork: async (deliverableId) => {
    return await api.post(`/deliverables/${deliverableId}/deliver`);
  },
  approveDeliverable: async (deliverableId) => {
    return await api.post(`/deliverables/${deliverableId}/approve`);
  },
  rejectDeliverable: async (deliverableId, reason) => {
    return await api.post(`/deliverables/${deliverableId}/reject`, { reason });
  },

  // ============================================================
  // 8. ADMIN PUR (Users, Packages, Gestion Concours)
  // ============================================================
  // Utilisateurs
  getUsers: async () => {
    return await api.get('/admin/users');
  },

  // Packages (Services)
  getPackages: async () => {
    // Lecture publique souvent utilisée, mais ici on gère le CRUD Admin
    return await api.get('/packages'); 
  },
  createPackage: async (data) => {
    return await api.post('/admin/packages', data);
  },
  updatePackage: async (id, data) => {
    return await api.put(`/admin/packages/${id}`, data);
  },
  deletePackage: async (id) => {
    return await api.delete(`/admin/packages/${id}`);
  },

  // Concours (Gestion)
  getContests: async () => {
    return await api.get('/contests'); // Lecture publique
  },
  createContest: async (data) => {
    return await api.post('/admin/contests', data);
  },
  updateContest: async (id, data) => {
    return await api.put(`/admin/contests/${id}`, data);
  },
  deleteContest: async (id) => {
    return await api.delete(`/admin/contests/${id}`);
  }
};

export default adminService;