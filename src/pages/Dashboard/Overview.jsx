import React, { useState } from 'react';

const DashboardPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Couleurs extraites de la config d'origine pour référence
  // Primary: #197fe6
  // Accent: #ef4444
  // Bg Light: #f6f7f8
  // Bg Dark: #111921
  // Surface: #ffffff

  // Motif Mudcloth (CSS-in-JS pour React)
  const mudclothPattern = {
    backgroundColor: '#ffffff',
    opacity: 0.1,
    backgroundImage: `
      linear-gradient(135deg, #197fe6 25%, transparent 25%), 
      linear-gradient(225deg, #197fe6 25%, transparent 25%), 
      linear-gradient(45deg, #197fe6 25%, transparent 25%), 
      linear-gradient(315deg, #197fe6 25%, transparent 25%)
    `,
    backgroundPosition: '10px 0, 10px 0, 0 0, 0 0',
    backgroundSize: '20px 20px',
    backgroundRepeat: 'repeat',
  };

  return (
    <div className="bg-[#f6f7f8] dark:bg-[#111921] text-slate-900 dark:text-white font-['Manrope',sans-serif] antialiased overflow-hidden h-screen w-full flex">
      {/* Styles globaux injectés pour la scrollbar */}
      <style>
        {`
          ::-webkit-scrollbar { width: 8px; height: 8px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
          ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
          .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
          .material-symbols-outlined.filled { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        `}
      </style>

      {/* SIDE NAVIGATION */}
      <aside className={`w-64 flex-shrink-0 flex flex-col bg-white dark:bg-[#1a2632] border-r border-slate-200 dark:border-slate-700 h-full relative z-20 ${isMobileMenuOpen ? 'fixed inset-y-0 left-0 shadow-xl' : 'hidden md:flex'}`}>
        {/* Brand */}
        <div className="p-6 flex items-center gap-3">
          <div className="bg-[#197fe6]/10 p-2 rounded-lg">
            <span className="material-symbols-outlined text-[#197fe6] text-3xl">all_inclusive</span>
          </div>
          <div>
            <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Level Boost</h1>
            <p className="text-slate-500 text-xs font-medium">Agence Marketing</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 flex flex-col gap-1 px-4 py-4 overflow-y-auto">
          <a className="flex items-center gap-3 px-3 py-3 rounded-lg bg-[#197fe6]/10 text-[#197fe6]" href="#">
            <span className="material-symbols-outlined filled">dashboard</span>
            <span className="text-sm font-bold">Tableau de bord</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors dark:text-slate-400 dark:hover:bg-slate-700/50 dark:hover:text-white" href="#">
            <span className="material-symbols-outlined">person</span>
            <span className="text-sm font-medium">Profil</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors dark:text-slate-400 dark:hover:bg-slate-700/50 dark:hover:text-white" href="#">
            <span className="material-symbols-outlined">shopping_bag</span>
            <span className="text-sm font-medium">Commandes</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors dark:text-slate-400 dark:hover:bg-slate-700/50 dark:hover:text-white" href="#">
            <span className="material-symbols-outlined">credit_card</span>
            <span className="text-sm font-medium">Abonnements</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors dark:text-slate-400 dark:hover:bg-slate-700/50 dark:hover:text-white flex justify-between" href="#">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined">chat_bubble</span>
              <span className="text-sm font-medium">Messages</span>
            </div>
            <span className="bg-[#ef4444] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">3</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors dark:text-slate-400 dark:hover:bg-slate-700/50 dark:hover:text-white" href="#">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm font-medium">Paramètres</span>
          </a>
        </nav>

        {/* Bottom User Preview */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left">
            <div className="relative">
              <div 
                className="bg-center bg-no-repeat bg-cover rounded-full h-10 w-10 border-2 border-white shadow-sm" 
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB51Rc8I8SMVEWHCCZnkXU96uplU2boO91nwgsv9Md_rtro6qhuvLXDGS7bymQgPoTu6JvFp4O0bT6vSjdjeGlt_BLXd9QQ4WE_D7Ueyt55mnCFhG5YuDfehPALB3yJzca2E0jmoEbe3oUh4ujEEK4LwzWGCkgBaVIo_yDNy1L7pPE4V9BxWFQRlC8Rpg3DnVAr_ojNcH5bWZ5ivD93nTeAellcV_-kDY0sladoefe-K5tfGtBaIUQWTPsSX66OT_7EFi6Gg0FrE0lR")'}}
              ></div>
              <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">Amara Diop</p>
              <p className="text-xs text-slate-500 truncate">amara@example.com</p>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-lg">logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-[#f6f7f8] dark:bg-[#111921]">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-8 bg-white dark:bg-[#1a2632] border-b border-slate-200 dark:border-slate-700 z-10">
          {/* Mobile Menu Toggle */}
          <div className="md:hidden mr-4">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <span className="material-symbols-outlined text-slate-500">menu</span>
            </button>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#197fe6] material-symbols-outlined">search</span>
              <input 
                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-[#197fe6]/20 placeholder:text-slate-400 transition-all" 
                placeholder="Rechercher commandes, talents ou services..." 
                type="text"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-500 hover:text-[#197fe6] transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1.5 right-2 h-2 w-2 bg-[#ef4444] rounded-full border-2 border-white dark:border-[#1a2632]"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700"></div>
            <button className="flex items-center gap-2 text-sm font-bold text-[#197fe6] hover:text-[#197fe6]/80">
              <span className="material-symbols-outlined">add_circle</span>
              <span>Nouvelle Demande</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
            
            {/* Welcome Hero */}
            <div className="relative bg-white dark:bg-[#1a2632] rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden group">
              {/* Decorative African Pattern Overlay */}
              <div 
                className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none" 
                style={{
                  ...mudclothPattern,
                  maskImage: 'linear-gradient(to left, black, transparent)',
                  WebkitMaskImage: 'linear-gradient(to left, black, transparent)'
                }}
              ></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#197fe6] via-[#ef4444] to-[#197fe6] opacity-50"></div>
              
              <div className="relative z-10 flex flex-col gap-2">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Bon retour, Amara</h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-xl">Voici un aperçu de vos activités marketing. Votre dernière campagne performe <span className="text-green-600 font-bold">12% mieux</span> que le mois dernier.</p>
                <div className="mt-4 flex gap-3">
                  <button className="bg-[#197fe6] hover:bg-[#197fe6]/90 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-[#197fe6]/20 transition-all flex items-center gap-2">
                    <span>Voir les Rapports</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                  <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-lg text-sm font-bold transition-all dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">
                    Gérer Profil
                  </button>
                </div>
              </div>
            </div>

            {/* KPI Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col gap-4 relative overflow-hidden">
                <div className="flex justify-between items-start z-10">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg text-[#197fe6]">
                    <span className="material-symbols-outlined">campaign</span>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">+10%</span>
                </div>
                <div className="z-10">
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Campagnes Actives</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">3</h3>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#197fe6]/5 rounded-full z-0"></div>
              </div>

              {/* Card 2 */}
              <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col gap-4 relative overflow-hidden">
                <div className="flex justify-between items-start z-10">
                  <div className="bg-orange-50 dark:bg-orange-900/30 p-3 rounded-lg text-orange-600">
                    <span className="material-symbols-outlined">pending_actions</span>
                  </div>
                </div>
                <div className="z-10">
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Tâches en Attente</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">5</h3>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white dark:bg-[#1a2632] p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col gap-4 relative overflow-hidden">
                <div className="flex justify-between items-start z-10">
                  <div className="bg-red-50 dark:bg-red-900/30 p-3 rounded-lg text-[#ef4444]">
                    <span className="material-symbols-outlined">account_balance_wallet</span>
                  </div>
                  <span className="bg-red-100 text-[#ef4444] text-xs font-bold px-2 py-1 rounded-full">-5%</span>
                </div>
                <div className="z-10">
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Solde Portefeuille</p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">1,200€</h3>
                </div>
              </div>
            </div>

            {/* Split Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column (Main) */}
              <div className="lg:col-span-2 flex flex-col gap-8">
                
                {/* Chart Section */}
                <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Aperçu des Performances</h3>
                      <p className="text-sm text-slate-500">Engagement sur les 30 derniers jours</p>
                    </div>
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
                      <span className="material-symbols-outlined text-lg">trending_up</span>
                      <span className="text-sm font-bold">+24%</span>
                    </div>
                  </div>
                  
                  {/* Chart SVG */}
                  <div className="w-full h-[200px] relative">
                    <svg className="w-full h-full text-[#197fe6] overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
                      {/* Grid lines */}
                      {[0, 10, 20, 30, 40].map((y) => (
                        <line key={y} stroke="#e2e8f0" strokeWidth="0.2" x1="0" x2="100" y1={y} y2={y}></line>
                      ))}
                      
                      {/* The Graph Line */}
                      <path d="M0 35 Q 10 38, 20 25 T 40 20 T 60 15 T 80 25 T 100 5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="0.8"></path>
                      
                      {/* Gradient Fill Under Graph */}
                      <path d="M0 35 Q 10 38, 20 25 T 40 20 T 60 15 T 80 25 T 100 5 V 40 H 0 Z" fill="url(#blue-gradient)" opacity="0.1"></path>
                      
                      {/* Defs */}
                      <defs>
                        <linearGradient id="blue-gradient" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#197fe6"></stop>
                          <stop offset="100%" stopColor="#ffffff" stopOpacity="0"></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                    {/* Days Labels */}
                    <div className="flex justify-between mt-2 text-xs text-slate-400 font-medium">
                      <span>Lun</span><span>Mar</span><span>Mer</span><span>Jeu</span><span>Ven</span><span>Sam</span><span>Dim</span>
                    </div>
                  </div>
                </div>

                {/* Recent Orders Table */}
                <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Commandes Récentes</h3>
                    <a className="text-sm text-[#197fe6] font-bold hover:underline" href="#">Voir Tout</a>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium">
                        <tr>
                          <th className="px-6 py-4">Service</th>
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4">Montant</th>
                          <th className="px-6 py-4">Statut</th>
                          <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="px-6 py-4 font-bold text-slate-900 dark:text-white flex items-center gap-3">
                            <div className="h-8 w-8 rounded bg-[#197fe6]/10 flex items-center justify-center text-[#197fe6]">
                              <span className="material-symbols-outlined text-lg">design_services</span>
                            </div>
                            Logo Design
                          </td>
                          <td className="px-6 py-4 text-slate-500">24 Oct, 2023</td>
                          <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">350.00€</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> En cours
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-slate-400 hover:text-[#197fe6] transition-colors">
                              <span className="material-symbols-outlined">more_vert</span>
                            </button>
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="px-6 py-4 font-bold text-slate-900 dark:text-white flex items-center gap-3">
                            <div className="h-8 w-8 rounded bg-[#197fe6]/10 flex items-center justify-center text-[#197fe6]">
                              <span className="material-symbols-outlined text-lg">campaign</span>
                            </div>
                            Boost Social
                          </td>
                          <td className="px-6 py-4 text-slate-500">21 Oct, 2023</td>
                          <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">120.00€</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Terminé
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-slate-400 hover:text-[#197fe6] transition-colors">
                              <span className="material-symbols-outlined">more_vert</span>
                            </button>
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="px-6 py-4 font-bold text-slate-900 dark:text-white flex items-center gap-3">
                            <div className="h-8 w-8 rounded bg-[#197fe6]/10 flex items-center justify-center text-[#197fe6]">
                              <span className="material-symbols-outlined text-lg">videocam</span>
                            </div>
                            Montage Vidéo
                          </td>
                          <td className="px-6 py-4 text-slate-500">18 Oct, 2023</td>
                          <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">80.00€</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Brouillon
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-slate-400 hover:text-[#197fe6] transition-colors">
                              <span className="material-symbols-outlined">more_vert</span>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right Column (Sidebar) */}
              <div className="flex flex-col gap-8">
                
                {/* Subscription Widget */}
                <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#197fe6] to-[#ef4444]"></div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Plan Actuel</h3>
                    <span className="bg-[#197fe6]/10 text-[#197fe6] text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">Pro</span>
                  </div>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">49€</span>
                    <span className="text-slate-500 text-sm">/ mois</span>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-xs font-medium text-slate-500">
                      <span>Crédits Utilisés</span>
                      <span>75%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                      <div className="bg-[#197fe6] h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                  </div>
                  <button className="w-full py-2.5 rounded-lg border border-[#ef4444] text-[#ef4444] hover:bg-[#ef4444] hover:text-white font-bold text-sm transition-all flex justify-center items-center gap-2">
                    <span className="material-symbols-outlined text-lg">upgrade</span>
                    Mettre à jour
                  </button>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-white dark:bg-[#1a2632] p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[#197fe6] dark:hover:border-[#197fe6] hover:shadow-md transition-all group flex flex-col items-center gap-2 text-center">
                    <div className="bg-blue-50 dark:bg-slate-700 group-hover:bg-[#197fe6] group-hover:text-white transition-colors h-10 w-10 rounded-full flex items-center justify-center text-[#197fe6]">
                      <span className="material-symbols-outlined">edit_document</span>
                    </div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Nouveau Brief</span>
                  </button>
                  <button className="bg-white dark:bg-[#1a2632] p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[#ef4444] dark:hover:border-[#ef4444] hover:shadow-md transition-all group flex flex-col items-center gap-2 text-center">
                    <div className="bg-red-50 dark:bg-slate-700 group-hover:bg-[#ef4444] group-hover:text-white transition-colors h-10 w-10 rounded-full flex items-center justify-center text-[#ef4444]">
                      <span className="material-symbols-outlined">support_agent</span>
                    </div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Support</span>
                  </button>
                  <button className="bg-white dark:bg-[#1a2632] p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[#197fe6] dark:hover:border-[#197fe6] hover:shadow-md transition-all group flex flex-col items-center gap-2 text-center">
                    <div className="bg-blue-50 dark:bg-slate-700 group-hover:bg-[#197fe6] group-hover:text-white transition-colors h-10 w-10 rounded-full flex items-center justify-center text-[#197fe6]">
                      <span className="material-symbols-outlined">receipt_long</span>
                    </div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Factures</span>
                  </button>
                  <button className="bg-white dark:bg-[#1a2632] p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[#197fe6] dark:hover:border-[#197fe6] hover:shadow-md transition-all group flex flex-col items-center gap-2 text-center">
                    <div className="bg-blue-50 dark:bg-slate-700 group-hover:bg-[#197fe6] group-hover:text-white transition-colors h-10 w-10 rounded-full flex items-center justify-center text-[#197fe6]">
                      <span className="material-symbols-outlined">group_add</span>
                    </div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Trouver Talent</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export { DashboardPage };
export default DashboardPage;