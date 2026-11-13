import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Check, ShoppingCart, ShieldCheck } from 'lucide-react';
import { formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product, layout = 'grid' }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
    }, 1500);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  if (layout === 'list') {
    return (
      <div className="bg-white rounded-md border border-gray-200 p-4 hover:shadow-lg transition-all flex flex-col sm:flex-row gap-4 relative group">
        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          aria-label={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs shadow-xs hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
        </button>

        {/* Thumbnail */}
        <Link 
          to={`/product/${product.id}`}
          className="w-full sm:w-48 sm:h-48 aspect-square bg-[#F7FAFA] rounded p-3 flex items-center justify-center shrink-0 overflow-hidden"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </Link>

        {/* Information */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            {/* Badges */}
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              {product.badge && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#232F3E] text-white">
                  {product.badge}
                </span>
              )}
              {product.dealType && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-red-700 text-white">
                  {product.dealType}
                </span>
              )}
            </div>

            {/* Title */}
            <Link
              to={`/product/${product.id}`}
              className="text-sm sm:text-base font-semibold text-gray-900 hover:text-[#C7511F] hover:underline line-clamp-2 leading-snug mb-1"
            >
              {product.name}
            </Link>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-2">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : i < product.rating
                        ? 'fill-amber-400/50 text-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-gray-800">{product.rating}</span>
              <span className="text-xs text-gray-500">
                ({product.reviewCount.toLocaleString('en-IN')})
              </span>
            </div>

            {/* Price block */}
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-xl sm:text-2xl font-bold text-gray-900 tabular-nums">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-500 line-through tabular-nums">
                  M.R.P: {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.discount > 0 && (
                <span className="text-xs font-bold text-[#067D62]">
                  ({product.discount}% off)
                </span>
              )}
            </div>

            {/* Delivery Info */}
            <div className="text-xs text-gray-700 mb-2">
              <span className="font-semibold">FREE Delivery</span>{' '}
              <span className="font-bold text-gray-900">{product.deliveryDate || 'Tomorrow'}</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={handleAddToCart}
              className={`px-5 py-2 rounded text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs ${
                addedAnimation
                  ? 'bg-green-600 text-white'
                  : 'bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 active:bg-amber-400'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
            <Link
              to={`/product/${product.id}`}
              className="text-xs font-medium text-gray-600 hover:text-gray-900 hover:underline"
            >
              View details
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Default Grid Layout
  return (
    <div className="product-card bg-white rounded-md border border-gray-200 p-3 sm:p-4 hover:shadow-lg transition-all flex flex-col justify-between relative group">
      {/* Top badges & Wishlist */}
      <div className="flex items-start justify-between gap-1 mb-2">
        <div className="flex flex-col gap-1 items-start">
          {product.badge && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#232F3E] text-white">
              {product.badge}
            </span>
          )}
          {product.dealType && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-700 text-white">
              {product.dealType}
            </span>
          )}
        </div>

        <button
          onClick={handleToggleWishlist}
          aria-label={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
          className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs shadow-xs hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors shrink-0"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
        </button>
      </div>

      {/* Image */}
      <Link
        to={`/product/${product.id}`}
        className="w-full aspect-square bg-[#F7FAFA] rounded p-3 flex items-center justify-center overflow-hidden mb-3"
      >
        <img
          src={product.image}
          alt={product.name}
          className="product-card-img max-h-full max-w-full object-contain"
          loading="lazy"
        />
      </Link>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Brand */}
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
            {product.brand}
          </div>

          {/* Title */}
          <Link
            to={`/product/${product.id}`}
            className="text-xs sm:text-sm font-semibold text-gray-900 hover:text-[#C7511F] hover:underline line-clamp-2 leading-snug mb-1.5"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : i < product.rating
                      ? 'fill-amber-400/50 text-amber-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-bold text-gray-800">{product.rating}</span>
            <span className="text-[11px] text-gray-500">
              ({product.reviewCount > 1000 ? `${(product.reviewCount / 1000).toFixed(1)}k` : product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1.5 mb-1 flex-wrap">
            <span className="text-base sm:text-lg font-bold text-gray-900 tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] text-gray-500 line-through tabular-nums">
                M.R.P: {formatPrice(product.originalPrice)}
              </span>
            )}
            {product.discount > 0 && (
              <span className="text-[11px] font-bold text-[#067D62]">
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Delivery Note */}
          <div className="text-[11px] text-gray-600 mb-3">
            <span>Get it by </span>
            <span className="font-bold text-gray-900">{product.deliveryDate || 'Tomorrow'}</span>
            <div className="text-[#067D62] font-medium text-[10px]">FREE Delivery by ShopSphere</div>
          </div>
        </div>

        {/* Add to Cart CTA */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-1.5 sm:py-2 px-3 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs ${
            addedAnimation
              ? 'bg-green-600 text-white'
              : 'bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 active:bg-amber-400'
          }`}
        >
          {addedAnimation ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
