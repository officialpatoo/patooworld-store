
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-gray-900">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-gray-500 hover:text-black transition-colors">All Products</Link></li>
              <li><Link to="/products?category=Audio" className="text-gray-500 hover:text-black transition-colors">Audio</Link></li>
              <li><Link to="/products?category=Wearables" className="text-gray-500 hover:text-black transition-colors">Wearables</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-gray-900">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-500 hover:text-black transition-colors">Help Center</Link></li>
              <li><Link to="/track" className="text-gray-500 hover:text-black transition-colors">Order Tracking</Link></li>
              <li><Link to="/returns" className="text-gray-500 hover:text-black transition-colors">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-gray-900">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-500 hover:text-black transition-colors">About Us</Link></li>
              <li><Link to="/sustainability" className="text-gray-500 hover:text-black transition-colors">Sustainability</Link></li>
              <li><Link to="/careers" className="text-gray-500 hover:text-black transition-colors">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-gray-900">Newsletter</h3>
            <p className="text-sm text-gray-500 mb-4">Join our community for exclusive early access to drops.</p>
            <form className="flex gap-2">
              <input type="email" placeholder="Email address" className="bg-gray-100 rounded-lg px-4 py-2 text-sm w-full outline-none focus:ring-2 focus:ring-black" />
              <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">Join</button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <p>© 2024 Patooworld Store. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/help" className="hover:text-black">Privacy Policy</Link>
            <Link to="/help" className="hover:text-black">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
