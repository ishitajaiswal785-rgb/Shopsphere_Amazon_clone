import React, { useState } from 'react';
import { MapPin, X, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LocationModal({ isOpen, onClose }) {
  const { user, updateDeliveryAddress } = useAuth();
  const [pincode, setPincode] = useState(user?.pincode || '560001');
  const [city, setCity] = useState(user?.city || 'Bengaluru');
  const [state, setState] = useState(user?.state || 'Karnataka');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const popularCities = [
    { name: 'Bengaluru', pincode: '560001', state: 'Karnataka' },
    { name: 'Mumbai', pincode: '400001', state: 'Maharashtra' },
    { name: 'New Delhi', pincode: '110001', state: 'Delhi' },
    { name: 'Hyderabad', pincode: '500001', state: 'Telangana' },
    { name: 'Chennai', pincode: '600001', state: 'Tamil Nadu' },
    { name: 'Kolkata', pincode: '700001', state: 'West Bengal' }
  ];

  const handleApplyPincode = (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode.trim())) {
      setError('Please enter a valid 6-digit Indian PIN code');
      return;
    }
    setError('');
    updateDeliveryAddress({ pincode: pincode.trim(), city, state });
    onClose();
  };

  const handleSelectCity = (c) => {
    setPincode(c.pincode);
    setCity(c.name);
    setState(c.state);
    updateDeliveryAddress({ pincode: c.pincode, city: c.name, state: c.state });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-[#131921] px-5 py-3.5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#FE9800]" />
            <h3 className="font-semibold text-base">Choose your delivery location</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <p className="text-xs text-gray-600 leading-relaxed">
            Select a delivery location to see product availability and delivery options tailored to your area.
          </p>

          <form onSubmit={handleApplyPincode} className="space-y-2">
            <label className="text-xs font-semibold text-gray-700 block">
              Enter an Indian PIN code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                maxLength="6"
                value={pincode}
                onChange={(e) => {
                  setPincode(e.target.value.replace(/\D/g, ''));
                  setError('');
                }}
                placeholder="e.g. 560001"
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:border-[#FE9800] focus:ring-1 focus:ring-[#FE9800] outline-none font-mono"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 text-xs font-semibold rounded shadow-sm transition-colors"
              >
                Apply
              </button>
            </div>
            {error && <p className="text-xs text-red-600">{error}</p>}
          </form>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-3 text-xs text-gray-400 uppercase tracking-wider">or select popular city</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {popularCities.map((c) => {
              const isSelected = user?.city === c.name;
              return (
                <button
                  key={c.name}
                  onClick={() => handleSelectCity(c)}
                  className={`p-2.5 rounded border text-left text-xs transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-[#FE9800] bg-amber-50/60 font-semibold text-amber-900'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-[11px] text-gray-500 font-mono">{c.pincode}</div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#FE9800]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-5 py-3 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 rounded transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
