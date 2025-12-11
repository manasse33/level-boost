// ============= REGISTER PAGE =============
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input, Button, Toast } from '../../components/common'; // adapte selon ton arborescence
import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';


export const RegisterPage = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onRegister(formData);
      setToast({ type: 'success', message: 'Inscription réussie !' });
      setTimeout(() => onNavigate('/dashboard'), 1000);
    } catch (err) {
      setError(err.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <AnimatePresence>
        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
            LB
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Inscription</h2>
          <p className="text-slate-600 mt-2">Rejoignez la communauté</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-red-800">{error}</span>
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Nom complet"
            value={formData.name}
            onChange={(val) => handleChange('name', val)}
            placeholder="Manasse AFOULA"
            required
          />

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(val) => handleChange('email', val)}
            placeholder="votre@email.com"
            required
          />

          <Input
            label="Téléphone"
            type="tel"
            value={formData.phone}
            onChange={(val) => handleChange('phone', val)}
            placeholder="+242 XX XXX XXXX"
          />

          <Input
            label="Mot de passe"
            type="password"
            value={formData.password}
            onChange={(val) => handleChange('password', val)}
            placeholder="••••••••"
            required
          />

          <Input
            label="Confirmer le mot de passe"
            type="password"
            value={formData.password_confirmation}
            onChange={(val) => handleChange('password_confirmation', val)}
            placeholder="••••••••"
            required
          />

          <Button
            onClick={handleRegister}
            loading={loading}
            variant="primary"
            fullWidth
          >
            S'inscrire
          </Button>
        </div>

       <p className="mt-6 text-center text-sm text-slate-600">
  Déjà inscrit ?{' '}
  <Link
    to="/login"
    className="text-indigo-600 font-bold hover:underline"
  >
    Se connecter
  </Link>
</p>

      </motion.div>
    </div>
  );
};