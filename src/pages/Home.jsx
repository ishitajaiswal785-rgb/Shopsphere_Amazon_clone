import React from 'react';
import { Link } from 'react-router-dom';
import HeroCarousel from '../components/HeroCarousel';
import CategoryCard from '../components/CategoryCard';
import ProductSection from '../components/ProductSection';
import { homeQuadrantCards, categories } from '../data/categories';
import { products } from '../data/products';
import { Zap, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';

export default function Home() {
  // Curated product subsets
  const lightningDeals = products.filter(p => p.discount >= 25 || p.dealType);
  const bestSellers = products.filter(p => p.rating >= 4.5);
  const electronicsProducts = products.filter(p => p.category === 'electronics');
  const mobilesProducts = products.filter(p => p.category === 'mobiles');

  return (
    <div className="w-full bg-[#f7fafa] min-h-screen">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Main Content Body */}
      <div className="max-w-[1500px] mx-auto px-3 sm:px-6 lg:px-8 relative z-20 -mt-16 sm:-mt-24 lg:-mt-32">
        
        {/* Quadrant Category Cards (Amazon Style 4-grid cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {homeQuadrantCards.map((card) => (
            <CategoryCard
              key={card.id}
              title={card.title}
              linkText={card.linkText}
              linkSlug={card.linkSlug}
              items={card.items}
            />
          ))}
        </div>

        {/* Quick Category Chips */}
        <div className="bg-white rounded-md border border-gray-200 p-4 mb-6 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm sm:text-base text-gray-900">
              Popular Departments
            </h3>
            <Link to="/products" className="text-xs font-semibold text-[#007185] hover:underline">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 text-center">
            {categories.filter(c => c.slug !== 'all').map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.slug}`}
                className="group flex flex-col items-center p-2 rounded hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#f1f4f4] p-2 flex items-center justify-center mb-1.5 border border-gray-100 group-hover:border-amber-400 group-hover:shadow-sm transition-all overflow-hidden">
                  <img
                    src={cat.featuredImage}
                    alt={cat.name}
                    className="w-full h-full object-contain transform group-hover:scale-110 transition-transform"
                    loading="lazy"
                  />
                </div>
                <span className="text-xs font-medium text-gray-800 group-hover:text-amber-800 transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Today's Lightning Deals Carousel */}
        <ProductSection
          title="Today's Lightning Deals"
          subtitle="Top discounts and limited time offers across top categories"
          products={lightningDeals}
          viewAllLink="/products?deal=true"
          badgeText="UP TO 71% OFF"
        />

        {/* Promotional Mid-Page Banner */}
        <div className="bg-gradient-to-r from-[#161c24] via-[#232F3E] to-[#131921] rounded-lg p-6 sm:p-8 text-white my-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-700">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold text-[#fe9800] tracking-wider uppercase bg-[#fe9800]/10 px-2.5 py-1 rounded border border-[#fe9800]/30">
              Special Advantage
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">
              ShopSphere Prime Fast & Free Delivery
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
              Enjoy Unlimited Free 1-Day Delivery, early access to lightning deals, exclusive bank discounts, and easy returns.
            </p>
          </div>
          <Link
            to="/products"
            className="px-6 py-3 bg-[#FFD814] hover:bg-[#F7CA00] text-gray-950 font-bold text-xs sm:text-sm rounded shadow transition-all shrink-0"
          >
            Explore Prime Deals
          </Link>
        </div>

        {/* Best Sellers in Electronics */}
        <ProductSection
          title="Best Sellers in Electronics & Audio"
          subtitle="Customer favorite headphones, laptops, TVs and accessories"
          products={electronicsProducts}
          viewAllLink="/products?category=electronics"
        />

        {/* Flagship Mobiles & Smart Gadgets */}
        <ProductSection
          title="Top Rated Smartphones & 5G Devices"
          subtitle="Discover latest smartphones with cutting-edge AI and pro camera systems"
          products={mobilesProducts}
          viewAllLink="/products?category=mobiles"
        />

        {/* Trust & Guarantee Strip */}
        <div className="bg-white rounded-md border border-gray-200 p-6 my-6 shadow-xs">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center space-y-1">
              <div className="w-12 h-12 rounded-full bg-amber-50 text-[#8a5100] flex items-center justify-center mb-1">
                <Truck className="w-6 h-6 text-[#fe9800]" />
              </div>
              <h4 className="font-bold text-sm text-gray-900">Fast & Free Delivery</h4>
              <p className="text-xs text-gray-500">Free delivery on millions of eligible items</p>
            </div>

            <div className="flex flex-col items-center space-y-1">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mb-1">
                <ShieldCheck className="w-6 h-6 text-[#067D62]" />
              </div>
              <h4 className="font-bold text-sm text-gray-900">100% Purchase Protection</h4>
              <p className="text-xs text-gray-500">Safe, secure and encrypted transactions</p>
            </div>

            <div className="flex flex-col items-center space-y-1">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center mb-1">
                <RefreshCw className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-bold text-sm text-gray-900">7 Days Easy Replacement</h4>
              <p className="text-xs text-gray-500">Hassle-free replacement for damaged items</p>
            </div>

            <div className="flex flex-col items-center space-y-1">
              <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center mb-1">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-bold text-sm text-gray-900">Genuine Products</h4>
              <p className="text-xs text-gray-500">100% authentic items from certified brands</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
