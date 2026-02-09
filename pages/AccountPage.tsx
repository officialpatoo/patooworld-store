
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AccountPage: React.FC = () => {
  const { user, logout, removeAddress, updateWishlist } = useAuth();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'wishlist'>('orders');
  const navigate = useNavigate();

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Hi, {user.firstName}.</h1>
          <p className="text-gray-500">Welcome to your personal Patooworld space.</p>
        </div>
        <button onClick={logout} className="text-sm font-bold text-red-500 uppercase tracking-widest hover:underline">
          Sign Out
        </button>
      </div>

      <div className="flex border-b border-gray-100 mb-12">
        {(['orders', 'addresses', 'wishlist'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all border-b-2 ${
              activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-black'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'orders' && (
        <div className="space-y-6">
          {user.orders.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-[2rem]">
               <p className="text-gray-400 font-medium">No orders yet.</p>
               <button onClick={() => navigate('/products')} className="mt-4 text-indigo-600 font-bold underline">Start Shopping</button>
            </div>
          ) : (
            user.orders.map(order => (
              <div key={order.id} className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
                 <div className="flex justify-between items-start mb-8">
                    <div>
                       <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                       <h3 className="text-xl font-bold">{order.id}</h3>
                    </div>
                    <span className="bg-indigo-50 text-indigo-700 px-4 py-1 rounded-full text-xs font-bold uppercase">
                      {order.status}
                    </span>
                 </div>
                 <div className="space-y-4">
                    {order.items.map(item => (
                      <div key={item.id} className="flex items-center space-x-4">
                         <img src={item.image} className="w-12 h-12 rounded-lg object-cover" />
                         <div>
                            <p className="font-bold text-sm">{item.name}</p>
                            <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                         </div>
                      </div>
                    ))}
                 </div>
                 <div className="mt-8 pt-8 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Ordered on {new Date(order.date).toLocaleDateString()}</span>
                    <span className="text-lg font-bold">${order.total.toFixed(2)}</span>
                 </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'addresses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <button className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2rem] p-8 h-48 flex flex-col items-center justify-center text-gray-400 hover:border-black hover:text-black transition-all">
             <span className="text-2xl mb-2">+</span>
             <span className="text-xs font-bold uppercase tracking-widest">Add New Address</span>
          </button>
          {user.addresses.map(addr => (
            <div key={addr.id} className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm relative group">
              <h3 className="font-bold mb-2">{addr.fullName}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{addr.street}<br />{addr.city}, {addr.zipCode}<br />{addr.country}</p>
              <button 
                onClick={() => removeAddress(addr.id)}
                className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 text-red-500 text-xs font-bold transition-opacity"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'wishlist' && (
        <div className="text-center py-20 bg-gray-50 rounded-[2rem]">
          <p className="text-gray-400 font-medium">Coming Soon to your account space.</p>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
