
import React, { useState } from 'react';

const JOBS = [
  { id: 1, title: 'Lead Spatial Designer', team: 'Hardware', location: 'Remote / SF', type: 'Full-time' },
  { id: 2, title: 'Senior Audio Engineer', team: 'Acoustics', location: 'London', type: 'Full-time' },
  { id: 3, title: 'Sustainability Strategist', team: 'Operations', location: 'Remote', type: 'Full-time' },
  { id: 4, title: 'Growth Marketing Lead', team: 'Marketing', location: 'New York', type: 'Full-time' },
  { id: 5, title: 'Inventory Systems Architect', team: 'Logistics', location: 'Singapore', type: 'Full-time' },
];

const CareersPage: React.FC = () => {
  const [applied, setApplied] = useState<number[]>([]);

  const handleApply = (id: number) => {
    if (applied.includes(id)) return;
    setApplied([...applied, id]);
    alert('Thank you for your interest in Patooworld. Our talent team will review your profile.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="mb-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Build the Future.</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          We're looking for thinkers, makers, and pioneers who aren't afraid to challenge the status quo of modern electronics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
        <div className="relative p-12 rounded-[2.5rem] flex flex-col justify-end h-[32rem] overflow-hidden group">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Team" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="relative z-10 text-white">
            <h3 className="text-3xl font-bold mb-2">Life at Patooworld</h3>
            <p className="text-gray-300">Explore our culture of radical transparency and creative freedom.</p>
          </div>
        </div>
        <div className="relative p-12 rounded-[2.5rem] flex flex-col justify-end h-[32rem] overflow-hidden group">
          <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1000" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Office" />
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-transparent to-transparent"></div>
          <div className="relative z-10 text-white">
            <h3 className="text-3xl font-bold mb-2">Remote-First Culture</h3>
            <p className="text-indigo-100">Work from anywhere. We provide the kit and the connection.</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl font-bold mb-10">Open Positions</h2>
        {JOBS.map(job => (
          <div key={job.id} className="group bg-white border border-gray-100 p-8 rounded-[2rem] hover:border-black transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm hover:shadow-md">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">{job.team}</span>
              <h3 className="text-xl font-bold mt-4">{job.title}</h3>
              <div className="flex space-x-4 mt-2 text-sm text-gray-400">
                <span>{job.location}</span>
                <span>•</span>
                <span>{job.type}</span>
              </div>
            </div>
            <button 
              onClick={() => handleApply(job.id)}
              className={`px-10 py-4 rounded-full font-bold transition-all ${
                applied.includes(job.id) 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-black text-white hover:bg-gray-800 transform hover:scale-105'
              }`}
            >
              {applied.includes(job.id) ? 'Application Sent' : 'Apply Now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareersPage;
