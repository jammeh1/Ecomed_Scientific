import React from 'react';
import { INDUSTRIES, WHY_CHOOSE } from '@/lib/ecomed-data';
import { Hospital, Stethoscope, FlaskConical, GraduationCap, Building2, HeartHandshake, Landmark, Siren, Trophy, Sprout, CheckCircle2 } from 'lucide-react';

const icons = [Hospital, Stethoscope, FlaskConical, GraduationCap, GraduationCap, HeartHandshake, Landmark, Siren, Trophy, Sprout];

const Industries: React.FC = () => (
  <>
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-[11px] uppercase tracking-[0.2em] font-semibold text-emerald-700 mb-4">Industries Served</div>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
            Powering institutions across the healthcare ecosystem.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {INDUSTRIES.map((name, i) => {
            const Icon = icons[i] || Hospital;
            return (
              <div key={name} className="group aspect-square bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center p-4 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all cursor-pointer">
                <Icon className="w-7 h-7 text-emerald-700 mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-xs sm:text-sm font-semibold text-slate-800 text-center leading-tight">{name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    <section className="py-24 lg:py-32 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,.4) 0, transparent 50%), radial-gradient(circle at 80% 70%, rgba(20,184,166,.5) 0, transparent 50%)'
      }} />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-2xl mb-14">
          <div className="text-[11px] uppercase tracking-[0.2em] font-semibold text-emerald-300 mb-4">Why Choose ECOMED</div>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1]">
            Built on precision. Backed by partnership.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WHY_CHOOSE.map(w => (
            <div key={w.title} className="bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/[0.1] transition-all">
              <CheckCircle2 className="w-6 h-6 text-emerald-300 mb-4" />
              <h3 className="text-white font-bold text-base mb-2">{w.title}</h3>
              <p className="text-emerald-100/80 text-sm leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Industries;
