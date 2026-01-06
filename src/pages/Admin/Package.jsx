import React, { useState, useEffect } from 'react';
import adminService from '../../api/admin';
import AdminLayout from '../../layouts/AdminLayout'; // Import du Layout

const PackagesPage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // États pour la modale (Création/Édition)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null); // null = mode création
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    type: 'standard',
    price: '',
    description: '',
    features: [''], // Tableau de chaines
    duration_days: 30,
    active: true
  });

  // --- 1. CHARGEMENT ---
  const loadPackages = async () => {
    try {
      setLoading(true);
      const res = await adminService.getPackages();
      setPackages(res.data);
    } catch (e) {
      console.error("Erreur chargement packages", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  // --- 2. GESTION FORMULAIRE ---
  const openModal = (pkg = null) => {
    if (pkg) {
      // Mode Édition : on pré-remplit
      setCurrentPackage(pkg);
      setFormData({
        ...pkg,
        // On s'assure que features est un tableau pour l'affichage
        features: typeof pkg.features === 'string' ? JSON.parse(pkg.features) : (pkg.features || [''])
      });
    } else {
      // Mode Création : on reset
      setCurrentPackage(null);
      setFormData({
        name: '', slug: '', type: 'standard', price: '', description: '', 
        features: [''], duration_days: 30, active: true
      });
    }
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Gestion dynamique des fonctionnalités (Array)
  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeatureField = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeatureField = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  // --- 3. SOUMISSION (CREATE / UPDATE) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Préparation des données (filtrer les features vides)
      const dataToSend = {
        ...formData,
        features: formData.features.filter(f => f.trim() !== '')
      };

      if (currentPackage) {
        // UPDATE
        await adminService.updatePackage(currentPackage.id, dataToSend);
      } else {
        // CREATE
        await adminService.createPackage(dataToSend);
      }
      
      setIsModalOpen(false);
      loadPackages(); // Recharger la liste
    } catch (error) {
      console.error("Erreur sauvegarde", error);
      alert("Erreur lors de la sauvegarde. Vérifiez la console.");
    }
  };

  // --- 4. SUPPRESSION ---
  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce package ?")) {
      try {
        await adminService.deletePackage(id);
        setPackages(prev => prev.filter(p => p.id !== id));
      } catch (error) {
        console.error("Erreur suppression", error);
      }
    }
  };

  // --- BOUTON D'ACTION POUR LE HEADER ---
  const HeaderActions = (
    <button 
      onClick={() => openModal()}
      className="flex items-center gap-2 h-10 px-6 rounded-lg text-white font-bold transition-all hover:bg-red-600 shadow-lg bg-[#EF4444]"
    >
        <span className="material-symbols-rounded">add</span>
        <span>Nouveau</span>
    </button>
  );

  return (
    <AdminLayout title="Gestion des Packages" actions={HeaderActions}>
      
      {loading ? (
        <div className="flex justify-center mt-20">
           <div className="w-10 h-10 border-4 border-[#3A3086] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          
          {/* Carte "Créer Rapide" */}
          <button 
            onClick={() => openModal()}
            className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 rounded-xl hover:border-[#EF4444] hover:bg-red-50 transition-all min-h-[350px] group bg-white"
          >
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#EF4444] group-hover:scale-110 transition-all">
              <span className="material-symbols-rounded text-3xl">add</span>
            </div>
            <div className="mt-4 text-center">
              <h3 className="font-bold text-slate-500 group-hover:text-[#EF4444]">Créer un package</h3>
            </div>
          </button>

          {/* Liste des Packages */}
          {packages.map(pkg => (
            <PackageCard 
              key={pkg.id} 
              pkg={pkg} 
              onEdit={() => openModal(pkg)} 
              onDelete={() => handleDelete(pkg.id)} 
            />
          ))}
        </div>
      )}

      {/* --- MODALE FORMULAIRE --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-slate-800">
                {currentPackage ? 'Modifier le package' : 'Nouveau package'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-red-500">
                <span className="material-symbols-rounded">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Nom</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full border rounded-lg p-2.5 bg-slate-50" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Prix (FCFA)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full border rounded-lg p-2.5 bg-slate-50" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Type</label>
                  <select name="type" value={formData.type} onChange={handleInputChange} className="w-full border rounded-lg p-2.5 bg-slate-50">
                    <option value="flash">Flash</option>
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                    <option value="elite">Elite</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Durée (jours)</label>
                  <input type="number" name="duration_days" value={formData.duration_days} onChange={handleInputChange} className="w-full border rounded-lg p-2.5 bg-slate-50" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full border rounded-lg p-2.5 bg-slate-50" rows="2"></textarea>
              </div>

              {/* Gestion dynamique des features */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Fonctionnalités incluses</label>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input 
                        type="text" 
                        value={feature} 
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        placeholder="Ex: 1 post par semaine"
                        className="flex-1 border rounded-lg p-2 bg-slate-50 text-sm"
                      />
                      <button type="button" onClick={() => removeFeatureField(index)} className="text-red-400 hover:text-red-600">
                        <span className="material-symbols-rounded">delete</span>
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={addFeatureField} className="text-sm text-[#3A3086] font-bold hover:underline flex items-center gap-1 mt-1">
                    <span className="material-symbols-rounded text-sm">add</span> Ajouter une ligne
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" name="active" id="active" checked={formData.active} onChange={handleInputChange} className="w-5 h-5 text-[#3A3086] rounded" />
                <label htmlFor="active" className="text-sm font-bold text-slate-700">Package Actif (Visible sur le site)</label>
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

// Sous-composant Carte
const PackageCard = ({ pkg, onEdit, onDelete }) => {
  const features = typeof pkg.features === 'string' ? JSON.parse(pkg.features) : (pkg.features || []);
  const colors = { secondary: "#3A3086", primary: "#EF4444" };

  return (
    <div className="group flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden h-full relative">
      <div className={`h-1.5 w-full`} style={{background: pkg.active ? colors.secondary : '#9ca3af'}}></div>
      
      {/* Boutons d'action sur la carte */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
        <button onClick={onEdit} className="p-1.5 bg-white shadow-md rounded-full text-blue-600 hover:bg-blue-50" title="Modifier">
          <span className="material-symbols-rounded text-lg">edit</span>
        </button>
        <button onClick={onDelete} className="p-1.5 bg-white shadow-md rounded-full text-red-600 hover:bg-red-50" title="Supprimer">
          <span className="material-symbols-rounded text-lg">delete</span>
        </button>
      </div>

      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-blue-50 rounded-lg text-[#3A3086]">
            <span className="material-symbols-rounded">sell</span>
          </div>
          <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${pkg.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
            {pkg.active ? 'Actif' : 'Inactif'}
          </span>
        </div>
        
        <h3 className="text-lg font-bold mb-2 text-[#3A3086]">{pkg.name}</h3>
        <p className="text-sm text-slate-500 mb-4 line-clamp-2">{pkg.description}</p>
        
        <div className="mb-6">
          <span className="text-2xl font-black text-[#EF4444]">{Number(pkg.price).toLocaleString()} FCFA</span>
        </div>

        <ul className="space-y-2 mb-6 flex-grow">
          {features.slice(0, 4).map((feat, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
              <span className="material-symbols-rounded text-[16px] text-green-500 mt-0.5">check</span>
              <span className="text-xs">{feat}</span>
            </li>
          ))}
          {features.length > 4 && <li className="text-xs text-slate-400 italic">...et {features.length - 4} autres</li>}
        </ul>

        <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
           <span>{pkg.type.toUpperCase()}</span>
           <span>ID: {pkg.id}</span>
        </div>
      </div>
    </div>
  );
};

export { PackagesPage };
export default PackagesPage;