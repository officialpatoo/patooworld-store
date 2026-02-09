
import React from 'react';

const SustainabilityPage: React.FC = () => {
  return (
    <div className="pb-20">
      <section className="bg-emerald-950 text-white py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">Earth Conscious.</h1>
          <p className="text-xl text-emerald-100/80 font-light">
            Our goal is to reach net-zero carbon impact by 2030 across our entire product lifecycle.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div className="rounded-[3rem] overflow-hidden bg-gray-100 h-96">
            <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Nature" />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6">Circular Economy</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We've pioneered "The Infinite Loop" program. Return any device past its prime, and we'll ensure 98% of its components are recycled into the next generation of hardware.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-emerald-700 font-medium">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                <span>100% Recycled Aluminum Enclosures</span>
              </li>
              <li className="flex items-center space-x-3 text-emerald-700 font-medium">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                <span>Zero Plastic Packaging since 2022</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-emerald-50 rounded-[3rem] p-12 md:p-20 text-center">
          <h3 className="text-3xl font-bold mb-4 text-emerald-900">Carbon Neutral Shipping</h3>
          <p className="text-emerald-800 max-w-2xl mx-auto mb-10">
            Every delivery is offset through verified reforestation projects in the Amazon and Sub-Saharan Africa. We don't just ship products; we plant futures.
          </p>
          <div className="inline-block px-8 py-3 bg-emerald-600 text-white rounded-full font-bold">
            Download 2024 Impact Report
          </div>
        </div>
      </section>
    </div>
  );
};

export default SustainabilityPage;
