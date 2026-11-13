import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Flame, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenSidebar }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get('category');
  const isDeal = searchParams.get('deal') === 'true';

  const navLinks = [
    { label: "Today's Deals", to: "/products?deal=true", active: isDeal },
    { label: "Electronics", to: "/products?category=electronics", active: currentCategory === 'electronics' },
    { label: "Mobiles", to: "/products?category=mobiles", active: currentCategory === 'mobiles' },
    { label: "Fashion", to: "/products?category=fashion", active: currentCategory === 'fashion' },
    { label: "Home & Kitchen", to: "/products?category=home-kitchen", active: currentCategory === 'home-kitchen' },
    { label: "Books", to: "/products?category=books", active: currentCategory === 'books' },
    { label: "Sports & Fitness", to: "/products?category=sports", active: currentCategory === 'sports' },
    { label: "Beauty", to: "/products?category=beauty", active: currentCategory === 'beauty' },
    { label: "Best Sellers", to: "/products?sort=popularity", active: false },
    { label: "New Releases", to: "/products?sort=newest", active: false }
  ];

  return (
    <nav className="fixed top-16 md:top-16 left-0 w-full z-30 bg-[#232F3E] text-[#eef1f1] h-10 border-t border-[#131921]/60 shadow-xs">
      <div className="max-w-[1500px] mx-auto px-3 sm:px-4 lg:px-6 h-full flex items-center justify-between overflow-hidden">
        
        {/* Left Links & Hamburger */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1">
          {/* All Hamburger Menu */}
          <button
            type="button"
            onClick={onOpenSidebar}
            className="flex items-center gap-1 px-2 py-1 rounded text-white font-semibold text-xs hover:ring-1 hover:ring-white transition-all shrink-0 cursor-pointer"
          >
            <Menu className="w-4 h-4 text-[#FE9800]" />
            <span>All</span>
          </button>

          {/* Department Links */}
          {navLinks.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className={`px-2 py-1 rounded text-xs whitespace-nowrap transition-all ${
                item.active 
                  ? 'bg-white text-gray-900 font-bold shadow-xs' 
                  : 'text-[#eef1f1] hover:text-white hover:ring-1 hover:ring-white/80'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Festival Banner Tag */}
        <div className="hidden xl:flex items-center gap-1.5 shrink-0 pl-3">
          <Link
            to="/products?deal=true"
            className="text-[11px] font-semibold text-[#ffdcbd] bg-[#8a5100]/50 hover:bg-[#8a5100]/70 px-2.5 py-1 rounded border border-[#fe9800]/40 flex items-center gap-1 transition-colors"
          >
            <Flame className="w-3.5 h-3.5 text-[#fe9800] animate-pulse" />
            <span>Great Indian Festival • Up to 75% Off</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
