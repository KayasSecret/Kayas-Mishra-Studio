import React, { memo } from 'react';
import { FaStar } from 'react-icons/fa';

/**
 * ReviewStars
 *
 * Two modes:
 *  - interactive={true}  → clickable star picker (for the form)
 *  - interactive={false} → read-only display (for review cards)
 */
const ReviewStars = memo(function ReviewStars({
  value = 0,
  onChange,
  interactive = false,
  size = '1.1rem',
  hovered,
  onHover,
  onLeave,
}) {
  return (
    <div
      role={interactive ? 'radiogroup' : undefined}
      aria-label={interactive ? 'Rating' : `${value} out of 5 stars`}
      style={{ display: 'flex', gap: '4px', alignItems: 'center' }}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = interactive
          ? star <= (hovered ?? value)
          : star <= value;

        return (
          <button
            key={star}
            type={interactive ? 'button' : undefined}
            role={interactive ? 'radio' : undefined}
            aria-checked={interactive ? star === value : undefined}
            aria-label={interactive ? `${star} star${star > 1 ? 's' : ''}` : undefined}
            onClick={interactive ? () => onChange(star) : undefined}
            onMouseEnter={interactive ? () => onHover?.(star) : undefined}
            onMouseLeave={interactive ? () => onLeave?.() : undefined}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: interactive ? 'pointer' : 'default',
              lineHeight: 1,
              transition: 'transform 0.15s ease',
              transform: interactive && filled ? 'scale(1.18)' : 'scale(1)',
            }}
          >
            <FaStar
              style={{
                fontSize: size,
                color: filled ? '#F59E0B' : 'rgba(255,255,255,0.18)',
                filter: filled && interactive ? 'drop-shadow(0 0 4px rgba(245,158,11,0.6))' : 'none',
                transition: 'color 0.15s ease, filter 0.15s ease',
              }}
            />
          </button>
        );
      })}
    </div>
  );
});

export default ReviewStars;
