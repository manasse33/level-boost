export const MetricCard = ({ label, value, icon: Icon, change, color = 'indigo' }) => (
  <div className={`bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-xl p-6 text-white`}>
    <div className="flex items-center justify-between mb-4">
      <div className="text-sm font-medium opacity-90">{label}</div>
      {Icon && <Icon className="w-6 h-6 opacity-75" />}
    </div>
    <div className="text-3xl font-bold mb-2">{value}</div>
    {change && (
      <div className="flex items-center text-sm">
        {change > 0 ? (
          <TrendingUp className="w-4 h-4 mr-1" />
        ) : (
          <TrendingDown className="w-4 h-4 mr-1" />
        )}
        <span>{Math.abs(change)}% vs dernier mois</span>
      </div>
    )}
  </div>
);