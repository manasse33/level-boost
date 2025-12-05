// src/components/Pricing.jsx
const packs = [
    {
        name: "Pack Basique",
        price: "60 000 FCFA",
        features: ["Fiche profil enrichie", "2 posts + 3 stories", "Promotion 2 semaines"],
        isPopular: false
    },
    {
        name: "Pack Standard",
        price: "150 000 FCFA",
        features: ["Mini-vidéo promo (30-45s)", "Campagne sponsorisée", "Optimisation SEO", "Rapport complet"],
        isPopular: true // Le choix recommandé
    },
    {
        name: "Pack Premium",
        price: "450 000 FCFA",
        features: ["Vidéo pro (1-2 min)", "Gestion CM 1 mois", "Budget Pub inclus (150k)", "Media training"],
        isPopular: false
    }
];

export default function Pricing() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">Nos Packs de Visibilité</h2>
          <p className="text-gray-600">Des solutions adaptées à chaque étape de votre croissance.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
            {packs.map((pack, index) => (
                <div key={index} className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border ${pack.isPopular ? 'border-secondary ring-2 ring-secondary/20' : 'border-gray-100'}`}>
                    {pack.isPopular && (
                        <div className="absolute top-0 right-0 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                            RECOMMANDÉ
                        </div>
                    )}
                    <h3 className="text-xl font-bold text-primary mb-2">{pack.name}</h3>
                    <div className="text-3xl font-extrabold text-gray-900 mb-6">{pack.price}</div>
                    <ul className="space-y-4 mb-8">
                        {pack.features.map((feature, i) => (
                            <li key={i} className="flex items-center text-gray-600">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                {feature}
                            </li>
                        ))}
                    </ul>
                    <button className={`w-full py-3 rounded-lg font-bold transition-colors ${pack.isPopular ? 'bg-primary text-white hover:bg-indigo-900' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
                        Choisir ce pack
                    </button>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}