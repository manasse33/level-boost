// ============= ADMIN & ANALYTICS COMPONENTS =============
// Composants pour l'administration et les rapports

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign,
  Eye, Star, Calendar, Download, Filter, Search, MoreVertical,
  CheckCircle, XCircle, Clock, AlertCircle
} from 'lucide-react';
import { Card, Badge, Button, Input, Select } from '../../components/common';


// ============= ADMIN DASHBOARD =============
export const AdminDashboard = ({ apiRequest }) => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await apiRequest('/admin/dashboard');
      setStats(data);
    } catch (error) {
      console.error('Error loading admin dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <PageLoader />;

  // Mock stats
  const mockStats = {
    revenue: 5250000,
    revenueTrend: 23,
    orders: 156,
    ordersTrend: 12,
    users: 423,
    usersTrend: 34,
    conversion: 12.5,
    conversionTrend: 5,
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Dashboard Admin</h1>
          <p className="text-slate-600 mt-1">Vue d'ensemble des performances</p>
        </div>

        <StatsDashboard stats={mockStats} />

        <div className="grid lg:grid-cols-2 gap-6 mt-8">
          <Card>
            <h3 className="text-lg font-bold text-slate-900 mb-6">
              Dernières activités
            </h3>
            <div className="space-y-4">
              {[
                { type: 'order', text: 'Nouvelle commande #1234', time: 'Il y a 5 min' },
                { type: 'user', text: 'Nouvel utilisateur inscrit', time: 'Il y a 12 min' },
                { type: 'contest', text: 'Nouvelle participation au concours', time: 'Il y a 1h' },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                  <span className="text-slate-700">{activity.text}</span>
                  <span className="text-xs text-slate-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-bold text-slate-900 mb-6">
              Actions rapides
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="secondary" size="sm" fullWidth>
                Créer un pack
              </Button>
              <Button variant="secondary" size="sm" fullWidth>
                Nouveau concours
              </Button>
              <Button variant="secondary" size="sm" fullWidth>
                Exporter données
              </Button>
              <Button variant="secondary" size="sm" fullWidth>
                Voir rapports
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};