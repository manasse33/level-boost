// ============= LOGIN PAGE =============
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input, Button, Toast } from '../../components/common'; // adapte selon ton arborescence
import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LoginPage = ({ onNavigate, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onLogin(email, password);
      setToast({ type: 'success', message: 'Connexion réussie !' });
      setTimeout(() => onNavigate('/dashboard'), 1000);
    } catch (err) {
      setError(err.message || 'Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
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
          <h2 className="text-3xl font-bold text-slate-900">Connexion</h2>
          <p className="text-slate-600 mt-2">Accédez à votre espace</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-red-800">{error}</span>
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="votre@email.com"
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          />

          <Input
            label="Mot de passe"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          />

          <Button
            onClick={handleLogin}
            loading={loading}
            variant="primary"
            fullWidth
          >
            Se connecter
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-slate-600">
          Pas encore de compte ?{' '}
           <Link
    to="/login"
    className="text-indigo-600 font-bold hover:underline"
  >
    S'inscrire Gratuitement
  </Link>
          
        </p>
      </motion.div>
    </div>
  );
};