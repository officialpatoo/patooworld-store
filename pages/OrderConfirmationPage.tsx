
import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const OrderConfirmationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id');
  const { user } = useAuth();

  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 text-green-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-4xl font-bold mb-4">Confirmed.</h1>
      <p className="text-gray-500 mb-2">Order <span className="font-bold text-black">{orderId}</span> is now being prepared.</p>
      <p className="text-gray-400 text-sm mb-12">We've sent a confirmation email with all the details.</p>

      {!user && (
        <div className="bg-indigo-50 rounded-3xl p-8 mb-12 border border-indigo-100">
          <h3 className="text-lg font-bold mb-2">Save your details?</h3>
          <p className="text-sm text-indigo-900 mb-6">Create an account to track your order and checkout faster next time.</p>
          <Link to="/auth" className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold block">
            Create Account
          </Link>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/products" className="bg-black text-white px-10 py-4 rounded-full font-bold">
          Keep Shopping
        </Link>
        <Link to="/track" className="bg-gray-100 text-black px-10 py-4 rounded-full font-bold">
          Track Package
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
