import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4 }
};

export default function Home() {
  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-slate-900">
        {/* Background Image avec Overlay */}
        <div className="absolute inset-0 z-0">
             <img 
               src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop" 
               className="w-full h-full object-cover opacity-40" 
               alt="Studio vibe"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center md:text-left pt-20">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-sm font-bold mb-6">
                    🚀 Plateforme de Visibilité Hybride
                </span>
                <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
                    Révélez votre <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Potentiel.</span>
                </h1>
                <p className="text-lg text-slate-300 max-w-xl mb-8 leading-relaxed">
                    Level Boost accompagne les artistes et entrepreneurs. De la création de contenu à la stratégie d'acquisition, transformez votre talent en empire.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/pricing" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center transition-all shadow-lg shadow-indigo-500/25">
                        Voir les Packs <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                    <Link to="/challenges" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold flex items-center justify-center transition-all">
                        Concours en cours
                    </Link>
                </div>
            </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <div className="bg-white py-10 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Ils nous font confiance</p>
              <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
                  {/* Logos fictifs */}
                  <div className="text-2xl font-black text-slate-800">TRACE</div>
                  <div className="text-2xl font-bold text-slate-800 font-serif">VOGUE</div>
                  <div className="text-2xl font-bold text-slate-800 italic">Spotify</div>
              </div>
          </div>
      </div>

      {/* Value Proposition Section */}
      <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
              <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">Plus qu'une agence,<br/>un accélérateur de carrière.</h2>
                  <p className="text-slate-600 mb-8 leading-relaxed">
                      Contrairement aux agences classiques, nous ne vendons pas que des "likes". Nous construisons une stratégie durable basée sur la data et la conversion[cite: 3, 31].
                  </p>
                  <ul className="space-y-4">
                      {['Studio de production intégré', 'Réseau de partenaires & labels', 'Campagnes Ads Data-driven'].map((item, i) => (
                          <li key={i} className="flex items-center text-slate-700 font-medium">
                              <CheckCircle className="w-5 h-5 text-indigo-600 mr-3" /> {item}
                          </li>
                      ))}
                  </ul>
              </div>
              <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-20 blur-lg"></div>
                  <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80" alt="Artist working" className="relative rounded-2xl shadow-2xl" />
              </div>
          </div>
      </section>

    </motion.div>
  );
}