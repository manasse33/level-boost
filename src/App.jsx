import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layouts
// import PublicLayout from './layouts/PublicLayout';
// import DashboardLayout from './layouts/DashboardLayout';

// Pages Public
import Home from './pages/Home';
import Services from './pages/Services';
import Talents from './pages/Talents';
import Contests from './pages/Contests';
import Pricing from './pages/Pricing';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Pages Dashboard
import DashboardOverview from './pages/Dashboard/Overview';
import MyProfiles from './pages/Dashboard/MyProfiles';
import MyOrders from './pages/Dashboard/MyOrders';
import MySubscriptions from './pages/Dashboard/MySubscriptions';
import Settings from './pages/Dashboard/Settings';

// Pages Admin
import AdminDashboard from './pages/Admin/Dashboard';
import AdminOrders from './pages/Admin/Orders';
import AdminLeads from './pages/Admin/Leads';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/talents" element={<Talents />} />
        <Route path="/contests" element={<Contests />} />
        <Route path="/pricing" element={<Pricing />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardOverview />} />
        <Route path="profiles" element={<MyProfiles />} />
        <Route path="orders" element={<MyOrders />} />
        <Route path="subscriptions" element={<MySubscriptions />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="leads" element={<AdminLeads />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}