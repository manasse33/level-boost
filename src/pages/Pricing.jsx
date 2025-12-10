import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Star } from 'lucide-react';
import { PACKS } from '../data/content';

export default function Pricing() {
  return (
    <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="py-24 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Des tarifs transparents</h2>
            <p className="text-lg text-slate-600">
                Choisissez le niveau d'accompagnement adapté à votre stade de développement. 
                De l'émergence à la domination du marché [cite: 44-45].
            </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKS.map((pack) => (
                <div key={pack.id} className={`relative flex flex-col p-6 rounded-2xl bg-white transition-all duration-300 hover:-translate-y-2 ${pack.isPopular ? 'border-2 border-indigo-600 shadow-xl z-10' : 'border border-slate-200 shadow-sm hover:shadow-lg'}`}>
                    
                    {pack.isPopular && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-3 py-1 text-xs font-bold uppercase rounded-full tracking-wider">
                            Recommandé
                        </div>
                    )}

                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-slate-900">{pack.name}</h3>
                        <p className="text-slate-500 text-xs mt-1 min-h-[40px]">{pack.description}</p>
                    </div>

                    <div className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
                        {pack.price}
                    </div>

                    <ul className="space-y-3 mb-8 flex-grow">
                        {pack.features.map((feat, i) => (
                            <li key={i} className="flex items-start text-sm text-slate-600">
                                <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                                {feat}
                            </li>
                        ))}
                    </ul>

                    <Link 
                        to={`/onboarding?plan=${pack.id}`}
                        className={`w-full py-3 rounded-lg text-sm font-bold text-center transition-all ${
                            pack.buttonVariant === 'primary' 
                                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/30' 
                                : pack.buttonVariant === 'dark'
                                ? 'bg-slate-900 text-white hover:bg-slate-800'
                                : 'bg-slate-50 text-slate-900 border border-slate-200 hover:bg-slate-100'
                        }`}
                    >
                        Choisir ce pack
                    </Link>
                </div>
            ))}
        </div>

        {/* Section Sur-mesure / Services à la carte */}
        <div className="mt-20 p-8 bg-slate-900 rounded-2xl text-white flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
                <h3 className="text-2xl font-bold mb-2">Besoin de services à la carte ?</h3>
                <p className="text-slate-400">Production vidéo seule, Shooting photo ou Audit stratégique [cite: 92-103].</p>
            </div>
            <Link to="/services" className="px-6 py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-indigo-50 transition">
                Voir le catalogue complet
            </Link>
        </div>
      </div>
    </motion.div>
  );
}