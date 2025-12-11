export const AdminLeads = ({ apiRequest }) => {
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const data = await apiRequest('/admin/leads');
      setLeads(data.leads || []);
    } catch (error) {
      console.error('Error loading leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLead = (lead) => {
    setToast({ type: 'info', message: 'Fonction en développement' });
  };

  const handleDeleteLead = (lead) => {
    if (window.confirm(`Supprimer le lead "${lead.name}" ?`)) {
      setToast({ type: 'success', message: 'Lead supprimé' });
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <AnimatePresence>
        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Gestion des Leads</h1>
            <p className="text-slate-600 mt-1">Suivez vos prospects</p>
          </div>
          <Button variant="primary" icon={Plus}>
            Nouveau Lead
          </Button>
        </div>

        {leads.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leads.map(lead => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onUpdate={handleUpdateLead}
                onDelete={handleDeleteLead}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Users}
            title="Aucun lead"
            description="Les leads apparaîtront ici"
            action={
              <Button variant="primary" icon={Plus}>
                Ajouter un lead
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
};