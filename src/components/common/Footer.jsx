// ============= NAVIGATION COMPONENTS =============
// Navbar et Footer

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Grid, Settings, LogOut, User, ShoppingCart,
  Instagram, Facebook, Twitter, Linkedin, Mail, Phone, MapPin
} from 'lucide-react';

export const Footer = ({ onNavigate }) => {
  const footerSections = {
    navigation: [
      { label: 'Accueil', path: '/' },
      { label: 'Services', path: '/services' },
      { label: 'Talents', path: '/talents' },
      { label: 'Concours', path: '/contests' },
      { label: 'Tarifs', path: '/pricing' },
    ],
    legal: [
      { label: 'Mentions Légales', path: '/legal' },
      { label: 'Confidentialité', path: '/privacy' },
      { label: 'CGV', path: '/terms' },
      { label: 'Cookies', path: '/cookies' },
    ],
    company: [
      { label: 'À propos', path: '/about' },
      { label: 'Blog', path: '/blog' },
      { label: 'Carrières', path: '/careers' },
      { label: 'Contact', path: '/contact' },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold mr-2">
                LB
              </div>
              <span className="text-xl font-bold text-white">Level Boost</span>
            </div>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              L'agence digitale nouvelle génération pour les talents ambitieux.
              Brazzaville, Congo.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold mb-6">Navigation</h4>
            <ul className="space-y-3 text-sm">
              {footerSections.navigation.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(item.path)}
                    className="hover:text-indigo-400 transition"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold mb-6">Entreprise</h4>
            <ul className="space-y-3 text-sm">
              {footerSections.company.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(item.path)}
                    className="hover:text-indigo-400 transition"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <p className="text-xs text-slate-400 mb-4">
              Recevez nos conseils marketing chaque semaine.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Email..."
                className="flex-1 bg-slate-800 border-none text-white text-sm rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold text-sm transition">
                OK
              </button>
            </div>

            {/* Contact Info */}
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center text-slate-400">
                <Mail className="w-4 h-4 mr-2" />
                contact@levelboost.cg
              </div>
              <div className="flex items-center text-slate-400">
                <Phone className="w-4 h-4 mr-2" />
                +242 06 XXX XX XX
              </div>
              <div className="flex items-center text-slate-400">
                <MapPin className="w-4 h-4 mr-2" />
                Brazzaville, Congo
              </div>
            </div>
          </div>
        </div>

        {/* Legal Section */}
        <div className="border-t border-slate-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Level Boost Agency. Tous droits réservés.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              {footerSections.legal.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => onNavigate(item.path)}
                  className="text-slate-400 hover:text-indigo-400 transition"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};