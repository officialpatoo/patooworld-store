
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { ICONS } from '../constants';

interface ProductCardProps {
  product?: Product;
  loading?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, loading }) => {
  const { addToCart } = useCart();
  const { isInWishlist, updateWishlist, user } = useAuth();
  const [imgLoaded, setImgLoaded] = useState(false);

  if (loading || !product) {
    return (
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
        <div className="aspect-square bg-gray-100"></div>
        <div className="p-5 space-y-3">
          <div className="h-4 bg-gray-100 rounded w-3/4"></div>
          <div className="h-4 bg-gray-100 rounded w-1/4"></div>
          <div className="h-10 bg-gray-50 rounded-xl w-full mt-4"></div>
        </div>
      </div>
    );
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in to manage your wishlist.");
      return;
    }
    updateWishlist(product.id);
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-black transition-all duration-300">
      <Link to={`/products/${product.id}`} className="block">
        <div className="aspect-square bg-gray-50 relative overflow-hidden">
          {!imgLoaded && <div className="absolute inset-0 bg-gray-100 animate-pulse"></div>}
          <img 
            src={product.image} 
            alt={product.name} 
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
          <div className="absolute top-4 left-4 flex gap-2">
            {product.featured && (
              <span className="bg-black text-white text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full">
                Featured
              </span>
            )}
          </div>
          <button 
            onClick={handleWishlist}
            className={`absolute top-4 right-4 p-2 rounded-full transition-all bg-white/80 backdrop-blur-sm border border-gray-100 ${
              isInWishlist(product.id) ? 'text-red-500 scale-110' : 'text-gray-400 hover:text-black'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={isInWishlist(product.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        <div className="p-5">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-base font-semibold group-hover:text-indigo-600 transition-colors">
              {product.name}
            </h3>
            <span className="text-base font-bold">${product.price.toFixed(2)}</span>
          </div>
          <p className="text-sm text-gray-500 mb-4 line-clamp-1">{product.category}</p>
          
          <div className="flex items-center space-x-1 mb-4">
            <ICONS.Star />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.reviews})</span>
          </div>
        </div>
      </Link>
      
      <div className="px-5 pb-5">
        <button 
          onClick={() => addToCart(product)}
          className="w-full bg-gray-50 text-black py-3 rounded-xl font-medium text-sm flex items-center justify-center space-x-2 hover:bg-black hover:text-white transition-all transform active:scale-95"
        >
          <ICONS.Cart />
          <span>Add to Bag</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
