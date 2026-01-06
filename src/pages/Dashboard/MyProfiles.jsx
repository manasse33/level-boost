import React from 'react';

const MyProfilesPage = () => {
  // Styles pour les motifs (SVG Data URI)
  const africanPatternStyle = {
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d45211' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
  };

  return (
    <div className="bg-[#fcf9f8] dark:bg-[#221610] text-[#0f172a] font-['Manrope',sans-serif] antialiased min-h-screen flex flex-col">
      {/* Custom Scrollbar Styles */}
      <style>
        {`
          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: #f1f1f1; }
          ::-webkit-scrollbar-thumb { background: #d45211; border-radius: 4px; }
          ::-webkit-scrollbar-thumb:hover { background: #b03e0a; }
        `}
      </style>

      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full bg-[#ffffff]/95 dark:bg-[#2d2420]/95 backdrop-blur border-b border-[#f3ebe7] dark:border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center bg-[#d45211] rounded-lg text-white">
                <span className="material-symbols-outlined">diamond</span>
              </div>
              <h2 className="text-[#0f172a] dark:text-white text-xl font-bold tracking-tight">Level Boost</h2>
            </div>
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <a className="text-[#0f172a]/70 hover:text-[#d45211] dark:text-white/70 dark:hover:text-white text-sm font-medium transition-colors" href="#">Tableau de bord</a>
              <a className="text-[#0f172a]/70 hover:text-[#d45211] dark:text-white/70 dark:hover:text-white text-sm font-medium transition-colors" href="#">Projets</a>
              <a className="text-[#0f172a]/70 hover:text-[#d45211] dark:text-white/70 dark:hover:text-white text-sm font-medium transition-colors" href="#">Équipe</a>
              <a className="text-[#0f172a]/70 hover:text-[#d45211] dark:text-white/70 dark:hover:text-white text-sm font-medium transition-colors" href="#">Rapports</a>
            </nav>
            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-[#0f172a]/70 hover:text-[#d45211] dark:text-white/70 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-white/5">
                <span className="material-symbols-outlined text-[24px]">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#d45211] rounded-full border-2 border-white dark:border-[#221610]"></span>
              </button>
              <div className="h-8 w-[1px] bg-[#f3ebe7] dark:bg-white/10 hidden sm:block"></div>
              <div className="flex items-center gap-3">
                <div 
                  className="bg-center bg-no-repeat bg-cover rounded-full w-9 h-9 ring-2 ring-white dark:ring-white/10 shadow-sm" 
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCPyZ1doAg6Gif0VJoH98H2s3wuJuHChs-_eKsNljHzD3kWDQaeOb0g-9HSpcCINiW1mrPtVGiT6BiAx17ZhQu2rEv9gogyC7HIDoDh9XlhQ-nMmzNEBQIDrVkE_mtbmiy0P9IHXEJlRO3lk7wtz6wR26iF9hz4khHMWzhkoQhpeE1K_34Xj3pRlOHOz8xobPN41Vm21XgJB-aCYiBs7FTctHpQXc4Ptls1mEN5aoyv97fp0wxT7y9tzdhk6NZ-7lwjiqJd3Zb9VLNi")' }}
                ></div>
                <span className="hidden sm:block text-sm font-bold text-[#0f172a] dark:text-white">Amara S.</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-2 mb-6 text-sm">
          <a className="text-[#0f172a]/60 hover:text-[#d45211] dark:text-white/60 transition-colors" href="#">Tableau de bord</a>
          <span className="material-symbols-outlined text-[16px] text-[#0f172a]/40">chevron_right</span>
          <span className="text-[#d45211] font-medium">Mon Profil</span>
        </div>

        {/* Page Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-[#0f172a] dark:text-white tracking-tight mb-2">Mon Profil</h1>
            <p className="text-[#0f172a]/60 dark:text-white/60 text-base max-w-2xl">
              Gérez vos informations personnelles, vos préférences et la sécurité de votre compte Level Boost.
            </p>
          </div>
          {/* Status Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Compte Actif
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar: Profile Summary */}
          <aside className="w-full lg:w-[340px] flex-shrink-0 space-y-6">
            {/* Profile Card */}
            <div className="bg-[#ffffff] dark:bg-[#2d2420] rounded-2xl p-6 shadow-sm border border-[#f3ebe7] dark:border-white/5 relative overflow-hidden group">
              {/* Decorative Background Pattern */}
              <div className="absolute top-0 left-0 w-full h-24 bg-[#d45211]/10" style={africanPatternStyle}></div>
              
              <div className="relative flex flex-col items-center text-center mt-4">
                <div className="relative">
                  <div 
                    className="bg-center bg-no-repeat bg-cover rounded-full w-28 h-28 border-4 border-white dark:border-[#2d2420] shadow-md" 
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAuhb3YEROr8LNBm1kaLdQeYNWOxI6aYQg6pDZ-MSlZxeX1HaGyEuCkMVBD7z687NIoRWhv9pnOBifj7lgdvoSevGm6Ne8wKcDVRJZmxiumGAddVwJoTskgOX82gC7TXqZkclN0BK6kv_8cZVLDI9kNjPOYtvR_3z5Rv1na4YS83mlucp7lzK124B_t38E0CtrN4FCr0XVZajE0tyRAUAJndQtCtPlLwkj77QP30d_FDZlDCTQjWpbC3Pyl9RbM6l7oUPqQSnNqqddS")' }}
                  ></div>
                  <button aria-label="Changer la photo" className="absolute bottom-1 right-1 bg-[#d45211] text-white p-2 rounded-full shadow-lg hover:bg-[#b03e0a] transition-transform hover:scale-105">
                    <span className="material-symbols-outlined text-[18px] leading-none">photo_camera</span>
                  </button>
                </div>
                <h3 className="mt-4 text-xl font-bold text-[#0f172a] dark:text-white">Amara Sylla</h3>
                <p className="text-[#0f172a]/60 dark:text-white/60 text-sm font-medium">Marketing Manager</p>
                
                <div className="mt-6 w-full">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold uppercase text-[#0f172a]/50 dark:text-white/50 tracking-wider">Profil complété</span>
                    <span className="text-xs font-bold text-[#d45211]">85%</span>
                  </div>
                  <div className="h-2 w-full bg-[#f3ebe7] dark:bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#d45211] rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 w-full">
                  <div className="flex items-center gap-3 text-sm text-[#0f172a]/80 dark:text-white/80 p-3 rounded-lg hover:bg-[#fcf9f8] dark:hover:bg-white/5 transition-colors cursor-default">
                    <span className="material-symbols-outlined text-[#d45211]">location_on</span>
                    <span>Dakar, Sénégal</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#0f172a]/80 dark:text-white/80 p-3 rounded-lg hover:bg-[#fcf9f8] dark:hover:bg-white/5 transition-colors cursor-default">
                    <span className="material-symbols-outlined text-[#d45211]">work</span>
                    <span>Level Boost Agency</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#0f172a]/80 dark:text-white/80 p-3 rounded-lg hover:bg-[#fcf9f8] dark:hover:bg-white/5 transition-colors cursor-default">
                    <span className="material-symbols-outlined text-[#d45211]">calendar_month</span>
                    <span>Membre depuis 2021</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-[#1e3a8a]/5 dark:bg-[#1e3a8a]/10 rounded-2xl p-6 border border-[#1e3a8a]/10 dark:border-[#1e3a8a]/20">
              <h4 className="text-[#1e3a8a] dark:text-blue-300 font-bold mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined">security</span>
                Sécurité
              </h4>
              <p className="text-sm text-[#0f172a]/70 dark:text-white/70 mb-4">
                Protégez votre compte avec l'authentification à deux facteurs.
              </p>
              <button className="text-sm font-bold text-[#1e3a8a] hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-200 underline">
                Configurer 2FA
              </button>
            </div>
          </aside>

          {/* Right Content: Edit Form */}
          <div className="flex-1 bg-[#ffffff] dark:bg-[#2d2420] rounded-2xl shadow-sm border border-[#f3ebe7] dark:border-white/5 overflow-hidden">
            {/* Form Tabs */}
            <div className="flex border-b border-[#f3ebe7] dark:border-white/10 px-6 overflow-x-auto">
              <button className="px-4 py-4 text-sm font-bold text-[#d45211] border-b-2 border-[#d45211] whitespace-nowrap">Informations Personnelles</button>
              <button className="px-4 py-4 text-sm font-medium text-[#0f172a]/60 dark:text-white/60 hover:text-[#0f172a] dark:hover:text-white transition-colors whitespace-nowrap">Mot de passe</button>
              <button className="px-4 py-4 text-sm font-medium text-[#0f172a]/60 dark:text-white/60 hover:text-[#0f172a] dark:hover:text-white transition-colors whitespace-nowrap">Facturation</button>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              {/* Section: Personal Info */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-[#d45211]/10 rounded-lg text-[#d45211]">
                    <span className="material-symbols-outlined">badge</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0f172a] dark:text-white">Identité</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-[#0f172a] dark:text-white" htmlFor="firstname">Prénom</label>
                    <input className="w-full h-11 px-4 rounded-lg bg-[#fcf9f8] dark:bg-[#221610] border-transparent focus:border-[#d45211] focus:bg-white dark:focus:bg-[#2d2420] focus:ring-0 transition-all text-[#0f172a] dark:text-white placeholder-[#0f172a]/40 font-medium" id="firstname" placeholder="Votre prénom" type="text" defaultValue="Amara"/>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-[#0f172a] dark:text-white" htmlFor="lastname">Nom</label>
                    <input className="w-full h-11 px-4 rounded-lg bg-[#fcf9f8] dark:bg-[#221610] border-transparent focus:border-[#d45211] focus:bg-white dark:focus:bg-[#2d2420] focus:ring-0 transition-all text-[#0f172a] dark:text-white placeholder-[#0f172a]/40 font-medium" id="lastname" placeholder="Votre nom" type="text" defaultValue="Sylla"/>
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="block text-sm font-bold text-[#0f172a] dark:text-white" htmlFor="bio">Bio</label>
                    <textarea className="w-full p-4 rounded-lg bg-[#fcf9f8] dark:bg-[#221610] border-transparent focus:border-[#d45211] focus:bg-white dark:focus:bg-[#2d2420] focus:ring-0 transition-all text-[#0f172a] dark:text-white placeholder-[#0f172a]/40 font-medium resize-none" id="bio" placeholder="Décrivez votre rôle en quelques mots..." rows="3" defaultValue="Passionné par le marketing digital et les stratégies de croissance. J'aide les marques à amplifier leur voix en Afrique de l'Ouest."></textarea>
                    <p className="text-xs text-[#0f172a]/50 text-right">250 caractères max</p>
                  </div>
                </div>
              </section>

              <div className="h-px bg-[#f3ebe7] dark:bg-white/5 w-full"></div>

              {/* Section: Contact Details */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-[#d45211]/10 rounded-lg text-[#d45211]">
                    <span className="material-symbols-outlined">contact_mail</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0f172a] dark:text-white">Coordonnées</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-[#0f172a] dark:text-white" htmlFor="email">Email Professionnel</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#0f172a]/40 text-[20px]">mail</span>
                      <input className="w-full h-11 pl-10 pr-4 rounded-lg bg-gray-100 dark:bg-white/5 border-transparent text-[#0f172a]/60 dark:text-white/60 font-medium cursor-not-allowed" id="email" readOnly type="email" value="amara.sylla@levelboost.com"/>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-[#0f172a] dark:text-white" htmlFor="phone">Téléphone</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#0f172a]/40 text-[20px]">call</span>
                      <input className="w-full h-11 pl-10 pr-4 rounded-lg bg-[#fcf9f8] dark:bg-[#221610] border-transparent focus:border-[#d45211] focus:bg-white dark:focus:bg-[#2d2420] focus:ring-0 transition-all text-[#0f172a] dark:text-white placeholder-[#0f172a]/40 font-medium" id="phone" type="tel" defaultValue="+221 77 123 45 67"/>
                    </div>
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="block text-sm font-bold text-[#0f172a] dark:text-white" htmlFor="linkedin">LinkedIn URL</label>
                    <div className="flex shadow-sm rounded-lg overflow-hidden">
                      <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-transparent bg-[#fcf9f8] dark:bg-white/5 text-[#0f172a]/50 dark:text-white/50 text-sm">
                        linkedin.com/in/
                      </span>
                      <input className="flex-1 h-11 px-4 rounded-none rounded-r-lg bg-[#fcf9f8] dark:bg-[#221610] border-transparent focus:border-[#d45211] focus:bg-white dark:focus:bg-[#2d2420] focus:ring-0 transition-all text-[#0f172a] dark:text-white placeholder-[#0f172a]/40 font-medium" id="linkedin" type="text" defaultValue="amarasylla"/>
                    </div>
                  </div>
                </div>
              </section>

              <div className="h-px bg-[#f3ebe7] dark:bg-white/5 w-full"></div>

              {/* Section: Preferences */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-[#d45211]/10 rounded-lg text-[#d45211]">
                    <span className="material-symbols-outlined">tune</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0f172a] dark:text-white">Préférences</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-[#0f172a] dark:text-white" htmlFor="language">Langue de l'interface</label>
                    <div className="relative">
                      <select className="w-full h-11 pl-4 pr-10 rounded-lg bg-[#fcf9f8] dark:bg-[#221610] border-transparent focus:border-[#d45211] focus:bg-white dark:focus:bg-[#2d2420] focus:ring-0 transition-all text-[#0f172a] dark:text-white font-medium appearance-none cursor-pointer" id="language" defaultValue="fr">
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                        <option value="wo">Wolof</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#0f172a]/40 pointer-events-none">expand_more</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-[#fcf9f8] dark:bg-[#221610] md:col-span-2">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#0f172a] dark:text-white">Notifications par email</span>
                      <span className="text-xs text-[#0f172a]/60 dark:text-white/60">Recevoir les résumés hebdomadaires des projets.</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked/>
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#d45211]"></div>
                    </label>
                  </div>
                </div>
              </section>

              {/* Form Actions */}
              <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4 pt-4">
                <button className="w-full sm:w-auto px-6 py-2.5 rounded-lg border border-transparent text-[#0f172a]/70 hover:text-[#0f172a] dark:text-white/70 dark:hover:text-white font-bold text-sm transition-colors hover:bg-gray-100 dark:hover:bg-white/5" type="button">
                  Annuler
                </button>
                <button className="w-full sm:w-auto px-8 py-2.5 rounded-lg bg-[#d45211] hover:bg-[#b03e0a] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group" type="button">
                  <span className="material-symbols-outlined text-[18px] group-hover:animate-bounce">save</span>
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Toast Notification */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-[#ffffff] dark:bg-[#2d2420] border-l-4 border-green-500 text-[#0f172a] dark:text-white px-4 py-3 rounded shadow-lg flex items-center gap-3 max-w-sm animate-pulse">
          <span className="material-symbols-outlined text-green-500">check_circle</span>
          <div>
            <p className="font-bold text-sm">Profil chargé</p>
            <p className="text-xs text-[#0f172a]/60 dark:text-white/60">Vos informations sont à jour.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MyProfilesPage };
export default MyProfilesPage;