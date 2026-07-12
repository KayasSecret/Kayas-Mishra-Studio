import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { experience } from '../data/data';
import useReducedMotionSafe from '../hooks/useReducedMotionSafe';
import Button from '../components/ui/Button';

const typeColors = {
  'Full-time': { bg: 'rgba(192,132,252,0.15)', border: 'rgba(192,132,252,0.5)', text: '#C084FC' },
  'Internship': { bg: 'rgba(245,166,35,0.12)', border: 'rgba(245,166,35,0.5)', text: '#F5A623' },
  'Freelance': { bg: 'rgba(34,211,238,0.12)', border: 'rgba(34,211,238,0.5)', text: '#22D3EE' },
};

const cardAccents = [
  { glow: '#C084FC', dot: '#C084FC', num: '#C084FC' },
  { glow: '#F5A623', dot: '#F5A623', num: '#F5A623' },
  { glow: '#22D3EE', dot: '#22D3EE', num: '#22D3EE' },
];

export default function Experience() {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const displayedExperience = isMobile && !showAll 
    ? experience.slice(0, 2) 
    : experience;
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } }
  };

  const leftVariants = useReducedMotionSafe({
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  });

  const rightVariants = useReducedMotionSafe({
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  });

  const dotVariants = useReducedMotionSafe({
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: 'backOut', delay: 0.3 } }
  });

  return (
    <section
      id="experience"
      style={{
        padding: '15px 0 80px 0',
        backgroundColor: '#000000',
        position: 'relative',
        zIndex: 5,
        overflow: 'hidden',
      }}
    >
      {/* Background decorative blobs */}
      <div
        className="glow-blob blob-gold float-2"
        style={{ top: '20%', right: '-12%', opacity: 0.08, width: '500px', height: '500px' }}
      />
      <div
        className="glow-blob blob-navy float-1"
        style={{ bottom: '10%', left: '-10%', opacity: 0.1, width: '400px', height: '400px' }}
      />

      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* ── Section Header ── */}
          <motion.div
            variants={leftVariants}
            style={{
              textAlign: 'center',
              marginTop: '30px', // 👈 Navbar se gap
              marginBottom: '3.5rem',
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
              <span style={{ color: '#C084FC' }}>✦</span> MY JOURNEY{' '}
              <span style={{ color: '#C084FC' }}>✦</span>
            </span>

            <h2
              style={{
                marginTop: '0.5rem',
                marginBottom: '0',
                fontFamily: 'var(--font-display)',
                fontWeight: '900',
                letterSpacing: '-0.03em',
              }}
            >
              <span style={{ color: '#FFFFFF' }}>Work </span>
              <span
                style={{
                  background: 'linear-gradient(135deg, #F5A623 0%, #C084FC 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Experience
              </span>
            </h2>
          </motion.div>

          {/* ── Timeline ── */}
          <motion.div
            key={showAll}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            style={{ position: 'relative', maxWidth: '1100px', margin: '0 auto' }}
          >

            {/* Central vertical line */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: '100%', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="experience-timeline-spine"
              style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: '2px',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(180deg, transparent 0%, #C084FC 20%, #F5A623 55%, #22D3EE 85%, transparent 100%)',
                zIndex: 1,
              }}
            />

            {displayedExperience.map((exp, index) => {
              const isLeft = index % 2 === 0;
              const accent = cardAccents[index % cardAccents.length];
              const typeStyle = typeColors[exp.type] || typeColors['Full-time'];
              const cardVariants = isLeft ? leftVariants : rightVariants;
              const dateStr = `${exp.startDate} – ${exp.endDate}`;

              return (
                <div
                  key={index}
                  className="experience-item-row"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isLeft ? 'flex-start' : 'flex-end',
                    position: 'relative',
                    marginBottom: index < displayedExperience.length - 1 ? '4rem' : 0,
                    zIndex: 2,
                  }}
                >
                  {/* ── Glowing Timeline Dot ── */}
                  <motion.div
                    variants={dotVariants}
                    className="experience-timeline-dot"
                    style={{
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: accent.dot,
                      boxShadow: `0 0 0 4px rgba(0,0,0,0.8), 0 0 0 6px ${accent.dot}40, 0 0 20px ${accent.dot}80`,
                      zIndex: 3,
                    }}
                  >
                    {/* Pulse ring */}
                    <motion.div
                      animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        border: `2px solid ${accent.dot}`,
                      }}
                    />
                  </motion.div>

                  {/* ── Connector line (dot → card) ── */}
                  <div
                    className="experience-connector-line"
                    style={{
                      position: 'absolute',
                      left: isLeft ? 'auto' : '50%',
                      right: isLeft ? '50%' : 'auto',
                      top: '50%',
                      width: '60px',
                      height: '2px',
                      background: `linear-gradient(${isLeft ? '270deg' : '90deg'}, transparent, ${accent.dot}80)`,
                      transform: 'translateY(-50%)',
                      zIndex: 2,
                    }}
                  />

                  {/* ── Experience Card ── */}
                  <motion.div
                    variants={cardVariants}
                    whileHover={{ y: -6, transition: { duration: 0.3, ease: 'easeOut' } }}
                    className="experience-card-wrapper"
                    style={{
                      width: 'calc(50% - 70px)',
                      position: 'relative',
                    }}
                  >
                    {/* Big translucent ordinal number */}
                    <span
                      style={{
                        position: 'absolute',
                        top: '-1.2rem',
                        [isLeft ? 'right' : 'left']: '1.5rem',
                        fontSize: '5rem',
                        fontWeight: '900',
                        fontFamily: 'var(--font-display)',
                        color: accent.num,
                        opacity: 0.08,
                        lineHeight: 1,
                        userSelect: 'none',
                        pointerEvents: 'none',
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <div
                      style={{
                        background: 'rgba(10, 12, 30, 0.7)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: `1px solid ${accent.glow}30`,
                        borderRadius: '1.25rem',
                        padding: '2rem 2rem 1.75rem',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: `0 4px 40px ${accent.glow}15, inset 0 1px 0 rgba(255,255,255,0.06)`,
                        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.boxShadow = `0 8px 60px ${accent.glow}35, inset 0 1px 0 rgba(255,255,255,0.1)`;
                        e.currentTarget.style.borderColor = `${accent.glow}60`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.boxShadow = `0 4px 40px ${accent.glow}15, inset 0 1px 0 rgba(255,255,255,0.06)`;
                        e.currentTarget.style.borderColor = `${accent.glow}30`;
                      }}
                    >
                      {/* Top accent bar */}
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '3px',
                          background: `linear-gradient(90deg, transparent, ${accent.glow}, transparent)`,
                          borderRadius: '1.25rem 1.25rem 0 0',
                        }}
                      />

                      {/* Corner glow blob inside card */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '-40px',
                          [isLeft ? 'right' : 'left']: '-40px',
                          width: '150px',
                          height: '150px',
                          borderRadius: '50%',
                          background: `radial-gradient(circle, ${accent.glow}18 0%, transparent 70%)`,
                          pointerEvents: 'none',
                        }}
                      />

                      {/* Row 1: Role + Type badge */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        <h3
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.2rem',
                            fontWeight: '800',
                            color: '#FFFFFF',
                            margin: 0,
                          }}
                        >
                          {exp.role}
                        </h3>
                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: '700',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: typeStyle.text,
                            background: typeStyle.bg,
                            border: `1px solid ${typeStyle.border}`,
                            borderRadius: '999px',
                            padding: '0.2rem 0.7rem',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {exp.type}
                        </span>
                      </div>

                      {/* Row 2: Company */}
                      <p
                        style={{
                          margin: '0 0 0.75rem',
                          fontSize: '1rem',
                          fontWeight: '700',
                          color: accent.glow,
                        }}
                      >
                        {exp.company}
                      </p>

                      {/* Row 3: Date + Location */}
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '1rem',
                          marginBottom: '1.25rem',
                          fontSize: '0.8rem',
                          color: 'rgba(255,255,255,0.45)',
                          fontWeight: '500',
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                          {dateStr}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                          {exp.location}
                        </span>
                      </div>

                      {/* Divider */}
                      <div style={{ height: '1px', background: `linear-gradient(90deg, transparent, ${accent.glow}30, transparent)`, marginBottom: '1.25rem' }} />

                      {/* Achievements */}
                      <ul style={{ margin: '0 0 1.5rem', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                        {exp.achievements.map((ach, i) => (
                          <li key={i} style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                            <span
                              style={{
                                flexShrink: 0,
                                marginTop: '0.3rem',
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                backgroundColor: accent.dot,
                                boxShadow: `0 0 6px ${accent.dot}`,
                              }}
                            />
                            <span style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.72)', lineHeight: '1.6' }}>
                              {ach}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Stack badges */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {exp.techStack.map((tech, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + i * 0.06, duration: 0.4 }}
                            style={{
                              fontSize: '0.72rem',
                              fontWeight: '600',
                              color: 'rgba(255,255,255,0.65)',
                              background: 'rgba(255,255,255,0.05)',
                              border: '1px solid rgba(255,255,255,0.1)',
                              borderRadius: '6px',
                              padding: '0.22rem 0.6rem',
                            }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>

          {isMobile && experience.length > 2 && (
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
                {showAll ? 'Show Less ▴' : 'View More Experience ▾'}
              </Button>
            </div>
          )}

        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .experience-timeline-spine {
            left: 20px !important;
            transform: none !important;
          }
          .experience-item-row {
            justify-content: flex-start !important;
            padding-left: 45px !important;
            margin-bottom: 2.5rem !important;
          }
          .experience-card-wrapper {
            width: 100% !important;
          }
          .experience-timeline-dot {
            left: 20px !important;
            transform: translateX(-50%) !important;
          }
          .experience-connector-line {
            left: 20px !important;
            width: 25px !important;
            transform: translateY(-50%) !important;
          }
        }
      `}</style>
    </section>
  );
}
