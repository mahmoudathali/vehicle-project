import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { VehicleDetail } from './pages/VehicleDetail';
import { Purchase } from './pages/Purchase';
import { PurchaseConfirmation } from './pages/PurchaseConfirmation';
import { Vehicles } from './pages/Vehicles'; // ✅ Ajout de ta nouvelle page catalogue
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { useState, useEffect } from 'react';
import { Loader } from './components/Loader';
import { Toaster } from 'sonner';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicles" element={<Vehicles />} /> {/* ✅ Route pour le catalogue */}
          <Route path="/vehicles/:id" element={<VehicleDetail />} />
          <Route path="/purchase/:id" element={<Purchase />} />
          <Route path="/purchase/confirmation" element={<PurchaseConfirmation />} />

          {/* ADMIN */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Layout>
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;
