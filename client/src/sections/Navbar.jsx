import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import Button from '../components/ui/Button';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', target: '#home', id: 'home' },
    { name: 'About', target: '#about', id: 'about' },
    { name: 'Skills', target: '#skills', id: 'skills' },
    { name: 'Projects', target: '#projects', id: 'projects' },
    { name: 'Experience', target: '#experience', id: 'experience' },
    { name: 'Services', target: '#services', id: 'services' },
    { name: 'Education', target: '#education', id: 'education' },
    { name: 'Contact', target: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine active section based on scroll position using viewport bounds
      let currentSection = 'home';
      const threshold = 180; // distance in pixels from viewport top to check active state

      for (const link of navLinks) {
        const el = document.querySelector(link.target);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold && rect.bottom > threshold) {
            currentSection = link.id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    // Initialize active section on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling while mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    }
    return () => {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    };
  }, [isOpen]);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false);
    
    const target = document.querySelector(targetId);
    if (target) {
      const headerOffset = 65;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Manually set active section to prevent lag-based jumps
      setActiveSection(targetId.substring(1));
    }
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 100,
          display: 'flex',
          justifyContent: 'center',
          padding: scrolled ? '1.25rem 2rem' : '1.75rem 2rem',
          transition: 'padding 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none' /* Allows clicks to pass through to sections underneath */
        }}
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: scrolled ? '820px' : '1100px',
            height: '60px',
            padding: '0 1.75rem',
            borderRadius: '99px',
            backgroundColor: scrolled ? 'rgba(11, 15, 25, 0.65)' : 'rgba(11, 15, 25, 0.3)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(255, 255, 255, 0.04)',
            boxShadow: scrolled ? '0 12px 40px rgba(0, 0, 0, 0.5)' : 'none',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: 'auto' /* Re-enables pointer events for navbar itself */
          }}
        >
          {/* Logo signature */}
          <a 
            href="#home" 
            onClick={(e) => handleLinkClick(e, '#home')}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              fontWeight: '800',
              letterSpacing: '-0.03em',
              display: 'flex',
              alignItems: 'center',
              color: '#FFFFFF'
            }}
          >
            Kayas<span style={{ color: 'var(--accent-gold)' }}>.</span>
          </a>

          {/* Desktop Capsule Links */}
          <div style={{ display: 'none', alignItems: 'center', gap: '1.5rem' }} className="nav-desktop">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.target}
                    onClick={(e) => handleLinkClick(e, link.target)}
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.55)',
                      position: 'relative',
                      padding: '0.5rem 1.1rem',
                      borderRadius: '99px',
                      transition: 'color 0.3s ease',
                      display: 'inline-block'
                    }}
                    className="nav-item-link"
                  >
                    <span style={{ position: 'relative', zIndex: 3 }}>{link.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavBackground"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          borderRadius: '99px',
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                          zIndex: 1,
                        }}
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      />
                    )}
                  </a>
                );
              })}
          </div>
          </div>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: 'flex',
              color: '#FFFFFF',
              fontSize: '1.25rem',
              cursor: 'pointer',
              zIndex: 101,
              background: 'none',
              border: 'none',
              padding: '8px',
              borderRadius: '8px',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            className="nav-mobile-toggle"
            aria-label="Toggle navigation menu"
          >
            <motion.div
              key={isOpen ? 'close' : 'open'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {isOpen ? <FaTimes style={{ fontSize: '1.4rem' }} /> : <FaBars style={{ fontSize: '1.3rem' }} />}
            </motion.div>
          </button>
        </motion.div>
      </header>

      {/* Mobile Glass Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: '80px',
              left: '1.5rem',
              right: '1.5rem',
              maxWidth: '480px',
              margin: '0 auto',
              backgroundColor: 'rgba(11, 15, 25, 0.96)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 24px 48px rgba(0, 0, 0, 0.8)',
              padding: '2rem 1.5rem',
              zIndex: 99,
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.target}
                onClick={(e) => handleLinkClick(e, link.target)}
                style={{
                  fontSize: '1.05rem',
                  fontWeight: '600',
                  color: activeSection === link.id ? 'var(--accent-gold)' : '#FFFFFF',
                  padding: '0.6rem 0.5rem',
                  borderRadius: '12px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
                  transition: 'var(--transition-fast)'
                }}
              >
                {link.name}
              </a>
            ))}
            <Button variant="primary" onClick={(e) => handleLinkClick(e, '#contact')} style={{ marginTop: '0.5rem' }}>
              Get in Touch
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-mobile-toggle {
          display: flex;
        }
        .nav-item-link:hover {
          color: #FFFFFF !important;
        }
        @media (min-width: 992px) {
          .nav-desktop {
            display: flex !important;
          }
          .nav-mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
