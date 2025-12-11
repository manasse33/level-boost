// ============= CAMPAIGN FORM =============
export const CampaignForm = ({ campaign = null, profiles, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    profile_id: campaign?.profile_id || '',
    name: campaign?.name || '',
    type: campaign?.type || 'awareness',
    budget: campaign?.budget || '',
    platform: campaign?.platform || [],
  });

  const [errors, setErrors] = useState({});

  const campaignTypes = [
    { value: 'awareness', label: 'Notoriété' },
    { value: 'engagement', label: 'Engagement' },
    { value: 'conversion', label: 'Conversion' },
    { value: 'traffic', label: 'Trafic' },
  ];

  const platforms = [
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'google', label: 'Google Ads' },
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const togglePlatform = (platform) => {
    const current = formData.platform || [];
    const updated = current.includes(platform)
      ? current.filter(p => p !== platform)
      : [...current, platform];
    handleChange('platform', updated);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.profile_id) newErrors.profile_id = 'Sélectionnez un profil';
    if (!formData.name) newErrors.name = 'Nom requis';
    if (!formData.budget) newErrors.budget = 'Budget requis';
    if (!formData.platform.length) newErrors.platform = 'Sélectionnez au moins une plateforme';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="space-y-6">
      <Select
        label="Profil"
        value={formData.profile_id}
        onChange={(val) => handleChange('profile_id', val)}
        options={profiles.map(p => ({ value: p.id, label: p.title }))}
        error={errors.profile_id}
        required
      />

      <Input
        label="Nom de la campagne"
        value={formData.name}
        onChange={(val) => handleChange('name', val)}
        placeholder="Ex: Lancement Album 2025"
        error={errors.name}
        required
      />

      <Select
        label="Type de campagne"
        value={formData.type}
        onChange={(val) => handleChange('type', val)}
        options={campaignTypes}
        required
      />

      <Input
        label="Budget (FCFA)"
        type="number"
        value={formData.budget}
        onChange={(val) => handleChange('budget', val)}
        placeholder="50000"
        error={errors.budget}
        required
      />

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Plateformes <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {platforms.map(platform => (
            <button
              key={platform.value}
              type="button"
              onClick={() => togglePlatform(platform.value)}
              className={`px-4 py-3 rounded-lg border-2 transition ${
                (formData.platform || []).includes(platform.value)
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-medium'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600'
              }`}
            >
              {platform.label}
            </button>
          ))}
        </div>
        {errors.platform && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.platform}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button onClick={onCancel} variant="secondary">
          Annuler
        </Button>
        <Button onClick={handleSubmit} variant="primary">
          {campaign ? 'Mettre à jour' : 'Créer la campagne'}
        </Button>
      </div>
    </div>
  );
};