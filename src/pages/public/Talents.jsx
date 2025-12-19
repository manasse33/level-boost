import React, { useState, useEffect } from 'react';
import { 
  Search, ArrowRight, TrendingUp, ChevronLeft, ChevronRight, 
  Eye, X, MapPin, Globe, Instagram, Linkedin, Twitter 
} from 'lucide-react';

export function TalentPage() {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null); // Pour la modale

  // Données enrichies pour la modale
  const profiles = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "CEO, TechForward",
      category: "Entrepreneur",
      location: "Paris, France",
      desc: "Leader dans l'intégration de l'IA pour les PME. Sarah a transformé plus de 50 startups l'année dernière.",
      fullBio: "Sarah Jenkins est une visionnaire de la tech avec 10 ans d'expérience. Elle aide les entreprises traditionnelles à franchir le cap du numérique grâce à des solutions IA sur mesure.",
      stats: { views: "15k", followers: "8.2k", rating: "4.9" },
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
      tagColor: "bg-[#2e3192]",
      socials: { linkedin: "#", twitter: "#" }
    },
    {
      id: 2,
      name: "Elena Rodriguez",
      role: "Artiste Visuelle",
      category: "Artiste",
      location: "Berlin, Allemagne",
      desc: "Création d'installations immersives qui défient la perspective. Actuellement exposée à Paris et Berlin.",
      fullBio: "Elena mélange sculpture classique et projection mapping. Ses œuvres interrogent notre rapport à l'espace et au temps dans l'ère numérique.",
      stats: { views: "42k", followers: "120k", rating: "5.0" },
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
      tagColor: "bg-[#ed1c24]",
      socials: { instagram: "#", globe: "#" }
    },
    {
      id: 3,
      name: "GreenLoop",
      role: "Logistique Durable",
      category: "Startup",
      location: "Lyon, France",
      desc: "Révolutionner la livraison du dernier kilomètre avec des solutions écologiques. Gagnant du prix CleanTech 2023.",
      fullBio: "GreenLoop utilise une flotte de vélos-cargos électriques et un algorithme d'optimisation propriétaire pour réduire l'empreinte carbone des livraisons urbaines de 60%.",
      stats: { views: "8k", followers: "2.1k", rating: "4.8" },
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
      tagColor: "bg-indigo-500",
      socials: { linkedin: "#", globe: "#" }
    },
    {
      id: 4,
      name: "David Chen",
      role: "Tech Reviewer",
      category: "Influenceur",
      location: "Londres, UK",
      desc: "Tests honnêtes des derniers gadgets. Aide +500k abonnés à prendre de meilleures décisions d'achat.",
      fullBio: "David est reconnu pour son objectivité et sa précision technique. Il collabore avec les plus grandes marques tout en gardant une liberté éditoriale totale.",
      stats: { views: "1.2M", followers: "540k", rating: "4.7" },
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
      tagColor: "bg-purple-500",
      socials: { instagram: "#", twitter: "#", globe: "#" }
    },
    {
      id: 5,
      name: "Amara Ndiaye",
      role: "UX/UI Designer",
      category: "Freelance",
      location: "Dakar, Sénégal",
      desc: "Conception d'expériences numériques intuitives pour les applications fintech. Spécialisée en design systems.",
      fullBio: "Amara combine esthétique moderne et ergonomie fonctionnelle. Elle a travaillé sur les applications bancaires les plus téléchargées d'Afrique de l'Ouest.",
      stats: { views: "12k", followers: "5k", rating: "5.0" },
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80",
      tagColor: "bg-teal-500",
      socials: { linkedin: "#", globe: "#" }
    },
    {
      id: 6,
      name: "Global Tech Summit",
      role: "Conférence",
      category: "Événement",
      location: "Abidjan, Côte d'Ivoire",
      desc: "Le plus grand rassemblement d'innovateurs tech en Afrique de l'Ouest. Rejoignez-nous pour le réseautage.",
      fullBio: "3 jours de conférences, 50 speakers internationaux et un espace d'exposition pour 200 startups. L'événement incontournable de l'année.",
      stats: { views: "85k", followers: "15k", rating: "4.9" },
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      tagColor: "bg-orange-500",
      socials: { linkedin: "#", twitter: "#", globe: "#" }
    }
  ];

  const filters = ["Tous", "Entrepreneur", "Artiste", "Startup", "Influenceur", "Freelance", "Événement"];

  // Logique de filtrage
  const filteredProfiles = profiles.filter(profile => {
    const matchCategory = activeFilter === 'Tous' || profile.category === activeFilter;
    const matchSearch = profile.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        profile.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Gestion de la modale
  const openDetails = (profile) => setSelectedProfile(profile);
  const closeDetails = () => setSelectedProfile(null);

  // Empêcher le scroll quand la modale est ouverte
  useEffect(() => {
    if (selectedProfile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProfile]);

  return (
    <div className="bg-[#f8fafc] dark:bg-[#0f172a] text-slate-800 dark:text-slate-200 min-h-screen font-sans">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Oswald', sans-serif; }
        .font-body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Décoration Blob */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bg-[#2e3192] w-96 h-96 top-0 left-0 -translate-x-1/2 -translate-y-1/2 blur-[100px] opacity-15 rounded-full"></div>
        <div className="absolute bg-[#ed1c24] w-80 h-80 bottom-0 right-0 translate-x-1/3 translate-y-1/3 blur-[100px] opacity-15 rounded-full"></div>
      </div>

      <main className="relative z-10 font-body">

        {/* --- 1. HERO HEADER --- */}
        <header className="relative pt-12 pb-16 lg:pt-20 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Texte */}
              <div className="space-y-8 order-2 lg:order-1">
                <div className="inline-block">
                  <span className="bg-[#ed1c24] text-white px-3 py-1 rounded text-sm font-bold uppercase tracking-wider mb-2 inline-block">
                    Visibilité à la une
                  </span>
                </div>
                
                <div className="bg-[#2e3192] p-8 md:p-10 shadow-2xl relative overflow-hidden rounded-lg transform -rotate-1 hover:rotate-0 transition duration-500">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#ed1c24] opacity-20 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
                  <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white leading-none uppercase">
                    Ensemble<br/>
                    Faisons<br/>
                    Briller<br/>
                    <span className="text-[#ed1c24]">Level</span>
                  </h1>
                  <p className="mt-4 text-indigo-100 text-lg md:text-xl font-medium">
                    Toutes les clés sont ici.
                  </p>
                </div>

                <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg">
                   Découvrez les artistes, entrepreneurs et visionnaires qui élèvent leur marque avec Level Boost. Connectez-vous avec ceux qui font bouger les lignes.
                </p>

                <div className="flex flex-wrap gap-4">
                  <button className="bg-[#2e3192] hover:bg-indigo-800 text-white px-8 py-3 rounded font-display font-bold text-lg uppercase tracking-wide shadow-lg shadow-indigo-500/30 transition">
                    Explorer les Profils
                  </button>
                  <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-8 py-3 rounded font-display font-bold text-lg uppercase tracking-wide hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                    Comment ça marche
                  </button>
                </div>
              </div>

              {/* Image Hero */}
              <div className="order-1 lg:order-2 relative group">
                 <div className="absolute inset-0 bg-gradient-to-tr from-[#2e3192] to-[#ed1c24] rounded-2xl transform rotate-3 scale-105 opacity-20 group-hover:rotate-6 transition duration-500"></div>
                 <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80" 
                    alt="Talent vedette" 
                    className="relative rounded-2xl shadow-2xl w-full object-cover h-[500px] lg:h-[600px] grayscale-0 hover:grayscale transition duration-500 border-4 border-white dark:border-slate-800"
                 />
                 
                 <div className="absolute bottom-8 left-0 lg:-left-5 bg-white dark:bg-[#1e293b] p-4 rounded-lg shadow-xl border-l-4 border-[#ed1c24] flex items-center gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full text-[#2e3192] dark:text-blue-300">
                       <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                       <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">Vues hebdo</p>
                       <p className="text-xl font-display font-bold text-slate-900 dark:text-white">+12.5k</p>
                    </div>
                 </div>
              </div>

            </div>
          </div>
        </header>

        {/* --- 2. BARRE DE RECHERCHE & FILTRES --- */}
        <section className="py-8 border-y border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                 
                 {/* Filtres */}
                 <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto no-scrollbar">
                    {filters.map((filter, i) => (
                      <button 
                        key={i}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition border ${
                            activeFilter === filter 
                            ? 'bg-[#2e3192] text-white border-[#2e3192] shadow-md' 
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                 </div>

                 {/* Recherche */}
                 <div className="relative w-full md:w-72">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                       <Search className="w-5 h-5 text-slate-400" />
                    </div>
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-700 rounded-full leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2e3192] focus:border-[#2e3192] sm:text-sm" 
                      placeholder="Rechercher un profil..." 
                    />
                 </div>
              </div>
           </div>
        </section>

        {/* --- 3. GRILLE DES PROFILS --- */}
        <section className="py-16 min-h-[600px]">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-10 border-l-8 border-[#ed1c24] pl-4">
                 {activeFilter === 'Tous' ? 'Boostés Récemment' : `${activeFilter}s`}
              </h2>

              {filteredProfiles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                   {filteredProfiles.map((profile) => (
                      <div key={profile.id} className="bg-white dark:bg-[#1e293b] rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 overflow-hidden group border border-slate-100 dark:border-slate-800">
                          {/* Image Carte */}
                          <div className="relative h-64 overflow-hidden">
                             <div className={`absolute top-4 left-4 z-10 ${profile.tagColor} text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider`}>
                                {profile.category}
                             </div>
                             <img 
                                src={profile.image} 
                                alt={profile.name} 
                                className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                             />
                          </div>

                          {/* Contenu Carte */}
                          <div className="p-6">
                             <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-1">{profile.name}</h3>
                             <p className="text-[#ed1c24] text-sm font-medium mb-3">{profile.role}</p>
                             <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3">
                                {profile.desc}
                             </p>
                             <button 
                                onClick={() => openDetails(profile)}
                                className="w-full py-2 border-2 border-[#2e3192] text-[#2e3192] dark:text-indigo-400 dark:border-indigo-400 font-bold rounded hover:bg-[#2e3192] hover:text-white dark:hover:bg-indigo-400 dark:hover:text-slate-900 transition flex items-center justify-center gap-2"
                             >
                                 Voir Détails <Eye className="w-4 h-4" />
                             </button>
                          </div>
                      </div>
                   ))}
                </div>
              ) : (
                <div className="text-center py-20">
                    <p className="text-slate-500 text-xl">Aucun profil ne correspond à votre recherche.</p>
                    <button onClick={() => {setActiveFilter('Tous'); setSearchQuery('')}} className="mt-4 text-[#2e3192] font-bold underline">Réinitialiser les filtres</button>
                </div>
              )}

              {/* Pagination (Visuelle) */}
              <div className="mt-16 flex justify-center">
                 <nav className="flex gap-2">
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition">
                       <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#2e3192] text-white font-bold shadow-lg shadow-indigo-500/30">1</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition">2</button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition">
                       <ChevronRight className="w-5 h-5" />
                    </button>
                 </nav>
              </div>

           </div>
        </section>

        {/* --- 4. CTA BAS DE PAGE --- */}
        <section className="py-20 bg-[#2e3192] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ed1c24] rounded-full blur-[100px] opacity-40"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-[100px] opacity-10"></div>
            
            <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
                <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6 uppercase">Prêt à briller ?</h2>
                <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                    Rejoignez des centaines de professionnels qui boostent leur visibilité aujourd'hui. "Ensemble, faisons briller Level."
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-[#ed1c24] hover:bg-red-600 text-white px-8 py-4 rounded font-display font-bold text-lg uppercase tracking-wide shadow-xl transition transform hover:scale-105">
                        Booster mon Profil
                    </button>
                    <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded font-display font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-[#2e3192] transition">
                        Contacter l'équipe
                    </button>
                </div>
            </div>
        </section>

        {/* --- 5. MODALE DÉTAILS --- */}
        {selectedProfile && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
                <div className="bg-white dark:bg-[#1e293b] w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row animate-in zoom-in-95 duration-200">
                    
                    {/* Bouton Fermer */}
                    <button 
                        onClick={closeDetails}
                        className="absolute top-4 right-4 z-20 bg-white/20 hover:bg-white/40 p-2 rounded-full text-white md:text-slate-500 md:hover:bg-slate-100 transition"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Image Modale */}
                    <div className="w-full md:w-2/5 h-64 md:h-auto relative">
                        <img 
                            src={selectedProfile.image} 
                            alt={selectedProfile.name} 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden"></div>
                        <div className={`absolute top-4 left-4 ${selectedProfile.tagColor} text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider`}>
                            {selectedProfile.category}
                        </div>
                    </div>

                    {/* Contenu Modale */}
                    <div className="w-full md:w-3/5 p-8 max-h-[80vh] overflow-y-auto">
                        <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-1">{selectedProfile.name}</h2>
                        <p className="text-[#ed1c24] text-lg font-medium mb-4">{selectedProfile.role}</p>
                        
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-6">
                            <MapPin className="w-4 h-4" /> {selectedProfile.location}
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-center">
                                <div className="text-xl font-bold text-[#2e3192] dark:text-white">{selectedProfile.stats.views}</div>
                                <div className="text-xs uppercase text-slate-500 font-bold">Vues</div>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-center">
                                <div className="text-xl font-bold text-[#2e3192] dark:text-white">{selectedProfile.stats.followers}</div>
                                <div className="text-xs uppercase text-slate-500 font-bold">Abonnés</div>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-center">
                                <div className="text-xl font-bold text-[#2e3192] dark:text-white">{selectedProfile.stats.rating}</div>
                                <div className="text-xs uppercase text-slate-500 font-bold">Note</div>
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">À Propos</h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                            {selectedProfile.fullBio}
                        </p>

                        <div className="flex justify-between items-center border-t border-slate-200 dark:border-slate-700 pt-6">
                            <div className="flex gap-4">
                                {selectedProfile.socials.linkedin && <Linkedin className="w-5 h-5 text-slate-400 hover:text-[#2e3192] cursor-pointer transition"/>}
                                {selectedProfile.socials.twitter && <Twitter className="w-5 h-5 text-slate-400 hover:text-[#2e3192] cursor-pointer transition"/>}
                                {selectedProfile.socials.instagram && <Instagram className="w-5 h-5 text-slate-400 hover:text-[#2e3192] cursor-pointer transition"/>}
                                {selectedProfile.socials.globe && <Globe className="w-5 h-5 text-slate-400 hover:text-[#2e3192] cursor-pointer transition"/>}
                            </div>
                            <button className="bg-[#2e3192] hover:bg-indigo-800 text-white px-6 py-2 rounded font-bold shadow-lg transition">
                                Contacter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}

      </main>
    </div>
  );
}

export default TalentPage;