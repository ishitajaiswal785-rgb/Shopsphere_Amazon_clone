import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  Share2, 
  Truck, 
  ShieldCheck, 
  RefreshCw, 
  Award, 
  Lock, 
  ChevronRight, 
  Check, 
  Percent, 
  CreditCard, 
  Building2, 
  ArrowRight, 
  ShoppingCart, 
  Zap, 
  MapPin, 
  CheckCircle2 
} from 'lucide-react';
import { products, formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import ProductSection from '../components/ProductSection';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();

  // Find product by id, default to first product if not found
  const product = products.find(p => p.id === id) || products[0];

  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isGift, setIsGift] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Update active image when route changes
  useEffect(() => {
    setActiveImage(product.image);
    setSelectedQuantity(1);
    window.scrollTo(0, 0);
  }, [id, product]);

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedQuantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedQuantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Related products from same category
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id);

  // Star breakdown percentages
  const ratingBreakdown = [
    { stars: 5, pct: 76 },
    { stars: 4, pct: 16 },
    { stars: 3, pct: 5 },
    { stars: 2, pct: 2 },
    { stars: 1, pct: 1 }
  ];

  return (
    <div className="w-full bg-[#f7fafa] min-h-screen pb-16">
      
      {/* Top Breadcrumb & Metadata Bar */}
      <div className="w-full bg-white border-b border-gray-200">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs text-gray-500">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-amber-700 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link to={`/products?category=${product.category}`} className="hover:text-amber-700 transition-colors">
              {product.categoryName}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-semibold text-gray-900 truncate max-w-[200px] sm:max-w-xs md:max-w-md">
              {product.name}
            </span>
          </nav>

          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[11px] font-bold bg-amber-50 text-amber-900 px-2 py-0.5 rounded border border-amber-200">
              Verified Marketplace Authentic
            </span>
          </div>
        </div>
      </div>

      {/* Main 3-Column Layout: Left Gallery | Center Details | Right Sticky Buy Box */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* LEFT: Product Image Gallery */}
          <div className="md:col-span-5 lg:col-span-4 xl:col-span-5 flex flex-col sm:flex-row-reverse gap-4">
            
            {/* Main Preview Box */}
            <div className="relative flex-1 bg-white rounded-lg border border-gray-200 p-6 flex items-center justify-center aspect-square shadow-xs group">
              {/* Wishlist & Share floating triggers */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  className="w-9 h-9 rounded-full bg-white shadow-md border border-gray-100 hover:bg-gray-50 flex items-center justify-center text-gray-600 hover:text-red-500 transition-all"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
                <button
                  onClick={handleShare}
                  aria-label="Share product"
                  className="w-9 h-9 rounded-full bg-white shadow-md border border-gray-100 hover:bg-gray-50 flex items-center justify-center text-gray-600 hover:text-blue-500 transition-all relative"
                >
                  <Share2 className="w-4 h-4" />
                  {copiedLink && (
                    <span className="absolute -bottom-7 right-0 text-[10px] bg-black text-white px-2 py-0.5 rounded whitespace-nowrap shadow-sm">
                      Copied!
                    </span>
                  )}
                </button>
              </div>

              {/* Main Image */}
              <img
                src={activeImage}
                alt={product.name}
                className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Vertical Thumbnail Strip */}
            <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0">
              {(product.images || [product.image]).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-md p-1 bg-white border flex items-center justify-center overflow-hidden transition-all ${
                    activeImage === img
                      ? 'border-[#FE9800] ring-2 ring-[#FE9800]/30 shadow-xs'
                      : 'border-gray-200 hover:border-gray-400 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="max-h-full max-w-full object-contain" />
                </button>
              ))}
            </div>

          </div>

          {/* CENTER: Product Information, Specs & Features */}
          <div className="md:col-span-4 lg:col-span-5 xl:col-span-4 space-y-5">
            
            {/* Title & Brand */}
            <div>
              <Link
                to={`/products?category=${product.category}`}
                className="text-xs font-semibold text-[#007185] hover:text-[#C7511F] hover:underline"
              >
                Visit the {product.brand} Store
              </Link>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1 leading-snug">
                {product.name}
              </h1>
            </div>

            {/* Rating & Reviews Bar */}
            <div className="flex items-center gap-2 pb-3 border-b border-gray-200 text-xs">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : i < product.rating
                        ? 'fill-amber-400/50 text-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="font-bold text-gray-900">{product.rating}</span>
              <span className="text-gray-400">|</span>
              <a href="#reviews" className="text-[#007185] hover:underline font-medium">
                {product.reviewCount.toLocaleString('en-IN')} ratings
              </a>
              {product.badge && (
                <>
                  <span className="text-gray-400">|</span>
                  <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-2 py-0.5 rounded">
                    {product.badge}
                  </span>
                </>
              )}
            </div>

            {/* Price Block */}
            <div className="space-y-1 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                {product.discount > 0 && (
                  <span className="text-xl sm:text-2xl font-light text-red-700">
                    -{product.discount}%
                  </span>
                )}
                <div className="flex items-baseline">
                  <span className="text-xs text-gray-700 font-semibold align-top mr-0.5">₹</span>
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900 tabular-nums">
                    {product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-gray-500">.00</span>
                </div>
              </div>

              {product.originalPrice && (
                <div className="text-xs text-gray-500">
                  M.R.P.: <span className="line-through tabular-nums">{formatPrice(product.originalPrice)}</span>
                </div>
              )}
              <div className="text-xs text-gray-600 font-medium">
                Inclusive of all taxes
              </div>
              <div className="text-xs text-gray-700 pt-1">
                <span className="font-semibold">EMI</span> starts at ₹{Math.round(product.price / 18).toLocaleString('en-IN')}/month. No Cost EMI available.
              </div>
            </div>

            {/* Offers & Bank Discounts */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5 text-[#FE9800]" />
                <span>Special Offers</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded border border-gray-200 bg-white hover:border-amber-400 transition-colors">
                  <div className="font-bold text-gray-900 flex items-center gap-1">
                    <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                    <span>Bank Offer</span>
                  </div>
                  <p className="text-[11px] text-gray-600 mt-1 line-clamp-2">
                    Upto ₹2,000 instant discount on HDFC & SBI Bank Cards.
                  </p>
                </div>
                <div className="p-2.5 rounded border border-gray-200 bg-white hover:border-amber-400 transition-colors">
                  <div className="font-bold text-gray-900 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Partner Offers</span>
                  </div>
                  <p className="text-[11px] text-gray-600 mt-1 line-clamp-2">
                    Get GST invoice and save up to 28% on business purchases.
                  </p>
                </div>
              </div>
            </div>

            {/* Service & Guarantee Badges */}
            <div className="grid grid-cols-4 gap-2 py-3 border-y border-gray-200 text-center text-[10px] text-gray-600">
              <div className="flex flex-col items-center">
                <RefreshCw className="w-5 h-5 text-blue-600 mb-1" />
                <span>7 Days Replacement</span>
              </div>
              <div className="flex flex-col items-center">
                <Truck className="w-5 h-5 text-[#067D62] mb-1" />
                <span>Free Delivery</span>
              </div>
              <div className="flex flex-col items-center">
                <Award className="w-5 h-5 text-amber-600 mb-1" />
                <span>1 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-5 h-5 text-purple-600 mb-1" />
                <span>Top Brand</span>
              </div>
            </div>

            {/* Specifications Table */}
            {product.specs && (
              <div className="space-y-2">
                <h3 className="font-bold text-sm text-gray-900">Technical Details</h3>
                <div className="border border-gray-200 rounded overflow-hidden divide-y divide-gray-100 text-xs">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-3 p-2 bg-white">
                      <span className="font-medium text-gray-500 col-span-1">{key}</span>
                      <span className="text-gray-900 col-span-2">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* About this item / Features */}
            <div className="space-y-2">
              <h3 className="font-bold text-sm text-gray-900">About this item</h3>
              <p className="text-xs text-gray-700 leading-relaxed mb-2">
                {product.description}
              </p>
              {product.features && (
                <ul className="list-disc pl-4 space-y-1.5 text-xs text-gray-700">
                  {product.features.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
              )}
            </div>

          </div>

          {/* RIGHT: Sticky Buy Box */}
          <div className="md:col-span-3 lg:col-span-3 space-y-4">
            <div className="bg-white rounded-lg border border-gray-300 p-5 shadow-sm sticky top-28 space-y-4 text-xs">
              
              {/* Price in Buy Box */}
              <div>
                <div className="text-2xl font-bold text-gray-900 tabular-nums">
                  {formatPrice(product.price)}
                </div>
                <div className="text-gray-500 text-[11px] mt-0.5">
                  M.R.P: <span className="line-through">{formatPrice(product.originalPrice)}</span>
                </div>
              </div>

              {/* Delivery Promise */}
              <div className="space-y-1">
                <div className="text-gray-800">
                  <span className="font-bold text-[#067D62]">FREE Delivery</span>{' '}
                  <span className="font-bold text-gray-900">{product.deliveryDate || 'Tomorrow'}</span>
                </div>
                <div className="text-gray-500 text-[11px] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>Deliver to {user?.name || 'Rahul'} — {user?.city || 'Bengaluru'} {user?.pincode || '560001'}</span>
                </div>
              </div>

              {/* Availability Status */}
              <div>
                <span className="text-sm font-bold text-[#067D62] block">
                  {product.availability || 'In stock'}
                </span>
                <span className="text-gray-500 text-[11px]">
                  Ships within 24 hours from ShopSphere certified warehouse.
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-2">
                <label className="font-medium text-gray-700">Quantity:</label>
                <select
                  value={selectedQuantity}
                  onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                  className="bg-gray-50 border border-gray-300 rounded px-2.5 py-1 text-xs font-semibold focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              {/* Gift option */}
              <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isGift}
                  onChange={(e) => setIsGift(e.target.checked)}
                  className="rounded text-amber-500"
                />
                <span>Add gift options</span>
              </label>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-2.5 px-4 rounded-md bg-[#FFD814] hover:bg-[#F7CA00] active:bg-amber-400 text-gray-900 font-semibold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-2.5 px-4 rounded-md bg-[#FFA41C] hover:bg-[#FA8900] active:bg-orange-500 text-gray-900 font-semibold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Zap className="w-4 h-4" />
                  <span>Buy Now</span>
                </button>
              </div>

              {/* Added to cart toast */}
              {addedNotice && (
                <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-2 rounded flex items-center gap-2 text-[11px] animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Added {selectedQuantity} item(s) to Cart!</span>
                </div>
              )}

              {/* Security info */}
              <div className="pt-2 border-t border-gray-200 text-[11px] text-gray-500 space-y-1.5">
                <div className="flex items-center gap-1.5 text-gray-700">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-medium">Secure transaction</span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-[10px]">
                  <span className="text-gray-400">Ships from</span>
                  <span className="text-gray-700">ShopSphere</span>
                  <span className="text-gray-400">Sold by</span>
                  <span className="text-gray-700">{product.brand} Official</span>
                </div>
              </div>

              {/* Wishlist button */}
              <div className="pt-2 border-t border-gray-200">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="w-full py-1.5 px-3 rounded border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                  <span>{isFavorited ? 'In your Wish List' : 'Add to Wish List'}</span>
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Customer Reviews Section */}
        <section id="reviews" className="mt-16 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Reviews Summary Breakdown */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-2xl font-bold text-gray-900">{product.rating} out of 5</span>
              </div>
              <div className="text-xs text-gray-500">
                Based on {product.reviewCount.toLocaleString('en-IN')} global ratings
              </div>

              {/* Progress bars */}
              <div className="space-y-2 text-xs">
                {ratingBreakdown.map((r) => (
                  <div key={r.stars} className="flex items-center gap-2">
                    <span className="w-12 text-gray-600 font-medium">{r.stars} star</span>
                    <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full"
                        style={{ width: `${r.pct}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-gray-500 tabular-nums">{r.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Written reviews */}
            <div className="md:col-span-8 space-y-6">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((rev, idx) => (
                  <div key={idx} className="border-b border-gray-100 pb-5 space-y-1.5 text-xs">
                    <div className="font-semibold text-gray-900">{rev.author}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="font-bold text-gray-900">{rev.title}</span>
                    </div>
                    <div className="text-gray-400 text-[11px]">{rev.date}</div>
                    {rev.verified && (
                      <div className="text-amber-800 font-semibold text-[11px]">
                        Verified Purchase
                      </div>
                    )}
                    <p className="text-gray-700 leading-relaxed pt-1">{rev.comment}</p>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-sm py-4">
                  No customer reviews yet for this product.
                </div>
              )}
            </div>

          </div>
        </section>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <ProductSection
              title="Customers Who Viewed This Item Also Bought"
              products={relatedProducts}
              viewAllLink={`/products?category=${product.category}`}
            />
          </div>
        )}

      </div>
    </div>
  );
}
