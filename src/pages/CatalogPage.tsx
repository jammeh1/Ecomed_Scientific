import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import CatalogShell from '@/components/ecomed/CatalogShell';
import { Search, SlidersHorizontal, X, ArrowRight, CheckCircle2, Clock, Loader2 } from 'lucide-react';

interface Equipment {
  id: string;
  sku: string;
  name: string;
  slug: string;
  category: string;
  manufacturer: string;
  model: string;
  short_description: string;
  image_url: string;
  price_usd: number;
  availability: string;
  lead_time_weeks: number;
  is_featured: boolean;
}

const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $1,000', min: 0, max: 1000 },
  { label: '$1,000 – $10,000', min: 1000, max: 10000 },
  { label: '$10,000 – $50,000', min: 10000, max: 50000 },
  { label: '$50,000 – $100,000', min: 50000, max: 100000 },
  { label: 'Over $100,000', min: 100000, max: Infinity },
];

const CatalogPage: React.FC = () => {
  const [items, setItems] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [manufacturer, setManufacturer] = useState<string>('All');
  const [priceIdx, setPriceIdx] = useState(0);
  const [availability, setAvailability] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState('featured');

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('ecomed_equipment').select('*').order('is_featured', { ascending: false });
      if (data) setItems(data as Equipment[]);
      setLoading(false);
    })();
  }, []);

  const categories = useMemo(() => ['All', ...Array.from(new Set(items.map(i => i.category)))], [items]);
  const manufacturers = useMemo(() => ['All', ...Array.from(new Set(items.map(i => i.manufacturer)))], [items]);

  const filtered = useMemo(() => {
    let list = items.filter(i => {
      if (search && !`${i.name} ${i.manufacturer} ${i.model} ${i.sku}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (category !== 'All' && i.category !== category) return false;
      if (manufacturer !== 'All' && i.manufacturer !== manufacturer) return false;
      const pr = PRICE_RANGES[priceIdx];
      if (i.price_usd < pr.min || i.price_usd > pr.max) return false;
      if (availability !== 'All' && i.availability !== availability) return false;
      return true;
    });
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price_usd - b.price_usd);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price_usd - a.price_usd);
    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [items, search, category, manufacturer, priceIdx, availability, sort]);

  const clearFilters = () => {
    setSearch(''); setCategory('All'); setManufacturer('All'); setPriceIdx(0); setAvailability('All');
  };

  const activeCount = (category !== 'All' ? 1 : 0) + (manufacturer !== 'All' ? 1 : 0) + (priceIdx !== 0 ? 1 : 0) + (availability !== 'All' ? 1 : 0);

  return (
    <CatalogShell>
      {/* Header */}
      <section className="bg-gradient-to-br from-emerald-50/60 via-white to-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14 lg:py-20">
          <div className="text-[11px] uppercase tracking-[0.2em] font-semibold text-emerald-700 mb-4">Equipment Catalog</div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1] max-w-2xl">
                Browse our medical & laboratory equipment portfolio.
              </h1>
              <p className="mt-4 text-slate-600 max-w-xl">
                {items.length}+ products from leading global manufacturers — request a tailored quote in minutes.
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-full px-4 py-3 shadow-sm w-full lg:w-96">
              <Search className="w-5 h-5 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search equipment, model, SKU..." className="flex-1 bg-transparent outline-none text-sm" />
              {search && <button onClick={() => setSearch('')}><X className="w-4 h-4 text-slate-400" /></button>}
            </div>
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-10 lg:py-14 grid lg:grid-cols-12 gap-8">
        {/* Mobile toggle */}
        <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2.5 text-sm font-medium">
          <SlidersHorizontal className="w-4 h-4" /> Filters {activeCount > 0 && <span className="bg-emerald-700 text-white text-xs px-2 py-0.5 rounded-full">{activeCount}</span>}
        </button>

        <aside className={`lg:col-span-3 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sticky top-28">
            <div className="flex items-center justify-between mb-5">
              <div className="font-bold text-slate-900 flex items-center gap-2"><SlidersHorizontal className="w-4 h-4" /> Filters</div>
              {activeCount > 0 && <button onClick={clearFilters} className="text-xs text-emerald-700 font-semibold">Clear all</button>}
            </div>

            <FilterGroup label="Category">
              {categories.map(c => (
                <Choice key={c} active={category === c} onClick={() => setCategory(c)} label={c} count={c === 'All' ? items.length : items.filter(i => i.category === c).length} />
              ))}
            </FilterGroup>

            <FilterGroup label="Manufacturer">
              <select value={manufacturer} onChange={e => setManufacturer(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500">
                {manufacturers.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </FilterGroup>

            <FilterGroup label="Price Range">
              {PRICE_RANGES.map((p, i) => (
                <Choice key={p.label} active={priceIdx === i} onClick={() => setPriceIdx(i)} label={p.label} />
              ))}
            </FilterGroup>

            <FilterGroup label="Availability">
              {[
                { v: 'All', l: 'All' },
                { v: 'in_stock', l: 'In Stock' },
                { v: 'lead_time', l: 'Lead Time' },
              ].map(a => (
                <Choice key={a.v} active={availability === a.v} onClick={() => setAvailability(a.v)} label={a.l} />
              ))}
            </FilterGroup>
          </div>
        </aside>

        <div className="lg:col-span-9">
          <div className="flex items-center justify-between mb-5">
            <div className="text-sm text-slate-600">{loading ? 'Loading...' : `${filtered.length} of ${items.length} products`}</div>
            <select value={sort} onChange={e => setSort(e.target.value)} className="bg-white border border-slate-200 rounded-full px-4 py-2 text-sm outline-none focus:border-emerald-500">
              <option value="featured">Featured</option>
              <option value="name">Name (A-Z)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {loading ? (
            <div className="py-20 flex items-center justify-center text-slate-400"><Loader2 className="w-6 h-6 animate-spin" /></div>
          ) : filtered.length === 0 ? (
            <div className="bg-slate-50 rounded-2xl p-16 text-center">
              <div className="text-slate-700 font-semibold">No products match your filters</div>
              <button onClick={clearFilters} className="mt-4 text-emerald-700 font-semibold text-sm">Clear filters</button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map(p => <ProductCard key={p.id} p={p} />)}
            </div>
          )}
        </div>
      </section>
    </CatalogShell>
  );
};

const FilterGroup: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="mb-6">
    <div className="text-[10px] uppercase tracking-[0.18em] font-bold text-slate-500 mb-3">{label}</div>
    <div className="space-y-1.5">{children}</div>
  </div>
);

const Choice: React.FC<{ active: boolean; onClick: () => void; label: string; count?: number }> = ({ active, onClick, label, count }) => (
  <button onClick={onClick} className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-sm transition-all ${active ? 'bg-emerald-50 text-emerald-900 font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}>
    <span>{label}</span>
    {count !== undefined && <span className="text-xs text-slate-400">{count}</span>}
  </button>
);

const ProductCard: React.FC<{ p: Equipment }> = ({ p }) => (
  <Link to={`/catalog/${p.slug}`} className="group bg-white border border-slate-200/70 rounded-2xl overflow-hidden hover:border-emerald-300 hover:shadow-xl transition-all flex flex-col">
    <div className="aspect-[4/3] bg-slate-50 overflow-hidden relative">
      <img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      {p.is_featured && (
        <span className="absolute top-3 left-3 bg-emerald-700 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full">Featured</span>
      )}
      <span className={`absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full ${p.availability === 'in_stock' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
        {p.availability === 'in_stock' ? <><CheckCircle2 className="w-3 h-3" /> In Stock</> : <><Clock className="w-3 h-3" /> {p.lead_time_weeks}w</>}
      </span>
    </div>
    <div className="p-5 flex-1 flex flex-col">
      <div className="text-[10px] uppercase tracking-[0.15em] font-bold text-emerald-700 mb-1.5">{p.category}</div>
      <h3 className="font-bold text-slate-900 leading-tight line-clamp-2">{p.name}</h3>
      <div className="text-xs text-slate-500 mt-1">{p.manufacturer} • {p.model}</div>
      <p className="text-sm text-slate-600 mt-3 line-clamp-2 flex-1">{p.short_description}</p>
      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider">From</div>
          <div className="font-bold text-slate-900">${p.price_usd.toLocaleString()}</div>
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 group-hover:gap-2 transition-all">
          View details <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  </Link>
);

export default CatalogPage;
