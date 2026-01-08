
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Phone, Menu, X, Facebook, Twitter, Instagram, Heart, User } from 'lucide-react';
import { useData } from '../context/MockDataContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { currentUser } = useData();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Impact', path: '/impact' },
    { name: 'Publication', path: '/publication' },
    { name: 'Get Involved', path: '/get-involved' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-50 bg-white shadow-md transition-all duration-300 ${isScrolled ? 'py-1' : 'py-0'}`}>
      {/* Top Bar - Hides on scroll for "collapse" effect */}
      <div className={`hidden md:flex bg-slate-900 text-white px-6 justify-between items-center text-sm transition-all duration-300 origin-top ${isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-10 opacity-100 py-2'}`}>
        <div className="flex gap-4">
          <a href="mailto:info@apdfe.org" className="flex items-center gap-2 hover:text-green-400 transition-colors">
            <Mail size={14} /> info@apdfe.org
          </a>
          <a href="tel:+250788123456" className="flex items-center gap-2 hover:text-green-400 transition-colors">
            <Phone size={14} /> +250 788 123 456
          </a>
        </div>
        <div className="flex gap-4">
          <Facebook size={16} className="cursor-pointer hover:text-blue-400" />
          <Twitter size={16} className="cursor-pointer hover:text-blue-400" />
          <Instagram size={16} className="cursor-pointer hover:text-pink-400" />
          {currentUser ? (
             <Link to="/dashboard" className="flex items-center gap-2 text-blue-400 font-bold hover:text-white transition-colors ml-4">
               <User size={14} /> Dashboard
             </Link>
          ) : (
            <Link to="/login" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors ml-4">
              <User size={14} /> Staff Login
            </Link>
          )}
        </div>
      </div>

      <div className={`max-w-7xl mx-auto px-4 flex justify-between items-center transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/apdfe-logo.png" 
            alt="A.P.D.F.E Logo" 
            className={`w-auto object-contain transition-all duration-300 ${isScrolled ? 'h-8' : 'h-12'}`} 
            onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/48x48?text=AP'; }} 
          />
          <div className="flex flex-col">
            <span className={`font-bold tracking-tight text-blue-900 leading-none transition-all duration-300 ${isScrolled ? 'text-lg' : 'text-xl'}`}>A.P.D.F.E</span>
            {!isScrolled && <span className="text-[10px] uppercase font-semibold text-green-600 tracking-wider animate-in fade-in duration-500">Building Better Futures</span>}
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-semibold transition-colors hover:text-blue-600 ${isActive(link.path) ? 'text-blue-600' : 'text-slate-600'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/donate" className={`bg-green-500 hover:bg-green-600 text-white rounded-full font-bold shadow-lg transition-all active:scale-95 flex items-center gap-2 ${isScrolled ? 'px-4 py-2 text-xs' : 'px-6 py-2.5 text-sm'}`}>
            <Heart size={16} /> Donate Now
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t p-6 shadow-xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-lg font-semibold py-2 ${isActive(link.path) ? 'text-blue-600' : 'text-slate-600'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/donate" onClick={() => setIsOpen(false)} className="bg-green-500 text-white px-6 py-3 rounded-lg text-center font-bold">
            Donate Now
          </Link>
          <Link to={currentUser ? "/dashboard" : "/login"} onClick={() => setIsOpen(false)} className="bg-slate-900 text-white px-6 py-3 rounded-lg text-center font-bold">
            {currentUser ? 'Dashboard' : 'Staff Login'}
          </Link>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
             <div className="bg-white p-2 rounded">
               <img src="https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/apdfe-logo.png" alt="Logo" className="h-10 w-auto" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/48x48?text=AP'; }} />
             </div>
             <span className="text-2xl font-bold text-white tracking-tight">A.P.D.F.E</span>
          </div>
          <p className="text-sm leading-relaxed">
            Building Better Futures Together across Central Africa through health, education, empowerment, and peace-building. Survivor-led and community-driven.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 transition-colors"><Facebook size={18} /></a>
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-sky-400 transition-colors"><Twitter size={18} /></a>
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-pink-500 transition-colors"><Instagram size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/programs" className="hover:text-white transition-colors">Programs</Link></li>
            <li><Link to="/impact" className="hover:text-white transition-colors">Impact</Link></li>
            <li><Link to="/publication" className="hover:text-white transition-colors">Publication</Link></li>
            <li><Link to="/get-involved" className="hover:text-white transition-colors">Get Involved</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Ways to Help</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/donate" className="hover:text-white transition-colors">Donate</Link></li>
            <li><Link to="/get-involved" className="hover:text-white transition-colors">Volunteer</Link></li>
            <li><Link to="/get-involved" className="hover:text-white transition-colors text-nowrap">Partner With Us</Link></li>
            <li><Link to="/get-involved" className="hover:text-white transition-colors">Careers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Contact Info</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3"><Mail size={16} className="text-green-500" /> info@apdfe.org</li>
            <li className="flex items-center gap-3"><Phone size={16} className="text-green-500" /> +250 788 123 456</li>
            <li className="flex items-start gap-3 text-nowrap">
              <span className="text-green-500">📍</span>
              Kigali, Rwanda (Regional Head Office)
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-800 text-center text-xs">
        <p>© 2025 A.P.D.F.E (Action Pour le Développement de la Femme et de l'Enfant) | All Rights Reserved</p>
        <p className="mt-2 text-slate-500">Registered Humanitarian Organization | Survivor-Led | Community-Driven | <Link to="/login" className="underline">Staff Portal</Link></p>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith('/dashboard');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      {!isDashboard && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
};
