import React, { useState } from 'react';
import { PROJECTS } from '@/lib/ecomed-data';
import { MapPin } from 'lucide-react';

const filters = ['All', 'Hospital Installation', 'Laboratory Setup', 'Healthcare Infrastructure', 'Diagnostic Systems'];

const Projects: React.FC = () => {
  const [f, setF] = useState('All');
  const list = f === 'All' ? PROJECTS : PROJECTS.filter(p => p.cat === f);

  return (
    <section id="projects" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.2em] font-semibold text-emerald-700 mb-4">Projects & Installations</div>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              Delivered with precision. Operating with reliability.
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map(x => (
            <button key={x} onClick={() => setF(x)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${f === x ? 'bg-emerald-700 text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-300'}`}>
              {x}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((p, i) => (
            <div key={i} className="group bg-white rounded-2xl overflow-hidden border border-slate-200/70 hover:shadow-2xl transition-all hover:-translate-y-1">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-6">
                <div className="text-[10px] uppercase tracking-[0.15em] font-bold text-emerald-700 mb-2">{p.cat}</div>
                <h3 className="font-bold text-slate-900 text-lg leading-tight">{p.title}</h3>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5" /> The Gambia
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
