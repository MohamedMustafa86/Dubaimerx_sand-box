
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/SupabaseAuthContext';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import SuppliersPage from '@/pages/SuppliersPage';
import ManufacturersPage from '@/pages/ManufacturersPage';
import ProductsPage from '@/pages/ProductsPage';
import TipsPage from '@/pages/TipsPage';
import MessengerPage from '@/pages/MessengerPage';
import CartPage from '@/pages/CartPage';
import ProfilePage from '@/pages/ProfilePage';
import RegisterChoicePage from '@/pages/RegisterPage';
import RegisterBuyerPage from '@/pages/RegisterBuyerPage';
import RegisterSupplierPage from '@/pages/RegisterSupplierPage';
import PlatformGoalPage from '@/pages/PlatformGoalPage';
import AddProductPage from '@/pages/AddProductPage';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/platform-goal" element={<PlatformGoalPage />} />
              <Route path="/suppliers" element={<SuppliersPage />} />
              <Route path="/manufacturers" element={<ManufacturersPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/add-product" element={<AddProductPage />} />
              <Route path="/tips" element={<TipsPage />} />
              <Route path="/messenger" element={<MessengerPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/register" element={<RegisterChoicePage />} />
              <Route path="/register/buyer" element={<RegisterBuyerPage />} />
              <Route path="/register/supplier" element={<RegisterSupplierPage />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
