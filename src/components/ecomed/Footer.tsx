import React, { useState } from 'react';
import { LOGO } from '@/lib/ecomed-data';
import { Linkedin, Twitter, Facebook, Instagram, ArrowRight, Lock } from 'lucide-react';
import { toast } from 'sonner';

interface Props { onAdmin: () => void; }

const Footer: React.FC<Props> = ({ onAdmin }) => {
  const [email, setEmail] = useState('');
  const [showAdmin, setShowAdmin] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch('https://famous.ai/api/crm/6a04a451d2892f35c496ce90/subscribe', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer-signup', tags: ['newsletter', 'insights'] })
      });
    } catch {}
    toast.success('Subscribed to ECOMED insights');
    setEmail('');
  };

  // Show admin button only after scrolling past landing — i.e. not on initial view
  React.useEffect(() => {
    const onScroll = () => setShowAdmin(window.scrollY > 1200);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: 'linear-gradient(rgba(16,185,129,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(16,185,129,.4) 1px,transparent 1px)',
        backgroundSize: '64px 64px'
      }} />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        {/* Newsletter band */}
        <div className="bg-gradient-to-r from-emerald-700 to-emerald-900 rounded-3xl p-8 lg:p-12 mb-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-white leading-tight max-w-xl">Stay ahead of healthcare technology trends.</h3>
            <p className="text-emerald-100 mt-2 text-sm">Subscribe for engineering insights, diagnostic innovations and ECOMED announcements.</p>
          </div>
          <form onSubmit={submit} className="w-full lg:w-auto flex items-center gap-2 bg-white rounded-full p-1.5 shadow-lg">
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="your@email.com" className="flex-1 lg:w-72 bg-transparent px-4 py-2 text-slate-900 outline-none text-sm" />
            <button className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-5 py-2.5 rounded-full text-sm inline-flex items-center gap-1.5">
              Subscribe <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <img src={LOGO} alt="ECOMED" className="h-12 w-12 rounded-lg object-cover bg-white p-1" />
              <div>
                <div className="font-bold text-white">ECOMED</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-emerald-400">Scientific Limited</div>
              </div>
            </div>
            <p className="mt-5 text-sm text-slate-400 leading-relaxed max-w-sm">
              Precision healthcare technology, biomedical engineering and lifecycle support — serving hospitals, laboratories and research institutions across The Gambia and West Africa.
            </p>
            <div className="mt-6 flex gap-3">
              {[Linkedin, Twitter, Facebook, Instagram].map((Ic, i) => (
                <button key={i} className="w-9 h-9 rounded-full bg-white/5 hover:bg-emerald-600 transition-colors flex items-center justify-center">
                  <Ic className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {[
            { t: 'Solutions', l: ['Laboratory Equipment', 'Diagnostic Systems', 'Biomedical Engineering', 'Calibration Services', 'Reagent Supply'] },
            { t: 'Company', l: ['About ECOMED', 'Projects', 'Team', 'Careers', 'Insights'] },
            { t: 'Support', l: ['Client Portal', 'Technical Support', 'Maintenance Requests', 'Documentation', 'Contact'] },
          ].map(col => (
            <div key={col.t} className="lg:col-span-2">
              <div className="text-white font-bold mb-4 text-sm">{col.t}</div>
              <ul className="space-y-2.5">
                {col.l.map(x => (
                  <li key={x}><a href="#" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">{x}</a></li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2">
            <div className="text-white font-bold mb-4 text-sm">Contact</div>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>48 Kairaba Avenue<br/>Serekunda, The Gambia</li>
              <li>+220 439 1113</li>
              <li>support@ecomedscientific.com</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>© {new Date().getFullYear()} ECOMED Scientific Limited. All rights reserved.</div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-emerald-400">Privacy</a>
            <a href="#" className="hover:text-emerald-400">Terms</a>
            <a href="https://jammeh1.github.io/Ens-tech-portfolio/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">
              Website by ENS TECH
            </a>
            {showAdmin && (
              <button onClick={onAdmin} className="inline-flex items-center gap-1.5 text-slate-600 hover:text-emerald-400 transition-colors">
                <Lock className="w-3 h-3" /> Admin
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
