import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Video, Camera, Mic, 
  TrendingUp, Search, Users, 
  Briefcase, Award, Calendar, 
  ArrowRight, CheckCircle2, Sparkles 
} from 'lucide-react';

// ============= SERVICES PAGE (PREMIUM LIGHT) =============
export const ServicesPage = ({ onNavigate }) => {
  
  // Enrichissement des données pour le design
  const servicesData = [
    {
      id: "production",
      title: "Production Studio",
      subtitle: "Créez une image digne des majors.",
      description: "Des équipements cinéma RED/Arri et une équipe de post-production primée.",
      color: "indigo",
      icon: Video,
      items: [
        { 
          name: "Clip Vidéo 4K", 
          price: "150 000", 
          currency: "FCFA",
          duration: "2-3 jours de tournage",
          icon: Video,
          features: ["Scénarisation incluse", "Montage dynamique", "Color grading cinéma"],
          popular: true
        },
        { 
          name: "Shooting Photo Pro", 
          price: "75 000", 
          currency: "FCFA",
          duration: "1 jour",
          icon: Camera,
          features: ["Studio ou extérieur", "Retouches haute-déf", "3 tenues incluses"],
          popular: false
        },
        { 
          name: "Podcast / Interview", 
          price: "50 000", 
          currency: "FCFA",
          duration: "1/2 journée",
          icon: Mic,
          features: ["Captation multi-cam", "Prise de son studio", "Mixage audio inclus"],
          popular: false
        },
      ]
    },
    {
      id: "marketing",
      title: "Marketing Digital",
      subtitle: "Faites exploser vos streams.",
      description: "Stratégies d'acquisition de fans basées sur la data et les tendances actuelles.",
      color: "emerald",
      icon: TrendingUp,
      items: [
        { 
          name: "Campagne Social Media", 
          price: "200 000", 
          currency: "FCFA",
          duration: "1 mois",
          icon: Users,
          features: ["Stratégie TikTok/Reels", "Création de visuels", "Rapport hebdomadaire"],
          popular: true
        },
        { 
          name: "SEO / Visibilité", 
          price: "150 000", 
          currency: "FCFA",
          duration: "1 mois",
          icon: Search,
          features: ["Optimisation Spotify", "Référencement Google", "Bio & Press Kit"],
          popular: false
        },
        { 
          name: "Community Management", 
          price: "100 000", 
          currency: "FCFA",
          duration: "Mensuel",
          icon: Sparkles,
          features: ["Animation de communauté", "Réponse aux DM", "Planning éditorial"],
          popular: false
        },
      ]
    },
    {
      id: "business",
      title: "Business & Strategy",
      subtitle: "Gérez votre carrière.",
      description: "Ne soyez plus seul face à l'industrie. Conseil juridique et opportunités.",
      color: "purple",
      icon: Briefcase,
      items: [
        { 
          name: "Gestion de Carrière", 
          price: "300 000", 
          currency: "FCFA",
          duration: "Mensuel",
          icon: Briefcase,
          features: ["Négociation contrats", "Recherche labels", "Protection droits"],
          popular: true
        },
        { 
          name: "Consulting Stratégique", 
          price: "150 000", 
          currency: "FCFA",
          duration: "Par session",
          icon: TrendingUp,
          features: ["Audit de projet", "Plan de lancement", "Budgetisation"],
          popular: false
        },
        { 
          name: "Booking & Events", 
          price: "Sur devis", 
          currency: "",
          duration: "Variable",
          icon: Calendar,
          features: ["Recherche de dates", "Logistique tournée", "Partenariats marques"],
          popular: false
        },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 pb-20">
      
      {/* HEADER SECTION */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-[100px] -z-10 mix-blend-multiply" />
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white border border-slate-200 text-indigo-600 font-bold text-sm mb-6 shadow-sm">
              Nos Prestations
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
              Investissez dans <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Votre Succès
              </span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
              Une grille tarifaire transparente pour des services haut de gamme. 
              Choisissez l'excellence pour chaque étape de votre projet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SERVICES LIST */}
      <div className="max-w-7xl mx-auto px-6 space-y-24">
        
        {servicesData.map((category, idx) => (
          <section key={category.id} className="relative">
            {/* Category Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
              <div>
                <div className={`inline-flex items-center gap-2 mb-3 text-${category.color}-600 font-bold uppercase tracking-wider text-sm`}>
                  <category.icon size={18} />
                  {category.title}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                  {category.subtitle}
                </h2>
                <p className="text-slate-500 mt-2 max-w-lg text-lg">
                  {category.description}
                </p>
              </div>
              <div className="hidden md:block h-px flex-1 bg-slate-200 mx-8 mb-4" />
            </div>

            {/* Cards Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {category.items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Popular Badge */}
                  {item.popular && (
                    <div className="absolute top-6 right-6 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-slate-900/20">
                      <Sparkles size={10} /> Populaire
                    </div>
                  )}

                  {/* Icon Header */}
                  <div className={`w-14 h-14 rounded-2xl bg-${category.color}-50 flex items-center justify-center mb-6 text-${category.color}-600 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon size={28} />
                  </div>

                  {/* Title & Price */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900 tracking-tight">{item.price}</span>
                      <span className="text-sm font-bold text-slate-400">{item.currency}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-sm text-slate-500 font-medium bg-slate-50 inline-block px-3 py-1 rounded-lg">
                      <Calendar size={14} />
                      {item.duration}
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="flex-1 mb-8">
                    <ul className="space-y-3">
                      {item.features.map((feat, f) => (
                        <li key={f} className="flex items-start gap-3 text-slate-600 text-sm">
                          <CheckCircle2 size={16} className={`mt-0.5 text-${category.color}-500 shrink-0`} />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2
                    ${item.popular 
                      ? `bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/10` 
                      : 'bg-white border-2 border-slate-100 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    Commander
                    <ArrowRight size={16} />
                  </button>
                </motion.div>
              ))}
            </div>
          </section>
        ))}

        {/* Custom Quote CTA */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-indigo-500/30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Un besoin spécifique ?</h2>
            <p className="text-indigo-100 text-lg mb-10">
              Nous concevons des packages personnalisés pour les labels et les projets d'envergure.
            </p>
            <button className="bg-white text-indigo-600 px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl">
              Demander un devis sur-mesure
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};