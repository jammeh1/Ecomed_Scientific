import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', org: '', type: 'Consultation', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.name) { toast.error('Please complete required fields'); return; }
    setLoading(true);
    try {
      await fetch('https://famous.ai/api/crm/6a04a451d2892f35c496ce90/subscribe', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, name: form.name, source: 'contact-form', tags: ['contact', form.type.toLowerCase()] })
      });
    } catch {}
    setLoading(false);
    setSent(true);
    toast.success('Request received — we will contact you shortly');
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <div className="text-[11px] uppercase tracking-[0.2em] font-semibold text-emerald-700 mb-4">Contact & Consultation</div>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1]">
            Let's build healthcare infrastructure together.
          </h2>
          <p className="mt-5 text-slate-600 leading-relaxed">
            Request a consultation, equipment quote or technical support. Our engineering team responds within one business day.
          </p>

          <div className="mt-8 space-y-4">
            {[
              { icon: MapPin, t: 'Headquarters', v: '48 Kairaba Avenue, Serekunda, The Gambia' },
              { icon: Phone, t: 'Phone', v: '+220 439 1113' },
              { icon: Mail, t: 'Email', v: 'support@ecomedscientific.com' },
              { icon: MessageCircle, t: 'WhatsApp', v: 'Chat with our team' },
            ].map(c => (
              <div key={c.t} className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-slate-200/70">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <c.icon className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{c.t}</div>
                  <div className="text-slate-900 font-medium">{c.v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200/70 shadow-sm">
            {sent ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-8 h-8 text-emerald-700" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Thank you, {form.name}.</h3>
                <p className="mt-2 text-slate-600">Our team will reach out within one business day.</p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', org: '', type: 'Consultation', message: '' }); }} className="mt-6 text-emerald-700 font-semibold text-sm">Send another request</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Full Name *</label>
                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:border-emerald-500 focus:bg-white outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Email *</label>
                    <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:border-emerald-500 focus:bg-white outline-none transition-colors" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Organization</label>
                    <input value={form.org} onChange={e => setForm({ ...form, org: e.target.value })} className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:border-emerald-500 focus:bg-white outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Request Type</label>
                    <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:border-emerald-500 focus:bg-white outline-none transition-colors">
                      <option>Consultation</option>
                      <option>Equipment Quote</option>
                      <option>Technical Support</option>
                      <option>Maintenance Request</option>
                      <option>Partnership</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">How can we help?</label>
                  <textarea rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:border-emerald-500 focus:bg-white outline-none transition-colors resize-none" />
                </div>
                <button disabled={loading} type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-4 rounded-full transition-all disabled:opacity-60">
                  {loading ? 'Sending...' : <>Submit Request <Send className="w-4 h-4" /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
