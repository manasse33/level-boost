import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Colonne 1 : Logo & Description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 bg-[#3A3086] rounded-full flex items-center justify-center text-white font-['Syne',sans-serif] font-bold text-sm">LB</div>
              <span className="font-['Syne',sans-serif] font-bold text-xl text-[#3A3086] dark:text-white">
                Level<span className="text-[#EF4444]">Boost</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Élever le talent africain sur la scène mondiale grâce à un marketing stratégique et une narration authentique.
            </p>
          </div>

          {/* Colonne 2 : Plateforme */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Plateforme</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link to="/talents" className="hover:text-[#EF4444] transition">Vitrine des Talents</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#EF4444] transition">Services</Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-[#EF4444] transition">Tarification</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-[#EF4444] transition">Partenaires</Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Communauté */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Communauté</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link to="#" className="hover:text-[#EF4444] transition">Événements</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-[#EF4444] transition">Blog</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-[#EF4444] transition">Podcast</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-[#EF4444] transition">Carrières</Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Réseaux Sociaux */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Connecter</h4>
            <div className="flex space-x-4">
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-[#3A3086] hover:text-white transition"
              >
                <i className="material-icons text-sm">facebook</i> 
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-[#3A3086] hover:text-white transition"
              >
                <i className="material-icons text-sm">camera_alt</i>
              </a>
              <a 
                href="mailto:hello@levelboost.com" 
                className="h-10 w-10 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-[#3A3086] hover:text-white transition"
              >
                <i className="material-icons text-sm">alternate_email</i>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {currentYear} Level Boost Agency. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="hover:text-gray-900 dark:hover:text-white">Confidentialité</Link>
            <Link to="#" className="hover:text-gray-900 dark:hover:text-white">Conditions d'Utilisation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export {Footer};
export default Footer;