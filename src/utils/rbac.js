// src/utils/rbac.js

// Ces rôles doivent correspondre exactement à la colonne 'role' de ta table 'users'
export const ROLES = {
  ADMIN: 'admin',
  CLIENT: 'client',
  SALES: 'sales',
  CM: 'cm',
  DA: 'da'
};

const PERMISSIONS = {
  // 1. DASHBOARD
  // Tout le monde a une route dashboard (soit /dashboard, soit /admin/dashboard)
  VIEW_DASHBOARD: [ROLES.ADMIN, ROLES.CLIENT, ROLES.SALES, ROLES.CM, ROLES.DA],

  // 2. CAMPAGNES
  // Middleware: role:admin,cm
  MANAGE_CAMPAIGNS: [ROLES.CM, ROLES.ADMIN],

  // 3. LEADS (CRM)
  // Middleware: role:admin,sales
  MANAGE_LEADS: [ROLES.SALES, ROLES.ADMIN],

  // 4. LIVRABLES
  // Middleware: role:admin,da
  // Note: Le DA n'a pas accès à GET /orders, il doit passer par ses routes deliverables
  MANAGE_DELIVERABLES: [ROLES.DA, ROLES.ADMIN],

  // 5. COMMANDES (ORDERS)
  // Admin: Route::get('/orders') (global)
  // Client: Route::get('/orders') (perso)
  // ATTENTION: Sales, CM et DA n'ont PAS cette route dans ton fichier PHP.
  VIEW_ORDERS: [ROLES.CLIENT, ROLES.ADMIN],

  // 6. ABONNEMENTS
  // Middleware: role:client uniquement
  VIEW_SUBSCRIPTIONS: [ROLES.CLIENT],

  // 7. SERVICES (PACKAGES) & CONCOURS (Gestion) & UTILISATEURS
  // Middleware: role:admin uniquement (les routes POST/PUT/DELETE)
  MANAGE_ADMIN_RESOURCES: [ROLES.ADMIN], 
};

export const can = (userRole, permission) => {
  if (!userRole) return false;
  const allowedRoles = PERMISSIONS[permission];
  return allowedRoles ? allowedRoles.includes(userRole) : false;
};