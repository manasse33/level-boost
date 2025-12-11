export const OrderCard = ({ order, onClick }) => {
  const statusColors = {
    pending: 'warning',
    in_progress: 'primary',
    completed: 'success',
    cancelled: 'danger',
  };

  const paymentColors = {
    pending: 'warning',
    partial: 'primary',
    paid: 'success',
    refunded: 'danger',
  };

  return (
    <Card hover onClick={onClick}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">
            Commande #{order.order_number}
          </h3>
          <p className="text-sm text-slate-500">
            {new Date(order.created_at).toLocaleDateString('fr-FR')}
          </p>
        </div>
        <Badge variant={statusColors[order.status]}>
          {order.status}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-slate-500 mb-1">Montant total</p>
          <p className="text-xl font-bold text-slate-900">
            {order.total_amount.toLocaleString()} FCFA
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">Paiement</p>
          <Badge variant={paymentColors[order.payment_status]} size="sm">
            {order.payment_status}
          </Badge>
        </div>
      </div>

      {order.package && (
        <div className="flex items-center text-sm text-slate-600 mb-2">
          <Package className="w-4 h-4 mr-2" />
          {order.package.name}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <span className="text-sm text-slate-500">Voir les détails</span>
        <ArrowRight className="w-4 h-4 text-slate-400" />
      </div>
    </Card>
  );
};
