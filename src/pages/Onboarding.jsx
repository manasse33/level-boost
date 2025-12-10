import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronRight, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import { PACKS } from '../data/content'; // Assurez-vous d'importer vos données

export default function Onboarding() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const planId = searchParams.get('plan');
    
    // États
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        profileType: '',
        goal: '',
        selectedPlan: planId || '', // Pré-remplir si venant de Pricing
        name: '',
        email: '',
        phone: ''
    });

    // Trouver le plan sélectionné pour l'affichage
    const selectedPlanDetails = PACKS.find(p => p.id === formData.selectedPlan);

    const handleNext = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
        setStep(prev => prev + 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Simulation d'envoi API
        setTimeout(() => {
            setLoading(false);
            setStep(4); // Étape de succès
            // Redirection vers l'accueil après 3 secondes
            setTimeout(() => navigate('/'), 4000);
        }, 2000);
    };

    // Variantes d'animation
    const slideVariants = {
        enter: { x: 50, opacity: 0 },
        center: { x: 0, opacity: 1 },
        exit: { x: -50, opacity: 0 }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
            
            {/* Sidebar Gauche (Récapitulatif & Info) */}
            <div className="md:w-1/3 bg-slate-900 text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-600 rounded-full blur-3xl opacity-20"></div>
                
                <div className="relative z-10">
                    <button onClick={() => navigate(-1)} className="flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Retour
                    </button>
                    <div className="w-10 h-10 bg-indigo-600 rounded flex items-center justify-center font-bold mb-6">LB</div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        {step === 4 ? "Félicitations ! 🚀" : "Propulsez votre projet."}
                    </h1>
                    <p className="text-slate-400 leading-relaxed">
                        {step === 4 
                            ? "Votre dossier est entre les mains de nos experts." 
                            : "Remplissez ce formulaire pour recevoir votre diagnostic personnalisé et démarrer votre collaboration avec Level Boost."}
                    </p>
                </div>

                {/* Récapitulatif dynamique du plan */}
                {selectedPlanDetails && step < 4 && (
                    <div className="mt-8 p-6 bg-slate-800 rounded-xl border border-slate-700 relative z-10">
                        <div className="text-xs text-slate-400 uppercase font-bold mb-2">Pack Sélectionné</div>
                        <div className="text-xl font-bold text-white mb-1">{selectedPlanDetails.name}</div>
                        <div className="text-indigo-400 font-bold mb-3">{selectedPlanDetails.price}</div>
                        <ul className="text-sm text-slate-300 space-y-2">
                            {selectedPlanDetails.features.slice(0, 3).map((f, i) => (
                                <li key={i} className="flex items-center"><CheckCircle className="w-3 h-3 mr-2" /> {f}</li>
                            ))}
                        </ul>
                    </div>
                )}
                
                {/* Indicateur d'étapes */}
                <div className="mt-8 flex gap-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= step ? 'bg-indigo-500' : 'bg-slate-800'}`} />
                    ))}
                </div>
            </div>

            {/* Zone Principale (Formulaire) */}
            <div className="md:w-2/3 p-6 md:p-20 flex items-center justify-center bg-white">
                <div className="w-full max-w-lg">
                    <AnimatePresence mode="wait">
                        
                        {/* ÉTAPE 1 : PROFIL (Basé sur [cite: 18]) */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                variants={slideVariants} initial="enter" animate="center" exit="exit"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            >
                                <h2 className="text-2xl font-bold text-slate-900 mb-8">Quel est votre profil ?</h2>
                                <div className="space-y-4">
                                    {[
                                        { id: 'artiste', label: 'Artiste / Musicien', sub: 'Je veux développer ma fanbase' },
                                        { id: 'startup', label: 'Entrepreneur / Startup', sub: 'Je cherche des clients/investisseurs' },
                                        { id: 'brand', label: 'Marque / PME', sub: 'Je veux une visibilité locale' },
                                        { id: 'creator', label: 'Influenceur', sub: 'Je veux monétiser mon audience' }
                                    ].map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => handleNext('profileType', option.id)}
                                            className="w-full p-5 text-left border border-slate-200 rounded-xl hover:border-indigo-600 hover:bg-indigo-50 hover:shadow-md transition-all group flex justify-between items-center"
                                        >
                                            <div>
                                                <div className="font-bold text-slate-900 group-hover:text-indigo-700">{option.label}</div>
                                                <div className="text-sm text-slate-500">{option.sub}</div>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600" />
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* ÉTAPE 2 : OBJECTIF (Basé sur [cite: 220]) */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                variants={slideVariants} initial="enter" animate="center" exit="exit"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            >
                                <h2 className="text-2xl font-bold text-slate-900 mb-8">Votre priorité actuelle ?</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        'Gagner en visibilité', 
                                        'Augmenter les ventes', 
                                        'Trouver des partenaires', 
                                        'Améliorer mon image'
                                    ].map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => handleNext('goal', opt)}
                                            className="p-6 border border-slate-200 rounded-xl hover:border-indigo-600 hover:bg-indigo-50 hover:shadow-md transition-all text-center font-medium text-slate-700 hover:text-indigo-700 h-32 flex items-center justify-center"
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                                <button onClick={() => setStep(1)} className="mt-8 text-sm text-slate-400 hover:text-slate-600 underline">Retour à l'étape précédente</button>
                            </motion.div>
                        )}

                        {/* ÉTAPE 3 : COORDONNÉES & VALIDATION */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                variants={slideVariants} initial="enter" animate="center" exit="exit"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            >
                                <h2 className="text-2xl font-bold text-slate-900 mb-6">Dernière étape</h2>
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Nom complet / Nom de scène</label>
                                        <input 
                                            required 
                                            type="text" 
                                            value={formData.name}
                                            onChange={e => setFormData({...formData, name: e.target.value})}
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" 
                                            placeholder="Ex: John Doe" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Email professionnel</label>
                                        <input 
                                            required 
                                            type="email" 
                                            value={formData.email}
                                            onChange={e => setFormData({...formData, email: e.target.value})}
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" 
                                            placeholder="contact@..." 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Téléphone (WhatsApp)</label>
                                        <input 
                                            required 
                                            type="tel" 
                                            value={formData.phone}
                                            onChange={e => setFormData({...formData, phone: e.target.value})}
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" 
                                            placeholder="+242 ..." 
                                        />
                                    </div>

                                    {!formData.selectedPlan && (
                                        <div className="p-4 bg-orange-50 border border-orange-100 rounded-lg text-sm text-orange-800">
                                            Note: Nous vous recommanderons le meilleur pack lors de notre appel.
                                        </div>
                                    )}

                                    <div className="pt-4">
                                        <button 
                                            type="submit" 
                                            disabled={loading}
                                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-indigo-500/25 transition disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                                        >
                                            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Recevoir mon diagnostic gratuit"}
                                        </button>
                                    </div>
                                </form>
                                <button onClick={() => setStep(2)} className="mt-6 w-full text-center text-sm text-slate-400 hover:text-slate-600 underline">Retour</button>
                            </motion.div>
                        )}

                        {/* ÉTAPE 4 : SUCCÈS */}
                        {step === 4 && (
                            <motion.div
                                key="success"
                                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                className="text-center"
                            >
                                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                                    <CheckCircle className="w-12 h-12" />
                                </div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-4">Demande envoyée !</h2>
                                <p className="text-slate-600 mb-8 max-w-md mx-auto">
                                    Un membre de l'équipe Level Boost va analyser votre profil et vous contacter sur <strong>{formData.phone}</strong> sous 24h.
                                </p>
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-500">
                                    Redirection automatique vers l'accueil...
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}