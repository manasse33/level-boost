// ============= NAVIGATION COMPONENTS =============
// Navbar et Footer

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Grid, Settings, LogOut, User, ShoppingCart,
  Instagram, Facebook, Twitter, Linkedin, Mail, Phone, MapPin
} from 'lucide-react';

// ============= NAVBAR =============
export const Navbar = ({ onNavigate, currentPage, user, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
    <nav className={`fixed w-full z-40 transition-all duration-300 ${
      isTransparent ? 'bg-transparent' : 'bg-white shadow-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button onClick={() => onNavigate('/')} className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
              LB
            </div>
            <span className={`text-xl font-bold hidden sm:block ${
              isTransparent ? 'text-white' : 'text-slate-900'
            }`}>
              Level Boost
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map(item => (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`font-medium transition ${
                  currentPage === item.path
                    ? 'text-indigo-600'
                    : isTransparent
                    ? 'text-white hover:text-indigo-300'
                    : 'text-slate-600 hover:text-indigo-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {user ? (
              <>
                <button
                  onClick={() => onNavigate('/dashboard')}
                  className={`flex items-center font-medium ${
                    isTransparent ? 'text-white' : 'text-slate-600'
                  } hover:text-indigo-600`}
                >
                  <Grid className="w-4 h-4 mr-1" /> Dashboard
                </button>
                
                <div className="relative group">
                  <button className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                    isTransparent ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-900'
                  }`}>
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">{user.name}</span>
                  </button>
                  
                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <button
                      onClick={() => onNavigate('/dashboard/settings')}
                      className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center text-slate-700 rounded-t-lg"
                    >
                      <Settings className="w-4 h-4 mr-2" /> Paramètres
                    </button>
                    <button
                      onClick={onLogout}
                      className="w-full text-left px-4 py-3 hover:bg-red-50 flex items-center text-red-600 rounded-b-lg"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Déconnexion
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('/login')}
                  className={`font-medium ${
                    isTransparent ? 'text-white' : 'text-slate-600'
                  } hover:text-indigo-600`}
                >
                  Connexion
                </button>
                <button
                  onClick={() => onNavigate('/register')}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
                >
                  S'inscrire
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden"
          >
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
                <button
                  key={item.path}
                  onClick={() => {
                    onNavigate(item.path);
                    setMobileOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg ${
                    currentPage === item.path
                      ? 'bg-indigo-50 text-indigo-600 font-medium'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {user ? (
                <>
                  <button
                    onClick={() => {
                      onNavigate('/dashboard');
                      setMobileOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700"
                  >
                    <Grid className="w-4 h-4 inline mr-2" /> Dashboard
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('/dashboard/settings');
                      setMobileOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700"
                  >
                    <Settings className="w-4 h-4 inline mr-2" /> Paramètres
                  </button>
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-3 py-2 text-red-600 rounded-lg hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 inline mr-2" /> Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      onNavigate('/login');
                      setMobileOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700"
                  >
                    Connexion
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('/register');
                      setMobileOpen(false);
                    }}
                    className="w-full bg-indigo-600 text-white px-3 py-2 rounded-lg font-medium"
                  >
                    S'inscrire
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};



// ============= DASHBOARD SIDEBAR =============
export const DashboardSidebar = ({ currentPage, onNavigate, user }) => {
  const menuItems = [
    { path: '/dashboard', label: 'Vue d\'ensemble', icon: Grid },
    { path: '/dashboard/profiles', label: 'Mes Profils', icon: User },
    { path: '/dashboard/orders', label: 'Mes Commandes', icon: ShoppingCart },
    { path: '/dashboard/subscriptions', label: 'Abonnements', icon: ShoppingCart },
    { path: '/dashboard/settings', label: 'Paramètres', icon: Settings },
  ];

  const adminItems = [
    { path: '/admin', label: 'Admin Dashboard', icon: Grid },
    { path: '/admin/orders', label: 'Toutes Commandes', icon: ShoppingCart },
    { path: '/admin/leads', label: 'Leads', icon: User },
  ];

  const isAdmin = user?.role === 'admin';

  return (
    <div className="w-64 bg-white border-r border-slate-200 min-h-screen p-6">
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <p className="font-bold text-slate-900">{user?.name}</p>
            <p className="text-xs text-slate-500">{user?.email}</p>
          </div>
        </div>
      </div>

      <nav className="space-y-1">
        {menuItems.map(item => (
          <button
            key={item.path}
            onClick={() => onNavigate(item.path)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              currentPage === item.path
                ? 'bg-indigo-50 text-indigo-600 font-medium'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}

        {isAdmin && (
          <>
            <div className="my-4 border-t border-slate-200 pt-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-4">
                Administration
              </p>
            </div>
            {adminItems.map(item => (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                  currentPage === item.path
                    ? 'bg-indigo-50 text-indigo-600 font-medium'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </>
        )}
      </nav>
    </div>
  );
};