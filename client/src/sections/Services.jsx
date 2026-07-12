import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useReducedMotionSafe from '../hooks/useReducedMotionSafe';
import Button from '../components/ui/Button';

/* ─── Service Data ────────────────────────────────────────────────── */
const services = [
  {
    icon: '🖥️',
    emoji_bg: 'rgba(192,132,252,0.12)',
    accent: '#C084FC',
    title: 'Full Stack Web Apps',
    tagline: 'End-to-end product engineering',
    description:
      'I architect and ship complete web applications from database schema to pixel-perfect UI. Scalable, maintainable, and built to grow with your business.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'Express', 'REST APIs', 'Redux Toolkit', 'Tailwind CSS'],
    highlight: 'Most Popular',
  },
  {
    icon: '⚡',
    emoji_bg: 'rgba(245,166,35,0.12)',
    accent: '#F5A623',
    title: 'API Design & Integration',
    tagline: 'Fast, secure, well-documented',
    description:
      'Clean RESTful APIs with robust authentication, rate limiting, and comprehensive documentation. Third-party integrations that just work.',
    tags: ['REST', 'JWT Auth', 'Express', 'Postman', 'Multer', 'Cookie Sessions'],
    highlight: null,
  },
  {
    icon: '🎨',
    emoji_bg: 'rgba(34,211,238,0.12)',
    accent: '#22D3EE',
    title: 'UI/UX Implementation',
    tagline: 'Designs that feel alive',
    description:
      'Turning Figma prototypes into production-grade React components with smooth micro-animations, accessibility, and pixel-perfect precision.',
    tags: ['React', 'Framer Motion', 'CSS', 'JavaScript', 'Responsive Design'],
    highlight: null,
  },
  {
    icon: '🗄️',
    emoji_bg: 'rgba(52,211,153,0.12)',
    accent: '#34D399',
    title: 'Database Architecture',
    tagline: 'Data that scales with you',
    description:
      'Schema design, query optimisation, and data modelling for both relational and NoSQL databases. Fast reads, safe writes, zero bottlenecks.',
    tags: ['MongoDB', 'MYSQL', 'Mongoose', 'CRUD Operations', 'Database Design'],
    highlight: null,
  },
  {
    icon: '🚀',
    emoji_bg: 'rgba(244,114,182,0.12)',
    accent: '#F472B6',
    title: 'Graphic Design & Branding',
    tagline: 'CREATE DESIGNS THAT STAND OUT',
    description:
      'Designing eye-catching social media posts, banners, presentations, flyers, posters, and marketing materials with a focus on clean layouts and strong visual appeal.',
    tags: ['Canva', 'Picsart', 'MetaUI', 'Brand Design', 'Web UI'],
    highlight: null,
  },
  {
    icon: '🔒',
    emoji_bg: 'rgba(251,191,36,0.12)',
    accent: '#FBBF24',
    title: 'Code Review & Rescue',
    tagline: 'Save legacy, level up teams',
    description:
      'Auditing existing codebases for security gaps, tech-debt, and performance killers. Detailed reports + hands-on refactoring sessions.',
    tags: ['Code Audit', 'Refactoring', 'Security', 'Documentation', 'Git'],
    highlight: 'Fast Turnaround',
  },
];

/* ─── Process steps ───────────────────────────────────────────────── */
const steps = [
  { num: '01', title: 'Discovery', desc: 'We align on goals, constraints, and success metrics through structured calls and written briefs.' },
  { num: '02', title: 'Planning', desc: 'Architecture diagrams, wireframes, and a detailed sprint plan before a single line of code is written.' },
  { num: '03', title: 'Build', desc: 'Iterative development with weekly demos, clean Git history, and test coverage at every stage.' },
  { num: '04', title: 'Launch', desc: 'Deployment, monitoring setup, and a two-week post-launch support window — no ghosting.' },
];

