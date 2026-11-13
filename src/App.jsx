import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Orders from './pages/Orders';

// Providers
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';

// Scroll to top helper
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// App Layout with Header, Navbar, Sidebar and Footer
function MainLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Hide main header/footer on Checkout and Auth pages
  const isAuthOrCheckout = ['/checkout', '/login', '/signup'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-[#f7fafa]">
      {!isAuthOrCheckout && (
        <>
          <Header onOpenSidebar={() => setIsSidebarOpen(true)} />
          <Navbar onOpenSidebar={() => setIsSidebarOpen(true)} />
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </>
      )}

      {/* Main Content with top padding to clear fixed headers (64px + 40px = 104px) */}
      <main className={`flex-1 w-full ${!isAuthOrCheckout ? 'pt-24 sm:pt-26 md:pt-26' : ''}`}>
        {children}
      </main>

      {!isAuthOrCheckout && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <ScrollToTop />
            <MainLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductListing />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </MainLayout>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
