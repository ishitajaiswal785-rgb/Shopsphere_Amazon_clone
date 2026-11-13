import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  ShoppingCart, 
  ChevronDown, 
  Heart, 
  Package, 
  User, 
  LogOut, 
  LogIn, 
  Menu 
} from 'lucide-react';
import SearchBar from './SearchBar';
import LocationModal from './LocationModal';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

export default function Header({ onOpenSidebar }) {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, logout } = useAuth();
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef(null);
  const navigate = useNavigate();

  // Close account menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target)) {
        setIsAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 bg-[#131921] text-white shadow-[0_2px_8px_rgba(0,0,0,0.16)]">
        {/* Main Header Bar (60px) */}
        <div className="h-16 max-w-[1500px] mx-auto px-3 sm:px-4 lg:px-6 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left section: Hamburger (Mobile) + Logo + Delivery Pin */}
          <div className="flex items-center gap-1 sm:gap-3 min-w-0 flex-1">
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={onOpenSidebar}
              className="p-1.5 rounded hover:ring-1 hover:ring-white md:hidden text-white"
              aria-label="Open Navigation Drawer"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-1.5 p-1 rounded hover:ring-1 hover:ring-white transition-all shrink-0"
            >
              {/* Crisp SVG Logo that never breaks or fails */}
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#fe9800] to-[#ffd814] flex items-center justify-center shadow-sm">
                <ShoppingCart className="w-5 h-5 text-[#131921] -rotate-6" />
              </div>
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white inline-block">
                ShopSphere<span className="text-[#FE9800] text-xs font-bold ml-0.5">.in</span>
              </span>
            </Link>

            {/* Delivery Location Selector */}
            <button
              type="button"
              onClick={() => setIsLocationOpen(true)}
              className="hidden sm:flex items-center gap-1 p-1.5 rounded hover:ring-1 hover:ring-white text-left transition-all shrink-0"
            >
              <MapPin className="w-4 h-4 text-[#FE9800] shrink-0" />
              <div className="flex flex-col leading-tight">
                <span className="text-[11px] text-[#c5c6cb]">
                  Deliver to {user ? user.name : 'Rahul'}
                </span>
                <span className="text-xs font-bold text-white truncate max-w-[130px]">
                  {user ? `${user.city} ${user.pincode}` : 'Bengaluru 560001'}
                </span>
              </div>
            </button>
          </div>

          {/* Center: Desktop Search Bar */}
          <div className="flex-1 max-w-[760px] mx-1 sm:mx-2 hidden md:block">
            <SearchBar />
          </div>

          {/* Right section: Currency, Account, Orders, Wishlist, Cart */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Currency / Region */}
            <div className="hidden xl:flex items-center gap-1 p-1.5 rounded hover:ring-1 hover:ring-white cursor-pointer transition-all">
              <span className="text-[11px] font-bold bg-white text-gray-900 px-1 py-0.5 rounded leading-none">
                IN
              </span>
              <span className="text-xs font-semibold text-white">EN / ₹</span>
            </div>

            {/* Account & Lists Dropdown */}
            <div className="relative" ref={accountMenuRef}>
              <button
                type="button"
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                className="flex items-center gap-1.5 p-1.5 rounded hover:ring-1 hover:ring-white text-left transition-all"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-[#FE9800] hidden sm:block"
                  />
                ) : (
                  <User className="w-5 h-5 text-gray-300 hidden sm:block" />
                )}
                <div className="flex flex-col leading-tight">
                  <span className="text-[11px] text-[#c5c6cb] truncate max-w-[90px]">
                    Hello, {user ? user.name : 'Sign in'}
                  </span>
                  <span className="text-xs font-bold text-white flex items-center">
                    Account & Lists
                    <ChevronDown className="w-3 h-3 ml-0.5 text-gray-300" />
                  </span>
                </div>
              </button>

              {/* Account Dropdown Menu */}
              {isAccountMenuOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-64 bg-white rounded-md shadow-2xl border border-gray-200 py-3 text-gray-800 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-4 pb-3 border-b border-gray-100">
                    {user ? (
                      <div>
                        <div className="font-semibold text-sm text-gray-900">{user.fullName}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Link
                          to="/login"
                          onClick={() => setIsAccountMenuOpen(false)}
                          className="block w-full py-1.5 bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-semibold text-xs rounded shadow-xs mb-1.5 text-center"
                        >
                          Sign In
                        </Link>
                        <div className="text-[11px] text-gray-500">
                          New customer?{' '}
                          <Link
                            to="/signup"
                            onClick={() => setIsAccountMenuOpen(false)}
                            className="text-blue-600 hover:underline"
                          >
                            Start here.
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="py-2 text-xs divide-y divide-gray-100">
                    <div className="px-4 py-1.5 font-bold text-gray-400 uppercase tracking-wider text-[10px]">
                      Your Account
                    </div>
                    <div className="py-1">
                      <Link
                        to="/orders"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2.5 text-gray-700"
                      >
                        <Package className="w-4 h-4 text-gray-500" />
                        <span>Your Orders</span>
                      </Link>
                      <Link
                        to="/cart"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2.5 text-gray-700"
                      >
                        <ShoppingCart className="w-4 h-4 text-gray-500" />
                        <span>Your Cart ({cartCount})</span>
                      </Link>
                      <Link
                        to="/products?wishlist=true"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2.5 text-gray-700"
                      >
                        <Heart className="w-4 h-4 text-gray-500" />
                        <span>Your Wish List ({wishlistCount})</span>
                      </Link>
                    </div>

                    {user && (
                      <div className="pt-2 px-2">
                        <button
                          type="button"
                          onClick={() => {
                            logout();
                            setIsAccountMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-red-50 text-red-600 rounded flex items-center gap-2 font-medium"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Returns & Orders */}
            <Link
              to="/orders"
              className="hidden sm:flex flex-col leading-tight p-1.5 rounded hover:ring-1 hover:ring-white transition-all"
            >
              <span className="text-[11px] text-[#c5c6cb]">Returns</span>
              <span className="text-xs font-bold text-white">& Orders</span>
            </Link>

            {/* Wishlist Link */}
            <Link
              to="/products?wishlist=true"
              className="flex items-center gap-1 p-1.5 rounded hover:ring-1 hover:ring-white transition-all text-white relative"
              title="Your Wishlist"
            >
              <div className="relative">
                <Heart className="w-5 h-5 text-gray-200 hover:text-red-400 transition-colors" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-red-600 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-bold hidden lg:inline">Wishlist</span>
            </Link>

            {/* Shopping Cart Button */}
            <Link
              to="/cart"
              className="flex items-center gap-1.5 p-1.5 rounded hover:ring-1 hover:ring-white transition-all text-white relative group"
            >
              <div className="relative flex items-center">
                <ShoppingCart className="w-7 h-7 text-white group-hover:text-[#FE9800] transition-colors" />
                <span className="absolute -top-1 left-3.5 bg-[#FE9800] text-[#131921] font-extrabold text-[11px] px-1.5 py-0.2 rounded-full min-w-[20px] text-center leading-tight shadow-sm">
                  {cartCount}
                </span>
              </div>
              <span className="text-xs font-bold hidden sm:inline-block mt-2">
                Cart
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar Row (Visible only on mobile screens < 768px) */}
        <div className="md:hidden px-3 pb-2 pt-0.5 bg-[#131921]">
          <SearchBar />
        </div>
      </header>

      {/* PIN Code Delivery Location Modal */}
      <LocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
      />
    </>
  );
}
