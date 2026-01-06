import React, { useState, useEffect } from 'react';
import adminService from '../../api/admin';
import AdminLayout from '../../layouts/AdminLayout'; // Assurez-vous du bon chemin

const AdminLeads = () => {
  // --- États ---
  const [leads, setLeads] = useState([]);
  const [users, setUsers] = useState([]); // Pour l'assignation
  const [selectedLead, setSelectedLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(''); // Pour les messages d'erreur API

  // États Modale Création
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', 
    status: 'new', source: 'website', type: 'business'
  });

  // --- Chargement initial des données ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setErrorMessage(''); // Réinitialiser les erreurs
        const [leadsRes, usersRes] = await Promise.all([
          adminService.getLeads(),
          adminService.getUsers()
        ]);
        
        // --- TRAITEMENT DES LEADS ---
        let leadsData = leadsRes.data;
        if (leadsData && leadsData.data && Array.isArray(leadsData.data)) {
          leadsData = leadsData.data;
        }
        if (!Array.isArray(leadsData)) {
          console.error("Format de leads inattendu:", leadsData);
          leadsData = [];
        }
        setLeads(leadsData);

        // --- TRAITEMENT DES USERS ---
        let usersData = usersRes.data;
        if (usersData && usersData.data && Array.isArray(usersData.data)) {
          usersData = usersData.data;
        }
        if (!Array.isArray(usersData)) {
          console.error("Format d'utilisateurs inattendu:", usersData);
          usersData = [];
        }
        setUsers(usersData);

        // Sélection par défaut du premier lead si disponible
        if (leadsData.length > 0) {
          setSelectedLead(leadsData[0]);
        }
      } catch (error) {
        console.error("Erreur chargement des données:", error);
        setErrorMessage("Impossible de charger les données. Veuillez réessayer.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- Gestion Création de Lead ---
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const res = await adminService.createLead(formData);
      // Ajout du nouveau lead en haut de liste
      setLeads(prevLeads => [res.data, ...prevLeads]); 
      setSelectedLead(res.data);
      setIsModalOpen(false);
      // Réinitialiser le formulaire
      setFormData({ name: '', email: '', phone: '', company: '', status: 'new', source: 'website', type: 'business' });
    } catch (error) {
      console.error("Erreur création du lead:", error);
      setErrorMessage("Échec de la création du lead. Vérifiez les champs.");
    }
  };

  // --- Gestion Mise à jour (Statut / Assignation) ---
  const handleUpdateLead = async (key, value) => {
    if (!selectedLead) return;
    
    try {
      const payload = { [key]: value };
      await adminService.updateLead(selectedLead.id, payload);

      // Mise à jour optimiste de l'UI
      const updatedLead = { ...selectedLead, [key]: value };
      setSelectedLead(updatedLead);
      setLeads(prevLeads => prevLeads.map(l => l.id === updatedLead.id ? updatedLead : l));
    } catch (error) {
      console.error(`Erreur mise à jour ${key}:`, error);
      setErrorMessage(`Impossible de mettre à jour le ${key}.`);
      // Revert l'UI si l'API échoue (nécessite de stocker l'état précédent)
      // Ou recharger les leads si la complexité de l'état n'est pas gérable
    }
  };

  // --- Gestion Conversion en Client ---
  const handleConvertLead = async () => {
    if (!selectedLead || selectedLead.status !== 'won') {
      alert("Seuls les leads avec le statut 'Gagné (Won)' peuvent être convertis en clients.");
      return;
    }

    if (!window.confirm(`Voulez-vous convertir le lead "${selectedLead.name}" en client ?`)) {
      return;
    }

    try {
      const response = await adminService.convertLead(selectedLead.id);
      alert(`Lead "${selectedLead.name}" converti en client avec succès!`);
      
      // Optionnel: Mettre à jour le statut du lead ou le retirer de la liste
      const updatedLead = { ...selectedLead, status: 'converted_to_client' }; // Si vous avez un tel statut
      setSelectedLead(null); // Désélectionne le lead
      setLeads(prevLeads => prevLeads.filter(l => l.id !== selectedLead.id)); // Retire de la liste des leads
      console.log("Nouveau client créé:", response.data);

    } catch (error) {
      console.error("Erreur conversion du lead:", error);
      const msg = error.response?.data?.message || "Échec de la conversion du lead.";
      alert(msg);
    }
  };


  // Helper Couleurs Statut
  const getStatusColor = (status) => {
    const map = {
      'new': 'bg-blue-100 text-blue-700 border-blue-200',
      'contacted': 'bg-purple-100 text-purple-700 border-purple-200',
      'qualified': 'bg-green-100 text-green-700 border-green-200',
      'negotiation': 'bg-amber-100 text-amber-700 border-amber-200',
      'won': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'lost': 'bg-red-100 text-red-700 border-red-200',
      'converted_to_client': 'bg-slate-100 text-slate-600 border-slate-200' // Nouveau statut pour l'UI
    };
    return map[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  // Label pour le statut
  const getStatusLabel = (status) => {
    const labels = {
      'new': 'Nouveau',
      'contacted': 'Contacté',
      'qualified': 'Qualifié',
      'negotiation': 'Négociation',
      'won': 'Gagné',
      'lost': 'Perdu',
      'converted_to_client': 'Converti'
    };
    return labels[status] || status;
  };

  // Bouton d'action pour le Header
  const HeaderActions = (
    <button 
      onClick={() => setIsModalOpen(true)}
      className="flex items-center gap-2 h-10 px-6 rounded-lg text-white font-bold transition-all hover:bg-indigo-700 shadow-lg bg-[#3A3086]"
    >
        <span className="material-symbols-rounded">person_add</span>
        <span>Nouveau Lead</span>
    </button>
  );

  return (
    <AdminLayout title="Gestion des Leads" actions={HeaderActions}>
      
      {/* Affichage des messages d'erreur API */}
      {errorMessage && (
        <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg relative mb-4">
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)]">
        
        {/* --- COLONNE GAUCHE : LISTE --- */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          {/* Toolbar de recherche locale si besoin */}
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <span className="text-xs font-bold uppercase text-slate-400">{leads.length} Leads trouvés</span>
            <div className="flex gap-2">
               <button className="p-1 text-slate-400 hover:text-[#3A3086]"><span className="material-symbols-rounded">filter_list</span></button>
               <button className="p-1 text-slate-400 hover:text-[#3A3086]"><span className="material-symbols-rounded">sort</span></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {loading ? (
              <div className="p-10 text-center text-slate-400">Chargement...</div>
            ) : Array.isArray(leads) && leads.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-white z-10 shadow-sm">
                  <tr className="text-xs uppercase text-slate-500 font-semibold border-b border-slate-100">
                    <th className="px-6 py-4">Lead</th>
                    <th className="px-6 py-4 hidden md:table-cell">Entreprise</th>
                    <th className="px-6 py-4">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leads.map((lead) => (
                    <tr 
                      key={lead.id} 
                      onClick={() => setSelectedLead(lead)}
                      className={`cursor-pointer transition-colors ${selectedLead?.id === lead.id ? 'bg-blue-50/60' : 'hover:bg-slate-50'}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white shadow-sm`} style={{backgroundColor: '#3A3086'}}>
                            {lead.name ? lead.name.charAt(0).toUpperCase() : '?'}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{lead.name}</p>
                            <p className="text-xs text-slate-500">{lead.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 hidden md:table-cell">{lead.company || 'N/A'}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide ${getStatusColor(lead.status)}`}>
                          {getStatusLabel(lead.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-10 text-center text-slate-500 italic">
                Aucun lead trouvé.
              </div>
            )}
          </div>
        </div>

        {/* --- COLONNE DROITE : DÉTAILS --- */}
        {selectedLead ? (
          <aside className="w-full lg:w-[400px] bg-white rounded-2xl border border-slate-200 shadow-xl overflow-y-auto custom-scrollbar flex flex-col h-full">
            {/* Header Profil */}
            <div className="relative p-6 border-b border-slate-100 text-center">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#EF4444] to-[#3A3086]"></div>
              
              <div className="w-20 h-20 mx-auto rounded-full bg-slate-100 border-4 border-white shadow-md flex items-center justify-center text-2xl font-black text-[#3A3086] mb-3 mt-4">
                {selectedLead.name.charAt(0).toUpperCase()}
              </div>
              
              <h3 className="text-xl font-bold text-slate-900">{selectedLead.name}</h3>
              <p className="text-slate-500 text-sm mb-4">{selectedLead.company || 'Aucune entreprise'}</p>
              
              <div className="flex justify-center gap-3">
                 {selectedLead.phone && (
                   <a href={`tel:${selectedLead.phone}`} className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-[#3A3086] hover:text-white transition-colors" title="Appeler">
                      <span className="material-symbols-rounded text-xl">call</span>
                   </a>
                 )}
                 {selectedLead.email && (
                   <a href={`mailto:${selectedLead.email}`} className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-[#EF4444] hover:text-white transition-colors" title="Envoyer un e-mail">
                      <span className="material-symbols-rounded text-xl">mail</span>
                   </a>
                 )}
              </div>
            </div>

            {/* Actions & Détails */}
            <div className="p-6 space-y-6 flex-1">
              
              {/* Changement de Statut */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Progression (Statut)</label>
                <select 
                  value={selectedLead.status}
                  onChange={(e) => handleUpdateLead('status', e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 focus:border-[#3A3086] outline-none"
                >
                  <option value="new">Nouveau</option>
                  <option value="contacted">Contacté</option>
                  <option value="qualified">Qualifié</option>
                  <option value="negotiation">Négociation</option>
                  <option value="won">Gagné (Won)</option>
                  <option value="lost">Perdu (Lost)</option>
                </select>
              </div>

              {/* Assignation */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Assigné à</label>
                <div className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 hover:border-[#3A3086] transition-colors bg-white">
                   <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                     <span className="material-symbols-rounded text-sm">person</span>
                   </div>
                 <select 
                                className="flex-1 bg-transparent border-none outline-none text-sm font-medium"
                                // CORRECTION ICI : On vérifie si c'est un objet (API) ou un ID (Update local)
                                value={
                                  selectedLead.assigned_to 
                                    ? (typeof selectedLead.assigned_to === 'object' ? selectedLead.assigned_to.id : selectedLead.assigned_to)
                                    : ''
                                }
                                onChange={(e) => handleUpdateLead('assigned_to', parseInt(e.target.value))}
                              >
                                  <option value="">Non assigné</option>
                                  {Array.isArray(users) && users.map(u => (
                                      <option key={u.id} value={u.id}>{u.name}</option>
                                  ))}
                </select>
                </div>
              </div>

              {/* Bouton Convertir en Client */}
              {selectedLead.status === 'won' && (
                <button 
                  onClick={handleConvertLead}
                  className="w-full mt-4 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-rounded">person_add_alt_1</span>
                  Convertir en Client
                </button>
              )}

              {/* Infos Détails */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                 <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Téléphone</span>
                    <span className="font-medium text-slate-900">{selectedLead.phone || 'N/A'}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Source</span>
                    <span className="font-medium text-slate-900 capitalize">{selectedLead.source}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Type</span>
                    <span className="font-medium text-slate-900 capitalize">{selectedLead.type}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Créé le</span>
                    <span className="font-medium text-slate-900">
                      {selectedLead.created_at ? new Date(selectedLead.created_at).toLocaleDateString('fr-FR') : 'N/A'}
                    </span>
                 </div>
              </div>

            </div>
          </aside>
        ) : (
          <div className="hidden lg:flex w-[400px] bg-slate-50 rounded-2xl border border-slate-200 border-dashed items-center justify-center text-slate-400 text-sm">
            Sélectionnez un lead pour voir les détails
          </div>
        )}

      </div>

      {/* --- MODALE CRÉATION --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold text-slate-800">Nouveau Lead</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-red-500">
                <span className="material-symbols-rounded">close</span>
              </button>
            </div>
            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                   <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Nom Complet</label>
                   <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full border rounded-lg p-2 bg-slate-50 text-sm focus:border-[#3A3086] outline-none" />
                </div>
                <div>
                   <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Entreprise</label>
                   <input name="company" value={formData.company} onChange={handleInputChange} className="w-full border rounded-lg p-2 bg-slate-50 text-sm focus:border-[#3A3086] outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                   <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Email</label>
                   <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full border rounded-lg p-2 bg-slate-50 text-sm focus:border-[#3A3086] outline-none" />
                </div>
                <div>
                   <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Téléphone</label>
                   <input name="phone" value={formData.phone} onChange={handleInputChange} className="w-full border rounded-lg p-2 bg-slate-50 text-sm focus:border-[#3A3086] outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                   <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Source</label>
                   <select name="source" value={formData.source} onChange={handleInputChange} className="w-full border rounded-lg p-2 bg-slate-50 text-sm focus:border-[#3A3086] outline-none">
                     <option value="website">Site Web</option>
                     <option value="social">Réseaux Sociaux</option>
                     <option value="referral">Recommandation</option>
                     <option value="other">Autre</option>
                   </select>
                </div>
                <div>
                   <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Type de profil</label>
                   <select name="type" value={formData.type} onChange={handleInputChange} className="w-full border rounded-lg p-2 bg-slate-50 text-sm focus:border-[#3A3086] outline-none">
                     <option value="business">Business</option>
                     <option value="artist">Artiste</option>
                     <option value="startup">Startup</option>
                     <option value="influencer">Influenceur</option>
                   </select>
                </div>
              </div>

              <div className="pt-4 flex gap-3 justify-end border-t border-slate-100 mt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 text-sm font-bold hover:bg-slate-50">Annuler</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-[#3A3086] text-white text-sm font-bold hover:bg-indigo-900 shadow-md">Créer</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AdminLayout>
  );
};
export {AdminLeads};
export default AdminLeads;