import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  Bookmark, 
  Share2, 
  ShieldCheck, 
  CheckCircle2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  ArrowRight, 
  Lock 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products, formatPrice } from '../data/products';
import ProductSection from '../components/ProductSection';

export default function Cart() {
  const { 
    cart, 
    savedForLater, 
    updateQuantity, 
    removeFromCart, 
    saveForLater, 
    moveToCart, 
    removeFromSaved, 
    toggleGift,
    clearCart,
    cartCount 
  } = useCart();
  const navigate = useNavigate();

  // Map cart items to full product data
  const populatedCart = cart.map(item => {
    const product = products.find(p => p.id === item.id) || {
      id: item.id,
      name: "Product Not Found",
      price: 0,
      image: "https://via.placeholder.com/150",
      brand: "Brand",
      availability: "In stock"
    };
    return {
      ...item,
      product
    };
  });

  // Map saved for later items
  const populatedSaved = savedForLater.map(item => {
    const product = products.find(p => p.id === item.id) || {
      id: item.id,
      name: "Saved Product",
      price: 0,
      image: "https://via.placeholder.com/150",
      brand: "Brand"
    };
    return {
      ...item,
      product
    };
  });

  // Calculate Subtotal
  const subtotal = populatedCart.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity);
  }, 0);

  // Recommendations
  const recommended = products.slice(0, 6);

  return (
    <div className="w-full bg-[#EAEDED] min-h-screen py-6">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6">

        {populatedCart.length === 0 ? (
          /* Empty Cart State */
          <div className="space-y-6">
            <div className="bg-white rounded-md border border-gray-200 p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-xs">
              <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#fe9800]">
                <ShoppingCart className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your ShopSphere Cart is empty
              </h2>
              <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
                Explore today's best deals, popular electronics, fashion collections, and discover millions of products.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/products?deal=true"
                  className="px-6 py-2.5 bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-semibold text-xs rounded-md shadow-xs transition-colors"
                >
                  Shop Today's Deals
                </Link>
                <Link
                  to="/products"
                  className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs rounded-md transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* If there are items saved for later, display them here! */}
            {populatedSaved.length > 0 && (
              <div className="bg-white rounded-md border border-gray-200 p-6 shadow-xs max-w-5xl mx-auto">
                <h3 className="font-bold text-lg text-gray-900 mb-4">
                  Saved for later ({populatedSaved.length} items)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {populatedSaved.map(item => (
                    <div key={item.id} className="p-3 border border-gray-200 rounded flex flex-col justify-between">
                      <div className="flex gap-3 mb-3">
                        <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-contain shrink-0" />
                        <div>
                          <Link to={`/product/${item.product.id}`} className="text-xs font-semibold text-gray-900 hover:underline line-clamp-2">
                            {item.product.name}
                          </Link>
                          <div className="font-bold text-sm text-gray-900 mt-1">
                            {formatPrice(item.product.price)}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => moveToCart(item.id)}
                          className="flex-1 py-1.5 bg-[#FFD814] hover:bg-[#F7CA00] text-xs font-semibold rounded"
                        >
                          Move to Cart
                        </button>
                        <button
                          onClick={() => removeFromSaved(item.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Active Cart Layout: Left Cart Table | Right Sticky Checkout Box */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            {/* LEFT: Cart Table & Items List (8 cols on lg) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white rounded-md border border-gray-200 p-4 sm:p-6 shadow-xs">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
                    <button
                      onClick={clearCart}
                      className="text-xs text-[#007185] hover:underline hover:text-[#C7511F] mt-0.5"
                    >
                      Deselect all items
                    </button>
                  </div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:block">
                    Price
                  </span>
                </div>

                {/* Items List */}
                <div className="divide-y divide-gray-200">
                  {populatedCart.map((item) => (
                    <div key={item.id} className="py-5 flex flex-col sm:flex-row gap-4 items-start">
                      
                      {/* Thumbnail */}
                      <Link
                        to={`/product/${item.product.id}`}
                        className="w-28 h-28 sm:w-36 sm:h-36 bg-[#F7FAFA] rounded p-2 flex items-center justify-center shrink-0 border border-gray-100"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </Link>

                      {/* Details & Controls */}
                      <div className="flex-1 flex flex-col justify-between h-full w-full">
                        <div>
                          <div className="flex justify-between items-start gap-4">
                            <Link
                              to={`/product/${item.product.id}`}
                              className="text-sm sm:text-base font-semibold text-gray-900 hover:text-[#C7511F] hover:underline line-clamp-2"
                            >
                              {item.product.name}
                            </Link>
                            <span className="text-base sm:text-lg font-bold text-gray-900 tabular-nums shrink-0">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                          </div>

                          <div className="text-xs font-semibold text-[#067D62] mt-1">
                            In stock
                          </div>
                          <div className="text-xs text-gray-500">
                            Eligible for FREE Shipping
                          </div>

                          {/* Gift Checkbox */}
                          <label className="flex items-center gap-1.5 text-xs text-gray-700 mt-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={item.isGift || false}
                              onChange={() => toggleGift(item.id)}
                              className="rounded text-amber-500"
                            />
                            <span>This order contains a gift</span>
                          </label>
                        </div>

                        {/* Quantity Controls & Action Triggers */}
                        <div className="flex flex-wrap items-center gap-3 pt-3 mt-2 text-xs text-[#007185]">
                          {/* Stepper Quantity control */}
                          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-gray-50">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="p-1.5 hover:bg-gray-200 disabled:opacity-40 disabled:hover:bg-transparent text-gray-700 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 py-1 font-semibold text-gray-900 bg-white text-xs tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 hover:bg-gray-200 text-gray-700 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <span className="text-gray-300">|</span>

                          {/* Delete */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="hover:underline hover:text-[#C7511F] flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-gray-400" />
                            <span>Delete</span>
                          </button>

                          <span className="text-gray-300">|</span>

                          {/* Save for later */}
                          <button
                            onClick={() => saveForLater(item.id)}
                            className="hover:underline hover:text-[#C7511F] flex items-center gap-1"
                          >
                            <Bookmark className="w-3.5 h-3.5 text-gray-400" />
                            <span>Save for later</span>
                          </button>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotal Bottom Bar */}
                <div className="pt-4 border-t border-gray-200 text-right">
                  <span className="text-sm sm:text-base text-gray-700">
                    Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'}):{' '}
                    <span className="font-bold text-gray-900 text-base sm:text-lg tabular-nums">
                      {formatPrice(subtotal)}
                    </span>
                  </span>
                </div>

              </div>

              {/* Saved for Later Section */}
              {populatedSaved.length > 0 && (
                <div className="bg-white rounded-md border border-gray-200 p-4 sm:p-6 shadow-xs">
                  <h2 className="font-bold text-lg text-gray-900 mb-4">
                    Saved for later <span className="text-gray-500 text-sm font-normal">({populatedSaved.length} items)</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {populatedSaved.map(item => (
                      <div key={item.id} className="p-3 border border-gray-200 rounded flex gap-3 items-center justify-between">
                        <div className="flex gap-3 items-center">
                          <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-contain shrink-0" />
                          <div>
                            <Link to={`/product/${item.product.id}`} className="text-xs font-semibold text-gray-900 hover:underline line-clamp-1">
                              {item.product.name}
                            </Link>
                            <div className="font-bold text-xs text-gray-900 mt-0.5">
                              {formatPrice(item.product.price)}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 shrink-0">
                          <button
                            onClick={() => moveToCart(item.id)}
                            className="px-3 py-1 bg-[#FFD814] hover:bg-[#F7CA00] text-xs font-semibold rounded shadow-xs"
                          >
                            Move to cart
                          </button>
                          <button
                            onClick={() => removeFromSaved(item.id)}
                            className="text-[11px] text-[#007185] hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: Sticky Checkout Box (4 cols on lg) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-md border border-gray-200 p-5 shadow-xs sticky top-28 space-y-4 text-xs">
                
                {/* Free Delivery Qualified indicator */}
                <div className="flex items-start gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="leading-tight">
                    <span className="font-bold block text-emerald-900">Your order qualifies for FREE Delivery.</span>
                    <span className="text-[11px] text-emerald-700">Select this option at checkout.</span>
                  </div>
                </div>

                {/* Subtotal */}
                <div>
                  <div className="text-base sm:text-lg text-gray-900">
                    Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'}):{' '}
                    <span className="font-bold tabular-nums text-xl">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                </div>

                {/* Gift Option */}
                <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
                  <input type="checkbox" className="rounded text-amber-500" />
                  <span>This order contains a gift</span>
                </label>

                {/* Proceed to Buy CTA */}
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full py-3 px-4 bg-[#FFD814] hover:bg-[#F7CA00] active:bg-amber-400 text-gray-950 font-bold text-sm rounded shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4 text-gray-900" />
                  <span>Proceed to Buy ({cartCount} items)</span>
                </button>

                {/* Trust guarantee */}
                <div className="pt-3 border-t border-gray-200 space-y-2 text-[11px] text-gray-500">
                  <div className="flex items-center gap-1.5 text-gray-700">
                    <ShieldCheck className="w-4 h-4 text-[#067D62]" />
                    <span className="font-semibold">ShopSphere 100% Purchase Protection</span>
                  </div>
                  <p>Guaranteed genuine products, safe payments, and hassle-free returns.</p>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* Recommended Products Shelf */}
        <div className="mt-12">
          <ProductSection
            title="Customers Who Bought Items in Your Cart Also Bought"
            products={recommended}
            viewAllLink="/products"
          />
        </div>

      </div>
    </div>
  );
}
