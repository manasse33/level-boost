import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, Play, Users, TrendingUp, Globe, Shield, Zap,
  Star, CheckCircle, Music, Mic2, BarChart3, ArrowUpRight,Sparkles
} from 'lucide-react';

// ============= HOME PAGE (LIGHT VERSION) =============
export const HomePage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 font-sans overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 lg:px-12 max-w-[1600px] mx-auto">
        
        {/* Background Gradients Ambient (Subtil en Light Mode) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-200/40 rounded-full blur-[120px] -z-10 mix-blend-multiply" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-[100px] -z-10 mix-blend-multiply" />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT CONTENT */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 shadow-sm text-sm font-medium text-indigo-600 mb-8">
              {/* <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
              </span> */}
             
            </div>

            <h1 className="text-6xl xl:text-8xl font-black tracking-tight mb-8 leading-[0.95] text-slate-900">
              Révélez votre <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                Vrai Potentiel
              </span>
            </h1>
            
            <p className="text-lg text-slate-500 mb-10 max-w-lg leading-relaxed font-medium">
              Ne soyez pas juste un talent, devenez une marque. Nous transformons les artistes en empires grâce à la data et une production premium.
            </p>

            <div className="flex flex-wrap gap-4 w-full">
              <button 
                onClick={() => onNavigate('/register')} 
                className="group relative px-8 py-4 bg-slate-900 text-white font-bold rounded-full text-lg hover:bg-slate-800 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-slate-900/20"
              >
                Démarrer maintenant
                <div className="bg-white text-black p-1 rounded-full group-hover:rotate-45 transition-transform duration-300">
                  <ArrowRight size={16} />
                </div>
              </button>
              
              <button 
                onClick={() => onNavigate('/services')} 
                className="px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-full text-lg hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
              >
                Voir les services
              </button>
            </div>

            {/* Mini Social Proof */}
            <div className="mt-12 flex items-center gap-4 text-sm text-slate-500 font-medium">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 shadow-md overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${10+i}`} alt="user" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p>Rejoint par <span className="text-slate-900 font-bold">500+ Talents</span></p>
            </div>
          </motion.div>

          {/* RIGHT VISUAL - Style Composition Dribbble */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block h-[700px] w-full"
          >
            {/* Main Image with rounded corners & shadow */}
            <div className="absolute inset-0 bg-white rounded-[3rem] overflow-hidden border border-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] p-2">
               <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=2070&auto=format&fit=crop" 
                    alt="Artist in studio" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle gradient overlay for text readability if needed */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
               </div>
            </div>

            {/* Floating Card 1: Stats */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute top-12 -left-12 bg-white/90 backdrop-blur-xl border border-white/50 p-5 rounded-3xl w-64 shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)]"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="p-2 bg-indigo-50 rounded-full text-indigo-600">
                  <BarChart3 size={20} />
                </div>
                <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  +24.5% <ArrowUpRight size={14} />
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Croissance mensuelle</p>
                <p className="text-2xl font-bold text-slate-900">1.2M Vues</p>
              </div>
            </motion.div>

            {/* Floating Card 2: Player */}
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-12 -right-6 bg-white p-5 rounded-[2rem] w-72 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] border border-slate-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-500/30">
                  <Play size={20} fill="currentColor" />
                </div>
                <div>
                  <p className="font-bold text-lg leading-tight text-slate-900">New Release</p>
                  <p className="text-slate-500 text-sm">Dispo sur Spotify</p>
                </div>
                <div className="ml-auto">
                  <Music size={20} className="text-indigo-400" />
                </div>
              </div>
              {/* Fake waveform */}
              <div className="mt-4 flex items-end justify-between h-8 gap-1">
                {[40, 70, 30, 80, 50, 90, 40, 60, 30, 50].map((h, i) => (
                   <div key={i} className="w-1.5 bg-indigo-100 rounded-full" style={{ height: `${h}%` }} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE SECTION */}
      <section className="py-10 border-y border-slate-100 bg-white">
        <div className="max-w-[100vw] flex whitespace-nowrap overflow-hidden relative">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="flex gap-20 items-center opacity-40 px-10 grayscale hover:grayscale-0 transition-all duration-500"
          >
             {/* Duplicate array for seamless loop */}
             {[...Array(2)].map((_, idx) => (
                <React.Fragment key={idx}>
                  <span className="text-3xl font-serif font-bold text-black">VOGUE</span>
                  <span className="text-3xl font-black italic tracking-tighter text-black">Spotify</span>
                  <span className="text-3xl font-bold tracking-widest text-black">UNIVERSAL</span>
                  <span className="text-3xl font-mono font-bold text-black">SONY MUSIC</span>
                  <span className="text-3xl font-black text-black">YOUTUBE</span>
                  <span className="text-3xl font-serif italic text-black">Complex</span>
                </React.Fragment>
             ))}
          </motion.div>
        </div>
      </section>

      {/* SERVICES - Bento Grid Style */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-indigo-600 font-bold tracking-widest uppercase text-sm mb-4 bg-indigo-50 inline-block px-4 py-1 rounded-full">
            Notre Expertise
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            L'Arsenal complet pour percer.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 - Large spanning 2 cols */}
          <div className="md:col-span-2 p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group relative overflow-hidden">
            {/* Background Blob */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/50 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg shadow-indigo-500/20">
                <Play size={28} fill="currentColor" />
              </div>
              <h4 className="text-3xl font-bold mb-4 text-slate-900">Production Studio 360°</h4>
              <p className="text-slate-500 text-lg max-w-md">
                De la direction artistique au montage final. Clips 4K, shootings éditoriaux et création de contenu viral pour TikTok/Reels.
              </p>
            </div>
          </div>

          {/* Card 2 - Vertical */}
          <div className="md:col-span-1 p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600">
                <Globe size={24} />
              </div>
              <h4 className="text-2xl font-bold mb-2 text-slate-900">Marketing Digital</h4>
              <p className="text-slate-500 text-sm">Campagnes Ads ciblées et stratégies de fan-base.</p>
            </div>
            <div className="mt-8 flex justify-end">
               <ArrowUpRight className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
            </div>
          </div>

          {/* Card 3 - Vertical */}
          <div className="md:col-span-1 p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group">
             <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 text-orange-600">
                <Mic2 size={24} />
              </div>
              <h4 className="text-2xl font-bold mb-2 text-slate-900">Business Dev</h4>
              <p className="text-slate-500 text-sm">Négociation label, booking et recherche de sponsors.</p>
          </div>

          {/* Card 4 - Large spanning 2 cols */}
          <div className="md:col-span-2 p-10 rounded-[2.5rem] bg-gradient-to-br from-purple-50 to-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group relative overflow-hidden flex items-center">
             <div className="flex-1 relative z-10">
                <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg shadow-purple-500/20">
                  <Shield size={28} />
                </div>
                <h4 className="text-3xl font-bold mb-4 text-slate-900">Management & Juridique</h4>
                <p className="text-slate-500 text-lg">
                  Protection de vos droits, gestion des contrats et distribution. Dormez tranquille, on gère le business.
                </p>
             </div>
             {/* Decorative graphic */}
             <div className="hidden md:block w-32 h-32 bg-white rounded-full border border-purple-100 p-4 shadow-sm">
                <div className="w-full h-full rounded-full border border-purple-200 flex items-center justify-center">
                   <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping" />
                </div>
             </div>
          </div>
        </div>
      </section>

   <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto relative">
        
        {/* Container Principal */}
        <div className="relative bg-[#0F172A] rounded-[3rem] p-12 md:p-20 overflow-hidden text-center shadow-2xl shadow-slate-900/20 border border-slate-800">
          
          {/* FOND TECHNIQUE & LUMIÈRES */}
          {/* 1. Grille subtile en fond */}
          <div className="absolute inset-0 opacity-20" 
               style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
          </div>
          
          {/* 2. Glow Central */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
          
          {/* 3. Lumière supérieure (Glass effect) */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* CONTENU */}
          <div className="relative z-10 flex flex-col items-center">
            
            {/* Badge Premium */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-semibold mb-8 backdrop-blur-sm"
            >
              <Sparkles size={14} className="text-indigo-400" />
              <span>Places limitées pour la session de Décembre</span>
            </motion.div>

            {/* Titre Impactant */}
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              Prêt à construire votre <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">
                Empire Médiatique ?
              </span>
            </h2>

            {/* Paragraphe */}
            <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Ne laissez pas votre talent au hasard. Bénéficiez d'une stratégie data-driven et d'une équipe dédiée pour propulser votre carrière.
            </p>

            {/* Zone d'Action & Preuve Sociale */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              
              {/* Bouton Principal */}
              <button 
                onClick={() => onNavigate('/register')} 
                className="group relative px-10 py-5 bg-white text-slate-900 font-bold rounded-full text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] flex items-center gap-3"
              >
                Candidater maintenant
                <div className="bg-slate-900 text-white rounded-full p-1 group-hover:rotate-45 transition-transform duration-300">
                  <ArrowRight size={16} />
                </div>
              </button>

              {/* Bloc Trust (Avatars + Avis) */}
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0F172A] bg-slate-700 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${20 + i}`} alt="Talent" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-[#0F172A] bg-indigo-600 flex items-center justify-center text-xs text-white font-bold">
                    +500
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <span className="font-medium text-white">4.9/5</span> de satisfaction
                </div>
              </div>
            </div>

            {/* Arguments "Rassurants" en bas */}
            <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-500" />
                <span>Audit gratuit inclus</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-500" />
                <span>Sans engagement</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-500" />
                <span>Réponse sous 48h</span>
              </div>
            </div>

          </div>

          {/* Éléments Flottants Décoratifs (Optionnel - pour le style "App") */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-[10%] hidden lg:block p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 rotate-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                <span className="font-bold">€</span>
              </div>
              <div>
                <div className="text-xs text-slate-300">Revenus Stream</div>
                <div className="text-white font-bold">+ 12,450 €</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 left-[10%] hidden lg:block p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 -rotate-6"
          >
             <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                <span className="font-bold">♫</span>
              </div>
              <div>
                <div className="text-xs text-slate-300">Nouveau Contrat</div>
                <div className="text-white font-bold">Signé !</div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>

      {/* FOOTER SIMPLE */}
      <footer className="py-12 text-center text-slate-400 text-sm border-t border-slate-200 mt-20">
        <p>&copy; 2024 Talent Empire. Tous droits réservés.</p>
      </footer>
    </div>
  );
};