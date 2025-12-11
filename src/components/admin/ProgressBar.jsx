export const ProgressBar = ({ value, max, label, showPercentage = true }) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-700">{label}</span>
          {showPercentage && (
            <span className="text-sm font-bold text-slate-900">
              {percentage.toFixed(0)}%
            </span>
          )}
        </div>
      )}
      <div className="w-full bg-slate-200 rounded-full h-3">
        <div
          className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
