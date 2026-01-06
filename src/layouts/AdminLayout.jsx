import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import authService from '../api/auth';
import { can } from '../utils/rbac';

const AdminLayout = ({ children, title, actions }) => {
  const location = useLocation();
  const user = authService.getCurrentUser();
  const role = user?.role;

  const colors = { primary: "#EF4444", secondary: "#3A3086" };

  return (
    <div className="flex h-screen w-screen bg-[#F3F4F6] font-['Manrope',sans-serif] overflow-hidden text-slate-800">
      
      <aside className="w-72 flex-shrink-0 flex flex-col h-full shadow-2xl z-20 hidden md:flex" style={{ backgroundColor: colors.secondary }}>
        <div className="h-20 flex items-center gap-3 px-8 border-b border-white/10">
           <h1 className="text-white font-bold text-lg">Level Boost</h1>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
          
          {/* ===================================================
              GLOBAL (Accessible à tous les rôles authentifiés)
              PHP: Route::get('/dashboard') & Route::get('/admin/dashboard')
          =================================================== */}
          <NavItem to="/admin/dashboard" icon="grid_view" label="Dashboard" currentPath={location.pathname} />


          {/* ===================================================
              GROUPE CM & ADMIN
              PHP: Route::middleware(['auth:sanctum', 'role:admin,cm'])
          =================================================== */}
          {can(role, 'MANAGE_CAMPAIGNS') && (
            <NavItem to="/admin/campaigns" icon="campaign" label="Campagnes" currentPath={location.pathname} />
          )}


          {/* ===================================================
              GROUPE SALES & ADMIN
              PHP: Route::middleware(['auth:sanctum', 'role:admin,sales'])
          =================================================== */}
          {can(role, 'MANAGE_LEADS') && (
            <NavItem to="/admin/leads" icon="contacts" label="Leads & CRM" currentPath={location.pathname} />
          )}


          {/* ===================================================
              GROUPE DA & ADMIN
              PHP: Route::middleware(['auth:sanctum', 'role:admin,da'])
          =================================================== */}
          {can(role, 'MANAGE_DELIVERABLES') && (
            <NavItem to="/admin/deliverables" icon="brush" label="Livrables" currentPath={location.pathname} />
          )}


          {/* ===================================================
              GROUPE CLIENT & ADMIN (Commandes)
              PHP: Admin a /admin/orders, Client a /orders.
              Sales/CM/DA n'ont PAS d'accès dans ton fichier.
          =================================================== */}
          {can(role, 'VIEW_ORDERS') && ( 
            <NavItem to="/admin/orders" icon="shopping_cart" label="Commandes" currentPath={location.pathname} />
          )}


          {/* ===================================================
              GROUPE CLIENT UNIQUEMENT
              PHP: Route::middleware(['auth:sanctum', 'role:client']) -> /subscriptions
          =================================================== */}
          {can(role, 'VIEW_SUBSCRIPTIONS') && (
             <NavItem to="/admin/subscriptions" icon="card_membership" label="Mon Abonnement" currentPath={location.pathname} />
          )}


          {/* ===================================================
              GROUPE ADMIN PUR
              PHP: Route::middleware(['auth:sanctum', 'role:admin'])
              Inclus: Packages, Contests, Users
          =================================================== */}
          {can(role, 'MANAGE_ADMIN_RESOURCES') && (
            <>
              <div className="my-4 border-t border-white/10 mx-4"></div>
              <p className="px-4 text-[10px] uppercase font-bold text-white/40 mb-2">Administration</p>
              
              <NavItem to="/admin/packages" icon="inventory_2" label="Services" currentPath={location.pathname} />
              <NavItem to="/admin/contests" icon="emoji_events" label="Concours" currentPath={location.pathname} />
              <NavItem to="/admin/users" icon="group" label="Utilisateurs" currentPath={location.pathname} />
            </>
          )}
          
          <div className="my-6 border-t border-white/10 mx-4"></div>
          <NavItem to="/admin/profile" icon="settings" label="Paramètres" currentPath={location.pathname} />
        </nav>

        <div className="p-6 border-t border-white/10 bg-black/20">
           <p className="text-white text-sm font-bold truncate">{user?.name || 'Utilisateur'}</p>
           <p className="text-white/60 text-xs uppercase">{role}</p>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-10 shadow-sm">
           <h2 className="text-2xl font-black text-[#111827]">{title}</h2>
           {actions && <div>{actions}</div>}
        </header>

        <main className="flex-1 overflow-y-auto p-8 bg-[#F3F4F6]">
           <div className="max-w-7xl mx-auto pb-12">{children}</div>
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, to, currentPath }) => {
  const isActive = currentPath === to;
  return (
    <Link to={to} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive ? 'bg-white/10 text-white shadow-lg font-bold border border-white/5' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}>
      <span className={`material-symbols-rounded text-xl ${isActive ? 'text-[#FBBF24]' : 'group-hover:text-[#FBBF24] transition-colors'}`}>{icon}</span>
      <span className="text-sm tracking-wide">{label}</span>
    </Link>
  );
};

export default AdminLayout;