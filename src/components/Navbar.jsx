import { Link } from 'react-router-dom'; // <--- Import obligatoire
import logo from '../assets/logo-level-boost.jpg';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO : Redirige vers l'accueil */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <img className="h-12 w-auto cursor-pointer" src={logo} alt="Level Boost" />
            </Link>
          </div>

          {/* MENU : Utilisation de Link vers les pages créées */}
          <div className="hidden md:flex space-x-8 items-center">
            
            <Link to="/services" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Nos Services
            </Link>
            
            <Link to="/concours" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Concours
            </Link>
            
            <Link to="/talents" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Talents
            </Link>

            {/* CTA : Redirige vers le formulaire d'onboarding */}
            <Link 
              to="/start" 
              className="bg-secondary text-white px-6 py-2 rounded-full font-bold shadow-lg hover:bg-red-700 transition transform hover:scale-105"
            >
              Booster mon projet
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}