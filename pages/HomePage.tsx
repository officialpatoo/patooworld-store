
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedProducts } from '../services/productService';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { ICONS } from '../constants';

const HomePage: React.FC = () => {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedProducts().then(data => {
      setFeatured(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden bg-black text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-60 scale-105 animate-pulse" 
            alt="Hero Background"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-none">
              PURE <br /> FIDELITY.
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 font-light max-w-lg">
              Experience unparalleled audio and precision computing from the world's leading brands. Curated for the perfectionist.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/products" 
                className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors inline-flex items-center justify-center"
              >
                Shop Now
              </Link>
              <Link 
                to="/products?category=Audio" 
                className="border border-white/30 backdrop-blur-md text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center"
              >
                Explore Audio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-2">Collections</h2>
            <h3 className="text-4xl font-bold">Curated for lifestyle.</h3>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link to="/products?category=Mobile" className="group relative h-96 rounded-3xl overflow-hidden bg-gray-100 shadow-xl">
            <img src="https://images.unsplash.com/photo-1556656793-062ff9878258?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Mobile" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8">
              <h4 className="text-white text-2xl font-bold mb-2">Mobile</h4>
              <span className="text-white/80 text-sm flex items-center group-hover:translate-x-2 transition-transform font-medium">
                Explore <ICONS.ChevronRight />
              </span>
            </div>
          </Link>
          <div className="grid grid-rows-2 gap-8">
            <Link to="/products?category=Wearables" className="group relative rounded-3xl overflow-hidden bg-gray-100 shadow-lg">
              <img src="https://images.unsplash.com/photo-1508685096489-7aac29145fe0?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Wearables" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <h4 className="text-white text-xl font-bold">Wearables</h4>
              </div>
            </Link>
            <Link to="/products?category=Computing" className="group relative rounded-3xl overflow-hidden bg-gray-100 shadow-lg">
              <img src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Computing" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <h4 className="text-white text-xl font-bold">Computing</h4>
              </div>
            </Link>
          </div>
          <Link to="/products?category=Audio" className="group relative h-96 rounded-3xl overflow-hidden bg-gray-100 shadow-xl">
            <img src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Audio" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8">
              <h4 className="text-white text-2xl font-bold mb-2">Audio</h4>
              <span className="text-white/80 text-sm flex items-center group-hover:translate-x-2 transition-transform font-medium">
                Explore <ICONS.ChevronRight />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-2">Bestsellers</h2>
            <h3 className="text-4xl font-bold">Most Loved Pieces</h3>
          </div>
          
          {loading ? (
             <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featured.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* AI Assistant Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-indigo-600 rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="relative z-10 max-w-xl text-center md:text-left mb-8 md:mb-0">
            <div className="inline-flex items-center space-x-2 bg-indigo-500 rounded-full px-4 py-1 text-sm font-bold mb-6">
              <ICONS.AiSparkles />
              <span>POWERED BY GEMINI AI</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Need help choosing the right tech?</h3>
            <p className="text-indigo-100 text-lg mb-8">Our AI Concierge is trained to find the perfect gadgets for your specific lifestyle and workflow across all major brands.</p>
            <Link to="/products" className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold hover:bg-indigo-50 transition-colors inline-block">
              Try AI Search
            </Link>
          </div>
          <div className="relative z-10">
             <div className="w-72 h-72 bg-indigo-400/30 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-48 h-48 bg-indigo-300/40 rounded-full flex items-center justify-center">
                   <div className="w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center">
                      <ICONS.AiSparkles />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
