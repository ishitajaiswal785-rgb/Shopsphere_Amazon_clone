import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, X } from 'lucide-react';
import { categories } from '../data/categories';

export default function SearchBar({ initialCategory = 'all', initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e?.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set('search', query.trim());
    if (selectedCategory && selectedCategory !== 'all') params.set('category', selectedCategory);
    navigate(`/products?${params.toString()}`);
  };

  const getCategoryName = (slug) => {
    const cat = categories.find(c => c.slug === slug);
    return cat ? cat.name : 'All';
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full h-10 rounded-lg overflow-visible relative shadow-sm">
      {/* Category Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="h-full bg-[#E6E9E9] hover:bg-[#D7DBDB] text-[#181C1D] text-xs font-medium px-3 flex items-center gap-1 rounded-l-md border-r border-[#C5C6CB]/60 transition-colors shrink-0 max-w-[130px] sm:max-w-[150px]"
        >
          <span className="truncate">{getCategoryName(selectedCategory)}</span>
          <ChevronDown className="w-3.5 h-3.5 shrink-0 text-[#595F68]" />
        </button>

        {isDropdownOpen && (
          <div className="absolute left-0 top-full mt-1 w-56 bg-white rounded-md shadow-xl border border-gray-200 py-1 z-50 max-h-72 overflow-y-auto">
            <div className="px-3 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Departments
            </div>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  setIsDropdownOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 transition-colors flex items-center justify-between ${
                  selectedCategory === cat.slug ? 'bg-amber-50 font-semibold text-amber-900' : 'text-gray-700'
                }`}
              >
                <span>{cat.name}</span>
                {selectedCategory === cat.slug && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="relative flex-1 flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search ShopSphere.in — Electronics, Mobiles, Fashion & more"
          className="w-full h-full px-3.5 bg-white text-gray-900 text-sm placeholder:text-gray-500 focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-2 text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        aria-label="Search"
        className="bg-[#FE9800] hover:bg-[#F3A847] text-[#131921] px-4 sm:px-5 flex items-center justify-center rounded-r-md transition-colors shrink-0"
      >
        <Search className="w-5 h-5 font-bold" />
      </button>
    </form>
  );
}
