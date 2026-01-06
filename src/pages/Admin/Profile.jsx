import React, { useState, useEffect } from 'react';
import authService from '../../api/auth';
import profileService from '../../api/profiles';
import { PageLoader } from '../../components/common/Loader';
import AdminLayout from '../../layouts/AdminLayout';

const MyProfilePage = () => {
  // --- ÉTATS DE CHARGEMENT & UI ---
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('account'); 
  const [isCreating, setIsCreating] = useState(false); // Pour basculer vers le formulaire de création
  const [notification, setNotification] = useState(null);

  // --- ÉTAT TABLE USERS (Mon Compte) ---
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    location: '',
    avatar: null
  });

  // --- ÉTAT TABLE PROFILES (Ma Fiche Talent) ---
  const [talentData, setTalentData] = useState({
    id: null,
    type: 'artist',
    title: '',
    description: '',
    category: '',
    website: '',
    status: 'draft',
    logo: null,
    cover_image: null
  });

  // Prévisualisations locales des images
  const [previews, setPreviews] = useState({ avatar: null, logo: null, cover: null });

  // --- CHARGEMENT INITIAL ---
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Délai de 2 secondes pour la charte Level Boost
        const minDelay = new Promise(resolve => setTimeout(resolve, 2000));
        const apiRequest = authService.getMe();
        
        const [_, response] = await Promise.all([minDelay, apiRequest]);
        const user = response.data || response;

        // 1. Mapping Table Users
        setUserData({
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          bio: user.bio || '',
          location: user.location || '',
          avatar: null
        });

        // 2. Mapping Table Profiles (si elle existe pour cet user)
        if (user.profile) {
          setTalentData({
            id: user.profile.id,
            type: user.profile.type || 'artist',
            title: user.profile.title || '',
            description: user.profile.description || '',
            category: user.profile.category || '',
            website: user.profile.website || '',
            status: user.profile.status || 'draft',
            logo: null,
            cover_image: null
          });
          setPreviews({
            avatar: user.avatar,
            logo: user.profile.logo,
            cover: user.profile.cover_image
          });
        } else {
          setPreviews({ avatar: user.avatar, logo: null, cover: null });
        }
      } catch (error) {
        console.error("Erreur de chargement:", error);
        setNotification({ type: 'error', message: 'Erreur lors de la récupération des données.' });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // --- HANDLERS DE FORMULAIRE ---
  const handleUserChange = (e) => setUserData({ ...userData, [e.target.id]: e.target.value });
  const handleTalentChange = (e) => setTalentData({ ...talentData, [e.target.id]: e.target.value });

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setPreviews(prev => ({ ...prev, [field]: URL.createObjectURL(file) }));
      if (field === 'avatar') setUserData({ ...userData, avatar: file });
      if (field === 'logo') setTalentData({ ...talentData, logo: file });
      if (field === 'cover') setTalentData({ ...talentData, cover_image: file });
    }
  };

  // --- SAUVEGARDE COMPTE (Route: /profile-update) ---
  const saveAccount = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = new FormData();
      data.append('_method', 'PUT'); // Spoofing pour Laravel PUT
      data.append('name', userData.name);
      data.append('phone', userData.phone);
      data.append('bio', userData.bio);
      data.append('location', userData.location);
      if (userData.avatar) data.append('avatar', userData.avatar);

      await authService.updateAccount(data);
      setNotification({ type: 'success', message: 'Compte mis à jour !' });
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      setNotification({ type: 'error', message: 'Erreur lors de la mise à jour du compte.' });
    } finally { setSaving(false); }
  };

  // --- SAUVEGARDE FICHE TALENT (Route: /profiles/{id} ou /profiles) ---
  const saveTalent = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = new FormData();
      data.append('type', talentData.type);
      data.append('title', talentData.title);
      data.append('description', talentData.description);
      data.append('category', talentData.category);
      data.append('website', talentData.website);
      if (talentData.logo) data.append('logo', talentData.logo);
      if (talentData.cover_image) data.append('cover_image', talentData.cover_image);

      if (talentData.id) {
        // Mode Edition (PUT)
        await profileService.update(talentData.id, data);
        setNotification({ type: 'success', message: 'Fiche talent mise à jour !' });
      } else {
        // Mode Création (POST)
        const res = await profileService.create(data);
        const newProfile = res.data || res;
        setTalentData(prev => ({ ...prev, id: newProfile.id }));
        setIsCreating(false);
        setNotification({ type: 'success', message: 'Fiche talent créée avec succès !' });
      }
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      setNotification({ type: 'error', message: 'Erreur lors de la sauvegarde de la fiche.' });
    } finally { setSaving(false); }
  };

  if (loading) return <PageLoader />;

  return (
    <AdminLayout title="Mon Espace Personnel">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
          <div className={`px-6 py-3 rounded-xl shadow-2xl border-l-4 bg-white flex items-center gap-3 ${notification.type === 'success' ? 'border-green-500 text-green-700' : 'border-red-500 text-red-700'}`}>
            <span className="material-symbols-rounded">{notification.type === 'success' ? 'check_circle' : 'error'}</span>
            <p className="font-bold text-sm">{notification.message}</p>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* SÉLECTEUR D'ONGLETS */}
        <div className="flex bg-slate-100 p-1 rounded-2xl w-fit">
          <button onClick={() => setActiveTab('account')} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'account' ? 'bg-[#3A3086] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>
            <span className="material-symbols-rounded text-lg">account_circle</span> Compte
          </button>
          <button onClick={() => setActiveTab('talent')} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'talent' ? 'bg-[#EF4444] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>
            <span className="material-symbols-rounded text-lg">star</span> Fiche Talent
          </button>
        </div>

        {/* --- FORMULAIRE COMPTE (Table: users) --- */}
        {activeTab === 'account' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in">
             <div className="p-8 border-b border-slate-50 flex items-center gap-6">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-slate-50">
                        <img src={previews.avatar || `https://ui-avatars.com/api/?name=${userData.name}&background=3A3086&color=fff`} className="w-full h-full object-cover" alt="Avatar" />
                    </div>
                    <label htmlFor="av-up" className="absolute -bottom-1 -right-1 bg-[#3A3086] text-white p-1.5 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg"><span className="material-symbols-rounded text-sm">photo_camera</span></label>
                    <input type="file" id="av-up" className="hidden" onChange={(e) => handleFileChange(e, 'avatar')} />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-900">{userData.name || 'Mon Profil'}</h2>
                    <p className="text-slate-500">Gérez vos informations de compte et identité.</p>
                </div>
             </div>
             <form onSubmit={saveAccount} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Nom complet</label>
                  <input id="name" value={userData.name} onChange={handleUserChange} className="w-full h-12 px-5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#3A3086] outline-none transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Email (Non modifiable)</label>
                  <input value={userData.email} disabled className="w-full h-12 px-5 rounded-xl bg-slate-100 border-transparent text-slate-400 cursor-not-allowed italic" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Téléphone</label>
                  <input id="phone" value={userData.phone} onChange={handleUserChange} className="w-full h-12 px-5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#3A3086] outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Localisation</label>
                  <input id="location" value={userData.location} onChange={handleUserChange} className="w-full h-12 px-5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#3A3086] outline-none" />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Bio</label>
                  <textarea id="bio" value={userData.bio} onChange={handleUserChange} rows="3" className="w-full p-5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#3A3086] outline-none resize-none" />
                </div>
                <div className="md:col-span-2 flex justify-end pt-4">
                  <button type="submit" disabled={saving} className="bg-[#3A3086] text-white px-10 py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-800 transition-all disabled:opacity-50">
                    {saving ? 'Enregistrement...' : 'Sauvegarder mon compte'}
                  </button>
                </div>
             </form>
          </div>
        )}

        {/* --- SECTION FICHE TALENT (Table: profiles) --- */}
        {activeTab === 'talent' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in">
            
            {/* SI UNE FICHE EXISTE OU SI ON VIENT DE CLIQUER SUR CRÉER */}
            {talentData.id || isCreating ? (
              <>
                <div className="h-40 bg-slate-100 relative overflow-hidden group">
                  <img src={previews.cover || "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000"} className="w-full h-full object-cover" alt="Cover" />
                  <label htmlFor="cover-up" className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-5 py-2 rounded-xl text-[10px] font-black uppercase cursor-pointer hover:bg-white transition-all shadow-xl">Changer la bannière</label>
                  <input type="file" id="cover-up" className="hidden" onChange={(e) => handleFileChange(e, 'cover')} />
                </div>

                <form onSubmit={saveTalent} className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Titre de la fiche (Ex: Nom de scène)</label>
                      <input id="title" value={talentData.title} onChange={handleTalentChange} className="w-full h-12 px-5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#EF4444] outline-none" required />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Type de profil</label>
                      <select id="type" value={talentData.type} onChange={handleTalentChange} className="w-full h-12 px-5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#EF4444] outline-none">
                        <option value="artist">Artiste / Créatif</option>
                        <option value="entrepreneur">Entrepreneur</option>
                        <option value="startup">Startup / Tech</option>
                        <option value="freelance">Freelance / Coach</option>
                        <option value="business">Business / PME</option>
                      </select>
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Description publique (Page Talents)</label>
                      <textarea id="description" value={talentData.description} onChange={handleTalentChange} rows="5" className="w-full p-5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#EF4444] outline-none resize-none" required />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Catégorie spécifique</label>
                      <input id="category" value={talentData.category} onChange={handleTalentChange} className="w-full h-12 px-5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#EF4444] outline-none" placeholder="Ex: Musique Urbaine" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Site Web / Portfolio</label>
                      <input id="website" value={talentData.website} onChange={handleTalentChange} className="w-full h-12 px-5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#EF4444] outline-none" />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-8 border-t border-slate-100">
                    <button type="button" onClick={() => setIsCreating(false)} className="text-slate-400 text-sm font-bold hover:text-slate-600 transition-colors">Annuler</button>
                    <button type="submit" disabled={saving} className="bg-[#EF4444] text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-red-100 hover:bg-red-600 transition-all disabled:opacity-50">
                      {talentData.id ? (saving ? 'Mise à jour...' : 'METTRE À JOUR LA FICHE') : (saving ? 'Création...' : 'PUBLIER MA FICHE TALENT')}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              /* ÉTAT VIDE : AUCUN PROFIL DANS LA BDD */
              <div className="py-24 px-8 text-center space-y-8">
                <div className="w-24 h-24 bg-red-50 text-[#EF4444] rounded-full flex items-center justify-center mx-auto animate-bounce shadow-inner">
                  <span className="material-symbols-rounded text-5xl">stars</span>
                </div>
                <div className="max-w-md mx-auto">
                  <h3 className="text-3xl font-black text-slate-900 leading-tight">Envie de briller sur notre page Talents ?</h3>
                  <p className="text-slate-500 mt-4 leading-relaxed">Votre fiche talent est votre vitrine publique. Elle permet aux autres membres et visiteurs de découvrir vos services, vos projets et votre expertise.</p>
                </div>
                <button 
                  onClick={() => setIsCreating(true)}
                  className="bg-[#3A3086] text-white px-12 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-indigo-100 hover:scale-105 transition-all"
                >
                  CRÉER MA FICHE TALENT
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export { MyProfilePage };
export default MyProfilePage;