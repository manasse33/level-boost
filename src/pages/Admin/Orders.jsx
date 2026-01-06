import React, { useState, useEffect } from 'react';
import adminService from '../../api/admin';
import AdminLayout from '../../layouts/AdminLayout';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Chargement des données ---
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await adminService.getOrders();
        
        // Sécurité : on s'assure que c'est un tableau
        let ordersData = response.data;
        if (ordersData && ordersData.data && Array.isArray(ordersData.data)) {
          ordersData = ordersData.data;
        }
        if (!Array.isArray(ordersData)) ordersData = [];

        setOrders(ordersData);
      } catch (error) {
        console.error("Erreur chargement commandes", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // --- Helpers pour l'affichage ---
  
  // Couleurs des statuts
  const getStatusStyle = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'paid': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'in_progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  // Traduction des statuts
  const getStatusLabel = (status) => {
    const labels = {
      'pending': 'En attente',
      'paid': 'Payé',
      'in_progress': 'En cours',
      'completed': 'Terminé',
      'cancelled': 'Annulé'
    };
    return labels[status] || status;
  };

  // Calcul des stats en temps réel
  const stats = {
    pending: orders.filter(o => o.status === 'pending').length,
    inProgress: orders.filter(o => o.status === 'in_progress').length,
    completed: orders.filter(o => o.status === 'completed').length,
    total: orders.length
  };

  return (
    <AdminLayout title="Gestion des Commandes">
      
      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          icon="pending_actions" 
          color="text-orange-500 bg-orange-50" 
          label="En attente" 
          value={stats.pending} 
        />
        <StatCard 
          icon="construction" 
          color="text-blue-600 bg-blue-50" 
          label="En production" 
          value={stats.inProgress} 
        />
        <StatCard 
          icon="check_circle" 
          color="text-green-600 bg-green-50" 
          label="Terminées" 
          value={stats.completed} 
        />
        <StatCard 
          icon="receipt_long" 
          color="text-[#3A3086] bg-indigo-50" 
          label="Total Commandes" 
          value={stats.total} 
        />
      </div>

      {/* --- TABLEAU DES COMMANDES --- */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        
        {/* Toolbar simple */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50">
          <div className="relative w-full sm:w-72">
            <span className="material-symbols-rounded absolute left-3 top-2.5 text-slate-400">search</span>
            <input 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#3A3086]" 
              placeholder="Rechercher (N° Commande, Client)..." 
            />
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-bold flex items-center gap-2">
              <span className="material-symbols-rounded text-lg">filter_list</span>
              Filtres
            </button>
            <button className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-bold flex items-center gap-2">
              <span className="material-symbols-rounded text-lg">download</span>
              Export
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="py-4 px-6">Commande</th>
                <th className="py-4 px-6">Client</th>
                <th className="py-4 px-6">Montant</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Statut</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-slate-400">
                    <div className="flex justify-center items-center gap-2">
                      <span className="w-5 h-5 border-2 border-slate-300 border-t-[#3A3086] rounded-full animate-spin"></span>
                      Chargement des commandes...
                    </div>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-slate-500 italic">
                    Aucune commande trouvée.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors group">
                    {/* ID & Package */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#3A3086]">#{order.order_number}</span>
                        <span className="text-xs text-slate-500">
                          {order.package ? order.package.name : 'Service personnalisé'}
                        </span>
                      </div>
                    </td>

                    {/* Client Info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs border border-slate-200">
                          {order.user?.name ? order.user.name.charAt(0).toUpperCase() : '?'}
                        </div>
                        <span className="text-sm font-medium text-slate-700">
                          {order.user?.name || 'Client inconnu'}
                        </span>
                      </div>
                    </td>

                    {/* Montant */}
                    <td className="py-4 px-6">
                      <span className="text-sm font-bold text-slate-800">
                        {Number(order.total_amount).toLocaleString()} FCFA
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6">
                      <span className="text-sm text-slate-500">
                        {new Date(order.created_at).toLocaleDateString('fr-FR')}
                      </span>
                    </td>

                    {/* Statut Badge */}
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(order.status)}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <button className="p-2 text-slate-400 hover:text-[#3A3086] hover:bg-indigo-50 rounded-full transition-colors" title="Voir détails">
                        <span className="material-symbols-rounded">visibility</span>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-[#EF4444] hover:bg-red-50 rounded-full transition-colors" title="Supprimer">
                        <span className="material-symbols-rounded">delete</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer (Statique pour l'instant) */}
        {!loading && orders.length > 0 && (
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <p className="text-xs text-slate-500">Affichage de {orders.length} résultats</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-white border border-slate-200 rounded hover:bg-slate-50 text-xs font-bold disabled:opacity-50">Précédent</button>
              <button className="px-3 py-1 bg-white border border-slate-200 rounded hover:bg-slate-50 text-xs font-bold">Suivant</button>
            </div>
          </div>
        )}
      </div>

    </AdminLayout>
  );
};

// Sous-composant StatCard
const StatCard = ({ icon, color, label, value }) => (
  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
      <span className="material-symbols-rounded text-2xl">{icon}</span>
    </div>
    <div>
      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-black text-slate-800">{value}</p>
    </div>
  </div>
);

export { AdminOrders };
export default AdminOrders;