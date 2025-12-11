export const ReportCard = ({ report, onView, onDownload }) => {
  const reportTypes = {
    weekly: { label: 'Hebdomadaire', color: 'primary' },
    monthly: { label: 'Mensuel', color: 'success' },
    campaign: { label: 'Campagne', color: 'warning' },
    final: { label: 'Final', color: 'danger' },
  };

  const reportType = reportTypes[report.type];

  return (
    <Card hover onClick={onView}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <Badge variant={reportType.color} size="sm" className="mb-2">
            {reportType.label}
          </Badge>
          <h3 className="text-lg font-bold text-slate-900">
            Rapport {reportType.label}
          </h3>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDownload(report);
          }}
          className="p-2 hover:bg-slate-100 rounded-lg"
        >
          <Download className="w-4 h-4 text-slate-600" />
        </button>
      </div>

      <div className="mb-4">
        <p className="text-sm text-slate-600 mb-2">
          Période: {new Date(report.period_start).toLocaleDateString('fr-FR')} -{' '}
          {new Date(report.period_end).toLocaleDateString('fr-FR')}
        </p>
      </div>

      {report.metrics && (
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900">
              {report.metrics.views?.toLocaleString() || 0}
            </p>
            <p className="text-xs text-slate-500">Vues</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900">
              {report.metrics.engagement || 0}%
            </p>
            <p className="text-xs text-slate-500">Engagement</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900">
              {report.metrics.conversions || 0}
            </p>
            <p className="text-xs text-slate-500">Conversions</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t">
        <span className="flex items-center">
          <Calendar className="w-3 h-3 mr-1" />
          {new Date(report.generated_at).toLocaleDateString('fr-FR')}
        </span>
        <span className="text-indigo-600 font-medium">Voir le détail →</span>
      </div>
    </Card>
  );
};
