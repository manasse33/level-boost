import React from 'react';
import { motion } from 'framer-motion';

// Définition des couleurs pour réutilisation
const colors = {
  primary: "#EF4444",      // Rouge
  secondary: "#3A3086",    // Violet profond
  accentYellow: "#FBBF24", // Jaune
};

// ============= COMPOSANT LOADER INDIVIDUEL =============
export const Loader = ({ size = 'md', className = "" }) => {
  // Tailles ajustées
  const sizeMap = {
    sm: 24,
    md: 48,
    lg: 80,
  };

  const pixelSize = sizeMap[size] || 48;

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: pixelSize, height: pixelSize }}>
      {/* Cercle Extérieur (Rouge) - Tourne vite */}
      <motion.span
        className="absolute w-full h-full border-4 border-transparent border-t-[#EF4444] border-r-[#EF4444] rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Cercle Intérieur (Violet) - Tourne sens inverse */}
      <motion.span
        className="absolute w-3/4 h-3/4 border-4 border-transparent border-b-[#3A3086] border-l-[#3A3086] rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />

      {/* Point Central (Jaune) - Pulse */}
      <motion.div
        className="absolute w-1/4 h-1/4 bg-[#FBBF24] rounded-full shadow-[0_0_10px_#FBBF24]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

// ============= COMPOSANT PAGE LOADER (PLEIN ÉCRAN) =============
export const PageLoader = () => {
  // Style du motif d'arrière-plan (identique à TalentsPage)
  const patternStyle = {
    backgroundImage: `radial-gradient(#EF4444 1.5px, transparent 1.5px), radial-gradient(#3A3086 1.5px, transparent 1.5px)`,
    backgroundSize: '30px 30px',
    backgroundPosition: '0 0, 15px 15px',
    opacity: 0.05
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F9FAFB] dark:bg-[#111827] overflow-hidden">
      
      {/* --- ÉLÉMENTS D'ARRIÈRE-PLAN --- */}
      {/* Motif à points */}
      <div className="absolute inset-0 pointer-events-none" style={patternStyle}></div>
      
      {/* Orbes de couleur flous (Glow effects) */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#EF4444]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-[#3A3086]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* --- CONTENU DU CHARGEMENT --- */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Loader Animé */}
        <div className="mb-8 relative">
          <Loader size="lg" />
          
          {/* Effet d'ombre/lueur sous le loader */}
          <div className="absolute inset-0 bg-white/20 blur-xl rounded-full z-[-1]"></div>
        </div>

        {/* Texte de chargement */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <h3 className="font-['Syne',sans-serif] font-bold text-2xl text-[#3A3086] dark:text-white tracking-wide mb-2">
            LEVEL BOOST
          </h3>
          
          <div className="flex items-center gap-1 justify-center">
            <span className="text-sm font-['Plus_Jakarta_Sans',sans-serif] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest">
              Chargement
            </span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.1 }}
              className="text-[#EF4444] text-xl leading-none"
            >.</motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2, repeatDelay: 0.1 }}
              className="text-[#EF4444] text-xl leading-none"
            >.</motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4, repeatDelay: 0.1 }}
              className="text-[#EF4444] text-xl leading-none"
            >.</motion.span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PageLoader;