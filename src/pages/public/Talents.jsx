import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ProfileService from '../../api/profiles';
import { PageLoader } from '../../components/common/Loader';

const TalentsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // États pour les données
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('');

  // Image par défaut stylée (si pas d'image en BDD)
  const fallbackImage = "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1000&auto=format&fit=crop";

  // Gestion du mode sombre
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  // --- LOGIQUE DE CHARGEMENT (Inchangée) ---
  const fetchProfiles = useCallback(async () => {
    setLoading(true);
    try {
      const params = { 
          status: 'active',
          ...(filterType && { type: filterType }) 
      };

      const minDelay = new Promise(resolve => setTimeout(resolve, 2000));
      const apiRequest = ProfileService.getAll(params);

      const [_, response] = await Promise.all([minDelay, apiRequest]);

      let dataToSet = [];
      if (response.data && Array.isArray(response.data.data)) {
          dataToSet = response.data.data;
      } else if (response.data && Array.isArray(response.data)) {
          dataToSet = response.data;
      } else if (Array.isArray(response.data)) {
          dataToSet = response.data;
      } else {
          dataToSet = [];
      }
      setProfiles(dataToSet);

    } catch (error) {
      console.error("❌ Erreur chargement profils:", error);
    } finally {
      setLoading(false);
    }
  }, [filterType]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  // Fond général de la page
  const patternStyle = {
    backgroundColor: '#F9FAFB',
    backgroundImage: `radial-gradient(#3A3086 0.8px, transparent 0.8px), radial-gradient(#3A3086 0.8px, #F9FAFB 0.8px)`,
    backgroundSize: '24px 24px',
    opacity: 0.05
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''} font-['Plus_Jakarta_Sans',sans-serif]`}>
      {/* Scrollbar Custom */}
      <style>{`
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #333399; border-radius: 5px; }
      `}</style>

      {loading && <PageLoader />}

      <div className="bg-[#F9FAFB] dark:bg-[#111827] text-gray-800 dark:text-gray-200 transition-colors duration-300 min-h-screen">
        
        {/* Header (Simplifié pour laisser la place aux cartes) */}
        <header className="relative overflow-hidden py-20 lg:py-28">
          <div className="absolute inset-0 pointer-events-none" style={patternStyle}></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#EF4444]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#3A3086]/10 dark:bg-[#3A3086]/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h2 className="text-[#EF4444] font-bold tracking-wider uppercase text-sm mb-4">Excellence Communautaire</h2>
            <h1 className="text-5xl md:text-7xl font-['Syne',sans-serif] font-extrabold text-[#3A3086] dark:text-white mb-6 leading-tight">
                Talents <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EF4444] to-orange-500">Émergents</span> <br/>
                & Réussites
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
                Découvrez les entrepreneurs, artistes et innovateurs qui ont élevé leur niveau avec Level Boost.
            </p>
            
            {/* Filtres */}
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={() => setFilterType('')} className={`px-6 py-2 rounded-full font-medium shadow-md transition transform hover:-translate-y-0.5 ${filterType === '' ? 'bg-[#3A3086] text-white' : 'bg-white text-gray-600 hover:text-[#EF4444]'}`}>Tous</button>
              <button onClick={() => setFilterType('entrepreneur')} className={`px-6 py-2 rounded-full font-medium shadow-md transition transform hover:-translate-y-0.5 ${filterType === 'entrepreneur' ? 'bg-[#3A3086] text-white' : 'bg-white text-gray-600 hover:text-[#EF4444]'}`}>Entrepreneurs</button>
              <button onClick={() => setFilterType('artist')} className={`px-6 py-2 rounded-full font-medium shadow-md transition transform hover:-translate-y-0.5 ${filterType === 'artist' ? 'bg-[#3A3086] text-white' : 'bg-white text-gray-600 hover:text-[#EF4444]'}`}>Créatifs</button>
              <button onClick={() => setFilterType('startup')} className={`px-6 py-2 rounded-full font-medium shadow-md transition transform hover:-translate-y-0.5 ${filterType === 'startup' ? 'bg-[#3A3086] text-white' : 'bg-white text-gray-600 hover:text-[#EF4444]'}`}>Tech</button>
            </div>
          </div>
        </header>

        {/* --- GRID DES CARTES "POSTER" --- */}
        <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {profiles.length > 0 ? profiles.map((profile) => {
                // Choix image : Cover > Logo > Fallback
                const bgImage = profile.cover_image || profile.logo || fallbackImage;

                return (
                    <Link 
                        to={`/talents/${profile.slug}`} 
                        key={profile.id} 
                        className="group relative h-[500px] rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-[#3A3086]"
                    >
                        {/* 1. FOND ET DÉCORATION */}
                        {/* Cercle rouge flou en bas à droite */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#EF4444] rounded-full blur-[60px] opacity-60 z-0 pointer-events-none group-hover:opacity-80 transition-opacity"></div>
                        {/* Cercle blanc flou en haut à gauche */}
                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-white rounded-full blur-[50px] opacity-20 z-0 pointer-events-none"></div>

                        {/* 2. IMAGE DU TALENT (Moitié supérieure ou fondue) */}
                        <div className="absolute top-0 left-0 w-full h-[60%] z-0">
                            <img 
                                src={bgImage} 
                                alt={profile.title} 
                                className="w-full h-full object-cover object-top opacity-90 transition-transform duration-700 group-hover:scale-105" 
                            />
                            {/* Gradient agressif pour fondre l'image dans le bleu du bas */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3A3086]/50 to-[#3A3086]"></div>
                        </div>

                        {/* 3. CONTENU TEXTE (Style Poster) */}
                        <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
                            
                            {/* Logo "Le Level" en petit */}
                            <div className="absolute top-6 right-6 opacity-80">
                                <span className="text-white font-['Syne'] font-bold text-xs tracking-widest">LEVEL<span className="text-[#EF4444]">BOOST</span></span>
                            </div>

                            {/* Catégorie badge */}
                            <div className="mb-3">
                                <span className="bg-[#EF4444] text-white text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-widest">
                                    {profile.category || profile.type}
                                </span>
                            </div>

                            {/* TITRE TYPOGRAPHIQUE */}
                            <div className="font-['Syne'] text-white uppercase leading-[0.9] mb-4 drop-shadow-lg">
                                <span className="block text-xl font-bold opacity-80">Ensemble</span>
                                <span className="block text-xl font-bold opacity-80">Faisons</span>
                                <span className="block text-xl font-bold text-[#EF4444]">Briller</span>
                                {/* Nom du talent en très gros */}
                                <span className="block text-3xl md:text-4xl font-black mt-1 line-clamp-2">
                                    {profile.title}
                                </span>
                            </div>

                            {/* Tagline */}
                            <div className="flex items-center justify-between border-t border-white/20 pt-4 mt-2">
                                <p className="text-gray-300 text-xs italic">
                                    "Toutes les clés sont ici"
                                </p>
                                {/* Flèche d'action */}
                                <div className="w-8 h-8 rounded-full bg-white text-[#3A3086] flex items-center justify-center group-hover:bg-[#EF4444] group-hover:text-white transition-colors">
                                    <span className="material-icons text-sm">arrow_forward</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            }) : (
                <div className="col-span-full py-20 text-center">
                    <span className="material-icons text-6xl text-gray-300 mb-4">person_off</span>
                    <p className="text-gray-500 font-medium">Aucun talent trouvé pour cette catégorie.</p>
                </div>
            )}

            {/* CTA Card (Style Poster aussi pour la cohérence) */}
            <div className="group relative h-[500px] rounded-[2rem] overflow-hidden shadow-xl bg-white border-2 border-[#3A3086] border-dashed flex flex-col items-center justify-center text-center p-8">
                <div className="w-20 h-20 bg-[#3A3086]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#3A3086] group-hover:text-white transition-all duration-300 text-[#3A3086]">
                  <span className="material-icons text-4xl">add</span>
                </div>
                <h3 className="text-3xl font-['Syne'] font-black text-[#3A3086] uppercase mb-2 leading-tight">
                    Vous êtes<br/>le prochain ?
                </h3>
                <p className="text-gray-500 text-sm mb-8 max-w-xs mx-auto">
                    Rejoignez le réseau Level Boost et obtenez votre propre mise en avant.
                </p>
                <button className="bg-[#EF4444] hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold shadow-lg transition transform group-hover:scale-105">
                   Candidater
                </button>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
};

export { TalentsPage };
export default TalentsPage;