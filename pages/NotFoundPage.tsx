
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-40 text-center px-4">
      <h1 className="text-9xl font-black text-gray-100 mb-4 select-none">404</h1>
      <h2 className="text-3xl font-bold mb-4">You've ventured too far.</h2>
      <p className="text-gray-500 mb-10 max-w-md">The page you're looking for might have been moved, removed, or never existed.</p>
      <Link to="/" className="bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-gray-800 transition-all transform hover:scale-105 active:scale-95">
        Return Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
