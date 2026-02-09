
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { generateCustomTexture } from '../services/geminiService';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { ICONS } from '../constants';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [customTexture, setCustomTexture] = useState<string | null>(null);
  
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getProductById(id).then(data => {
        if (data) {
          setProduct(data);
          setActiveImage(data.image);
        }
        setLoading(false);
      });
    }
  }, [id]);

  const handleGenerate = async () => {
    if (!customPrompt) return;
    setIsGenerating(true);
    const texture = await generateCustomTexture(customPrompt);
    if (texture) {
      setCustomTexture(texture);
      setActiveImage(texture);
    }
    setIsGenerating(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <button onClick={() => navigate('/products')} className="text-indigo-600 font-medium">Back to Shop</button>
      </div>
    );
  }

  const thumbnails = [
    product.image,
    `https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&q=80&w=400`,
    `https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400`,
    `https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=400`
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button onClick={() => navigate(-1)} className="flex items-center text-sm font-medium text-gray-500 hover:text-black mb-8 transition-colors">
        <div className="rotate-180 inline-block mr-2"><ICONS.ChevronRight /></div>
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
        <div className="space-y-4">
          <div className="aspect-square bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm relative group">
            <img src={activeImage} alt={product.name} className={`w-full h-full object-cover transition-all duration-300 ${isGenerating ? 'blur-md' : ''}`} />
            {customTexture && activeImage === customTexture && (
              <div className="absolute inset-0 pointer-events-none border-[12px] border-indigo-600/30 rounded-[2rem]"></div>
            )}
            {isGenerating && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/5 flex-col">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-xs font-bold text-indigo-900 uppercase tracking-widest">Forging Aesthetic...</p>
              </div>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
             {thumbnails.map((img, i) => (
               <div key={i} onClick={() => setActiveImage(img)} className={`aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-pointer hover:opacity-70 transition-all border-2 ${activeImage === img && !customTexture ? 'border-indigo-600' : 'border-transparent'}`}>
                  <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
               </div>
             ))}
             {customTexture && (
               <div onClick={() => setActiveImage(customTexture)} className={`aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-pointer border-2 ${activeImage === customTexture ? 'border-indigo-600' : 'border-transparent'}`}>
                 <img src={customTexture} className="w-full h-full object-cover" alt="Custom AI" />
               </div>
             )}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mb-2">
            <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">{product.category}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{product.name}</h1>
          <div className="flex items-center space-x-4 mb-8">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => <div key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}><ICONS.Star /></div>)}
            </div>
            <span className="text-sm font-medium">{product.rating} / 5.0</span>
            <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
          </div>
          <div className="text-3xl font-bold mb-8 text-gray-900">${product.price.toFixed(2)}</div>
          
          <div className="prose prose-sm text-gray-600 mb-10 max-w-none leading-relaxed">
            <p className="text-lg text-gray-500">{product.description}</p>
          </div>

          <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white mb-10">
             <div className="flex items-center space-x-2 mb-4">
                <ICONS.AiSparkles />
                <h3 className="text-sm font-bold uppercase tracking-widest">Aesthetic Design Lab</h3>
             </div>
             <p className="text-xs text-gray-400 mb-6">Prompt our AI to forge a custom aesthetic skin for your device.</p>
             <div className="flex gap-2">
                <input 
                   type="text" 
                   value={customPrompt}
                   onChange={(e) => setCustomPrompt(e.target.value)}
                   placeholder="Cyberpunk glitch, emerald fractals..." 
                   className="flex-1 bg-gray-800 border-none rounded-xl py-3 px-4 text-sm outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !customPrompt}
                  className="bg-indigo-600 px-6 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-indigo-500 transition-all disabled:opacity-50"
                >
                   {isGenerating ? '...' : 'Forge'}
                </button>
             </div>
          </div>

          <div className="space-y-4 mt-auto">
            <button onClick={() => addToCart(product)} className="w-full bg-black text-white py-5 rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all flex items-center justify-center space-x-3 shadow-xl">
              <ICONS.Cart />
              <span>Add to Shopping Bag</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
