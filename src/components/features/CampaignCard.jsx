export const CampaignCard = ({ campaign, onStart, onPause, onComplete }) => {
  const statusColors = {
    draft: 'default',
    active: 'success',
    paused: 'warning',
    completed: 'primary',
  };

  const progress = (campaign.spent / campaign.budget) * 100;

  return (
    <Card>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">{campaign.name}</h3>
          <Badge variant="primary" size="sm">{campaign.type}</Badge>
        </div>
        <Badge variant={statusColors[campaign.status]}>
          {campaign.status}
        </Badge>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-600">Budget utilisé</span>
          <span className="font-bold text-slate-900">
            {campaign.spent.toLocaleString()} / {campaign.budget.toLocaleString()} FCFA
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      {campaign.metrics && (
        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div>
            <p className="text-2xl font-bold text-slate-900">
              {campaign.metrics.impressions || 0}
            </p>
            <p className="text-xs text-slate-500">Impressions</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">
              {campaign.metrics.clicks || 0}
            </p>
            <p className="text-xs text-slate-500">Clics</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">
              {campaign.metrics.conversions || 0}
            </p>
            <p className="text-xs text-slate-500">Conversions</p>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        {campaign.status === 'draft' && (
          <Button onClick={() => onStart(campaign)} variant="primary" size="sm" fullWidth>
            Lancer
          </Button>
        )}
        {campaign.status === 'active' && (
          <Button onClick={() => onPause(campaign)} variant="warning" size="sm" fullWidth>
            Mettre en pause
          </Button>
        )}
        {campaign.status === 'paused' && (
          <Button onClick={() => onStart(campaign)} variant="primary" size="sm" fullWidth>
            Reprendre
          </Button>
        )}
        {(campaign.status === 'active' || campaign.status === 'paused') && (
          <Button onClick={() => onComplete(campaign)} variant="secondary" size="sm" fullWidth>
            Terminer
          </Button>
        )}
      </div>
    </Card>
  );
};
