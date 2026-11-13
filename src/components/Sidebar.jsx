import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  X, 
  ChevronRight, 
  User, 
  Tv, 
  Smartphone, 
  Shirt, 
  Home, 
  Sparkles, 
  BookOpen, 
  Dumbbell, 
  Flame, 
  Zap, 
  ShieldCheck, 
  LogOut, 
  LogIn 
} from 'lucide-react';
import { categories } from '../data/categories';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Prevent background scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCategoryClick = (slug) => {
    onClose();
    navigate(`/products?category=${slug}`);
  };

  const getCategoryIcon = (slug) => {
    switch (slug) {
      case 'electronics': return <Tv className="w-4 h-4 text-gray-500" />;
      case 'mobiles': return <Smartphone className="w-4 h-4 text-gray-500" />;
      case 'fashion': return <Shirt className="w-4 h-4 text-gray-500" />;
      case 'home-kitchen': return <Home className="w-4 h-4 text-gray-500" />;
      case 'beauty': return <Sparkles className="w-4 h-4 text-gray-500" />;
      case 'books': return <BookOpen className="w-4 h-4 text-gray-500" />;
      case 'sports': return <Dumbbell className="w-4 h-4 text-gray-500" />;
      default: return <ChevronRight className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
        {/* Header with User Info */}
        <div className="bg-[#131921] px-6 py-4 text-white flex items-center justify-between border-b border-[#232F3E]">
          <Link 
            to={user ? "/orders" : "/login"} 
            onClick={onClose}
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            {user?.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-9 h-9 rounded-full object-cover ring-2 ring-[#FE9800]"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-[#232F3E] flex items-center justify-center text-white">
                <User className="w-5 h-5 text-[#FE9800]" />
              </div>
            )}
            <div>
              <div className="text-xs text-gray-400">Hello,</div>
              <div className="text-sm font-bold text-white flex items-center gap-1">
                {user ? user.fullName : "Sign in to ShopSphere"}
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              </div>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-100 text-sm">
          {/* Trending */}
          <div className="py-3">
            <div className="px-6 py-1.5 text-xs font-bold text-gray-900 uppercase tracking-wider">
              Trending
            </div>
            <Link 
              to="/products?sort=popularity" 
              onClick={onClose}
              className="px-6 py-2.5 flex items-center justify-between hover:bg-gray-100 text-gray-700 transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <Flame className="w-4 h-4 text-orange-500" />
                Best Sellers
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
            <Link 
              to="/products?deal=true" 
              onClick={onClose}
              className="px-6 py-2.5 flex items-center justify-between hover:bg-gray-100 text-gray-700 transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-amber-500" />
                Today's Deals
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
          </div>

          {/* Shop By Category */}
          <div className="py-3">
            <div className="px-6 py-1.5 text-xs font-bold text-gray-900 uppercase tracking-wider">
              Shop By Category
            </div>
            {categories.filter(c => c.slug !== 'all').map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.slug)}
                className="w-full text-left px-6 py-2.5 flex items-center justify-between hover:bg-gray-100 text-gray-700 transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  {getCategoryIcon(cat.slug)}
                  {cat.name}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            ))}
          </div>

          {/* Programs & Features */}
          <div className="py-3">
            <div className="px-6 py-1.5 text-xs font-bold text-gray-900 uppercase tracking-wider">
              Programs & Features
            </div>
            <Link
              to="/cart"
              onClick={onClose}
              className="px-6 py-2.5 flex items-center justify-between hover:bg-gray-100 text-gray-700 transition-colors"
            >
              <span>Shopping Cart</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
            <Link
              to="/orders"
              onClick={onClose}
              className="px-6 py-2.5 flex items-center justify-between hover:bg-gray-100 text-gray-700 transition-colors"
            >
              <span>Your Orders & Purchases</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
          </div>

          {/* Help & Settings */}
          <div className="py-3">
            <div className="px-6 py-1.5 text-xs font-bold text-gray-900 uppercase tracking-wider">
              Help & Settings
            </div>
            {user ? (
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="w-full text-left px-6 py-2.5 flex items-center gap-2.5 hover:bg-red-50 text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out ({user.name})</span>
              </button>
            ) : (
              <Link
                to="/login"
                onClick={onClose}
                className="px-6 py-2.5 flex items-center gap-2.5 hover:bg-gray-100 text-gray-700 transition-colors"
              >
                <LogIn className="w-4 h-4 text-gray-500" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#067D62]" />
            <span>100% Purchase Protection</span>
          </div>
          <span className="font-semibold text-gray-700">₹ INR</span>
        </div>
      </div>
    </div>
  );
}
