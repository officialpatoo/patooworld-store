
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { ICONS } from '../constants';
import VisualSearchModal from './VisualSearchModal';

const Header: React.FC = () => {
  const { cartCount } = useCart();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showVisualSearch, setShowVisualSearch] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleVisualSearchResult = (query: string) => {
    setSearchQuery(query);
    navigate(`/products?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
              <div className="w-4 h-4 bg-white rounded-full opacity-90"></div>
            </div>
            <span className="text-xl font-bold tracking-tight">Patooworld Store</span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search premium tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 border-none rounded-full py-2 pl-10 pr-12 focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <ICONS.Search />
              </div>
              <button 
                type="button"
                onClick={() => setShowVisualSearch(true)}
                className="absolute right-3 top-2 text-indigo-500 hover:text-indigo-700 transition-colors p-0.5 rounded-full hover:bg-gray-200"
                title="Visual Search"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </button>
            </form>
          </div>

          <nav className="flex items-center space-x-6">
            <Link to="/products" className="text-sm font-medium hover:text-black transition-colors">Shop</Link>
            <Link to={user ? "/account" : "/auth"} className="p-2 text-gray-600 hover:text-black transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </Link>
            <Link to="/cart" className="relative group">
              <ICONS.Cart />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white group-hover:scale-110 transition-transform">{cartCount}</span>
              )}
            </Link>
          </nav>
        </div>
      </div>
      {showVisualSearch && <VisualSearchModal onClose={() => setShowVisualSearch(false)} onSearch={handleVisualSearchResult} />}
    </header>
  );
};

export default Header;
