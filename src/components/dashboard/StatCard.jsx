// ============= STAT CARD =============
export const StatCard = ({ icon: Icon, label, value, color = 'indigo', trend }) => (
  <Card hover>
    <div className={`w-12 h-12 bg-${color}-50 rounded-lg flex items-center justify-center mb-4`}>
      <Icon className={`w-6 h-6 text-${color}-600`} />
    </div>
    <div className="text-3xl font-bold text-slate-900 mb-1">{value}</div>
    <div className="text-sm text-slate-600">{label}</div>
    {trend && (
      <div className={`text-xs font-medium mt-2 ${trend > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
        {trend > 0 ? '+' : ''}{trend}% ce mois
      </div>
    )}
  </Card>
);