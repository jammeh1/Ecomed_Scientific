import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LOGO } from '@/lib/ecomed-data';

type ActiveSection = 'home' | 'solutions' | 'diagnostics' | 'engineering' | 'projects' | 'about' | 'insights' | 'contact';

interface Props {
  onPortal: () => void;
  onContact: () => void;
  onSectionChange?: (section: ActiveSection) => void;
  activeSection?: ActiveSection;
}

const links: { label: string; href: string; type: string; section?: ActiveSection }[] = [
  { label: 'Solutions', href: '#solutions', type: 'anchor', section: 'solutions' },
  { label: 'Catalog', href: '/catalog', type: 'route' },
  { label: 'Diagnostics', href: '#diagnostics', type: 'anchor', section: 'diagnostics' },
  { label: 'Engineering', href: '#engineering', type: 'anchor', section: 'engineering' },
  { label: 'Projects', href: '#projects', type: 'anchor', section: 'projects' },
  { label: 'About', href: '#about', type: 'anchor', section: 'about' },
  { label: 'Insights', href: '#insights', type: 'anchor', section: 'insights' },
];

const Navbar: React.FC<Props> = ({ onPortal, onContact, onSectionChange, activeSection }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (href: string, type: string, section?: ActiveSection) => {
    setOpen(false);
    if (type === 'route') {
      navigate(href);
      return;
    }
    if (onSectionChange && section) {
      onSectionChange(section);
      return;
    }
    if (location.pathname !== '/') {
      navigate('/' + href);
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    if (onSectionChange) onSectionChange('home');
  };

  return (

    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || location.pathname !== '/' ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-emerald-100/60' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between h-20">
        <Link to="/" onClick={handleLogoClick} className="flex items-center gap-3">
          <img src={LOGO} alt="ECOMED" className="h-11 w-11 rounded-lg object-cover bg-white p-1 ring-1 ring-emerald-100" />
          <div className="leading-tight">
            <div className="font-bold text-[15px] tracking-tight text-slate-900">ECOMED</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-emerald-700/80 font-medium">Scientific Limited</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map(l => (
            <button key={l.href} onClick={() => handleClick(l.href, l.type, l.section)} className={`text-[13.5px] font-medium transition-colors relative group ${activeSection === l.section ? 'text-emerald-700' : 'text-slate-700 hover:text-emerald-700'}`}>
              {l.label}
              <span className={`absolute -bottom-1 left-0 h-px bg-emerald-600 transition-all duration-300 ${activeSection === l.section ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button onClick={onPortal} className="text-[13.5px] font-medium text-slate-700 hover:text-emerald-700 px-3 py-2">
            Client Portal
          </button>
          <button onClick={onContact} className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-[13.5px] font-medium px-5 py-2.5 rounded-full transition-all shadow-sm hover:shadow-emerald-600/30">
            <Phone className="w-4 h-4" /> Consultation
          </button>
        </div>

        <button className="lg:hidden p-2 text-slate-800" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-emerald-100 px-5 py-5 space-y-1">
          {links.map(l => (
            <button key={l.href} onClick={() => handleClick(l.href, l.type, l.section)} className={`block w-full text-left py-2.5 font-medium border-b border-slate-100 ${activeSection === l.section ? 'text-emerald-700' : 'text-slate-800'}`}>
              {l.label}
            </button>
          ))}
          <button onClick={() => { setOpen(false); onPortal(); }} className="block w-full text-left py-2.5 text-slate-800 font-medium border-b border-slate-100">Client Portal</button>
          <button onClick={() => { setOpen(false); onContact(); }} className="w-full mt-3 bg-emerald-700 text-white py-3 rounded-full font-medium">Request Consultation</button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
