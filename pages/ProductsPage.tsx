
import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { getProducts } from '../services/productService';
import { getShoppingAdvice } from '../services/geminiService';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { CATEGORIES, ICONS } from '../constants';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';

  useEffect(() => {
    getProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  // Handle AI Advice
  useEffect(() => {
    if (query && products.length > 0) {
      setAiLoading(true);
      getShoppingAdvice(query, products).then(advice => {
        setAiAdvice(advice);
        setAiLoading(false);
      });
    } else {
      setAiAdvice(null);
    }
  }, [query, products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase()) || 
                           p.description.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [products, selectedCategory, query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">
          {query ? `Search results for "${query}"` : 'Browse Collections'}
        </h1>
        <p className="text-gray-500">Premium tech designed to elevate your everyday experience.</p>
      </div>

      {/* AI Advice Section */}
      {aiAdvice && (
        <div className="mb-12 bg-indigo-50 border border-indigo-100 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex items-start space-x-4 relative z-10">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <ICONS.AiSparkles />
            </div>
            <div>
              <h3 className="text-indigo-900 font-bold mb-1">AI Concierge Advice</h3>
              <p className="text-indigo-800 leading-relaxed italic">{aiAdvice}</p>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200/20 rounded-full -mr-16 -mt-16"></div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-4 scrollbar-hide">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === cat 
              ? 'bg-black text-white shadow-lg' 
              : 'bg-white border border-gray-200 hover:border-black text-gray-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
            <ICONS.Search />
          </div>
          <h3 className="text-xl font-bold mb-2">No products found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your filters or search terms.</p>
          <button 
            onClick={() => { setSelectedCategory('All'); window.history.pushState({}, '', '/#/products'); }}
            className="text-indigo-600 font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
