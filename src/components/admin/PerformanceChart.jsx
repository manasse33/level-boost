export const PerformanceChart = ({ data, title, metric }) => {
  // Simuler un graphique simple avec des barres
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <Badge variant="primary">{metric}</Badge>
      </div>

      <div className="space-y-4">
        {data.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-700">
                {item.label}
              </span>
              <span className="text-sm font-bold text-slate-900">
                {item.value.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

