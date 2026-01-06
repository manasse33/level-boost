import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import adminService from '../../api/admin'; 
import AdminLayout from '../../layouts/AdminLayout';
import { can } from '../../utils/rbac';
import authService from '../../api/auth';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  
  const [stats, setStats] = useState({
    revenue: 0,
    orders_count: 0,
    leads_count: 0,
    active_users: 0
  });

  const [topPackages, setTopPackages] = useState([]);
  
  // Récupération du rôle
  const user = authService.getCurrentUser();
  const role = user?.role;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // CORRECTION ICI : On passe le rôle à la fonction API
        const response = await adminService.getStats(role);
        const data = response.data;

        setStats({
          revenue: data.stats?.revenue_this_month || 0,
          orders_count: data.stats?.total_orders || 0,
          leads_count: data.stats?.new_leads_this_week || 0,
          active_users: data.stats?.total_users || 0
        });

        if (data.top_packages) {
          setTopPackages(data.top_packages);
        }

      } catch (err) {
        console.error("Erreur API:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [role]); // Ajout de 'role' dans les dépendances

  const colors = {
    primary: "#EF4444",      
    secondary: "#3A3086",    
    accentYellow: "#FBBF24", 
  };

  return (
    <AdminLayout title="Vue d'ensemble">
      <div className="flex flex-col gap-8">
        
        {/* --- KPI GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Admin & Client : Finances */}
          {can(role, 'VIEW_OWN_ORDERS') && (
             <>
               <KpiCard title="Chiffre d'affaires" value={`${Number(stats.revenue).toLocaleString()} FCFA`} icon="payments" color={colors.secondary} trend="Ce mois" isLoading={loading} />
               <KpiCard title="Commandes" value={stats.orders_count} icon="shopping_bag" color={colors.primary} trend="Total" isLoading={loading} />
             </>
          )}

          {/* Admin & Sales : Leads */}
          {can(role, 'MANAGE_LEADS') && (
             <KpiCard title="Nouveaux Leads" value={stats.leads_count} icon="group_add" color={colors.accentYellow} trend="Semaine" isLoading={loading} />
          )}

          {/* Admin : Users */}
          {can(role, 'MANAGE_USERS') && (
             <KpiCard title="Utilisateurs Total" value={stats.active_users} icon="person" color="#10B981" trend="Actifs" isLoading={loading} />
          )}
          
          {/* Fallback si aucune carte n'est affichée (ex: CM/DA sans stats définies) */}
          {!can(role, 'VIEW_OWN_ORDERS') && !can(role, 'MANAGE_LEADS') && !can(role, 'MANAGE_USERS') && (
             <div className="col-span-4 bg-blue-50 p-4 rounded-xl text-[#3A3086]">
               Bienvenue sur votre espace <strong>{role}</strong>. Utilisez le menu pour naviguer.
             </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Liste des Packages (Masquée pour Sales, CM, DA qui n'en ont pas besoin) */}
          {(role === 'admin' || role === 'client') && (
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800">Top Services</h3>
                {role === 'admin' && (
                  <Link to="/admin/packages" className="text-xs font-bold text-[#3A3086] bg-indigo-50 px-3 py-1 rounded-lg hover:bg-indigo-100 transition-colors">Tout voir</Link>
                )}
              </div>
              
              <div className="space-y-4">
                {loading ? (
                  <div className="py-4 text-center text-slate-400">Chargement...</div>
                ) : topPackages.length > 0 ? (
                  topPackages.slice(0, 3).map((pkg) => (
                    <div key={pkg.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#EF4444] font-bold">
                          {pkg.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">{pkg.name}</h4>
                          <p className="text-xs text-slate-500">{Number(pkg.price).toLocaleString()} FCFA</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-400 italic text-center py-4">Aucun service populaire</p>
                )}
              </div>
            </div>
          )}

          {/* Actions Rapides (Adaptatives) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Raccourcis</h3>
            <div className="space-y-3">
              
              {can(role, 'ORDER_PACKAGE') && (
                <Link to="/admin/packages" className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-[#EF4444] transition-all group">
                   <div className="w-8 h-8 rounded-full bg-red-100 text-[#EF4444] flex items-center justify-center">
                      <span className="material-symbols-rounded text-sm">add</span>
                   </div>
                   <span className="text-sm font-bold text-slate-600 group-hover:text-[#EF4444]">
                     {role === 'admin' ? 'Créer un Service' : 'Commander'}
                   </span>
                </Link>
              )}

              {can(role, 'MANAGE_LEADS') && (
                <Link to="/admin/leads" className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-[#3A3086] transition-all group">
                   <div className="w-8 h-8 rounded-full bg-indigo-100 text-[#3A3086] flex items-center justify-center">
                      <span className="material-symbols-rounded text-sm">person_add</span>
                   </div>
                   <span className="text-sm font-bold text-slate-600 group-hover:text-[#3A3086]">Ajouter un Lead</span>
                </Link>
              )}

              {can(role, 'MANAGE_CAMPAIGNS') && (
                <Link to="/admin/campaigns" className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-green-600 transition-all group">
                   <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                      <span className="material-symbols-rounded text-sm">campaign</span>
                   </div>
                   <span className="text-sm font-bold text-slate-600 group-hover:text-green-600">Gérer Campagnes</span>
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
};

const KpiCard = ({ title, value, icon, color, trend, isLoading }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
    <div className="flex justify-between items-start mb-4">
      <div 
        className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm"
        style={{ backgroundColor: `${color}20`, color: color }} 
      >
        <span className="material-symbols-rounded text-2xl">{icon}</span>
      </div>
      <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-slate-100 text-slate-500">
        {trend}
      </span>
    </div>
    
    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
    
    {isLoading ? (
      <div className="h-8 w-24 bg-slate-200 animate-pulse rounded"></div>
    ) : (
      <h3 className="text-2xl font-black text-slate-800 tracking-tight">{value}</h3>
    )}
  </div>
);

export {AdminDashboard};
export default AdminDashboard;