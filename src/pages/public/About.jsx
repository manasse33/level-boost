import React from 'react';
import { 
  Target, Users, Zap, Globe, ArrowRight, 
  CheckCircle2, TrendingUp, ShieldCheck, Heart 
} from 'lucide-react';

export function AboutPage() {
  
  const stats = [
    { label: "Talents Accompagnés", value: "2.5k+" },
    { label: "Pays Couverts", value: "12" },
    { label: "Partenaires Média", value: "150+" },
    { label: "Croissance Client", value: "300%" },
  ];

  const team = [
    { name: "Alexandre D.", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80" },
    { name: "Sarah M.", role: "Head of Growth", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80" },
    { name: "David K.", role: "Directeur Artistique", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80" },
    { name: "Elena R.", role: "Lead Partnerships", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80" },
  ];

  return (
    <div className="bg-slate-50 font-sans text-slate-900 selection:bg-blue-600 selection:text-white overflow-x-hidden">
      
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fadeUp 0.8s ease-out forwards; }
      `}</style>

      {/* --- 1. HERO VISION --- */}
      <section className="relative pt-32 pb-24 px-6 md:px-10 max-w-[1400px] mx-auto">
         <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-blue-600 text-xs font-bold uppercase tracking-widest mb-8">
               Notre Mission
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight leading-[1.05] mb-8">
               Nous démocratisons <br/>
               <span className="text-blue-600">le Succès.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed">
               Le talent est universel, mais les opportunités ne le sont pas. 
               Level Boost construit le pont technologique entre votre potentiel et votre réussite.
            </p>
         </div>
      </section>

      {/* --- 2. IMAGE DE MARQUE (Manifesto) --- */}
      <section className="w-full h-[500px] md:h-[700px] relative overflow-hidden">
         <div className="absolute inset-0">
             <img 
               src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80" 
               alt="Team working" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-slate-900/30"></div>
         </div>
         {/* Stats Flottantes */}
         <div className="absolute bottom-0 w-full bg-white/90 backdrop-blur-md border-t border-white/20 py-12">
             <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                 {stats.map((stat, i) => (
                    <div key={i}>
                       <div className="text-4xl md:text-5xl font-black text-slate-900 mb-2">{stat.value}</div>
                       <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                    </div>
                 ))}
             </div>
         </div>
      </section>

      {/* --- 3. NOTRE HISTOIRE (Le Problème vs La Solution) --- */}
      <section className="py-24 px-6 bg-white">
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div>
                <h2 className="text-4xl font-black mb-6 leading-tight">
                   L'ancien modèle <br/>est <span className="text-slate-400 line-through decoration-blue-600 decoration-4">cassé</span>.
                </h2>
                <div className="space-y-8 text-lg text-slate-600 leading-relaxed">
                   <p>
                      Pendant des années, les talents avaient deux choix : signer un contrat "prison" avec une agence/label et perdre leur liberté, ou essayer de tout faire seul et s'épuiser sans résultats.
                   </p>
                   <p>
                      <strong className="text-slate-900">Nous avons créé la troisième voie.</strong>
                   </p>
                   <p>
                      Level Boost n'est pas une agence classique. C'est un écosystème hybride qui vous donne les armes des plus grands (Data, Réseau, Tech) tout en vous laissant 100% indépendant.
                   </p>
                </div>
                
                <div className="mt-10 flex gap-4">
                   <div className="flex items-center gap-2 text-sm font-bold text-slate-900 bg-slate-100 px-4 py-2 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-blue-600"/> Indépendance
                   </div>
                   <div className="flex items-center gap-2 text-sm font-bold text-slate-900 bg-slate-100 px-4 py-2 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-blue-600"/> Technologie
                   </div>
                   <div className="flex items-center gap-2 text-sm font-bold text-slate-900 bg-slate-100 px-4 py-2 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-blue-600"/> Performance
                   </div>
                </div>
             </div>

             <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] opacity-20 blur-2xl"></div>
                <div className="relative bg-slate-900 text-white p-10 md:p-14 rounded-[2rem] shadow-2xl">
                   <h3 className="text-2xl font-bold mb-8">L'Approche Level Boost</h3>
                   <div className="space-y-8">
                       <div className="flex gap-4">
                          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                             <Target className="w-6 h-6 text-white"/>
                          </div>
                          <div>
                             <h4 className="font-bold text-lg mb-1">Ciblage Laser</h4>
                             <p className="text-slate-400 text-sm">Nous ne tirons pas au hasard. Nous analysons la data pour trouver votre audience idéale.</p>
                          </div>
                       </div>
                       <div className="flex gap-4">
                          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                             <Zap className="w-6 h-6 text-white"/>
                          </div>
                          <div>
                             <h4 className="font-bold text-lg mb-1">Vitesse d'Exécution</h4>
                             <p className="text-slate-400 text-sm">Le marché n'attend pas. Nous lançons vos campagnes en 24h.</p>
                          </div>
                       </div>
                       <div className="flex gap-4">
                          <div className="w-12 h-12 bg-white text-slate-900 rounded-xl flex items-center justify-center shrink-0">
                             <Globe className="w-6 h-6"/>
                          </div>
                          <div>
                             <h4 className="font-bold text-lg mb-1">Réseau Global</h4>
                             <p className="text-slate-400 text-sm">Une porte ouverte vers l'international dès le premier jour.</p>
                          </div>
                       </div>
                   </div>
                </div>
             </div>
         </div>
      </section>

      {/* --- 4. VALEURS --- */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-4xl font-black mb-4">Notre ADN</h2>
               <p className="text-slate-500 text-lg">Ce qui nous guide au quotidien pour votre réussite.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-900/5 transition-all group">
                   <TrendingUp className="w-10 h-10 text-slate-300 group-hover:text-blue-600 transition-colors mb-6" />
                   <h3 className="text-2xl font-bold mb-3">Ambition</h3>
                   <p className="text-slate-500">Nous ne visons pas la moyenne. Nous visons l'exceptionnel pour chaque projet que nous touchons.</p>
               </div>
               <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-900/5 transition-all group">
                   <ShieldCheck className="w-10 h-10 text-slate-300 group-hover:text-blue-600 transition-colors mb-6" />
                   <h3 className="text-2xl font-bold mb-3">Transparence</h3>
                   <p className="text-slate-500">Pas de jargon, pas de frais cachés. Vous avez accès à toutes vos données en temps réel.</p>
               </div>
               <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-900/5 transition-all group">
                   <Heart className="w-10 h-10 text-slate-300 group-hover:text-blue-600 transition-colors mb-6" />
                   <h3 className="text-2xl font-bold mb-3">Passion</h3>
                   <p className="text-slate-500">Nous sommes des entrepreneurs et des artistes. Nous comprenons vos défis car nous les avons vécus.</p>
               </div>
            </div>
         </div>
      </section>

      {/* --- 5. TEAM (Leadership) --- */}
      <section className="py-24 px-6 bg-white">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
               <div className="max-w-2xl">
                  <h2 className="text-4xl font-black mb-4">Rencontrez l'équipe</h2>
                  <p className="text-slate-500 text-lg">
                     Une équipe multidisciplinaire venue de Google, Universal Music et des meilleures agences tech.
                  </p>
               </div>
               <button className="text-blue-600 font-bold flex items-center gap-2 hover:translate-x-1 transition-transform">
                  Voir tous les membres <ArrowRight className="w-4 h-4"/>
               </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {team.map((member, i) => (
                  <div key={i} className="group cursor-pointer">
                     <div className="h-[400px] mb-4 overflow-hidden rounded-2xl bg-slate-100 relative">
                        <img 
                           src={member.img} 
                           alt={member.name} 
                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                     </div>
                     <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                     <p className="text-blue-600 font-medium text-sm">{member.role}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- 6. CTA FINAL --- */}
      <section className="py-20 px-4 md:px-6">
         <div className="max-w-6xl mx-auto bg-slate-900 rounded-[2.5rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
             
             <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 opacity-20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
             <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 opacity-10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3"></div>

             <div className="relative z-10">
                 <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
                    Rejoignez le mouvement.
                 </h2>
                 <p className="text-slate-300 text-xl max-w-2xl mx-auto mb-12">
                    Nous construisons le futur de l'économie des talents. Faites partie de l'histoire.
                 </p>
                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
                     <button className="px-10 py-5 bg-blue-600 text-white font-bold rounded-xl text-lg hover:bg-blue-500 transition-colors shadow-lg">
                         Devenir Partenaire
                     </button>
                     <button className="px-10 py-5 bg-transparent border border-slate-700 text-white font-bold rounded-xl text-lg hover:bg-slate-800 transition-colors">
                         Nos Offres d'Emploi
                     </button>
                 </div>
             </div>
         </div>
      </section>

    </div>
  );
}