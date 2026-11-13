import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Lock, 
  MapPin, 
  CreditCard, 
  CheckCircle2, 
  Truck, 
  Sparkles, 
  ArrowRight, 
  ShoppingBag,
  Building,
  Smartphone,
  Check
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { products, formatPrice } from '../data/products';

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { user, addOrder } = useAuth();
  const navigate = useNavigate();

  // Populate cart items
  const populatedCart = cart.map(item => {
    const p = products.find(prod => prod.id === item.id) || {
      name: "ShopSphere Item",
      price: 999,
      image: "https://via.placeholder.com/150"
    };
    return { ...item, product: p };
  });

  const subtotal = populatedCart.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity);
  }, 0);

  const deliveryFee = 0; // FREE Delivery
  const totalAmount = subtotal + deliveryFee;

  // Checkout Form State
  const [address, setAddress] = useState({
    fullName: user?.fullName || 'Rahul Sharma',
    phone: user?.phone || '9876543210',
    addressLine: user?.addressLine || 'Flat 402, Prestige Tower, Indiranagar 100ft Road',
    city: user?.city || 'Bengaluru',
    state: user?.state || 'Karnataka',
    pincode: user?.pincode || '560001'
  });

  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi', 'card', 'cod', 'netbanking'
  const [upiId, setUpiId] = useState('rahul@okaxis');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('•••');
  
  // Validation errors
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  const validateForm = () => {
    const errs = {};
    if (!address.fullName.trim()) errs.fullName = 'Full name is required';
    if (!/^\d{10}$/.test(address.phone.replace(/\D/g, ''))) errs.phone = 'Valid 10-digit mobile number is required';
    if (!address.addressLine.trim()) errs.addressLine = 'Street address is required';
    if (!address.city.trim()) errs.city = 'City is required';
    if (!address.state.trim()) errs.state = 'State is required';
    if (!/^\d{6}$/.test(address.pincode.replace(/\D/g, ''))) errs.pincode = 'Valid 6-digit Indian PIN code is required';
    
    if (paymentMethod === 'upi' && !upiId.includes('@')) {
      errs.upi = 'Please enter a valid UPI ID (e.g. name@bank)';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedOrderId = `SS-IND-${Math.floor(10000000 + Math.random() * 90000000)}`;
      const newOrder = {
        orderId: generatedOrderId,
        orderDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        deliveryDate: "Tomorrow by 2 PM",
        total: totalAmount,
        status: "Confirmed",
        address: address,
        paymentMethod: paymentMethod.toUpperCase(),
        items: populatedCart.map(c => ({
          id: c.product.id,
          name: c.product.name,
          quantity: c.quantity,
          price: c.product.price,
          image: c.product.image
        }))
      };

      addOrder(newOrder);
      clearCart();
      setIsSubmitting(false);
      setOrderConfirmed(newOrder);
      window.scrollTo(0, 0);
    }, 1200);
  };

  // Order Confirmed Success Screen
  if (orderConfirmed) {
    return (
      <div className="w-full bg-[#f7fafa] min-h-screen py-10 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl border border-gray-200 p-8 sm:p-10 shadow-lg text-center space-y-6">
          
          <div className="w-20 h-20 bg-emerald-100 text-[#067D62] rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-[#067D62] tracking-wider uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Order Placed Successfully
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Thank You, {address.fullName.split(' ')[0]}!
            </h1>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Your order has been confirmed and is being prepared for express delivery.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 text-left space-y-3 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-gray-500">Order ID:</span>
              <span className="font-mono font-bold text-gray-900 text-sm">{orderConfirmed.orderId}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-gray-500">Estimated Delivery:</span>
              <span className="font-bold text-[#067D62]">{orderConfirmed.deliveryDate}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-gray-500">Total Amount:</span>
              <span className="font-bold text-gray-900 text-sm tabular-nums">{formatPrice(orderConfirmed.total)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Delivering to:</span>
              <span className="font-medium text-gray-800 text-right">
                {address.addressLine}, {address.city} - {address.pincode}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              to="/orders"
              className="px-6 py-3 bg-[#FFD814] hover:bg-[#F7CA00] text-gray-950 font-bold text-xs rounded-md shadow transition-colors flex items-center justify-center gap-2"
            >
              <span>View Your Orders</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/"
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs rounded-md transition-colors"
            >
              Continue Shopping
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // If cart is empty and user arrives at checkout directly
  if (populatedCart.length === 0) {
    return (
      <div className="w-full bg-[#f7fafa] min-h-screen py-16 px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg border border-gray-200 shadow-sm space-y-4">
          <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto" />
          <h2 className="text-xl font-bold text-gray-900">Your Cart is Empty</h2>
          <p className="text-xs text-gray-500">Add items to your cart before proceeding to checkout.</p>
          <Link
            to="/products"
            className="inline-block px-6 py-2.5 bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-semibold text-xs rounded shadow-xs"
          >
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#f7fafa] min-h-screen pb-16">
      
      {/* Checkout Header */}
      <header className="bg-[#131921] py-3.5 px-4 sm:px-8 border-b border-gray-800">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#fe9800] to-[#ffd814] flex items-center justify-center shadow-md">
              <Lock className="w-4 h-4 text-[#131921]" />
            </div>
            <span className="font-extrabold text-white text-xl tracking-tight">ShopSphere<span className="text-[#fe9800] text-xs font-bold ml-0.5">.in</span></span>
          </Link>

          <div className="flex items-center gap-1.5 text-xs text-gray-300">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-white">256-Bit SSL Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* Main Checkout Accordion Layout */}
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT: Accordion Steps (8 cols) */}
          <div className="lg:col-span-8 space-y-6">

            {/* STEP 1: Delivery Address */}
            <div className="bg-white rounded-md border border-gray-200 p-5 shadow-xs">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-200 mb-4">
                <span className="w-6 h-6 rounded-full bg-[#131921] text-white flex items-center justify-center font-bold text-xs">
                  1
                </span>
                <h2 className="text-base font-bold text-gray-900">
                  Select Delivery Address
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Full Name */}
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full px-3 py-2 border rounded focus:border-amber-500 focus:outline-none"
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <p className="text-red-600 text-[11px] mt-0.5">{errors.fullName}</p>}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Mobile Number (10 Digits)</label>
                  <input
                    type="text"
                    maxLength="10"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value.replace(/\D/g, '') })}
                    className="w-full px-3 py-2 border rounded focus:border-amber-500 focus:outline-none font-mono"
                    placeholder="10-digit mobile number"
                  />
                  {errors.phone && <p className="text-red-600 text-[11px] mt-0.5">{errors.phone}</p>}
                </div>

                {/* Address Line */}
                <div className="sm:col-span-2">
                  <label className="font-semibold text-gray-700 block mb-1">Flat, House no., Building, Street</label>
                  <input
                    type="text"
                    value={address.addressLine}
                    onChange={(e) => setAddress({ ...address, addressLine: e.target.value })}
                    className="w-full px-3 py-2 border rounded focus:border-amber-500 focus:outline-none"
                    placeholder="Area, Street, Sector, Village"
                  />
                  {errors.addressLine && <p className="text-red-600 text-[11px] mt-0.5">{errors.addressLine}</p>}
                </div>

                {/* City */}
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Town/City</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full px-3 py-2 border rounded focus:border-amber-500 focus:outline-none"
                  />
                  {errors.city && <p className="text-red-600 text-[11px] mt-0.5">{errors.city}</p>}
                </div>

                {/* PIN Code */}
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">PIN Code (6 digits)</label>
                  <input
                    type="text"
                    maxLength="6"
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value.replace(/\D/g, '') })}
                    className="w-full px-3 py-2 border rounded focus:border-amber-500 focus:outline-none font-mono"
                  />
                  {errors.pincode && <p className="text-red-600 text-[11px] mt-0.5">{errors.pincode}</p>}
                </div>

                {/* State */}
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">State</label>
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full px-3 py-2 border rounded focus:border-amber-500 focus:outline-none"
                  />
                  {errors.state && <p className="text-red-600 text-[11px] mt-0.5">{errors.state}</p>}
                </div>
              </div>
            </div>

            {/* STEP 2: Payment Method */}
            <div className="bg-white rounded-md border border-gray-200 p-5 shadow-xs">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-200 mb-4">
                <span className="w-6 h-6 rounded-full bg-[#131921] text-white flex items-center justify-center font-bold text-xs">
                  2
                </span>
                <h2 className="text-base font-bold text-gray-900">
                  Select a Payment Method
                </h2>
              </div>

              <div className="space-y-3 text-xs">
                {/* UPI Option */}
                <div className={`p-3.5 rounded border transition-all ${paymentMethod === 'upi' ? 'border-[#FE9800] bg-amber-50/40' : 'border-gray-200'}`}>
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="mt-0.5 text-amber-500 focus:ring-amber-400"
                    />
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-emerald-600" />
                        <span>UPI (Google Pay, PhonePe, Paytm, BHIM)</span>
                      </div>
                      <p className="text-gray-500 mt-0.5">Pay instantly from your bank account with zero extra fees</p>

                      {paymentMethod === 'upi' && (
                        <div className="mt-3 pt-3 border-t border-amber-200/60 max-w-sm">
                          <label className="block text-[11px] font-semibold text-gray-700 mb-1">Enter UPI ID</label>
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs focus:border-amber-500 focus:outline-none font-mono"
                            placeholder="e.g. yourname@oksbi"
                          />
                          {errors.upi && <p className="text-red-600 text-[11px] mt-0.5">{errors.upi}</p>}
                        </div>
                      )}
                    </div>
                  </label>
                </div>

                {/* Credit / Debit Card Option */}
                <div className={`p-3.5 rounded border transition-all ${paymentMethod === 'card' ? 'border-[#FE9800] bg-amber-50/40' : 'border-gray-200'}`}>
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mt-0.5 text-amber-500 focus:ring-amber-400"
                    />
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-blue-600" />
                        <span>Credit or Debit Card (Visa, MasterCard, RuPay)</span>
                      </div>
                      <p className="text-gray-500 mt-0.5">Simulated demo card selection for portfolio preview</p>

                      {paymentMethod === 'card' && (
                        <div className="mt-3 pt-3 border-t border-amber-200/60 grid grid-cols-2 gap-3 max-w-sm">
                          <div className="col-span-2">
                            <label className="block text-[11px] font-semibold text-gray-700 mb-1">Card Number</label>
                            <input
                              type="text"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-gray-700 mb-1">Expiry Date</label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-gray-700 mb-1">CVV</label>
                            <input
                              type="password"
                              maxLength="3"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs font-mono"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </label>
                </div>

                {/* Cash on Delivery */}
                <div className={`p-3.5 rounded border transition-all ${paymentMethod === 'cod' ? 'border-[#FE9800] bg-amber-50/40' : 'border-gray-200'}`}>
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-0.5 text-amber-500 focus:ring-amber-400"
                    />
                    <div>
                      <div className="font-bold text-gray-900 flex items-center gap-2">
                        <Truck className="w-4 h-4 text-amber-600" />
                        <span>Cash on Delivery / Pay on Delivery</span>
                      </div>
                      <p className="text-gray-500 mt-0.5">Pay cash or scan QR at your doorstep upon delivery</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* STEP 3: Items and Delivery Review */}
            <div className="bg-white rounded-md border border-gray-200 p-5 shadow-xs">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-200 mb-4">
                <span className="w-6 h-6 rounded-full bg-[#131921] text-white flex items-center justify-center font-bold text-xs">
                  3
                </span>
                <h2 className="text-base font-bold text-gray-900">
                  Review Items & Guaranteed Delivery
                </h2>
              </div>

              <div className="space-y-3 divide-y divide-gray-100">
                {populatedCart.map(item => (
                  <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <img src={item.product.image} alt={item.product.name} className="w-14 h-14 object-contain rounded p-1 bg-gray-50 border border-gray-100" />
                      <div>
                        <div className="font-semibold text-gray-900 line-clamp-1">{item.product.name}</div>
                        <div className="text-gray-500 text-[11px]">Qty: {item.quantity} × {formatPrice(item.product.price)}</div>
                        <div className="text-[#067D62] font-medium text-[11px]">Guaranteed Delivery: Tomorrow by 2 PM</div>
                      </div>
                    </div>
                    <div className="font-bold text-gray-900 tabular-nums">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: Order Summary Sidebar (4 cols) */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-md border border-gray-300 p-5 shadow-sm sticky top-6 space-y-4 text-xs">
              
              <button
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className="w-full py-3 bg-[#FFD814] hover:bg-[#F7CA00] active:bg-amber-400 text-gray-950 font-bold text-sm rounded shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Processing Order...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-gray-900" />
                    <span>Place Your Order and Pay</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-gray-500 text-center">
                By placing your order, you agree to ShopSphere's Conditions of Use & Sale.
              </p>

              <div className="pt-3 border-t border-gray-200 space-y-2">
                <h3 className="font-bold text-sm text-gray-900">Order Summary</h3>
                <div className="flex justify-between text-gray-600">
                  <span>Items ({cart.reduce((a, b) => a + b.quantity, 0)}):</span>
                  <span className="tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery:</span>
                  <span className="text-[#067D62] font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Order Total:</span>
                  <span className="tabular-nums text-lg text-red-700">{formatPrice(totalAmount)}</span>
                </div>
              </div>

              {/* Security badges */}
              <div className="pt-3 border-t border-gray-200 text-[11px] text-gray-500 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#067D62] shrink-0" />
                <span>100% Purchase Protection guaranteed on your order</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
