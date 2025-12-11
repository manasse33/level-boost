// ============= ALERT =============
export const Alert = ({ type = 'info', title, message, onClose }) => {
  const types = {
    info: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: AlertCircle },
    success: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800', icon: CheckCircle },
    warning: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', icon: AlertCircle },
    error: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', icon: AlertCircle },
  };

  const { bg, border, text, icon: Icon } = types[type];

  return (
    <div className={`${bg} border ${border} rounded-lg p-4 flex items-start`}>
      <Icon className={`w-5 h-5 ${text} mr-3 flex-shrink-0 mt-0.5`} />
      <div className="flex-1">
        {title && <h4 className={`font-bold ${text} mb-1`}>{title}</h4>}
        <p className={`text-sm ${text}`}>{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className={`${text} hover:opacity-70 ml-3`}>
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};