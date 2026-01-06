import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Context
import { AuthProvider, useAuth } from "./context/AuthContext";

// Components
import { Navbar, Footer } from "./components/navigation";
import { PageLoader } from "./components/common";

// Pages Publiques
import {
  HomePage,
  ServicesPage,
  TalentsPage,
  ContestsPage,
  PricingPage,
  LoginPage,
  RegisterPage,
  ContestDetailsPage,
  TalentDetailsPage,
  AboutPage,
  ConfirmationPage,
  BecomeClientPage
} from "./pages/public";

// Pages Admin / Dashboard (Protégées)
import { 
  AdminDashboard, 
  AdminOrders, 
  AdminLeads, 
  PackagesPage, 
  AdminContests, 
  AdminUsers,
  MyProfilePage,
} from "./pages/Admin";

// Constantes des rôles (Doit correspondre à votre DB)
const ROLES = {
  ADMIN: 'admin',
  CLIENT: 'client',
  SALES: 'sales',
  CM: 'cm',
  DA: 'da'
};

// --------------------------------------------------------
// 🔒 PROTECTION AVANCÉE PAR RÔLE
// --------------------------------------------------------
const RoleRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <PageLoader />;

  // 1. Si pas connecté -> Login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Si connecté mais rôle non autorisé -> Dashboard (ou Accueil)
  // Note: Si allowedRoles est vide, on autorise tout utilisateur connecté
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

// --------------------------------------------------------
// ✨ WRAPPER D'ANIMATION
// --------------------------------------------------------
const AnimatedPage = ({ children }) => (
  <AnimatePresence mode="wait">
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

// --------------------------------------------------------
// 🧱 LAYOUT PUBLIC (Navbar + Footer)
// --------------------------------------------------------
const PublicLayout = ({ children }) => {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar user={user} onLogout={logout} />
      <main className="flex-grow">
        <AnimatedPage>{children}</AnimatedPage>
      </main>
      <Footer />
    </div>
  );
};

// --------------------------------------------------------
// 🌍 ROUTING PRINCIPAL
// --------------------------------------------------------
const AppRoutes = () => {
  const { loading } = useAuth();

  if (loading) return <PageLoader />;

  return (
    <Routes>
      {/* ========================================================
          1. ROUTES D'AUTHENTIFICATION (Sans Layout)
      ======================================================== */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* ========================================================
          2. ROUTES PUBLIQUES (Avec PublicLayout)
      ======================================================== */}
      <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
      <Route path="/services" element={<PublicLayout><ServicesPage /></PublicLayout>} />
      <Route path="/talents" element={<PublicLayout><TalentsPage /></PublicLayout>} />
        <Route path="/talents/:slug" element={<PublicLayout><TalentDetailsPage /></PublicLayout>} />
      <Route path="/pricing" element={<PublicLayout><PricingPage /></PublicLayout>} />
      
      {/* Concours Public */}
      <Route path="/contests" element={<PublicLayout><ContestsPage /></PublicLayout>} />
      <Route path="/contests/:slug" element={<PublicLayout><ContestDetailsPage /></PublicLayout>} />

      {/* Conversion & Confirmation */}
      <Route path="/leads" element={<PublicLayout><BecomeClientPage /></PublicLayout>} />
      <Route path="/confirmation" element={<PublicLayout><ConfirmationPage /></PublicLayout>} />


      {/* ========================================================
          3. ROUTES PROTÉGÉES (ADMIN / PLATEFORME)
          Le Layout Admin est géré à l'intérieur des pages (AdminLayout)
      ======================================================== */}

      {/* DASHBOARD : Accessible à tout le monde connecté */}
      <Route
        path="/admin/dashboard"
        element={
          <RoleRoute>
            <AdminDashboard />
          </RoleRoute>
        }
      />

      {/* PACKAGES (Services) : Admin uniquement (Création/Edit) */}
      <Route
        path="/admin/packages"
        element={
          <RoleRoute allowedRoles={[ROLES.ADMIN]}>
            <PackagesPage />
          </RoleRoute>
        }
      />

      {/* LEADS : Admin & Sales */}
      <Route
        path="/admin/leads"
        element={
          <RoleRoute allowedRoles={[ROLES.ADMIN, ROLES.SALES]}>
            <AdminLeads />
          </RoleRoute>
        }
      />

      {/* COMMANDES : Admin & Client */}
      <Route
        path="/admin/orders"
        element={
          <RoleRoute allowedRoles={[ROLES.ADMIN, ROLES.CLIENT]}>
            <AdminOrders />
          </RoleRoute>
        }
      />

      {/* UTILISATEURS : Admin uniquement */}
      <Route
        path="/admin/users"
        element={
          <RoleRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminUsers />
          </RoleRoute>
        }
      />

      {/* CONCOURS (Gestion) : Admin & CM */}
      <Route
        path="/admin/contests"
        element={
          <RoleRoute allowedRoles={[ROLES.ADMIN, ROLES.CM]}>
            <AdminContests />
          </RoleRoute>
        }
      />

       <Route
        path="/admin/profile"
        element={
          <RoleRoute allowedRoles={[ROLES.CLIENT]}>
            <MyProfilePage />
          </RoleRoute>
        }
      />

      {/* Fallback : 404 vers l'accueil */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
};

// --------------------------------------------------------
// 🚀 POINT D'ENTRÉE
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