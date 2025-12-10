// ============= MY PROFILES PAGE =============
export const MyProfilesPage = ({ onNavigate, apiRequest }) => {
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      const data = await apiRequest('/profiles');
      setProfiles(data.profiles || []);
    } catch (error) {
      console.error('Error loading profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProfile = async (formData) => {
    try {
      await apiRequest('/profiles', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      setToast({ type: 'success', message: 'Profil créé avec succès !' });
      setModalOpen(false);
      loadProfiles();
    } catch (error) {
      setToast({ type: 'error', message: error.message });
    }
  };

  const handleEditProfile = async (formData) => {
    try {
      await apiRequest(`/profiles/${selectedProfile.id}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
      });
      setToast({ type: 'success', message: 'Profil mis à jour !' });
      setModalOpen(false);
      setSelectedProfile(null);
      loadProfiles();
    } catch (error) {
      setToast({ type: 'error', message: error.message });
    }
  };

  const handleDeleteProfile = async (profile) => {
    if (window.confirm(`Supprimer le profil "${profile.title}" ?`)) {
      try {
        await apiRequest(`/profiles/${profile.id}`, { method: 'DELETE' });
        setToast({ type: 'success', message: 'Profil supprimé' });
        loadProfiles();
      } catch (error) {
        setToast({ type: 'error', message: error.message });
      }
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <AnimatePresence>
        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedProfile(null);
        }}
        title={selectedProfile ? 'Modifier le profil' : 'Nouveau profil'}
        size="lg"
      >
        <ProfileForm
          profile={selectedProfile}
          onSubmit={selectedProfile ? handleEditProfile : handleCreateProfile}
          onCancel={() => {
            setModalOpen(false);
            setSelectedProfile(null);
          }}
        />
      </Modal>

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Mes Profils</h1>
            <p className="text-slate-600 mt-1">
              Gérez vos différents profils professionnels
            </p>
          </div>
          <Button
            onClick={() => setModalOpen(true)}
            variant="primary"
            icon={Plus}
          >
            Créer un profil
          </Button>
        </div>

        {profiles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile) => (
              <div key={profile.id} className="relative">
                <ProfileCard
                  profile={profile}
                  onClick={() => onNavigate(`/profiles/${profile.slug}`)}
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProfile(profile);
                      setModalOpen(true);
                    }}
                    className="p-2 bg-white rounded-lg shadow-md hover:bg-slate-50"
                  >
                    <Edit className="w-4 h-4 text-slate-600" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProfile(profile);
                    }}
                    className="p-2 bg-white rounded-lg shadow-md hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Users}
            title="Aucun profil"
            description="Créez votre premier profil professionnel pour commencer"
            action={
              <Button
                onClick={() => setModalOpen(true)}
                variant="primary"
                icon={Plus}
              >
                Créer mon premier profil
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
};
