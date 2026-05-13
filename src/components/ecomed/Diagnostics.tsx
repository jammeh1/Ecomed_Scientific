import React, { useState } from 'react';
import { DIAGNOSTIC_CATEGORIES, IMAGES } from '@/lib/ecomed-data';
import { Microscope, ArrowRight } from 'lucide-react';

const Diagnostics: React.FC = () => {
  const [active, setActive] = useState(0);
  const current = DIAGNOSTIC_CATEGORIES[active];

  return (
    <section id="diagnostics" className="py-24 lg:py-32 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: 'linear-gradient(rgba(16,185,129,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(16,185,129,.5) 1px,transparent 1px)',
        backgroundSize: '64px 64px'
      }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-600/20 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="text-[11px] uppercase tracking-[0.2em] font-semibold text-emerald-400 mb-4">Laboratory & Diagnostic Equipment</div>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1]">
            Precision diagnostics for every clinical discipline.
          </h2>
          <p className="mt-5 text-slate-300 text-lg leading-relaxed">
            A globally sourced portfolio of analyzers, automation systems and point-of-care platforms — calibrated to deliver clinically actionable results.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-2">
            {DIAGNOSTIC_CATEGORIES.map((c, i) => (
              <button
                key={c.name}
                onClick={() => setActive(i)}
                className={`w-full text-left p-5 rounded-2xl border transition-all flex items-center justify-between group ${
                  active === i
                    ? 'bg-emerald-600/15 border-emerald-500/50 ring-1 ring-emerald-500/30'
                    : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                }`}
              >
                <div>
                  <div className="text-white font-semibold">{c.name}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{c.count} systems available</div>
                </div>
                <ArrowRight className={`w-4 h-4 transition-all ${active === i ? 'text-emerald-400 translate-x-1' : 'text-slate-500'}`} />
              </button>
            ))}
          </div>

          <div className="lg:col-span-7">
            <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-white/10 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Microscope className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-emerald-400 font-semibold">Category</div>
                  <h3 className="text-2xl font-bold text-white">{current.name}</h3>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed">{current.desc}</p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {IMAGES.equipment.slice(0, 4).map((img, i) => (
                  <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-white/5">
                    <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {['ISO Certified', 'CE Marked', 'OEM Authorised'].map(t => (
                  <div key={t} className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-emerald-400 text-xs font-bold tracking-wider uppercase">{t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Diagnostics;
