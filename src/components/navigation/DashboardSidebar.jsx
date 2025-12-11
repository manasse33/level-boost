// ============= DASHBOARD SIDEBAR =============
export const DashboardSidebar = ({ currentPage, onNavigate, user }) => {
  const menuItems = [
    { path: '/dashboard', label: 'Vue d\'ensemble', icon: Grid },
    { path: '/dashboard/profiles', label: 'Mes Profils', icon: User },
    { path: '/dashboard/orders', label: 'Mes Commandes', icon: ShoppingCart },
    { path: '/dashboard/subscriptions', label: 'Abonnements', icon: ShoppingCart },
    { path: '/dashboard/settings', label: 'Paramètres', icon: Settings },
  ];

  const adminItems = [
    { path: '/admin', label: 'Admin Dashboard', icon: Grid },
    { path: '/admin/orders', label: 'Toutes Commandes', icon: ShoppingCart },
    { path: '/admin/leads', label: 'Leads', icon: User },
  ];

  const isAdmin = user?.role === 'admin';

  return (
    <div className="w-64 bg-white border-r border-slate-200 min-h-screen p-6">
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <p className="font-bold text-slate-900">{user?.name}</p>
            <p className="text-xs text-slate-500">{user?.email}</p>
          </div>
        </div>
      </div>

      <nav className="space-y-1">
        {menuItems.map(item => (
          <button
            key={item.path}
            onClick={() => onNavigate(item.path)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              currentPage === item.path
                ? 'bg-indigo-50 text-indigo-600 font-medium'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}

        {isAdmin && (
          <>
            <div className="my-4 border-t border-slate-200 pt-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-4">
                Administration
              </p>
            </div>
            {adminItems.map(item => (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                  currentPage === item.path
                    ? 'bg-indigo-50 text-indigo-600 font-medium'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </>
        )}
      </nav>
    </div>
  );
};