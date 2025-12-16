// Exportation de tous les services API
import authService from './auth';
import profileService from './profiles';
import { 
  authAPI, 
  profilesAPI, 
  packagesAPI, 
  ordersAPI, 
  subscriptionsAPI, 
  postsAPI, 
  campaignsAPI, 
  contestsAPI, 
  services as servicesAPI, 
  reportsAPI, 
  adminAPI 
} from './service';

// Exportation des services individuels
export { default as authService } from './auth';
export { default as profileService } from './profiles';

export {
  authAPI,
  profilesAPI,
  packagesAPI,
  ordersAPI,
  subscriptionsAPI,
  postsAPI,
  campaignsAPI,
  contestsAPI,
  servicesAPI,
  reportsAPI,
  adminAPI
};

// Exportation par défaut de tous les services
const api = {
  auth: authService,
  profiles: profileService,
  services: servicesAPI,
  // Autres services...
};

export default api;
