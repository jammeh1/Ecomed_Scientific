import React, { useEffect, useState } from 'react';
import { ArrowRight, Play, Activity, ShieldCheck, Award, HeartPulse, FlaskConical, Building2, Globe, GraduationCap, Microscope, Hospital, Shield } from 'lucide-react';
import { IMAGES } from '@/lib/ecomed-data';

const CLIENTS = [
  { name: 'MoH Gambia',   Icon: Building2 },
  { name: 'MRC Gambia',   Icon: Microscope },
  { name: 'EFSTH',        Icon: Hospital },
  { name: 'WHO',          Icon: Globe },
  { name: 'UTG',          Icon: GraduationCap },
  { name: 'NaNA',         Icon: Shield },
  { name: 'Medicare Clinic', Icon: HeartPulse },
  { name: 'GFATM',        Icon: FlaskConical },
];

interface Props { onContact: () => void; }

const Hero: React.FC<Props> = ({ onContact }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section id="top" className="relative min-h-screen pt-28 lg:pt-32 overflow-hidden bg-gradient-to-b from-emerald-50/40 via-white to-white">
      {/* Decorative grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(#0f5132 1px,transparent 1px),linear-gradient(90deg,#0f5132 1px,transparent 1px)',
        backgroundSize: '54px 54px'
      }} />
      {/* Soft blobs */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-emerald-200/30 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -left-32 w-[400px] h-[400px] bg-teal-200/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-12 gap-12 items-center pb-20 lg:pb-28">
        <div className={`lg:col-span-6 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="inline-flex items-center gap-2 bg-white border border-emerald-200 rounded-full px-4 py-1.5 mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-emerald-800">Healthcare Technology Partner • Since 2015</span>
          </div>

          <h1 className="text-[40px] sm:text-5xl lg:text-[64px] leading-[1.05] font-bold tracking-tight text-slate-900">
            Transforming healthcare with
            <span className="block bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent"> reliable technology </span>
            solutions.
          </h1>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
            ECOMED Scientific delivers precision medical and laboratory technologies, biomedical engineering and lifecycle support to hospitals, clinics and research institutions across The Gambia and West Africa.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <button onClick={onContact} className="group inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-7 py-4 rounded-full font-medium shadow-lg shadow-emerald-700/20 hover:shadow-emerald-700/40 transition-all">
              Request Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => document.querySelector('#solutions')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-emerald-300 text-slate-800 px-7 py-4 rounded-full font-medium transition-all">
              <Play className="w-4 h-4 text-emerald-700" /> Explore Solutions
            </button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
            {[
              { v: '10+', l: 'Years of Excellence' },
              { v: '250+', l: 'Installations' },
              { v: '24/7', l: 'Technical Support' },
            ].map(s => (
              <div key={s.l} className="border-l-2 border-emerald-600 pl-4">
                <div className="text-2xl lg:text-3xl font-bold text-slate-900">{s.v}</div>
                <div className="text-[11px] uppercase tracking-wider text-slate-500 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={`lg:col-span-6 transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-200/40 to-teal-200/40 rounded-3xl blur-2xl" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-emerald-100">
              <img src={IMAGES.hero} alt="ECOMED Healthcare Technology" className="w-full h-[520px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-transparent" />

              {/* Floating data card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-xl ring-1 ring-white/60">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">System Uptime</div>
                      <div className="font-bold text-slate-900">99.8%</div>
                    </div>
                  </div>
                  <div className="h-10 w-px bg-slate-200" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">ISO Compliant</div>
                      <div className="font-bold text-slate-900">Verified</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="hidden md:flex absolute -top-4 -right-4 bg-white rounded-2xl px-4 py-3 shadow-xl ring-1 ring-emerald-100 items-center gap-3">
              <Award className="w-5 h-5 text-emerald-700" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500">Authorised Partner</div>
                <div className="text-xs font-bold text-slate-900">Global OEM Network</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust strip – infinite scrolling marquee */}
      <div className="relative border-t border-slate-100 bg-white overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, white 60%, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, white 60%, transparent)' }} />

        <div className="py-5">
          <p className="text-center text-[10px] uppercase tracking-[0.22em] font-semibold text-slate-400 mb-4">
            Our Trusted Clients
          </p>

          {/* Marquee track */}
          <div className="flex overflow-hidden group">
            {[0, 1].map(i => (
              <div
                key={i}
                aria-hidden={i === 1}
                className="flex shrink-0 items-center gap-14 px-7 animate-marquee group-hover:[animation-play-state:paused]"
              >
                {CLIENTS.map(client => (
                  <div key={client.name} className="flex items-center gap-3 select-none">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-emerald-700"
                      style={{ background: 'linear-gradient(135deg,#d1fae5,#a7f3d0)' }}>
                      <client.Icon size={18} strokeWidth={2} />
                    </div>
                    <span className="text-[13px] font-semibold text-slate-500 whitespace-nowrap tracking-wide">
                      {client.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-100%); }
          }
          .animate-marquee {
            animation: marquee 28s linear infinite;
          }
        `}</style>
      </div>
    </section>
  );
};

export default Hero;
