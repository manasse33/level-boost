import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProfileService from '../../api/profiles';
import { PageLoader } from '../../components/common/Loader';

const TalentDetailsPage = () => {
  const { slug } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Image de secours professionnelle si pas d'image en BDD
  const fallbackImage = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop";

  // Récupération des données
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        // Délai UX + Appel API
        const minDelay = new Promise(resolve => setTimeout(resolve, 1500));
        const apiRequest = ProfileService.getBySlug(slug);
        const [_, response] = await Promise.all([minDelay, apiRequest]);
        
        setProfile(response.data || response);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProfile();
  }, [slug]);

  if (loading) return <PageLoader />;

  if (!profile) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB]">
        <h2 className="text-2xl font-bold text-[#3A3086]">Talent introuvable</h2>
        <Link to="/talents" className="text-[#EF4444] mt-4 hover:underline">Retour à la liste</Link>
    </div>
  );

  // Détermine l'image à afficher (Cover > Logo > Fallback)
  const displayImage = profile.cover_image || profile.logo || fallbackImage;

  return (
    <div className="bg-[#F9FAFB] min-h-screen text-[#111827] font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Scrollbar Custom */}
      <style>{`
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-sm font-medium mb-6">
            <Link to="/talents" className="text-gray-500 hover:text-[#EF4444] transition-colors flex items-center gap-1">
                <span className="material-icons text-sm">arrow_back</span> Retour aux Talents
            </Link>
        </div>

        {/* --- HERO SECTION TYPE "POSTER" (Le design demandé) --- */}
        <div className="bg-[#3A3086] rounded-3xl overflow-hidden shadow-2xl relative min-h-[500px] flex flex-col md:flex-row items-stretch">
            
            {/* Éléments décoratifs (Cercles) */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#EF4444] rounded-full blur-[80px] opacity-40 mix-blend-screen pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#EF4444] rounded-full blur-[100px] opacity-30 pointer-events-none"></div>
            <div className="absolute top-10 right-10 size-24 bg-white/10 rounded-full blur-2xl"></div>

            {/* Partie Gauche : Image (Vient de la DB) */}
            <div className="w-full md:w-5/12 relative h-[400px] md:h-auto bg-gray-900">
                <img 
                    src={displayImage} 
                    alt={profile.title} 
                    className="w-full h-full object-cover object-top opacity-90"
                />
                {/* Gradient pour fondre l'image vers le bas sur mobile, ou vers la droite sur desktop */}
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-[#3A3086]/20 to-[#3A3086]"></div>
            </div>

            {/* Partie Droite : Contenu Texte */}
            <div className="w-full md:w-7/12 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10 text-white">
                
                {/* Logo Level Boost (Petit en haut) */}
                <div className="absolute top-8 right-8 flex items-center gap-2 opacity-80">
                    <span className="font-['Syne'] font-bold text-xl tracking-tighter">LEVEL<span className="text-[#EF4444]">BOOST</span></span>
                </div>

                {/* Bloc Titre */}
                <div className="mb-8">
                    <div className="inline-block bg-white text-[#3A3086] px-4 py-1 rounded-sm font-bold text-xs uppercase tracking-widest mb-4">
                        {profile.type || 'Talent'}
                    </div>
                    <h1 className="font-['Syne'] font-black text-5xl md:text-6xl lg:text-7xl leading-[0.9] uppercase mb-4">
                        Ensemble <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">Faisons</span> <br/>
                        <span className="text-[#EF4444]">Briller</span> <br/>
                        {profile.title}
                    </h1>
                    <p className="text-xl md:text-2xl font-light text-gray-300 italic">
                        "Toutes les clés sont ici"
                    </p>
                </div>

                {/* Socials / Actions */}
                <div className="mt-auto border-t border-white/20 pt-6 flex flex-wrap items-center gap-6">
                    <span className="font-bold text-lg">Le Level</span>
                    
                    <div className="flex gap-3">
                        {/* Affichage dynamique des réseaux sociaux */}
                        {profile.social_links && typeof profile.social_links === 'object' ? (
                            Object.entries(profile.social_links).map(([key, url]) => (
                                <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="bg-white text-[#3A3086] w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#EF4444] hover:text-white transition-all transform hover:scale-110">
                                    {/* Mapping simple des icônes */}
                                    <i className={`fab fa-${key === 'website' ? 'globe' : key} text-lg material-icons`}>
                                        {key === 'instagram' ? 'photo_camera' : key === 'linkedin' ? 'work' : 'link'}
                                    </i>
                                </a>
                            ))
                        ) : (
                            // Fallback si pas de liens
                            <>
                                <button className="bg-white text-[#3A3086] w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#EF4444] hover:text-white transition-all">
                                    <span className="material-icons text-lg">photo_camera</span>
                                </button>
                                <button className="bg-white text-[#3A3086] w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#EF4444] hover:text-white transition-all">
                                    <span className="material-icons text-lg">public</span>
                                </button>
                            </>
                        )}
                    </div>

                    <button className="ml-auto bg-[#EF4444] hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-red-600/30 transition transform hover:-translate-y-1">
                        Contacter
                    </button>
                </div>
            </div>
        </div>

        {/* --- SECTION DÉTAILS (Sous le poster) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            
            {/* Colonne Gauche : Description */}
            <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h3 className="text-2xl font-['Syne'] font-bold text-[#3A3086] mb-6 flex items-center gap-2">
                        <span className="w-2 h-8 bg-[#EF4444] rounded-full"></span>
                        À Propos du Talent
                    </h3>
                    <div className="prose prose-lg text-gray-600 leading-relaxed whitespace-pre-line">
                        {profile.description || "Aucune description disponible pour ce talent."}
                    </div>
                    
                    {/* Stats simples */}
                    <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-100">
                        <div className="text-center">
                            <span className="block text-3xl font-black text-[#3A3086]">{profile.views_count || 0}</span>
                            <span className="text-xs font-bold text-gray-400 uppercase">Vues</span>
                        </div>
                        <div className="text-center border-l border-gray-100">
                            <span className="block text-3xl font-black text-[#3A3086]">{profile.rating || '-'}</span>
                            <span className="text-xs font-bold text-gray-400 uppercase">Note</span>
                        </div>
                        <div className="text-center border-l border-gray-100">
                            <span className="block text-3xl font-black text-[#3A3086]">
                                {new Date(profile.created_at).getFullYear()}
                            </span>
                            <span className="text-xs font-bold text-gray-400 uppercase">Depuis</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Colonne Droite : Infos Rapides */}
            <div className="space-y-6">
                <div className="bg-[#3A3086] text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#EF4444] rounded-full blur-[50px] opacity-20 pointer-events-none"></div>
                    
                    <h4 className="font-bold uppercase tracking-widest text-sm mb-4 opacity-80">Détails</h4>
                    <ul className="space-y-4 relative z-10">
                        <li className="flex justify-between border-b border-white/10 pb-2">
                            <span className="opacity-70">Catégorie</span>
                            <span className="font-bold">{profile.category || 'N/A'}</span>
                        </li>
                        <li className="flex justify-between border-b border-white/10 pb-2">
                            <span className="opacity-70">Statut</span>
                            <span className="font-bold capitalize flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${profile.status === 'active' ? 'bg-green-400' : 'bg-gray-400'}`}></span>
                                {profile.status}
                            </span>
                        </li>
                        <li className="flex justify-between pt-2">
                            <span className="opacity-70">Site Web</span>
                            {profile.website ? (
                                <a href={profile.website} target="_blank" rel="noreferrer" className="font-bold text-[#FBBF24] hover:underline truncate max-w-[150px]">
                                    Visiter
                                </a>
                            ) : (
                                <span>-</span>
                            )}
                        </li>
                    </ul>
                </div>
            </div>

        </div>

      </div>
    </div>
  );
};

export {TalentDetailsPage};
export default TalentDetailsPage;