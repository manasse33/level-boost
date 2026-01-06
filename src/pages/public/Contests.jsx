import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assurez-vous d'utiliser React Router
import ContestService from '../../api/contests'; 
import { PageLoader } from '../../components/common/Loader';

const ContestsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // États pour les données dynamiques
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('');

  // Images de secours pour garder le design joli si pas d'image en DB
  const fallbackImages = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBn5bsOoMC2fdTDVBofuuPPKMNTKO1GglyA2H-p0C67qCuNDxh05jnGWNtH9xcjlhah6GtBVqxC1rjMVZUcS69nxlvXZuqgZHNqG9gtaHByv__mVva0Kiu9RRaEXEdOdCvcygv_u2xgJUIhXMqwnut_LluDDfcydzDp2OwZSU31oDJaAfox-Vt3s-z3aDgM5jZftbS_N86j0a4tgTKRE4pndm-t-7VHXxGbbZtChNxRrjy-EUniJcYfKnfxXW0CJMPAuHt09SnL8eun",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBSlKdh1J_KdaDyslRAT-jwtK2xgWbhlKT1Y9mD9pX8Uz4bFkWkxSsHZ2OZ_WP3k2vfSzZZrHuN6lwuXefaHWeSCgjLS0zCeN_nLZ9q0iXUEXiOeAkE3qpVXF7fhdgk-Uzd7pkv-f06-FCavRED8Xp3yYshtPd8OnrnjBOWIivwyHfZQr9hiShrO9cIRaN75nR_3J5hkbxKdDM0UXym0Jgq4sNpZXv2o8y_fx7pnqaRp_H0Ra3--7fL_iWhLWhaZCbRGjbpv0FFuLIh",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD3i6KtFSNbgr6FprwBKcyWNAlVakzRMywhjF3YNO5wpLdMDFeT4yDfhAiYi9gYTpmCtOf7bS-FgLvAgGWBKgaiT1wQKjO0qKtzbwnGmqsXS2YomqrynG62I0HD0_3NU93ReujKHS42Xp2j7W53BhWQ1EXVliROYEsl6uMMvEtkBRTSrZ_x3pP9IW49ZgUlVDyfo2s6Up4dRZzU9uvlw2ao-7mrCvzK-jLPtYuRStRrXeEfdcXtqdn6MWUBh6aux4tnokA7YBN3Qtel"
  ];

  // Détection du mode sombre système
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  // Chargement des données Laravel
  useEffect(() => {
    const fetchContests = async () => {
      setLoading(true);
      try {
        // Mapping du filtre UI vers valeur DB (optionnel)
        const typeMap = {
           'Design Graphique': 'talent',
           'Marketing Digital': 'engagement',
           'Copywriting': 'sourcing'
        };
        
        const params = { 
            status: 'active',
            ...(filterType && filterType !== 'Toutes catégories' && { type: typeMap[filterType] })
        };

        const response = await ContestService.getAll(params);
        setContests(response.data); // Laravel paginate retourne { data: [...], ... }
      } catch (error) {
        console.error("Erreur API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, [filterType]);

  // Styles pour les motifs de fond
  const patternStyle = {
    backgroundImage: isDarkMode 
      ? "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
      : "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23332D75' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
  };

  // Helper pour calculer les jours restants
  const getDaysRemaining = (dateString) => {
    if(!dateString) return 0;
    const end = new Date(dateString);
    const now = new Date();
    const diff = end - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''} font-['Inter',sans-serif]`}>
        <style>
        {`
          ::-webkit-scrollbar { width: 10px; }
          ::-webkit-scrollbar-track { background: #f1f1f1; }
          ::-webkit-scrollbar-thumb { background: #333399; border-radius: 5px; }
          ::-webkit-scrollbar-thumb:hover { background: #2a2a80; }
        `}
      </style>
      {loading && <PageLoader />}
      
      <div className="bg-[#FDFBF7] dark:bg-[#0F172A] text-gray-800 dark:text-gray-200 transition-colors duration-300 min-h-screen">
        
        {/* Hero Section (Statique) */}
        <div className="relative overflow-hidden" style={patternStyle}>
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#E63946] opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#332D75] opacity-10 blur-3xl"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block py-1 px-3 rounded-full bg-[#F4A261]/20 text-[#F4A261] dark:text-orange-300 text-sm font-bold tracking-wide mb-4 border border-[#F4A261]/30">
                ÉLEVEZ VOTRE CRÉATIVITÉ
              </span>
              <h1 className="font-['Changa',sans-serif] text-5xl md:text-7xl font-bold text-[#332D75] dark:text-white mb-6 leading-tight">
                Montrez votre talent.<br/>
                <span className="text-[#E63946] relative inline-block">
                  Gagnez gros.
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#E63946] opacity-60" preserveAspectRatio="none" viewBox="0 0 100 10">
                    <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="3"></path>
                  </svg>
                </span>
              </h1>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
                Rejoignez les défis ultimes de marketing et de design organisés par Level Boost.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a className="bg-[#E63946] hover:bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-red-500/20 transition transform hover:-translate-y-1 flex items-center justify-center gap-2" href="#active-contests">
                  <span className="material-icons">rocket_launch</span>
                  Explorer les Défis
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar (Statique) */}
        <div className="bg-[#332D75] text-white py-12">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
              <div>
                <div className="font-['Changa',sans-serif] text-4xl font-bold text-[#F4A261]">R 50k+</div>
                <div className="text-sm opacity-80 mt-1 uppercase tracking-widest">Prix Décernés</div>
              </div>
              <div>
                <div className="font-['Changa',sans-serif] text-4xl font-bold text-[#E63946]">120+</div>
                <div className="text-sm opacity-80 mt-1 uppercase tracking-widest">Défis</div>
              </div>
              <div>
                <div className="font-['Changa',sans-serif] text-4xl font-bold text-[#2A9D8F]">5k+</div>
                <div className="text-sm opacity-80 mt-1 uppercase tracking-widest">Créatifs</div>
              </div>
              <div>
                <div className="font-['Changa',sans-serif] text-4xl font-bold text-white">15</div>
                <div className="text-sm opacity-80 mt-1 uppercase tracking-widest">Pays</div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Contests Section (DYNAMIQUE) */}
        <section className="py-20 bg-[#FDFBF7] dark:bg-[#0F172A]" id="active-contests">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <h2 className="font-['Changa',sans-serif] text-4xl font-bold text-[#332D75] dark:text-white mb-2">Défis Actifs</h2>
                <p className="text-gray-600 dark:text-gray-400">Mettez vos compétences à l'épreuve.</p>
              </div>
              <div className="mt-4 md:mt-0">
                <select 
                    onChange={(e) => setFilterType(e.target.value)}
                    className="bg-white dark:bg-[#1E293B] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-200 focus:ring-[#E63946] focus:border-[#E63946]">
                  <option>Toutes catégories</option>
                  <option>Design Graphique</option>
                  <option>Marketing Digital</option>
                  <option>Copywriting</option>
                </select>
              </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E63946]"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {contests.length > 0 ? contests.map((contest, index) => (
                    <article key={contest.id} className="group bg-white dark:bg-[#1E293B] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col h-full">
                        <div className="relative h-48 bg-gray-200 overflow-hidden">
                        {/* Utilisation de l'image de secours si pas d'image en DB */}
                        <img 
                            alt={contest.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            src={contest.image_url || fallbackImages[index % fallbackImages.length]}
                        />
                        <div className="absolute top-4 left-4 bg-[#E63946] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide animate-pulse">
                            {contest.status === 'active' ? 'En Cours' : contest.status}
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[#E63946] to-[#332D75]"></div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[#F4A261] text-sm font-semibold uppercase">{contest.type}</span>
                            <span className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                            <span className="material-icons text-sm mr-1">schedule</span> 
                            {getDaysRemaining(contest.ended_at)} jours restants
                            </span>
                        </div>
                        <h3 className="font-['Changa',sans-serif] text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#332D75] dark:group-hover:text-[#E63946] transition-colors line-clamp-1">
                            {contest.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-1 line-clamp-3">
                            {contest.description}
                        </p>
                        <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mt-auto">
                            <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Cagnotte</p>
                                <p className="font-bold text-[#332D75] dark:text-white text-lg">
                                    {/* Récupération sécurisée du premier prix */}
                                    {contest.prizes && Array.isArray(contest.prizes) && contest.prizes[0] 
                                        ? contest.prizes[0].amount 
                                        : 'Voir détails'}
                                </p>
                            </div>
                            <div className="flex items-center">
                                <span className="text-sm font-bold text-gray-500">
                                    {contest.participation_count} participants
                                </span>
                            </div>
                            </div>
                            <Link 
                                to={`/contests/${contest.slug}`} 
                                className="w-full bg-[#332D75] text-white py-3 rounded-xl font-bold hover:bg-blue-900 transition flex items-center justify-center group-hover:bg-[#E63946]"
                            >
                            Rejoindre le défi
                            <span className="material-icons ml-2 text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                        </div>
                        </div>
                    </article>
                )) : (
                    <div className="col-span-3 text-center text-gray-500">Aucun concours trouvé pour cette catégorie.</div>
                )}

                </div>
            )}
          </div>
        </section>

        {/* How To Participate (Statique - pas besoin de changer) */}
        <section className="py-16 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800 relative">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#332D75_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="font-['Changa',sans-serif] text-3xl md:text-4xl font-bold text-[#332D75] dark:text-white">Comment Participer</h2>
              <div className="h-1 w-24 bg-[#E63946] mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="material-icons text-4xl text-[#332D75] dark:text-blue-300">app_registration</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">1. Créer un profil</h3>
                <p className="text-gray-600 dark:text-gray-400">Inscrivez-vous et construisez votre portfolio créatif.</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="material-icons text-4xl text-[#E63946] dark:text-red-300">draw</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">2. Soumettre votre travail</h3>
                <p className="text-gray-600 dark:text-gray-400">Choisissez un défi et uploadez votre chef-d'œuvre.</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="material-icons text-4xl text-[#F4A261] dark:text-orange-300">celebration</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">3. Soyez récompensé</h3>
                <p className="text-gray-600 dark:text-gray-400">Gagnez des prix en argent et de la visibilité.</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
export {ContestsPage};
export default ContestsPage;