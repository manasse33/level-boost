import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { 
  Calendar, Trophy, Users, Clock, CheckCircle, 
  ArrowLeft, Share2, AlertCircle, Loader2, Link as LinkIcon 
} from 'lucide-react';

export function ContestDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // --- States ---
  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Formulaire de participation
  const [submission, setSubmission] = useState({
    link: '',
    message: ''
  });

  // --- Chargement ---
  useEffect(() => {
    const fetchContest = async () => {
      try {
        const res = await api.get(`/contests/${slug}`);
        setContest(res.data.data || res.data); 
        setLoading(false);
      } catch (error) {
        console.error("Erreur chargement:", error);
        navigate('/contests');
      }
    };
    fetchContest();
  }, [slug, navigate]);

  // --- Helpers ---
  const formatDate = (date) => new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  const getStatusBadge = (status) => {
    const styles = {
      active: "bg-green-100 text-green-700 border-green-200",
      ended: "bg-red-100 text-red-700 border-red-200",
      draft: "bg-gray-100 text-gray-700 border-gray-200"
    };
    return styles[status] || styles.draft;
  };

  /**
   * --- CORRECTION ---
   * Cette fonction sécurise les listes (prizes, rules).
   * Elle gère les cas où l'API renvoie une String JSON, une String simple ou null.
   */
  const ensureArray = (data) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    
    // Si c'est une chaîne, on essaie de la parser comme du JSON (ex: "['Prix 1', 'Prix 2']")
    if (typeof data === 'string') {
      try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [data];
      } catch (e) {
        // Ce n'est pas du JSON, on retourne la string comme unique élément du tableau
        return [data];
      }
    }
    return [];
  };

  // --- Action : Participer ---
  const handleParticipate = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        submission_data: {
          link: submission.link,
          message: submission.message,
          submitted_at: new Date().toISOString()
        }
      };

      await api.post(`/contests/${contest.id}/participate`, payload);
      
      alert("Félicitations ! Votre participation a été enregistrée.");
      setIsModalOpen(false);
      setContest(prev => ({ ...prev, participation_count: prev.participation_count + 1 }));

    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        alert("Vous devez être connecté pour participer.");
        navigate('/login', { state: { from: `/contests/${slug}` } });
      } else if (error.response?.status === 409) {
        alert("Vous participez déjà à ce concours !");
      } else {
        alert("Une erreur est survenue. Réessayez.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600 w-10 h-10"/></div>;
  if (!contest) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
      
      {/* --- HERO HEADER --- */}
      <div className="relative h-64 md:h-80 bg-slate-900">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url('https://source.unsplash.com/random/1200x600/?${contest.type}')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>

        <div className="absolute top-6 left-6 z-10">
          <button onClick={() => navigate('/contests')} className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
            <ArrowLeft size={18} /> Retour aux défis
          </button>
        </div>

        <div className="absolute bottom-0 w-full p-6 md:p-10 max-w-7xl mx-auto left-0 right-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase mb-3 border ${getStatusBadge(contest.status)}`}>
                {contest.status === 'active' ? 'En cours' : contest.status}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{contest.title}</h1>
              <div className="flex items-center gap-4 text-slate-300 text-sm">
                <span className="flex items-center gap-1"><Users size={16}/> {contest.participation_count} participants</span>
                <span className="flex items-center gap-1"><Calendar size={16}/> Fin le {new Date(contest.ended_at).toLocaleDateString()}</span>
              </div>
            </div>
            
            {contest.status === 'active' && (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-1"
              >
                Participer au défi
              </button>
            )}
          </div>
        </div>
      </div>

      {/* --- CONTENT GRID --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Colonne Gauche (Détails) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Description */}
          <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="text-blue-600" /> À propos du défi
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {contest.description}
            </p>
          </section>

          {/* Règles - CORRIGÉ AVEC ensureArray */}
          <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle className="text-green-600" /> Règles à respecter
            </h2>
            <ul className="space-y-3">
              {ensureArray(contest.rules).map((rule, idx) => (
                <li key={idx} className="flex gap-3 text-slate-600 dark:text-slate-300">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </section>

        </div>

        {/* Colonne Droite (Sidebar) */}
        <div className="space-y-6">
          
          {/* Prix - CORRIGÉ AVEC ensureArray */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-slate-800 dark:to-slate-800 p-6 rounded-2xl border border-yellow-100 dark:border-slate-700 shadow-sm">
            <h3 className="text-lg font-bold text-yellow-800 dark:text-yellow-500 mb-4 flex items-center gap-2">
              <Trophy className="fill-current" /> Récompenses
            </h3>
            <ul className="space-y-3">
              {ensureArray(contest.prizes).map((prize, idx) => (
                <li key={idx} className="flex items-center gap-3 bg-white dark:bg-slate-700 p-3 rounded-xl border border-yellow-100 dark:border-slate-600 shadow-sm">
                  <div className="text-2xl">
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
                  </div>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{prize}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Infos Dates */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-bold mb-4">Calendrier</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase">Lancement</p>
                  <p className="text-sm font-medium">{formatDate(contest.started_at)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase">Date limite</p>
                  <p className="text-sm font-medium">{formatDate(contest.ended_at)}</p>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors">
            <Share2 size={18} /> Partager ce défi
          </button>

        </div>
      </main>

      {/* --- MODAL PARTICIPATION --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <h3 className="text-xl font-bold">Je participe ! 🚀</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">Fermer</button>
            </div>

            <form onSubmit={handleParticipate} className="p-6 space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-sm text-blue-800 dark:text-blue-300 mb-4">
                Pour participer, soumettez un lien vers votre travail (Google Drive, YouTube, Portfolio, etc.) et ajoutez une courte description.
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Lien vers votre création</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                  <input 
                    type="url" 
                    required
                    placeholder="https://..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={submission.link}
                    onChange={e => setSubmission({...submission, link: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Message (Optionnel)</label>
                <textarea 
                  rows="3"
                  placeholder="Dites-nous en plus sur votre projet..."
                  className="w-full p-4 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={submission.message}
                  onChange={e => setSubmission({...submission, message: e.target.value})}
                ></textarea>
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitting ? <Loader2 className="animate-spin" /> : 'Envoyer ma participation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default ContestDetailsPage;