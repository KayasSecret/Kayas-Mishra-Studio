import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { education } from '../data/data';
import useReducedMotionSafe from '../hooks/useReducedMotionSafe';
import Button from '../components/ui/Button';

const educationAccents = [
  { main: '#C084FC', glow: 'rgba(192,132,252,0.15)', text: '#C084FC', type: 'College' },
  { main: '#22D3EE', glow: 'rgba(34,211,238,0.15)', text: '#22D3EE', type: 'College' },
  { main: '#F5A623', glow: 'rgba(245,166,35,0.15)', text: '#F5A623', type: 'School' },
  { main: '#FBBF24', glow: 'rgba(251,191,36,0.15)', text: '#FBBF24', type: 'School' },
];

export default function Education() {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const displayedEducation = isMobile && !showAll 
    ? education.slice(0, 2) 
    : education;
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
  };

  const cardLeftVariants = useReducedMotionSafe({
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  });

  const cardRightVariants = useReducedMotionSafe({
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  });

  const lineVariants = {
    hidden: { height: 0 },
    visible: { height: '100%', transition: { duration: 1.2, ease: 'easeInOut' } }
  };

  return (
    <section
      id="education"
      style={{
        padding: '15px 0 80px 0',
        backgroundColor: '#020205',
        position: 'relative',
        zIndex: 5,
        overflow: 'hidden'
      }}
    >
      {/* Decorative background blobs */}
      <div className="glow-blob blob-navy float-1" style={{ top: '25%', left: '-15%', opacity: 0.1, width: '450px', height: '450px' }} />
      <div className="glow-blob blob-purple float-2" style={{ bottom: '15%', right: '-15%', opacity: 0.08, width: '450px', height: '450px' }} />

      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* ── Section Header ── */}
          <motion.div
            variants={cardLeftVariants}
            style={{
              textAlign: 'center',
              marginTop: '30px', // 👈 Navbar se gap
              marginBottom: '4rem',
            }}
          >
            <span
              style={{
                fontSize: '0.78rem',
                color: 'var(--accent-gold)',
                fontWeight: '800',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-display)',
              }}
            >
              <span style={{ color: '#C084FC' }}>✦</span>
              ACADEMIC TIMELINE
              <span style={{ color: '#C084FC' }}>✦</span>
            </span>

            <h2
              style={{
                marginTop: '0.5rem',
                marginBottom: '0.5rem',
                fontFamily: 'var(--font-display)',
                fontWeight: '900',
                letterSpacing: '-0.03em',
              }}
            >
              <span style={{ color: '#fff' }}>Education &amp; </span>
              <span
                style={{
                  background: 'linear-gradient(135deg, #F5A623 0%, #C084FC 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Qualifications
              </span>
            </h2>
          </motion.div>

          {/* ── Timeline Container ── */}
          <motion.div
            key={showAll}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto' }}
          >

            {/* Center Timeline Spine */}
            <motion.div
              variants={lineVariants}
              className="education-timeline-spine"
              style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: '2px',
                background: 'linear-gradient(180deg, transparent 0%, #FBBF24 25%, #F5A623 50%, #C084FC 75%, #22D3EE 100%)',
                transform: 'translateX(-50%)',
                zIndex: 1,
              }}
            />

            {displayedEducation.map((edu, index) => {
              const isLeft = index % 2 === 0;
              const accent = educationAccents[index];
              const cardVariants = isLeft ? cardLeftVariants : cardRightVariants;

              return (
                <div
                  key={index}
                  className="education-item-row"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isLeft ? 'flex-start' : 'flex-end',
                    position: 'relative',
                    marginBottom: index < displayedEducation.length - 1 ? '4rem' : 0,
                    zIndex: 2,
                  }}
                >
                  {/* Timeline Dot */}
                  <div
                    className="education-timeline-dot"
                    style={{
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: '#020205',
                      border: `3px solid ${accent.main}`,
                      boxShadow: `0 0 15px ${accent.main}`,
                      zIndex: 3,
                    }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.6, 1], opacity: [0.7, 0, 0.7] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        position: 'absolute',
                        inset: '-3px',
                        borderRadius: '50%',
                        border: `1.5px solid ${accent.main}`,
                      }}
                    />
                  </div>

                  {/* Horizontal connector line */}
                  <div
                    className="education-connector-line"
                    style={{
                      position: 'absolute',
                      left: isLeft ? 'auto' : '50%',
                      right: isLeft ? '50%' : 'auto',
                      top: '50%',
                      width: '40px',
                      height: '1px',
                      background: `linear-gradient(${isLeft ? '270deg' : '90deg'}, transparent, ${accent.main}60)`,
                      transform: 'translateY(-50%)',
                      zIndex: 2,
                    }}
                  />

                  {/* Card wrapper */}
                  <motion.div
                    variants={cardVariants}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="education-card-wrapper"
                    style={{
                      width: 'calc(50% - 60px)',
                      position: 'relative',
                    }}
                  >
                    {/* Big ghost background number */}
                    <span
                      style={{
                        position: 'absolute',
                        top: '-1.5rem',
                        [isLeft ? 'right' : 'left']: '1.5rem',
                        fontSize: '4.5rem',
                        fontWeight: '900',
                        fontFamily: 'var(--font-display)',
                        color: accent.main,
                        opacity: 0.07,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Glass card container */}
                    <div
                      style={{
                        background: 'rgba(8, 10, 28, 0.72)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: `1px solid ${accent.main}30`,
                        borderRadius: '1.25rem',
                        padding: '1.75rem 1.75rem 1.5rem',
                        boxShadow: `0 4px 30px ${accent.glow}, inset 0 1px 0 rgba(255,255,255,0.05)`,
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'border-color 0.3s, box-shadow 0.3s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = `${accent.main}60`;
                        e.currentTarget.style.boxShadow = `0 8px 40px ${accent.main}20`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = `${accent.main}30`;
                        e.currentTarget.style.boxShadow = `0 4px 30px ${accent.glow}`;
                      }}
                    >
                      {/* Top border highlight line */}
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '2.5px',
                          background: `linear-gradient(90deg, transparent, ${accent.main}, transparent)`,
                        }}
                      />

                      {/* Header row: level + type badge */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: '800', color: accent.text, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                          {edu.level}
                        </span>
                        <span style={{
                          fontSize: '0.65rem',
                          fontWeight: '800',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          padding: '0.15rem 0.55rem',
                          background: `${accent.main}15`,
                          border: `1px solid ${accent.main}40`,
                          color: accent.text,
                          borderRadius: '99px',
                        }}>
                          {accent.type}
                        </span>
                      </div>

                      {/* Degree / Certificate Title */}
                      <h3 style={{ margin: '0 0 0.35rem', fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: '800', color: '#fff', lineHeight: 1.3 }}>
                        {edu.degree}
                      </h3>

                      {/* School / Institution Name */}
                      <p style={{ margin: '0 0 0.65rem', fontSize: '0.92rem', color: '#fff', opacity: 0.85, fontWeight: '600' }}>
                        🏫 {edu.school}
                      </p>

                      {/* Year and Score Info */}
                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem', fontSize: '0.78rem', fontWeight: '600', color: 'rgba(255,255,255,0.45)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          📅 {edu.year}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: accent.text }}>
                          🏆 {edu.score}
                        </span>
                      </div>

                      {/* Divider */}
                      <div style={{ height: '1px', background: `linear-gradient(90deg, transparent, ${accent.main}25, transparent)`, marginBottom: '0.85rem' }} />

                      {/* Details text */}
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.65 }}>
                        {edu.details}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>

          {isMobile && education.length > 2 && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3.5rem', position: 'relative', zIndex: 10 }}>
              <Button
                variant="secondary"
                onClick={() => setShowAll(!showAll)}
                style={{
                  borderRadius: '99px',
                  padding: '0.65rem 1.85rem',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backgroundColor: 'rgba(11, 15, 25, 0.65)',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.45)',
                  color: '#FFFFFF'
                }}
              >
                {showAll ? 'Show Less ▴' : 'View More Education ▾'}
              </Button>
            </div>
          )}

        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .education-timeline-spine {
            left: 20px !important;
            transform: none !important;
          }
          .education-item-row {
            justify-content: flex-start !important;
            padding-left: 45px !important;
            margin-bottom: 2.5rem !important;
          }
          .education-card-wrapper {
            width: 100% !important;
          }
          .education-timeline-dot {
            left: 20px !important;
            transform: translateX(-50%) !important;
          }
          .education-connector-line {
            left: 20px !important;
            width: 25px !important;
            transform: translateY(-50%) !important;
          }
        }
      `}</style>
    </section>
  );
}
