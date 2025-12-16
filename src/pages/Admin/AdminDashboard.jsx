import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios'; 
import authService from '../../api/auth';
import { 
  Lock, Trophy, Users, ShoppingCart, TrendingUp, 
  PlusCircle, Clock, ArrowRight, Phone, Mail, 
  Home, CreditCard, Package as PackageIcon, CheckCircle, Loader2
} from 'lucide-react';

export function AdminDashboard() {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  // --- States ---
  const [loading, setLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentLeads, setRecentLeads] = useState([]);
  const [activeContests, setActiveContests] = useState([]);
  const [packages, setPackages] = useState([]); // <--- NOUVEAU STATE POUR LES PACKAGES

  // --- Helpers ---
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  const getStatusColor = (status) => {
    const colors = {
      paid: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      pending: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
      cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
      new: 'text-blue-600',
      won: 'text-green-600',
    };
    return colors[status] || 'text-slate-500';
  };

  // --- Fetch Data ---
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Exécution en parallèle pour la performance
        const [dashboardRes, leadsRes, contestsRes, packagesRes] = await Promise.all([
          api.get('/admin/dashboard'),           // DashboardController@adminStats
          api.get('/admin/leads?per_page=4'),    // LeadController@index
          api.get('/admin/contests?status=active&per_page=3'), // ContestController@index
          api.get('/admin/packages')             // PackageController@index (INTÉGRATION ICI)
        ]);

        setDashboardStats(dashboardRes.data.stats);
        setRecentOrders(dashboardRes.data.recent_orders);
        setRecentLeads(leadsRes.data.data);
        setActiveContests(contestsRes.data.data);
        setPackages(packagesRes.data.slice(0, 5)); // On garde les 5 premiers pour l'affichage

        setLoading(false);
      } catch (error) {
        console.error("Erreur chargement dashboard:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statsCards = dashboardStats ? [
    {
      title: "Concours Actifs",
      value: dashboardStats.active_contests || 0,
      icon: <Trophy className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: "Nouveaux Leads",
      value: dashboardStats.new_leads_this_week || 0,
      trend: true,
      icon: <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      bg: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      title: "Commandes Totales",
      value: dashboardStats.total_orders || 0,
      icon: <ShoppingCart className="w-5 h-5 text-orange-600 dark:text-orange-400" />,
      bg: "bg-orange-100 dark:bg-orange-900/30",
    }
  ] : [];

  const navItems = [
    { label: "Accueil", icon: <Home className="w-5 h-5" />, active: true, path: '/dashboard' },
    { label: "Services", icon: <PackageIcon className="w-5 h-5" />, active: false, path: '/packages' },
    { label: "Concours", icon: <Trophy className="w-5 h-5" />, active: false, path: '/contests' },
    { label: "CRM", icon: <Users className="w-5 h-5" />, active: false, path: '/leads' },
    { label: "Commandes", icon: <ShoppingCart className="w-5 h-5" />, active: false, path: '/orders' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-sans pb-24 md:pb-0">
      
      {/* TOP BAR */}
      <div className="sticky top-0 z-50 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="hidden sm:block">
                <h2 className="text-sm font-bold leading-tight">{user?.name}</h2>
                <p className="text-xs text-slate-500">Admin Panel</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-700/50 p-1 rounded-lg">
              {navItems.map((item, index) => (
                <button 
                  key={index}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    item.active 
                      ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-white shadow-sm' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
               <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/30 px-3 py-1.5 rounded-full border border-green-200 dark:border-green-800">
                <Lock className="w-3 h-3 text-green-700 dark:text-green-400" />
                <span className="text-[10px] font-bold text-green-700 dark:text-green-400 uppercase tracking-wider">Sécurisé</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Vue d'ensemble</p>
            <h1 className="text-2xl md:text-3xl font-bold">Tableau de bord</h1>
          </div>
          <div className="flex gap-3">
            <button className="hidden md:flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-white border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-50">
              <PackageIcon className="w-4 h-4" />
              Gérer Offres
            </button>
            <button className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg shadow-blue-600/20">
              <PlusCircle className="w-4 h-4" />
              Nouveau Projet
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {statsCards.map((stat, index) => (
            <div key={index} className="flex flex-col gap-3 rounded-2xl p-5 bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center`}>
                  {stat.icon}
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase">{stat.title}</p>
              </div>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* GAUCHE (2/3) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Contests */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5 shadow-sm">
              <h3 className="text-lg font-bold mb-4">Concours Actifs</h3>
              {activeContests.length === 0 ? (
                <p className="text-slate-500 text-sm">Aucun concours actif.</p>
              ) : (
                activeContests.map((contest) => (
                  <div key={contest.id} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-yellow-500" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">{contest.name}</p>
                        <p className="text-xs text-slate-500">{contest.participants_count} participants</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">Actif</span>
                  </div>
                ))
              )}
            </div>

            {/* Leads */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5 shadow-sm">
              <h3 className="text-lg font-bold mb-4">Derniers Leads</h3>
              <div className="space-y-3">
                {recentLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                        {lead.name.substring(0,2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{lead.name}</p>
                        <p className="text-xs text-slate-500">{lead.email}</p>
                      </div>
                    </div>
                    <div className={`text-xs font-bold ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* DROITE (1/3) */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* --- NOUVEAU: LISTE DES PACKAGES (PackageController) --- */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Offres & Services</h3>
                <PackageIcon className="w-4 h-4 text-slate-400" />
              </div>
              
              <div className="space-y-4">
                {packages.length === 0 ? (
                  <p className="text-sm text-slate-500">Aucun package configuré.</p>
                ) : (
                  packages.map((pkg) => (
                    <div key={pkg.id} className="group flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-blue-500 rounded-full group-hover:h-10 transition-all"></div>
                        <div>
                          <p className="font-bold text-sm text-slate-800 dark:text-slate-200">{pkg.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{pkg.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm">{formatCurrency(pkg.price)}</p>
                        {pkg.active && <p className="text-[10px] text-green-600 flex items-center justify-end gap-1"><CheckCircle className="w-3 h-3" /> Actif</p>}
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <button className="w-full mt-4 py-2 text-xs font-bold text-blue-600 border border-blue-200 dark:border-blue-900 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                Gérer le catalogue
              </button>
            </div>

            {/* Revenue Card */}
            {dashboardStats && (
              <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg">
                <p className="text-blue-100 text-sm font-medium mb-1">Revenu du Mois</p>
                <h3 className="text-3xl font-bold mb-4">{formatCurrency(dashboardStats.revenue_this_month || 0)}</h3>
                <div className="flex justify-between text-xs font-medium border-t border-white/20 pt-3">
                  <span>Commandes validées</span>
                  <span>{dashboardStats.total_orders}</span>
                </div>
              </div>
            )}

            {/* Recent Orders Mini List */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5 shadow-sm">
               <h3 className="text-lg font-bold mb-4">Dernières commandes</h3>
               <div className="space-y-3">
                 {recentOrders.map(order => (
                   <div key={order.id} className="flex justify-between items-center text-sm">
                     <span className="text-slate-600 dark:text-slate-300">
                        {order.package?.name || 'Service'}
                     </span>
                     <span className={`px-2 py-0.5 rounded text-xs font-bold ${getStatusColor(order.status)}`}>
                       {formatCurrency(order.total_amount)}
                     </span>
                   </div>
                 ))}
               </div>
            </div>

          </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 pb-safe pt-2 px-6 z-40">
        <div className="flex justify-between items-center h-16 max-w-md mx-auto">
          {navItems.map((item, index) => (
            <button 
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center gap-1 w-12 transition-colors ${
                item.active ? 'text-blue-600' : 'text-slate-400'
              }`}
            >
              {React.cloneElement(item.icon, { className: "w-6 h-6" })}
            </button>
          ))}
        </div>
      </div>
       <style jsx>{`
        .pb-safe { padding-bottom: env(safe-area-inset-bottom); }
      `}</style>
    </div>
  );
}

export default AdminDashboard;