import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Remplacez par votre vrai logo
const Logo = () => (
  <div className="flex items-center gap-2 font-bold text-xl tracking-tighter text-slate-900">
    <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white">LB</div>
    LEVEL BOOST
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Accueil', path: '/' },
    { name: 'Expertise', path: '/services' },
    { name: 'Challenges', path: '/challenges' },
    { name: 'Talents', path: '/talents' },
    { name: 'Tarifs', path: '/pricing' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="z-50"><Logo /></Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`text-sm font-medium hover:text-indigo-600 transition-colors ${location.pathname === link.path ? 'text-indigo-600 font-bold' : 'text-slate-600'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/onboarding" className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/20">
            Démarrer
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden z-50 p-2 text-slate-800">
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8"
            >
              {links.map(link => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-bold text-slate-800"
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/onboarding" onClick={() => setIsOpen(false)} className="bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-bold">
                Lancer mon projet
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

const Footer = () => (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center md:text-left grid md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
                <Logo />
                <p className="mt-4 text-sm">Votre partenaire visibilité. De l'ombre à la lumière.</p>
            </div>
            {/* ... Ajouter les colonnes du footer ici ... */}
        </div>
    </footer>
);

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}