import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Mail, Lock, Eye, EyeOff, 
  Star, AlertCircle, Loader2
} from 'lucide-react';

import authService from '../../api/auth'; 

export function LoginPage() {
  const navigate = useNavigate();
  
  // UI State
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Form Data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        // --- CONNEXION ---
        const response = await authService.login({ email, password });
        
        // On récupère le rôle pour savoir où rediriger
        const userRole = response.user?.role;
        
        // Liste des rôles qui ont accès au panneau Admin
        const staffRoles = ['admin', 'cm', 'da', 'sales'];

        // UTILISATION DE WINDOW.LOCATION.HREF
        // Cela force le rechargement de la page pour que le AuthContext 
        // récupère bien le token dans le localStorage immédiatement.
        if (staffRoles.includes(userRole)) {
            window.location.href = '/admin'; // Redirection Staff
        } else {
            window.location.href = '/dashboard'; // Redirection Client
        }

      } else {
        // --- INSCRIPTION ---
        if (password !== confirmPassword) {
            throw { message: "Les mots de passe ne correspondent pas." };
        }

        await authService.register({ 
            name, 
            email, 
            password, 
            password_confirmation: confirmPassword 
        });
        
        // Une inscription est forcément un client => Dashboard
        window.location.href = '/dashboard';
      }
    } catch (err) {
      console.error("Erreur Auth:", err);
      const msg = err.response?.data?.message || err.message || "Une erreur est survenue.";
      setError(msg);
      setIsLoading(false); // On arrête le chargement en cas d'erreur
    }
  };

  const toggleMode = (mode) => {
    setIsLogin(mode);
    setError('');
  };

  return (
    <div className="flex h-screen w-full bg-white dark:bg-slate-900 overflow-hidden">
      
      {/* PARTIE GAUCHE */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=2070&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/20" />
        
        <div className="relative z-10 flex flex-col justify-between p-12 w-full h-full text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/30">
              LB
            </div>
            <span className="text-2xl font-bold tracking-tight">Level Boost</span>
          </div>

          <div className="space-y-6 max-w-lg mb-10">
            <div className="flex gap-1 text-yellow-400">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-5 h-5 fill-current" />)}
            </div>
            <blockquote className="text-3xl font-medium leading-tight">
              "Level Boost a transformé ma carrière. Je suis passé de l'ombre à la lumière en moins de 3 mois."
            </blockquote>
            <div className="flex items-center gap-4">
              <img src="https://i.pravatar.cc/100?img=33" alt="User" className="w-12 h-12 rounded-full border-2 border-white/20" />
              <div>
                <p className="font-bold">Sarah Connor</p>
                <p className="text-slate-400 text-sm">Artiste Pop & influenceuse</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PARTIE DROITE */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-20 xl:px-24 bg-white dark:bg-slate-900 relative">
        
        <button 
          onClick={() => navigate('/')} 
          className="absolute top-8 right-8 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </button>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {isLogin ? 'Connexion' : 'Créer un compte'}
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {isLogin ? 'Accédez à votre espace membre.' : 'Commencez votre aventure.'}
            </p>
          </div>

          {/* Erreurs */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Switcher */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6">
            <button
              onClick={() => toggleMode(true)}
              className={`py-2 text-sm font-medium rounded-lg transition-all ${
                isLogin 
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => toggleMode(false)}
              className={`py-2 text-sm font-medium rounded-lg transition-all ${
                !isLogin 
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
              }`}
            >
              Inscription
            </button>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
               <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nom complet</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none dark:text-white"
                  placeholder="Jean Dupont"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none dark:text-white"
                  placeholder="exemple@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none dark:text-white"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Confirmer le mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none dark:text-white"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 rounded-xl shadow-lg shadow-blue-600/20 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all mt-4 disabled:opacity-70"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLogin ? 'Se connecter' : "S'inscrire")}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-slate-900 text-slate-500">Ou continuer avec</span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-3 gap-3">
              <button className="flex justify-center items-center py-2 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors dark:text-white">
                <span className="text-xs font-bold">Google</span>
              </button>
              <button className="flex justify-center items-center py-2 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors dark:text-white">
                 <span className="text-xs font-bold">Apple</span>
              </button>
              <button className="flex justify-center items-center py-2 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors dark:text-white">
                 <span className="text-xs font-bold">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;