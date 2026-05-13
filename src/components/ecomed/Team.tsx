import React from 'react';
import { TEAM } from '@/lib/ecomed-data';
import { Linkedin, Mail } from 'lucide-react';

const Team: React.FC = () => (
  <section id="team" className="py-24 lg:py-32 bg-white">
    <div className="max-w-7xl mx-auto px-5 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="text-[11px] uppercase tracking-[0.2em] font-semibold text-emerald-700 mb-4">Team & Experts</div>
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
          The engineers and leaders behind ECOMED.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {TEAM.map(t => (
          <div key={t.name} className="group bg-gradient-to-b from-slate-50 to-white rounded-3xl overflow-hidden border border-slate-200/70 hover:shadow-2xl transition-all">
            <div className="aspect-[4/5] overflow-hidden bg-slate-100 relative">
              <img src={t.img} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 flex gap-2 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                <button className="w-10 h-10 rounded-full bg-white/95 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/95 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-slate-900 text-lg">{t.name}</h3>
              <div className="text-emerald-700 text-sm font-medium mt-0.5">{t.role}</div>
              <p className="text-slate-600 text-sm mt-3 leading-relaxed">{t.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Team;
