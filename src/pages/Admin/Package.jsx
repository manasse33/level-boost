import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { 
  Package, Plus, Trash2, Edit2, X, Check, 
  List, DollarSign, Image, Video, Calendar 
} from 'lucide-react';

export function PackagesPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);

  // Structure initiale du formulaire basée sur votre Schema
  const initialFormState = {
    name: '',
    slug: '',
    type: 'basique',
    price: '',
    description: '',
    features: [], // JSON array
    duration_days: 30,
    posts_count: 0,
    stories_count: 0,
    video_included: false,
    photo_session_included: false,
    ad_budget_suggested: '',
    priority: 0,
    active: true
  };

  const [formData, setFormData] = useState(initialFormState);
  const [tempFeature, setTempFeature] = useState(''); // Pour l'ajout d'une feature

  // --- Chargement des données ---
  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await api.get('/admin/packages');
      setPackages(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur chargement packages", error);
      setLoading(false);
    }
  };

  // --- Helpers ---
  const generateSlug = (text) => {
    return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setFormData(prev => ({ 
      ...prev, 
      name, 
      slug: prev.slug || generateSlug(name) // Génère le slug si vide
    }));
  };

  // --- Gestion de la liste JSON (Features) ---
  const addFeature = () => {
    if (tempFeature.trim()) {
      setFormData({ ...formData, features: [...formData.features, tempFeature] });
      setTempFeature('');
    }
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  // --- Soumission (Create & Update) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPackage) {
        await api.put(`/admin/packages/${editingPackage.id}`, formData);
        alert('Package mis à jour !');
      } else {
        await api.post('/admin/packages', formData);
        alert('Package créé !');
      }
      closeModal();
      fetchPackages();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'enregistrement. Vérifiez les champs (ex: Slug unique).");
    }
  };

  // --- Actions UI ---
  const openEdit = (pkg) => {
    // S'assurer que features est bien un array (parfois le backend renvoie une string JSON)
    const featuresArray = Array.isArray(pkg.features) 
      ? pkg.features 
      : JSON.parse(pkg.features || '[]');

    setFormData({ ...pkg, features: featuresArray });
    setEditingPackage(pkg);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPackage(null);
    setFormData(initialFormState);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce package définitivement ?")) {
      try {
        await api.delete(`/admin/packages/${id}`);
        setPackages(packages.filter(p => p.id !== id));
      } catch (error) {
        alert("Erreur suppression");
      }
    }
  };

  // Liste des types (Enum)
  const types = ['flash', 'hebdo', 'decouverte', 'basique', 'standard', 'premium', 'elite', 'event', 'association', 'influencer', 'carte'];

  return (
    <div className="p-6 max-w-7xl mx-auto bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
          <Package className="text-blue-600" /> Gestion des Packages
        </h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Plus size={18} /> Nouveau Package
        </button>
      </div>

      {/* --- LISTE (GRID) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map(pkg => (
          <div key={pkg.id} className={`bg-white rounded-xl shadow border p-5 ${!pkg.active ? 'opacity-60 grayscale' : ''}`}>
            <div className="flex justify-between items-start mb-2">
              <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${pkg.active ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-600'}`}>
                {pkg.type}
              </span>
              <div className="flex gap-2">
                <button onClick={() => openEdit(pkg)} className="text-slate-500 hover:text-blue-600"><Edit2 size={18}/></button>
                <button onClick={() => handleDelete(pkg.id)} className="text-slate-500 hover:text-red-600"><Trash2 size={18}/></button>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-1">{pkg.name}</h3>
            <p className="text-2xl font-bold text-blue-600 mb-4">{Number(pkg.price).toLocaleString()} FCFA</p>
            
            <div className="space-y-2 text-sm text-slate-600 mb-4">
              <div className="flex items-center gap-2"><Calendar size={14}/> {pkg.duration_days} jours</div>
              <div className="flex items-center gap-2"><Image size={14}/> {pkg.posts_count} Posts / {pkg.stories_count} Stories</div>
              {pkg.video_included && <div className="flex items-center gap-2 text-green-600"><Video size={14}/> Vidéo incluse</div>}
            </div>

            <div className="flex flex-wrap gap-1">
              {/* Affichage des 3 premières features */}
              {(Array.isArray(pkg.features) ? pkg.features : []).slice(0, 3).map((f, i) => (
                <span key={i} className="text-[10px] bg-slate-100 px-2 py-1 rounded-full text-slate-600">{f}</span>
              ))}
              {(Array.isArray(pkg.features) ? pkg.features : []).length > 3 && <span className="text-[10px] text-slate-400">+...</span>}
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL FORM --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold">{editingPackage ? 'Modifier' : 'Créer'} un Package</h2>
              <button onClick={closeModal}><X size={24} className="text-slate-400 hover:text-red-500"/></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Ligne 1 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Nom</label>
                  <input required type="text" value={formData.name} onChange={handleNameChange} className="w-full border rounded p-2" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Slug</label>
                  <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full border rounded p-2 bg-slate-50" />
                </div>
              </div>

              {/* Ligne 2 */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Type</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full border rounded p-2">
                    {types.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Prix</label>
                  <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full border rounded p-2" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Durée (jours)</label>
                  <input type="number" value={formData.duration_days} onChange={e => setFormData({...formData, duration_days: e.target.value})} className="w-full border rounded p-2" />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Description</label>
                <textarea required rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border rounded p-2"></textarea>
              </div>

              {/* Contenu (Posts/Stories/Options) */}
              <div className="p-4 bg-slate-50 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                   <label className="block text-xs font-bold mb-1">Nb Posts</label>
                   <input type="number" value={formData.posts_count} onChange={e => setFormData({...formData, posts_count: e.target.value})} className="w-full border rounded p-1" />
                </div>
                <div>
                   <label className="block text-xs font-bold mb-1">Nb Stories</label>
                   <input type="number" value={formData.stories_count} onChange={e => setFormData({...formData, stories_count: e.target.value})} className="w-full border rounded p-1" />
                </div>
                <div className="flex items-center gap-2 pt-4">
                  <input type="checkbox" checked={formData.video_included} onChange={e => setFormData({...formData, video_included: e.target.checked})} className="w-4 h-4" />
                  <span className="text-sm">Vidéo ?</span>
                </div>
                <div className="flex items-center gap-2 pt-4">
                  <input type="checkbox" checked={formData.photo_session_included} onChange={e => setFormData({...formData, photo_session_included: e.target.checked})} className="w-4 h-4" />
                  <span className="text-sm">Photos ?</span>
                </div>
              </div>

              {/* Features (Liste dynamique) */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Fonctionnalités incluses</label>
                <div className="flex gap-2 mb-2">
                  <input 
                    type="text" 
                    value={tempFeature} 
                    onChange={e => setTempFeature(e.target.value)} 
                    placeholder="Ex: Support 24/7"
                    className="flex-1 border rounded p-2"
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  />
                  <button type="button" onClick={addFeature} className="bg-slate-200 px-3 rounded hover:bg-slate-300"><Plus size={16}/></button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.features.map((f, i) => (
                    <span key={i} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm flex items-center gap-1">
                      {f} <button type="button" onClick={() => removeFeature(i)}><X size={12}/></button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Form */}
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex items-center gap-2">
                   <input type="checkbox" checked={formData.active} onChange={e => setFormData({...formData, active: e.target.checked})} className="w-5 h-5 text-blue-600" />
                   <span className="font-bold text-slate-700">Package Actif</span>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={closeModal} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded">Annuler</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold">Enregistrer</button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
  
}
