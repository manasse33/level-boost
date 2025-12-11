export const StatusIndicator = ({ status, labels }) => {
  const statusConfig = {
    success: { icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    error: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
    warning: { icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-50' },
    pending: { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
  };

  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center px-3 py-2 rounded-lg ${config.bg}`}>
      <Icon className={`w-4 h-4 ${config.color} mr-2`} />
      <span className={`text-sm font-medium ${config.color}`}>
        {labels?.[status] || status}
      </span>
    </div>
  );
};