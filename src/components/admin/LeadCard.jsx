export const LeadCard = ({ lead, onUpdate, onDelete }) => {
  const statusColors = {
    new: 'default',
    contacted: 'primary',
    qualified: 'warning',
    proposal: 'warning',
    negotiation: 'primary',
    won: 'success',
    lost: 'danger',
  };

  const statusLabels = {
    new: 'Nouveau',
    contacted: 'Contacté',
    qualified: 'Qualifié',
    proposal: 'Proposition',
    negotiation: 'Négociation',
    won: 'Gagné',
    lost: 'Perdu',
  };

  return (
    <Card hover>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-900 mb-1">{lead.name}</h3>
          <p className="text-sm text-slate-600">{lead.email}</p>
          {lead.phone && (
            <p className="text-sm text-slate-600">{lead.phone}</p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={statusColors[lead.status]}>
            {statusLabels[lead.status]}
          </Badge>
          <button className="p-2 hover:bg-slate-100 rounded-lg">
            <MoreVertical className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-slate-500 mb-1">Type</p>
          <Badge variant="primary" size="sm">{lead.type}</Badge>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">Source</p>
          <Badge variant="default" size="sm">{lead.source}</Badge>
        </div>
      </div>

      {lead.company && (
        <div className="mb-4">
          <p className="text-xs text-slate-500 mb-1">Entreprise</p>
          <p className="text-sm font-medium text-slate-900">{lead.company}</p>
        </div>
      )}

      {lead.notes && (
        <div className="mb-4">
          <p className="text-xs text-slate-500 mb-1">Notes</p>
          <p className="text-sm text-slate-600 line-clamp-2">{lead.notes}</p>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t">
        <span>Créé le {new Date(lead.created_at).toLocaleDateString('fr-FR')}</span>
        <div className="flex gap-2">
          <Button onClick={() => onUpdate(lead)} variant="secondary" size="sm">
            Mettre à jour
          </Button>
          <Button onClick={() => onDelete(lead)} variant="danger" size="sm">
            Supprimer
          </Button>
        </div>
      </div>
    </Card>
  );
};

