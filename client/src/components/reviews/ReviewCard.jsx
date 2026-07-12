import React, { memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReviewStars from './ReviewStars';

/**
 * Formats a date as "Jul 12, 2025"
 */
function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Derives an avatar colour from the first letter of the name.
 */
const AVATAR_COLORS = [
  '#7C3AED', '#DB2777', '#D97706', '#059669',
  '#2563EB', '#9333EA', '#DC2626', '#0891B2',
];
function avatarColor(name = '') {
  const code = name.charCodeAt(0) || 65;
  return AVATAR_COLORS[code % AVATAR_COLORS.length];
}

const ReviewCard = memo(function ReviewCard({ review, isNew, cardRef }) {
  const [highlight, setHighlight] = useState(isNew);

  // Remove highlight glow after 3 s
  useEffect(() => {
    if (!isNew) return;
    const t = setTimeout(() => setHighlight(false), 3000);
    return () => clearTimeout(t);
  }, [isNew]);

  const color = avatarColor(review.name);
  const initial = (review.name || '?')[0].toUpperCase();

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        padding: '1.5rem',
        background: highlight
          ? 'rgba(139,92,246,0.12)'
          : 'rgba(255,255,255,0.03)',
        border: highlight
          ? '1px solid rgba(139,92,246,0.55)'
          : '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        transition: 'background 0.6s ease, border-color 0.6s ease, box-shadow 0.3s ease',
        boxShadow: highlight
          ? '0 0 24px rgba(139,92,246,0.25)'
          : '0 4px 20px rgba(0,0,0,0.2)',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(139,92,246,0.07)';
        e.currentTarget.style.borderColor = 'rgba(139,92,246,0.3)';
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = highlight ? 'rgba(139,92,246,0.12)' : 'rgba(255,255,255,0.03)';
        e.currentTarget.style.borderColor = highlight ? 'rgba(139,92,246,0.55)' : 'rgba(255,255,255,0.08)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Header row: avatar + name + stars */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem', marginBottom: '1rem' }}>
        {/* Avatar */}
        <div
          aria-hidden="true"
          style={{
            width: '44px', height: '44px', flexShrink: 0,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${color}40, ${color}20)`,
            border: `2px solid ${color}60`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: '900', fontSize: '1.1rem',
            color: color,
            boxShadow: `0 0 12px ${color}30`,
            fontFamily: 'Georgia, serif',
          }}
        >
          {initial}
        </div>

        {/* Name + stars + date */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
            <div style={{ color: '#E2E8F0', fontWeight: '700', fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {review.name}
              {isNew && (
                <span style={{ marginLeft: '0.5rem', padding: '2px 8px', background: 'rgba(139,92,246,0.25)', border: '1px solid rgba(139,92,246,0.4)', borderRadius: '99px', fontSize: '0.65rem', color: '#C4B5FD', fontWeight: '800', letterSpacing: '0.05em', verticalAlign: 'middle' }}>
                  NEW
                </span>
              )}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
              {formatDate(review.createdAt)}
            </div>
          </div>
          <div style={{ marginTop: '4px' }}>
            <ReviewStars value={review.rating} interactive={false} size="0.85rem" />
          </div>
        </div>
      </div>

      {/* Message */}
      <p style={{
        color: 'rgba(255,255,255,0.68)',
        fontSize: '0.9rem',
        lineHeight: 1.75,
        fontStyle: 'italic',
        margin: 0,
        fontFamily: 'Georgia, serif',
      }}>
        "{review.message}"
      </p>
    </motion.div>
  );
});

export default ReviewCard;