/* ─── Animated number counter ─────────────────────────────────────── */
function StatBadge({ value, label, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{
        textAlign: 'center',
        padding: '1.25rem 1.5rem',
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${accent}25`,
        borderRadius: '1rem',
        flex: 1,
        minWidth: '120px',
      }}
    >
      <p style={{ margin: 0, fontSize: '1.8rem', fontWeight: '900', color: accent, fontFamily: 'var(--font-display)', lineHeight: 1 }}>{value}</p>
      <p style={{ margin: '0.35rem 0 0', fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', fontWeight: '600', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</p>
    </motion.div>
  );
}

/* ─── Service Card ────────────────────────────────────────────────── */
function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false);

  const cardVariants = useReducedMotionSafe({
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 } },
  });

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ height: '100%' }}
    >
      <motion.div
        animate={{ y: hovered ? -8 : 0, boxShadow: hovered ? `0 16px 60px ${service.accent}25` : `0 4px 30px ${service.accent}10` }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
          height: '100%',
          background: 'rgba(8,10,28,0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${hovered ? service.accent + '45' : service.accent + '18'}`,
          borderRadius: '1.25rem',
          padding: '2rem 1.75rem 1.75rem',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transition: 'border-color 0.35s ease',
          cursor: 'default',
        }}
      >
        {/* Top accent bar */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0.5, scaleX: hovered ? 1 : 0.5 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
            background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)`,
            borderRadius: '1.25rem 1.25rem 0 0',
            transformOrigin: 'center',
          }}
        />

        {/* Corner glow */}
        <div style={{
          position: 'absolute', top: '-50px', right: '-50px',
          width: '160px', height: '160px', borderRadius: '50%',
          background: `radial-gradient(circle, ${service.accent}12 0%, transparent 70%)`,
          transition: 'opacity 0.35s',
          opacity: hovered ? 1 : 0.4,
          pointerEvents: 'none',
        }} />

        {/* Highlight badge */}
        {service.highlight && (
          <div style={{
            position: 'absolute', top: '1rem', right: '1rem',
            fontSize: '0.62rem', fontWeight: '800', letterSpacing: '0.12em',
            textTransform: 'uppercase', color: service.accent,
            background: `${service.accent}18`, border: `1px solid ${service.accent}40`,
            borderRadius: '999px', padding: '0.2rem 0.55rem',
          }}>
            {service.highlight}
          </div>
        )}

        {/* Icon */}
        <motion.div
          animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? [0, -8, 8, 0] : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            width: '52px', height: '52px', borderRadius: '1rem',
            background: service.emoji_bg,
            border: `1px solid ${service.accent}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem', marginBottom: '1.1rem',
            boxShadow: hovered ? `0 0 20px ${service.accent}30` : 'none',
            transition: 'box-shadow 0.35s ease',
          }}
        >
          {service.icon}
        </motion.div>

        {/* Title + tagline */}
        <h3 style={{ margin: '0 0 0.25rem', fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: '800', color: '#fff' }}>{service.title}</h3>
        <p style={{ margin: '0 0 0.85rem', fontSize: '0.75rem', fontWeight: '700', color: service.accent, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{service.tagline}</p>

        {/* Divider */}
        <div style={{ height: '1px', background: `linear-gradient(90deg, ${service.accent}25, transparent)`, marginBottom: '0.85rem' }} />

        {/* Description */}
        <p style={{ margin: '0 0 1.25rem', fontSize: '0.88rem', color: 'rgba(255,255,255,0.65)', lineHeight: '1.7', flex: 1 }}>{service.description}</p>

        {/* Tech tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {service.tags.map((tag, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.05 }}
              style={{
                fontSize: '0.7rem', fontWeight: '600',
                color: hovered ? service.accent : 'rgba(255,255,255,0.5)',
                background: hovered ? `${service.accent}12` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${hovered ? service.accent + '35' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '6px', padding: '0.2rem 0.55rem',
                transition: 'all 0.3s ease',
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Section ────────────────────────────────────────────────── */
export default function Services() {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const displayedServices = isMobile && !showAll 
    ? services.slice(0, 2) 
    : services;
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
  };

  /* floating particles */
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 3 + 1, dur: Math.random() * 7 + 4,
    delay: Math.random() * 5,
    color: ['#C084FC', '#F5A623', '#22D3EE', '#34D399', '#F472B6'][i % 5],
  }));

  return (
    <section
      id="services"
      style={{ padding: '15px 0 80px 0', backgroundColor: '#020205', position: 'relative', zIndex: 5, overflow: 'hidden' }}
    >
      {/* Particles */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          animate={{ y: [0, -25, 0], opacity: [0, 0.55, 0] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, borderRadius: '50%', background: p.color, filter: `blur(${p.size > 2.5 ? 1 : 0}px)`, pointerEvents: 'none', zIndex: 0 }}
        />
      ))}

      {/* Glow blobs */}
      <div className="glow-blob blob-navy float-1" style={{ top: '15%', left: '-12%', opacity: 0.12, width: '500px', height: '500px' }} />
      <div className="glow-blob blob-gold float-2" style={{ bottom: '10%', right: '-10%', opacity: 0.08, width: '450px', height: '450px' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            textAlign: 'center',
            marginTop: '30px',      // 👈 Navbar se gap
            marginBottom: '3.5rem'
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
              fontFamily: 'var(--font-display)'
            }}
          >
            <span style={{ color: '#C084FC' }}>✦</span>
            WHAT I OFFER
            <span style={{ color: '#C084FC' }}>✦</span>
          </span>

          <h2
            style={{
              marginTop: '0.5rem',
              marginBottom: '0.65rem',
              fontFamily: 'var(--font-display)',
              fontWeight: '900',
              letterSpacing: '-0.03em'
            }}
          >
            <span style={{ color: '#fff' }}>My </span>
            <span
              style={{
                background: 'linear-gradient(135deg,#F5A623 0%,#C084FC 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Services
            </span>
          </h2>
        </motion.div>

        {/* ── Stats strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3.5rem' }}
        >
          <StatBadge value="5+" label="Projects Shipped" accent="#C084FC" />
          <StatBadge value="4+" label="Happy Clients" accent="#F5A623" />
          <StatBadge value="10+" label="Monnths Experience" accent="#22D3EE" />
          <StatBadge value="100%" label="Client Satisfaction" accent="#34D399" />
        </motion.div>

        {/* ── Service Cards Grid ── */}
        <motion.div
          key={showAll}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            marginBottom: '5rem',
          }}
          className="services-grid"
        >
          {displayedServices.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </motion.div>

        {isMobile && services.length > 2 && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-3rem', marginBottom: '5rem', position: 'relative', zIndex: 10 }}>
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
              {showAll ? 'Show Less ▴' : 'View More Services ▾'}
            </Button>
          </div>
        )}

        {/* ── How I Work — Process Steps ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            background: 'rgba(8,10,28,0.6)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(192,132,252,0.15)',
            borderRadius: '1.5rem',
            padding: '3rem 2.5rem',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '3rem',
          }}
        >
          {/* Top accent */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #C084FC, #F5A623, #22D3EE, transparent)' }} />

          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: '900', color: '#fff' }}>
              How I <span style={{ background: 'linear-gradient(135deg,#22D3EE,#C084FC)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Work</span>
            </h3>
            <p style={{ margin: '0.5rem 0 0', color: 'rgba(255,255,255,0.38)', fontSize: '0.88rem' }}>
              A clear, repeatable process that delivers on time — every time.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }} className="process-grid">
            {steps.map((step, i) => {
              const accentColors = ['#C084FC', '#F5A623', '#22D3EE', '#34D399'];
              const ac = accentColors[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  style={{
                    padding: '1.5rem 1.25rem',
                    background: `${ac}08`,
                    border: `1px solid ${ac}20`,
                    borderRadius: '1rem',
                    position: 'relative',
                    cursor: 'default',
                    transition: 'border-color 0.3s, background 0.3s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${ac}50`; e.currentTarget.style.background = `${ac}12`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = `${ac}20`; e.currentTarget.style.background = `${ac}08`; }}
                >
                  {/* Connector line between steps (not on last) */}
                  {i < steps.length - 1 && (
                    <div style={{ position: 'absolute', top: '2.35rem', right: '-0.75rem', width: '0.75rem', height: '1px', background: `linear-gradient(90deg, ${ac}, ${accentColors[i + 1]})`, zIndex: 2 }} />
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
                    <span style={{ fontSize: '1.6rem', fontWeight: '900', color: ac, fontFamily: 'var(--font-display)', lineHeight: 1, opacity: 0.9 }}>{step.num}</span>
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
                      style={{ width: '6px', height: '6px', borderRadius: '50%', background: ac, boxShadow: `0 0 8px ${ac}` }}
                    />
                  </div>
                  <h4 style={{ margin: '0 0 0.5rem', fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: '800', color: '#fff' }}>{step.title}</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── CTA Banner ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            background: 'linear-gradient(135deg, rgba(192,132,252,0.12) 0%, rgba(245,166,35,0.08) 100%)',
            border: '1px solid rgba(192,132,252,0.2)',
            borderRadius: '1.5rem',
            padding: '2.5rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* BG shimmer */}
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)', pointerEvents: 'none' }}
          />

          <div>
            <h3 style={{ margin: '0 0 0.4rem', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', fontWeight: '900', color: '#fff' }}>
              Have a project in mind? Let's talk.
            </h3>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
              I'm currently open to new freelance &amp; full-time opportunities.
            </p>
          </div>

          <motion.a
            href="#contact"
            onClick={e => {
              e.preventDefault();
              const el = document.querySelector('#contact');
              if (el) {
                const offset = el.getBoundingClientRect().top + window.pageYOffset - 65;
                window.scrollTo({ top: offset, behavior: 'smooth' });
              }
            }}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(192,132,252,0.4)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.85rem 2rem',
              background: 'linear-gradient(135deg,#C084FC,#F5A623)',
              color: '#000', fontWeight: '800', fontSize: '0.9rem',
              letterSpacing: '0.04em', borderRadius: '999px',
              textDecoration: 'none', fontFamily: 'var(--font-display)',
              whiteSpace: 'nowrap', flexShrink: 0,
            }}
          >
            Start a Project ↗
          </motion.a>
        </motion.div>
      </div>

      {/* Responsive */}
      <style>{`
        .services-grid {
          grid-template-columns: repeat(3, 1fr);
        }
        .process-grid {
          grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
          .process-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .process-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
