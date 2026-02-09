
import React, { useState } from 'react';

const OrderTrackingPage: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState<null | 'loading' | 'found'>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;
    setStatus('loading');
    setTimeout(() => setStatus('found'), 1500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Where is your order?</h1>
        <p className="text-gray-500">Enter your order ID found in your confirmation email.</p>
      </div>

      <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4 mb-16">
        <input 
          type="text" 
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="PT-XXXXX" 
          className="flex-1 bg-white border border-gray-200 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-black outline-none uppercase font-mono"
        />
        <button className="bg-black text-white px-10 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-colors">
          Track Package
        </button>
      </form>

      {status === 'loading' && (
        <div className="flex flex-col items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-400 font-medium">Connecting to logistics network...</p>
        </div>
      )}

      {status === 'found' && (
        <div className="bg-white border border-gray-100 rounded-[2rem] p-10 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-50">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
              <h3 className="text-xl font-bold text-indigo-600">In Transit</h3>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Estimated Delivery</p>
              <h3 className="text-xl font-bold">Oct 24, 2024</h3>
            </div>
          </div>

          <div className="relative mb-12">
            <div className="h-1 bg-gray-100 w-full absolute top-1/2 -translate-y-1/2 rounded-full"></div>
            <div className="h-1 bg-indigo-600 w-2/3 absolute top-1/2 -translate-y-1/2 rounded-full"></div>
            <div className="flex justify-between relative z-10">
              <div className="w-8 h-8 bg-indigo-600 rounded-full border-4 border-white shadow-sm flex items-center justify-center text-white">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <div className="w-8 h-8 bg-indigo-600 rounded-full border-4 border-white shadow-sm flex items-center justify-center text-white">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <div className="w-8 h-8 bg-indigo-600 rounded-full border-4 border-white shadow-sm flex items-center justify-center text-white">
                <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
              </div>
              <div className="w-8 h-8 bg-white border-2 border-gray-200 rounded-full shadow-sm"></div>
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              <span>Ordered</span>
              <span>Packed</span>
              <span className="text-indigo-600">Shipped</span>
              <span>Arrived</span>
            </div>
          </div>

          <div className="space-y-6">
             <div className="flex gap-4">
                <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                <div>
                   <p className="font-bold text-sm">Departed regional sorting facility</p>
                   <p className="text-xs text-gray-400">San Francisco, CA • 10:45 AM</p>
                </div>
             </div>
             <div className="flex gap-4 opacity-40">
                <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                <div>
                   <p className="font-bold text-sm">Package received by carrier</p>
                   <p className="text-xs text-gray-400">San Francisco, CA • Oct 21, 09:12 AM</p>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTrackingPage;
