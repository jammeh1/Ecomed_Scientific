import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CustomerPortal from './CustomerPortal';
import AdminDashboard from './AdminDashboard';

const CatalogShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [portalOpen, setPortalOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  const goContact = () => navigate('/#contact');

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: '"Inter", "Manrope", system-ui, sans-serif' }}>
      <Navbar onPortal={() => setPortalOpen(true)} onContact={goContact} />
      <div className="pt-20">{children}</div>
      <Footer onAdmin={() => setAdminOpen(true)} />
      <CustomerPortal open={portalOpen} onClose={() => setPortalOpen(false)} />
      <AdminDashboard open={adminOpen} onClose={() => setAdminOpen(false)} />
    </div>
  );
};

export default CatalogShell;
