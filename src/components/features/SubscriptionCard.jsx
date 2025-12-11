export const SubscriptionCard = ({ subscription, onCancel, onRenew }) => {
  const isActive = subscription.status === 'active';
  const isExpiring = new Date(subscription.expires_at) - new Date() < 7 * 24 * 60 * 60 * 1000; // 7 jours

  return (
    <Card className={isActive ? 'border-2 border-indigo-600' : ''}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-1">
            {subscription.package.name}
          </h3>
          <p className="text-sm text-slate-500">
            {subscription.billing_cycle}
          </p>
        </div>
        <Badge variant={isActive ? 'success' : 'default'}>
          {subscription.status}
        </Badge>
      </div>

      <div className="mb-6">
        <p className="text-3xl font-bold text-slate-900">
          {subscription.price.toLocaleString()} FCFA
        </p>
        <p className="text-sm text-slate-500">par {subscription.billing_cycle}</p>
      </div>

      {isExpiring && isActive && (
        <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-sm text-orange-800 font-medium">
            ⚠️ Expire le {new Date(subscription.expires_at).toLocaleDateString('fr-FR')}
          </p>
        </div>
      )}

      <div className="flex gap-2">
        {isActive ? (
          <>
            {!subscription.auto_renew && (
              <Button onClick={() => onRenew(subscription)} variant="primary" size="sm" fullWidth>
                Renouveler
              </Button>
            )}
            <Button onClick={() => onCancel(subscription)} variant="danger" size="sm" fullWidth>
              Annuler
            </Button>
          </>
        ) : (
          <Button onClick={() => onRenew(subscription)} variant="primary" size="sm" fullWidth>
            Réactiver
          </Button>
        )}
      </div>
    </Card>
  );
};
