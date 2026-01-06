import React, { useState, useEffect } from 'react';
import api from '../../api/axios'; // Assurez-vous que le chemin vers votre configuration axios est correct
import { useNavigate } from 'react-router-dom';
import { PageLoader } from '../../components/common/Loader';

const ServicesPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // États pour les données API
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all', 'social_media', 'event', 'strategy'

  const navigate = useNavigate();

  // Détection du mode sombre système
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  // 🔄 Chargement des Packages depuis l'API
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await api.get('/packages');
        // On suppose que l'API renvoie un tableau d'objets ou { data: [...] }
        const data = Array.isArray(response.data) ? response.data : response.data.data;
        setPackages(data);
      } catch (error) {
        console.error("Erreur lors du chargement des packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // 🎨 Utilitaires de style dynamique basé sur le slug ou le type du package
  const getPackageStyle = (pkg) => {
    const slug = pkg.slug?.toLowerCase() || '';
    
    // Configuration spécifique pour le design "Standard / Premium / Elite"
    if (slug.includes('premium') || pkg.special_offer) {
      return {
        borderColor: 'border-[#E63946]',
        iconBg: 'bg-red-50 dark:bg-red-900/30',
        iconColor: 'text-[#E63946]',
        icon: 'diamond',
        btnBg: 'bg-[#E63946] text-white hover:bg-[#E63946]/90',
        badge: 'BEST SELLER',
        badgeColor: 'bg-[#E63946]',
        label: 'Croissance'
      };
    } else if (slug.includes('elite') || slug.includes('corporate')) {
      return {
        borderColor: 'border-[#3B3689]',
        iconBg: 'bg-blue-50 dark:bg-blue-900/30',
        iconColor: 'text-[#3B3689]',
        icon: 'crown',
        btnBg: 'border border-[#3B3689] text-[#3B3689] dark:text-white hover:bg-[#3B3689] hover:text-white',
        badge: null,
        label: 'Entreprise'
      };
    } else {
      // Default / Standard
      return {
        borderColor: 'border-gray-400',
        iconBg: 'bg-gray-100 dark:bg-gray-700',
        iconColor: 'group-hover:text-white', // Sera géré par le hover du parent
        icon: 'rocket_launch',
        btnBg: 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700',
        badge: null,
        label: 'Démarrage'
      };
    }
  };

  // Filtrage des packages
  const filteredPackages = packages.filter(pkg => {
    if (selectedCategory === 'all') return true;
    return pkg.type === selectedCategory; 
  });

  // Gestion de la commande (Redirection ou Modal)
  const handleOrder = (pkgId) => {
    // Si l'utilisateur est connecté, on peut créer une commande, sinon rediriger vers login
    // Pour l'instant, on redirige vers une page de contact ou de commande avec l'ID
    navigate(`/contact?package=${pkgId}`);
    // Ou appel direct à API create order si vous implémentez un modal ici
  };

  // Styles motifs
  const cardPatternStyle = {
    backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(230, 57, 70, 0.03) 10px, rgba(230, 57, 70, 0.03) 20px)"
  };

  return (
    
    <div className={`${isDarkMode ? 'dark' : ''} font-['Poppins',sans-serif]`}>
        <style>
        {`
          ::-webkit-scrollbar { width: 10px; }
          ::-webkit-scrollbar-track { background: #f1f1f1; }
          ::-webkit-scrollbar-thumb { background: #333399; border-radius: 5px; }
          ::-webkit-scrollbar-thumb:hover { background: #2a2a80; }
        `}
      </style>
      {loading && <PageLoader />}
      
      <div className="bg-[#F9FAFB] dark:bg-[#111827] text-gray-800 dark:text-gray-100 min-h-screen transition-colors duration-300">
        
        {/* Header (Statique) */}
        <header className="relative bg-[#3B3689] overflow-hidden">
          <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}></div>
          <div className="absolute right-0 top-0 h-full w-1/3 bg-[#E63946]/10 skew-x-12 transform origin-bottom"></div>
          <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-['Montserrat',sans-serif] font-extrabold text-white mb-6 tracking-tight">
              Propulsez Votre Présence <br/>
              <span className="text-[#E63946] inline-block relative">
                Au Niveau Supérieur
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#E63946] fill-current opacity-60" preserveAspectRatio="none" viewBox="0 0 200 9">
                  <path d="M2.00025 1.5C2.00025 1.5 59.9996 0.5 100.001 0.5C140.002 0.5 200.002 1.5 200.002 1.5V3.5C200.002 3.5 140.002 5.5 100.001 5.5C59.9996 5.5 2.00025 3.5 2.00025 3.5V1.5Z"></path>
                </svg>
              </span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-200 font-light">
              Des solutions de marketing digital sur mesure, inspirées par l'innovation et guidées par les résultats. Choisissez le pack qui correspond à votre ambition.
            </p>
          </div>
          <div className="absolute bottom-0 w-full">
            <svg className="fill-[#F9FAFB] dark:fill-[#111827] w-full h-auto block" preserveAspectRatio="none" viewBox="0 0 1440 120">
              <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </svg>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Section Title */}
          <div className="text-center mb-16">
            <span className="text-[#E63946] font-bold tracking-wider uppercase text-sm">Nos Solutions</span>
            <h2 className="text-3xl md:text-4xl font-['Montserrat',sans-serif] font-bold text-gray-900 dark:text-white mt-2">Packs Marketing</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#3B3689] to-[#E63946] mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { label: 'Tous les Packs', value: 'all' },
              { label: 'Réseaux Sociaux', value: 'social_media' },
              { label: 'Événements', value: 'event' },
              { label: 'Stratégie', value: 'strategy' }
            ].map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-6 py-2 rounded-full font-medium transition border ${
                  selectedCategory === cat.value
                    ? 'bg-[#3B3689] text-white border-[#3B3689] shadow-md'
                    : 'bg-[#FFFFFF] dark:bg-[#1F2937] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-[#E63946] hover:text-[#E63946]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Pricing Grid (Dynamique) */}
          {loading ? (
            <div className="text-center py-20 text-gray-500">Chargement des offres...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map((pkg) => {
                const style = getPackageStyle(pkg);
                
                return (
                  <div 
                    key={pkg.id} 
                    className={`group bg-[#FFFFFF] dark:bg-[#1F2937] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 ${style.borderColor} overflow-hidden relative transform ${pkg.special_offer ? 'md:-translate-y-2' : ''}`}
                  >
                    {/* Badge Best Seller */}
                    {style.badge && (
                      <div className={`absolute top-0 right-0 ${style.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10`}>
                        {style.badge}
                      </div>
                    )}

                    <div className="p-8" style={pkg.special_offer ? cardPatternStyle : {}}>
                      <div className="flex justify-between items-start mb-6">
                        <div className={`${style.iconBg} ${style.iconColor} p-3 rounded-lg group-hover:bg-[#3B3689] group-hover:text-white transition-colors duration-300`}>
                          <span className="material-icons-outlined text-3xl">{style.icon}</span>
                        </div>
                        <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                          {style.label}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-['Montserrat',sans-serif] font-bold text-gray-900 dark:text-white mb-2">
                        {pkg.name}
                      </h3>
                      
                      {/* Affichage du prix si disponible */}
                      <div className="text-3xl font-bold text-[#3B3689] dark:text-blue-400 mb-2">
                        {pkg.price > 0 ? `${parseFloat(pkg.price).toLocaleString()} FCFA` : 'Sur Mesure'}
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                        {pkg.description}
                      </p>

                      <ul className="space-y-3 mb-8">
                        {/* On parse les features si c'est une chaîne JSON ou on utilise le tableau direct */}
                        {(Array.isArray(pkg.features) ? pkg.features : JSON.parse(pkg.features || '[]')).map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                            <span className={`material-icons-outlined text-lg mr-2 ${style.iconColor === 'text-[#E63946]' ? 'text-[#E63946]' : (style.iconColor === 'text-[#3B3689]' ? 'text-[#3B3689]' : 'text-green-500')}`}>
                              check_circle
                            </span>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <button 
                        onClick={() => handleOrder(pkg.id)}
                        className={`block w-full text-center py-3 rounded-lg font-medium transition shadow-lg ${style.btnBg}`}
                      >
                        Choisir ce Pack
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Solutions Spécialisées (Statique ou API selon besoin, ici gardé statique pour design layout) */}
          <div className="mt-20">
            <h3 className="text-2xl md:text-3xl font-['Montserrat',sans-serif] font-bold text-gray-900 dark:text-white mb-8 text-center">Solutions Spécialisées</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <div className="bg-[#FFFFFF] dark:bg-[#1F2937] p-6 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-[#F4A261] dark:hover:border-[#F4A261] transition group">
                <div className="flex items-center gap-4 mb-3">
                  <span className="material-icons-outlined text-[#F4A261] text-3xl group-hover:scale-110 transition-transform">storefront</span>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white">Basique</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pour les startups et commerces locaux ayant besoin d'une empreinte numérique de base.</p>
              </div>

              <div className="bg-[#FFFFFF] dark:bg-[#1F2937] p-6 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition group">
                <div className="flex items-center gap-4 mb-3">
                  <span className="material-icons-outlined text-green-500 text-3xl group-hover:scale-110 transition-transform">trending_up</span>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white">Croissance</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Phase de mise à l'échelle axée sur la génération de leads et l'optimisation des conversions.</p>
              </div>

              <div className="bg-[#FFFFFF] dark:bg-[#1F2937] p-6 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition group">
                <div className="flex items-center gap-4 mb-3">
                  <span className="material-icons-outlined text-purple-500 text-3xl group-hover:scale-110 transition-transform">event_seat</span>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white">Événementiel</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Campagnes à fort impact à court terme pour concerts, conférences et lancements.</p>
              </div>

              <div className="bg-[#FFFFFF] dark:bg-[#1F2937] p-6 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-500 transition group">
                <div className="flex items-center gap-4 mb-3">
                  <span className="material-icons-outlined text-teal-500 text-3xl group-hover:scale-110 transition-transform">volunteer_activism</span>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white">Solidaire</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Conçu pour les ONG et les associations avec un accent sur la sensibilisation et la collecte de fonds.</p>
              </div>

              <div className="bg-[#FFFFFF] dark:bg-[#1F2937] p-6 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-[#3B3689] dark:hover:border-blue-500 transition group md:col-span-2 lg:col-span-2">
                <div className="flex items-center gap-4 mb-3">
                  <span className="material-icons-outlined text-[#3B3689] dark:text-blue-400 text-3xl group-hover:scale-110 transition-transform">apartment</span>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white">Business / Corporate</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Solutions B2B incluant gestion LinkedIn, diffusion RP et stratégies de communication interne conçues pour les grandes entreprises.</p>
              </div>

            </div>
          </div>
        </main>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-[#3B3689] to-blue-900 py-16 relative overflow-hidden">
          <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full border-8 border-white/10"></div>
          <div className="absolute right-10 top-10 w-20 h-20 rounded-full border-4 border-[#E63946]/30"></div>
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl font-['Montserrat',sans-serif] font-bold text-white mb-6">Pas sûr de quel pack correspond à votre vision ?</h2>
            <p className="text-blue-100 mb-8 text-lg">Contactez notre équipe pour une consultation gratuite. Nous analyserons vos besoins et proposerons la stratégie Level Boost parfaite.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a className="bg-[#E63946] hover:bg-white hover:text-[#3B3689] text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg" href="#">
                Nous Contacter
              </a>
              <a className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-full transition duration-300" href="#">
                Télécharger Brochure
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export { ServicesPage };
export default ServicesPage;