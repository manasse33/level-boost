// ============= MY ORDERS PAGE =============
export const MyOrdersPage = ({ apiRequest }) => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await apiRequest('/orders');
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedOrder(null);
        }}
        title={`Commande #${selectedOrder?.order_number}`}
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500 mb-1">Statut</p>
                <p className="font-bold text-slate-900">{selectedOrder.status}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Montant total</p>
                <p className="font-bold text-slate-900">
                  {selectedOrder.total_amount?.toLocaleString()} FCFA
                </p>
              </div>
            </div>
            {/* Add more order details */}
          </div>
        )}
      </Modal>

      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Mes Commandes</h1>
          <p className="text-slate-600 mt-1">
            Suivez l'état de vos commandes
          </p>
        </div>

        {orders.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onClick={() => {
                  setSelectedOrder(order);
                  setModalOpen(true);
                }}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={ShoppingCart}
            title="Aucune commande"
            description="Vous n'avez pas encore passé de commande"
            action={
              <Button variant="primary">
                Découvrir nos packs
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
};
