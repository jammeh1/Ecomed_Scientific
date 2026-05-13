import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { IMAGES } from '@/lib/ecomed-data';

const points = [
  'Established 2015 in The Gambia',
  'Clinical & laboratory technology specialists',
  'Hospitals, clinics, labs & research institutions',
  'Equipment supply, engineering & maintenance',
  'Consistent reagent supply chain',
  'Long-term lifecycle partnerships',
];

const About: React.FC = () => (
  <section id="about" className="py-24 lg:py-32 bg-white">
    <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-12 gap-14 items-center">
      <div className="lg:col-span-6 relative">
        <div className="relative rounded-3xl overflow-hidden shadow-xl ring-1 ring-slate-100">
          <img src={IMAGES.engineer} alt="ECOMED Biomedical Engineering" className="w-full h-[540px] object-cover" />
        </div>
        <div className="absolute -bottom-6 -right-6 bg-emerald-700 text-white rounded-2xl p-6 shadow-xl max-w-[220px] hidden md:block">
          <div className="text-4xl font-bold">10+</div>
          <div className="text-sm opacity-90 mt-1">Years advancing healthcare infrastructure</div>
        </div>
      </div>

      <div className="lg:col-span-6">
        <div className="text-[11px] uppercase tracking-[0.2em] font-semibold text-emerald-700 mb-4">About ECOMED</div>
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1]">
          A trusted healthcare technology partner advancing care across West Africa.
        </h2>
        <p className="mt-6 text-slate-600 leading-relaxed text-lg">
          Since 2015, ECOMED Scientific Limited has been the partner of choice for hospitals, diagnostic laboratories, and research institutions seeking dependable medical technology. We combine deep biomedical engineering expertise with a relentless commitment to after-sales support — ensuring every installation delivers lasting clinical value.
        </p>

        <div className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-3">
          {points.map(p => (
            <div key={p} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
              <span className="text-slate-700 text-sm">{p}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-3 gap-4">
          {[
            { v: '250+', l: 'Projects Delivered' },
            { v: '40+', l: 'Engineering Experts' },
            { v: '15+', l: 'Industries Served' },
          ].map(s => (
            <div key={s.l} className="bg-slate-50 rounded-2xl p-5">
              <div className="text-3xl font-bold text-emerald-800">{s.v}</div>
              <div className="text-xs text-slate-600 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;
