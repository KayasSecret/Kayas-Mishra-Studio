import React, { memo } from 'react';
import { CATEGORIES } from '../../data/characters';

const CharacterFilter = memo(function CharacterFilter({ active, onChange, counts }) {
  return (
    <div style={{
      display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center',
      marginBottom: '1.25rem',
    }}>
      {CATEGORIES.map((cat) => {
        const isActive = active === cat.key;
        const count    = counts[cat.key] ?? 0;
        return (
          <button
            key={cat.key}
            onClick={() => onChange(cat.key)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.45rem',
              padding: '0.55rem 1.15rem',
              background: isActive
                ? `linear-gradient(135deg, ${cat.color}35, ${cat.color}18)`
                : 'rgba(255,255,255,0.04)',
              border: isActive
                ? `1px solid ${cat.color}60`
                : '1px solid rgba(255,255,255,0.08)',
              borderRadius: '99px',
              color: isActive ? cat.color : 'rgba(255,255,255,0.45)',
              fontWeight: isActive ? '800' : '600',
              fontSize: '0.8rem', letterSpacing: '0.06em',
              cursor: 'pointer',
              transition: 'all 0.22s ease',
              boxShadow: isActive ? `0 4px 16px ${cat.color}20` : 'none',
              fontFamily: '"Inter", system-ui, sans-serif',
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = `${cat.color}15`;
                e.currentTarget.style.borderColor = `${cat.color}40`;
                e.currentTarget.style.color = cat.color;
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
              }
            }}
          >
            {/* Active dot indicator */}
            {isActive && (
              <div style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: cat.color, boxShadow: `0 0 6px ${cat.color}`,
                flexShrink: 0,
              }} />
            )}
            {cat.label}
            {/* Count badge */}
            <span style={{
              padding: '1px 7px',
              background: isActive ? `${cat.color}25` : 'rgba(255,255,255,0.06)',
              border: `1px solid ${isActive ? cat.color + '40' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '99px',
              fontSize: '0.65rem', fontWeight: '700',
              color: isActive ? cat.color : 'rgba(255,255,255,0.3)',
            }}>
              {cat.key === 'all' ? counts.all : count}
            </span>
          </button>
        );
      })}
    </div>
  );
});

export default CharacterFilter;
