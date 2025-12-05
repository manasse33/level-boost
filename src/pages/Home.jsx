import Hero from '../components/Hero';
import Pricing from '../components/Pricing';
import Reveal from '../components/Reveal';
import { CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Hero />
      
      {/* Section Preuve Sociale / Chiffres */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
                { label: 'Fans générés', val: '+50k' },
                { label: 'Artistes accompagnés', val: '120+' },
                { label: 'Campagnes Ads', val: '500+' },
                { label: 'Taux de satisfaction', val: '98%' },
            ].map((stat, i) => (
                <div key={i}>
                    <div className="text-4xl font-extrabold text-primary mb-1">{stat.val}</div>
                    <div className="text-gray-500 font-medium uppercase text-sm tracking-wide">{stat.label}</div>
                </div>
            ))}
        </div>
      </section>

      {/* Section Valeurs / Vision */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <Reveal>
        <div className="relative">
            {/* Décoration */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary/10 rounded-full blur-xl"></div>
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" alt="Team" className="rounded-2xl shadow-2xl relative z-10" />
            {/* Badge flottant */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl z-20 border-l-4 border-secondary max-w-xs hidden md:block">
                <p className="font-bold text-primary">"Notre mission : transformer la notoriété en revenus concrets."</p>
            </div>
        </div>
      </Reveal>
      
      <Reveal delay={0.2}>
        <h2 className="text-4xl font-display font-bold text-primary mb-6">Plus qu'une agence, <br/>un écosystème.</h2>
        <div className="space-y-6">
            {[
                { title: "Authenticité", desc: "Pas de faux followers. Du contenu humain et du storytelling vrai." },
                { title: "Performance", desc: "Des KPIs mesurables. On ne cherche pas juste des likes, mais des clients." },
                { title: "Communauté", desc: "Un réseau solide d'artistes, d'entrepreneurs et d'investisseurs." }
            ].map((val, i) => (
                <div key={i} className="flex">
                    <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-primary font-bold">
                            {i + 1}
                        </div>
                    </div>
                    <div className="ml-4">
                        <h4 className="text-xl font-bold text-gray-900">{val.title}</h4>
                        <p className="text-gray-600">{val.desc}</p>
                    </div>
                </div>
            ))}
        </div>
      </Reveal>
    </div>
  </div>
</section>

      <Pricing />
    </>
  );
}