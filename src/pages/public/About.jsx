import React, { useState, useEffect } from 'react';
import { PageLoader } from '../../components/common/Loader'; // Import du loader

const AboutPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // --- ÉTAT DU CHARGEMENT ---
  const [loading, setLoading] = useState(true);

  // Détection du mode sombre système et simulation du chargement
  useEffect(() => {
    // 1. Détection Dark Mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }

    // 2. Logique de chargement (2 secondes comme sur les autres pages)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Styles dynamiques pour les motifs de fond
  const patternStyle = {
    backgroundImage: isDarkMode 
      ? "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'0.05\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
      : "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23333399\\' fill-opacity=\\'0.05\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''} font-['Montserrat',sans-serif]`}>
      <style>
        {`
          ::-webkit-scrollbar { width: 10px; }
          ::-webkit-scrollbar-track { background: #f1f1f1; }
          ::-webkit-scrollbar-thumb { background: #333399; border-radius: 5px; }
          ::-webkit-scrollbar-thumb:hover { background: #2a2a80; }
        `}
      </style>

      {/* AFFICHAGE DU LOADER */}
      {loading && <PageLoader />}

      <div className="bg-[#FAFAFA] dark:bg-[#121212] text-gray-800 dark:text-gray-200 transition-colors duration-300 min-h-screen">
        
        {/* Hero Section */}
        <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-40" style={patternStyle}></div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#333399]/10 to-transparent dark:from-[#333399]/20 pointer-events-none"></div>
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#E63946]/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-['Playfair_Display',serif] text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              Pas juste un autre niveau. <br/>
              <span className="text-[#333399] dark:text-blue-400 relative inline-block">
                Nous sommes le Boost.
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#E63946]" fill="none" viewBox="0 0 200 9" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C25.7501 2.99999 83.2501 0.999969 198.001 3.49997" stroke="currentColor" strokeWidth="3"></path></svg>
              </span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              Où la créativité africaine rencontre la stratégie mondiale. Nous ne nous contentons pas de maintenir votre statu quo ; nous l'élevons.
            </p>
          </div>
        </header>

        {/* Story Section */}
        <section className="py-16 bg-white dark:bg-[#1E1E1E] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <img alt="Équipe collaborant dans un bureau moderne" className="rounded-2xl shadow-xl transform translate-y-8 object-cover h-64 w-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQ-_H5-f2JOQ9UF-Jow7tQvR0gwrah5G3FlQ8oJbqdEX0nEbcdxyIv8-DR9_3zNmwPfldY_CRR7IvN1d1Y2POf8L4nLh-LI9JKxceLiVYTRIB-KWQAVARc-suzwM6fwTP-WVvLeV4ZgoXh9dStqhx4OuHfDfxfm6yINehHCwLQJjlIcAV_ngtUbCQoBnT1Hktbph5LxzovY-XqbX33IWjvyMoXGAPA-UTgs82E7tKq7yZitDvqd0Xk5mkGtB7cYGzpJcO6XLQ6hkJk"/>
                  <img alt="Session de brainstorming créatif" className="rounded-2xl shadow-xl object-cover h-64 w-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-zd0XiPSKudSFLunEj1lCmTl-r4PqPHsPJ4a_q0QoHSyFolrKgFKCprBRHBK9YMc5b-6K06yisUHstYlU05SP1ziz6-WxnlJg4j5jMQv8D8GCsD6jpGnZZ8EvCsYcmHM4ATdaTZ-_S4kvOxU1bI5pyj6FFKhSNnZ3w2sCF0FWrtXsDzU6qEHw8SAownDGjSsUzWAHC7XdMBMPk_d9tqE17-N9iuEkIKOeDCP9iZhEUSTA7qm79DGjYQ6VR9oTthEXXuUWAosXGulP"/>
                </div>
                <div className="absolute -z-10 -bottom-8 -left-8 w-40 h-40 bg-[#E63946] rounded-full opacity-10"></div>
                <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[110%] h-[90%] border-2 border-[#333399]/20 dark:border-[#333399]/40 rounded-3xl"></div>
              </div>
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[#333399] dark:text-blue-300 text-sm font-semibold mb-4">
                  <span className="material-icons-round text-base mr-2">history_edu</span> Notre Histoire
                </div>
                <h2 className="font-['Playfair_Display',serif] text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  De "Niveau" à <span className="text-[#E63946]">Level Boost</span>
                </h2>
                <div className="prose prose-lg text-gray-600 dark:text-gray-300">
                  <p className="mb-4">
                    De nombreuses agences promettent de vous faire passer au niveau supérieur. Mais rester à un niveau crée de la stagnation. Nous avons remarqué un vide sur le marché : les entreprises atteignaient de nouveaux sommets mais peinaient à maintenir leur élan.
                  </p>
                  <p className="mb-4">
                    C'est là que <span className="font-bold text-[#333399] dark:text-white">Level Boost</span> est né. Nous ne nous contentons pas d'atteindre des jalons ; nous sommes le moteur qui vous propulse au-delà.
                  </p>
                  <p>
                    Ancrés dans l'énergie vibrante de l'Afrique, nous combinons la narration traditionnelle avec le marketing numérique de pointe. Notre philosophie est simple : <strong>Ne montez pas seulement de niveau. Propulsez-vous.</strong>
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-6">
                  <div className="border-l-4 border-[#E63946] pl-4">
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">Authenticité</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Profondément ancrée dans les récits africains authentiques.</p>
                  </div>
                  <div className="border-l-4 border-[#333399] pl-4">
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">Vélocité</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Vitesse et impact dans chaque campagne.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission / Vision */}
        <section className="py-20 bg-[#FAFAFA] dark:bg-[#121212]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group relative bg-white dark:bg-[#1E1E1E] p-10 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:shadow-[#333399]/10 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-icons-round text-9xl text-[#333399]">rocket_launch</span>
                </div>
                <span className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#333399] text-white mb-6 shadow-lg shadow-[#333399]/40">
                  <span className="material-icons-round text-2xl">flag</span>
                </span>
                <h3 className="font-['Playfair_Display',serif] text-3xl font-bold text-gray-900 dark:text-white mb-4">Notre Mission</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Habiliter les entreprises africaines en transformant leur présence numérique en une force dynamique. Nous visons à remplacer le marketing statique par des stratégies cinétiques qui génèrent une vélocité et une croissance mesurables.
                </p>
              </div>
              <div className="group relative bg-white dark:bg-[#1E1E1E] p-10 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:shadow-[#E63946]/10 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-icons-round text-9xl text-[#E63946]">visibility</span>
                </div>
                <span className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#E63946] text-white mb-6 shadow-lg shadow-[#E63946]/40">
                  <span className="material-icons-round text-2xl">light_mode</span>
                </span>
                <h3 className="font-['Playfair_Display',serif] text-3xl font-bold text-gray-900 dark:text-white mb-4">Notre Vision</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Être le premier catalyseur de l'accélération des marques sur le continent, prouvant que la créativité africaine est l'avantage concurrentiel ultime dans l'économie numérique mondiale.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-20 bg-[#333399] text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #ffffff 10px, #ffffff 11px), repeating-linear-gradient(-45deg, transparent, transparent 10px, #ffffff 10px, #ffffff 11px)'}}></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-['Playfair_Display',serif] text-4xl font-bold mb-4">Le Niveau vs Le Boost</h2>
              <p className="text-blue-200 max-w-2xl mx-auto text-lg">Nous ne fixons pas seulement la norme ; nous brisons le plafond.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl hover:bg-white/20 transition-colors">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Agence Standard</h3>
                  <span className="material-icons-round text-white/50">horizontal_rule</span>
                </div>
                <p className="text-blue-100 mb-6 text-sm h-20">Crée une campagne, la lance et envoie un rapport à la fin du mois.</p>
                <div className="h-px w-full bg-white/20 mb-6"></div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-[#E63946]">Level Boost</h3>
                  <span className="material-icons-round text-[#E63946]">trending_up</span>
                </div>
                <p className="text-white text-sm">Ingénie un mouvement. Nous utilisons les données en temps réel pour pivoter, accélérer et maximiser le ROI quotidiennement.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl hover:bg-white/20 transition-colors transform md:-translate-y-4 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Contenu Standard</h3>
                  <span className="material-icons-round text-white/50">image</span>
                </div>
                <p className="text-blue-100 mb-6 text-sm h-20">Utilise des photos d'archives et des textes génériques qui pourraient appartenir à n'importe qui.</p>
                <div className="h-px w-full bg-white/20 mb-6"></div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-[#E63946]">Création Boost</h3>
                  <span className="material-icons-round text-[#E63946]">palette</span>
                </div>
                <p className="text-white text-sm">Design afro-centrique sur mesure. Nous créons des visuels qui résonnent culturellement et émotionnellement.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl hover:bg-white/20 transition-colors">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Stratégie Standard</h3>
                  <span className="material-icons-round text-white/50">map</span>
                </div>
                <p className="text-blue-100 mb-6 text-sm h-20">Suit le manuel que tout le monde utilise.</p>
                <div className="h-px w-full bg-white/20 mb-6"></div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-[#E63946]">Stratégie Boost</h3>
                  <span className="material-icons-round text-[#E63946]">psychology</span>
                </div>
                <p className="text-white text-sm">Pensée disruptive. Nous identifions les canaux sous-utilisés et les angles uniques.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-[#FFFFFF] dark:bg-[#1E1E1E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-[#E63946] font-bold tracking-wider uppercase text-sm">Les Boosters</span>
              <h2 className="font-['Playfair_Display',serif] text-4xl font-bold text-gray-900 dark:text-white mt-2">Rencontrez les Esprits</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="group">
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[3/4]">
                  <img alt="Rosvanie NKOUKA - PDG" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" src="Roslevelboost.jpg"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#333399]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <p className="text-white text-sm italic">"La croissance est la seule preuve de vie."</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Rosvanie NKOUKA</h3>
                <p className="text-[#E63946] font-medium">Fondatrice & PDG</p>
              </div>
              <div className="group">
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[3/4]">
                  <img alt="David Mensah - Directeur Artistique" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGR6rxRvOhNQw2brCAEYycoPoHHO0hR1m07aT3daAGM6QF-rcQBZm-N06yZ3e5_8tFrSjWhQ7mbjBB9Fyt9sEkNys9p4ANkJGdOtQ71XeJFJhmQpoV-5i6yd4GclMBJnNXovmUMiFneD3zNVH9uyb04aNP8Bex3eofAuZ_v_Vw15ZxCL1sLwpU8UI26642WIgbtfj-JmgoyFQ5KTMY8I-jyswitSbYJIPHdGFqEivnN-9DQtzSbNrGH_bSsyTayX-xreNHpWR3BRoD"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#333399]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <p className="text-white text-sm italic">"Le design est l'intelligence rendue visible."</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">David Mensah</h3>
                <p className="text-[#E63946] font-medium">Directeur Artistique</p>
              </div>
              <div className="group">
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[3/4]">
                  <img alt="Amara Diop - Cheffe de la Stratégie" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFewMcale2KAF2EhHx7pSmVz80uU_iz9jIzegjdbTJE0a1Gv2JXOgQKn1rHTIVe6ZLJrneAKimkhg5XcbIffex1hOPmbcsL9cN8OY9oaMsYjpuZKSVZYDKFEFGc-Lnb0l1biQ1pREGyfF1tycFi3qquStqX7gh2g9YLc0j0h7f33yaXoVIsHyHsqVFYdYc-Mz2NE_cceGufOZo54EZM0JcE8RxzA-4nn7EYPZr2cgXUfiG318plW9DG2d_RxrjC-sGYhYmXOBpKORW"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#333399]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <p className="text-white text-sm italic">"La stratégie, c'est faire des choix."</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Amara Diop</h3>
                <p className="text-[#E63946] font-medium">Cheffe de la Stratégie</p>
              </div>
              <div className="group">
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[3/4]">
                  <img alt="Manassé AFOULA - Tech Lead" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" src="Manasse.jpg"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#333399]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <p className="text-white text-sm italic">"Le code est la nouvelle alphabétisation."</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Manassé AFOULA</h3>
                <p className="text-[#E63946] font-medium">Développeur Principal</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-[#FAFAFA] dark:bg-[#121212]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#333399] to-blue-900 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#E63946] rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-white rounded-full opacity-10 blur-2xl"></div>
              <div className="relative z-10">
                <h2 className="font-['Playfair_Display',serif] text-4xl md:text-5xl font-bold text-white mb-6">Prêt à booster votre marque ?</h2>
                <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto">Ne vous contentez plus d'un simple niveau. Construisons une stratégie qui résonne, convertit et dure.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-[#E63946] hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all transform hover:-translate-y-1">
                    Lancer votre projet
                  </button>
                  <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#333399] px-8 py-4 rounded-full font-bold text-lg transition-all">
                    Voir le Portfolio
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export { AboutPage };
export default AboutPage;