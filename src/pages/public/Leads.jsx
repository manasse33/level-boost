import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios'; 
import { PageLoader } from '../../components/common/Loader'; // Import du loader

const BecomeClientPage = () => {
  const navigate = useNavigate();
  
  // --- ÉTATS DE CHARGEMENT ---
  const [loading, setLoading] = useState(true);      // Pour le loader de page (2s)
  const [isSubmitting, setIsSubmitting] = useState(false); // Pour le bouton d'envoi du formulaire
  
  const [error, setError] = useState(null);

  // Simulation du chargement initial (Identique à Talents/Home/About)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // État du formulaire
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    type: '', 
    notes: '',
    consent: false
  });

  // Gestion des changements
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (!formData.consent) {
      setError("Veuillez accepter les conditions pour continuer.");
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        type: formData.type, 
        source: 'website', 
        notes: formData.notes,
        metadata: { origin: 'become_client_page' }
      };

      await api.post('/leads', payload);
      navigate('/confirmation'); 

    } catch (err) {
      console.error("Erreur lors de l'envoi du lead", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Styles SVG
  const patternStyle = {
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233A3086' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
  };

  return (
    <div className="bg-[#F9FAFB] dark:bg-[#111827] text-slate-900 font-['Manrope',sans-serif] transition-colors duration-200">
      <style>
        {`
          .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: #f1f1f1; }
          ::-webkit-scrollbar-thumb { background: #3A3086; border-radius: 4px; }
          ::-webkit-scrollbar-thumb:hover { background: #EF4444; }
        `}
      </style>

      {/* --- AFFICHAGE DU LOADER --- */}
      {loading && <PageLoader />}
    
      {/* Main Content Wrapper */}
      <main className="relative w-full min-h-[calc(100vh-64px)] overflow-hidden">
        {/* African Pattern Background */}
        <div className="absolute inset-0 pointer-events-none opacity-60" style={patternStyle}></div>
        
        {/* Geometric Accent Shapes */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#3A3086]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#FBBF24]/10 rounded-full blur-3xl translate-x-1/2"></div>

        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT COLUMN: Info & Process */}
            <div className="lg:col-span-5 flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <div className="inline-flex items-center gap-2 self-start rounded-full bg-[#3A3086]/5 px-3 py-1 text-xs font-bold text-[#3A3086] border border-[#3A3086]/10 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#EF4444]"></span>
                  Partenariat
                </div>
                <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-[1.15] tracking-tight">
                  Prêt à propulser votre <span className="text-[#3A3086] dark:text-blue-400 relative inline-block">
                    business ?
                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#EF4444] opacity-30" preserveAspectRatio="none" viewBox="0 0 100 10">
                      <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="4"></path>
                    </svg>
                  </span>
                </h1>
                <p className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
                  Transformons votre vision en impact réel. Chez Level Boost, nous combinons expertise technique et créativité culturelle pour des résultats mesurables.
                </p>
              </div>

              {/* Timeline / Process */}
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-100 dark:border-slate-700 p-8 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#3A3086] dark:text-blue-400">work_history</span>
                  Votre parcours d'onboarding
                </h3>
                <div className="grid grid-cols-[40px_1fr] gap-x-4">
                  <div className="flex flex-col items-center pt-1">
                    <div className="w-10 h-10 rounded-full bg-[#3A3086] flex items-center justify-center text-white shadow-md shadow-[#3A3086]/20 z-10">
                      <span className="material-symbols-outlined text-[20px]">person_edit</span>
                    </div>
                    <div className="w-0.5 bg-slate-200 dark:bg-slate-700 h-full min-h-[40px]"></div>
                  </div>
                  <div className="pb-8 pt-2">
                    <p className="text-slate-900 dark:text-white font-bold">Prise de Contact</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Remplissez le formulaire pour nous présenter votre projet.</p>
                  </div>

                  <div className="flex flex-col items-center pt-1">
                    <div className="w-10 h-10 rounded-full bg-white border-2 border-[#EF4444] flex items-center justify-center text-[#EF4444] z-10">
                      <span className="material-symbols-outlined text-[20px]">analytics</span>
                    </div>
                    <div className="w-0.5 bg-slate-200 dark:bg-slate-700 h-full min-h-[40px]"></div>
                  </div>
                  <div className="pb-8 pt-2">
                    <p className="text-slate-900 dark:text-white font-bold">Audit Gratuit</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Nous analysons vos besoins et votre marché cible.</p>
                  </div>

                  <div className="flex flex-col items-center pt-1">
                    <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-400 z-10">
                      <span className="material-symbols-outlined text-[20px]">lightbulb</span>
                    </div>
                    <div className="w-0.5 bg-slate-200 dark:bg-slate-700 h-full min-h-[40px]"></div>
                  </div>
                  <div className="pb-8 pt-2">
                    <p className="text-slate-900 dark:text-white font-medium">Proposition Stratégique</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Une feuille de route sur mesure pour votre croissance.</p>
                  </div>

                  <div className="flex flex-col items-center pt-1">
                    <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-400 z-10">
                      <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <p className="text-slate-900 dark:text-white font-medium">Lancement du Projet</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Mise en œuvre et suivi des performances.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Form */}
            <div className="lg:col-span-7 lg:pl-10">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 p-8 lg:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#EF4444]/10 to-transparent rounded-bl-full pointer-events-none"></div>
                
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Parlez-nous de votre projet</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8">Les champs marqués d'un <span className="text-[#EF4444]">*</span> sont obligatoires.</p>
                
                {error && (
                  <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                  <div className="flex flex-col md:flex-row gap-6">
                    <label className="flex flex-col flex-1 gap-2">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Nom complet <span className="text-[#EF4444]">*</span></span>
                      <input 
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full h-12 px-5 rounded-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 dark:text-white focus:bg-white focus:border-[#EF4444] focus:ring-4 focus:ring-[#EF4444]/10 transition-all outline-none placeholder:text-slate-400" 
                        placeholder="Manassé AFOULA" 
                        type="text"
                      />
                    </label>
                    <label className="flex flex-col flex-1 gap-2">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Nom de l'entreprise</span>
                      <input 
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full h-12 px-5 rounded-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 dark:text-white focus:bg-white focus:border-[#EF4444] focus:ring-4 focus:ring-[#EF4444]/10 transition-all outline-none placeholder:text-slate-400" 
                        placeholder="Votre société" 
                        type="text"
                      />
                    </label>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-6">
                    <label className="flex flex-col flex-1 gap-2">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email professionnel <span className="text-[#EF4444]">*</span></span>
                      <div className="relative">
                        <input 
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full h-12 pl-12 pr-5 rounded-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 dark:text-white focus:bg-white focus:border-[#EF4444] focus:ring-4 focus:ring-[#EF4444]/10 transition-all outline-none placeholder:text-slate-400" 
                          placeholder="jean@societe.com" 
                          type="email"
                        />
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">mail</span>
                      </div>
                    </label>
                    <label className="flex flex-col flex-1 gap-2">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Numéro de téléphone</span>
                      <div className="relative">
                        <input 
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full h-12 pl-12 pr-5 rounded-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 dark:text-white focus:bg-white focus:border-[#EF4444] focus:ring-4 focus:ring-[#EF4444]/10 transition-all outline-none placeholder:text-slate-400" 
                          placeholder="+242 06 757 11 00" 
                          type="tel"
                        />
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">call</span>
                      </div>
                    </label>
                  </div>

                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Type de profil / Service <span className="text-[#EF4444]">*</span></span>
                    <div className="relative">
                      <select 
                        required
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full h-12 pl-5 pr-10 rounded-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 dark:text-white focus:bg-white focus:border-[#EF4444] focus:ring-4 focus:ring-[#EF4444]/10 transition-all outline-none appearance-none cursor-pointer" 
                      >
                        <option disabled value="">Sélectionnez une option</option>
                        <option value="business">Corporate / PME</option>
                        <option value="startup">Startup / Nouvelle Entreprise</option>
                        <option value="artist">Artiste / Créateur</option>
                        <option value="freelance">Freelance</option>
                        <option value="influencer">Influenceur</option>
                        <option value="event">Organisateur d'Événements</option>
                        <option value="association">Association / ONG</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
                    </div>
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Détails du projet</span>
                    <textarea 
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      className="w-full min-h-[120px] p-5 rounded-3xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 dark:text-white focus:bg-white focus:border-[#EF4444] focus:ring-4 focus:ring-[#EF4444]/10 transition-all outline-none placeholder:text-slate-400 resize-none" 
                      placeholder="Décrivez vos objectifs, votre budget estimé et vos délais..."
                    ></textarea>
                  </label>

                  <label className="flex items-start gap-3 mt-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      className="peer sr-only"
                    />
                    <div className="w-5 h-5 rounded border border-slate-300 bg-white peer-checked:bg-[#EF4444] peer-checked:border-[#EF4444] flex items-center justify-center transition-colors">
                      <span className="material-symbols-outlined text-white text-[16px] opacity-0 peer-checked:opacity-100">check</span>
                    </div>
                    <span className="text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">J'accepte d'être contacté par Level Boost concernant ma demande.</span>
                  </label>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="mt-4 w-full h-14 bg-[#EF4444] hover:bg-red-600 text-white font-bold text-lg rounded-full shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
                    {!isSubmitting && <span className="material-symbols-outlined">send</span>}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export { BecomeClientPage };
export default BecomeClientPage;