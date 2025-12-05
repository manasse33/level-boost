import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Assure-toi d'avoir créé Navbar.jsx comme vu précédemment

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-slate-50">
        <Outlet /> 
        {/* Outlet = Là où le contenu des pages s'affiche */}
      </main>
      
      <footer className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
            <div>
                <h3 className="text-2xl font-display font-bold mb-4">Level Boost</h3>
                <p className="text-gray-400">Plateforme hybride de visibilité.</p>
            </div>
            <div>
                <h4 className="font-bold mb-4">Liens rapides</h4>
                <ul className="space-y-2 text-gray-400">
                    <li><a href="/services" className="hover:text-secondary">Services</a></li>
                    <li><a href="/concours" className="hover:text-secondary">Concours</a></li>
                    <li><a href="/talents" className="hover:text-secondary">Talents</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-4">Contact</h4>
                <p className="text-gray-400">contact@levelboost.com</p>
                <p className="text-gray-400">+242 06 ...</p>
            </div>
        </div>
        <div className="text-center text-gray-600 mt-12 text-sm">
            © 2025 Level Boost. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}