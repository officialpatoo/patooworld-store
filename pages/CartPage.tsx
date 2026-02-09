
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { ICONS } from '../constants';

const CartPage: React.FC = () => {
  const { cart, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-32 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-300">
          <ICONS.Cart />
        </div>
        <h2 className="text-3xl font-bold mb-4">Your bag is empty.</h2>
        <p className="text-gray-500 mb-10">Items remain in your bag for 30 days. Sign in to see your items across all your devices.</p>
        <Link to="/products" className="bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors inline-block">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-12">Review your bag.</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          {cart.map(item => (
            <div key={item.id} className="flex gap-8 py-8 border-b border-gray-100 last:border-0">
              <div className="w-32 h-32 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center border border-gray-200 rounded-lg p-1">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <ICONS.Trash />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <button 
            onClick={clearCart}
            className="text-xs text-gray-400 uppercase tracking-widest font-bold hover:text-black mt-4"
          >
            Clear bag contents
          </button>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-3xl p-8 sticky top-24 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 text-sm mb-8">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Estimated Tax</span>
                <span className="font-medium">${(cartTotal * 0.08).toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${(cartTotal * 1.08).toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 mb-6"
              onClick={() => navigate('/checkout')}
            >
              Check Out
            </button>
            
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-4">Secure Checkout</p>
              <div className="flex justify-center space-x-3 opacity-30 grayscale">
                <div className="w-10 h-6 bg-gray-400 rounded"></div>
                <div className="w-10 h-6 bg-gray-400 rounded"></div>
                <div className="w-10 h-6 bg-gray-400 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
