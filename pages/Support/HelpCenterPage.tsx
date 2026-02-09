
import React, { useState } from 'react';

const FAQS = [
  {
    category: 'Ordering',
    items: [
      { q: "What payment methods do you accept?", a: "We accept all major credit cards, Apple Pay, Google Pay, and crypto via select wallets." },
      { q: "Can I change my order after it's placed?", a: "Orders enter processing within 30 minutes. You can modify your shipping address during this window via the tracking portal." }
    ]
  },
  {
    category: 'Product & Tech',
    items: [
      { q: "Is the Patoo Sound Pro waterproof?", a: "The Sound Pro features IPX4 water resistance, making it sweat and rain-proof, but not suitable for swimming." },
      { q: "Do you offer international shipping?", a: "Yes, we ship to over 150 countries. Duty and taxes are calculated at checkout for a seamless experience." }
    ]
  }
];

const HelpCenterPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">How can we help?</h1>
        <div className="relative max-w-xl mx-auto">
          <input 
            type="text" 
            placeholder="Search for articles, guides..." 
            className="w-full bg-gray-100 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-black outline-none"
          />
          <svg className="absolute left-4 top-4 h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
      </div>

      <div className="space-y-12">
        {FAQS.map((group, gIdx) => (
          <div key={gIdx}>
            <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-6">{group.category}</h2>
            <div className="space-y-4">
              {group.items.map((item, iIdx) => {
                const key = `${gIdx}-${iIdx}`;
                const isOpen = openIndex === key;
                return (
                  <div key={iIdx} className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                    <button 
                      onClick={() => setOpenIndex(isOpen ? null : key)}
                      className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-bold">{item.q}</span>
                      <svg className={`h-5 w-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {isOpen && (
                      <div className="p-6 pt-0 text-gray-600 text-sm border-t border-gray-50 bg-gray-50/30">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 p-10 bg-indigo-600 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
          <p className="text-indigo-100">Our support squad is available 24/7 via live chat.</p>
        </div>
        <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition-colors">
          Chat with us
        </button>
      </div>
    </div>
  );
};

export default HelpCenterPage;
