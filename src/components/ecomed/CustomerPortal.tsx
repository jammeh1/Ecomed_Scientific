import React, { useState } from 'react';
import { X, Ticket, Calendar, FileText, Wrench, Bell, Activity, Plus, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { LOGO } from '@/lib/ecomed-data';
import { toast } from 'sonner';

interface Props { open: boolean; onClose: () => void; }

const tabs = [
  { id: 'overview', label: 'Overview', icon: Activity },
  { id: 'tickets', label: 'Support Tickets', icon: Ticket },
  { id: 'service', label: 'Service Schedule', icon: Calendar },
  { id: 'manuals', label: 'Documentation', icon: FileText },
  { id: 'maintenance', label: 'Maintenance', icon: Wrench },
];

const tickets = [
  { id: 'ECM-2403', t: 'Hematology analyzer calibration', status: 'In Progress', date: 'May 10, 2026' },
  { id: 'ECM-2398', t: 'Reagent supply enquiry', status: 'Resolved', date: 'May 06, 2026' },
  { id: 'ECM-2391', t: 'BSC annual certification', status: 'Scheduled', date: 'May 18, 2026' },
];

const CustomerPortal: React.FC<Props> = ({ open, onClose }) => {
  const [tab, setTab] = useState('overview');
  const [showNew, setShowNew] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-6xl my-8 overflow-hidden shadow-2xl ring-1 ring-emerald-100 flex flex-col lg:flex-row min-h-[600px]">
        {/* Sidebar */}
        <aside className="lg:w-72 bg-gradient-to-b from-emerald-900 to-emerald-950 text-white p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <img src={LOGO} className="w-10 h-10 rounded-lg bg-white p-1 object-cover" alt="ECOMED" />
            <div>
              <div className="font-bold text-sm">Client Portal</div>
              <div className="text-[10px] uppercase tracking-wider text-emerald-300">ECOMED Scientific</div>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 mb-6">
            <div className="text-xs text-emerald-200">Welcome back</div>
            <div className="font-bold mt-1">EFSTH Laboratory</div>
            <div className="text-xs text-emerald-300 mt-2">Account #ECM-CL-0148</div>
          </div>

          <nav className="space-y-1 flex-1">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${tab === t.id ? 'bg-emerald-600 text-white' : 'text-emerald-100 hover:bg-white/10'}`}>
                <t.icon className="w-4 h-4" /> {t.label}
              </button>
            ))}
          </nav>

          <button onClick={onClose} className="mt-6 text-xs text-emerald-200 hover:text-white flex items-center gap-1">
            <X className="w-3 h-3" /> Close Portal
          </button>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto max-h-[85vh]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 capitalize">{tabs.find(t => t.id === tab)?.label}</h2>
              <p className="text-sm text-slate-500 mt-1">Manage your ECOMED service relationship</p>
            </div>
            <button onClick={onClose} className="lg:hidden p-2"><X className="w-5 h-5" /></button>
          </div>

          {tab === 'overview' && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { l: 'Active Equipment', v: '24', i: Activity, c: 'emerald' },
                  { l: 'Open Tickets', v: '3', i: Ticket, c: 'amber' },
                  { l: 'Upcoming Service', v: '2', i: Calendar, c: 'blue' },
                ].map(s => (
                  <div key={s.l} className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-5">
                    <s.i className={`w-5 h-5 text-${s.c}-600 mb-3`} />
                    <div className="text-3xl font-bold text-slate-900">{s.v}</div>
                    <div className="text-xs text-slate-500 mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-start gap-4">
                <Bell className="w-5 h-5 text-emerald-700 mt-0.5" />
                <div>
                  <div className="font-semibold text-emerald-900">Calibration Reminder</div>
                  <div className="text-sm text-emerald-700 mt-1">Your biosafety cabinet certification is due on June 12, 2026.</div>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-3">Recent Activity</h3>
                <div className="space-y-2">
                  {tickets.map(t => (
                    <div key={t.id} className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-4">
                      <div>
                        <div className="text-xs text-emerald-700 font-mono">{t.id}</div>
                        <div className="font-medium text-slate-900 text-sm">{t.t}</div>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${t.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : t.status === 'In Progress' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                        {t.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'tickets' && (
            <div>
              <div className="flex justify-between items-center mb-5">
                <p className="text-sm text-slate-600">All support tickets</p>
                <button onClick={() => setShowNew(!showNew)} className="bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium px-4 py-2 rounded-full inline-flex items-center gap-1.5">
                  <Plus className="w-4 h-4" /> New Ticket
                </button>
              </div>
              {showNew && (
                <form onSubmit={(e) => { e.preventDefault(); toast.success('Ticket submitted'); setShowNew(false); }} className="bg-slate-50 rounded-2xl p-5 mb-5 space-y-3">
                  <input required placeholder="Subject" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500" />
                  <textarea required rows={3} placeholder="Describe the issue..." className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500 resize-none" />
                  <button className="bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-full">Submit</button>
                </form>
              )}
              <div className="space-y-2">
                {tickets.map(t => (
                  <div key={t.id} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between hover:border-emerald-300 transition-colors">
                    <div className="flex items-center gap-4">
                      {t.status === 'Resolved' ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : t.status === 'In Progress' ? <Clock className="w-5 h-5 text-amber-600" /> : <AlertCircle className="w-5 h-5 text-blue-600" />}
                      <div>
                        <div className="text-xs text-emerald-700 font-mono">{t.id}</div>
                        <div className="font-medium text-slate-900 text-sm">{t.t}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{t.date}</div>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-slate-600">{t.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'service' && (
            <div className="space-y-3">
              {[
                { eq: 'Hematology Analyzer XN-550', date: 'May 22, 2026', type: 'Preventive Maintenance' },
                { eq: 'Biosafety Cabinet Class II-A2', date: 'Jun 12, 2026', type: 'Annual Certification' },
                { eq: 'Chemistry Analyzer AU-480', date: 'Jul 03, 2026', type: 'Calibration' },
              ].map((s, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-slate-900">{s.eq}</div>
                    <div className="text-xs text-slate-500 mt-1">{s.type}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-emerald-700">{s.date}</div>
                    <button className="text-xs text-slate-500 hover:text-emerald-700 mt-1">Reschedule</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'manuals' && (
            <div className="grid sm:grid-cols-2 gap-3">
              {['Operator Manual - XN-550.pdf', 'Calibration SOP - AU-480.pdf', 'BSC Certification Report 2025.pdf', 'Warranty Terms.pdf'].map(d => (
                <div key={d} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between hover:border-emerald-300 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-emerald-700" />
                    <div className="text-sm font-medium text-slate-900">{d}</div>
                  </div>
                  <button onClick={() => toast.success('Downloading...')} className="text-xs text-emerald-700 font-semibold">Download</button>
                </div>
              ))}
            </div>
          )}

          {tab === 'maintenance' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-slate-900 mb-2">Request Maintenance</h3>
              <p className="text-sm text-slate-600 mb-4">Submit a maintenance request for any installed equipment.</p>
              <form onSubmit={(e) => { e.preventDefault(); toast.success('Maintenance request received'); }} className="space-y-3">
                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none">
                  <option>Hematology Analyzer XN-550</option>
                  <option>Chemistry Analyzer AU-480</option>
                  <option>Biosafety Cabinet Class II</option>
                </select>
                <textarea rows={3} placeholder="Issue description..." className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none resize-none" />
                <button className="bg-emerald-700 text-white text-sm font-medium px-5 py-2.5 rounded-full">Submit Request</button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CustomerPortal;
