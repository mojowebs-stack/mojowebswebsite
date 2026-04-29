import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact', to: '/contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-[900] transition-all duration-500 ${scrolled ? 'nav-glass' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-7 h-7 border border-chrome-faint group-hover:border-gold transition-colors duration-300 flex items-center justify-center">
              <div className="w-2 h-2 bg-chrome-dim group-hover:bg-gold transition-colors duration-300" />
            </div>
            <span className="font-display text-xl font-light tracking-widest text-chrome">
              MOJO<span className="text-chrome-dim">WEBS</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-10">
            {links.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="relative mono-label group"
              >
                <span className={`transition-colors duration-300 ${location.pathname === to ? 'text-chrome' : 'text-chrome-dim hover:text-chrome'}`}>
                  {label}
                </span>
                {location.pathname === to && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-gold"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <Link to="/contact" className="hidden md:flex btn-primary text-xs">
            <span>Start a Project</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          {/* Hamburger */}
          <button
            className="md:hidden w-10 h-10 flex flex-col justify-center gap-1.5 items-center"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="w-6 h-px bg-chrome block"
              animate={{ rotate: open ? 45 : 0, y: open ? 4 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-6 h-px bg-chrome block"
              animate={{ opacity: open ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="w-6 h-px bg-chrome block"
              animate={{ rotate: open ? -45 : 0, y: open ? -4 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[800] bg-void flex flex-col justify-center px-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <nav className="flex flex-col gap-8">
              {links.map(({ label, to }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    to={to}
                    className={`display-xl text-5xl ${location.pathname === to ? 'text-chrome' : 'text-chrome-faint hover:text-chrome'} transition-colors duration-300`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-12">
              <Link to="/contact" className="btn-primary inline-flex">
                Start a Project →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
