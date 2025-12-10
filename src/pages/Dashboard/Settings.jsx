// ============= SETTINGS PAGE =============
export const SettingsPage = ({ user, onUpdate, onLogout }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await onUpdate(formData);
      setToast({ type: 'success', message: 'Profil mis à jour !' });
    } catch (error) {
      setToast({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <AnimatePresence>
        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Paramètres</h1>

        <Card className="mb-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Informations personnelles
          </h2>
          <div className="space-y-4">
            <Input
              label="Nom complet"
              value={formData.name}
              onChange={(val) => setFormData(prev => ({ ...prev, name: val }))}
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(val) => setFormData(prev => ({ ...prev, email: val }))}
            />
            <Input
              label="Téléphone"
              type="tel"
              value={formData.phone}
              onChange={(val) => setFormData(prev => ({ ...prev, phone: val }))}
            />
            <Button
              onClick={handleUpdate}
              loading={loading}
              variant="primary"
            >
              Enregistrer les modifications
            </Button>
          </div>
        </Card>

        <Card className="border-red-200">
          <h2 className="text-xl font-bold text-red-900 mb-4">
            Zone de danger
          </h2>
          <p className="text-sm text-slate-600 mb-4">
            Ces actions sont irréversibles
          </p>
          <Button onClick={onLogout} variant="danger">
            Déconnexion
          </Button>
        </Card>
      </div>
    </div>
  );
};