import React from 'react';
import { 
  Rocket, Mic2, Briefcase, Camera, Ticket, Heart, Store, 
  ArrowRight, Play, TrendingUp, Zap, Globe, Users, CheckCircle2 
} from 'lucide-react';

export function HomePage() {
  
  const personas = [
    {
      id: "artist",
      icon: <Mic2 className="w-6 h-6" />,
      label: "Artistes",
      title: "Construisez votre Fanbase",
      desc: "Distribution, booking et stratégie de sortie.",
      stats: "+250% Streams",
      image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800&q=80"
    },
    {
      id: "startup",
      icon: <Rocket className="w-6 h-6" />,
      label: "Start-ups",
      title: "De la Traction à l'Exit",
      desc: "Validez votre MVP et séduisez les investisseurs.",
      stats: "x3 Leads/mois",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80"
    },
    {
      id: "freelance",
      icon: <Briefcase className="w-6 h-6" />,
      label: "Freelances",
      title: "Devenez la référence",
      desc: "Personal branding pour attirer les clients premium.",
      stats: "Agenda complet",
      image: "https://images.unsplash.com/photo-1552581234-26160f608093?w=800&q=80"
    },
    {
      id: "creator",
      icon: <Camera className="w-6 h-6" />,
      label: "Créateurs",
      title: "Monétisez chaque contenu",
      desc: "Collabs marques et gestion des droits.",
      stats: "+40% Revenus",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80"
    },
    {
      id: "event",
      icon: <Ticket className="w-6 h-6" />,
      label: "Events",
      title: "Événements Sold-out",
      desc: "Billetterie et campagnes de retargeting.",
      stats: "ROI x10",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80"
    },
    {
      id: "asso",
      icon: <Heart className="w-6 h-6" />,
      label: "ONG",
      title: "Mobilisez pour la cause",
      desc: "Campagnes de dons et viralité solidaire.",
      stats: "Portée doublée",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80"
    },
    {
      id: "pme",
      icon: <Store className="w-6 h-6" />,
      label: "PME",
      title: "Dominez le local",
      desc: "SEO Local et trafic en point de vente.",
      stats: "+50 Vistes/jour",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80"
    }
  ];

  return (
    <div className="bg-slate-50 font-sans text-slate-900 selection:bg-blue-600 selection:text-white overflow-x-hidden">
      
      {/* Styles globaux (Scrollbar & Animations) */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fadeUp 0.8s ease-out forwards; }
      `}</style>

      {/* 
          =============================================
          1. HERO SECTION (CORRIGÉE & LIGHT BOSS) 
          =============================================
      */}
      <section className="relative w-full pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
        
        {/* A. IMAGE DE FOND (LARGE & IMMERSIVE) */}
        <div className="absolute inset-0 z-0">
            {/* Image d'une foule en délire (Succès/Public) */}
            <img 
               src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=2000&q=80&fit=crop" 
               alt="Crowd background" 
               className="w-full h-full object-cover opacity-80"
            />
            {/* 
               B. LE GRADIENT MAGIQUE "LIGHT BOSS" : 
               Il part du blanc pur en haut (pour le texte) vers transparent en bas 
            */}
            {/* <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-transparent"></div> */}
            {/* <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent"></div> */}
        </div>

        {/* C. CONTENU TEXTUEL (AU DESSUS) */}
        <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="max-w-4xl animate-fade-up">
                
                {/* Badge */}
                {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 shadow-sm text-blue-700 text-xs font-bold uppercase tracking-widest mb-8">
                   <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                   Plateforme Marketing V2.0
                </div> */}

                {/* Titre Massive */}
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight leading-[1.05] mb-8 drop-shadow-sm">
                   Révélez votre <br/>
                   <span className="text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight leading-[1.05] mb-8 drop-shadow-sm">
                     Vrai Potentiel.
                   </span>
                </h1>

                {/* Sous-titre avec fond de verre pour lisibilité parfaite */}
                <div className="backdrop-blur-sm bg-white/30 p-4 rounded-2xl border border-white/40 inline-block mb-10">
                   <p className="text-xl md:text-2xl text-slate-700 font-medium leading-relaxed max-w-2xl">
                      La première plateforme hybride qui combine la puissance d'un média avec la stratégie d'une agence.
                      <span className="block mt-2 font-bold text-slate-900">Pour Artistes, Start-ups et Entreprises.</span>
                   </p>
                </div>

                {/* Boutons d'action */}
                <div className="flex flex-col sm:flex-row gap-5">
                   <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-3 hover:-translate-y-1">
                      Propulser mon projet <ArrowRight className="w-6 h-6" />
                   </button>
                   <button className="px-10 py-5 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-lg shadow-slate-200/50">
                      <Play className="w-5 h-5 fill-slate-900" /> Voir le Manifesto
                   </button>
                </div>

            </div>
        </div>
      </section>

      {/* --- 2. SOCIAL PROOF --- */}
      {/* <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">Ils nous font confiance</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
             <span className="text-2xl font-black text-slate-900 font-serif">VOGUE</span>
             <span className="text-2xl font-black text-slate-900 tracking-tighter">TechCrunch</span>
             <span className="text-2xl font-black text-slate-900 font-serif italic">Forbes</span>
             <span className="text-2xl font-black text-slate-900 font-mono">Spotify</span>
             <span className="text-2xl font-black text-slate-900">STATION F</span>
          </div>
        </div>
      </section> */}

      {/* --- 3. SOLUTIONS (SCROLL SNAP MOBILE / BENTO DESKTOP) --- */}
      <section className="py-24 px-4 md:px-6 max-w-[1400px] mx-auto bg-slate-50">
        <div className="text-center mb-16 max-w-3xl mx-auto">
           <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">À chacun son Boost</h2>
           <p className="text-xl text-slate-500">
             Une approche sur-mesure. Sélectionnez votre profil pour découvrir votre stratégie.
           </p>
        </div>

        {/* MOBILE : Horizontal Scroll Snap */}
        <div className="lg:hidden flex overflow-x-auto gap-4 pb-8 snap-x snap-mandatory hide-scrollbar px-2">
           {personas.map((persona) => (
             <div key={persona.id} className="snap-center shrink-0 w-[85vw] bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100">
                 <div className="h-52 relative overflow-hidden">
                    <img src={persona.image} alt={persona.label} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white font-bold text-2xl flex items-center gap-2">
                       {persona.icon} {persona.label}
                    </div>
                 </div>
                 <div className="p-6">
                    <h3 className="text-xl font-black text-slate-900 mb-2">{persona.title}</h3>
                    <p className="text-slate-500 text-sm mb-6 min-h-[40px]">{persona.desc}</p>
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6 flex justify-between items-center">
                       <span className="text-xs font-bold text-blue-400 uppercase">Résultat</span>
                       <span className="font-black text-blue-700 text-lg">{persona.stats}</span>
                    </div>
                    <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-sm flex justify-center items-center gap-2">
                       Découvrir <ArrowRight className="w-4 h-4"/>
                    </button>
                 </div>
             </div>
           ))}
        </div>

        {/* DESKTOP : Bento Grid */}
        <div className="hidden lg:grid grid-cols-4 gap-6">
           {personas.map((persona, index) => (
              <div 
                key={persona.id} 
                className={`group relative bg-white rounded-[2rem] p-8 border border-slate-200 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 overflow-hidden flex flex-col justify-between h-[420px] ${
                    index === 0 || index === 6 ? 'col-span-2' : 'col-span-1'
                }`}
              >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                      <img src={persona.image} alt={persona.label} className="w-full h-full object-cover grayscale" />
                  </div>

                  <div className="relative z-10">
                      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                          {persona.icon}
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 mb-2 group-hover:translate-x-1 transition-transform">{persona.label}</h3>
                      <p className="text-slate-500 font-medium text-lg">{persona.title}</p>
                  </div>

                  <div className="relative z-10 mt-8">
                      <div className="flex items-center gap-2 mb-4 bg-slate-50 w-fit px-3 py-1 rounded-lg">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="font-bold text-slate-900 text-sm">{persona.stats}</span>
                      </div>
                      <p className="text-slate-400 text-sm mb-6 line-clamp-2">{persona.desc}</p>
                      
                      <button className="flex items-center gap-2 text-slate-900 font-bold text-sm group-hover:text-blue-600 transition-colors uppercase tracking-wider">
                          Voir l'offre <ArrowRight className="w-4 h-4" />
                      </button>
                  </div>
              </div>
           ))}
        </div>
      </section>

      {/* --- 4. WHY US --- */}
      <section className="py-24 bg-white border-y border-slate-200">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="space-y-4">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-2">
                        <Globe className="w-7 h-7"/>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Réseau International</h3>
                    <p className="text-slate-500 leading-relaxed text-lg">
                        Accédez à +5000 contacts : médias, labels, investisseurs et influenceurs mondiaux.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-2">
                        <Zap className="w-7 h-7"/>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Vitesse d'Exécution</h3>
                    <p className="text-slate-500 leading-relaxed text-lg">
                        Lancement en 24h. Nos processus automatisés suppriment les délais d'agence classiques.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-2">
                        <Users className="w-7 h-7"/>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Communauté Hybride</h3>
                    <p className="text-slate-500 leading-relaxed text-lg">
                        La magie opère quand les mondes se croisent. Un artiste rencontre une start-up.
                    </p>
                </div>
            </div>
         </div>
      </section>

      {/* --- 5. CTA FINAL --- */}
      <section className="py-20 px-4 md:px-6 bg-slate-50">
         <div className="max-w-6xl mx-auto bg-blue-600 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-blue-900/20">
             
             {/* Décoration */}
             <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
             <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-900 opacity-20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3"></div>

             <div className="relative z-10">
                 <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tight leading-none">
                     Prêt à décoller ?
                 </h2>
                 <p className="text-blue-100 text-xl md:text-2xl max-w-2xl mx-auto mb-12">
                     Rejoignez les talents et entreprises qui utilisent Level Boost pour structurer leur succès.
                 </p>
                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
                     <button className="px-10 py-5 bg-white text-blue-600 font-bold rounded-2xl text-lg hover:bg-blue-50 transition-colors shadow-lg">
                         Créer un compte gratuit
                     </button>
                     <button className="px-10 py-5 bg-blue-700 border border-blue-500 text-white font-bold rounded-2xl text-lg hover:bg-blue-800 transition-colors">
                         Parler à un expert
                     </button>
                 </div>
                 <p className="mt-8 text-blue-200 text-sm font-medium opacity-80">Pas de carte bancaire requise • Annulable à tout moment</p>
             </div>
         </div>
      </section>

    </div>
  );
}