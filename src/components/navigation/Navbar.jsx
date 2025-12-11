// Navbar.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu, X, Grid, Settings, LogOut, User
} from 'lucide-react';

export const Navbar = ({ currentPage, user, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Accueil' },
    { path: '/services', label: 'Services' },
    { path: '/talents', label: 'Talents' },
    { path: '/contests', label: 'Concours' },
    { path: '/pricing', label: 'Tarifs' },
  ];

  const isTransparent = !scrolled && currentPage === '/';

  return (
    <nav className={`fixed w-full z-40 transition-all duration-300 ${isTransparent ? 'bg-transparent' : 'bg-white shadow-md'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
              LB
            </div>
            <span className={`text-xl font-bold hidden sm:block ${isTransparent ? 'text-white' : 'text-slate-900'}`}>
              Level Boost
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition ${
                  currentPage === item.path
                    ? 'text-indigo-600'
                    : isTransparent
                    ? 'text-white hover:text-indigo-300'
                    : 'text-slate-600 hover:text-indigo-600'
                }`}
              >
                {item.label}
              </Link>
            ))}

            {user ? (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className={`flex items-center font-medium ${isTransparent ? 'text-white' : 'text-slate-600'} hover:text-indigo-600`}
                >
                  <Grid className="w-4 h-4 mr-1" /> Dashboard
                </button>

                {/* Dropdown utilisateur */}
                <div className="relative group">
                  <button className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${isTransparent ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-900'}`}>
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">{user.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <button
                      onClick={() => navigate('/dashboard/settings')}
                      className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center text-slate-700 rounded-t-lg"
                    >
                      <Settings className="w-4 h-4 mr-2" /> Paramètres
                    </button>
                    <button
                      onClick={() => { onLogout(); navigate('/'); }}
                      className="w-full text-left px-4 py-3 hover:bg-red-50 flex items-center text-red-600 rounded-b-lg"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Déconnexion
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`font-medium ${isTransparent ? 'text-white' : 'text-slate-600'} hover:text-indigo-600`}
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden">
            {mobileOpen ? (
              <X className={isTransparent ? 'text-white' : 'text-slate-900'} />
            ) : (
              <Menu className={isTransparent ? 'text-white' : 'text-slate-900'} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block w-full px-3 py-2 rounded-lg ${
                    currentPage === item.path
                      ? 'bg-indigo-50 text-indigo-600 font-medium'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {user ? (
                <>
                  <Link to="/dashboard" className="block w-full px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700" onClick={() => setMobileOpen(false)}>
                    <Grid className="w-4 h-4 inline mr-2" /> Dashboard
                  </Link>
                  <Link to="/dashboard/settings" className="block w-full px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700" onClick={() => setMobileOpen(false)}>
                    <Settings className="w-4 h-4 inline mr-2" /> Paramètres
                  </Link>
                  <button onClick={() => { onLogout(); navigate('/'); setMobileOpen(false); }} className="block w-full px-3 py-2 text-red-600 rounded-lg hover:bg-red-50">
                    <LogOut className="w-4 h-4 inline mr-2" /> Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block w-full px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700" onClick={() => setMobileOpen(false)}>
                    Connexion
                  </Link>
                  <Link to="/register" className="block w-full bg-indigo-600 text-white px-3 py-2 rounded-lg font-medium" onClick={() => setMobileOpen(false)}>
                    S'inscrire
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
