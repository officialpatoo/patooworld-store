
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import AboutUsPage from './pages/AboutUsPage';
import SustainabilityPage from './pages/SustainabilityPage';
import CareersPage from './pages/CareersPage';
import HelpCenterPage from './pages/Support/HelpCenterPage';
import OrderTrackingPage from './pages/Support/OrderTrackingPage';
import ReturnsPage from './pages/Support/ReturnsPage';
import AuthPage from './pages/AuthPage';
import AccountPage from './pages/AccountPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import LiveConcierge from './components/LiveConcierge';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';

const StorefrontLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col min-h-screen relative">
    <Header />
    <main className="flex-grow bg-white">
      {children}
    </main>
    <LiveConcierge />
    <Footer />
  </div>
);

const App: React.FC = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  useEffect(() => {
    const isAuth = localStorage.getItem('patoo_admin_auth') === 'true';
    const savedEmail = localStorage.getItem('patoo_admin_email');
    if (isAuth && savedEmail) {
      setIsAdminAuthenticated(true);
      setAdminEmail(savedEmail);
    }
  }, []);

  const handleAdminLogin = (email: string) => {
    setIsAdminAuthenticated(true);
    setAdminEmail(email);
    localStorage.setItem('patoo_admin_auth', 'true');
    localStorage.setItem('patoo_admin_email', email);
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setAdminEmail(null);
    localStorage.removeItem('patoo_admin_auth');
    localStorage.removeItem('patoo_admin_email');
  };

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route 
              path="/admin" 
              element={
                isAdminAuthenticated ? (
                  <AdminDashboard onLogout={handleAdminLogout} adminEmail={adminEmail || ''} />
                ) : (
                  <AdminLogin onLogin={handleAdminLogin} />
                )
              } 
            />

            <Route path="/" element={<StorefrontLayout><HomePage /></StorefrontLayout>} />
            <Route path="/products" element={<StorefrontLayout><ProductsPage /></StorefrontLayout>} />
            <Route path="/products/:id" element={<StorefrontLayout><ProductDetailPage /></StorefrontLayout>} />
            <Route path="/cart" element={<StorefrontLayout><CartPage /></StorefrontLayout>} />
            <Route path="/auth" element={<StorefrontLayout><AuthPage /></StorefrontLayout>} />
            <Route path="/account" element={<StorefrontLayout><AccountPage /></StorefrontLayout>} />
            <Route path="/checkout" element={<StorefrontLayout><CheckoutPage /></StorefrontLayout>} />
            <Route path="/order-confirmation" element={<StorefrontLayout><OrderConfirmationPage /></StorefrontLayout>} />
            <Route path="/about" element={<StorefrontLayout><AboutUsPage /></StorefrontLayout>} />
            <Route path="/sustainability" element={<StorefrontLayout><SustainabilityPage /></StorefrontLayout>} />
            <Route path="/careers" element={<StorefrontLayout><CareersPage /></StorefrontLayout>} />
            <Route path="/help" element={<StorefrontLayout><HelpCenterPage /></StorefrontLayout>} />
            <Route path="/track" element={<StorefrontLayout><OrderTrackingPage /></StorefrontLayout>} />
            <Route path="/returns" element={<StorefrontLayout><ReturnsPage /></StorefrontLayout>} />
            <Route path="*" element={<StorefrontLayout><NotFoundPage /></StorefrontLayout>} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
