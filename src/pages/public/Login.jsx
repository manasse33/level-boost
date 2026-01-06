import React, { useState } from 'react';
import authService from '../../api/auth'; 
import { ROLES } from '../../utils/rbac'; // Import des rôles

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const colors = { primary: "#EF4444", secondary: "#3A3086", accentYellow: "#FBBF24" };
  const patternStyle = { backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233A3086' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await authService.login(formData);
      
      // Récupération du rôle
      const userRole = response.user?.role;

      // Redirection conditionnelle
      if (userRole === ROLES.CLIENT) {
        // Le client va sur son dashboard spécifique (si différent) ou le général
        window.location.href = '/admin/dashboard'; 
      } else {
        // Staff (Admin, Sales, CM, DA)
        window.location.href = '/admin/dashboard';
      }

    } catch (err) {
      const message = err.response?.data?.message || 'Identifiants invalides.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  // ... (Le reste du JSX reste identique à votre version, pas de changement visuel nécessaire)
  // ... Copiez votre JSX existant ici ...
  
  // Pour le test, je remets juste le return simplifié pour valider la logique JS ci-dessus
  return (
     <div className="bg-[#F9FAFB] dark:bg-[#111827] font-['Manrope',sans-serif] text-[#111827] h-screen w-screen overflow-hidden flex">
        {/* ... Votre code JSX existant ... */}
        {/* Je ne le répète pas pour ne pas surcharger la réponse, gardez votre JSX exact */}
        <div className="w-full flex items-center justify-center">
            {/* Juste pour montrer où s'intègre le formulaire */}
            <form onSubmit={handleLogin} className="flex flex-col gap-5 w-full max-w-md p-8 bg-white rounded-3xl shadow-xl">
                {/* ... Vos inputs ... */}
                <h2 className="text-2xl font-bold mb-4">Connexion</h2>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                
                <input id="email" type="email" value={formData.email} onChange={handleChange} className="border p-3 rounded-xl" placeholder="Email" required />
                <input id="password" type="password" value={formData.password} onChange={handleChange} className="border p-3 rounded-xl" placeholder="Mot de passe" required />
                
                <button type="submit" disabled={isLoading} className="bg-[#EF4444] text-white p-3 rounded-xl font-bold">
                    {isLoading ? 'Chargement...' : 'Se connecter'}
                </button>
            </form>
        </div>
     </div>
  );
};

export {LoginPage};
export default LoginPage;