import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { 
  Trophy, Plus, Trash2, Edit2, X, Calendar, Flag 
} from 'lucide-react';

export function ContestsPages() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContest, setEditingContest] = useState(null);

  // Schema correspondant à la migration Laravel
  const initialFormState = {
    title: '',
    slug: '',
    description: '',
    type: 'engagement',
    objective: '',
    rules: [], // JSON
    prizes: [], // JSON
    status: 'draft',
    started_at: '', // DateTime
    ended_at: '',
    winner_announced_at: '',
    voting_enabled: true,
    featured: false
  };

  const [formData, setFormData] = useState(initialFormState);
  
  // States temporaires pour les listes
  const [tempRule, setTempRule] = useState('');
  const [tempPrize, setTempPrize] = useState('');

  useEffect(() => {
    fetchContests();
  }, []);

  const fetchContests = async () => {
    try {
      const res = await api.get('/admin/contests');
      setContests(res.data.data || res.data); // Gère pagination ou array direct
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData(prev => ({ 
      ...prev, 
      title, 
      slug: prev.slug || title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
    }));
  };

  // --- Gestion des listes JSON ---
  const addItem = (field, value, setter) => {
    if (value.trim()) {
      setFormData(prev => ({ ...prev, [field]: [...prev[field], value] }));
      setter('');
    }
  };

  const removeItem = (field, index) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: prev[field].filter((_, i) => i !== index) 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingContest) {
        await api.put(`/admin/contests/${editingContest.id}`, formData);
        alert("Concours mis à jour");
      } else {
        await api.post('/admin/contests', formData);
        alert("Concours créé");
      }
      closeModal();
      fetchContests();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'enregistrement");
    }
  };

  const openEdit = (contest) => {
    // Conversion sûre des JSON si nécessaire
    const rules = Array.isArray(contest.rules) ? contest.rules : JSON.parse(contest.rules || '[]');
    const prizes = Array.isArray(contest.prizes) ? contest.prizes : JSON.parse(contest.prizes || '[]');
    
    // Formatage dates pour input datetime-local (YYYY-MM-DDTHH:MM)
    const formatDate = (date) => date ? new Date(date).toISOString().slice(0, 16) : '';

    setFormData({
      ...contest,
      rules,
      prizes,
      started_at: formatDate(contest.started_at),
      ended_at: formatDate(contest.ended_at),
      winner_announced_at: formatDate(contest.winner_announced_at),
    });
    setEditingContest(contest);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingContest(null);
    setFormData(initialFormState);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce concours ?")) {
      try {
        await api.delete(`/admin/contests/${id}`);
        setContests(contests.filter(c => c.id !== id));
      } catch (error) {
        alert("Erreur suppression");
      }
    }
  };

  const types = ['talent', 'engagement', 'conversion', 'community', 'sourcing', 'event', 'social', 'premium'];
  const statuses = ['draft', 'active', 'ended', 'cancelled'];

  return (
    <div className="p-6 max-w-7xl mx-auto bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
          <Trophy className="text-yellow-600" /> Gestion des Concours
        </h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Plus size={18} /> Nouveau Concours
        </button>
      </div>

      {/* --- LISTE --- */}
      <div className="space-y-4">
        {contests.map(contest => (
          <div key={contest.id} className="bg-white p-5 rounded-xl shadow border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                 <h3 className="text-lg font-bold">{contest.title}</h3>
                 <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase border ${
                   contest.status === 'active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500'
                 }`}>{contest.status}</span>
                 {contest.featured && <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full border border-yellow-200">Mise en avant</span>}
              </div>
              <p className="text-sm text-slate-500 mb-2 line-clamp-1">{contest.description}</p>
              <div className="flex gap-4 text-xs text-slate-400">
                 <span>Du : {new Date(contest.started_at).toLocaleDateString()}</span>
                 <span>Au : {contest.ended_at ? new Date(contest.ended_at).toLocaleDateString() : 'Indéfini'}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button onClick={() => openEdit(contest)} className="p-2 hover:bg-blue-50 text-blue-600 rounded"><Edit2 size={20}/></button>
              <button onClick={() => handleDelete(contest.id)} className="p-2 hover:bg-red-50 text-red-600 rounded"><Trash2 size={20}/></button>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold">{editingContest ? 'Modifier' : 'Nouveau'} Concours</h2>
              <button onClick={closeModal}><X size={24} className="text-slate-400"/></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              
              {/* Infos de base */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                   <label className="block text-xs font-bold text-slate-500 mb-1">Titre</label>
                   <input required type="text" value={formData.title} onChange={handleTitleChange} className="w-full border rounded p-2" />
                </div>
                <div>
                   <label className="block text-xs font-bold text-slate-500 mb-1">Slug</label>
                   <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full border rounded p-2 bg-slate-50" />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                   <label className="block text-xs font-bold text-slate-500 mb-1">Type</label>
                   <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full border rounded p-2">
                     {types.map(t => <option key={t} value={t}>{t}</option>)}
                   </select>
                </div>
                <div>
                   <label className="block text-xs font-bold text-slate-500 mb-1">Statut</label>
                   <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full border rounded p-2 font-bold text-blue-600">
                     {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                   </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Début</label>
                  <input required type="datetime-local" value={formData.started_at} onChange={e => setFormData({...formData, started_at: e.target.value})} className="w-full border rounded p-2 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Fin</label>
                  <input type="datetime-local" value={formData.ended_at} onChange={e => setFormData({...formData, ended_at: e.target.value})} className="w-full border rounded p-2 text-xs" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Description</label>
                <textarea rows="2" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border rounded p-2"></textarea>
              </div>

              {/* Règles et Prix (Listes dynamiques) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Règles */}
                <div className="bg-slate-50 p-4 rounded-lg">
                   <label className="block text-xs font-bold text-slate-700 mb-2">Règles du jeu</label>
                   <div className="flex gap-2 mb-2">
                      <input type="text" value={tempRule} onChange={e => setTempRule(e.target.value)} placeholder="Ajouter une règle..." className="flex-1 border rounded p-1 text-sm" />
                      <button type="button" onClick={() => addItem('rules', tempRule, setTempRule)} className="bg-slate-200 px-2 rounded"><Plus size={16}/></button>
                   </div>
                   <ul className="list-disc pl-4 space-y-1">
                      {formData.rules.map((r, i) => (
                        <li key={i} className="text-xs text-slate-600 flex justify-between items-start">
                          <span>{r}</span>
                          <button type="button" onClick={() => removeItem('rules', i)} className="text-red-400 hover:text-red-600"><X size={12}/></button>
                        </li>
                      ))}
                   </ul>
                </div>

                {/* Prix */}
                <div className="bg-yellow-50/50 p-4 rounded-lg border border-yellow-100">
                   <label className="block text-xs font-bold text-yellow-700 mb-2">Prix à gagner</label>
                   <div className="flex gap-2 mb-2">
                      <input type="text" value={tempPrize} onChange={e => setTempPrize(e.target.value)} placeholder="Ajouter un prix..." className="flex-1 border rounded p-1 text-sm" />
                      <button type="button" onClick={() => addItem('prizes', tempPrize, setTempPrize)} className="bg-yellow-200 px-2 rounded"><Plus size={16}/></button>
                   </div>
                   <ul className="space-y-1">
                      {formData.prizes.map((p, i) => (
                        <li key={i} className="text-xs text-slate-600 flex justify-between items-center bg-white p-1 rounded border border-yellow-100">
                          <span className="flex items-center gap-1"><Trophy size={10} className="text-yellow-500"/> {p}</span>
                          <button type="button" onClick={() => removeItem('prizes', i)} className="text-red-400 hover:text-red-600"><X size={12}/></button>
                        </li>
                      ))}
                   </ul>
                </div>
              </div>

              {/* Options */}
              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.voting_enabled} onChange={e => setFormData({...formData, voting_enabled: e.target.checked})} className="w-4 h-4 text-blue-600 rounded" />
                  <span className="text-sm font-medium">Votes activés</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-4 h-4 text-yellow-500 rounded" />
                  <span className="text-sm font-medium">Mettre en avant (Featured)</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t mt-4">
                 <button type="button" onClick={closeModal} className="px-4 py-2 rounded text-slate-600 hover:bg-slate-100">Annuler</button>
                 <button type="submit" className="px-6 py-2 rounded bg-blue-600 text-white font-bold hover:bg-blue-700">Sauvegarder</button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}