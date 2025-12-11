// ============= EMPTY STATE =============
export const EmptyState = ({ icon: Icon, title, description, action }) => (
  <div className="text-center py-12">
    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <Icon className="w-8 h-8 text-slate-400" />
    </div>
    <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-600 mb-6 max-w-md mx-auto">{description}</p>
    {action && action}
  </div>
);
