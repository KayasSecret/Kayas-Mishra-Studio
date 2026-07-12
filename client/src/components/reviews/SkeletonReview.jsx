import React, { memo } from 'react';

const pulse = `
@keyframes reviewSkeletonPulse {
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 0.9; }
}
`;

const shimmer = {
  background: 'rgba(255,255,255,0.06)',
  borderRadius: '6px',
  animation: 'reviewSkeletonPulse 1.6s ease-in-out infinite',
};

const SkeletonReview = memo(function SkeletonReview() {
  return (
    <>
      <style>{pulse}</style>
      <div style={{
        padding: '1.5rem',
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px',
      }}>
        {/* Avatar + name row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '1rem' }}>
          <div style={{ ...shimmer, width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ ...shimmer, height: '13px', width: '40%', marginBottom: '8px' }} />
            <div style={{ ...shimmer, height: '10px', width: '28%' }} />
          </div>
        </div>
        {/* Message lines */}
        <div style={{ ...shimmer, height: '11px', width: '95%', marginBottom: '6px' }} />
        <div style={{ ...shimmer, height: '11px', width: '80%', marginBottom: '6px' }} />
        <div style={{ ...shimmer, height: '11px', width: '60%' }} />
      </div>
    </>
  );
});

export default SkeletonReview;
