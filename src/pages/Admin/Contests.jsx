import React, { useState, useEffect } from 'react';
import adminService from '../../api/admin';
import AdminLayout from '../../layouts/AdminLayout';

const AdminContests = () => {
  // --- États ---
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // États Modale (Création/Édition)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContest, setCurrentContest] = useState(null);
  
  // Formulaire par défaut
  const initialFormState = {
    title: '',
    type: 'talent', // talent, engagement, conversion...
    objective: '',
    description: '',
    start_date: '',
    end_date: '',
    status: 'draft', // draft, active, ended
    prizes: '', // On le gère en string simple pour l'UI, converti en JSON à l'envoi si besoin
    rules: ''
  };
  const [formData, setFormData] = useState(initialFormState);

  // --- 1. CHARGEMENT DES DONNÉES ---
  const fetchContests = async () => {
    try {
      setLoading(true);
      const response = await adminService.getContests();
      
      // Sécurité : Extraction du tableau
      let data = response.data;
      if (data && data.data && Array.isArray(data.data)) data = data.data;
      if (!Array.isArray(data)) data = [];
      
      setContests(data);
    } catch (error) {
      console.error("Erreur chargement concours", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContests();
  }, []);

  // --- 2. GESTION DU FORMULAIRE ---
  
  // Ouvrir la modale
  const openModal = (contest = null) => {
    if (contest) {
      setCurrentContest(contest);
      // Adaptation des données pour le formulaire
      setFormData({
        ...contest,
        // Conversion des objets/JSON en string pour l'édition simple si nécessaire
        prizes: typeof contest.prizes === 'object' ? JSON.stringify(contest.prizes) : contest.prizes,
        rules: typeof contest.rules === 'object' ? JSON.stringify(contest.rules) : contest.rules,
        // Formatage des dates pour l'input type="date" (YYYY-MM-DD)
        start_date: contest.start_date ? contest.start_date.split('T')[0] : '',
        end_date: contest.end_date ? contest.end_date.split('T')[0] : ''
      });
    } else {
      setCurrentContest(null);
      setFormData(initialFormState);
    }
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- 3. SOUMISSION (CREATE / UPDATE) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Préparation des données (gestion JSON si votre backend attend du JSON)
      const dataToSend = { ...formData };
      
      if (currentContest) {
        await adminService.updateContest(currentContest.id, dataToSend);
      } else {
        await adminService.createContest(dataToSend);
      }
      
      setIsModalOpen(false);
      fetchContests(); // Recharger la liste
    } catch (error) {
      console.error("Erreur sauvegarde", error);
      alert("Une erreur est survenue lors de l'enregistrement.");
    }
  };

  // --- 4. SUPPRESSION ---
  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce concours ?")) {
      try {
        await adminService.deleteContest(id);
        setContests(prev => prev.filter(c => c.id !== id));
      } catch (error) {
        console.error("Erreur suppression", error);
      }
    }
  };

  // --- BOUTON HEADER ---
  const HeaderActions = (
    <button 
      onClick={() => openModal()}
      className="flex items-center gap-2 h-10 px-6 rounded-lg text-white font-bold transition-all hover:bg-red-600 shadow-lg bg-[#EF4444]"
    >
        <span className="material-symbols-rounded">add_circle</span>
        <span>Créer un Concours</span>
    </button>
  );

  return (
    <AdminLayout title="Gestion des Concours" actions={HeaderActions}>
      
      {loading ? (
        <div className="flex justify-center mt-20">
           <div className="w-10 h-10 border-4 border-[#3A3086] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          
          {/* Carte d'ajout rapide */}
          <button 
            onClick={() => openModal()}
            className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 rounded-xl hover:border-[#EF4444] hover:bg-red-50 transition-all min-h-[300px] group bg-white"
          >
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#EF4444] group-hover:scale-110 transition-all">
              <span className="material-symbols-rounded text-3xl">trophy</span>
            </div>
            <div className="mt-4 text-center">
              <h3 className="font-bold text-slate-500 group-hover:text-[#EF4444]">Lancer un nouveau concours</h3>
            </div>
          </button>

          {/* Liste des Concours */}
          {contests.map(contest => (
            <ContestCard 
              key={contest.id} 
              contest={contest} 
              onEdit={() => openModal(contest)} 
              onDelete={() => handleDelete(contest.id)} 
            />
          ))}
        </div>
      )}

      {/* --- MODALE --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-slate-800">
                {currentContest ? 'Modifier le Concours' : 'Nouveau Concours'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-red-500">
                <span className="material-symbols-rounded">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Titre</label>
                  <input required name="title" value={formData.title} onChange={handleInputChange} className="w-full border rounded-lg p-2.5 bg-slate-50 focus:border-[#3A3086] outline-none" placeholder="Ex: Challenge Danse 2024" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Type</label>
                  <select name="type" value={formData.type} onChange={handleInputChange} className="w-full border rounded-lg p-2.5 bg-slate-50 focus:border-[#3A3086] outline-none">
                    <option value="talent">Talent / Artistique</option>
                    <option value="engagement">Engagement Social</option>
                    <option value="quiz">Quiz / Connaissance</option>
                    <option value="event">Événementiel</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Objectif</label>
                <input name="objective" value={formData.objective} onChange={handleInputChange} className="w-full border rounded-lg p-2.5 bg-slate-50 focus:border-[#3A3086] outline-none" placeholder="Ex: Augmenter la visibilité des artistes..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Début</label>
                  <input type="date" name="start_date" value={formData.start_date} onChange={handleInputChange} className="w-full border rounded-lg p-2.5 bg-slate-50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Fin</label>
                  <input type="date" name="end_date" value={formData.end_date} onChange={handleInputChange} className="w-full border rounded-lg p-2.5 bg-slate-50" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full border rounded-lg p-2.5 bg-slate-50 h-24" placeholder="Détails du concours..."></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Prix (Récompenses)</label>
                    <textarea name="prizes" value={formData.prizes} onChange={handleInputChange} className="w-full border rounded-lg p-2.5 bg-slate-50 h-20" placeholder="Liste des prix..."></textarea>
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Règles</label>
                    <textarea name="rules" value={formData.rules} onChange={handleInputChange} className="w-full border rounded-lg p-2.5 bg-slate-50 h-20" placeholder="Règlement succinct..."></textarea>
                 </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="text-sm font-bold text-slate-700">Statut :</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="status" value="draft" checked={formData.status === 'draft'} onChange={handleInputChange} className="accent-gray-500" />
                    <span className="text-sm">Brouillon</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="status" value="active" checked={formData.status === 'active'} onChange={handleInputChange} className="accent-green-600" />
                    <span className="text-sm font-bold text-green-700">Actif</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="status" value="ended" checked={formData.status === 'ended'} onChange={handleInputChange} className="accent-red-500" />
                    <span className="text-sm">Terminé</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex gap-3 justify-end border-t border-slate-100 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-600 font-bold hover:bg-slate-50">Annuler</button>
                <button type="submit" className="px-5 py-2.5 rounded-lg bg-[#3A3086] text-white font-bold hover:bg-indigo-900 shadow-lg">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AdminLayout>
  );
};

// --- SOUS-COMPOSANT CARTE ---
const ContestCard = ({ contest, onEdit, onDelete }) => {
  // Helpers
  const getStatusBadge = (status) => {
    switch(status) {
      case 'active': return <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-black uppercase flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span> En cours</span>;
      case 'ended': return <span className="px-2 py-1 rounded bg-slate-100 text-slate-500 text-xs font-bold uppercase">Terminé</span>;
      default: return <span className="px-2 py-1 rounded bg-orange-100 text-orange-600 text-xs font-bold uppercase">Brouillon</span>;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col h-full relative">
      {/* Bandeau Couleur Type */}
      <div className={`h-1.5 w-full ${contest.status === 'active' ? 'bg-[#EF4444]' : 'bg-slate-300'}`}></div>
      
      {/* Actions (Hover) */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-10">
        <button onClick={onEdit} className="p-2 bg-white shadow-md rounded-full text-[#3A3086] hover:bg-indigo-50 border border-slate-100" title="Modifier">
          <span className="material-symbols-rounded text-lg">edit</span>
        </button>
        <button onClick={onDelete} className="p-2 bg-white shadow-md rounded-full text-red-600 hover:bg-red-50 border border-slate-100" title="Supprimer">
          <span className="material-symbols-rounded text-lg">delete</span>
        </button>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 bg-slate-50 rounded-lg text-[#3A3086] border border-slate-100">
            <span className="material-symbols-rounded text-2xl">emoji_events</span>
          </div>
          {getStatusBadge(contest.status)}
        </div>

        <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight">{contest.title}</h3>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-3">{contest.type}</p>
        
        <p className="text-sm text-slate-500 mb-4 line-clamp-2 flex-grow">
          {contest.description || "Aucune description fournie."}
        </p>

        {/* Dates */}
        <div className="flex items-center gap-3 text-xs font-medium text-slate-600 bg-slate-50 p-2 rounded-lg mb-4">
          <span className="material-symbols-rounded text-sm text-[#EF4444]">calendar_month</span>
          <span>{formatDate(contest.start_date)} - {formatDate(contest.end_date)}</span>
        </div>

        {/* Footer Stats (Exemple) */}
        <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
           <div className="flex items-center gap-1 text-slate-500">
             <span className="material-symbols-rounded text-sm">group</span>
             <span>{contest.participants_count || 0} participants</span>
           </div>
           <button className="text-[#3A3086] font-bold hover:underline">Voir détails</button>
        </div>
      </div>
    </div>
  );
};

export {AdminContests};

export default AdminContests;
