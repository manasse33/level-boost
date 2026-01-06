import React from 'react';

const MyOrdersPage = () => {
  // Style pour le motif africain (CSS-in-JS)
  const africanPatternStyle = {
    backgroundImage: 'radial-gradient(#d46211 1px, transparent 1px)',
    backgroundSize: '20px 20px',
    opacity: 0.05
  };

  return (
    <div className="bg-[#f8f7f6] dark:bg-[#221810] text-[#1b130d] dark:text-[#f3ece7] font-['Manrope',sans-serif] overflow-x-hidden min-h-screen flex flex-col">
      
      {/* Top Navigation */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e7d9cf] dark:border-[#3e2c22] bg-[#f8f7f6] dark:bg-[#221810] px-6 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-[#d46211] rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-xl">rocket_launch</span>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Level Boost</h2>
        </div>
        <div className="flex flex-1 justify-end gap-6 items-center">
          <div className="hidden md:flex gap-2">
            <button className="flex items-center justify-center rounded-lg w-10 h-10 bg-[#f3ece7] dark:bg-[#3e2c22] hover:bg-[#d46211]/10 text-[#1b130d] dark:text-[#f3ece7]">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="flex items-center justify-center rounded-lg w-10 h-10 bg-[#f3ece7] dark:bg-[#3e2c22] hover:bg-[#d46211]/10 text-[#1b130d] dark:text-[#f3ece7]">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
          <div className="flex items-center gap-3 pl-4 border-l border-[#e7d9cf] dark:border-[#3e2c22]">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold">Jean Kouassi</p>
              <p className="text-xs text-[#d46211]">Admin Marketing</p>
            </div>
            <div 
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 h-10 border-2 border-[#d46211]" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCUuGvd9tYd1oEgh78TIrJMgf0EQZpeNdAIomU-s28IFNQFWaK35bWoCtJ5fFjrgjGY10aMXPjDNxeuPAT314BQPGMmYH71NZhEkm6ojIfY_hZ_hnvx78aLdL0wZsT11crQIqCBW3zbNO3y_ZxnyKJeJ_Mgs091dc3J0LhR3vfxIpwEYlFSom3wEJ_3lHi3G4CcL2DXzpguBcDRYzGdp2NGt7FJNLXOCzFDoF6ywnhnzQB4ORD3j2ve4JP8ooF60-FOPJOGBrP25S1r")' }}
            ></div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Side Navigation */}
        <aside className="hidden lg:flex w-72 flex-col justify-between border-r border-[#e7d9cf] dark:border-[#3e2c22] bg-[#f8f7f6] dark:bg-[#221810] p-4 sticky top-[65px] h-[calc(100vh-65px)]">
          <div className="flex flex-col gap-2">
            <div className="px-3 py-4 mb-4">
              <h1 className="text-base font-bold uppercase tracking-wider text-[#d46211] opacity-80 text-xs">Menu Principal</h1>
            </div>
            <a className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#d46211]/10 transition-colors group" href="#">
              <span className="material-symbols-outlined text-[#9a6c4c] dark:text-[#d0b8aa] group-hover:text-[#d46211]">dashboard</span>
              <p className="text-sm font-medium">Tableau de bord</p>
            </a>
            <a className="flex items-center gap-3 px-3 py-3 rounded-lg bg-[#d46211]/10 text-[#d46211]" href="#">
              <span className="material-symbols-outlined fill-1">shopping_bag</span>
              <p className="text-sm font-bold">Mes Commandes</p>
            </a>
            <a className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#d46211]/10 transition-colors group" href="#">
              <span className="material-symbols-outlined text-[#9a6c4c] dark:text-[#d0b8aa] group-hover:text-[#d46211]">briefcase_meal</span>
              <p className="text-sm font-medium">Services & Packs</p>
            </a>
            <a className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#d46211]/10 transition-colors group" href="#">
              <span className="material-symbols-outlined text-[#9a6c4c] dark:text-[#d0b8aa] group-hover:text-[#d46211]">analytics</span>
              <p className="text-sm font-medium">Rapports</p>
            </a>
            <div className="px-3 py-4 mt-4 mb-2">
              <h1 className="text-base font-bold uppercase tracking-wider text-[#d46211] opacity-80 text-xs">Compte</h1>
            </div>
            <a className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#d46211]/10 transition-colors group" href="#">
              <span className="material-symbols-outlined text-[#9a6c4c] dark:text-[#d0b8aa] group-hover:text-[#d46211]">credit_card</span>
              <p className="text-sm font-medium">Facturation</p>
            </a>
            <a className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#d46211]/10 transition-colors group" href="#">
              <span className="material-symbols-outlined text-[#9a6c4c] dark:text-[#d0b8aa] group-hover:text-[#d46211]">support_agent</span>
              <p className="text-sm font-medium">Support</p>
            </a>
          </div>
          <div className="p-4 bg-[#f3ece7] dark:bg-[#3e2c22]/50 rounded-xl mt-auto">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-[#d46211]">diamond</span>
              <p className="font-bold text-sm">Boost Premium</p>
            </div>
            <p className="text-xs text-[#9a6c4c] dark:text-[#d0b8aa] mb-3">Obtenez 15% de réduction sur tous les packs.</p>
            <button className="w-full py-2 bg-[#d46211] text-white text-xs font-bold rounded hover:bg-[#d46211]/90 transition-colors">Upgrade</button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#f8f7f6] dark:bg-[#221810]">
          {/* Page Heading & Actions */}
          <div className="w-full p-6 sm:p-10 border-b border-[#e7d9cf] dark:border-[#3e2c22]" style={africanPatternStyle}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 max-w-6xl mx-auto">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-[#9a6c4c] dark:text-[#d0b8aa]">
                  <span>Accueil</span>
                  <span className="material-symbols-outlined text-xs">chevron_right</span>
                  <span className="text-[#d46211] font-medium">Commandes</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-[#1b130d] dark:text-white tracking-tight">Mes Commandes / Packs</h1>
                <p className="text-[#9a6c4c] dark:text-[#d0b8aa] max-w-2xl">
                  Consultez l'historique de vos achats et suivez l'état d'avancement de vos campagnes marketing.
                </p>
              </div>
              <button className="flex items-center gap-2 bg-[#d46211] hover:bg-[#b8530d] text-white px-5 py-3 rounded-lg font-bold shadow-lg shadow-[#d46211]/20 transition-all hover:scale-105">
                <span className="material-symbols-outlined">add_circle</span>
                <span>Nouvelle Commande</span>
              </button>
            </div>
          </div>

          <div className="flex-1 p-6 sm:p-10 max-w-6xl mx-auto w-full flex flex-col gap-8">
            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Stat Card 1 */}
              <div className="relative overflow-hidden bg-white dark:bg-[#2a1e16] p-6 rounded-xl border border-[#e7d9cf] dark:border-[#3e2c22] shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute right-0 top-0 p-4 opacity-10">
                  <span className="material-symbols-outlined text-6xl text-[#d46211]">pending_actions</span>
                </div>
                <div className="flex flex-col gap-1 relative z-10">
                  <p className="text-[#9a6c4c] dark:text-[#d0b8aa] font-medium text-sm">Commandes en cours</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#1b130d] dark:text-white">3</span>
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-[10px]">trending_up</span> +1 cette semaine
                    </span>
                  </div>
                </div>
                <div className="h-1 w-full bg-[#f3ece7] dark:bg-[#3e2c22] mt-4 rounded-full overflow-hidden">
                  <div className="h-full bg-[#d46211] w-2/3 rounded-full"></div>
                </div>
              </div>
              {/* Stat Card 2 */}
              <div className="relative overflow-hidden bg-white dark:bg-[#2a1e16] p-6 rounded-xl border border-[#e7d9cf] dark:border-[#3e2c22] shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute right-0 top-0 p-4 opacity-10">
                  <span className="material-symbols-outlined text-6xl text-[#d46211]">payments</span>
                </div>
                <div className="flex flex-col gap-1 relative z-10">
                  <p className="text-[#9a6c4c] dark:text-[#d0b8aa] font-medium text-sm">Total Dépensé (2024)</p>
                  <p className="text-3xl font-black text-[#1b130d] dark:text-white">2.45M <span className="text-lg text-[#9a6c4c] dark:text-[#d0b8aa] font-bold">FCFA</span></p>
                </div>
                <div className="h-1 w-full bg-[#f3ece7] dark:bg-[#3e2c22] mt-4 rounded-full overflow-hidden">
                  <div className="h-full bg-[#d46211] w-4/5 rounded-full"></div>
                </div>
              </div>
              {/* Stat Card 3 */}
              <div className="relative overflow-hidden bg-white dark:bg-[#2a1e16] p-6 rounded-xl border border-[#e7d9cf] dark:border-[#3e2c22] shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute right-0 top-0 p-4 opacity-10">
                  <span className="material-symbols-outlined text-6xl text-[#d46211]">inventory_2</span>
                </div>
                <div className="flex flex-col gap-1 relative z-10">
                  <p className="text-[#9a6c4c] dark:text-[#d0b8aa] font-medium text-sm">Packs Actifs</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#1b130d] dark:text-white">1</span>
                    <span className="text-sm font-medium text-[#1b130d] dark:text-white">/ 3 Slots</span>
                  </div>
                </div>
                <div className="h-1 w-full bg-[#f3ece7] dark:bg-[#3e2c22] mt-4 rounded-full overflow-hidden">
                  <div className="h-full bg-[#d46211] w-1/3 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Filters & Toolbar */}
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-white dark:bg-[#2a1e16] p-4 rounded-xl border border-[#e7d9cf] dark:border-[#3e2c22] shadow-sm">
              {/* Search */}
              <div className="relative w-full lg:w-96 group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[#9a6c4c] group-focus-within:text-[#d46211] transition-colors">search</span>
                </div>
                <input className="block w-full pl-10 pr-3 py-2.5 border-none bg-[#f8f7f6] dark:bg-[#221810] rounded-lg text-sm text-[#1b130d] dark:text-[#f3ece7] placeholder-[#9a6c4c] focus:ring-2 focus:ring-[#d46211]/50 transition-all" placeholder="Rechercher par ID, service..." type="text"/>
              </div>
              {/* Filters Group */}
              <div className="flex flex-wrap gap-3 w-full lg:w-auto justify-end">
                <div className="relative">
                  <select className="appearance-none bg-[#f8f7f6] dark:bg-[#221810] border-none text-[#1b130d] dark:text-[#f3ece7] text-sm rounded-lg pl-4 pr-10 py-2.5 focus:ring-2 focus:ring-[#d46211]/50 cursor-pointer">
                    <option>Tous les statuts</option>
                    <option>En cours</option>
                    <option>Terminé</option>
                    <option>Annulé</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#9a6c4c]">
                    <span className="material-symbols-outlined text-sm">expand_more</span>
                  </div>
                </div>
                <div className="relative">
                  <select className="appearance-none bg-[#f8f7f6] dark:bg-[#221810] border-none text-[#1b130d] dark:text-[#f3ece7] text-sm rounded-lg pl-4 pr-10 py-2.5 focus:ring-2 focus:ring-[#d46211]/50 cursor-pointer">
                    <option>Derniers 30 jours</option>
                    <option>Cette année</option>
                    <option>Tout l'historique</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#9a6c4c]">
                    <span className="material-symbols-outlined text-sm">calendar_month</span>
                  </div>
                </div>
                <button className="flex items-center justify-center p-2.5 rounded-lg border border-[#e7d9cf] dark:border-[#3e2c22] text-[#9a6c4c] hover:text-[#d46211] hover:border-[#d46211] transition-colors">
                  <span className="material-symbols-outlined">filter_list</span>
                </button>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-white dark:bg-[#2a1e16] rounded-xl border border-[#e7d9cf] dark:border-[#3e2c22] shadow-sm overflow-hidden flex flex-col">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#fcfaf8] dark:bg-[#2f2219] border-b border-[#e7d9cf] dark:border-[#3e2c22]">
                      <th className="p-5 text-xs font-bold uppercase tracking-wider text-[#9a6c4c] dark:text-[#d0b8aa]">ID Commande</th>
                      <th className="p-5 text-xs font-bold uppercase tracking-wider text-[#9a6c4c] dark:text-[#d0b8aa]">Service / Pack</th>
                      <th className="p-5 text-xs font-bold uppercase tracking-wider text-[#9a6c4c] dark:text-[#d0b8aa]">Date</th>
                      <th className="p-5 text-xs font-bold uppercase tracking-wider text-[#9a6c4c] dark:text-[#d0b8aa]">Montant</th>
                      <th className="p-5 text-xs font-bold uppercase tracking-wider text-[#9a6c4c] dark:text-[#d0b8aa]">Statut</th>
                      <th className="p-5 text-xs font-bold uppercase tracking-wider text-[#9a6c4c] dark:text-[#d0b8aa] text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e7d9cf] dark:divide-[#3e2c22]">
                    {/* Row 1 */}
                    <tr className="group hover:bg-[#fcfaf8] dark:hover:bg-[#2f2219] transition-colors">
                      <td className="p-5 text-sm font-medium text-[#9a6c4c] dark:text-[#d0b8aa]">#LB-2023-089</td>
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <span className="material-symbols-outlined">rocket</span>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#1b130d] dark:text-[#f3ece7]">Pack Social Media Boost - Gold</p>
                            <p className="text-xs text-[#9a6c4c] dark:text-[#d0b8aa]">Campagne Facebook & Instagram</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-5 text-sm text-[#1b130d] dark:text-[#f3ece7]">12 Oct 2023</td>
                      <td className="p-5 text-sm font-bold text-[#1b130d] dark:text-[#f3ece7]">850 000 FCFA</td>
                      <td className="p-5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#d46211]/10 text-[#d46211] border border-[#d46211]/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#d46211] mr-1.5 animate-pulse"></span>
                          En cours
                        </span>
                      </td>
                      <td className="p-5 text-right">
                        <button className="text-[#9a6c4c] hover:text-[#d46211] transition-colors p-2 hover:bg-[#d46211]/5 rounded-full">
                          <span className="material-symbols-outlined">visibility</span>
                        </button>
                      </td>
                    </tr>
                    {/* Row 2 */}
                    <tr className="group hover:bg-[#fcfaf8] dark:hover:bg-[#2f2219] transition-colors">
                      <td className="p-5 text-sm font-medium text-[#9a6c4c] dark:text-[#d0b8aa]">#LB-2023-082</td>
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                            <span className="material-symbols-outlined">edit_document</span>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#1b130d] dark:text-[#f3ece7]">Rédaction Contenu SEO</p>
                            <p className="text-xs text-[#9a6c4c] dark:text-[#d0b8aa]">Pack 10 Articles de Blog</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-5 text-sm text-[#1b130d] dark:text-[#f3ece7]">28 Sept 2023</td>
                      <td className="p-5 text-sm font-bold text-[#1b130d] dark:text-[#f3ece7]">300 000 FCFA</td>
                      <td className="p-5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                          Terminé
                        </span>
                      </td>
                      <td className="p-5 text-right">
                        <button className="text-[#9a6c4c] hover:text-[#d46211] transition-colors p-2 hover:bg-[#d46211]/5 rounded-full">
                          <span className="material-symbols-outlined">visibility</span>
                        </button>
                      </td>
                    </tr>
                    {/* Row 3 */}
                    <tr className="group hover:bg-[#fcfaf8] dark:hover:bg-[#2f2219] transition-colors">
                      <td className="p-5 text-sm font-medium text-[#9a6c4c] dark:text-[#d0b8aa]">#LB-2023-075</td>
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                            <span className="material-symbols-outlined">palette</span>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#1b130d] dark:text-[#f3ece7]">Branding & Identité</p>
                            <p className="text-xs text-[#9a6c4c] dark:text-[#d0b8aa]">Refonte Logo + Charte Graphique</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-5 text-sm text-[#1b130d] dark:text-[#f3ece7]">15 Sept 2023</td>
                      <td className="p-5 text-sm font-bold text-[#1b130d] dark:text-[#f3ece7]">500 000 FCFA</td>
                      <td className="p-5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                          Terminé
                        </span>
                      </td>
                      <td className="p-5 text-right">
                        <button className="text-[#9a6c4c] hover:text-[#d46211] transition-colors p-2 hover:bg-[#d46211]/5 rounded-full">
                          <span className="material-symbols-outlined">visibility</span>
                        </button>
                      </td>
                    </tr>
                    {/* Row 4 */}
                    <tr className="group hover:bg-[#fcfaf8] dark:hover:bg-[#2f2219] transition-colors">
                      <td className="p-5 text-sm font-medium text-[#9a6c4c] dark:text-[#d0b8aa]">#LB-2023-060</td>
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400">
                            <span className="material-symbols-outlined">ads_click</span>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#1b130d] dark:text-[#f3ece7]">Google Ads - Starter</p>
                            <p className="text-xs text-[#9a6c4c] dark:text-[#d0b8aa]">Campagne Search 1 Mois</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-5 text-sm text-[#1b130d] dark:text-[#f3ece7]">01 Aout 2023</td>
                      <td className="p-5 text-sm font-bold text-[#1b130d] dark:text-[#f3ece7]">200 000 FCFA</td>
                      <td className="p-5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800">
                          Annulé
                        </span>
                      </td>
                      <td className="p-5 text-right">
                        <button className="text-[#9a6c4c] hover:text-[#d46211] transition-colors p-2 hover:bg-[#d46211]/5 rounded-full">
                          <span className="material-symbols-outlined">visibility</span>
                        </button>
                      </td>
                    </tr>
                    {/* Row 5 */}
                    <tr className="group hover:bg-[#fcfaf8] dark:hover:bg-[#2f2219] transition-colors">
                      <td className="p-5 text-sm font-medium text-[#9a6c4c] dark:text-[#d0b8aa]">#LB-2023-045</td>
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <span className="material-symbols-outlined">rocket</span>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#1b130d] dark:text-[#f3ece7]">Pack Social Media - Silver</p>
                            <p className="text-xs text-[#9a6c4c] dark:text-[#d0b8aa]">Gestion Communauté 3 Mois</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-5 text-sm text-[#1b130d] dark:text-[#f3ece7]">10 Juil 2023</td>
                      <td className="p-5 text-sm font-bold text-[#1b130d] dark:text-[#f3ece7]">600 000 FCFA</td>
                      <td className="p-5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                          Terminé
                        </span>
                      </td>
                      <td className="p-5 text-right">
                        <button className="text-[#9a6c4c] hover:text-[#d46211] transition-colors p-2 hover:bg-[#d46211]/5 rounded-full">
                          <span className="material-symbols-outlined">visibility</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="p-4 border-t border-[#e7d9cf] dark:border-[#3e2c22] flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-[#9a6c4c] dark:text-[#d0b8aa]">Affichage de <span className="font-bold text-[#1b130d] dark:text-[#f3ece7]">1-5</span> sur <span className="font-bold text-[#1b130d] dark:text-[#f3ece7]">12</span> commandes</p>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm rounded-md border border-[#e7d9cf] dark:border-[#3e2c22] text-[#9a6c4c] bg-[#f8f7f6] dark:bg-[#221810] opacity-50 cursor-not-allowed">Précédent</button>
                  <button className="px-3 py-1 text-sm rounded-md bg-[#d46211] text-white font-bold">1</button>
                  <button className="px-3 py-1 text-sm rounded-md border border-[#e7d9cf] dark:border-[#3e2c22] text-[#1b130d] dark:text-[#f3ece7] hover:bg-[#f3ece7] dark:hover:bg-[#3e2c22]">2</button>
                  <button className="px-3 py-1 text-sm rounded-md border border-[#e7d9cf] dark:border-[#3e2c22] text-[#1b130d] dark:text-[#f3ece7] hover:bg-[#f3ece7] dark:hover:bg-[#3e2c22]">3</button>
                  <button className="px-3 py-1 text-sm rounded-md border border-[#e7d9cf] dark:border-[#3e2c22] text-[#1b130d] dark:text-[#f3ece7] hover:bg-[#f3ece7] dark:hover:bg-[#3e2c22]">Suivant</button>
                </div>
              </div>
            </div>

            {/* Banner / Promo Area */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#221810] to-[#3e2c22] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
              <div className="absolute inset-0 opacity-10" style={africanPatternStyle}></div>
              <div className="relative z-10 flex-1">
                <h3 className="text-xl font-bold mb-2">Besoin d'un boost supplémentaire ?</h3>
                <p className="text-white/80 text-sm max-w-md">Découvrez nos nouveaux packs "Influenceur" et touchez une audience encore plus large en Afrique de l'Ouest.</p>
              </div>
              <button className="relative z-10 whitespace-nowrap px-6 py-3 bg-white text-[#221810] font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-md">
                Voir les offres
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export { MyOrdersPage };
export default MyOrdersPage;