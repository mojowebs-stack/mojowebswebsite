import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import FloatingHand from './FloatingHand';

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  in:      { opacity: 1,  y: 0 },
  out:     { opacity: 0,  y: -16 },
};

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <>
      <Nav />
      <FloatingHand />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={{ type: 'tween', duration: 0.55 }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  );
}
