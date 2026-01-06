import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ toggleDarkMode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Gestion du fond au scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fonction utilitaire pour savoir si un lien est actif
  const isActive = (path) => {
    return location.pathname === path 
      ? "text-[#EF4444]" // Active color (Primary Red)
      : "text-gray-600 dark:text-gray-300 hover:text-[#3A3086] dark:hover:text-white";
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm" 
        : "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* LOGO */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <div className="h-10 w-10 bg-[#3A3086] rounded-full flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[#EF4444] w-1/2 h-full rounded-l-full transform -skew-x-12 translate-x-1"></div>
                <span className="relative text-white font-['Syne',sans-serif] font-bold text-xl">LB</span>
              </div>
              <span className="font-['Syne',sans-serif] font-bold text-2xl text-[#3A3086] dark:text-white">
                Level<span className="text-[#EF4444]">Boost</span>
              </span>
            </Link>
          </div>
          
          {/* DESKTOP MENU */}
          <div className="hidden md:flex space-x-8 items-center">

             <Link 
              to="/" 
              className={`${isActive('/')} font-medium transition`}
            >
              Accueil
            </Link>
             <Link 
              to="/about" 
              className={`${isActive('/about')} font-medium transition`}
            >
              A Propos
            </Link>
            <Link 
              to="/services" 
              className={`${isActive('/services')} font-medium transition`}
            >
              Services
            </Link>
            
           
            
            {/* Vitrine correspond à la page Talents */}
            <Link 
              to="/talents" 
              className={`${isActive('/talents')} font-medium transition`}
            >
              Vitrine
            </Link>

            {/* J'ai ajouté Concours ici car c'est une route importante, ou tu peux mettre Pricing */}
            <Link 
              to="/contests" 
              className={`${isActive('/contests')} font-medium transition`}
            >
              Concours
            </Link>

            <Link 
              to="/pricing" 
              className={`${isActive('/pricing')} font-medium transition`}
            >
              Tarifs
            </Link>

            {/* CTA BUTTON -> Login */}
            <Link to="/leads">
              <button className="bg-[#3A3086] hover:bg-opacity-90 text-white px-5 py-2.5 rounded-full font-semibold transition shadow-lg shadow-[#3A3086]/30">
                Se Booster
              </button>
            </Link>

            {/* DARK MODE TOGGLE */}
            {/* Assure-toi de passer la fonction toggleDarkMode depuis ton layout ou contexte */}
            <button 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition" 
              onClick={() => {
                document.documentElement.classList.toggle('dark');
                if(toggleDarkMode) toggleDarkMode();
              }}
            >
              <span className="material-icons text-gray-500 dark:text-gray-400">brightness_6</span>
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center">
            <button 
              className="text-gray-600 dark:text-gray-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="material-icons text-3xl">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-4 py-4 space-y-4 shadow-lg absolute w-full left-0">
           <Link 
             to="/services" 
             className="block text-gray-600 dark:text-gray-300 hover:text-[#3A3086]"
             onClick={() => setIsMobileMenuOpen(false)}
           >
             Services
           </Link>
           <Link 
             to="/about" 
             className="block text-gray-600 dark:text-gray-300 hover:text-[#3A3086]"
             onClick={() => setIsMobileMenuOpen(false)}
           >
             Agence
           </Link>
           <Link 
             to="/talents" 
             className="block text-[#3A3086] font-bold"
             onClick={() => setIsMobileMenuOpen(false)}
           >
             Vitrine
           </Link>
           <Link 
             to="/contests" 
             className="block text-gray-600 dark:text-gray-300 hover:text-[#3A3086]"
             onClick={() => setIsMobileMenuOpen(false)}
           >
             Concours
           </Link>
           <Link 
             to="/pricing" 
             className="block text-gray-600 dark:text-gray-300 hover:text-[#3A3086]"
             onClick={() => setIsMobileMenuOpen(false)}
           >
             Tarifs
           </Link>
           
           <Link 
             to="/leads"
             onClick={() => setIsMobileMenuOpen(false)}
           >
             <button className="w-full bg-[#3A3086] text-white px-5 py-2.5 rounded-full font-semibold mt-2">
                Se Booster
             </button>
           </Link>
        </div>
      )}
    </nav>
  );
};
export {Navbar};
export default Navbar;