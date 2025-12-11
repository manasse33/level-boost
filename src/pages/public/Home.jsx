import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Play, Users, TrendingUp, Globe, Shield, Zap,
  Star, Check, Eye, Music, Award, AlertCircle, CheckCircle
} from 'lucide-react';
import { 
  Button, Reveal, Input, Card, Badge, PackageCard, 
  TalentCard, ContestCard, Modal, Toast 
} from '../../components';

// ============= HOME PAGE =============
export const HomePage = ({ onNavigate }) => {
  return (
    <div className="pt-16">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900" />
        <div 
          className="absolute inset-0 opacity-10" 
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} 
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Révélez votre <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Potentiel
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Transformez votre talent en empire. Stratégies data-driven et production premium 
              pour artistes et entrepreneurs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => onNavigate('/register')} 
                variant="primary" 
                size="lg"
                icon={ArrowRight}
              >
                Démarrer Gratuitement
              </Button>
              <Button 
                onClick={() => onNavigate('/services')} 
                variant="outline" 
                size="lg"
                className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20"
              >
                Découvrir nos Services
              </Button>
            </div>
          </motion.div>

          {/* STATS */}
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { value: '500+', label: 'Talents accompagnés' },
              { value: '12M', label: 'Vues cumulées' },
              { value: '98%', label: 'Satisfaction client' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-white border-b border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-sm text-slate-500 mb-8 uppercase tracking-wide font-bold">
            Ils nous font confiance
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-60">
            <span className="text-2xl font-bold font-serif">VOGUE</span>
            <span className="text-2xl font-black italic">Spotify</span>
            <span className="text-2xl font-bold">Universal Music</span>
            <span className="text-2xl font-semibold tracking-widest">TRACE</span>
            <span className="text-2xl font-bold font-mono">CANAL+</span>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-indigo-600 font-bold tracking-wide uppercase text-sm mb-3">
              Notre Expertise
            </h2>
            <h3 className="text-4xl font-bold text-slate-900 mb-6">
              Des solutions 360° pour votre croissance
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Nous combinons créativité artistique et rigueur marketing pour vous propulser
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Play, 
                title: "Production Studio", 
                desc: "Clips 4K, shootings photo, podcasts et snack content optimisé pour les réseaux sociaux.",
                color: "indigo"
              },
              { 
                icon: Globe, 
                title: "Marketing Digital", 
                desc: "Stratégies SEO/SEA, gestion de communauté et campagnes publicitaires ciblées.",
                color: "emerald"
              },
              { 
                icon: TrendingUp, 
                title: "Business Development", 
                desc: "Mise en relation avec des labels, recherche de sponsors et gestion de carrière.",
                color: "orange"
              },
              { 
                icon: Users, 
                title: "Coaching d'Image", 
                desc: "Media training, stylisme et définition de votre identité de marque unique.",
                color: "purple"
              },
              { 
                icon: Shield, 
                title: "Gestion Juridique", 
                desc: "Protection des droits d'auteur, contrats et distribution digitale sécurisée.",
                color: "red"
              },
              { 
                icon: Zap, 
                title: "Audit de Performance", 
                desc: "Analyse approfondie de vos métriques actuelles et plan d'action correctif.",
                color: "blue"
              }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card hover className="group">
                  <div className={`w-14 h-14 bg-${item.color}-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition`}>
                    <item.icon className={`w-7 h-7 text-${item.color}-600`} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à passer au niveau supérieur ?
          </h2>
          <p className="text-xl text-indigo-100 mb-10">
            Rejoignez plus de 500 talents qui ont déjà fait le choix de l'excellence
          </p>
          <Button 
            onClick={() => onNavigate('/register')} 
            variant="secondary" 
            size="lg"
            className="bg-white text-indigo-600 hover:bg-slate-100"
          >
            Commencer Maintenant
          </Button>
        </div>
      </section>
    </div>
  );
};







