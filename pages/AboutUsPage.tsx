
import React from 'react';

const AboutUsPage: React.FC = () => {
  return (
    <div className="pb-20">
      <section className="relative h-[60vh] flex items-center justify-center bg-black text-white overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt="Office"
        />
        <div className="relative z-10 text-center max-w-4xl px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Defining the Edge.</h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
            Patooworld was founded on a simple premise: technology should be as beautiful as it is powerful.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-4">Our Mission</h2>
            <h3 className="text-4xl font-bold mb-6">Crafting tools for the modern pioneer.</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              In a world saturated with "disposable" tech, Patooworld stands for longevity. We design products that aren't just gadgets, but extensions of your creative and professional self.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Based in the heart of innovation, our global team works tirelessly to merge haptic feedback, spatial computing, and artisan materials into a singular ecosystem.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] bg-gray-100 rounded-3xl overflow-hidden mt-12 shadow-lg">
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Craft" />
            </div>
            <div className="aspect-[3/4] bg-gray-100 rounded-3xl overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Innovation" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-12">The Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="text-4xl mb-4 text-indigo-600 font-bold">01</div>
              <h4 className="text-xl font-bold mb-2">Intentional Design</h4>
              <p className="text-gray-500 text-sm">Every curve and click is engineered for maximum haptic satisfaction.</p>
            </div>
            <div>
              <div className="text-4xl mb-4 text-indigo-600 font-bold">02</div>
              <h4 className="text-xl font-bold mb-2">Ecosystem First</h4>
              <p className="text-gray-500 text-sm">Seamless connectivity across all Patoo devices, no matter where you are.</p>
            </div>
            <div>
              <div className="text-4xl mb-4 text-indigo-600 font-bold">03</div>
              <h4 className="text-xl font-bold mb-2">Sustainable Future</h4>
              <p className="text-gray-500 text-sm">Building products that last decades, not seasons.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
