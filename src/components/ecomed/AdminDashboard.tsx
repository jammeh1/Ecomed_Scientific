import React, { useState } from 'react';
import { X, LayoutDashboard, Users, Ticket, FolderKanban, Boxes, BarChart3, FileEdit, UserCog, Wrench, Calendar, Lock, TrendingUp, TrendingDown } from 'lucide-react';
import { LOGO } from '@/lib/ecomed-data';
import { toast } from 'sonner';

interface Props { open: boolean; onClose: () => void; }

const navItems = [
  { id: 'dash', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'tickets', label: 'Support Tickets', icon: Ticket },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'schedule', label: 'Service Schedule', icon: Calendar },
  { id: 'inventory', label: 'Inventory', icon: Boxes },
  { id: 'maintenance', label: 'Maintenance', icon: Wrench },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'blog', label: 'Blog / News', icon: FileEdit },
  { id: 'staff', label: 'Staff', icon: UserCog },
];

const AdminDashboard: React.FC<Props> = ({ open, onClose }) => {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState('dash');
  const [u, setU] = useState('');
  const [p, setP] = useState('');

  if (!open) return null;

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (u === 'admin' && p === 'admin123') {
      setAuthed(true);
      toast.success('Welcome, Administrator');
    } else {
      toast.error('Invalid credentials');
    }
  };

  const close = () => { onClose(); setTimeout(() => { setAuthed(false); setU(''); setP(''); setTab('dash'); }, 200); };

  if (!authed) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl relative">
          <button onClick={close} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
          <div className="text-center mb-8">
            <img src={LOGO} className="w-16 h-16 rounded-2xl bg-emerald-50 p-2 mx-auto object-cover" alt="ECOMED" />
            <h2 className="text-2xl font-bold text-slate-900 mt-5">Admin Console</h2>
            <p className="text-sm text-slate-500 mt-1">ECOMED Scientific Operations</p>
          </div>
          <form onSubmit={login} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Username</label>
              <input value={u} onChange={e => setU(e.target.value)} className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500" placeholder="admin" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Password</label>
              <input type="password" value={p} onChange={e => setP(e.target.value)} className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500" placeholder="admin123" />
            </div>
            <button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3.5 rounded-xl inline-flex items-center justify-center gap-2">
              <Lock className="w-4 h-4" /> Sign in to Console
            </button>
            <div className="text-center text-xs text-slate-400 mt-3">Demo: admin / admin123</div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-slate-100 overflow-hidden flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 text-white p-5 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <img src={LOGO} className="w-9 h-9 rounded-lg bg-white p-1 object-cover" alt="ECOMED" />
          <div>
            <div className="font-bold text-sm">ECOMED</div>
            <div className="text-[9px] uppercase tracking-wider text-emerald-400">Admin Console</div>
          </div>
        </div>

        <nav className="space-y-1 flex-1 overflow-y-auto">
          {navItems.map(n => (
            <button key={n.id} onClick={() => setTab(n.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${tab === n.id ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
              <n.icon className="w-4 h-4" /> {n.label}
            </button>
          ))}
        </nav>

        <button onClick={close} className="mt-4 text-xs text-slate-400 hover:text-white flex items-center gap-2 px-3 py-2">
          <X className="w-4 h-4" /> Exit Console
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-bold text-slate-900 capitalize">{navItems.find(n => n.id === tab)?.label}</h1>
            <div className="text-xs text-slate-500">ECOMED Scientific • Operations Console</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-slate-600">Admin User</div>
            <div className="w-9 h-9 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">A</div>
          </div>
        </div>

        <div className="p-8">
          {tab === 'dash' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { l: 'Active Customers', v: '148', d: '+12%', up: true, i: Users },
                  { l: 'Open Tickets', v: '23', d: '-8%', up: false, i: Ticket },
                  { l: 'Live Projects', v: '17', d: '+3', up: true, i: FolderKanban },
                  { l: 'Revenue (YTD)', v: '$2.4M', d: '+24%', up: true, i: TrendingUp },
                ].map(s => (
                  <div key={s.l} className="bg-white rounded-2xl p-5 border border-slate-200">
                    <div className="flex items-center justify-between">
                      <s.i className="w-5 h-5 text-emerald-700" />
                      <span className={`text-xs font-semibold flex items-center gap-0.5 ${s.up ? 'text-emerald-700' : 'text-rose-600'}`}>
                        {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />} {s.d}
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-slate-900 mt-4">{s.v}</div>
                    <div className="text-xs text-slate-500 mt-1">{s.l}</div>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-bold text-slate-900">Service Activity</h3>
                    <select className="text-xs border border-slate-200 rounded-lg px-2 py-1">
                      <option>Last 30 days</option>
                    </select>
                  </div>
                  <div className="h-56 flex items-end gap-2">
                    {[40, 65, 55, 80, 70, 90, 75, 95, 85, 100, 88, 110].map((h, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-emerald-700 to-emerald-400 rounded-t" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-5">Recent Tickets</h3>
                  <div className="space-y-3">
                    {[
                      { id: 'T-2403', t: 'Calibration', s: 'open' },
                      { id: 'T-2402', t: 'Installation', s: 'progress' },
                      { id: 'T-2401', t: 'Reagent enquiry', s: 'closed' },
                      { id: 'T-2400', t: 'BSC certification', s: 'open' },
                    ].map(x => (
                      <div key={x.id} className="flex items-center justify-between text-sm">
                        <div>
                          <div className="font-mono text-xs text-emerald-700">{x.id}</div>
                          <div className="text-slate-700">{x.t}</div>
                        </div>
                        <span className={`text-[10px] uppercase px-2 py-0.5 rounded font-bold ${x.s === 'open' ? 'bg-amber-100 text-amber-800' : x.s === 'progress' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'}`}>{x.s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === 'customers' && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
                  <tr><th className="px-5 py-3">Customer</th><th className="px-5 py-3">Type</th><th className="px-5 py-3">Equipment</th><th className="px-5 py-3">Status</th></tr>
                </thead>
                <tbody>
                  {[
                    ['EFSTH', 'Hospital', '12 units', 'Active'],
                    ['MRC Gambia', 'Research', '8 units', 'Active'],
                    ['Banjul Diagnostic', 'Laboratory', '5 units', 'Active'],
                    ['Serekunda Clinic', 'Clinic', '3 units', 'Pending'],
                    ['UTG Medical School', 'University', '15 units', 'Active'],
                  ].map((r, i) => (
                    <tr key={i} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="px-5 py-3 font-medium text-slate-900">{r[0]}</td>
                      <td className="px-5 py-3 text-slate-600">{r[1]}</td>
                      <td className="px-5 py-3 text-slate-600">{r[2]}</td>
                      <td className="px-5 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${r[3] === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{r[3]}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {(tab === 'tickets' || tab === 'projects' || tab === 'schedule' || tab === 'inventory' || tab === 'maintenance' || tab === 'analytics' || tab === 'blog' || tab === 'staff') && (
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 mx-auto flex items-center justify-center mb-4">
                {(() => {
                  const Icon = navItems.find(n => n.id === tab)!.icon;
                  return <Icon className="w-7 h-7 text-emerald-700" />;
                })()}
              </div>
              <h3 className="text-xl font-bold text-slate-900 capitalize">{navItems.find(n => n.id === tab)?.label} Module</h3>
              <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">Enterprise-grade {navItems.find(n => n.id === tab)?.label.toLowerCase()} management with full CRUD operations, reporting and audit trail.</p>
              <button onClick={() => toast.success('Module opened')} className="mt-5 bg-emerald-700 text-white font-medium px-5 py-2.5 rounded-full text-sm">Open Module</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
