import React, { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import ReviewStars from './ReviewStars';

const EMPTY = { name: '', email: '', rating: 0, message: '' };

/**
 * Premium glassmorphism review submission form.
 * All validation errors shown inline. Shows success toast on submit.
 */
const ReviewForm = memo(function ReviewForm({ onSubmit, submitting, fieldErrors, submitError }) {
  const [form, setForm]           = useState(EMPTY);
  const [localErrors, setLocalErrors] = useState({});
  const [hoveredStar, setHoveredStar] = useState(null);
  const [successToast, setSuccessToast] = useState(false);

  const errors = { ...localErrors, ...fieldErrors }; // backend errors override local

  // ── Field handlers ─────────────────────────────────────────────────
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setLocalErrors((prev) => ({ ...prev, [name]: '' }));
  }, []);

  const handleRating = useCallback((val) => {
    setForm((prev) => ({ ...prev, rating: val }));
    setLocalErrors((prev) => ({ ...prev, rating: '' }));
  }, []);

  // ── Client-side pre-validate before hitting backend ────────────────
  function validateLocally() {
    const errs = {};
    if (!form.name.trim() || form.name.trim().length < 3)
      errs.name = 'Name must be at least 3 characters.';
    if (form.name.trim().length > 40)
      errs.name = 'Name must not exceed 40 characters.';
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email.trim()))
      errs.email = 'Please enter a valid email address.';
    if (!form.rating || form.rating < 1)
      errs.rating = 'Please select a rating (1–5 stars).';
    if (!form.message.trim() || form.message.trim().length < 15)
      errs.message = 'Review must be at least 15 characters.';
    if (form.message.trim().length > 500)
      errs.message = 'Review must not exceed 500 characters.';
    return errs;
  }

  // ── Submit ─────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateLocally();
    if (Object.keys(errs).length > 0) {
      setLocalErrors(errs);
      return;
    }
    const result = await onSubmit(form);
    if (result?.success) {
      setForm(EMPTY);
      setLocalErrors({});
      setHoveredStar(null);
      setSuccessToast(true);
      setTimeout(() => setSuccessToast(false), 4500);
    }
  };

  // ── Shared styles ──────────────────────────────────────────────────
  const inputStyle = (field) => ({
    width: '100%',
    padding: '0.85rem 1.1rem',
    background: errors[field] ? 'rgba(239,68,68,0.06)' : 'rgba(255,255,255,0.04)',
    border: `1px solid ${errors[field] ? 'rgba(239,68,68,0.5)' : 'rgba(139,92,246,0.25)'}`,
    borderRadius: '12px',
    color: '#E2E8F0',
    fontSize: '0.92rem',
    fontFamily: '"Inter", system-ui, sans-serif',
    outline: 'none',
    transition: 'border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease',
    boxSizing: 'border-box',
  });

  const labelStyle = {
    display: 'block',
    color: 'rgba(255,255,255,0.55)',
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    marginBottom: '0.5rem',
  };

  const errorStyle = {
    color: '#FC8181',
    fontSize: '0.76rem',
    fontWeight: '600',
    marginTop: '0.35rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
  };

  const charCount = form.message.trim().length;

  return (
    <div style={{
      padding: '2rem',
      background: 'rgba(10,4,28,0.7)',
      backdropFilter: 'blur(24px)',
      border: '1px solid rgba(139,92,246,0.3)',
      borderRadius: '20px',
      boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
      marginBottom: '2.5rem',
      position: 'relative',
    }}>
      {/* Title */}
      <div style={{ marginBottom: '1.75rem' }}>
        <h3 style={{
          fontFamily: 'Georgia, serif',
          fontSize: '1.3rem', fontWeight: '900',
          margin: '0 0 0.35rem',
          background: 'linear-gradient(135deg, #E2E8F0, #C4B5FD)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Share Your Experience
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', margin: 0 }}>
          Your words inspire others to begin their journey into the Shattered Realm.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Row: Name + Email */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }} className="rf-row">
          {/* Name */}
          <div>
            <label htmlFor="rf-name" style={labelStyle}>Full Name *</label>
            <input
              id="rf-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="e.g. Arjun Singh"
              value={form.name}
              onChange={handleChange}
              maxLength={40}
              style={inputStyle('name')}
              onFocus={(e) => { e.target.style.borderColor = 'rgba(139,92,246,0.7)'; e.target.style.boxShadow = '0 0 0 3px rgba(139,92,246,0.12)'; }}
              onBlur={(e) => { e.target.style.borderColor = errors.name ? 'rgba(239,68,68,0.5)' : 'rgba(139,92,246,0.25)'; e.target.style.boxShadow = 'none'; }}
            />
            {errors.name && (
              <div style={errorStyle}><FaExclamationCircle />{errors.name}</div>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="rf-email" style={labelStyle}>Email Address *</label>
            <input
              id="rf-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="e.g. hello@example.com"
              value={form.email}
              onChange={handleChange}
              style={inputStyle('email')}
              onFocus={(e) => { e.target.style.borderColor = 'rgba(139,92,246,0.7)'; e.target.style.boxShadow = '0 0 0 3px rgba(139,92,246,0.12)'; }}
              onBlur={(e) => { e.target.style.borderColor = errors.email ? 'rgba(239,68,68,0.5)' : 'rgba(139,92,246,0.25)'; e.target.style.boxShadow = 'none'; }}
            />
            {errors.email && (
              <div style={errorStyle}><FaExclamationCircle />{errors.email}</div>
            )}
          </div>
        </div>

        {/* Rating */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={labelStyle}>Your Rating *</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <ReviewStars
              value={form.rating}
              onChange={handleRating}
              interactive
              size="1.8rem"
              hovered={hoveredStar}
              onHover={setHoveredStar}
              onLeave={() => setHoveredStar(null)}
            />
            {form.rating > 0 && (
              <span style={{ color: '#F59E0B', fontSize: '0.82rem', fontWeight: '700' }}>
                {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'][form.rating]}
              </span>
            )}
          </div>
          {errors.rating && (
            <div style={errorStyle}><FaExclamationCircle />{errors.rating}</div>
          )}
        </div>

        {/* Message */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="rf-message" style={labelStyle}>
            Your Review *
            <span style={{ marginLeft: 'auto', float: 'right', color: charCount > 500 ? '#FC8181' : 'rgba(255,255,255,0.3)', fontWeight: '500', textTransform: 'none', letterSpacing: 0 }}>
              {charCount}/500
            </span>
          </label>
          <textarea
            id="rf-message"
            name="message"
            rows={4}
            placeholder="Share your honest thoughts about DRONZNIDO: The Hidden Kingdom of Wonders..."
            value={form.message}
            onChange={handleChange}
            maxLength={500}
            style={{
              ...inputStyle('message'),
              resize: 'vertical',
              minHeight: '110px',
              lineHeight: 1.7,
            }}
            onFocus={(e) => { e.target.style.borderColor = 'rgba(139,92,246,0.7)'; e.target.style.boxShadow = '0 0 0 3px rgba(139,92,246,0.12)'; }}
            onBlur={(e) => { e.target.style.borderColor = errors.message ? 'rgba(239,68,68,0.5)' : 'rgba(139,92,246,0.25)'; e.target.style.boxShadow = 'none'; }}
          />
          {errors.message && (
            <div style={errorStyle}><FaExclamationCircle />{errors.message}</div>
          )}
        </div>

        {/* Server error */}
        {submitError && (
          <div style={{ ...errorStyle, marginBottom: '1rem', padding: '0.75rem 1rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '10px' }}>
            <FaExclamationCircle />{submitError}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
            width: '100%', padding: '0.95rem 2rem',
            background: submitting
              ? 'rgba(124,58,237,0.4)'
              : 'linear-gradient(135deg, #7C3AED, #9333EA)',
            border: 'none', borderRadius: '12px',
            color: '#fff', fontWeight: '800', fontSize: '0.95rem',
            cursor: submitting ? 'not-allowed' : 'pointer',
            boxShadow: submitting ? 'none' : '0 6px 24px rgba(124,58,237,0.45)',
            transition: 'all 0.25s ease',
            fontFamily: '"Inter", system-ui, sans-serif',
          }}
          onMouseEnter={(e) => { if (!submitting) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(124,58,237,0.6)'; } }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = submitting ? 'none' : '0 6px 24px rgba(124,58,237,0.45)'; }}
        >
          {submitting ? (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ animation: 'spin 0.8s linear infinite' }}>
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
              Submitting...
            </>
          ) : (
            <><FaPaperPlane /> Submit Review</>
          )}
        </button>
      </form>

      {/* Success Toast */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              position: 'absolute', bottom: '-5rem', left: '50%', transform: 'translateX(-50%)',
              background: 'rgba(5,150,105,0.95)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(52,211,153,0.4)', borderRadius: '14px',
              padding: '0.85rem 1.5rem',
              display: 'flex', alignItems: 'center', gap: '0.6rem',
              color: '#ECFDF5', fontWeight: '700', fontSize: '0.9rem',
              boxShadow: '0 8px 32px rgba(5,150,105,0.4)',
              whiteSpace: 'nowrap',
              zIndex: 50,
            }}
          >
            <FaCheckCircle style={{ color: '#34D399', fontSize: '1.1rem' }} />
            Review submitted! Thank you, adventurer.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spin keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } .rf-row { } @media (max-width: 600px) { .rf-row { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
});

export default ReviewForm;
