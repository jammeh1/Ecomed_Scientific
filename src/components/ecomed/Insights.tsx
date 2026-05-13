import React from 'react';
import { INSIGHTS, CAREERS } from '@/lib/ecomed-data';
import { Clock, ArrowUpRight, Briefcase, MapPin } from 'lucide-react';

const Insights: React.FC = () => (
  <>
    <section id="insights" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.2em] font-semibold text-emerald-700 mb-4">News & Insights</div>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              Expert perspectives on healthcare technology.
            </h2>
          </div>
          <button className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
            View all insights <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {INSIGHTS.map((p, i) => (
            <article key={i} className="bg-white rounded-2xl p-6 border border-slate-200/70 hover:border-emerald-300 hover:shadow-lg transition-all group cursor-pointer">
              <div className="text-[10px] uppercase tracking-[0.15em] font-bold text-emerald-700 mb-4">{p.cat}</div>
              <h3 className="font-bold text-slate-900 text-lg leading-snug group-hover:text-emerald-800 transition-colors">{p.title}</h3>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>{p.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {p.read}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section id="careers" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="text-[11px] uppercase tracking-[0.2em] font-semibold text-emerald-700 mb-4">Careers</div>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1]">
            Build the future of healthcare with us.
          </h2>
          <p className="mt-5 text-slate-600 leading-relaxed">
            Join a team of engineers, technologists and healthcare experts redefining medical infrastructure across West Africa.
          </p>
        </div>
        <div className="lg:col-span-8 space-y-3">
          {CAREERS.map((c, i) => (
            <div key={i} className="bg-slate-50 hover:bg-emerald-50/50 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 border border-transparent hover:border-emerald-200 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{c.title}</div>
                  <div className="text-xs text-slate-500 flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {c.loc}</span>
                    <span>{c.type}</span>
                  </div>
                </div>
              </div>
              <button className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
                Apply <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Insights;
