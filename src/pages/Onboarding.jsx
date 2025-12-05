import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: '',
    goal: '',
    budget: '',
    contact: { name: '', email: '', phone: '' }
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSelection = (field, value) => {
    setFormData({ ...formData, [field]: value });
    nextStep();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Envoi à l'API Laravel :", formData);
    // Ici: fetch('http://localhost:8000/api/leads', ...)
    alert("Dossier envoyé ! Un expert Level Boost vous contactera.");
    navigate('/');
  };

  // Animation variants
  const slideIn = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 }
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col justify-center items-center text-white p-6 relative overflow-hidden">
      {/* Background abstract */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gray-800">
        <div className="h-full bg-secondary transition-all duration-500" style={{ width: `${(step / 4) * 100}%` }}></div>
      </div>
      
      <div className="w-full max-w-2xl z-10">
        <div className="mb-8 text-secondary font-bold uppercase tracking-widest text-sm">Étape {step} / 4</div>
        
        {step === 1 && (
          <motion.div initial="hidden" animate="visible" exit="exit" variants={slideIn}>
            <h2 className="text-4xl font-bold mb-8">Qui êtes-vous ?</h2>
            <div className="space-y-4">
              {['Artiste', 'Entrepreneur / Startup', 'Marque / PME', 'Créateur de contenu'].map((role) => (
                <button key={role} onClick={() => handleSelection('role', role)} className="w-full text-left p-6 rounded-xl border border-white/20 hover:bg-white hover:text-primary hover:border-white transition text-xl font-medium flex justify-between group">
                  {role} <ArrowRight className="opacity-0 group-hover:opacity-100 transition" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial="hidden" animate="visible" exit="exit" variants={slideIn}>
            <h2 className="text-4xl font-bold mb-8">Quel est votre objectif principal ?</h2>
            <div className="space-y-4">
              {['Visibilité & Notoriété', 'Trouver des clients / Bookings', 'Trouver des investisseurs', 'Engagement Communauté'].map((goal) => (
                <button key={goal} onClick={() => handleSelection('goal', goal)} className="w-full text-left p-6 rounded-xl border border-white/20 hover:bg-white hover:text-primary transition text-xl font-medium">
                  {goal}
                </button>
              ))}
            </div>
            <button onClick={prevStep} className="mt-8 text-gray-400 hover:text-white underline">Retour</button>
          </motion.div>
        )}

        {step === 3 && (
            <motion.div initial="hidden" animate="visible" exit="exit" variants={slideIn}>
              <h2 className="text-4xl font-bold mb-8">Quel budget envisagez-vous ?</h2>
              <div className="space-y-4">
                {['Pack Découverte (25k FCFA)', 'Pack Standard (150k FCFA)', 'Pack Premium (450k+ FCFA)', 'Sur mesure'].map((budget) => (
                  <button key={budget} onClick={() => handleSelection('budget', budget)} className="w-full text-left p-6 rounded-xl border border-white/20 hover:bg-white hover:text-primary transition text-xl font-medium">
                    {budget}
                  </button>
                ))}
              </div>
              <button onClick={prevStep} className="mt-8 text-gray-400 hover:text-white underline">Retour</button>
            </motion.div>
        )}

        {step === 4 && (
            <motion.div initial="hidden" animate="visible" exit="exit" variants={slideIn}>
              <h2 className="text-4xl font-bold mb-6">Dernière étape !</h2>
              <p className="text-xl text-gray-300 mb-8">Laissez-nous vos coordonnées pour recevoir votre stratégie.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm mb-2">Nom complet</label>
                    <input type="text" required className="w-full bg-transparent border-b-2 border-gray-500 focus:border-secondary outline-none py-3 text-2xl" 
                        onChange={(e) => setFormData({...formData, contact: {...formData.contact, name: e.target.value}})} />
                </div>
                <div>
                    <label className="block text-sm mb-2">Email professionnel</label>
                    <input type="email" required className="w-full bg-transparent border-b-2 border-gray-500 focus:border-secondary outline-none py-3 text-2xl"
                        onChange={(e) => setFormData({...formData, contact: {...formData.contact, email: e.target.value}})} />
                </div>
                <div>
                    <label className="block text-sm mb-2">Numéro de téléphone (WhatsApp)</label>
                    <input type="tel" required className="w-full bg-transparent border-b-2 border-gray-500 focus:border-secondary outline-none py-3 text-2xl"
                        onChange={(e) => setFormData({...formData, contact: {...formData.contact, phone: e.target.value}})} />
                </div>

                <button type="submit" className="w-full bg-secondary hover:bg-red-600 text-white font-bold py-5 rounded-xl text-xl mt-8 shadow-lg transform hover:scale-105 transition flex justify-center items-center">
                    Valider ma demande <Check className="ml-2" />
                </button>
              </form>
              <button onClick={prevStep} className="mt-4 text-gray-400 hover:text-white underline">Retour</button>
            </motion.div>
        )}
      </div>
    </div>
  );
}