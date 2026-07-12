import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { testimonials as seedTestimonials } from '../data/data';

/* ─── tiny helpers ───────────────────────────────────────────────── */
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const accentColors = ['#C084FC', '#F5A623', '#22D3EE', '#34D399', '#F472B6'];

function initials(name = '') {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

/* ─── Quote SVG ─────────────────────────────────────────────────── */
function QuoteIcon({ color }) {
  return (
    <svg width="36" height="28" viewBox="0 0 36 28" fill="none" style={{ opacity: 0.85 }}>
      <path d="M0 28V16.8C0 12.32 1.12 8.68 3.36 5.88C5.68 3 8.96 1.12 13.2 0.16L14.88 3.6C12.08 4.48 9.96 5.88 8.52 7.8C7.08 9.64 6.4 11.76 6.48 14.16H13.2V28H0ZM22.8 28V16.8C22.8 12.32 23.92 8.68 26.16 5.88C28.48 3 31.76 1.12 36 0.16L37.68 3.6C34.88 4.48 32.76 5.88 31.32 7.8C29.88 9.64 29.2 11.76 29.28 14.16H36V28H22.8Z" fill={color} />
    </svg>
  );
}

/* ─── Star rating display ────────────────────────────────────────── */
function Stars({ n = 5, color }) {
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < n ? color : 'rgba(255,255,255,0.15)'} style={{ transition: 'fill 0.3s' }}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

/* ─── Single Testimonial Card ────────────────────────────────────── */
function TestimonialCard({ item, accent }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.96 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        background: 'rgba(8, 10, 28, 0.75)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: `1px solid ${accent}35`,
        borderRadius: '1.5rem',
        padding: '2.5rem 2.25rem 2rem',
        overflow: 'hidden',
        boxShadow: `0 8px 50px ${accent}18, inset 0 1px 0 rgba(255,255,255,0.06)`,
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Top accent bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, transparent, ${accent}, transparent)`, borderRadius: '1.5rem 1.5rem 0 0' }} />

      {/* Corner glow */}
      <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px', borderRadius: '50%', background: `radial-gradient(circle, ${accent}14 0%, transparent 70%)`, pointerEvents: 'none' }} />

      {/* Quote + stars row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
        <QuoteIcon color={accent} />
        <Stars n={5} color={accent} />
      </div>

      {/* Review text */}
      <p style={{ flex: 1, fontSize: '0.97rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.75', margin: '0 0 1.75rem', fontStyle: 'italic' }}>
        "{item.text}"
      </p>

      {/* Divider */}
      <div style={{ height: '1px', background: `linear-gradient(90deg, transparent, ${accent}30, transparent)`, marginBottom: '1.25rem' }} />

      {/* Author row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        {/* Avatar initials circle */}
        <div style={{
          width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0,
          background: `linear-gradient(135deg, ${accent}40, ${accent}15)`,
          border: `2px solid ${accent}50`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.8rem', fontWeight: '800', color: accent,
          letterSpacing: '0.05em',
          boxShadow: `0 0 12px ${accent}30`,
        }}>
          {initials(item.name)}
        </div>
        <div>
          <p style={{ margin: 0, fontWeight: '800', fontSize: '0.95rem', color: '#fff' }}>{item.name}</p>
          <p style={{ margin: 0, fontSize: '0.78rem', color: accent, fontWeight: '600' }}>{item.role}{item.company ? ` · ${item.company}` : ''}</p>
        </div>
        {/* Live badge for new submissions */}
        {item._isNew && (
          <span style={{ marginLeft: 'auto', fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#22D3EE', background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.4)', borderRadius: '999px', padding: '0.2rem 0.6rem' }}>
            New ✦
          </span>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Feedback Form ──────────────────────────────────────────────── */
function FeedbackForm({ onSubmitSuccess }) {
  const [form, setForm]     = useState({ name: '', role: '', company: '', text: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errMsg, setErrMsg] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name.trim())       e.name = 'Name is required';
    if (!form.role.trim())       e.role = 'Your role is required';
    if (!form.text.trim())       e.text = 'Review is required';
    if (form.text.trim().length < 20) e.text = 'Write at least 20 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    setErrMsg('');
    try {
      const res = await axios.post(`${API}/testimonials`, form);
      if (res.data.success) {
        setStatus('success');
        onSubmitSuccess({ ...res.data.testimonial, _isNew: true });
        setForm({ name: '', role: '', company: '', text: '' });
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setErrMsg(res.data.error || 'Something went wrong.');
      }
    } catch (err) {
      setStatus('error');
      setErrMsg(err.response?.data?.error || 'Server error. Please try again.');
    }
  };

  const inputBase = {
    width: '100%',
    padding: '0.7rem 0.9rem',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '0.6rem',
    color: '#fff',
    fontSize: '0.88rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
  };
  const labelBase = { display: 'block', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '0.35rem' };
  const errStyle  = { fontSize: '0.72rem', color: '#FC8181', marginTop: '0.3rem' };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ textAlign: 'center', padding: '2.5rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 0.6, ease: 'backOut' }}
          style={{ fontSize: '3.5rem' }}
        >🎉</motion.div>
        <h3 style={{ margin: 0, color: '#34D399', fontFamily: 'var(--font-display)', fontSize: '1.3rem' }}>Thank You!</h3>
        <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0, fontSize: '0.9rem' }}>Your review is live and visible to all visitors right now.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Name */}
      <div>
        <label style={labelBase}>Your Name *</label>
        <input
          name="name" value={form.name} onChange={handleChange}
          placeholder="e.g. Rahul Sharma"
          style={{ ...inputBase, borderColor: errors.name ? '#FC8181' : 'rgba(255,255,255,0.1)' }}
          onFocus={e => { e.target.style.borderColor = '#C084FC'; e.target.style.boxShadow = '0 0 0 3px rgba(192,132,252,0.12)'; }}
          onBlur={e  => { e.target.style.borderColor = errors.name ? '#FC8181' : 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
        />
        {errors.name && <p style={errStyle}>{errors.name}</p>}
      </div>

      {/* Role */}
      <div>
        <label style={labelBase}>Your Role *</label>
        <input
          name="role" value={form.role} onChange={handleChange}
          placeholder="e.g. Product Manager"
          style={{ ...inputBase, borderColor: errors.role ? '#FC8181' : 'rgba(255,255,255,0.1)' }}
          onFocus={e => { e.target.style.borderColor = '#C084FC'; e.target.style.boxShadow = '0 0 0 3px rgba(192,132,252,0.12)'; }}
          onBlur={e  => { e.target.style.borderColor = errors.role ? '#FC8181' : 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
        />
        {errors.role && <p style={errStyle}>{errors.role}</p>}
      </div>

      {/* Company (optional) */}
      <div>
        <label style={labelBase}>Company <span style={{ opacity: 0.4, fontWeight: 400 }}>(optional)</span></label>
        <input
          name="company" value={form.company} onChange={handleChange}
          placeholder="e.g. Google"
          style={inputBase}
          onFocus={e => { e.target.style.borderColor = '#C084FC'; e.target.style.boxShadow = '0 0 0 3px rgba(192,132,252,0.12)'; }}
          onBlur={e  => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
        />
      </div>

      {/* Review */}
      <div>
        <label style={labelBase}>Share Your Experience with Kayas *</label>
        <textarea
          name="text" value={form.text} onChange={handleChange}
          placeholder="Tell others what it was like working with Kayas…"
          rows={5}
          style={{ ...inputBase, resize: 'vertical', lineHeight: '1.6', borderColor: errors.text ? '#FC8181' : 'rgba(255,255,255,0.1)' }}
          onFocus={e => { e.target.style.borderColor = '#C084FC'; e.target.style.boxShadow = '0 0 0 3px rgba(192,132,252,0.12)'; }}
          onBlur={e  => { e.target.style.borderColor = errors.text ? '#FC8181' : 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
        />
        {errors.text && <p style={errStyle}>{errors.text}</p>}
      </div>

      {errMsg && (
        <p style={{ ...errStyle, padding: '0.6rem 0.8rem', background: 'rgba(252,129,129,0.08)', borderRadius: '0.5rem', border: '1px solid rgba(252,129,129,0.2)' }}>
          ⚠ {errMsg}
        </p>
      )}

      <motion.button
        type="submit"
        disabled={status === 'loading'}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          width: '100%',
          padding: '0.85rem',
          borderRadius: '0.75rem',
          border: 'none',
          background: 'linear-gradient(135deg, #C084FC, #F5A623)',
          color: '#000',
          fontWeight: '800',
          fontSize: '0.9rem',
          letterSpacing: '0.05em',
          cursor: status === 'loading' ? 'wait' : 'pointer',
          opacity: status === 'loading' ? 0.7 : 1,
          transition: 'opacity 0.2s',
          fontFamily: 'var(--font-display)',
        }}
      >
        {status === 'loading' ? '⏳ Submitting…' : '✦ Submit Review'}
      </motion.button>
    </form>
  );
}

/* ─── Main Section ───────────────────────────────────────────────── */
export default function Testimonials() {
  const [allTestimonials, setAllTestimonials] = useState([]);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const autoRef = useRef(null);

  /* Fetch DB testimonials and merge with seed data */
  useEffect(() => {
    const merged = [...seedTestimonials];
    axios.get(`${API}/testimonials`)
      .then(res => {
        if (res.data.success && res.data.testimonials.length) {
          setAllTestimonials([...merged, ...res.data.testimonials]);
        } else {
          setAllTestimonials(merged);
        }
      })
      .catch(() => setAllTestimonials(merged));
  }, []);

  const total = allTestimonials.length;
  const accent = accentColors[current % accentColors.length];

  /* Auto-advance */
  const startAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setDirection(1);
      setCurrent(c => (c + 1) % total);
    }, 7000);
  }, [total]);

  useEffect(() => { if (total > 0) startAuto(); return () => clearInterval(autoRef.current); }, [total, startAuto]);

  const goTo = (idx) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
    startAuto();
  };
  const prev = () => { setDirection(-1); setCurrent(c => (c - 1 + total) % total); startAuto(); };
  const next = () => { setDirection(1);  setCurrent(c => (c + 1) % total); startAuto(); };

  const handleNewTestimonial = (t) => {
    setAllTestimonials(prev => [...prev, t]);
    setTimeout(() => {
      setDirection(1);
      setCurrent(allTestimonials.length); // jump to the new card
    }, 400);
  };

  const variants = {
    enter:  (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80, scale: 0.95 }),
    center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    exit:   (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80, scale: 0.95, transition: { duration: 0.35, ease: 'easeIn' } }),
  };

  return (
    <section
      id="testimonials"
      style={{ padding: '15px 0 80px 0', backgroundColor: '#020205', position: 'relative', zIndex: 5, overflow: 'hidden' }}
    >
      {/* Decorative blobs */}
      <div className="glow-blob blob-navy float-1" style={{ top: '20%', left: '-12%', opacity: 0.12, width: '500px', height: '500px' }} />
      <div className="glow-blob blob-gold float-2" style={{ bottom: '10%', right: '-10%', opacity: 0.08, width: '400px', height: '400px' }} />

      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <span style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontWeight: '800', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-display)' }}>
            <span style={{ color: '#C084FC' }}>✦</span> RECOMMENDATIONS <span style={{ color: '#C084FC' }}>✦</span>
          </span>
          <h2 style={{ marginTop: '0.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-display)', fontWeight: '900', letterSpacing: '-0.03em' }}>
            <span style={{ color: '#fff' }}>What People </span>
            <span style={{ background: 'linear-gradient(135deg, #F5A623 0%, #C084FC 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Say</span>
          </h2>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '2.5rem', alignItems: 'start' }}>

          {/* LEFT: Feedback form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div style={{
              background: 'rgba(8,10,28,0.7)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(192,132,252,0.2)',
              borderRadius: '1.5rem',
              padding: '2rem 1.75rem',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 40px rgba(192,132,252,0.1), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}>
              {/* Top accent bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, transparent, #C084FC, #F5A623, transparent)', borderRadius: '1.5rem 1.5rem 0 0' }} />
              <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '160px', height: '160px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,132,252,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

              <h3 style={{ margin: '0 0 0.35rem', fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: '800', color: '#fff' }}>
                ✍️ Leave a Review
              </h3>
              <p style={{ margin: '0 0 1.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                Your review will appear live instantly in the carousel →
              </p>
              <FeedbackForm onSubmitSuccess={handleNewTestimonial} />
            </div>
          </motion.div>

          {/* RIGHT: Testimonials carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            {/* Card area */}
            <div style={{ position: 'relative', minHeight: '320px' }}>
              <AnimatePresence mode="wait" custom={direction}>
                {allTestimonials.length > 0 && (
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    style={{ position: 'absolute', inset: 0 }}
                  >
                    <TestimonialCard
                      item={allTestimonials[current]}
                      accent={accentColors[current % accentColors.length]}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {/* Dot indicators */}
              <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center' }}>
                {allTestimonials.map((_, i) => {
                  const a = accentColors[i % accentColors.length];
                  return (
                    <motion.button
                      key={i}
                      onClick={() => goTo(i)}
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.9 }}
                      style={{
                        width: i === current ? '24px' : '8px',
                        height: '8px',
                        borderRadius: '999px',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        background: i === current ? a : 'rgba(255,255,255,0.15)',
                        boxShadow: i === current ? `0 0 8px ${a}` : 'none',
                        transition: 'all 0.3s ease',
                      }}
                    />
                  );
                })}
              </div>

              {/* Prev / Next arrow buttons */}
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                {[{ label: '←', action: prev }, { label: '→', action: next }].map(({ label, action }) => (
                  <motion.button
                    key={label}
                    onClick={action}
                    whileHover={{ scale: 1.1, backgroundColor: `${accent}25` }}
                    whileTap={{ scale: 0.93 }}
                    style={{
                      width: '44px', height: '44px',
                      borderRadius: '50%',
                      border: `1px solid ${accent}40`,
                      background: 'rgba(255,255,255,0.04)',
                      color: accent,
                      fontSize: '1.1rem',
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 0.25s, border-color 0.25s',
                      boxShadow: `0 0 0 0 ${accent}`,
                    }}
                  >
                    {label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Counter */}
            <p style={{ margin: 0, textAlign: 'right', fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)', fontVariantNumeric: 'tabular-nums' }}>
              <span style={{ color: accent, fontWeight: '700' }}>{String(current + 1).padStart(2, '0')}</span>
              <span style={{ margin: '0 0.25rem' }}>/</span>
              {String(total).padStart(2, '0')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Responsive: stack on mobile */}
      <style>{`
        @media (max-width: 768px) {
          #testimonials .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
