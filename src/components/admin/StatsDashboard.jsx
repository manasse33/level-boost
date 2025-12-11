// ============= STATS DASHBOARD =============
export const StatsDashboard = ({ stats }) => {
  const statCards = [
    {
      label: 'Revenus Total',
      value: `${(stats?.revenue || 0).toLocaleString()} FCFA`,
      icon: DollarSign,
      color: 'emerald',
      trend: stats?.revenueTrend || 0,
    },
    {
      label: 'Commandes',
      value: stats?.orders || 0,
      icon: ShoppingCart,
      color: 'indigo',
      trend: stats?.ordersTrend || 0,
    },
    {
      label: 'Nouveaux Clients',
      value: stats?.users || 0,
      icon: Users,
      color: 'purple',
      trend: stats?.usersTrend || 0,
    },
    {
      label: 'Taux Conversion',
      value: `${stats?.conversion || 0}%`,
      icon: TrendingUp,
      color: 'orange',
      trend: stats?.conversionTrend || 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <Card className="relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              {stat.trend !== 0 && (
                <div className={`flex items-center text-sm font-medium ${
                  stat.trend > 0 ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {stat.trend > 0 ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {Math.abs(stat.trend)}%
                </div>
              )}
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-slate-600">{stat.label}</div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
