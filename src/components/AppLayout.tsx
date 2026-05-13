import React, { useState } from 'react';
import Navbar from './ecomed/Navbar';
import Hero from './ecomed/Hero';
import About from './ecomed/About';
import Services from './ecomed/Services';
import Diagnostics from './ecomed/Diagnostics';
import Engineering from './ecomed/Engineering';
import Projects from './ecomed/Projects';
import Industries from './ecomed/Industries';
import Team from './ecomed/Team';
import Insights from './ecomed/Insights';
import Contact from './ecomed/Contact';
import Footer from './ecomed/Footer';
import CustomerPortal from './ecomed/CustomerPortal';
import AdminDashboard from './ecomed/AdminDashboard';

// Maps each nav anchor to which section component to show
// 'home' is the default state — shows Hero + all sections
type ActiveSection = 'home' | 'solutions' | 'diagnostics' | 'engineering' | 'projects' | 'about' | 'insights' | 'contact';

const AppLayout: React.FC = () => {
  const [portalOpen, setPortalOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<ActiveSection>('home');

  const handleNavSection = (section: ActiveSection) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollContact = () => {
    handleNavSection('contact');
  };

  const isHome = activeSection === 'home';

  return (
    <div className="min-h-screen bg-white font-sans antialiased text-slate-900" style={{ fontFamily: '"Inter", "Manrope", system-ui, -apple-system, sans-serif' }}>
      <Navbar
        onPortal={() => setPortalOpen(true)}
        onContact={scrollContact}
        onSectionChange={handleNavSection}
        activeSection={activeSection}
      />

      {/* Home / default: show all sections */}
      {isHome && (
        <>
          <Hero onContact={scrollContact} />
          <About />
          <Services />
          <Diagnostics />
          <Engineering />
          <Projects />
          <Industries />
          <Team />
          <Insights />
          <Contact />
        </>
      )}

      {/* Individual sections */}
      {activeSection === 'solutions' && <Services />}
      {activeSection === 'diagnostics' && <Diagnostics />}
      {activeSection === 'engineering' && <Engineering />}
      {activeSection === 'projects' && <Projects />}
      {activeSection === 'about' && <About />}
      {activeSection === 'insights' && <Insights />}
      {activeSection === 'contact' && <Contact />}

      {/* Footer always visible */}
      <Footer onAdmin={() => setAdminOpen(true)} />

      <CustomerPortal open={portalOpen} onClose={() => setPortalOpen(false)} />
      <AdminDashboard open={adminOpen} onClose={() => setAdminOpen(false)} />
    </div>
  );
};

export default AppLayout;
