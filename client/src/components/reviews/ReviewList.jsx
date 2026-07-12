import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GiCrystalBall } from 'react-icons/gi';
import { FaChevronDown } from 'react-icons/fa';
import ReviewForm from './ReviewForm';
import ReviewCard from './ReviewCard';
import SkeletonReview from './SkeletonReview';
import { useReviews } from '../../hooks/useReviews';

/* ── Rating summary bar ───────────────────────────────────────────── */
function RatingSummary({ reviews }) {
  if (!reviews.length) return null;
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  const countFor = (star) => reviews.filter((r) => r.rating === star).length;
  const pct = (star) =>
    reviews.length ? Math.round((countFor(star) / reviews.length) * 100) : 0;

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap',
      padding: '1.5rem', background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px',
      marginBottom: '2rem',
    }}>
      {/* Average */}
      <div style={{ textAlign: 'center', minWidth: '80px' }}>
        <div style={{ fontSize: '3.2rem', fontWeight: '900', color: '#F59E0B', lineHeight: 1 }}>{avg}</div>
        <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', marginTop: '4px' }}>
          {[1,2,3,4,5].map((s) => (
            <span key={s} style={{ color: s <= Math.round(avg) ? '#F59E0B' : 'rgba(255,255,255,0.15)', fontSize: '0.8rem' }}>★</span>
          ))}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', marginTop: '4px' }}>
          {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
        </div>
      </div>

      {/* Bars */}
      <div style={{ flex: 1, minWidth: '160px' }}>
        {[5,4,3,2,1].map((star) => (
          <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '5px' }}>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', minWidth: '10px' }}>{star}</span>
            <span style={{ color: '#F59E0B', fontSize: '0.7rem' }}>★</span>
            <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct(star)}%` }}
                transition={{ duration: 0.6, delay: (5 - star) * 0.05, ease: 'easeOut' }}
                style={{ height: '100%', background: 'linear-gradient(90deg,#D97706,#F59E0B)', borderRadius: '3px' }}
              />
            </div>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.72rem', minWidth: '28px' }}>{pct(star)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Empty state ─────────────────────────────────────────────────── */
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        textAlign: 'center', padding: '3.5rem 2rem',
        border: '1px dashed rgba(139,92,246,0.2)', borderRadius: '16px',
        background: 'rgba(139,92,246,0.03)',
      }}
    >
      <div style={{ fontSize: '3.5rem', marginBottom: '1rem', opacity: 0.5 }}>
        <GiCrystalBall style={{ color: '#C4B5FD', filter: 'drop-shadow(0 0 12px rgba(196,181,253,0.4))' }} />
      </div>
      <p style={{ color: '#C4B5FD', fontWeight: '700', fontSize: '1rem', fontFamily: 'Georgia, serif', margin: '0 0 0.4rem' }}>
        The Realm Awaits Its First Chronicle
      </p>
      <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem', margin: 0 }}>
        Be the first adventurer to leave a review.
      </p>
    </motion.div>
  );
}

/* ── Show More button ─────────────────────────────────────────────── */
function ShowMoreButton({ onClick }) {
  return (
    <div style={{ textAlign: 'center', marginTop: '1.75rem' }}>
      <button
        onClick={onClick}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.75rem 2rem',
          background: 'rgba(139,92,246,0.1)',
          border: '1px solid rgba(139,92,246,0.3)', borderRadius: '12px',
          color: '#C4B5FD', fontWeight: '700', fontSize: '0.88rem',
          cursor: 'pointer', transition: 'all 0.22s ease',
          fontFamily: '"Inter", system-ui, sans-serif',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(139,92,246,0.2)'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.55)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(139,92,246,0.1)'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.3)'; e.currentTarget.style.transform = ''; }}
      >
        <FaChevronDown style={{ fontSize: '0.75rem' }} /> Show More Reviews
      </button>
    </div>
  );
}

/* ── Main ReviewList ───────────────────────────────────────────────── */
const ReviewList = memo(function ReviewList() {
  const {
    reviews, totalCount, loading, fetchError,
    hasMore, loadMore,
    addReview, submitting, submitError, fieldErrors,
    lastAddedId, newReviewRef,
  } = useReviews();

  return (
    <div>
      {/* Section heading */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.6rem', fontWeight: '900', color: '#C4B5FD', margin: '0 0 0.35rem' }}>
          Adventurers Speak
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem', margin: 0 }}>
          Real reviews from real readers of the Shattered Realm.
        </p>
      </div>

      {/* Review Form */}
      <ReviewForm
        onSubmit={addReview}
        submitting={submitting}
        fieldErrors={fieldErrors}
        submitError={submitError}
      />

      {/* Rating summary — only when there are reviews */}
      {!loading && !fetchError && reviews.length > 0 && (
        <RatingSummary reviews={reviews} />
      )}

      {/* Fetch error */}
      {fetchError && (
        <div style={{
          padding: '1.25rem', background: 'rgba(239,68,68,0.07)',
          border: '1px solid rgba(239,68,68,0.25)', borderRadius: '12px',
          color: '#FC8181', fontSize: '0.88rem', fontWeight: '600',
          marginBottom: '1.5rem',
        }}>
          ⚠ Could not load reviews — {fetchError}
        </div>
      )}

      {/* Skeletons while loading */}
      {loading && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {[1,2,3,4].map((n) => <SkeletonReview key={n} />)}
        </div>
      )}

      {/* Empty state */}
      {!loading && !fetchError && reviews.length === 0 && <EmptyState />}

      {/* Review cards */}
      {!loading && reviews.length > 0 && (
        <AnimatePresence>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {reviews.map((r) => (
              <ReviewCard
                key={r._id}
                review={r}
                isNew={r._id === lastAddedId}
                cardRef={r._id === lastAddedId ? newReviewRef : undefined}
              />
            ))}
          </div>
        </AnimatePresence>
      )}

      {/* Show More */}
      {!loading && hasMore && <ShowMoreButton onClick={loadMore} />}

      {/* All loaded indicator */}
      {!loading && totalCount > 4 && !hasMore && (
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontSize: '0.8rem', marginTop: '1.5rem' }}>
          — All {totalCount} reviews shown —
        </p>
      )}
    </div>
  );
});

export default ReviewList;
