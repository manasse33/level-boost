import React, { useState } from 'react';
import { Rocket, Fingerprint, TrendingUp, LockOpen, ArrowRight, Menu } from 'lucide-react';

export function HomePage() {
  const values = [
    {
      icon: <Fingerprint className="w-6 h-6" />,
      title: "Authenticité",
      description: "Restez vous-même, nous amplifions votre voix unique sans la déformer.",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Performance",
      description: "Des outils concrets et des analyses data pour des résultats réels.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop"
    },
    {
      icon: <LockOpen className="w-6 h-6" />,
      title: "Accessibilité",
      description: "Une visibilité professionnelle enfin à la portée de tous les talents.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-white">
      
      {/* Header Full Width */}
     

      <main>
        {/* Hero Section Full Width */}
        <section className="relative w-full h-[600px] lg:h-[700px] overflow-hidden bg-slate-900">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600&h=900&fit=crop')`,
            }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent sm:bg-gradient-to-r sm:from-slate-900 sm:via-slate-900/80 sm:to-transparent"></div>
          </div>

          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center sm:justify-center items-start pt-20 pb-12">
            <div className="max-w-2xl space-y-6">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600 text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg shadow-blue-600/20">
                Média & Agence
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight">
                Révélez votre potentiel.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                  Boostez votre visibilité.
                </span>
              </h2>
              <p className="text-lg text-slate-300 max-w-lg leading-relaxed">
                La première plateforme hybride dédiée aux talents émergents. Nous combinons la puissance d'un média avec l'expertise d'une agence.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2">
                  Commencer maintenant <ArrowRight className="w-5 h-5" />
                </button>
                <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold transition-all border border-white/10">
                  En savoir plus
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section (Grid Layout) */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Pourquoi choisir Level Boost ?
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Une approche centrée sur l'humain et propulsée par la technologie.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div 
                  className="h-48 w-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center relative overflow-hidden"
                  style={{ backgroundImage: `url(${value.image})` }}
                >
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-all duration-500" />
                </div>
                <div className="p-8">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                    {value.icon}
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {value.title}
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Social Proof & CTA */}
        <section className="bg-slate-50 dark:bg-slate-800/50 py-20 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="flex justify-center -space-x-4 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-14 h-14 rounded-full border-4 border-slate-50 dark:border-slate-800 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Member" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-14 h-14 rounded-full border-4 border-slate-50 dark:border-slate-800 bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                +2k
              </div>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Rejoignez la nouvelle vague de créateurs
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-10 text-lg max-w-2xl mx-auto">
              Ne laissez plus votre talent dans l'ombre. Notre communauté grandit chaque jour.
            </p>
            
            <button className="px-10 py-5 bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-bold rounded-full hover:scale-105 transition-transform shadow-xl flex items-center gap-3 mx-auto">
              Faites passer votre talent au niveau supérieur
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;