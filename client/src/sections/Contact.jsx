import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';

const API = 'http://localhost:5000/api';

/* ─── Floating label input ──────────────────────────────────────── */
function FloatingField({ label, name, type = 'text', value, onChange, onFocus, onBlur, error, multiline, rows = 5, accentColor }) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div style={{ position: 'relative', paddingTop: '1rem' }}>
      <label
        style={{
          position: 'absolute',
          left: '1rem',
          top: lifted ? '0' : '1.7rem',
          fontSize: lifted ? '0.68rem' : '0.92rem',
          fontWeight: lifted ? '700' : '500',
          letterSpacing: lifted ? '0.1em' : '0',
          textTransform: lifted ? 'uppercase' : 'none',
          color: focused ? accentColor : 'rgba(255,255,255,0.35)',
          pointerEvents: 'none',
          transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)',
          zIndex: 1,
        }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          name={name} value={value} onChange={onChange} rows={rows}
          onFocus={() => { setFocused(true); onFocus && onFocus(); }}
          onBlur={() => { setFocused(false); onBlur && onBlur(); }}
          style={{
            width: '100%',
            padding: '1.1rem 1rem 0.7rem',
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${error ? '#FC8181' : focused ? accentColor : 'rgba(255,255,255,0.1)'}`,
            borderRadius: '0.75rem',
            color: '#fff',
            fontSize: '0.92rem',
            lineHeight: '1.65',
            outline: 'none',
            resize: 'vertical',
            boxShadow: focused ? `0 0 0 3px ${accentColor}18` : 'none',
            transition: 'border-color 0.22s, box-shadow 0.22s',
            boxSizing: 'border-box',
          }}
        />
      ) : (
        <input
          name={name} value={value} onChange={onChange} type={type}
          onFocus={() => { setFocused(true); onFocus && onFocus(); }}
          onBlur={() => { setFocused(false); onBlur && onBlur(); }}
          style={{
            width: '100%',
            padding: '1.1rem 1rem 0.7rem',
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${error ? '#FC8181' : focused ? accentColor : 'rgba(255,255,255,0.1)'}`,
            borderRadius: '0.75rem',
            color: '#fff',
            fontSize: '0.92rem',
            outline: 'none',
            boxShadow: focused ? `0 0 0 3px ${accentColor}18` : 'none',
            transition: 'border-color 0.22s, box-shadow 0.22s',
            boxSizing: 'border-box',
          }}
        />
      )}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            style={{ margin: '0.3rem 0 0', fontSize: '0.72rem', color: '#FC8181', paddingLeft: '0.25rem' }}
          >
            ⚠ {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Tilt card wrapper ─────────────────────────────────────────── */
function TiltCard({ children, style }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-4, 4]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800, ...style }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Info chip ─────────────────────────────────────────────────── */
function InfoChip({ icon, label, href, accent }) {
  const inner = (
    <motion.div
      whileHover={{ x: 4 }}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.85rem',
        padding: '0.9rem 1.1rem',
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid rgba(255,255,255,0.08)`,
        borderRadius: '0.75rem',
        cursor: href ? 'pointer' : 'default',
        transition: 'background 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = `${accent}10`}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
    >
      <span style={{ color: accent, fontSize: '1rem', flexShrink: 0 }}>{icon}</span>
      <span style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)', fontWeight: '500' }}>{label}</span>
    </motion.div>
  );
  return href
    ? <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>{inner}</a>
    : inner;
}

/* ─── Main Contact section ──────────────────────────────────────── */
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Your name is required';
    if (!form.email.trim()) e.email = 'Your email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message cannot be empty';
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
    setApiError('');
    try {
      const res = await axios.post(`${API}/contact`, form);
      if (res.data.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setApiError(res.data.error || 'Something went wrong.');
      }
    } catch (err) {
      setStatus('error');
      setApiError(err.response?.data?.error || 'Server connection failed. Please try again.');
    }
  };

  /* particles data */
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    dur: Math.random() * 6 + 4,
    delay: Math.random() * 4,
    color: ['#C084FC', '#F5A623', '#22D3EE', '#34D399'][i % 4],
  }));

  return (
    <section
      id="contact"
      style={{ padding: '15px 0 80px 0', backgroundColor: '#020205', position: 'relative', zIndex: 5, overflow: 'hidden' }}
    >
      {/* ── Background particles ── */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          animate={{ y: [0, -30, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            borderRadius: '50%',
            background: p.color,
            filter: `blur(${p.size > 2.5 ? 2 : 0}px)`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      ))}

      {/* Glow blobs */}
      <div className="glow-blob blob-navy float-1" style={{ top: '10%', left: '-15%', opacity: 0.15, width: '600px', height: '600px' }} />
      <div className="glow-blob blob-gold float-2" style={{ bottom: '5%', right: '-12%', opacity: 0.09, width: '500px', height: '500px' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Header ── */}
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
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
            <span style={{ color: '#C084FC' }}>✦</span> CONNECTION{' '}
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
            <span style={{ color: '#fff' }}>Get In </span>
            <span
              style={{
                background: 'linear-gradient(135deg,#F5A623 0%,#C084FC 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Touch
            </span>
          </h2>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2.5rem', alignItems: 'start' }}>

          {/* LEFT: Contact info card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <TiltCard>
              <div style={{
                background: 'rgba(8,10,28,0.75)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(192,132,252,0.2)',
                borderRadius: '1.5rem',
                padding: '2.5rem 2rem',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 4px 50px rgba(192,132,252,0.12), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}>
                {/* Top accent bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, transparent, #C084FC, #F5A623, transparent)', borderRadius: '1.5rem 1.5rem 0 0' }} />
                <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,132,252,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

                {/* Avatar area */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
                  <motion.div
                    animate={{ boxShadow: ['0 0 0 0 rgba(192,132,252,0.5)', '0 0 0 12px rgba(192,132,252,0)', '0 0 0 0 rgba(192,132,252,0)'] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg,#C084FC,#F5A623)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}
                  >
                    👨‍💻
                  </motion.div>
                  <div>
                    <p style={{ margin: 0, fontWeight: '800', fontSize: '1rem', color: '#fff', fontFamily: 'var(--font-display)' }}>Kayas Mishra</p>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#C084FC', fontWeight: '600' }}>Full Stack Engineer</p>
                  </div>
                </div>

                {/* Availability badge */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)', borderRadius: '999px', padding: '0.4rem 0.9rem', marginBottom: '1.75rem' }}>
                  <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#34D399', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#34D399', letterSpacing: '0.05em' }}>Available for work</span>
                </div>

                {/* Info chips */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.75rem' }}>
                  <InfoChip icon={<FaEnvelope />} label="kayasmishra29s@gmail.com" href="mailto:kayasmishra29s@gmail.com" accent="#F5A623" />
                  <InfoChip icon={<FaMapMarkerAlt />} label="India · Remote Friendly" accent="#22D3EE" />
                  <InfoChip icon={<FaGithub />} label="github.com/KayasSecret" href="https://github.com/KayasSecret" accent="#C084FC" />
                  <InfoChip icon={<FaLinkedin />} label="linkedin.com/in/kayas-mishra" href="https://www.linkedin.com/in/kayas-mishra" accent="#34D399" />
                </div>

                {/* Divider */}
                <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(192,132,252,0.3), transparent)', marginBottom: '1.25rem' }} />

                <p style={{ margin: 0, fontSize: '0.82rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.65, textAlign: 'center' }}>
                  I typically reply within <strong style={{ color: 'rgba(255,255,255,0.6)' }}>24 hours</strong>. Let's build something great together.
                </p>
              </div>
            </TiltCard>
          </motion.div>

          {/* RIGHT: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div style={{
              background: 'rgba(8,10,28,0.75)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(245,166,35,0.2)',
              borderRadius: '1.5rem',
              padding: '2.5rem 2.25rem',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 50px rgba(245,166,35,0.08), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}>
              {/* Top accent bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, transparent, #F5A623, #C084FC, transparent)', borderRadius: '1.5rem 1.5rem 0 0' }} />
              <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,166,35,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ textAlign: 'center', padding: '3rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
                      style={{ fontSize: '4rem', lineHeight: 1 }}
                    >
                      🚀
                    </motion.div>
                    <div>
                      <h3 style={{ margin: '0 0 0.5rem', color: '#34D399', fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: '900' }}>Message Sent!</h3>
                      <p style={{ margin: 0, color: 'rgba(255,255,255,0.55)', fontSize: '0.92rem', lineHeight: 1.65 }}>
                        Your message has been delivered to Kayas's inbox.<br />Expect a reply within 24 hours. 🎉
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                      onClick={() => setStatus('idle')}
                      style={{ padding: '0.7rem 1.75rem', borderRadius: '999px', border: '1px solid rgba(52,211,153,0.4)', background: 'rgba(52,211,153,0.08)', color: '#34D399', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer' }}
                    >
                      Send Another ↩
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    noValidate
                    style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}
                  >
                    <h3 style={{ margin: '0 0 0.25rem', fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: '800', color: '#fff' }}>Send a Message</h3>
                    <p style={{ margin: '0 0 0.5rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.35)' }}>Fill the form and hit send — I'll get back to you soon.</p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <FloatingField label="Your Name" name="name" value={form.name} onChange={handleChange} error={errors.name} accentColor="#C084FC" />
                      <FloatingField label="Your Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} accentColor="#F5A623" />
                    </div>

                    <FloatingField label="Your Message" name="message" value={form.message} onChange={handleChange} error={errors.message} multiline rows={6} accentColor="#22D3EE" />

                    <AnimatePresence>
                      {apiError && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                          style={{ padding: '0.75rem 1rem', background: 'rgba(252,129,129,0.08)', border: '1px solid rgba(252,129,129,0.25)', borderRadius: '0.6rem', fontSize: '0.82rem', color: '#FC8181' }}
                        >
                          ⚠ {apiError}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      type="submit"
                      disabled={status === 'loading'}
                      whileHover={{ scale: status === 'loading' ? 1 : 1.02, boxShadow: status === 'loading' ? 'none' : '0 8px 30px rgba(192,132,252,0.35)' }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        position: 'relative',
                        width: '100%',
                        padding: '1rem',
                        borderRadius: '0.85rem',
                        border: 'none',
                        background: status === 'loading' ? 'rgba(255,255,255,0.08)' : 'linear-gradient(135deg,#C084FC 0%,#F5A623 100%)',
                        color: status === 'loading' ? 'rgba(255,255,255,0.4)' : '#000',
                        fontWeight: '800',
                        fontSize: '0.95rem',
                        letterSpacing: '0.04em',
                        cursor: status === 'loading' ? 'wait' : 'pointer',
                        fontFamily: 'var(--font-display)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.6rem',
                        transition: 'background 0.3s',
                        overflow: 'hidden',
                      }}
                    >
                      {status === 'loading' ? (
                        <>
                          <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ display: 'inline-block' }}>⏳</motion.span>
                          Sending…
                        </>
                      ) : (
                        <>
                          <FaPaperPlane />
                          Send Message
                        </>
                      )}
                      {/* shimmer sweep */}
                      {status !== 'loading' && (
                        <motion.div
                          animate={{ x: ['-100%', '200%'] }}
                          transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
                          style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)', pointerEvents: 'none' }}
                        />
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
