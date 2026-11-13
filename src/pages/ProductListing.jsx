import React, { useState, useMemo } from 'react';
import { useLocation, Link, useSearchParams } from 'react-router-dom';
import { 
  Star, 
  ChevronRight, 
  Filter, 
  X, 
  LayoutGrid, 
  List, 
  RotateCcw, 
  Check, 
  SearchX, 
  SlidersHorizontal 
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, formatPrice } from '../data/products';
import { categories } from '../data/categories';
import { useWishlist } from '../context/WishlistContext';

export default function ProductListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { wishlist } = useWishlist();

  // Query params
  const categoryParam = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';
  console.log("SEARCH QUERY:", searchQuery);
  const sortParam = searchParams.get('sort') || 'featured';
  const isDealParam = searchParams.get('deal') === 'true';
  const isWishlistParam = searchParams.get('wishlist') === 'true';

  // Local filter states
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [priceRange, setPriceRange] = useState('all'); // 'all', 'under-1000', '1000-5000', '5000-15000', 'over-15000', 'custom'
  const [customMin, setCustomMin] = useState('');
  const [customMax, setCustomMax] = useState('');
  const [minDiscount, setMinDiscount] = useState(0);
  const [onlyPrime, setOnlyPrime] = useState(false);
  const [layoutMode, setLayoutMode] = useState('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Available brands in the system
  const allBrands = useMemo(() => {
    const brandSet = new Set(products.map(p => p.brand));
    return Array.from(brandSet).sort();
  }, []);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Wishlist view
      if (isWishlistParam && !wishlist.includes(item.id)) {
        return false;
      }

      // Category filter
      if (categoryParam !== 'all' && item.category !== categoryParam) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        if (query === "camera") {
          return item.category === "cameras";
        }
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesBrand = item.brand.toLowerCase().includes(query);
        const matchesCategory = item.categoryName.toLowerCase().includes(query);
        
        if (!matchesName && !matchesBrand && !matchesCategory) {
          return false;
      }
    }

      // Today's deals
      if (isDealParam && item.discount < 20 && !item.dealType) {
        return false;
      }

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(item.brand)) {
        return false;
      }

      // Rating filter
      if (selectedRating > 0 && item.rating < selectedRating) {
        return false;
      }

      // Discount filter
      if (minDiscount > 0 && item.discount < minDiscount) {
        return false;
      }

      // Prime only filter
      if (onlyPrime && !item.prime) {
        return false;
      }

      // Price range filter
      if (priceRange === 'under-1000' && item.price >= 1000) return false;
      if (priceRange === '1000-5000' && (item.price < 1000 || item.price > 5000)) return false;
      if (priceRange === '5000-15000' && (item.price < 5000 || item.price > 15000)) return false;
      if (priceRange === 'over-15000' && item.price <= 15000) return false;
      if (priceRange === 'custom') {
        const min = parseFloat(customMin) || 0;
        const max = parseFloat(customMax) || Infinity;
        if (item.price < min || item.price > max) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortParam === 'price-low') return a.price - b.price;
      if (sortParam === 'price-high') return b.price - a.price;
      if (sortParam === 'rating') return b.rating - a.rating;
      if (sortParam === 'popularity') return b.reviewCount - a.reviewCount;
      if (sortParam === 'discount') return b.discount - a.discount;
      return 0; // 'featured'
    });
  }, [
    categoryParam,
    searchQuery,
    sortParam,
    isDealParam,
    isWishlistParam,
    wishlist,
    selectedBrands,
    selectedRating,
    minDiscount,
    onlyPrime,
    priceRange,
    customMin,
    customMax
  ]);

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('sort', newSort);
    setSearchParams(nextParams);
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedRating(0);
    setPriceRange('all');
    setCustomMin('');
    setCustomMax('');
    setMinDiscount(0);
    setOnlyPrime(false);
  };

  const hasActiveFilters = 
    selectedBrands.length > 0 || 
    selectedRating > 0 || 
    priceRange !== 'all' || 
    minDiscount > 0 || 
    onlyPrime;

  const currentCategoryObj = categories.find(c => c.slug === categoryParam);

  return (
    <div className="w-full bg-[#f7fafa] min-h-screen pb-16">
      
      {/* Top Breadcrumb & Results Meta Header */}
      <div className="w-full bg-white border-b border-gray-200 shadow-xs">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-amber-700 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link to="/products" className="hover:text-amber-700 transition-colors">Products</Link>
            {categoryParam !== 'all' && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                <span className="font-semibold text-gray-900">{currentCategoryObj?.name || categoryParam}</span>
              </>
            )}
            {searchQuery && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                <span className="font-semibold text-gray-900">"{searchQuery}"</span>
              </>
            )}
            {isWishlistParam && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                <span className="font-semibold text-red-600">Your Wish List</span>
              </>
            )}
          </nav>

          {/* Results Count */}
          <div className="font-medium text-gray-700">
            Showing <span className="font-bold text-gray-900">{filteredProducts.length}</span> results
            {searchQuery && <span> for "<span className="text-[#c7511f] font-semibold">{searchQuery}</span>"</span>}
          </div>
        </div>
      </div>

      {/* Main Listing Layout: Left Sidebar + Right Products Grid */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-6 flex gap-6">

        {/* Desktop Sticky Filter Sidebar (260px) */}
        <aside className="w-64 shrink-0 hidden lg:block space-y-6 text-xs text-gray-800">
          
          {/* Reset button if active */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between bg-amber-50 p-2.5 rounded border border-amber-200">
              <span className="font-semibold text-amber-900 text-xs">Filters Applied</span>
              <button
                onClick={resetFilters}
                className="text-xs text-blue-700 hover:underline flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear All</span>
              </button>
            </div>
          )}

          {/* Department / Category */}
          <div className="border-b border-gray-200 pb-5">
            <h3 className="font-bold text-sm text-gray-900 mb-2.5">Department</h3>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => {
                    const p = new URLSearchParams(searchParams);
                    p.delete('category');
                    setSearchParams(p);
                  }}
                  className={`hover:underline block ${categoryParam === 'all' ? 'font-bold text-[#c7511f]' : 'text-gray-700'}`}
                >
                  All Departments
                </button>
              </li>
              {categories.filter(c => c.slug !== 'all').map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      const p = new URLSearchParams(searchParams);
                      p.set('category', cat.slug);
                      setSearchParams(p);
                    }}
                    className={`hover:underline block text-left ${categoryParam === cat.slug ? 'font-bold text-[#c7511f]' : 'text-gray-700'}`}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Delivery Day */}
          <div className="border-b border-gray-200 pb-5">
            <h3 className="font-bold text-sm text-gray-900 mb-2.5">Delivery Day</h3>
            <label className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
              <input
                type="checkbox"
                checked={onlyPrime}
                onChange={(e) => setOnlyPrime(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
              />
              <span className="font-medium text-xs">Get It by Tomorrow</span>
            </label>
          </div>

          {/* Customer Reviews Rating */}
          <div className="border-b border-gray-200 pb-5">
            <h3 className="font-bold text-sm text-gray-900 mb-2.5">Customer Reviews</h3>
            <div className="space-y-1.5">
              {[4, 3, 2, 1].map((stars) => (
                <button
                  key={stars}
                  onClick={() => setSelectedRating(selectedRating === stars ? 0 : stars)}
                  className={`flex items-center gap-1.5 w-full text-left py-1 px-1 rounded transition-colors ${
                    selectedRating === stars ? 'bg-amber-100/60 font-semibold text-amber-900' : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < stars ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-700">& Up</span>
                </button>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="border-b border-gray-200 pb-5">
            <h3 className="font-bold text-sm text-gray-900 mb-2.5">Brands</h3>
            <div className="space-y-1.5 max-h-48 overflow-y-auto no-scrollbar">
              {allBrands.map((brand) => (
                <label key={brand} className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
                  />
                  <span className="text-xs text-gray-700">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="border-b border-gray-200 pb-5">
            <h3 className="font-bold text-sm text-gray-900 mb-2.5">Price</h3>
            <div className="space-y-1.5">
              {[
                { label: 'All Prices', val: 'all' },
                { label: 'Under ₹1,000', val: 'under-1000' },
                { label: '₹1,000 - ₹5,000', val: '1000-5000' },
                { label: '₹5,000 - ₹15,000', val: '5000-15000' },
                { label: 'Over ₹15,000', val: 'over-15000' }
              ].map((p) => (
                <label key={p.val} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="priceRangeRadio"
                    checked={priceRange === p.val}
                    onChange={() => setPriceRange(p.val)}
                    className="w-3.5 h-3.5 text-amber-500 focus:ring-amber-400"
                  />
                  <span className="text-xs text-gray-700">{p.label}</span>
                </label>
              ))}
            </div>

            {/* Custom Min / Max */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <span className="text-[11px] font-semibold text-gray-500 block mb-1.5">Custom Price (₹)</span>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  placeholder="₹ Min"
                  value={customMin}
                  onChange={(e) => {
                    setCustomMin(e.target.value);
                    setPriceRange('custom');
                  }}
                  className="w-20 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:border-amber-500"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="number"
                  placeholder="₹ Max"
                  value={customMax}
                  onChange={(e) => {
                    setCustomMax(e.target.value);
                    setPriceRange('custom');
                  }}
                  className="w-20 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:border-amber-500"
                />
                <button
                  onClick={() => setPriceRange('custom')}
                  className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded text-xs font-semibold text-gray-800"
                >
                  Go
                </button>
              </div>
            </div>
          </div>

          {/* Discount Percentage */}
          <div className="border-b border-gray-200 pb-5">
            <h3 className="font-bold text-sm text-gray-900 mb-2.5">Discount</h3>
            <div className="space-y-1.5">
              {[10, 25, 40, 50].map((d) => (
                <button
                  key={d}
                  onClick={() => setMinDiscount(minDiscount === d ? 0 : d)}
                  className={`block text-left w-full px-1 py-0.5 rounded ${
                    minDiscount === d ? 'font-bold text-[#c7511f] bg-amber-50' : 'text-gray-700 hover:underline'
                  }`}
                >
                  {d}% Off or more
                </button>
              ))}
            </div>
          </div>

        </aside>

        {/* Right Main Content Area */}
        <main className="flex-1 min-w-0">
          
          {/* Controls Bar: Mobile Filter Trigger + Sort dropdown + Grid/List toggle */}
          <div className="bg-white rounded-md border border-gray-200 p-3 mb-4 flex items-center justify-between gap-3 flex-wrap shadow-xs">
            
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
              <span>Filters {hasActiveFilters && `(${selectedBrands.length + (selectedRating ? 1 : 0)})`}</span>
            </button>

            {/* Active filter summary pill */}
            <div className="text-xs text-gray-500 hidden sm:block">
              {filteredProducts.length} items found
            </div>

            {/* Right: Sort & Layout toggles */}
            <div className="flex items-center gap-3 ml-auto">
              <div className="flex items-center gap-1.5 text-xs text-gray-700">
                <span className="font-semibold text-gray-500">Sort by:</span>
                <select
                  value={sortParam}
                  onChange={handleSortChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded px-2.5 py-1.5 focus:border-amber-500 focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Avg. Customer Review</option>
                  <option value="popularity">Popularity</option>
                  <option value="discount">Biggest Discount</option>
                </select>
              </div>

              {/* Grid / List switch */}
              <div className="hidden sm:flex items-center border border-gray-200 rounded overflow-hidden">
                <button
                  onClick={() => setLayoutMode('grid')}
                  className={`p-1.5 ${layoutMode === 'grid' ? 'bg-amber-100 text-amber-900' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                  aria-label="Grid layout"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setLayoutMode('list')}
                  className={`p-1.5 ${layoutMode === 'list' ? 'bg-amber-100 text-amber-900' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                  aria-label="List layout"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 mb-4 flex-wrap text-xs">
              <span className="text-gray-500 font-medium">Active filters:</span>
              {selectedBrands.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full font-medium"
                >
                  {b}
                  <X className="w-3 h-3 cursor-pointer hover:text-black" onClick={() => toggleBrand(b)} />
                </span>
              ))}
              {selectedRating > 0 && (
                <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full font-medium">
                  {selectedRating}★ & above
                  <X className="w-3 h-3 cursor-pointer hover:text-black" onClick={() => setSelectedRating(0)} />
                </span>
              )}
              {priceRange !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full font-medium">
                  Price: {priceRange}
                  <X className="w-3 h-3 cursor-pointer hover:text-black" onClick={() => setPriceRange('all')} />
                </span>
              )}
              {minDiscount > 0 && (
                <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full font-medium">
                  {minDiscount}%+ Off
                  <X className="w-3 h-3 cursor-pointer hover:text-black" onClick={() => setMinDiscount(0)} />
                </span>
              )}
              {onlyPrime && (
                <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full font-medium">
                  Tomorrow Delivery
                  <X className="w-3 h-3 cursor-pointer hover:text-black" onClick={() => setOnlyPrime(false)} />
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-xs text-[#007185] hover:underline font-semibold ml-1"
              >
                Reset All
              </button>
            </div>
          )}

          {/* Products Grid or Empty State */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-md border border-gray-200 p-12 text-center my-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center">
                <SearchX className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                No matching products found
              </h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                We couldn't find any products matching your active search or filters. Try adjusting your search query or reset your filters.
              </p>
              <div className="pt-2">
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-semibold text-xs rounded shadow-xs"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          ) : layoutMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} layout="grid" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} layout="list" />
              ))}
            </div>
          )}

        </main>
      </div>

      {/* Mobile Off-Canvas Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl p-6 overflow-y-auto z-10 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-bold text-base text-gray-900">Filters</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-gray-500 hover:text-gray-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Department */}
              <div>
                <h4 className="font-bold text-xs uppercase text-gray-400 mb-2">Category</h4>
                <div className="space-y-1.5 text-xs">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        const p = new URLSearchParams(searchParams);
                        if (c.slug === 'all') p.delete('category');
                        else p.set('category', c.slug);
                        setSearchParams(p);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`block w-full text-left py-1 ${categoryParam === c.slug ? 'font-bold text-[#c7511f]' : 'text-gray-700'}`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h4 className="font-bold text-xs uppercase text-gray-400 mb-2">Brands</h4>
                <div className="space-y-1.5 text-xs max-h-40 overflow-y-auto">
                  {allBrands.map((b) => (
                    <label key={b} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(b)}
                        onChange={() => toggleBrand(b)}
                        className="rounded text-amber-500"
                      />
                      <span>{b}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Delivery */}
              <div>
                <h4 className="font-bold text-xs uppercase text-gray-400 mb-2">Delivery</h4>
                <label className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={onlyPrime}
                    onChange={(e) => setOnlyPrime(e.target.checked)}
                    className="rounded text-amber-500"
                  />
                  <span>Get It by Tomorrow</span>
                </label>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="pt-6 border-t mt-6 flex gap-2">
              <button
                onClick={resetFilters}
                className="flex-1 py-2 border border-gray-300 rounded text-xs font-semibold text-gray-700"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2 bg-[#FFD814] rounded text-xs font-semibold text-gray-950"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
