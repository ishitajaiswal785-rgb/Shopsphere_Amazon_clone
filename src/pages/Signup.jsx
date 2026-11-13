import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      setError('Please enter a valid 10-digit mobile phone number');
      return;
    }
    if (!password || password.length < 6) {
      setError('Passwords must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    signup(fullName, email, phone, password);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-8 sm:pt-12 pb-16 px-4">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 mb-6">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#fe9800] to-[#ffd814] flex items-center justify-center shadow-md">
          <span className="font-black text-[#131921] text-lg">S</span>
        </div>
        <span className="font-extrabold text-gray-900 text-2xl tracking-tight">ShopSphere<span className="text-[#fe9800] text-sm font-bold">.in</span></span>
      </Link>

      {/* Signup Card */}
      <div className="w-full max-w-sm border border-gray-300 rounded-lg p-6 sm:p-7 shadow-xs">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Create Account</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="font-bold text-gray-800 block mb-1">Your name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setError('');
              }}
              placeholder="First and last name"
              className="w-full px-3 py-2 border border-gray-400 rounded focus:border-[#FE9800] focus:ring-1 focus:ring-[#FE9800] outline-none text-sm"
            />
          </div>

          <div>
            <label className="font-bold text-gray-800 block mb-1">Mobile number</label>
            <div className="flex gap-1">
              <span className="px-2.5 py-2 bg-gray-100 border border-gray-400 rounded-l text-gray-700 font-mono text-sm">
                IN +91
              </span>
              <input
                type="text"
                maxLength="10"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/\D/g, ''));
                  setError('');
                }}
                placeholder="Mobile number"
                className="w-full px-3 py-2 border border-gray-400 rounded-r focus:border-[#FE9800] focus:ring-1 focus:ring-[#FE9800] outline-none text-sm font-mono"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-gray-800 block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="e.g. yourname@gmail.com"
              className="w-full px-3 py-2 border border-gray-400 rounded focus:border-[#FE9800] focus:ring-1 focus:ring-[#FE9800] outline-none text-sm"
            />
          </div>

          <div>
            <label className="font-bold text-gray-800 block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="At least 6 characters"
              className="w-full px-3 py-2 border border-gray-400 rounded focus:border-[#FE9800] focus:ring-1 focus:ring-[#FE9800] outline-none text-sm"
            />
          </div>

          <div>
            <label className="font-bold text-gray-800 block mb-1">Re-enter password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError('');
              }}
              className="w-full px-3 py-2 border border-gray-400 rounded focus:border-[#FE9800] focus:ring-1 focus:ring-[#FE9800] outline-none text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#FFD814] hover:bg-[#F7CA00] active:bg-amber-400 text-gray-950 font-semibold text-xs rounded shadow-xs transition-colors cursor-pointer mt-2"
          >
            Verify mobile number & Create account
          </button>
        </form>

        <p className="text-[11px] text-gray-600 mt-4 leading-relaxed border-t border-gray-200 pt-3">
          Already have an account?{' '}
          <Link to="/login" className="text-[#007185] hover:underline font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
