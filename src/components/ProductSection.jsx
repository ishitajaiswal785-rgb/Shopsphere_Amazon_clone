import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Flame } from 'lucide-react';
import ProductCard from './ProductCard';

export default function ProductSection({ 
  title, 
  subtitle, 
  products = [], 
  viewAllLink = '/products',
  badgeText = null
}) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!products.length) return null;

  return (
    <section className="bg-white rounded-md border border-gray-200 p-4 sm:p-5 my-4 sm:my-6 shadow-xs relative">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2">
            {badgeText && (
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#8a5100]/20 text-[#8a5100] border border-[#fe9800]/40 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-orange-600" />
                {badgeText}
              </span>
            )}
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
              {title}
            </h2>
          </div>
          {subtitle && (
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{subtitle}</p>
          )}
        </div>

        {/* View All & Arrow controls */}
        <div className="flex items-center gap-3">
          <Link
            to={viewAllLink}
            className="text-xs font-semibold text-[#007185] hover:text-[#C7511F] hover:underline flex items-center gap-1"
          >
            <span>See all deals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <div className="hidden sm:flex items-center gap-1">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="p-1.5 rounded-full border border-gray-300 hover:bg-gray-100 text-gray-600 transition-colors shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="p-1.5 rounded-full border border-gray-300 hover:bg-gray-100 text-gray-600 transition-colors shadow-xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroller */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto no-scrollbar pb-2 pt-1 scroll-smooth"
      >
        {products.map((product) => (
          <div key={product.id} className="w-56 sm:w-64 shrink-0">
            <ProductCard product={product} layout="grid" />
          </div>
        ))}
      </div>
    </section>
  );
}
