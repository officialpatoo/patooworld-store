
import React from 'react';

const ReturnsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <div className="mb-20">
        <h1 className="text-5xl font-bold mb-6 tracking-tight">Returns & Exchanges.</h1>
        <p className="text-xl text-gray-500 leading-relaxed max-w-2xl">
          Not entirely convinced? We offer a 30-day "no-friction" return window for all Patoo devices.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div className="bg-gray-50 p-10 rounded-3xl">
          <h3 className="text-xl font-bold mb-4">Return Policy</h3>
          <ul className="space-y-4 text-sm text-gray-600">
            <li className="flex gap-3">
              <span className="font-bold text-black">30 Days:</span> Return for a full refund within 30 days of delivery.
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-black">Condition:</span> Item must be in original packaging with all components.
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-black">Refund:</span> Credited to original payment method within 5-7 business days.
            </li>
          </ul>
        </div>
        <div className="bg-indigo-50 p-10 rounded-3xl border border-indigo-100">
          <h3 className="text-xl font-bold mb-4 text-indigo-950">Exchanges</h3>
          <p className="text-sm text-indigo-900 leading-relaxed">
            Need a different color or model? We offer free exchange shipping. Select "Exchange" when initiating your return below.
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 p-12 rounded-[2.5rem] shadow-sm text-center">
        <h3 className="text-2xl font-bold mb-2">Initiate a Return</h3>
        <p className="text-gray-500 mb-10">All you need is your order number and email address.</p>
        
        <form className="max-w-md mx-auto space-y-4">
          <input type="text" placeholder="Order Number" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-indigo-500 outline-none" />
          <input type="email" placeholder="Email Address" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-indigo-500 outline-none" />
          <button className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-colors">
            Lookup Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReturnsPage;
