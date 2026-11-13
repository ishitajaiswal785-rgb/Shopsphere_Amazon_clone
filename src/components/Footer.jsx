import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="w-full bg-[#232F3E] text-gray-300 mt-12 border-t border-gray-200">
      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className="w-full py-3.5 bg-[#37475A] hover:bg-[#485769] text-xs text-white font-medium text-center transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <span>Back to top</span>
        <ArrowUp className="w-3.5 h-3.5" />
      </button>

      {/* Directory Links (4 Columns) */}
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
        <div>
          <h4 className="text-white font-bold text-sm mb-3">Get to Know Us</h4>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="/about" className="hover:underline">About ShopSphere</Link></li>
            <li><Link to="/careers" className="hover:underline">Careers</Link></li>
            <li><Link to="/press" className="hover:underline">Press Releases</Link></li>
            <li><Link to="/science" className="hover:underline">ShopSphere Science</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm mb-3">Connect with Us</h4>
          <ul className="space-y-2 text-gray-300">
            <li><a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:underline">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:underline">Twitter</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:underline">Instagram</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm mb-3">Make Money with Us</h4>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="/sell" className="hover:underline">Sell on ShopSphere</Link></li>
            <li><Link to="/accelerator" className="hover:underline">ShopSphere Accelerator</Link></li>
            <li><Link to="/affiliate" className="hover:underline">Become an Affiliate</Link></li>
            <li><Link to="/fulfilment" className="hover:underline">Fulfilment by ShopSphere</Link></li>
            <li><Link to="/advertise" className="hover:underline">Advertise Your Products</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm mb-3">Let Us Help You</h4>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="/orders" className="hover:underline">Your Account</Link></li>
            <li><Link to="/orders" className="hover:underline">Returns Centre</Link></li>
            <li><Link to="/help" className="hover:underline">Recalls & Product Safety</Link></li>
            <li><Link to="/help" className="hover:underline">100% Purchase Protection</Link></li>
            <li><Link to="/help" className="hover:underline">Help & Customer Service</Link></li>
          </ul>
        </div>
      </div>

      {/* Middle Brand and Region Strip */}
      <div className="border-t border-[#37475A] py-6 bg-[#232F3E]">
        <div className="max-w-[1500px] mx-auto px-6 flex flex-wrap items-center justify-center gap-6 text-xs">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-gradient-to-tr from-[#fe9800] to-[#ffd814] flex items-center justify-center shadow-xs">
              <Globe className="w-4 h-4 text-[#131921]" />
            </div>
            <span className="font-bold text-white text-base">ShopSphere<span className="text-[#fe9800]">.in</span></span>
          </Link>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-gray-600 hover:border-gray-400 text-white text-xs">
              <Globe className="w-3.5 h-3.5" />
              <span>English</span>
            </button>
            <div className="px-3 py-1.5 rounded border border-gray-600 text-white text-xs font-mono">
              ₹ INR - Indian Rupee
            </div>
            <div className="px-3 py-1.5 rounded border border-gray-600 text-white text-xs flex items-center gap-1.5">
              <span>🇮🇳 India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Band */}
      <div className="bg-[#131921] py-8 text-gray-400 text-[11px] border-t border-black/40">
        <div className="max-w-[1500px] mx-auto px-6 text-center space-y-2">
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/conditions" className="hover:underline">Conditions of Use & Sale</Link>
            <Link to="/privacy" className="hover:underline">Privacy Notice</Link>
            <Link to="/interest-ads" className="hover:underline">Interest-Based Ads</Link>
          </div>
          <p>© 2026 ShopSphere.in, Inc. or its affiliates. Built inspired by Amazon India & Google Stitch UI.</p>
        </div>
      </div>
    </footer>
  );
}
