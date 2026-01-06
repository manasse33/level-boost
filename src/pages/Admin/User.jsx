import React, { useState, useEffect } from 'react';
import adminService from '../../api/admin';
import AdminLayout from '../../layouts/AdminLayout';
import authService from '../../api/auth';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = authService.getCurrentUser();

  // Sécurité : Redirection si pas Admin
  useEffect(() => {
    if (currentUser?.role !== 'admin') {
      window.location.href = '/admin/dashboard'; // Ou page 403
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await adminService.getUsers();
        
        let usersData = response.data;
        if (usersData && usersData.data && Array.isArray(usersData.data)) {
          usersData = usersData.data;
        }
        if (!Array.isArray(usersData)) usersData = [];
        
        setUsers(usersData);
      } catch (error) {
        console.error("Erreur chargement utilisateurs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const getRoleBadge = (role) => {
    switch(role) {
        case 'admin': return 'bg-purple-100 text-purple-700 border-purple-200';
        case 'client': return 'bg-orange-100 text-orange-700 border-orange-200';
        case 'sales': return 'bg-blue-100 text-blue-700 border-blue-200';
        case 'cm': return 'bg-pink-100 text-pink-700 border-pink-200';
        case 'da': return 'bg-teal-100 text-teal-700 border-teal-200';
        default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <AdminLayout title="Gestion des Utilisateurs">
      
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-slate-700">{users.length} Utilisateurs</h3>
            {/* Bouton pour ajouter (si besoin de modale plus tard) */}
            <button className="px-4 py-2 bg-[#3A3086] text-white rounded-lg text-sm font-bold shadow-md">
                Ajouter
            </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="px-6 py-4">Utilisateur</th>
                <th className="px-6 py-4">Rôle</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Téléphone</th>
                <th className="px-6 py-4">Inscrit le</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="6" className="p-10 text-center text-slate-400">Chargement...</td></tr>
              ) : users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[#3A3086] border border-slate-200">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-bold text-slate-800">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase border ${getRoleBadge(user.role)}`}>
                        {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{user.phone || '-'}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-[#3A3086]"><span className="material-symbols-rounded">edit</span></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </AdminLayout>
  );
};

export {AdminUsers};
export default AdminUsers;