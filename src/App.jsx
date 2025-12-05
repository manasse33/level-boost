import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/Home';
import Concours from './pages/Concours';
import Services from './pages/Services';
import Talents from './pages/Talents';
import Onboarding from './pages/Onboarding';
import ScrollToTop from './components/ScrollToTop'; // Bonus optionnel

function App() {
  return (
    <Router>
      {/* ScrollToTop permet de remonter en haut de page quand on change de route */}
      <Routes>
        
        {/* Layout principal (Avec Navbar & Footer) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/concours" element={<Concours />} />
          <Route path="/services" element={<Services />} />
          <Route path="/talents" element={<Talents />} />
        </Route>

        {/* Route isolée pour l'immersion (Sans Navbar) */}
        <Route path="/start" element={<Onboarding />} />
        
      </Routes>
    </Router>
  );
}

export default App;