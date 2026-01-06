import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ContestService from '../../api/contests';
import { PageLoader } from '../../components/common/Loader';

const ContestDetailsPage = () => {
  const { slug } = useParams();
  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Charte graphique
  const colors = {
    primary: "#EF4444",      // Rouge (Actions, Boutons, Liens)
    secondary: "#3A3086",    // Violet profond (Titres, Fonds foncés)
    accentYellow: "#FBBF24", // Jaune (Prix, Trophées)
    earthBrown: "#8D6E63",   // Marron (Bordures subtiles)
    bgLight: "#F9FAFB",      // Fond clair
    bgDark: "#111827"        // Texte sombre
  };

  // Timer state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Styles SVG (Adaptés légèrement pour la transparence)
  const tribalPattern = "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%233A3086\\' fill-opacity=\\'0.03\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')";
  
  const tribalPatternWhite = "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'0.10\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')";

  // Fetch Data
  useEffect(() => {
    const fetchContest = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const data = await ContestService.getBySlug(slug);
        setContest(data);
      } catch (error) {
        console.error("Erreur chargement concours:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContest();
  }, [slug]);

  // Countdown Logic
  useEffect(() => {
    if (!contest || !contest.ended_at) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(contest.ended_at).getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [contest]);

  const handleParticipate = async () => {
      alert("Implémenter la logique d'upload ici");
  };

  if (loading) return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#EF4444]"></div>
      </div>
  );

  if (!contest) return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB] text-[#111827]">
          <h2 className="text-2xl font-bold">Concours introuvable</h2>
          <Link to="/contests" className="text-[#EF4444] mt-4 hover:underline">Retour à la liste</Link>
      </div>
  );

  return (
    <div className="bg-[#F9FAFB] text-[#111827] font-['Manrope',sans-serif] overflow-x-hidden" style={{ backgroundImage: tribalPattern }}>
      <style>
        {`
          ::-webkit-scrollbar { width: 8px; height: 8px; }
          ::-webkit-scrollbar-track { background: #F9FAFB; }
          ::-webkit-scrollbar-thumb { background: #8D6E63; border-radius: 4px; }
          ::-webkit-scrollbar-thumb:hover { background: #3A3086; }
        `}
      </style>
      {loading && <PageLoader />}
      
      
      <div className="flex flex-col min-h-screen">
        
        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center w-full">
          <div className="w-full max-w-[1280px] px-4 md:px-8 py-6 flex flex-col gap-6">
            
            {/* Breadcrumb */}
            <div className="flex flex-wrap gap-2 items-center text-sm font-medium">
              <Link className="text-gray-500 hover:text-[#EF4444] transition-colors" to="/contests">Concours</Link>
              <span className="material-symbols-outlined text-gray-400 text-[16px]">chevron_right</span>
              <span className="text-gray-500 capitalize">{contest.type}</span>
              <span className="material-symbols-outlined text-gray-400 text-[16px]">chevron_right</span>
              <span className="text-[#3A3086] font-bold">{contest.title}</span>
            </div>

            {/* Hero Banner Dynamique */}
            <div className="relative w-full rounded-3xl overflow-hidden min-h-[480px] flex flex-col justify-end p-6 md:p-10 group shadow-xl shadow-[#3A3086]/20">
              <div 
                className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 group-hover:scale-105" 
                style={{ backgroundImage: `url("${contest.image_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxwvxaVKKukgE1gYSIqrB9-Vr6nb_vSuWOfuYMg1rb8TUerZ_u38E8065eig7SX3a_z6QZd3QXAlLqs17dl4YUb2CjfOXNIkgluxlpYnO12V3RFgckrB4Kk7vYeOo_S624AlEQeSxPZzElRFQIkJ75iJ5T-hfeBQR9Z4nLLOvHrZh3PjYlwURKpT_Jkp5viUuTrCQSA2r_Kcwx8XwavORrapUY_WWn4P4Q66Io2hHux-Bqki8Pb429lmh-Kb036UobqdVvXu8BjlVn'}")` }}
              ></div>
              {/* Gradient overlay utilisant le Violet Secondaire */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#3A3086] via-[#3A3086]/70 to-transparent z-10"></div>
              <div className="absolute inset-0 opacity-40 z-10 pointer-events-none" style={{ backgroundImage: tribalPatternWhite }}></div>
              
              <div className="relative z-20 flex flex-col lg:flex-row gap-8 items-end justify-between w-full">
                <div className="flex flex-col gap-5 max-w-2xl mb-2 lg:mb-0">
                  <div className="flex items-center gap-3">
                    {/* Badge Statut en Rouge Primaire */}
                    <span className={`px-3 py-1 rounded-full ${contest.status === 'active' ? 'bg-[#EF4444]' : 'bg-gray-500'} text-white text-xs font-bold uppercase tracking-wider shadow-lg animate-pulse`}>
                      {contest.status === 'active' ? 'Ferme Bientôt' : contest.status}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/20">
                      {contest.type}
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight tracking-tight uppercase drop-shadow-lg">
                    {contest.title}
                  </h1>
                  <p className="text-slate-200 text-lg md:text-xl max-w-xl font-medium drop-shadow-md">
                    {contest.objective}
                  </p>
                </div>
                
                {/* Countdown Timer Dynamique */}
                <div className="bg-[#ffffff]/95 backdrop-blur-xl border border-white/50 p-6 rounded-2xl flex flex-col gap-4 min-w-[320px] shadow-2xl shadow-black/10">
                  <div className="flex items-center justify-between">
                    <p className="text-[#3A3086] text-xs font-bold uppercase tracking-widest">Temps Restant</p>
                    {contest.status === 'active' && <span className="flex h-2 w-2 rounded-full bg-[#EF4444] animate-ping"></span>}
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    {/* Compteurs avec texte Rouge Primaire et Bordure Violette */}
                    <div className="flex flex-col items-center">
                      <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center text-[#EF4444] font-black text-2xl shadow-sm border border-gray-200">{timeLeft.days}</div>
                      <span className="text-[10px] uppercase mt-1 text-gray-500 font-bold">Jours</span>
                    </div>
                    <span className="text-[#3A3086] font-bold text-xl">:</span>
                    <div className="flex flex-col items-center">
                      <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center text-[#3A3086] font-black text-2xl shadow-sm border border-gray-200">{timeLeft.hours}</div>
                      <span className="text-[10px] uppercase mt-1 text-gray-500 font-bold">Heures</span>
                    </div>
                    <span className="text-[#3A3086] font-bold text-xl">:</span>
                    <div className="flex flex-col items-center">
                      <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center text-[#3A3086] font-black text-2xl shadow-sm border border-gray-200">{timeLeft.minutes}</div>
                      <span className="text-[10px] uppercase mt-1 text-gray-500 font-bold">Min</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleParticipate}
                    disabled={contest.status !== 'active'}
                    className={`mt-2 w-full font-bold py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group/btn active:scale-95 ${contest.status === 'active' ? 'bg-[#EF4444] hover:bg-red-600 text-white shadow-[#EF4444]/30' : 'bg-gray-400 cursor-not-allowed text-gray-200'}`}
                  >
                    {contest.status === 'active' ? 'Soumettre votre entrée' : 'Concours terminé'}
                    {contest.status === 'active' && <span className="material-symbols-outlined group-hover/btn:translate-x-1 transition-transform text-lg">arrow_forward</span>}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
              <div className="lg:col-span-8 flex flex-col gap-8">
                
                {/* Tabs */}
                <div className="sticky top-[73px] z-30 bg-[#F9FAFB]/95 backdrop-blur-md pt-2 pb-4 -mx-4 px-4 md:mx-0 md:px-0 border-b border-gray-200">
                  <nav aria-label="Tabs" className="flex gap-2 overflow-x-auto no-scrollbar">
                    <button className="shrink-0 rounded-full px-6 py-2.5 text-sm font-bold bg-[#3A3086] text-white shadow-lg shadow-[#3A3086]/20">Aperçu</button>
                    <button className="shrink-0 rounded-full px-6 py-2.5 text-sm font-bold text-gray-500 hover:bg-white hover:text-[#EF4444] transition-all hover:shadow-sm">Règles & Éligibilité</button>
                    <button className="shrink-0 rounded-full px-6 py-2.5 text-sm font-bold text-gray-500 hover:bg-white hover:text-[#EF4444] transition-all hover:shadow-sm">Prix</button>
                  </nav>
                </div>

                <div className="flex flex-col gap-10">
                  {/* The Brief */}
                  <section>
                    <h3 className="text-2xl font-black text-[#3A3086] mb-4 flex items-center gap-2">
                      <span className="w-2 h-8 bg-[#EF4444] rounded-full"></span>
                      Le Brief
                    </h3>
                    <div className="prose prose-slate max-w-none text-gray-600 leading-relaxed text-lg bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                      <p className="whitespace-pre-line mb-4">{contest.description}</p>
                      
                      {contest.rules && (
                        <div className="mt-6 bg-[#F9FAFB] p-4 rounded-xl border border-gray-100">
                            <h4 className="font-bold text-[#3A3086] mb-2">Règles spécifiques :</h4>
                            <ul className="list-disc pl-5 space-y-1">
                                {Array.isArray(contest.rules) ? 
                                    contest.rules.map((rule, idx) => <li key={idx} className="text-sm text-gray-600">{rule}</li>) : 
                                    <li className="text-sm">Voir le document complet.</li>
                                }
                            </ul>
                        </div>
                      )}
                    </div>
                  </section>

                  {/* Prizes */}
                  <section>
                    <h3 className="text-2xl font-black text-[#3A3086] mb-6 flex items-center gap-2">
                      <span className="w-2 h-8 bg-[#FBBF24] rounded-full"></span>
                      Prix
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {contest.prizes && Array.isArray(contest.prizes) ? contest.prizes.map((prize, idx) => (
                          <div key={idx} className={`bg-white border border-gray-100 rounded-2xl p-6 relative overflow-hidden group hover:border-[#FBBF24] transition-all hover:shadow-lg ${idx === 0 ? 'ring-2 ring-[#FBBF24]/30' : ''}`}>
                            <div className="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:opacity-10 transition-opacity">
                              <span className="material-symbols-outlined text-9xl text-[#FBBF24]">trophy</span>
                            </div>
                            <div className="relative z-10">
                              <span className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold mb-3 shadow-md ${idx === 0 ? 'bg-gradient-to-r from-[#FBBF24] to-amber-500' : 'bg-gray-400'}`}>
                                {prize.position || `${idx + 1}ère Place`}
                              </span>
                              <h4 className="text-4xl font-black text-[#3A3086] mb-1 tracking-tight">{prize.amount}</h4>
                              <p className="text-gray-500 text-sm mb-4 font-medium">{prize.description || 'Récompense'}</p>
                            </div>
                          </div>
                      )) : (
                          <p>Aucun prix listé.</p>
                      )}
                    </div>
                  </section>

                  {/* Submit Area */}
                  <section>
                    <h3 className="text-2xl font-black text-[#3A3086] mb-4 flex items-center gap-2">
                      <span className="w-2 h-8 bg-[#EF4444] rounded-full"></span>
                      Soumettre votre travail
                    </h3>
                    <div 
                        onClick={handleParticipate}
                        className="border-2 border-dashed border-[#8D6E63]/30 rounded-3xl p-10 flex flex-col items-center justify-center text-center bg-white hover:bg-red-50/50 hover:border-[#EF4444] transition-all cursor-pointer group"
                    >
                      <div className="bg-[#EF4444]/10 p-5 rounded-full mb-4 group-hover:scale-110 group-hover:bg-[#EF4444]/20 transition-all duration-300">
                        <span className="material-symbols-outlined text-4xl text-[#EF4444]">cloud_upload</span>
                      </div>
                      <h4 className="text-[#3A3086] font-bold text-xl mb-2">Glissez & déposez vos fichiers ici</h4>
                      <p className="text-gray-500 text-sm max-w-sm mb-6">Formats supportés : JPG, PNG, PDF.</p>
                      <button className="bg-[#3A3086] text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-[#EF4444] transition-colors shadow-lg shadow-[#3A3086]/20">Parcourir les fichiers</button>
                    </div>
                  </section>
                </div>
              </div>

              {/* Sidebar: Jury & Resources */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                
                {/* Jury Card */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-[#3A3086] font-bold mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#EF4444]">gavel</span> Le Jury
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">Experts de l'industrie sélectionnés pour ce défi.</p>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 group">
                      <div className="size-14 bg-gray-200 rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-[#EF4444] transition-colors">
                         <img src="https://i.pravatar.cc/150?u=a" alt="Jury" />
                      </div>
                      <div>
                        <p className="text-[#3A3086] font-bold text-sm">Expert Invité</p>
                        <p className="text-gray-500 text-xs">Lead Designer</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white border border-gray-200 text-gray-500 text-xs font-semibold rounded-full hover:border-[#EF4444] hover:text-[#EF4444] transition-colors cursor-pointer">#{contest.type}</span>
                  <span className="px-3 py-1 bg-white border border-gray-200 text-gray-500 text-xs font-semibold rounded-full hover:border-[#EF4444] hover:text-[#EF4444] transition-colors cursor-pointer">#Challenge</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export {ContestDetailsPage};
export default ContestDetailsPage;