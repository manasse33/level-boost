export const AdminOrders = ({ apiRequest }) => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await apiRequest('/admin/orders');
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <PageLoader />;

  const columns = [
    { key: 'order_number', label: 'N° Commande' },
    {
      key: 'user',
      label: 'Client',
      render: (val, row) => row.user?.name || 'N/A'
    },
    {
      key: 'total_amount',
      label: 'Montant',
      render: (val) => `${val?.toLocaleString()} FCFA`
    },
    {
      key: 'status',
      label: 'Statut',
      render: (val) => <Badge variant={val === 'completed' ? 'success' : 'warning'}>{val}</Badge>
    },
    {
      key: 'created_at',
      label: 'Date',
      render: (val) => new Date(val).toLocaleDateString('fr-FR')
    },
  ];

  const tabs = [
    { value: 'all', label: 'Toutes', count: orders.length },
    { value: 'pending', label: 'En attente', count: orders.filter(o => o.status === 'pending').length },
    { value: 'completed', label: 'Terminées', count: orders.filter(o => o.status === 'completed').length },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Toutes les Commandes</h1>
          <p className="text-slate-600 mt-1">Gérez toutes les commandes clients</p>
        </div>

        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <div className="mt-6">
          {orders.length > 0 ? (
            <DataTable
              columns={columns}
              data={orders}
              searchable
              onSearch={(query) => console.log('Search:', query)}
            />
          ) : (
            <EmptyState
              icon={ShoppingCart}
              title="Aucune commande"
              description="Les commandes apparaîtront ici"
            />
          )}
        </div>
      </div>
    </div>
  );
};

