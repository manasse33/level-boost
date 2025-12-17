import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios'; // Assurez-vous que le chemin est bon
import { 
  Grid3x3, Star, Rocket, Heart, Timer, 
  ArrowRight, Trophy, TrendingUp, Loader2, Calendar, MapPin
} from 'lucide-react';

export function ContestsPage() {
  const navigate = useNavigate();
  
  // --- States ---
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [featuredContest, setFeaturedContest] = useState(null);

  // --- Filtres ---
  // Note : Assurez-vous que les IDs correspondent à vos ENUM 'type' côté Laravel
  const filters = [
    { id: 'all', label: 'Tout', icon: <Grid3x3 className="w-4 h-4" /> },
    { id: 'talent', label: 'Talent', icon: <Star className="w-4 h-4 text-orange-500" /> },
    { id: 'startup', label: 'Startup', icon: <Rocket className="w-4 h-4 text-purple-500" /> },
    { id: 'social', label: 'Social', icon: <Heart className="w-4 h-4 text-rose-500" /> },
    // Ajoutez d'autres filtres si nécessaire (ex: 'event')
  ];

  // --- Chargement des données ---
  useEffect(() => {
    fetchContests();
  }, []);

  const fetchContests = async () => {
    try {
      // On demande uniquement les concours actifs ou terminés récemment
      const res = await api.get('/contests'); 
      const data = res.data.data || res.data; // Gère la pagination ou non

      // 1. Trouver le concours mis en avant (Featured)
      const featured = data.find(c => c.featured === true && c.status === 'active');
      setFeaturedContest(featured || data[0]); // Si aucun featured, on prend le premier

      // 2. Le reste des concours (excluant celui qui est featured pour ne pas le mettre en double)
      const others = data.filter(c => c.id !== (featured?.id || data[0]?.id));
      setContests(others);

      setLoading(false);
    } catch (error) {
      console.error("Erreur chargement concours:", error);
      setLoading(false);
    }
  };

  // --- Filtrage côté client ---
  const filteredContests = activeFilter === 'all' 
    ? contests 
    : contests.filter(c => c.type === activeFilter || (activeFilter === 'startup' && c.type === 'conversion')); 
    // ^ Exemple d'adaptation si vos types API ne matchent pas exactement vos filtres UI

  // --- Helpers ---
  const calculateDaysLeft = (endDate) => {
    if (!endDate) return null;
    const diff = new Date(endDate) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days}j restants` : 'Terminé';
  };

  const getCategoryColor = (type) => {
    switch(type) {
      case 'talent': return 'bg-orange-500';
      case 'startup': return 'bg-blue-600';
      case 'social': return 'bg-rose-500';
      default: return 'bg-slate-600';
    }
  };

  const handleParticipate = (slug) => {
    // Redirige vers la page de détail pour s'inscrire
    navigate(`/contests/${slug}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-white pb-24 md:pb-0">
      
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 md:py-10 flex flex-col gap-8 md:gap-12">
        
        {/* --- Section : À la une (Featured) --- */}
        {featuredContest && (
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                À la une <span className="text-xl animate-pulse">🔥</span>
              </h2>
            </div>

            <div className="group relative flex flex-col md:flex-row rounded-2xl overflow-hidden bg-white dark:bg-slate-800 shadow-sm hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700 min-h-[400px]">
              
              {/* Badge Fin */}
              {featuredContest.ended_at && (
                <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <Timer className="w-3.5 h-3.5" />
                  <span>{calculateDaysLeft(featuredContest.ended_at)}</span>
                </div>
              )}

              {/* Image (Placeholder ou image réelle si vous en avez dans votre DB) */}
              <div 
                className="w-full md:w-1/2 h-64 md:h-auto bg-cover bg-center relative"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop')` // Image générique, à remplacer par featuredContest.image_url si dispo
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/20 backdrop-blur-md text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-md border border-white/30">
                    {featuredContest.type}
                  </span>
                </div>
              </div>

              {/* Contenu */}
              <div className="p-6 md:p-10 flex flex-col justify-center gap-6 flex-1">
                <div>
                  <h3 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-3">
                    {featuredContest.title}
                  </h3>
                  <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-xl">
                    {featuredContest.description}
                  </p>
                </div>

                {/* Info Participants & Prix */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="font-bold">{featuredContest.participation_count} participants</span>
                  </div>
                  
                  {/* Affichage des prix s'il y en a */}
                  {featuredContest.prizes && Array.isArray(featuredContest.prizes) && (
                     <div className="flex flex-wrap gap-2">
                        {featuredContest.prizes.slice(0, 3).map((prize, idx) => (
                          <span key={idx} className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded border border-yellow-200 flex items-center gap-1">
                            <Trophy size={12}/> {prize}
                          </span>
                        ))}
                     </div>
                  )}
                </div>

                <div className="pt-2">
                  <button 
                    onClick={() => handleParticipate(featuredContest.slug)}
                    className="w-full md:w-auto px-8 h-12 flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/20"
                  >
                    Participer maintenant
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* --- Section : Liste (Grid) --- */}
        <section className="flex flex-col">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl md:text-2xl font-bold">Défis à venir</h2>
            
            {/* Filtres */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    activeFilter === filter.id 
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md' 
                      : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {filter.icon}
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          
          {filteredContests.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300">
               <p className="text-slate-500">Aucun défi ne correspond à ce filtre pour le moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContests.map((challenge) => (
                <div 
                  key={challenge.id}
                  onClick={() => handleParticipate(challenge.slug)}
                  className="group flex flex-col bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  {/* Image Card */}
                  <div 
                    className="h-48 w-full bg-cover bg-center relative bg-slate-200"
                    style={{ 
                      // Utiliser une image placeholder par défaut si pas d'image
                      backgroundImage: `url('https://source.unsplash.com/random/800x600/?${challenge.type}')` 
                    }}
                  >
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                    <div className={`absolute top-3 right-3 text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-md shadow-sm ${getCategoryColor(challenge.type)}`}>
                      {challenge.type}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1 gap-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {challenge.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                        {challenge.description}
                      </p>
                    </div>
                    
                    {/* Règles / Tags */}
                    {challenge.rules && Array.isArray(challenge.rules) && challenge.rules.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {challenge.rules.slice(0, 2).map((rule, idx) => (
                          <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded dark:bg-slate-700 dark:text-slate-300">
                            {rule}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400">
                         <Calendar className="w-3.5 h-3.5" />
                         {new Date(challenge.started_at).toLocaleDateString()}
                      </div>

                      <span className="text-blue-600 dark:text-blue-400 text-sm font-bold group-hover:underline flex items-center gap-1">
                        Voir détail <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Style JSX pour cacher la scrollbar sur mobile */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default ContestsPage;