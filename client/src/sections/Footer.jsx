import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaCode, FaArrowUp, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaYoutube } from 'react-icons/fa';
import { personalInfo } from '../data/data';

export default function Footer() {
  const [hoveredLogoIndex, setHoveredLogoIndex] = useState(null);

  const scrolltoTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Me', href: '#about' },
    { name: 'Technical Skills', href: '#skills' },
    { name: 'Featured Work', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Services Offered', href: '#services' },
    { name: 'Education Info', href: '#education' },
    { name: 'Contact Me', href: '#contact' },
  ];

  const faangLogos = [
    {
      name: 'Meta',
      color: '#0081FB',
      glow: 'rgba(0, 129, 251, 0.45)',
      icon: (isHovered) => (
        <svg viewBox="0 0 24 24" style={{ width: '25px', height: '25px' }}>
          <defs>
            <linearGradient id="metaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0081FB" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
          </defs>
          <path 
            fill={isHovered ? 'url(#metaGrad)' : 'currentColor'} 
            d="M16.48 6c-2.42 0-4.38 1.56-5.28 3.52C10.3 7.56 8.34 6 5.92 6 2.66 6 0 8.66 0 11.92s2.66 5.92 5.92 5.92c2.42 0 4.38-1.56 5.28-3.52.9 1.96 2.86 3.52 5.28 3.52 3.26 0 5.92-2.66 5.92-5.92S19.74 6 16.48 6zm-10.56 9.84c-2.16 0-3.92-1.76-3.92-3.92s1.76-3.92 3.92-3.92c1.48 0 2.76.84 3.42 2.08-.82 1.52-2.02 2.72-3.42 3.84v-.08zm10.56 0c-1.4 0-2.6-1.2-3.42-2.72.82-1.52 2.02-2.72 3.42-3.84 2.16 0 3.92 1.76 3.92 3.92s-1.76 3.92-3.92 3.92z" 
          />
        </svg>
      )
    },
    {
      name: 'Amazon',
      color: '#FF9900',
      glow: 'rgba(255, 153, 0, 0.45)',
      icon: (isHovered) => (
        <svg viewBox="0 0 24 24" style={{ width: '25px', height: '25px' }}>
          {/* Letter a is white, smile arrow is orange on hover */}
          <path fill={isHovered ? '#FFFFFF' : 'currentColor'} d="M16.34 11.02c-1.54 0-3.43.34-4.8 1.15-.9.53-1.63 1.34-1.63 2.5 0 1.98 1.63 3.03 3.54 3.03 1.83 0 3.16-1.02 3.73-2.1v1.75h2.15v-6.33c0-2.22-1.42-3.52-4.14-3.52-2.3 0-4.32 1.05-4.66 2.85l1.94.26c.21-.92 1.25-1.45 2.58-1.45 1.54 0 2.27.77 2.27 1.88v.7c-.52-.3-1.85-.72-3.03-.72zm.76 4.67c-.28.84-1.22 1.48-2.33 1.48-1.12 0-1.87-.58-1.87-1.55 0-1.07.82-1.6 2.04-1.6.72 0 1.69.21 2.16.48v1.19z" />
          <path fill={isHovered ? '#FF9900' : 'currentColor'} d="M22.25 20.3c-4.4 2.92-11.23 3.9-16.73 2.1-.9-.3-1.85-.73-2.58-1.35-.45-.37-.15-.95.4-.76 5.23 1.83 12.33 1.4 16.92-1.56.5-.32.9.22.4.6zm.25-2.5c-.1-.7-.7-2.3-1.5-2.8-.5-.3-1.1.1-1.3.3-.2.2 0 .5.2.6.7.4 1.1 1.2 1.2 1.8 0 .4.4.5.7.2.3-.2.5-.5.7-.7z" />
        </svg>
      )
    },
    {
      name: 'Apple',
      color: '#FFFFFF',
      glow: 'rgba(255, 255, 255, 0.35)',
      icon: (isHovered) => (
        <svg viewBox="0 0 24 24" fill={isHovered ? '#FFFFFF' : 'currentColor'} style={{ width: '23px', height: '23px' }}>
          <path d="M17.05 20.28c-.98.95-2.05 1.88-3.08 1.88-1.02 0-1.4-.61-2.55-.61-1.16 0-1.57.59-2.55.61-1 .02-2.13-1-3.11-1.97-2-1.96-3.52-5.53-3.52-8.88 0-5.32 3.46-8.14 6.87-8.14 1.08 0 2.1.66 2.77.66.66 0 1.9-.79 3.2-.79 1.35 0 2.57.49 3.37 1.35-2.87 1.73-2.4 5.43.5 6.6-1.07 2.6-2.5 4.8-3.5 6.22zM15.03 2.65c.87-1.04 1.4-2.5 1.22-3.93-1.23.05-2.73.82-3.62 1.86-.78.9-1.46 2.37-1.28 3.78 1.37.1 2.8-.67 3.68-1.71z" />
        </svg>
      )
    },
    {
      name: 'Netflix',
      color: '#E50914',
      glow: 'rgba(229, 9, 20, 0.45)',
      icon: (isHovered) => (
        <svg viewBox="0 0 24 24" fill={isHovered ? '#E50914' : 'currentColor'} style={{ width: '21px', height: '21px' }}>
          <path d="M5.5 2h3.5v13.3L15.3 2h3.2v20h-3.5V8.7L9 22H5.5V2z" />
        </svg>
      )
    },
    {
      name: 'Google',
      color: '#4285F4',
      glow: 'rgba(66, 133, 244, 0.45)',
      icon: (isHovered) => (
        <svg viewBox="0 0 24 24" style={{ width: '23px', height: '23px' }}>
          <path fill={isHovered ? '#4285F4' : 'currentColor'} d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill={isHovered ? '#34A853' : 'currentColor'} d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill={isHovered ? '#FBBC05' : 'currentColor'} d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" />
          <path fill={isHovered ? '#EA4335' : 'currentColor'} d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
        </svg>
      )
    },
    {
      name: 'Microsoft',
      color: '#00A4EF',
      glow: 'rgba(0, 164, 239, 0.45)',
      icon: (isHovered) => (
        <svg viewBox="0 0 24 24" style={{ width: '21px', height: '21px' }}>
          {/* Four segment corporate Microsoft colors on hover */}
          <path fill={isHovered ? '#F25022' : 'currentColor'} d="M2 2h9v9H2z" />
          <path fill={isHovered ? '#7FBA00' : 'currentColor'} d="M13 2h9v9h-9z" />
          <path fill={isHovered ? '#00A4EF' : 'currentColor'} d="M2 13h9v9H2z" />
          <path fill={isHovered ? '#FFB900' : 'currentColor'} d="M13 13h9v9h-9z" />
        </svg>
      )
    },
    {
      name: 'NVIDIA',
      color: '#76B900',
      glow: 'rgba(118, 185, 0, 0.45)',
      icon: (isHovered) => (
        <svg viewBox="0 0 24 24" fill={isHovered ? '#76B900' : 'currentColor'} style={{ width: '24px', height: '24px' }}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.82 0 3.53-.49 5.01-1.34l-1.45-1.45C14.38 17.76 13.22 18 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.64 0 3.13.66 4.24 1.73l1.45-1.45C16.14 4.71 14.18 4 12 4z" />
          <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4c1.11 0 2.11-.45 2.83-1.17l-1.41-1.41C13.06 13.76 12.56 14 12 14c-1.1 0-2-.9-2-2s.9-2 2-2c.31 0 .61.08.87.21l1.41-1.41C13.72 8.32 12.91 8 12 8z" />
          <path d="M16.92 12.08l1.41-1.41c-.48-.48-1.1-.81-1.8-.95l-.36 1.34c.33.07.61.22.84.44l-.09.58z" />
        </svg>
      )
    },
    {
      name: 'OpenAI',
      color: '#10A37F',
      glow: 'rgba(16, 163, 127, 0.45)',
      icon: (isHovered) => (
        <svg viewBox="0 0 24 24" style={{ width: '23px', height: '23px' }}>
          <defs>
            <linearGradient id="openaiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10A37F" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
          <path 
            fill={isHovered ? 'url(#openaiGrad)' : 'currentColor'} 
            d="M19.61 8.54c-.1-.78-.49-1.48-1.09-1.98l-2.48 1.43c.12.33.15.69.07 1.05-.12.53-.45.98-.92 1.25l-4.75 2.74v5.48l1.45.84c.71.41 1.6.41 2.31 0l4.75-2.74c.66-.38 1.09-1.04 1.16-1.78v-5.49zM4.39 15.46c.1.78.49 1.48 1.09 1.98l2.48-1.43c-.12-.33-.15-.69-.07-1.05.12-.53.45-.98.92-1.25l4.75-2.74V5.48L12.11 4.64c-.71-.41-1.6-.41-2.31 0l-4.75 2.74c-.66.38-1.09 1.04-1.16 1.78v5.49zM9.54 19.61c.78.1 1.48-.49 1.98-1.09l-1.43-2.48c-.33.12-.69.15-1.05.07-.53-.12-.98-.45-1.25-.92L5.48 10.45l-.84 1.45c-.41.71-.41 1.6 0 2.31l2.74 4.75c.38.66 1.04 1.09 1.78 1.16zM14.46 4.39c-.78-.1-1.48.49-1.98 1.09l1.43 2.48c.33-.12.69-.15 1.05-.07.53.12.98.45 1.25.92l3.29 5.7.84-1.45c.41-.71.41-1.6 0-2.31l-2.74-4.75c-.38-.66-1.04-1.09-1.78-1.16zM19.61 15.46v-5.49c-.07-.74-.5-1.4-1.16-1.78l-4.75-2.74c-.71-.41-1.6-.41-2.31 0L9.94 6.29c.47.27.8.72.92 1.25.08.36.05.72-.07 1.05l2.48 1.43c.6-.5 1-1.2 1.09-1.98zM4.39 8.54v5.49c.07.74.5 1.4 1.16 1.78l4.75 2.74c.71.41 1.6.41 2.31 0l1.45-.84c-.47-.27-.8-.72-.92-1.25-.08-.36-.05-.72.07-1.05L10.74 14c-.6.5-1 1.2-1.09 1.98z" 
          />
        </svg>
      )
    }
  ];

  return (
    <footer
      style={{
        backgroundColor: '#020205',
        position: 'relative',
        zIndex: 5,
        overflow: 'visible',
        padding: '7rem 0 2rem 0',
      }}
    >

      {/* ── Magical Fantasy Book Portal ── */}
      <div style={{ position: 'absolute', top: '-80px', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 20, pointerEvents: 'none' }}>
        <Link
          to="/fantasy-store"
          style={{ pointerEvents: 'auto', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
          title="Enter the Fantasy Book Store"
        >
          {/* Outer rotating ring 1 */}
          <div style={{ position: 'relative', width: '160px', height: '160px' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                border: '2px solid transparent',
                borderTopColor: 'rgba(139,92,246,0.7)',
                borderRightColor: 'rgba(245,166,35,0.4)',
                borderBottomColor: 'rgba(139,92,246,0.2)',
                boxShadow: '0 0 20px rgba(139,92,246,0.3)',
              }}
            />
            {/* Outer rotating ring 2 — opposite */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute', inset: '8px', borderRadius: '50%',
                border: '1.5px solid transparent',
                borderTopColor: 'rgba(245,166,35,0.6)',
                borderLeftColor: 'rgba(245,166,35,0.3)',
                boxShadow: '0 0 12px rgba(245,166,35,0.2)',
              }}
            />

            {/* Glassmorphic circle center */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              style={{
                position: 'absolute', inset: '14px', borderRadius: '50%',
                background: 'radial-gradient(circle at 40% 35%, rgba(30,15,60,0.92), rgba(10,4,21,0.95))',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(139,92,246,0.35)',
                boxShadow: '0 0 40px rgba(139,92,246,0.25), 0 0 80px rgba(139,92,246,0.1), inset 0 0 20px rgba(139,92,246,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
                cursor: 'pointer',
              }}
            >
              {/* Book icon with float animation */}
              <motion.div
                animate={{ y: [0, -6, 0], filter: ['drop-shadow(0 0 8px rgba(245,166,35,0.6))', 'drop-shadow(0 0 16px rgba(245,166,35,0.9))', 'drop-shadow(0 0 8px rgba(245,166,35,0.6))'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ fontSize: '2rem', color: '#F59E0B', lineHeight: 1 }}
              >
                📖
              </motion.div>
              <div style={{ color: '#C4B5FD', fontSize: '0.52rem', fontWeight: '800', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '4px', textAlign: 'center', lineHeight: 1.2 }}>Fantasy<br />Store</div>
            </motion.div>

            {/* Orbiting sparkles */}
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
              <motion.div
                key={deg}
                animate={{ rotate: 360 }}
                transition={{ duration: 8 + i * 0.5, repeat: Infinity, ease: 'linear' }}
                style={{ position: 'absolute', inset: 0, borderRadius: '50%' }}
              >
                <div style={{
                  position: 'absolute',
                  top: '4px', left: '50%',
                  width: i % 2 === 0 ? '4px' : '3px',
                  height: i % 2 === 0 ? '4px' : '3px',
                  borderRadius: '50%',
                  background: i % 3 === 0 ? '#F59E0B' : i % 3 === 1 ? '#8B5CF6' : '#22D3EE',
                  boxShadow: `0 0 6px ${i % 3 === 0 ? '#F59E0B' : i % 3 === 1 ? '#8B5CF6' : '#22D3EE'}`,
                  transform: `rotate(${deg}deg) translateX(-50%)`,
                }} />
              </motion.div>
            ))}
          </div>

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              background: 'rgba(10,4,21,0.85)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(139,92,246,0.3)',
              borderRadius: '99px', padding: '4px 14px',
              color: '#C4B5FD', fontSize: '0.68rem', fontWeight: '800',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            ✦ Enter the Shattered Realm ✦
          </motion.div>
        </Link>
      </div>
      {/* Premium Top Border light line */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, rgba(139, 92, 246, 0) 0%, rgba(139, 92, 246, 0.4) 30%, rgba(245, 166, 35, 0.4) 70%, rgba(245, 166, 35, 0) 100%)'
        }}
      />

      {/* Decorative Glow Blobs */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 1,
          overflow: 'hidden'
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.28, 0.15],
            x: [0, 60, 0],
            y: [0, -40, 0]
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            position: 'absolute',
            bottom: '-15%',
            left: '8%',
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.18) 0%, rgba(139, 92, 246, 0) 70%)',
            filter: 'blur(110px)',
          }}
        />
        <motion.div
          animate={{
            scale: [1.15, 1, 1.15],
            opacity: [0.1, 0.22, 0.1],
            x: [0, -50, 0],
            y: [0, 30, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            position: 'absolute',
            top: '-8%',
            right: '12%',
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245, 166, 35, 0.12) 0%, rgba(245, 166, 35, 0) 70%)',
            filter: 'blur(90px)',
          }}
        />

        {/* Light Beams */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: '20%',
            width: '1px',
            height: '100%',
            background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.18) 0%, rgba(139, 92, 246, 0) 80%)',
            transform: 'skewX(-40deg)',
            filter: 'blur(4px)'
          }}
        />
        <div 
          style={{
            position: 'absolute',
            top: 0,
            right: '20%',
            width: '1px',
            height: '100%',
            background: 'linear-gradient(180deg, rgba(245, 166, 35, 0.12) 0%, rgba(245, 166, 35, 0) 80%)',
            transform: 'skewX(-40deg)',
            filter: 'blur(4px)'
          }}
        />
        
        {/* Floating Particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -140, 0],
              x: [0, Math.sin(i) * 40, 0],
              opacity: [0, 0.65, 0]
            }}
            transition={{
              duration: 7 + (i % 4) * 2.5,
              repeat: Infinity,
              delay: i * 0.6,
              ease: 'easeInOut'
            }}
            style={{
              position: 'absolute',
              bottom: `${10 + (i * 7)}%`,
              left: `${12 + (i * 7.5)}%`,
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              borderRadius: '50%',
              backgroundColor: i % 2 === 0 ? '#C084FC' : '#F5A623',
              boxShadow: i % 2 === 0 ? '0 0 10px #C084FC' : '0 0 10px #F5A623',
            }}
          />
        ))}
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '5rem' }}>
        {/* FAANG / AI Company Logo Cards Row */}
        <div style={{ textAlign: 'center', marginBottom: '5.5rem' }}>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: '0.75rem',
              fontWeight: '800',
              color: 'var(--accent-gold)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginBottom: '2.5rem',
              textShadow: '0 0 10px rgba(245, 166, 35, 0.25)'
            }}
          >
            ✦ EXPERTISE IN INTEGRATIONS & BRAND ECOSYSTEMS ✦
          </motion.p>

          <div 
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1.25rem',
              maxWidth: '900px',
              margin: '0 auto',
              padding: '0 1rem'
            }}
            onMouseLeave={() => setHoveredLogoIndex(null)}
          >
            {faangLogos.map((logo, index) => {
              const isHovered = hoveredLogoIndex === index;
              
              // Scale and opacity focus values: only hovered scales up, others stay normal (1.0)
              let scale = 1.0;
              let opacity = 0.8;
              let borderCol = 'rgba(255, 255, 255, 0.08)';
              let bgCol = 'rgba(255, 255, 255, 0.01)';
              
              if (isHovered) {
                scale = 1.25;
                opacity = 1.0;
                borderCol = `${logo.color}60`;
                bgCol = `${logo.color}15`;
              }

              return (
                <motion.div
                  key={logo.name}
                  onMouseEnter={() => setHoveredLogoIndex(index)}
                  onMouseLeave={() => setHoveredLogoIndex(null)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: 'spring',
                    stiffness: 110,
                    damping: 14,
                    delay: index * 0.04
                  }}
                  style={{ position: 'relative' }}
                >
                  <motion.div
                    animate={{
                      scale,
                      opacity,
                      borderColor: borderCol,
                      backgroundColor: bgCol,
                      boxShadow: isHovered ? `0 12px 30px ${logo.glow}` : '0 4px 12px rgba(0, 0, 0, 0.2)',
                      y: isHovered ? -8 : 0
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 280,
                      damping: 18
                    }}
                    style={{
                      width: '62px',
                      height: '62px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: isHovered ? logo.color : 'rgba(255, 255, 255, 0.6)',
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {logo.icon(isHovered)}
                  </motion.div>
                  {/* Glowing hover tooltips */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.85 }}
                        animate={{ opacity: 1, y: -6, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.85 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          position: 'absolute',
                          bottom: '72px',
                          left: 0,
                          right: 0,
                          margin: '0 auto',
                          width: 'max-content',
                          backgroundColor: 'rgba(11, 15, 25, 0.95)',
                          border: `1px solid ${logo.color}35`,
                          borderRadius: '8px',
                          padding: '0.3rem 0.65rem',
                          fontSize: '0.72rem',
                          fontWeight: '800',
                          color: '#FFFFFF',
                          whiteSpace: 'nowrap',
                          pointerEvents: 'none',
                          boxShadow: `0 6px 20px ${logo.glow}`
                        }}
                      >
                        {logo.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer main grid columns */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '4rem',
            marginBottom: '4.5rem'
          }}
        >
          {/* Brand & Description Column */}
          <div>
            <h3 
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.85rem',
                fontWeight: '900',
                marginBottom: '1rem',
                letterSpacing: '-0.02em'
              }}
            >
              Kayas<span style={{ color: 'var(--accent-gold)' }}>.</span>
            </h3>
            <p style={{ marginBottom: '1.5rem', maxWidth: '320px', fontSize: '0.95rem', lineHeight: '1.7', color: 'rgba(255,255,255,0.6)' }}>
              Full Stack Software Engineer bridging robust engineering principles and premium glassmorphic UI design patterns.
            </p>
            {/* Glass Social Icon Cards */}
            <div style={{ display: 'flex', gap: '0.85rem' }}>
              {[
                { icon: <FaLinkedin />, href: personalInfo.linkedin, label: 'LinkedIn', glow: 'rgba(0,100,224,0.2)' },
                { icon: <FaGithub />, href: personalInfo.github, label: 'GitHub', glow: 'rgba(255,255,255,0.1)' },
                { icon: <FaInstagram />, href: personalInfo.instagram, label: 'Instagram', glow: 'rgba(225,48,108,0.2)' },
                { icon: <FaYoutube />, href: personalInfo.youtube, label: 'YouTube', glow: 'rgba(255,0,0,0.2)' },
                { icon: <FaTwitter />, href: personalInfo.twitter, label: 'Twitter', glow: 'rgba(29,161,242,0.2)' },
              ].map((social, i) => (
                <motion.a 
                  key={i}
                  href={social.href} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="social-icon-btn"
                  aria-label={social.label}
                  whileHover={{
                    scale: 1.15,
                    y: -4,
                    borderColor: 'var(--accent-gold)',
                    color: 'var(--accent-gold)',
                    boxShadow: `0 6px 20px ${social.glow}`
                  }}
                  style={{
                    fontSize: '1.15rem',
                    color: 'rgba(255, 255, 255, 0.55)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    background: 'rgba(255,255,255,0.01)',
                    transition: 'border-color 0.3s, color 0.3s'
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Double Column Quick Navigation */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', color: '#FFFFFF', fontSize: '1rem', fontWeight: '800', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1.75rem' }}>
              Quick Navigation
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {navLinks.slice(0, 4).map((link, idx) => (
                  <a 
                    key={idx}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const target = document.querySelector(link.href);
                      if (target) {
                        const headerOffset = 65;
                        const elementPosition = target.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className="footer-link"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {navLinks.slice(4).map((link, idx) => (
                  <a 
                    key={idx}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const target = document.querySelector(link.href);
                      if (target) {
                        const headerOffset = 65;
                        const elementPosition = target.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className="footer-link"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Details Column */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', color: '#FFFFFF', fontSize: '1rem', fontWeight: '800', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1.75rem' }}>
              Location & Contact
            </h4>
            <p style={{ marginBottom: '1.25rem', fontSize: '0.95rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.6)' }}>
              Looking for collaborators, contract roles, or freelance work? Connect with me.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>
                <FaEnvelope style={{ color: 'var(--accent-purple)', fontSize: '0.95rem' }} />
                <a 
                  href={`mailto:${personalInfo.email}`} 
                  style={{
                    fontWeight: '600',
                    color: 'var(--accent-gold)',
                    transition: 'var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#FFFFFF'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--accent-gold)'}
                >
                  {personalInfo.email}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem' }}>
                <FaMapMarkerAlt style={{ color: 'var(--accent-purple)' }} />
                <span>{personalInfo.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Premium back to top button */}
        <div 
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '2.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}
        >
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', fontWeight: '500' }}>
            © {new Date().getFullYear()} Kayas Mishra. Designed & Developed with ✦ Precision.
          </p>
          
          {/* Animated Back to Top Button */}
          <motion.button 
            onClick={scrolltoTop}
            whileHover="hover"
            initial="initial"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: '#FFFFFF',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
            }}
            className="scroll-top-btn"
            aria-label="Scroll to top"
          >
            {/* Glowing expansion ring on hover */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '50%',
                border: '1px solid var(--accent-gold)',
                opacity: 0,
                pointerEvents: 'none'
              }}
              variants={{
                hover: {
                  scale: [1, 1.45],
                  opacity: [0.8, 0],
                  transition: {
                    repeat: Infinity,
                    duration: 1.25,
                    ease: 'easeOut'
                  }
                }
              }}
            />
            {/* Sliding Arrow Icon */}
            <motion.div
              variants={{
                initial: { y: 0 },
                hover: {
                  y: [0, -18, 18, 0],
                  transition: {
                    times: [0, 0.4, 0.41, 1],
                    duration: 0.55,
                    ease: 'easeInOut'
                  }
                }
              }}
            >
              <FaArrowUp style={{ fontSize: '0.95rem' }} />
            </motion.div>
          </motion.button>
        </div>
      </div>

      <style>{`
        .footer-link {
          color: rgba(255, 255, 255, 0.55) !important;
          font-size: 0.9rem;
          font-weight: 500;
          transition: color 0.3s, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
          width: fit-content;
          display: flex;
          align-items: center;
        }
        .footer-link:hover {
          color: var(--accent-gold) !important;
          transform: translateX(6px);
        }
        .scroll-top-btn:hover {
          background-color: var(--accent-gold) !important;
          color: #020205 !important;
          border-color: var(--accent-gold) !important;
          box-shadow: 0 4px 15px rgba(245, 166, 35, 0.35) !important;
        }
      `}</style>
    </footer>
  );
}
