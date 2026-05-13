import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import CatalogShell from '@/components/ecomed/CatalogShell';
import { ArrowLeft, CheckCircle2, Clock, Download, ShieldCheck, FileText, Send, Loader2, ChevronRight, Award, Truck, Wrench } from 'lucide-react';
import { toast } from 'sonner';

interface Equipment {
  id: string;
  sku: string;
  name: string;
  slug: string;
  category: string;
  manufacturer: string;
  model: string;
  short_description: string;
  long_description: string;
  image_url: string;
  price_usd: number;
  availability: string;
  lead_time_weeks: number;
  specifications: Record<string, string>;
  features: string[];
  applications: string[];
  certifications: string[];
  warranty_months: number;
  datasheet_url: string;
}

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Equipment | null>(null);
  const [related, setRelated] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'specs' | 'features' | 'applications'>('specs');
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', organization: '', country: 'The Gambia', quantity: 1, message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSent(false);
    (async () => {
      setLoading(true);
      const { data } = await supabase.from('ecomed_equipment').select('*').eq('slug', slug).maybeSingle();
      if (data) {
        setProduct(data as Equipment);
        const { data: rel } = await supabase
          .from('ecomed_equipment')
          .select('*')
          .eq('category', data.category)
          .neq('id', data.id)
          .limit(3);
        setRelated((rel as Equipment[]) || []);
      }
      setLoading(false);
    })();
  }, [slug]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    setSubmitting(true);
    const { error } = await supabase.from('ecomed_quote_leads').insert({
      equipment_id: product.id,
      equipment_name: product.name,
      ...form,
    });
    // Also subscribe to CRM
    try {
      await fetch('https://famous.ai/api/crm/6a04a451d2892f35c496ce90/subscribe', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, name: form.full_name, source: 'quote-request', tags: ['quote', product.category.toLowerCase().replace(/\s+/g, '-')] })
      });
    } catch {}
    setSubmitting(false);
    if (error) {
      toast.error('Submission failed. Please try again.');
    } else {
      setSent(true);
      toast.success('Quote request received');
    }
  };

  if (loading) {
    return (
      <CatalogShell>
        <div className="py-32 flex items-center justify-center text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      </CatalogShell>
    );
  }

  if (!product) {
    return (
      <CatalogShell>
        <div className="max-w-3xl mx-auto py-32 px-5 text-center">
          <h2 className="text-2xl font-bold text-slate-900">Product not found</h2>
          <button onClick={() => navigate('/catalog')} className="mt-4 text-emerald-700 font-semibold">Back to Catalog</button>
        </div>
      </CatalogShell>
    );
  }

  const specs = product.specifications || {};

  return (
    <CatalogShell>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 pt-6">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link to="/" className="hover:text-emerald-700">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/catalog" className="hover:text-emerald-700">Catalog</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-700">{product.category}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-10 lg:py-14 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-6">
          <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl overflow-hidden border border-slate-200 aspect-square relative">
            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
            {product.availability === 'in_stock' ? (
              <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" /> In Stock
              </span>
            ) : (
              <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 bg-amber-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                <Clock className="w-3.5 h-3.5" /> Lead Time {product.lead_time_weeks}w
              </span>
            )}
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="text-[11px] uppercase tracking-[0.2em] font-semibold text-emerald-700 mb-3">{product.category}</div>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-[1.15]">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3 text-sm text-slate-600">
            <span className="font-semibold text-slate-800">{product.manufacturer}</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span>Model {product.model}</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span className="font-mono text-xs">{product.sku}</span>
          </div>

          <p className="mt-6 text-slate-600 leading-relaxed">{product.long_description}</p>

          <div className="mt-7 p-5 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-white border border-emerald-100">
            <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Indicative Price</div>
            <div className="text-3xl font-bold text-slate-900 mt-1">${product.price_usd.toLocaleString()} <span className="text-sm font-normal text-slate-500">USD ex-works</span></div>
            <div className="text-xs text-slate-500 mt-1">Contact us for tailored configurations, training packages and after-sales programs.</div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <Badge icon={ShieldCheck} title="Warranty" value={`${product.warranty_months} months`} />
            <Badge icon={Truck} title="Delivery" value={product.availability === 'in_stock' ? 'In Stock' : `${product.lead_time_weeks} weeks`} />
            <Badge icon={Wrench} title="Engineering" value="Full Support" />
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#quote" className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3.5 rounded-full font-semibold shadow-md">
              Request Quote <Send className="w-4 h-4" />
            </a>
            <button onClick={() => toast.success('Datasheet sent to your email')} className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-emerald-300 text-slate-800 px-6 py-3.5 rounded-full font-semibold">
              <Download className="w-4 h-4" /> Datasheet
            </button>
          </div>

          {product.certifications && product.certifications.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {product.certifications.map(c => (
                <span key={c} className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                  <Award className="w-3 h-3" /> {c}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tabs */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-10 border-t border-slate-100">
        <div className="flex gap-2 border-b border-slate-200 mb-8 overflow-x-auto">
          {([
            { id: 'specs' as const, label: 'Specifications' },
            { id: 'features' as const, label: 'Key Features' },
            { id: 'applications' as const, label: 'Applications' },
          ]).map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all ${tab === t.id ? 'border-emerald-700 text-emerald-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'specs' && (
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4 max-w-4xl">
            {Object.entries(specs).map(([k, v]) => (
              <div key={k} className="flex items-start justify-between border-b border-slate-100 py-3">
                <div className="text-sm text-slate-500 capitalize">{k.replace(/_/g, ' ')}</div>
                <div className="text-sm font-semibold text-slate-900 text-right max-w-[60%]">{String(v)}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'features' && (
          <ul className="grid sm:grid-cols-2 gap-3 max-w-4xl">
            {(product.features || []).map(f => (
              <li key={f} className="flex items-start gap-3 bg-slate-50 rounded-xl p-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 mt-0.5 shrink-0" />
                <span className="text-slate-800 text-sm">{f}</span>
              </li>
            ))}
          </ul>
        )}

        {tab === 'applications' && (
          <div className="flex flex-wrap gap-2 max-w-4xl">
            {(product.applications || []).map(a => (
              <span key={a} className="bg-white border border-slate-200 text-slate-700 text-sm px-4 py-2 rounded-full">{a}</span>
            ))}
          </div>
        )}
      </section>

      {/* Quote Form */}
      <section id="quote" className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 text-white py-20">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="text-[11px] uppercase tracking-[0.2em] font-semibold text-emerald-300 mb-4">Request a Quote</div>
            <h2 className="text-3xl lg:text-4xl font-bold leading-tight">Get a tailored proposal for {product.name}.</h2>
            <p className="mt-4 text-emerald-100/80 text-sm leading-relaxed">
              Our team will respond within one business day with pricing, configuration options, lead time and an installation plan tailored to your facility.
            </p>
            <div className="mt-8 space-y-3 text-sm text-emerald-100/90">
              <div className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-emerald-300" /> Free configuration consultation</div>
              <div className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-emerald-300" /> Installation & commissioning included</div>
              <div className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-emerald-300" /> Training & after-sales support</div>
              <div className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-emerald-300" /> Long-term reagent & spare parts supply</div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-3xl p-8 text-slate-900">
            {sent ? (
              <div className="py-10 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-8 h-8 text-emerald-700" />
                </div>
                <h3 className="text-2xl font-bold">Thank you, {form.full_name}.</h3>
                <p className="mt-2 text-slate-600">Your quote request for <strong>{product.name}</strong> has been received. Our team will be in touch within one business day.</p>
                <Link to="/catalog" className="mt-6 inline-block text-emerald-700 font-semibold text-sm">Continue browsing equipment →</Link>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Full Name *" required value={form.full_name} onChange={v => setForm({ ...form, full_name: v })} />
                  <Input label="Email *" type="email" required value={form.email} onChange={v => setForm({ ...form, email: v })} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Phone" value={form.phone} onChange={v => setForm({ ...form, phone: v })} />
                  <Input label="Organization" value={form.organization} onChange={v => setForm({ ...form, organization: v })} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Country" value={form.country} onChange={v => setForm({ ...form, country: v })} />
                  <div>
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Quantity</label>
                    <input type="number" min={1} value={form.quantity} onChange={e => setForm({ ...form, quantity: parseInt(e.target.value || '1') })} className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Project details</label>
                  <textarea rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder={`Tell us about your facility and intended use of the ${product.name}...`} className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 resize-none" />
                </div>
                <button disabled={submitting} type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3.5 rounded-full transition-all disabled:opacity-60">
                  {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : <>Submit Quote Request <Send className="w-4 h-4" /></>}
                </button>
                <p className="text-xs text-slate-500 text-center">Lead created in ECOMED CRM. We respond within 1 business day.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-5 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Related Equipment</h2>
            <Link to="/catalog" className="text-sm font-semibold text-emerald-700 inline-flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map(r => (
              <Link to={`/catalog/${r.slug}`} key={r.id} className="group bg-white border border-slate-200/70 rounded-2xl overflow-hidden hover:border-emerald-300 hover:shadow-xl transition-all">
                <div className="aspect-[4/3] overflow-hidden bg-slate-50">
                  <img src={r.image_url} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-5">
                  <div className="text-[10px] uppercase tracking-wider font-bold text-emerald-700 mb-1">{r.manufacturer}</div>
                  <h3 className="font-bold text-slate-900 text-sm leading-tight line-clamp-2">{r.name}</h3>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-sm font-bold text-slate-900">${r.price_usd.toLocaleString()}</div>
                    <span className="text-xs text-emerald-700 font-semibold">View →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-5 lg:px-8 pb-10">
        <Link to="/catalog" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-700 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Link>
      </div>
    </CatalogShell>
  );
};

const Badge: React.FC<{ icon: any; title: string; value: string }> = ({ icon: Icon, title, value }) => (
  <div className="bg-white border border-slate-200 rounded-2xl p-3 text-center">
    <Icon className="w-4 h-4 text-emerald-700 mx-auto" />
    <div className="text-[10px] uppercase tracking-wider text-slate-500 mt-1.5">{title}</div>
    <div className="text-xs font-bold text-slate-900 mt-0.5">{value}</div>
  </div>
);

const Input: React.FC<{ label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }> = ({ label, value, onChange, type = 'text', required }) => (
  <div>
    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">{label}</label>
    <input type={type} required={required} value={value} onChange={e => onChange(e.target.value)} className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500" />
  </div>
);

export default ProductDetailPage;
