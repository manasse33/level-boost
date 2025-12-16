import React, { useState } from 'react';
import { 
  Bell, Search, Grid3x3, Star, Rocket, Heart, Timer, 
  ArrowRight, Home, Trophy, Plus, MessageCircle, User,
  TrendingUp, Target, Filter
} from 'lucide-react';

export function ContestsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchValue, setSearchValue] = useState('');

  const filters = [
    { id: 'all', label: 'Tout', icon: <Grid3x3 className="w-4 h-4" /> },
    { id: 'talent', label: 'Talent', icon: <Star className="w-4 h-4 text-orange-500" /> },
    { id: 'startup', label: 'Startup', icon: <Rocket className="w-4 h-4 text-purple-500" /> },
    { id: 'solidarity', label: 'Solidaire', icon: <Heart className="w-4 h-4 text-rose-500" /> }
  ];

  const challenges = [
    {
      id: 1,
      title: "Pitch Contest Startups",
      description: "Convainquez nos investisseurs en 3 minutes et levez des fonds.",
      image: "https://images.unsplash.com/photo-1560439514-4e9645039924?w=400&h=300&fit=crop",
      category: "startup",
      tags: ["Conversion", "Financement"],
      participants: 42,
      type: "S'inscrire"
    },
    {
      id: 2,
      title: "Challenge Solidaire",
      description: "Engagez votre communauté pour une cause et doublez votre impact.",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop",
      category: "solidarity",
      tags: ["Engagement", "Impact"],
      xpBonus: 300,
      type: "Participer"
    },
    {
      id: 3,
      title: "Créateurs de Contenu",
      description: "Le meilleur Reel créatif sur le thème de l'innovation.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop",
      category: "talent",
      tags: ["Créativité", "Viralité"],
      xpBonus: 500,
      type: "Participer"
    }
  ];

  const navItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Accueil', active: false },
    { icon: <Trophy className="w-5 h-5" />, label: 'Défis', active: true },
    { icon: <MessageCircle className="w-5 h-5" />, label: 'Message', active: false },
    { icon: <User className="w-5 h-5" />, label: 'Profil', active: false }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-white pb-24 md:pb-0">
      
      {/* Header Full Width */}
   

      {/* Main Content Centered */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 md:py-10 flex flex-col gap-8 md:gap-12">
        
        {/* Featured Section */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
              À la une <span className="text-xl animate-pulse">🔥</span>
            </h2>
            <button className="text-sm font-semibold text-blue-600 hover:underline">Voir tout</button>
          </div>

          {/* Featured Card - Responsive Height & Layout */}
          <div className="group relative flex flex-col md:flex-row rounded-2xl overflow-hidden bg-white dark:bg-slate-800 shadow-sm hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700">
            {/* Timer Badge */}
            <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
              <Timer className="w-3.5 h-3.5" />
              <span>Fin dans 24h</span>
            </div>

            {/* Image Section */}
            <div 
              className="w-full md:w-2/5 h-48 md:h-auto bg-cover bg-center relative"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop')`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r"></div>
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                <span className="bg-white/20 backdrop-blur-md text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-md border border-white/30">
                  Découverte
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-5 md:p-8 flex flex-col justify-center gap-4 flex-1">
              <div>
                <h3 className="text-xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight mb-2">
                  Top 10 Talents du Mois
                </h3>
                <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-xl">
                  Montrez votre talent au monde, gagnez en visibilité auprès de nos partenaires médias et remportez un accompagnement personnalisé.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="flex flex-col gap-2 max-w-md">
                <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <span>Progression globale</span>
                  <span className="text-blue-600 dark:text-blue-400">75%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-blue-600 w-[75%] h-full rounded-full"></div>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>+500 participants cette semaine</span>
                </div>
              </div>

              <div className="pt-2">
                <button className="w-full md:w-auto px-8 h-12 flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/20">
                  Candidater maintenant
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* List Section - Grid Responsive */}
        <section className="flex flex-col">
          <h2 className="text-xl md:text-2xl font-bold mb-6">
            Défis à venir
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <div 
                key={challenge.id}
                className="group flex flex-col bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div 
                  className="h-48 w-full bg-cover bg-center relative"
                  style={{ backgroundImage: `url('${challenge.image}')` }}
                >
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                  <div className={`absolute top-3 right-3 text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-md shadow-sm ${
                    challenge.category === 'startup' ? 'bg-blue-600' : 
                    challenge.category === 'solidarity' ? 'bg-rose-500' : 'bg-orange-500'
                  }`}>
                    {challenge.category === 'startup' ? 'Startup' : 
                     challenge.category === 'solidarity' ? 'Solidaire' : 'Talent'}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1 gap-3">
                  <div className="flex-1">
                    <div className="flex gap-2 mb-2 flex-wrap">
                      {challenge.tags.map((tag, idx) => (
                        <span key={idx} className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 dark:bg-slate-700 dark:text-slate-300 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {challenge.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                      {challenge.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                    {challenge.participants ? (
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          <img className="w-6 h-6 rounded-full border border-white" src="https://i.pravatar.cc/40?img=1" alt="" />
                          <img className="w-6 h-6 rounded-full border border-white" src="https://i.pravatar.cc/40?img=2" alt="" />
                        </div>
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">+{challenge.participants} inscrits</span>
                      </div>
                    ) : (
                      <span className="text-xs font-bold text-amber-500 flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-lg">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        +{challenge.xpBonus} XP
                      </span>
                    )}
                    <button className="text-blue-600 dark:text-blue-400 text-sm font-bold hover:underline">
                      {challenge.type}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Mobile Bottom Navigation (Hidden on Desktop) */}
      {/* <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 z-50 pb-safe">
        <div className="flex justify-around items-end h-16 pb-2">
          {navItems.map((item, index) => (
            <button 
              key={index}
              className={`flex flex-col items-center gap-1 w-16 transition-colors ${
                item.active 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              <div className={`${item.label === '' ? 'mb-4 bg-blue-600 text-white p-3 rounded-full shadow-lg -mt-8 border-4 border-slate-50 dark:border-slate-900' : ''}`}>
                 {item.label === '' ? <Plus className="w-6 h-6" /> : item.icon}
              </div>
              {item.label && (
                <span className="text-[10px] font-medium">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav> */}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .pb-safe {
            padding-bottom: env(safe-area-inset-bottom);
        }
      `}</style>
    </div>
  );
}

export default ContestsPage;