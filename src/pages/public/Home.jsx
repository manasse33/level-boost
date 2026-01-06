import React, { useState, useEffect } from 'react';
import { PageLoader } from '../../components/common/Loader';

const HomePage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // --- ÉTAT DU CHARGEMENT (Identique à Talents) ---
  const [loading, setLoading] = useState(true);

  // Définition de la palette stricte
  const colors = {
    primary: "#EF4444",      // Rouge
    secondary: "#3A3086",    // Violet profond
    accentYellow: "#FBBF24", // Jaune
    earthBrown: "#8D6E63",   // Marron
    bgLight: "#F9FAFB",
    bgDark: "#111827"
  };

  // Données des profils
  const profiles = [
    {
      title: "Artiste Émergent",
      icon: "mic", 
      color: colors.secondary, 
      desc: "Musicien, chanteur, danseur, plasticien.",
      need: "Fans, booking & visibilité locale.",
      pack: "Pack Standard / Premium"
    },
    {
      title: "Start-up / Entrepreneur",
      icon: "rocket_launch",
      color: colors.primary, 
      desc: "Produit minimum viable (MVP) lancé.",
      need: "Acquisition clients & investisseurs.",
      pack: "Pack Premium / Élite"
    },
    {
      title: "Freelance & Coach",
      icon: "work",
      color: colors.earthBrown,
      desc: "Consultants, experts indépendants.",
      need: "Crédibilité & clients réguliers.",
      pack: "Pack Basique + Abonnement"
    },
    {
      title: "Influenceur & Créateur",
      icon: "star", 
      color: colors.accentYellow, 
      desc: "Créateurs de contenu vidéo/photo.",
      need: "Augmentation d'audience & monétisation.",
      pack: "Packs Croissance + Collab"
    },
    {
      title: "Organisateur d'Événements",
      icon: "event", 
      color: colors.primary, 
      desc: "Concerts, festivals, conférences.",
      need: "Billetterie pleine & promotion massive.",
      pack: "Pack Événementiel + Ads"
    },
    {
      title: "Association / Projet Social",
      icon: "volunteer_activism", 
      color: colors.secondary, 
      desc: "ONG, initiatives communautaires.",
      need: "Notoriété & collecte de fonds.",
      pack: "Pack Solidaire (Tarifs réduits)"
    },
    {
      title: "PME & Marque Locale",
      icon: "store", 
      color: colors.earthBrown, 
      desc: "Commerces, restaurants, services.",
      need: "Clients, avis & réputation locale.",
      pack: "Pack Business / Corporate"
    }
  ];

  // Gestion du mode sombre et simulation du chargement
  useEffect(() => {
    // 1. Mode sombre
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }

    // 2. Logique de chargement (2 secondes pour le branding)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Styles pour les motifs de fond
  const patternStyle = {
    backgroundColor: isDarkMode ? colors.bgDark : '#fdfbf7',
    backgroundImage: isDarkMode 
      ? 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuA8Ow3ZvmxldO91-Tr0nw1m6AUwrXmYBH_a7riSqSYblr7VE_4gn0N3q4spkQ4vKg5OoF7rdxeG2WJ8T0oTmBv4yaUDpnFwVN81bu10_bHyeULkbwB8yiQLtKolfe4NYo6ZDUv1JB-5xqlgHPvYGIoHyJcGdmtl8UMtpq5R6mGWTuQQQYs99yLU-SHuW8O8d4dFm0y7zydzL4jj3MDYj344gtFITx-N38w85pyGLxYBX7t4ug4Iolewpgy-Iv1rRm8A3Y5fiqh52u9X)'
      : 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuDVbEP50XL6er-Kd72_ltWRh0dylhd5I_3nUVMSqJz9-iyBrEdau5JnCy6HH_KYyvY5Mu8fu74WZhjgsjzJ0Sc02Y1SMzVgnbThXBFu8GxEMCnGClrtoe_GbN4pKbeaKR7JMrW6mvpbw3X80HY_TWvqJqYcBQb2H8VyEVQ5FhziThaidke_e-NtaEErVOppk5j-A-FpCl57LL4plOQoKFC_AKKQu6nB1quNbOs61i8ar-dSJPGVdgaZOjE9imkMEBQSYYBu_BnbimFL)'
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''} font-['Open_Sans',sans-serif]`}>
        <style>
        {`
          ::-webkit-scrollbar { width: 10px; }
          ::-webkit-scrollbar-track { background: #f1f1f1; }
          ::-webkit-scrollbar-thumb { background: #333399; border-radius: 5px; }
          ::-webkit-scrollbar-thumb:hover { background: #2a2a80; }
        `}
      </style>

      {/* --- AFFICHAGE DU LOADER --- */}
      {loading && <PageLoader />}

      <div 
        className="bg-[#fdfbf7] dark:bg-[#1a1a2e] text-gray-800 dark:text-gray-100 transition-colors duration-300 min-h-screen"
        style={patternStyle}
      >
        
        {/* --- Hero Section --- */}
        <div className="relative pt-24 pb-16 lg:pt-32 overflow-hidden">
          <div className={`absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#EF4444]/10 dark:bg-[#EF4444]/20 blur-3xl`}></div>
          <div className={`absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#3A3086]/10 dark:bg-[#3A3086]/20 blur-3xl`}></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
              <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-['Montserrat',sans-serif] leading-tight">
                  <span className="block xl:inline">Propulsez Votre Marque</span>
                  <span className={`block mt-1`} style={{ color: colors.secondary }}>Au Niveau Supérieur</span>
                </h1>
                <p className="mt-3 text-base text-gray-600 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Nous allions créativité africaine et stratégies mondiales. Level Boost est votre partenaire pour la croissance numérique, l'image de marque et une narration percutante.
                </p>
                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0 flex flex-col sm:flex-row gap-4">
                  <a className={`w-full sm:w-auto flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-lg text-white md:text-lg shadow-lg hover:opacity-90 transition-all duration-300`} 
                     style={{ backgroundColor: colors.secondary }}
                     href="#contact">
                    Lancer votre campagne
                    <span className="material-icons ml-2 text-sm">arrow_forward</span>
                  </a>
                  <a className="w-full sm:w-auto flex items-center justify-center px-8 py-4 border-2 border-gray-200 dark:border-gray-700 text-base font-bold rounded-lg text-gray-700 dark:text-gray-200 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 md:text-lg transition-all duration-300" href="#services">
                    Notre Portfolio
                  </a>
                </div>
              </div>
              <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                <div className="relative mx-auto w-full rounded-2xl shadow-2xl lg:max-w-md overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500 border-4 border-white dark:border-gray-700">
                  <div className={`absolute inset-0 bg-gradient-to-tr from-[#3A3086]/60 to-transparent z-10`}></div>
                  <img alt="Équipe créative en brainstorming" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_IXYGC_dhS42fKCQc1GTA8ug8qbnVRiGE9cHl8iBDn7mfKNsbOaQa4cfJOCDaBqZd1FpS1BpLqXiM6Ro6tdAzYAx527xzL0dXjs3pmF1ITmVOdQHlDjTet4pXOqxMh4AwaM0ry42Le7aEnQx3xZREZhx-oXP-rXbVK9KNT_bF5-VD1flmij2KKV_yXUMKdlS8Yva0R5tBlEN0LejKkmwJS3aRNOh_4WPgNboU0r7aeO28_NU7Gk-0U60zG8zWoEFER2X07Y7gGsC1"/>
                </div>
                <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full flex items-center justify-center z-20 shadow-xl animate-bounce`} style={{ backgroundColor: colors.primary, animationDuration: '3s' }}>
                  <span className="material-icons text-white text-4xl">trending_up</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Why Choose Us --- */}
        <section className="py-16 bg-white dark:bg-[#1f2937] relative overflow-hidden">
          <div className={`h-2 w-full absolute top-0 left-0 bg-gradient-to-r from-[#3A3086] via-[#EF4444] to-[#FBBF24]`}></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold tracking-wide uppercase" style={{ color: colors.primary }}>Pourquoi nous choisir</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl font-['Montserrat',sans-serif]">
                Booster la visibilité, <br className="hidden sm:block"/>Ancrés dans la culture.
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 mx-auto">
                Nous ne faisons pas que des pubs, nous créons des mouvements.
              </p>
            </div>
            
            <div className="mt-16">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div className="pt-6">
                  <div className="flow-root bg-[#fdfbf7] dark:bg-[#1a1a2e] rounded-xl px-6 pb-8 h-full border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 rounded-xl shadow-lg" style={{ backgroundColor: colors.secondary }}>
                          <span className="material-icons text-white text-2xl">visibility</span>
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-bold text-gray-900 dark:text-white tracking-tight font-['Montserrat',sans-serif]">Visibilité de Marque</h3>
                      <p className="mt-5 text-base text-gray-600 dark:text-gray-400">Positionnement stratégique pour votre audience cible.</p>
                    </div>
                  </div>
                </div>
                <div className="pt-6">
                  <div className="flow-root bg-[#fdfbf7] dark:bg-[#1a1a2e] rounded-xl px-6 pb-8 h-full border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 rounded-xl shadow-lg" style={{ backgroundColor: colors.primary }}>
                          <span className="material-icons text-white text-2xl">brush</span>
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-bold text-gray-900 dark:text-white tracking-tight font-['Montserrat',sans-serif]">Design Créatif</h3>
                      <p className="mt-5 text-base text-gray-600 dark:text-gray-400">Des visuels vibrants et culturellement résonnants.</p>
                    </div>
                  </div>
                </div>
                <div className="pt-6">
                  <div className="flow-root bg-[#fdfbf7] dark:bg-[#1a1a2e] rounded-xl px-6 pb-8 h-full border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 rounded-xl shadow-lg" style={{ backgroundColor: colors.accentYellow }}>
                          <span className="material-icons text-white text-2xl">analytics</span>
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-bold text-gray-900 dark:text-white tracking-tight font-['Montserrat',sans-serif]">Croissance Data-Driven</h3>
                      <p className="mt-5 text-base text-gray-600 dark:text-gray-400">Nous analysons, itérons et optimisons pour le ROI.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- NOUVELLE SECTION: CIBLES / PROFILS --- */}
        <section className="py-20 relative overflow-hidden" id="services" style={{ backgroundColor: colors.bgLight }}>
          <div className="absolute inset-0 dark:bg-[#111921] transition-colors duration-300"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <div className="md:flex md:justify-between md:items-end mb-16">
              <div className="max-w-2xl">
                <span className="font-bold tracking-wider uppercase text-sm mb-2 block" style={{ color: colors.primary }}>Pour qui ?</span>
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl font-['Montserrat',sans-serif]">
                  Des solutions adaptées à <span className="underline decoration-4" style={{ textDecorationColor: `${colors.accentYellow}80` }}>votre profil</span>
                </h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">Identifiez votre profil et découvrez comment nous propulsons votre projet.</p>
              </div>
              <div className="mt-6 md:mt-0">
                <a href="#contact" className="inline-flex items-center font-bold transition-all group px-6 py-3 rounded-full bg-white dark:bg-[#1f2937] border shadow-sm hover:shadow-md" style={{ color: colors.secondary, borderColor: `${colors.secondary}20` }}>
                  Je ne trouve pas mon profil
                  <span className="material-icons ml-2 transition-transform group-hover:translate-x-1 text-base">arrow_forward</span>
                </a>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {profiles.map((profile, index) => (
                <div key={index} className="group relative w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] bg-white dark:bg-[#1a2632] rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: profile.color }}></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300" style={{ backgroundColor: profile.color }}></div>
                  <div>
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-sm transition-transform group-hover:scale-110 duration-300" style={{ backgroundColor: `${profile.color}15`, color: profile.color }}>
                      <span className="material-icons text-3xl">{profile.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight font-['Montserrat',sans-serif]">{profile.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 min-h-[40px]">{profile.desc}</p>
                    <div className="mb-4 p-3 rounded-lg bg-gray-50 dark:bg-[#111921] border border-gray-100 dark:border-gray-700">
                      <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">Besoin principal</p>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{profile.need}</p>
                    </div>
                  </div>
                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase text-gray-400 mb-0.5">Recommandé</span>
                      <span className="text-xs font-bold" style={{ color: profile.color }}>{profile.pack}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0" style={{ backgroundColor: profile.color }}>
                      <span className="material-icons text-white text-sm">arrow_forward</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA Section --- */}
        <section className="relative py-24 overflow-hidden" style={{ backgroundColor: colors.secondary }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCjbbo9bmgAdAbtgciKXLQL9M0CKTs6V3jthExc-ykn149t1fBY5arhO-q0AQEG_0uJGmPKjMtC-ve136QRTMwbPRBRHCZO-YvCtNgUthX8OkoNj6JeTB3BT5OreN1I75nZAgg-ANm14oAjfEBMoH_DL4AR2e827uVAKNeMRvNe1Bn-JtfI1mpcbg5GHaAvzeiAwh3QK7TlcBCj-43_NLAdMN5oaU1F_ICx8ddA2f71ijHh6ickw3OnbdmCYMgLZ06m_tzWfHnHTdOh')" }}></div>
          <div className={`absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full opacity-20 blur-3xl`} style={{ backgroundColor: colors.primary }}></div>
          <div className={`absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full opacity-20 blur-3xl`} style={{ backgroundColor: colors.accentYellow }}></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl font-['Montserrat',sans-serif]">
              Prêt à booster votre marque ?
            </h2>
            <p className="mt-4 text-xl text-blue-100">
              Rejoignez la ligue des marques qui ont élevé leur présence avec Level Boost.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <a className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-full bg-white hover:bg-gray-100 transition-colors shadow-lg" 
                 style={{ color: colors.secondary }}
                 href="#contact">
                Contactez-nous aujourd'hui
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export { HomePage };
export default HomePage;