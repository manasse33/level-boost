export const ContestsPage = ({ apiRequest }) => {
  const [loading, setLoading] = useState(true);
  const [contests, setContests] = useState([]);
  const [selectedContest, setSelectedContest] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Mock data
  const mockContests = [
    {
      id: 1,
      title: 'Le Meilleur Clip #Winter25',
      description: 'Réalisez le clip le plus créatif avec un budget limité. Thème : Renaissance.',
      reward: 'Pack Premium (450k) + Diffusion TV',
      deadline: '4 jours',
      type: 'Vidéo',
      participants: 124,
      color: 'from-indigo-500 to-purple-600',
    },
    {
      id: 2,
      title: 'Start-up Pitch Contest',
      description: '3 minutes pour convaincre nos investisseurs. Présentez votre projet innovant.',
      reward: 'Financement Seed 5M FCFA',
      deadline: '2 semaines',
      type: 'Business',
      participants: 56,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      id: 3,
      title: 'Influenceur Révélation',
      description: 'Créez la story la plus engageante pour notre marque partenaire.',
      reward: 'Contrat Ambassadeur 1 an',
      deadline: 'En cours',
      type: 'Social',
      participants: 890,
      color: 'from-orange-500 to-red-600',
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setContests(mockContests);
      setLoading(false);
    }, 500);
  }, []);

  const handleParticipate = async (formData) => {
    try {
      await apiRequest(`/contests/${selectedContest.id}/participate`, {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      setToast({ type: 'success', message: 'Participation enregistrée ! 🎉' });
      setModalOpen(false);
      setSelectedContest(null);
    } catch (error) {
      setToast({ type: 'error', message: error.message });
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <AnimatePresence>
        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedContest(null);
        }}
        title={`Participer : ${selectedContest?.title}`}
        size="lg"
      >
        {selectedContest && (
          <ContestParticipationForm
            contest={selectedContest}
            onSubmit={handleParticipate}
            onCancel={() => {
              setModalOpen(false);
              setSelectedContest(null);
            }}
          />
        )}
      </Modal>

      {/* Hero */}
      <div className="relative bg-slate-900 py-24 overflow-hidden rounded-b-[3rem] shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 opacity-90" />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <Badge variant="primary" className="mb-4">
            🏆 Saison 2025 Ouverte
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            L'Arène des <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Champions</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Relevez les défis lancés par nos partenaires. Gagnez du financement, 
            de la visibilité et des contrats exclusifs.
          </p>
        </div>
      </div>

      {/* How it works */}
      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20 mb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: '1. Choisissez', desc: 'Sélectionnez un challenge actif', icon: '🎯' },
            { title: '2. Créez', desc: 'Produisez votre contenu', icon: '⚡' },
            { title: '3. Gagnez', desc: 'Les meilleurs sont sélectionnés', icon: '💎' },
          ].map((step, i) => (
            <Card key={i} hover className="text-center">
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-600">{step.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Contests Grid */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center mb-10">
          <Star className="w-8 h-8 text-yellow-500 mr-3" />
          <h2 className="text-3xl font-bold text-slate-900">Challenges en cours</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contests.map(contest => (
            <ContestCard
              key={contest.id}
              contest={contest}
              onParticipate={() => {
                setSelectedContest(contest);
                setModalOpen(true);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
