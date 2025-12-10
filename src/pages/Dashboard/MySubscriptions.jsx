// ============= MY SUBSCRIPTIONS PAGE =============
export const MySubscriptionsPage = ({ apiRequest }) => {
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = async () => {
    try {
      const data = await apiRequest('/subscriptions');
      setSubscriptions(data.subscriptions || []);
    } catch (error) {
      console.error('Error loading subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (subscription) => {
    try {
      await apiRequest(`/subscriptions/${subscription.id}/cancel`, {
        method: 'POST',
      });
      setToast({ type: 'success', message: 'Abonnement annulé' });
      loadSubscriptions();
    } catch (error) {
      setToast({ type: 'error', message: error.message });
    }
  };

  const handleRenew = async (subscription) => {
    try {
      await apiRequest(`/subscriptions/${subscription.id}/renew`, {
        method: 'POST',
      });
      setToast({ type: 'success', message: 'Abonnement renouvelé' });
      loadSubscriptions();
    } catch (error) {
      setToast({ type: 'error', message: error.message });
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <AnimatePresence>
        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Mes Abonnements</h1>
          <p className="text-slate-600 mt-1">
            Gérez vos abonnements actifs
          </p>
        </div>

        {subscriptions.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subscriptions.map((subscription) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
                onCancel={handleCancel}
                onRenew={handleRenew}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Star}
            title="Aucun abonnement"
            description="Vous n'avez pas d'abonnement actif"
            action={
              <Button variant="primary">
                Découvrir nos abonnements
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
};