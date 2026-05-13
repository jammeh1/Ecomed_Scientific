import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVICES } from '@/lib/ecomed-data';

import { ArrowUpRight } from 'lucide-react';

const Services: React.FC = () => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section id="solutions" className="py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(#065f46 1px, transparent 1px)', backgroundSize: '28px 28px'
      }} />
      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.2em] font-semibold text-emerald-700 mb-4">Healthcare Technology Solutions</div>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              End-to-end solutions for modern medical institutions.
            </h2>
          </div>
          <p className="text-slate-600 max-w-md">
            From equipment supply to lifecycle engineering — we deliver every capability your facility needs to operate with precision and confidence.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((s, i) => {
            const Icon = (Icons as any)[s.icon] || Icons.Circle;
            const active = hover === i;
            return (
              <div
                key={s.title}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className={`group relative bg-white rounded-2xl p-6 border border-slate-200/70 hover:border-emerald-300 transition-all cursor-pointer overflow-hidden ${active ? 'shadow-xl -translate-y-1' : 'shadow-sm'}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/0 via-emerald-50/0 to-emerald-100/0 group-hover:from-emerald-50/40 group-hover:to-white transition-all" />
                <div className="relative">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all ${active ? 'bg-emerald-700 text-white' : 'bg-emerald-50 text-emerald-700'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-[15px] leading-tight">{s.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">{s.desc}</p>
                  <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link to="/catalog" className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-7 py-4 rounded-full shadow-lg shadow-emerald-700/20 hover:shadow-emerald-700/40 transition-all">
            Browse Full Equipment Catalog <ArrowUpRight className="w-4 h-4" />
          </Link>
          <div className="text-xs text-slate-500 mt-3">50+ medical & laboratory products from leading global manufacturers</div>
        </div>
      </div>
    </section>

  );
};

export default Services;
