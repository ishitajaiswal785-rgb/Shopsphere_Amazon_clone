import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Enter your email or mobile phone number');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    login(email, password);
    navigate(from, { replace: true });
  };

  const handleDemoLogin = () => {
    login('rahul.sharma@example.com', 'password123');
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-8 sm:pt-12 pb-16 px-4">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 mb-6">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#fe9800] to-[#ffd814] flex items-center justify-center shadow-md">
          <Lock className="w-5 h-5 text-[#131921]" />
        </div>
        <span className="font-extrabold text-gray-900 text-2xl tracking-tight">ShopSphere<span className="text-[#fe9800] text-sm font-bold">.in</span></span>
      </Link>

      {/* Login Card */}
      <div className="w-full max-w-sm border border-gray-300 rounded-lg p-6 sm:p-7 shadow-xs">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Sign in</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-gray-800 block mb-1">
              Email or mobile phone number
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="e.g. rahul@example.com"
              className="w-full px-3 py-2 border border-gray-400 rounded focus:border-[#FE9800] focus:ring-1 focus:ring-[#FE9800] outline-none text-sm"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-bold text-gray-800">Password</label>
              <a href="#" className="text-[#007185] hover:underline text-[11px]">Forgot Password</a>
            </div>
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

          <button
            type="submit"
            className="w-full py-2.5 bg-[#FFD814] hover:bg-[#F7CA00] active:bg-amber-400 text-gray-950 font-semibold text-xs rounded shadow-xs transition-colors cursor-pointer"
          >
            Sign in
          </button>
        </form>

        {/* Demo Fast Login */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-semibold text-xs rounded transition-colors flex items-center justify-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>One-Click Demo Sign In (Rahul Sharma)</span>
          </button>
        </div>

        <p className="text-[11px] text-gray-600 mt-4 leading-relaxed">
          By continuing, you agree to ShopSphere's{' '}
          <a href="#" className="text-[#007185] hover:underline">Conditions of Use</a> and{' '}
          <a href="#" className="text-[#007185] hover:underline">Privacy Notice</a>.
        </p>
      </div>

      {/* New to ShopSphere Divider */}
      <div className="w-full max-w-sm mt-6 text-center">
        <div className="relative flex py-1 items-center mb-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-3 text-xs text-gray-500">New to ShopSphere?</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <Link
          to="/signup"
          className="block w-full py-2 border border-gray-300 rounded shadow-xs text-xs font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
        >
          Create your ShopSphere account
        </Link>
      </div>
    </div>
  );
}
