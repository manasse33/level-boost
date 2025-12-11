import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, ShoppingCart, BarChart3, Star, Plus, Edit, Trash2,
  Eye, TrendingUp, Package, Settings as SettingsIcon
} from 'lucide-react';
import {
  PageLoader, StatCard, Button, Card, Modal, Toast,
  ProfileCard, OrderCard, SubscriptionCard, PostCard,
  CampaignCard, EmptyState, ProfileForm, OrderForm,
  PostForm, CampaignForm, ActivityFeed, QuickActions
} from '../../components';

// ============= DASHBOARD OVERVIEW =============
export const DashboardOverview = ({ user, onNavigate, apiRequest }) => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [ordersData, profilesData] = await Promise.all([
        apiRequest('/orders'),
        apiRequest('/profiles'),
      ]);
      
      setOrders(ordersData.orders || []);
      setProfiles(profilesData.profiles || []);
      
      // Calculate stats
      setStats({
        profiles: profilesData.profiles?.length || 0,
        orders: ordersData.orders?.length || 0,
        posts: 24, // Mock data
        subscriptions: 1, // Mock data
      });
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <PageLoader />;

  const recentActivities = [
    { type: 'order', title: 'Nouvelle commande créée', description: 'Pack Pro Growth', timestamp: 'Il y a 2h' },
    { type: 'post', title: 'Post publié', description: 'Sur Instagram', timestamp: 'Il y a 5h' },
    { type: 'profile', title: 'Profil mis à jour', description: 'Sarah L. Music', timestamp: 'Hier' },
  ];

  const quickActions = [
    { label: 'Créer un profil', icon: Users, onClick: () => onNavigate('/dashboard/profiles/new') },
    { label: 'Commander un pack', icon: Package, onClick: () => onNavigate('/pricing') },
    { label: 'Participer à un concours', icon: Star, onClick: () => onNavigate('/contests') },
    { label: 'Créer un post', icon: BarChart3, onClick: () => onNavigate('/dashboard/posts/new') },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Bienvenue, {user?.name}
          </h1>
          <p className="text-slate-600 mt-1">
            Gérez votre présence digitale et vos projets
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            label="Profils"
            value={stats?.profiles || 0}
            color="indigo"
          />
          <StatCard
            icon={ShoppingCart}
            label="Commandes"
            value={stats?.orders || 0}
            color="emerald"
          />
          <StatCard
            icon={BarChart3}
            label="Posts"
            value={stats?.posts || 0}
            color="orange"
          />
          <StatCard
            icon={Star}
            label="Abonnements"
            value={stats?.subscriptions || 0}
            color="purple"
          />
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <QuickActions actions={quickActions} />

          {/* Recent Activity */}
          <ActivityFeed activities={recentActivities} />

          {/* Recent Orders */}
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900">
                Dernières Commandes
              </h3>
              <Button
                onClick={() => onNavigate('/dashboard/orders')}
                variant="ghost"
                size="sm"
              >
                Voir tout
              </Button>
            </div>
            <div className="space-y-4">
              {orders.length > 0 ? (
                orders.slice(0, 3).map((order) => (
                  <div
                    key={order.id}
                    className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0"
                  >
                    <div>
                      <div className="font-medium text-slate-900">
                        {order.order_number}
                      </div>
                      <div className="text-sm text-slate-500">{order.status}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900">
                        {order.total_amount?.toLocaleString()} FCFA
                      </div>
                      <div className="text-xs text-slate-500">
                        {order.payment_status}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <EmptyState
                  icon={ShoppingCart}
                  title="Aucune commande"
                  description="Commencez par commander un pack"
                  action={
                    <Button
                      onClick={() => onNavigate('/pricing')}
                      variant="primary"
                      size="sm"
                    >
                      Voir les packs
                    </Button>
                  }
                />
              )}
            </div>
          </Card>

          {/* Quick Stats */}
          <Card>
            <h3 className="text-lg font-bold text-slate-900 mb-6">
              Performances du mois
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Vues totales', value: '12,450', change: +15 },
                { label: 'Engagement', value: '8.5%', change: +3 },
                { label: 'Nouveaux followers', value: '342', change: +28 },
              ].map((metric, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-slate-600">{metric.label}</span>
                  <div className="text-right">
                    <div className="font-bold text-slate-900">{metric.value}</div>
                    <div className={`text-xs ${metric.change > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {metric.change > 0 ? '+' : ''}{metric.change}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};





