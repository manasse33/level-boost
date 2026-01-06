import React from 'react';

const ConfirmationPage = () => {
  // Définition de la charte graphique
  const colors = {
    primary: "#EF4444",      // Rouge (Action principale)
    secondary: "#3A3086",    // Violet profond (Marque / Confiance)
    accentYellow: "#FBBF24", // Jaune (Détail / Focus)
    earthBrown: "#8D6E63",   // Marron (Secondaire / Neutre)
    bgLight: "#F9FAFB",      // Fond clair
    bgDark: "#111827"        // Fond sombre
  };

  // Mise à jour du SVG avec la couleur secondaire (Violet) encodée (%233A3086)
  const patternStyle = {
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233A3086' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
  };

  return (
    <div className={`bg-[${colors.bgLight}] dark:bg-[${colors.bgDark}] text-[#1f2937] dark:text-[#f3f4f6] font-['Manrope',sans-serif] overflow-x-hidden flex flex-col min-h-screen transition-colors duration-300`}>
      
      {/* Styles globaux injectés pour les bordures spécifiques */}
      <style>
        {`
          .african-accent-border {
            position: relative;
          }
          .african-accent-border::after {
            content: '';
            position: absolute;
            bottom: -4px;
            right: -4px;
            width: 100%;
            height: 100%;
            border-radius: inherit;
            border: 2px solid ${colors.secondary}; 
            z-index: -1;
            opacity: 0.2;
          }
        `}
      </style>

      {/* --- Main Content: Confirmation Hero --- */}
      <main className="flex-grow flex flex-col">
        <div className="relative w-full flex-1 flex items-center justify-center py-16 px-4" style={patternStyle}>
          {/* Decorative gradients */}
          <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-[${colors.bgLight}]/80 dark:to-[${colors.bgDark}]/80 pointer-events-none`}></div>
          
          <div className="relative w-full max-w-2xl">
            {/* Card Container */}
            <div className={`bg-white dark:bg-[#1f2937] rounded-2xl shadow-xl p-8 md:p-12 text-center border border-gray-100 dark:border-gray-700 african-accent-border`}>
              
              {/* Success Icon Wrapper */}
              <div className="mb-8 relative inline-flex">
                {/* Ping Animation (Red primary) */}
                <div className={`absolute inset-0 rounded-full bg-[${colors.primary}]/20 animate-ping opacity-75`}></div>
                
                {/* Main Circle (Gradient Violet) */}
                <div className={`relative flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[${colors.secondary}] to-[#2e266b] shadow-lg text-white mx-auto`}>
                  <span className="material-symbols-outlined text-5xl">check</span>
                </div>
                
                {/* Decorative Dot (Yellow) */}
                <div className={`absolute top-0 right-0 w-6 h-6 bg-[${colors.accentYellow}] rounded-full border-4 border-white dark:border-[#1f2937]`}></div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
                Merci pour votre confiance !
              </h1>
              
              <p className="text-gray-500 dark:text-gray-300 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
                Votre demande a bien été envoyée à l'équipe <span className={`font-bold text-[${colors.secondary}] dark:text-white`}>Level Boost</span>. Un de nos experts reviendra vers vous sous <span className={`text-[${colors.primary}] font-bold`}>24h</span> pour discuter de votre projet.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {/* Primary Button (Red) */}
                <button className={`w-full sm:w-auto min-w-[200px] h-12 rounded-full bg-[${colors.primary}] hover:opacity-90 text-white font-bold text-sm px-8 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-500/20`}>
                  <span>Retour à l'accueil</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
                
                {/* Secondary Button (Border Violet/Dark) */}
                <button className={`w-full sm:w-auto min-w-[200px] h-12 rounded-full border-2 border-gray-200 dark:border-gray-600 hover:border-[${colors.secondary}] text-gray-700 dark:text-white hover:text-[${colors.secondary}] font-bold text-sm px-8 transition-all bg-transparent`}>
                  Voir nos réalisations
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- "While you wait" Section --- */}
        <div className={`bg-white dark:bg-[#1a202c] py-16 px-4 md:px-20 border-t border-gray-100 dark:border-gray-800`}>
          <div className="max-w-[1280px] mx-auto">
            <div className="mb-12 text-center md:text-left">
              <span className={`text-[${colors.earthBrown}] font-bold text-sm tracking-widest uppercase mb-2 block`}>En attendant</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
                Découvrez nos dernières expertises
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: Stratégie (Theme: Secondary/Violet) */}
              <div className={`group relative flex flex-col rounded-2xl bg-[${colors.bgLight}] dark:bg-[#1f2937] p-6 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer border border-transparent hover:border-[${colors.secondary}]/20`}>
                <div className={`w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-[${colors.secondary}] flex items-center justify-center mb-4 group-hover:bg-[${colors.secondary}] group-hover:text-white transition-colors`}>
                  <span className="material-symbols-outlined">trending_up</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Stratégie Digitale</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  Maximiser votre ROI grâce à une analyse data précise.
                </p>
                <div className={`mt-4 flex items-center text-[${colors.secondary}] text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity`}>
                  Lire l'article <span className="material-symbols-outlined text-sm ml-1">arrow_right_alt</span>
                </div>
              </div>

              {/* Card 2: Branding (Theme: Primary/Red) */}
              <div className={`group relative flex flex-col rounded-2xl bg-[${colors.bgLight}] dark:bg-[#1f2937] p-6 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer border border-transparent hover:border-[${colors.primary}]/20`}>
                <div className={`w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 text-[${colors.primary}] flex items-center justify-center mb-4 group-hover:bg-[${colors.primary}] group-hover:text-white transition-colors`}>
                  <span className="material-symbols-outlined">palette</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Branding Identitaire</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  Des identités visuelles fortes inspirées par la culture locale.
                </p>
                <div className={`mt-4 flex items-center text-[${colors.primary}] text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity`}>
                  Voir le case study <span className="material-symbols-outlined text-sm ml-1">arrow_right_alt</span>
                </div>
              </div>

              {/* Card 3: Growth (Theme: Accent/Yellow) */}
              <div className={`group relative flex flex-col rounded-2xl bg-[${colors.bgLight}] dark:bg-[#1f2937] p-6 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer border border-transparent hover:border-[${colors.accentYellow}]/40`}>
                <div className={`w-12 h-12 rounded-full bg-yellow-50 dark:bg-yellow-900/20 text-[${colors.accentYellow}] flex items-center justify-center mb-4 group-hover:bg-[${colors.accentYellow}] group-hover:text-white transition-colors`}>
                  <span className="material-symbols-outlined">rocket_launch</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Growth Marketing</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  Des campagnes d'acquisition pour scaler votre business.
                </p>
                <div className={`mt-4 flex items-center text-[${colors.accentYellow}] text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity`}>
                  En savoir plus <span className="material-symbols-outlined text-sm ml-1">arrow_right_alt</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* --- Footer --- */}
      <footer className="bg-white dark:bg-[#111827] border-t border-gray-200 dark:border-gray-800 py-10 px-4">
        <div className="max-w-[960px] mx-auto flex flex-col gap-8 text-center">
          <div className="flex justify-center gap-6">
            <a className={`text-gray-400 hover:text-[${colors.primary}] transition-colors`} href="#">
              <span className="sr-only">Instagram</span>
              <span className="material-symbols-outlined text-2xl">thumb_up</span>
            </a>
            <a className={`text-gray-400 hover:text-[${colors.secondary}] transition-colors`} href="#">
              <span className="sr-only">LinkedIn</span>
              <span className="material-symbols-outlined text-2xl">group_add</span>
            </a>
            <a className={`text-gray-400 hover:text-[${colors.earthBrown}] transition-colors`} href="#">
              <span className="sr-only">Twitter</span>
              <span className="material-symbols-outlined text-2xl">chat_bubble</span>
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors" href="#">Mentions légales</a>
            <a className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors" href="#">Politique de confidentialité</a>
            <a className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors" href="#">Plan du site</a>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 Level Boost Agency. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export { ConfirmationPage };
export default ConfirmationPage;
