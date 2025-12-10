// ============= ADMIN & ANALYTICS COMPONENTS =============
// Composants pour l'administration et les rapports

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign,
  Eye, Star, Calendar, Download, Filter, Search, MoreVertical,
  CheckCircle, XCircle, Clock, AlertCircle
} from 'lucide-react';
import { Card, Badge, Button, Input, Select } from './common';

// ============= STATS DASHBOARD =============
export const StatsDashboard = ({ stats }) => {
  const statCards = [
    {
      label: 'Revenus Total',
      value: `${(stats?.revenue || 0).toLocaleString()} FCFA`,
      icon: DollarSign,
      color: 'emerald',
      trend: stats?.revenueTrend || 0,
    },
    {
      label: 'Commandes',
      value: stats?.orders || 0,
      icon: ShoppingCart,
      color: 'indigo',
      trend: stats?.ordersTrend || 0,
    },
    {
      label: 'Nouveaux Clients',
      value: stats?.users || 0,
      icon: Users,
      color: 'purple',
      trend: stats?.usersTrend || 0,
    },
    {
      label: 'Taux Conversion',
      value: `${stats?.conversion || 0}%`,
      icon: TrendingUp,
      color: 'orange',
      trend: stats?.conversionTrend || 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <Card className="relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              {stat.trend !== 0 && (
                <div className={`flex items-center text-sm font-medium ${
                  stat.trend > 0 ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {stat.trend > 0 ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {Math.abs(stat.trend)}%
                </div>
              )}
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-slate-600">{stat.label}</div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

// ============= LEAD CARD =============
export const LeadCard = ({ lead, onUpdate, onDelete }) => {
  const statusColors = {
    new: 'default',
    contacted: 'primary',
    qualified: 'warning',
    proposal: 'warning',
    negotiation: 'primary',
    won: 'success',
    lost: 'danger',
  };

  const statusLabels = {
    new: 'Nouveau',
    contacted: 'Contacté',
    qualified: 'Qualifié',
    proposal: 'Proposition',
    negotiation: 'Négociation',
    won: 'Gagné',
    lost: 'Perdu',
  };

  return (
    <Card hover>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-900 mb-1">{lead.name}</h3>
          <p className="text-sm text-slate-600">{lead.email}</p>
          {lead.phone && (
            <p className="text-sm text-slate-600">{lead.phone}</p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={statusColors[lead.status]}>
            {statusLabels[lead.status]}
          </Badge>
          <button className="p-2 hover:bg-slate-100 rounded-lg">
            <MoreVertical className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-slate-500 mb-1">Type</p>
          <Badge variant="primary" size="sm">{lead.type}</Badge>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">Source</p>
          <Badge variant="default" size="sm">{lead.source}</Badge>
        </div>
      </div>

      {lead.company && (
        <div className="mb-4">
          <p className="text-xs text-slate-500 mb-1">Entreprise</p>
          <p className="text-sm font-medium text-slate-900">{lead.company}</p>
        </div>
      )}

      {lead.notes && (
        <div className="mb-4">
          <p className="text-xs text-slate-500 mb-1">Notes</p>
          <p className="text-sm text-slate-600 line-clamp-2">{lead.notes}</p>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t">
        <span>Créé le {new Date(lead.created_at).toLocaleDateString('fr-FR')}</span>
        <div className="flex gap-2">
          <Button onClick={() => onUpdate(lead)} variant="secondary" size="sm">
            Mettre à jour
          </Button>
          <Button onClick={() => onDelete(lead)} variant="danger" size="sm">
            Supprimer
          </Button>
        </div>
      </div>
    </Card>
  );
};

// ============= REPORT CARD =============
export const ReportCard = ({ report, onView, onDownload }) => {
  const reportTypes = {
    weekly: { label: 'Hebdomadaire', color: 'primary' },
    monthly: { label: 'Mensuel', color: 'success' },
    campaign: { label: 'Campagne', color: 'warning' },
    final: { label: 'Final', color: 'danger' },
  };

  const reportType = reportTypes[report.type];

  return (
    <Card hover onClick={onView}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <Badge variant={reportType.color} size="sm" className="mb-2">
            {reportType.label}
          </Badge>
          <h3 className="text-lg font-bold text-slate-900">
            Rapport {reportType.label}
          </h3>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDownload(report);
          }}
          className="p-2 hover:bg-slate-100 rounded-lg"
        >
          <Download className="w-4 h-4 text-slate-600" />
        </button>
      </div>

      <div className="mb-4">
        <p className="text-sm text-slate-600 mb-2">
          Période: {new Date(report.period_start).toLocaleDateString('fr-FR')} -{' '}
          {new Date(report.period_end).toLocaleDateString('fr-FR')}
        </p>
      </div>

      {report.metrics && (
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900">
              {report.metrics.views?.toLocaleString() || 0}
            </p>
            <p className="text-xs text-slate-500">Vues</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900">
              {report.metrics.engagement || 0}%
            </p>
            <p className="text-xs text-slate-500">Engagement</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900">
              {report.metrics.conversions || 0}
            </p>
            <p className="text-xs text-slate-500">Conversions</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t">
        <span className="flex items-center">
          <Calendar className="w-3 h-3 mr-1" />
          {new Date(report.generated_at).toLocaleDateString('fr-FR')}
        </span>
        <span className="text-indigo-600 font-medium">Voir le détail →</span>
      </div>
    </Card>
  );
};

// ============= DATA TABLE =============
export const DataTable = ({ 
  columns, 
  data, 
  onRowClick,
  searchable = false,
  filterable = false,
  filters = [],
  onSearch,
  onFilter 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({});

  return (
    <div>
      {/* Header with Search and Filters */}
      {(searchable || filterable) && (
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          {searchable && (
            <div className="flex-1">
              <Input
                value={searchTerm}
                onChange={(val) => {
                  setSearchTerm(val);
                  onSearch && onSearch(val);
                }}
                placeholder="Rechercher..."
                icon={Search}
              />
            </div>
          )}
          {filterable && filters.length > 0 && (
            <div className="flex gap-2">
              {filters.map((filter) => (
                <Select
                  key={filter.key}
                  value={activeFilters[filter.key] || ''}
                  onChange={(val) => {
                    const newFilters = { ...activeFilters, [filter.key]: val };
                    setActiveFilters(newFilters);
                    onFilter && onFilter(newFilters);
                  }}
                  options={filter.options}
                  placeholder={filter.label}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.length > 0 ? (
                data.map((row, rowIdx) => (
                  <tr
                    key={rowIdx}
                    onClick={() => onRowClick && onRowClick(row)}
                    className={`${onRowClick ? 'cursor-pointer hover:bg-slate-50' : ''} transition`}
                  >
                    {columns.map((col, colIdx) => (
                      <td key={colIdx} className="px-6 py-4 whitespace-nowrap">
                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    Aucune donnée disponible
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ============= ACTIVITY FEED =============
export const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'order':
        return ShoppingCart;
      case 'profile':
        return Users;
      case 'post':
        return Eye;
      case 'payment':
        return DollarSign;
      default:
        return AlertCircle;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'order':
        return 'indigo';
      case 'profile':
        return 'emerald';
      case 'post':
        return 'purple';
      case 'payment':
        return 'orange';
      default:
        return 'slate';
    }
  };

  return (
    <Card>
      <h3 className="text-lg font-bold text-slate-900 mb-6">Activité Récente</h3>
      <div className="space-y-4">
        {activities.map((activity, idx) => {
          const Icon = getActivityIcon(activity.type);
          const color = getActivityColor(activity.type);

          return (
            <div key={idx} className="flex items-start">
              <div className={`w-10 h-10 bg-${color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 text-${color}-600`} />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-slate-900">
                  {activity.title}
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  {activity.description}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {activity.timestamp}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

// ============= PERFORMANCE CHART =============
export const PerformanceChart = ({ data, title, metric }) => {
  // Simuler un graphique simple avec des barres
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <Badge variant="primary">{metric}</Badge>
      </div>

      <div className="space-y-4">
        {data.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-700">
                {item.label}
              </span>
              <span className="text-sm font-bold text-slate-900">
                {item.value.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// ============= STATUS INDICATOR =============
export const StatusIndicator = ({ status, labels }) => {
  const statusConfig = {
    success: { icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    error: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
    warning: { icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-50' },
    pending: { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
  };

  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center px-3 py-2 rounded-lg ${config.bg}`}>
      <Icon className={`w-4 h-4 ${config.color} mr-2`} />
      <span className={`text-sm font-medium ${config.color}`}>
        {labels?.[status] || status}
      </span>
    </div>
  );
};

// ============= QUICK ACTIONS =============
export const QuickActions = ({ actions }) => (
  <Card>
    <h3 className="text-lg font-bold text-slate-900 mb-6">Actions Rapides</h3>
    <div className="grid grid-cols-2 gap-3">
      {actions.map((action, idx) => (
        <button
          key={idx}
          onClick={action.onClick}
          className="flex items-center justify-center px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition text-slate-700 font-medium"
        >
          {action.icon && <action.icon className="w-5 h-5 mr-2" />}
          {action.label}
        </button>
      ))}
    </div>
  </Card>
);

// ============= PROGRESS BAR =============
export const ProgressBar = ({ value, max, label, showPercentage = true }) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-700">{label}</span>
          {showPercentage && (
            <span className="text-sm font-bold text-slate-900">
              {percentage.toFixed(0)}%
            </span>
          )}
        </div>
      )}
      <div className="w-full bg-slate-200 rounded-full h-3">
        <div
          className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// ============= METRIC CARD =============
export const MetricCard = ({ label, value, icon: Icon, change, color = 'indigo' }) => (
  <div className={`bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-xl p-6 text-white`}>
    <div className="flex items-center justify-between mb-4">
      <div className="text-sm font-medium opacity-90">{label}</div>
      {Icon && <Icon className="w-6 h-6 opacity-75" />}
    </div>
    <div className="text-3xl font-bold mb-2">{value}</div>
    {change && (
      <div className="flex items-center text-sm">
        {change > 0 ? (
          <TrendingUp className="w-4 h-4 mr-1" />
        ) : (
          <TrendingDown className="w-4 h-4 mr-1" />
        )}
        <span>{Math.abs(change)}% vs dernier mois</span>
      </div>
    )}
  </div>
);


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