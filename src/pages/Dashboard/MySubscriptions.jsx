import React from 'react';

const MySubscriptionsPage = () => {
  return (
    <div className="bg-bgLight text-secondary font-display min-h-screen flex flex-col antialiased">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/30">
              <span className="material-symbols-outlined text-xl">rocket_launch</span>
            </div>
            <h1 className="text-xl font-black tracking-tight text-secondary">Level Boost</h1>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a className="text-slate-500 hover:text-primary text-sm font-bold transition-colors" href="#">Tableau de bord</a>
            <a className="text-primary text-sm font-bold flex flex-col relative" href="#">
              Services
              <span className="absolute -bottom-[22px] left-0 right-0 h-[3px] bg-primary rounded-t-full"></span>
            </a>
            <a className="text-slate-500 hover:text-primary text-sm font-bold transition-colors" href="#">Factures</a>
            <a className="text-slate-500 hover:text-primary text-sm font-bold transition-colors" href="#">Support</a>
          </nav>

          {/* User Profile */}
          <div className="flex items-center gap-4">
            <button className="size-10 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 size-2 bg-primary rounded-full border-2 border-white"></span>
            </button>
            <div 
              className="size-10 bg-center bg-no-repeat bg-cover rounded-full border-2 border-slate-100 cursor-pointer"
              style={{ backgroundImage: `url("https://ui-avatars.com/api/?name=User&background=3A3086&color=fff")` }}
            ></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-6 py-8">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap gap-2 mb-6 items-center">
          <a className="text-slate-500 text-sm font-medium hover:text-primary" href="#">Accueil</a>
          <span className="material-symbols-outlined text-slate-300 text-sm">chevron_right</span>
          <span className="text-secondary text-sm font-bold">Mes Abonnements</span>
        </div>

        {/* Page Heading & Action */}
        <div className="flex flex-wrap justify-between items-end gap-4 mb-10">
          <div>
            <h2 className="text-secondary text-4xl font-black leading-tight tracking-tight">Mes Abonnements</h2>
            <p className="text-slate-500 mt-2 text-lg">Gérez vos services actifs et consultez votre historique.</p>
          </div>
          <button className="flex items-center gap-2 bg-primary hover:bg-red-600 transition-all text-white h-12 px-6 rounded-full shadow-lg shadow-primary/30 active:scale-95">
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span className="text-sm font-bold">Nouveau Service</span>
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard title="Abonnements Actifs" value="4" icon="subscriptions" colorClass="bg-red-50 text-primary" />
          <StatCard title="Dépenses (Mois)" value="250k" unit="FCFA" icon="payments" colorClass="bg-purple-50 text-secondary" />
          <StatCard title="Prochain paiement" value="24 Oct" icon="calendar_clock" colorClass="bg-amber-50 text-accentYellow" />
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 mb-8">
          <div className="flex gap-8">
            <button className="flex items-center gap-2 border-b-[3px] border-primary text-primary pb-3 px-2 font-bold text-sm">
              <span className="material-symbols-outlined text-[20px]">grid_view</span>
              Services Actifs
            </button>
            <button className="flex items-center gap-2 border-b-[3px] border-transparent text-slate-500 hover:text-secondary pb-3 px-2 font-bold text-sm transition-colors">
              <span className="material-symbols-outlined text-[20px]">history</span>
              Historique
            </button>
          </div>
        </div>

        {/* Subscriptions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Social Media */}
          <SubscriptionCard 
            title="Social Media Boost"
            price="85 000"
            period="mois"
            status="Actif"
            expiry="24 Oct 2023"
            progress={75}
            color="bg-primary"
            icon="campaign"
          />
          {/* Card 2: SEO */}
          <SubscriptionCard 
            title="SEO Audit Pro"
            price="45 000"
            period="mois"
            status="Actif"
            expiry="01 Nov 2023"
            progress={20}
            color="bg-secondary"
            icon="query_stats"
          />
          {/* Card 3: Branding (Action Required) */}
          <SubscriptionCard 
            title="Brand Identity Kit"
            price="120 000"
            period="an"
            status="Expiré"
            expiry="Hier"
            progress={100}
            color="bg-accentYellow"
            icon="palette"
            actionRequired
          />
        </div>

        {/* Activity Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-lg font-bold text-secondary">Activité Récente</h3>
            <a className="text-sm font-bold text-primary hover:underline" href="#">Voir tout</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-bold">Service</th>
                  <th className="px-6 py-4 font-bold">Date</th>
                  <th className="px-6 py-4 font-bold">Montant</th>
                  <th className="px-6 py-4 font-bold">Statut</th>
                  <th className="px-6 py-4 font-bold text-right">Facture</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                <TableRow name="Social Media Boost" date="24 Sept 2023" amount="85 000" status="Payé" icon="campaign" />
                <TableRow name="SEO Audit Pro" date="01 Sept 2023" amount="45 000" status="Payé" icon="query_stats" />
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Sous-composants pour la propreté du code ---

const StatCard = ({ title, value, unit, icon, colorClass }) => (
  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between group hover:border-primary/30 transition-colors">
    <div className="flex flex-col gap-1">
      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{title}</p>
      <p className="text-secondary text-3xl font-black">{value} {unit && <span className="text-lg text-slate-400 font-medium">{unit}</span>}</p>
    </div>
    <div className={`size-12 rounded-full ${colorClass} flex items-center justify-center transition-colors`}>
      <span className="material-symbols-outlined">{icon}</span>
    </div>
  </div>
);

const SubscriptionCard = ({ title, price, period, status, expiry, progress, color, icon, actionRequired }) => (
  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col relative overflow-hidden">
    <div className={`absolute top-0 left-0 right-0 h-1.5 ${color}`}></div>
    <div className="flex justify-between items-start mb-4">
      <div className="size-12 rounded-xl bg-slate-50 flex items-center justify-center text-secondary">
        <span className="material-symbols-outlined text-2xl">{icon}</span>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${actionRequired ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
        <span className={`size-1.5 rounded-full ${actionRequired ? 'bg-amber-600' : 'bg-green-600 animate-pulse'}`}></span> {status}
      </span>
    </div>
    <div className="mb-6">
      <h3 className="text-xl font-bold text-secondary mb-1">{title}</h3>
      <p className="text-slate-500 text-sm">Gestion des services actifs</p>
    </div>
    <div className="flex items-baseline gap-1 mb-6">
      <span className="text-2xl font-black text-secondary">{price}</span>
      <span className="text-sm font-bold text-slate-500">FCFA / {period}</span>
    </div>
    <div className="space-y-3 mb-6">
      <div className="flex justify-between text-sm">
        <span className="text-slate-500">Renouvellement</span>
        <span className={`font-bold ${actionRequired ? 'text-primary' : 'text-secondary'}`}>{expiry}</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
        <div className={`${color} h-full rounded-full`} style={{ width: `${progress}%` }}></div>
      </div>
    </div>
    <div className="mt-auto flex gap-3">
      {actionRequired ? (
        <button className="w-full bg-primary hover:bg-red-600 text-white font-bold py-2.5 rounded-full text-sm transition-colors shadow-lg shadow-red-100">
          Régulariser
        </button>
      ) : (
        <>
          <button className="flex-1 bg-slate-50 hover:bg-slate-100 text-secondary font-bold py-2.5 rounded-full text-sm transition-colors">Gérer</button>
          <button className="flex-1 bg-secondary text-white hover:bg-opacity-90 font-bold py-2.5 rounded-full text-sm transition-colors">Upgrade</button>
        </>
      )}
    </div>
  </div>
);

const TableRow = ({ name, date, amount, status, icon }) => (
  <tr className="hover:bg-slate-50 transition-colors">
    <td className="px-6 py-4 font-bold text-secondary flex items-center gap-3">
      <div className="size-8 bg-slate-100 rounded-lg flex items-center justify-center text-secondary">
        <span className="material-symbols-outlined text-sm">{icon}</span>
      </div>
      {name}
    </td>
    <td className="px-6 py-4 text-slate-600">{date}</td>
    <td className="px-6 py-4 font-medium text-secondary">{amount} FCFA</td>
    <td className="px-6 py-4">
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
        {status}
      </span>
    </td>
    <td className="px-6 py-4 text-right">
      <button className="text-slate-400 hover:text-primary transition-colors">
        <span className="material-symbols-outlined">download</span>
      </button>
    </td>
  </tr>
);
export {MySubscriptionsPage};
export default MySubscriptionsPage;