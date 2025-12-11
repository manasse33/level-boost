// ============= REMAINING PAGES =============
// Pages Talents, Contests et Admin

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye, Users, Filter, ShoppingCart, TrendingUp, Star,
  Plus, Edit, Trash2, Search, Download
} from 'lucide-react';
import {
  PageLoader, TalentCard, ContestCard, Modal, Toast,
  ContestParticipationForm, Badge, Button, StatsDashboard,
  LeadCard, DataTable, ReportCard, Card, EmptyState,
  FilterPanel, SearchBar, Tabs
} from '../../components';

// ============= TALENTS PAGE =============
export const TalentsPage = () => {
  const [loading, setLoading] = useState(true);
  const [talents, setTalents] = useState([]);
  const [filter, setFilter] = useState('Tous');
  const [selectedTalent, setSelectedTalent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Mock data
  const mockTalents = [
    {
      id: 1,
      name: 'Sarah L.',
      role: 'Pop / R&B',
      type: 'Artistes',
      img: 'https://images.unsplash.com/photo-1516575334481-f85287c2c81d?w=800',
      bio: 'Sarah L. redéfinit la scène Pop locale avec des textes poignants et une voix cristalline.',
      stats: { fans: '45k', streams: '1.2M', engagement: '8.5%' },
      socials: ['@sarah_l_music', 'spotify/sarah-l']
    },
    {
      id: 2,
      name: 'TechFlow',
      role: 'Fintech',
      type: 'Startups',
      img: 'https://images.unsplash.com/photo-1559136555-930d72f1d30c?w=800',
      bio: 'La solution de paiement qui simplifie la vie des créateurs africains.',
      stats: { users: '12k', vol: '500M FCFA', growth: '+300%' },
      socials: ['techflow.app', 'linkedin/techflow']
    },
    {
      id: 3,
      name: 'Marc D.',
      role: 'Danse Urbaine',
      type: 'Artistes',
      img: 'https://images.unsplash.com/photo-1535525266644-b72ef6a92047?w=800',
      bio: 'Chorégraphe pour les plus grands clips de l\'année.',
      stats: { views: '5M+', followers: '210k', projects: '15' },
      socials: ['tiktok/@marcdance', 'insta/@marcd']
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setTalents(mockTalents);
      setLoading(false);
    }, 500);
  }, []);

  const filtered = filter === 'Tous' 
    ? talents 
    : talents.filter(t => t.type === filter);

  if (loading) return <PageLoader />;

  return (
    <div className="min-h-screen bg-slate-50">
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedTalent(null);
        }}
        title="Profil Talent"
        size="lg"
      >
        {selectedTalent && (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <img
                src={selectedTalent.img}
                alt={selectedTalent.name}
                className="w-full rounded-xl"
              />
              <div className="mt-4 space-y-2">
                {selectedTalent.socials.map((social, i) => (
                  <Badge key={i} variant="default" size="sm" className="w-full">
                    {social}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="md:w-2/3">
              <Badge variant="primary" className="mb-2">
                {selectedTalent.type}
              </Badge>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                {selectedTalent.name}
              </h2>
              <p className="text-xl text-slate-600 mb-6">{selectedTalent.role}</p>
              <p className="text-slate-600 mb-6">{selectedTalent.bio}</p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {Object.entries(selectedTalent.stats).map(([key, val], i) => (
                  <Card key={i} className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">{val}</div>
                    <div className="text-xs text-slate-400 uppercase">{key}</div>
                  </Card>
                ))}
              </div>

              <Button variant="primary" fullWidth>
                Collaborer
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Hero */}
      <div className="relative bg-slate-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">
            Nos Pépites. <span className="text-indigo-400">Votre Futur.</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-12">
            Level Boost accompagne la nouvelle vague de créateurs africains.
          </p>
          <div className="flex gap-8">
            <div>
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm text-slate-400">Talents accompagnés</div>
            </div>
            <div>
              <div className="text-3xl font-bold">12M</div>
              <div className="text-sm text-slate-400">Vues cumulées</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Filters */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Catalogue des Talents</h2>
          <div className="flex gap-2">
            {['Tous', 'Artistes', 'Startups', 'Influenceurs'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition ${
                  filter === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Talents Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filtered.map(talent => (
              <TalentCard
                key={talent.id}
                talent={talent}
                onClick={() => {
                  setSelectedTalent(talent);
                  setModalOpen(true);
                }}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};





// ============= ADMIN ORDERS =============
export const AdminOrders = ({ apiRequest }) => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await apiRequest('/admin/orders');
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <PageLoader />;

  const columns = [
    { key: 'order_number', label: 'N° Commande' },
    {
      key: 'user',
      label: 'Client',
      render: (val, row) => row.user?.name || 'N/A'
    },
    {
      key: 'total_amount',
      label: 'Montant',
      render: (val) => `${val?.toLocaleString()} FCFA`
    },
    {
      key: 'status',
      label: 'Statut',
      render: (val) => <Badge variant={val === 'completed' ? 'success' : 'warning'}>{val}</Badge>
    },
    {
      key: 'created_at',
      label: 'Date',
      render: (val) => new Date(val).toLocaleDateString('fr-FR')
    },
  ];

  const tabs = [
    { value: 'all', label: 'Toutes', count: orders.length },
    { value: 'pending', label: 'En attente', count: orders.filter(o => o.status === 'pending').length },
    { value: 'completed', label: 'Terminées', count: orders.filter(o => o.status === 'completed').length },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Toutes les Commandes</h1>
          <p className="text-slate-600 mt-1">Gérez toutes les commandes clients</p>
        </div>

        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <div className="mt-6">
          {orders.length > 0 ? (
            <DataTable
              columns={columns}
              data={orders}
              searchable
              onSearch={(query) => console.log('Search:', query)}
            />
          ) : (
            <EmptyState
              icon={ShoppingCart}
              title="Aucune commande"
              description="Les commandes apparaîtront ici"
            />
          )}
        </div>
      </div>
    </div>
  );
};

// ============= ADMIN LEADS =============
export const AdminLeads = ({ apiRequest }) => {
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const data = await apiRequest('/admin/leads');
      setLeads(data.leads || []);
    } catch (error) {
      console.error('Error loading leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLead = (lead) => {
    setToast({ type: 'info', message: 'Fonction en développement' });
  };

  const handleDeleteLead = (lead) => {
    if (window.confirm(`Supprimer le lead "${lead.name}" ?`)) {
      setToast({ type: 'success', message: 'Lead supprimé' });
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <AnimatePresence>
        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Gestion des Leads</h1>
            <p className="text-slate-600 mt-1">Suivez vos prospects</p>
          </div>
          <Button variant="primary" icon={Plus}>
            Nouveau Lead
          </Button>
        </div>

        {leads.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leads.map(lead => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onUpdate={handleUpdateLead}
                onDelete={handleDeleteLead}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Users}
            title="Aucun lead"
            description="Les leads apparaîtront ici"
            action={
              <Button variant="primary" icon={Plus}>
                Ajouter un lead
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
};