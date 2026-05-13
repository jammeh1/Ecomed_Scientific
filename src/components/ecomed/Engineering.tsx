import React from 'react';
import { Cpu, Wrench, GraduationCap, FileCheck2, Gauge, LineChart } from 'lucide-react';

const items = [
  { icon: Cpu, t: 'Equipment Calibration', d: 'ISO-traceable calibration ensuring measurement accuracy and regulatory compliance.' },
  { icon: Wrench, t: 'Preventive Maintenance', d: 'Scheduled servicing programs that maximize uptime and extend equipment lifespan.' },
  { icon: Gauge, t: 'Troubleshooting', d: 'Rapid diagnosis and repair across complex clinical and laboratory instruments.' },
  { icon: FileCheck2, t: 'Installation & Commissioning', d: 'Turn-key installation, IQ/OQ/PQ validation and handover documentation.' },
  { icon: GraduationCap, t: 'Technical Training', d: 'Hands-on operator and biomedical engineer training programs.' },
  { icon: LineChart, t: 'Lifecycle Management', d: 'Strategic asset planning, performance analytics and replacement advisory.' },
];

const Engineering: React.FC = () => (
  <section id="engineering" className="py-24 lg:py-32 bg-white">
    <div className="max-w-7xl mx-auto px-5 lg:px-8">
      <div className="grid lg:grid-cols-12 gap-12 mb-14">
        <div className="lg:col-span-7">
          <div className="text-[11px] uppercase tracking-[0.2em] font-semibold text-emerald-700 mb-4">Biomedical Engineering Services</div>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1]">
            Engineering excellence behind every diagnosis.
          </h2>
        </div>
        <div className="lg:col-span-5 flex items-end">
          <p className="text-slate-600 leading-relaxed">
            Our biomedical engineering team delivers the full technical lifecycle — from initial installation through years of dependable service — keeping your critical equipment performing at peak accuracy.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 rounded-3xl overflow-hidden border border-slate-200">
        {items.map(({ icon: Icon, t, d }) => (
          <div key={t} className="bg-white p-8 hover:bg-emerald-50/40 transition-colors group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 group-hover:bg-emerald-700 transition-colors flex items-center justify-center mb-6">
              <Icon className="w-7 h-7 text-emerald-700 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{t}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Engineering;
