// ============= ORDER FORM =============
export const OrderForm = ({ packages, profiles, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    package_id: '',
    profile_id: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.package_id) newErrors.package_id = 'Sélectionnez un pack';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(formData);
    }
  };

  const selectedPackage = packages.find(p => p.id === formData.package_id);

  return (
    <div className="space-y-6">
      <Alert
        type="info"
        message="Choisissez le pack qui correspond le mieux à vos besoins."
      />

      <Select
        label="Pack"
        value={formData.package_id}
        onChange={(val) => handleChange('package_id', val)}
        options={packages.map(p => ({ value: p.id, label: `${p.name} - ${p.price} FCFA` }))}
        error={errors.package_id}
        required
      />

      {selectedPackage && (
        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
          <h4 className="font-bold text-indigo-900 mb-2">{selectedPackage.name}</h4>
          <p className="text-sm text-indigo-700 mb-3">{selectedPackage.description}</p>
          <div className="text-2xl font-bold text-indigo-900">
            {selectedPackage.price.toLocaleString()} FCFA
          </div>
          <p className="text-xs text-indigo-600 mt-1">Durée: {selectedPackage.duration_days} jours</p>
        </div>
      )}

      {profiles && profiles.length > 0 && (
        <Select
          label="Profil associé (optionnel)"
          value={formData.profile_id}
          onChange={(val) => handleChange('profile_id', val)}
          options={profiles.map(p => ({ value: p.id, label: p.title }))}
          placeholder="Aucun profil"
        />
      )}

      <Textarea
        label="Notes / Instructions spéciales"
        value={formData.notes}
        onChange={(val) => handleChange('notes', val)}
        placeholder="Informations complémentaires pour votre commande..."
        rows={4}
      />

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button onClick={onCancel} variant="secondary">
          Annuler
        </Button>
        <Button onClick={handleSubmit} variant="primary">
          Passer la commande
        </Button>
      </div>
    </div>
  );
};
