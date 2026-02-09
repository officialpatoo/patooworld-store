
import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: (email: string) => void;
}

const AUTHORIZED_ADMINS = [
  'info@patooworld.com',
  'developer@patooworld.com',
  'samuel@patooworld.com'
];

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isAuthorizedEmail = AUTHORIZED_ADMINS.includes(email.toLowerCase());
    const isCorrectKey = password === 'patoo2025';

    if (isAuthorizedEmail && isCorrectKey) {
      onLogin(email);
    } else if (!isAuthorizedEmail) {
      setError('Access Denied: Email not in authorized administrator list.');
    } else {
      setError('Invalid Management Access Key.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-900 rounded-[2rem] p-10 border border-gray-800 shadow-2xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Patooworld Management</h1>
          <p className="text-gray-400 text-sm italic font-medium">Identity-based terminal access.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">Admin Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                className="w-full bg-gray-800 border-none rounded-xl py-4 px-5 text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-sm"
                placeholder="name@patooworld.com"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">Access Key</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="w-full bg-gray-800 border-none rounded-xl py-4 px-5 text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-sm"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4">
              <p className="text-rose-400 text-xs font-bold text-center leading-relaxed">{error}</p>
            </div>
          )}
          
          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
          >
            Authenticate Identity
          </button>
        </form>
        
        <div className="mt-8 flex flex-col items-center space-y-4">
          <div className="flex space-x-1">
             {[...Array(3)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-gray-800 rounded-full"></div>)}
          </div>
          <p className="text-center text-[10px] text-gray-600 uppercase tracking-widest font-black">
            Secure Terminal v4.0.2 • Encrypted AES-256
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
