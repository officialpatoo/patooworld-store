
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Address } from '../types';

const steps = ['Details', 'Shipping', 'Payment', 'Review'];

const CheckoutPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { cart, cartTotal, clearCart } = useCart();
  const { user, placeOrder } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    street: '',
    city: '',
    zipCode: '',
    country: 'United States',
    shippingMethod: 'standard',
    paymentMethod: 'credit_card',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handleFinalize = async () => {
    const shippingAddress: Address = {
      id: 'temp',
      fullName: `${formData.firstName} ${formData.lastName}`,
      street: formData.street,
      city: formData.city,
      zipCode: formData.zipCode,
      country: formData.country,
      isDefault: false
    };

    const orderId = await placeOrder({
      items: cart,
      total: cartTotal * 1.08,
      shippingAddress,
      shippingMethod: formData.shippingMethod,
      paymentMethod: formData.paymentMethod
    });

    clearCart();
    navigate(`/order-confirmation?id=${orderId}`);
  };

  if (cart.length === 0 && currentStep !== 3) {
    return <div className="text-center py-20">Your bag is empty.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between mb-12 max-w-2xl mx-auto">
        {steps.map((step, idx) => (
          <div key={step} className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 font-bold transition-colors ${
              idx <= currentStep ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'
            }`}>
              {idx + 1}
            </div>
            <span className={`text-xs font-bold uppercase tracking-widest ${
              idx <= currentStep ? 'text-black' : 'text-gray-400'
            }`}>{step}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
            {currentStep === 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Contact Details</h2>
                {!user && <p className="text-sm text-gray-500">Checking out as guest? You'll be able to create an account later.</p>}
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Email Address</label>
                    <input name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-black" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">First Name</label>
                    <input name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-black" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Last Name</label>
                    <input name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-black" />
                  </div>
                </div>
                <button onClick={nextStep} className="w-full bg-black text-white py-4 rounded-xl font-bold mt-4">Continue to Shipping</button>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Street Address</label>
                    <input name="street" value={formData.street} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-black" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">City</label>
                    <input name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-black" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Zip Code</label>
                    <input name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-black" />
                  </div>
                </div>
                
                <h3 className="text-lg font-bold mt-8">Delivery Method</h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-4 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <input type="radio" name="shippingMethod" value="standard" checked={formData.shippingMethod === 'standard'} onChange={handleInputChange} className="accent-black" />
                      <div>
                        <p className="font-bold">Standard Delivery</p>
                        <p className="text-xs text-gray-400">3-5 Business Days</p>
                      </div>
                    </div>
                    <span className="font-bold">FREE</span>
                  </label>
                  <label className="flex items-center justify-between p-4 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <input type="radio" name="shippingMethod" value="express" checked={formData.shippingMethod === 'express'} onChange={handleInputChange} className="accent-black" />
                      <div>
                        <p className="font-bold">Express Delivery</p>
                        <p className="text-xs text-gray-400">1-2 Business Days</p>
                      </div>
                    </div>
                    <span className="font-bold">$15.00</span>
                  </label>
                </div>
                <div className="flex gap-4">
                  <button onClick={prevStep} className="flex-1 bg-gray-100 text-black py-4 rounded-xl font-bold">Back</button>
                  <button onClick={nextStep} className="flex-[2] bg-black text-white py-4 rounded-xl font-bold">Continue to Payment</button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Payment Details</h2>
                <div className="flex space-x-4 mb-6">
                   <div className="bg-gray-50 p-4 rounded-xl flex-1 border border-black/10 flex items-center justify-center">Credit Card</div>
                   <div className="bg-gray-50 p-4 rounded-xl flex-1 opacity-40 flex items-center justify-center grayscale">Apple Pay</div>
                   <div className="bg-gray-50 p-4 rounded-xl flex-1 opacity-40 flex items-center justify-center grayscale">PayPal</div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Card Number</label>
                    <input name="cardNumber" placeholder="0000 0000 0000 0000" className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-black" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Expiry</label>
                      <input name="expiry" placeholder="MM/YY" className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-black" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">CVV</label>
                      <input name="cvv" placeholder="000" className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-black" />
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={prevStep} className="flex-1 bg-gray-100 text-black py-4 rounded-xl font-bold">Back</button>
                  <button onClick={nextStep} className="flex-[2] bg-black text-white py-4 rounded-xl font-bold">Review Order</button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Review & Confirm</h2>
                <div className="space-y-4 border-b border-gray-100 pb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shipping to</span>
                    <span className="font-bold text-right">{formData.street}, {formData.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Delivery</span>
                    <span className="font-bold uppercase tracking-wide">{formData.shippingMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Payment</span>
                    <span className="font-bold italic">Ending in 4242</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={prevStep} className="flex-1 bg-gray-100 text-black py-4 rounded-xl font-bold">Back</button>
                  <button onClick={handleFinalize} className="flex-[2] bg-indigo-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-100">Confirm Order</button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 sticky top-24">
            <h2 className="text-lg font-bold mb-6">In your bag</h2>
            <div className="space-y-4 mb-8">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <img src={item.image} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <p className="text-sm font-bold leading-none mb-1">{item.name}</p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 pt-6 border-t border-gray-200">
               <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="font-bold">${cartTotal.toFixed(2)}</span>
               </div>
               <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-green-600 font-bold">{formData.shippingMethod === 'express' ? '$15.00' : 'FREE'}</span>
               </div>
               <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Tax</span>
                  <span className="font-bold">${(cartTotal * 0.08).toFixed(2)}</span>
               </div>
               <div className="flex justify-between text-xl font-bold pt-4">
                  <span>Total</span>
                  <span>${((cartTotal * 1.08) + (formData.shippingMethod === 'express' ? 15 : 0)).toFixed(2)}</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
