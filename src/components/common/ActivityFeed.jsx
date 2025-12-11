// ============= ACTIVITY FEED =============
export const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'order':
        return ShoppingCart;
      case 'profile':
        return Users;
      case 'post':
        return Eye;
      case 'payment':
        return DollarSign;
      default:
        return AlertCircle;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'order':
        return 'indigo';
      case 'profile':
        return 'emerald';
      case 'post':
        return 'purple';
      case 'payment':
        return 'orange';
      default:
        return 'slate';
    }
  };

  return (
    <Card>
      <h3 className="text-lg font-bold text-slate-900 mb-6">Activité Récente</h3>
      <div className="space-y-4">
        {activities.map((activity, idx) => {
          const Icon = getActivityIcon(activity.type);
          const color = getActivityColor(activity.type);

          return (
            <div key={idx} className="flex items-start">
              <div className={`w-10 h-10 bg-${color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 text-${color}-600`} />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-slate-900">
                  {activity.title}
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  {activity.description}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {activity.timestamp}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};