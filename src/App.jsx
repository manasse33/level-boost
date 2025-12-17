import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { AuthProvider, useAuth } from "./context/AuthContext";

import { Navbar, Footer } from "./components/navigation";
import { PageLoader } from "./components/common";

// Public
import {
  HomePage,
  ServicesPage,
  TalentsPage,
  ContestsPage,
  PricingPage,
  LoginPage,
  RegisterPage,
  ContestDetailsPage 
} from "./pages/public";

// Dashboard
// import {
//   DashboardOverview,
//   MyProfilesPage,
//   MyOrdersPage,
//   MySubscriptionsPage,
//   SettingsPage
// } from "./pages/Dashboard";

// Admin
import { AdminDashboard, AdminOrders, AdminLeads,PackagesPage ,ContestsPages  } from "./pages/Admin";


// --------------------------------------------------------
// 🔒 PROTECTION DES ROUTES (DANS APP DIRECTEMENT)
// --------------------------------------------------------
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <PageLoader />;
  return user ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <PageLoader />;
  return user?.role === "admin" ? children : <Navigate to="/" replace />;
};


// --------------------------------------------------------
// ✨ WRAPPER AVEC ANIMATION (DANS APP DIRECTEMENT)
// --------------------------------------------------------
const AnimatedPage = ({ children }) => (
  <AnimatePresence mode="wait">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  </AnimatePresence>
);


// --------------------------------------------------------
// 🧱 LAYOUT GLOBAL AVEC NAV + FOOTER
// --------------------------------------------------------
const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-white">
      <Navbar user={user} onLogout={logout} />
      <AnimatedPage>{children}</AnimatedPage>
      <Footer />
    </div>
  );
};


// --------------------------------------------------------
// 🌍 TOUT LE ROUTING EST GÉRÉ ICI
// --------------------------------------------------------
const AppRoutes = () => {
  const { loading } = useAuth();

  if (loading) return <PageLoader />;

  return (
    <Routes>
      {/* ---------------- AUTH SANS LAYOUT ---------------- */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* ---------------- PUBLIC ---------------- */}
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/services"
        element={
          <Layout>
            <ServicesPage />
          </Layout>
        }
      />
      <Route
        path="/talents"
        element={
          <Layout>
            <TalentsPage />
          </Layout>
        }
      />
      <Route
        path="/contests"
        element={
          <Layout>
            <ContestsPage />
          </Layout>
        }
      />
      <Route
  path="/contests/:slug"
  element={
    <Layout>
      <ContestDetailsPage />
    </Layout>
  }
/>
<Route
  path="/contests/:slug"
  element={
    <Layout>
      <ContestDetailsPage />
    </Layout>
  }
/>
      <Route
        path="/pricing"
        element={
          <Layout>
            <PricingPage />
          </Layout>
        }
      />

      {/* ---------------- USER DASHBOARD ---------------- */}
      {/* <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Layout>
              <DashboardOverview />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/profiles"
        element={
          <PrivateRoute>
            <Layout>
              <MyProfilesPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/orders"
        element={
          <PrivateRoute>
            <Layout>
              <MyOrdersPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/subscriptions"
        element={
          <PrivateRoute>
            <Layout>
              <MySubscriptionsPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/settings"
        element={
          <PrivateRoute>
            <Layout>
              <SettingsPage />
            </Layout>
          </PrivateRoute>
        }
      /> */}

      {/* ---------------- ADMIN ---------------- */}
      {/* ---------------- ADMIN ---------------- */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Layout>
              <AdminDashboard />
            </Layout>
          </AdminRoute>
        }
      />
      
      {/* 👇 NOUVELLE ROUTE : GESTION DES PACKAGES */}
      <Route
        path="/admin/packages"
        element={
          <AdminRoute>
            <Layout>
              <PackagesPage />
            </Layout>
          </AdminRoute>
        }
      />

      {/* 👇 NOUVELLE ROUTE : GESTION DES CONCOURS */}
      <Route
        path="/admin/contests"
        element={
          <AdminRoute>
            <Layout>
              <ContestsPages />
            </Layout>
          </AdminRoute>
        }
      />

      <Route
        path="/admin/orders"
        element={
          <AdminRoute>
            <Layout>
              <AdminOrders />
            </Layout>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/leads"
        element={
          <AdminRoute>
            <Layout>
              <AdminLeads />
            </Layout>
          </AdminRoute>
        }
      />
    
    </Routes>

    
    
  );
};


// --------------------------------------------------------
// 🚀 APP FINALE AVEC ROUTER + AUTH
// --------------------------------------------------------
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
