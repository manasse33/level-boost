export const QuickActions = ({ actions }) => (
  <Card>
    <h3 className="text-lg font-bold text-slate-900 mb-6">Actions Rapides</h3>
    <div className="grid grid-cols-2 gap-3">
      {actions.map((action, idx) => (
        <button
          key={idx}
          onClick={action.onClick}
          className="flex items-center justify-center px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition text-slate-700 font-medium"
        >
          {action.icon && <action.icon className="w-5 h-5 mr-2" />}
          {action.label}
        </button>
      ))}
    </div>
  </Card>
);
