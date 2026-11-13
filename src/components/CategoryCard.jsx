import React from 'react';
import { Link } from 'react-router-dom';

export default function CategoryCard({ title, linkText, linkSlug, items }) {
  return (
    <div className="bg-white rounded-md p-4 sm:p-5 border border-gray-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        <h3 className="font-bold text-lg sm:text-xl text-[#181C1D] mb-3 leading-tight tracking-tight">
          {title}
        </h3>

        {/* 2x2 Quadrant Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {items.map((item, idx) => (
            <Link
              key={idx}
              to={`/products?category=${item.slug}`}
              className="group flex flex-col items-start"
            >
              <div className="w-full aspect-square bg-[#F1F4F4] rounded p-2 flex items-center justify-center overflow-hidden mb-1.5 border border-gray-100 group-hover:border-amber-300 transition-colors">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <span className="text-xs text-gray-700 font-medium line-clamp-1 group-hover:text-amber-800 transition-colors">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-2 border-t border-gray-100">
        <Link
          to={`/products?category=${linkSlug}`}
          className="text-xs font-semibold text-[#007185] hover:text-[#C7511F] hover:underline transition-colors inline-block"
        >
          {linkText || 'See more'}
        </Link>
      </div>
    </div>
  );
}
