import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, CheckCircle2, ChevronRight, ShoppingBag, RotateCcw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

export default function Orders() {
  const { user, orders } = useAuth();
  const { addToCart } = useCart();

  return (
    <div className="w-full bg-[#f7fafa] min-h-screen py-8">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 mb-4 flex items-center gap-1.5">
          <Link to="/" className="hover:underline">Your Account</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-gray-900">Your Orders</span>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Your Orders</h1>
          <span className="text-xs text-gray-500">{orders.length} orders placed</span>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center shadow-xs">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-3" />
            <h2 className="text-lg font-bold text-gray-900 mb-1">No Orders Yet</h2>
            <p className="text-xs text-gray-500 mb-4">You have not placed any orders yet on ShopSphere.</p>
            <Link
              to="/products"
              className="inline-block px-5 py-2 bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-semibold text-xs rounded shadow-xs"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.orderId} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs">
                
                {/* Order Top Ribbon */}
                <div className="bg-[#f1f4f4] px-5 py-3 border-b border-gray-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-gray-600">
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-gray-500 font-semibold">Order Placed</span>
                    <span className="font-medium text-gray-900">{order.orderDate}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-gray-500 font-semibold">Total</span>
                    <span className="font-bold text-gray-900 tabular-nums">{formatPrice(order.total)}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-gray-500 font-semibold">Ship To</span>
                    <span className="font-medium text-gray-900">{user?.fullName || 'Rahul Sharma'}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[11px] uppercase tracking-wider text-gray-500 font-semibold">Order #</span>
                    <span className="font-mono text-gray-900 font-semibold">{order.orderId}</span>
                  </div>
                </div>

                {/* Order Content */}
                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#067D62]">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>{order.status === 'Delivered' ? 'Delivered successfully' : `Estimated delivery: ${order.deliveryDate || 'Tomorrow'}`}</span>
                  </div>

                  <div className="space-y-4 divide-y divide-gray-100">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="pt-3 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-contain rounded p-1 bg-gray-50 border border-gray-100 shrink-0"
                          />
                          <div>
                            <Link to={`/product/${item.id}`} className="text-xs sm:text-sm font-semibold text-gray-900 hover:text-amber-800 hover:underline line-clamp-2">
                              {item.name}
                            </Link>
                            <div className="text-xs text-gray-500 mt-0.5">
                              Qty: {item.quantity} | {formatPrice(item.price)}
                            </div>
                          </div>
                        </div>

                        <div className="flex sm:flex-col gap-2 shrink-0">
                          <button
                            onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image }, 1)}
                            className="px-4 py-1.5 bg-[#FFD814] hover:bg-[#F7CA00] text-gray-950 font-semibold text-xs rounded shadow-xs transition-colors flex items-center gap-1.5"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Buy it again</span>
                          </button>
                          <Link
                            to={`/product/${item.id}`}
                            className="px-4 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs font-medium rounded text-center"
                          >
                            View your item
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
