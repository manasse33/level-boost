import React, { useState } from 'react';
import { 
  ArrowLeft, CheckCircle, Palette, Users, Megaphone, 
  Sparkles, Globe, Rocket, GraduationCap, Newspaper,
  Mail, MessageCircle, ChevronRight, ChevronDown, Award
} from 'lucide-react';

export function ServicesPage() {
  const [openService, setOpenService] = useState(null);

  const packs = [
    {
      name: "Basique",
      price: 49,
      description: "Idéal pour démarrer votre visibilité.",
      features: [
        "Visibilité starter",
        "1 post réseau social"
      ],
      highlighted: false
    },
    {
      name: "Standard",
      price: 89,
      description: "Pour une croissance accélérée.",
      features: [
        "Croissance boostée",
        "2 posts réseaux sociaux",
        "1 story par semaine"
      ],
      highlighted: true,
      badge: "POPULAIRE"
    },
    {
      name: "Premium",
      price: 149,
      description: "Couverture complète et support.",
      features: [
        "4 posts par mois",
        "2 stories par semaine",
        "Support prioritaire"
      ],
      highlighted: false
    },
    {
      name: "Élite",
      price: 299,
      description: "Gestion totale 24/7.",
      features: [
        "Accès total",
        "Gestion complète",
        "Support dédié 24/7",
        "Reporting mensuel"
      ],
      highlighted: false,
      elite: true
    }
  ];

  const services = [
    {
      icon: <Palette className="w-5 h-5" />,
      title: "Création Visuelle & Vidéo",
      description: "Identité visuelle, logos, montages vidéo reels/tiktok, et graphisme pour vos réseaux."
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Community Management",
      description: "Animation de votre communauté, réponse aux messages, et modération."
    },
    {
      icon: <Megaphone className="w-5 h-5" />,
      title: "Publicité (Ads)",
      description: "Campagnes sponsorisées sur Meta, TikTok et Google pour maximiser votre portée."
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Storytelling & Branding",
      description: "Définition de votre voix, de votre image de marque et de votre stratégie de contenu."
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Sites Web",
      description: "Création de landing pages ou sites vitrines optimisés pour la conversion."
    }
  ];

  const additionalOptions = [
    { icon: <Rocket className="w-5 h-5" />, title: "Livraison Express (Rush)" },
    { icon: <GraduationCap className="w-5 h-5" />, title: "Session Coaching 1h" },
    { icon: <Newspaper className="w-5 h-5" />, title: "Communiqué de Presse" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-24 font-sans text-slate-900 dark:text-white">
    

      {/* Main Content Centered */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-12 pt-10">
        
        {/* Packs Section */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Nos Packs Standardisés</h2>
              <p className="hidden sm:block text-slate-500 mt-1">Des solutions clés en main pour tous les budgets.</p>
            </div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-1.5 rounded-full uppercase tracking-wider">
              Mensuel
            </span>
          </div>

          {/* Pricing Grid/Carousel */}
          <div className="overflow-x-auto pb-6 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible">
            <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 snap-x snap-mandatory sm:snap-none">
              {packs.map((pack, index) => (
                <div
                  key={index}
                  className={`snap-center shrink-0 w-[85%] sm:w-auto flex flex-col rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group ${
                    pack.highlighted
                      ? 'border-2 border-blue-600 bg-white dark:bg-slate-800 transform lg:-translate-y-2'
                      : pack.elite
                      ? 'border border-slate-200 dark:border-slate-700 bg-gradient-to-b from-slate-100 to-white dark:from-slate-800 dark:to-slate-900'
                      : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                  }`}
                >
                  {pack.highlighted && (
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg z-20">
                      {pack.badge}
                    </div>
                  )}
                  
                  {!pack.highlighted && !pack.elite && (
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                  )}

                  <div className="flex flex-col gap-2 mb-6 relative z-10">
                    <h3 className={`font-bold text-sm uppercase tracking-wider flex items-center gap-2 ${
                      pack.elite ? 'text-slate-900 dark:text-white' : 'text-blue-600 dark:text-blue-400'
                    }`}>
                      {pack.name}
                      {pack.elite && <Award className="w-4 h-4 text-yellow-500" />}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">
                        {pack.price}€
                      </span>
                      <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                        /mois
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {pack.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 mb-8 flex-1">
                    {pack.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className={`w-full h-12 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${
                      pack.highlighted
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50'
                        : pack.elite
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100'
                        : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white'
                    }`}
                  >
                    {pack.highlighted ? 'Choisir ce pack' : 'Sélectionner'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-2">
            <button className="text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline decoration-2 underline-offset-4">
              Comparer tous les packs en détail
            </button>
          </div>
        </section>

        <div className="h-px bg-slate-200 dark:bg-slate-700" />

        {/* Services Section */}
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-2 max-w-2xl">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Services à la carte
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Des besoins spécifiques ? Construisez votre stratégie sur-mesure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <details
                key={index}
                className="group rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden transition-all duration-300 open:shadow-lg open:border-blue-200 dark:open:border-blue-900"
                open={openService === index}
                onToggle={(e) => setOpenService(e.target.open ? index : null)}
              >
                <summary className="flex cursor-pointer items-center justify-between p-6 list-none select-none hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                      {service.icon}
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">
                        {service.title}
                      </span>
                      {!openService && openService !== index && (
                         <span className="text-xs text-slate-400 line-clamp-1 mt-1 font-normal md:hidden">
                           En savoir plus...
                         </span>
                      )}
                    </div>
                  </div>
                  <ChevronDown className="w-5 h-5 text-slate-400 transition-transform duration-300 group-open:rotate-180 group-open:text-blue-600" />
                </summary>
                <div className="px-6 pb-6 pt-0">
                  <p className="text-slate-600 dark:text-slate-300 pl-[64px] leading-relaxed">
                    {service.description}
                  </p>
                  {index === 0 && (
                    <div className="flex justify-end mt-4 pl-[64px]">
                      <button className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">
                        Voir les tarifs →
                      </button>
                    </div>
                  )}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Additional Options */}
        <section className="flex flex-col gap-6 pb-12">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Options Additionnelles
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {additionalOptions.map((option, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {option.icon}
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {option.title}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Sticky Footer CTA - Full Width */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4">
           <div className="hidden md:block flex-1">
             <p className="font-bold text-slate-900 dark:text-white">Une question sur nos services ?</p>
             <p className="text-sm text-slate-500">Notre équipe vous répond sous 2h.</p>
           </div>
           <div className="flex-1 md:flex-none flex items-center gap-3">
            <button className="flex-1 md:w-auto px-8 h-12 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Nous contacter
            </button>
            <button className="w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-sm hover:bg-blue-50 transition-colors">
              <MessageCircle className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default ServicesPage;