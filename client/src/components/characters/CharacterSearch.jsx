import React, { memo } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const CharacterSearch = memo(function CharacterSearch({ value, onChange }) {
  return (
    <div style={{ position: 'relative', maxWidth: '360px', width: '100%' }}>
      {/* Search icon */}
      <FaSearch style={{
        position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
        color: value ? '#C4B5FD' : 'rgba(255,255,255,0.3)',
        fontSize: '0.82rem', pointerEvents: 'none',
        transition: 'color 0.2s ease',
      }} />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search characters..."
        aria-label="Search characters by name"
        style={{
          width: '100%',
          padding: '0.65rem 2.5rem 0.65rem 2.5rem',
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${value ? 'rgba(139,92,246,0.55)' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: '99px',
          color: '#E2E8F0',
          fontSize: '0.85rem',
          outline: 'none',
          fontFamily: '"Inter", system-ui, sans-serif',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          boxSizing: 'border-box',
          boxShadow: value ? '0 0 0 3px rgba(139,92,246,0.1)' : 'none',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'rgba(139,92,246,0.65)';
          e.target.style.boxShadow   = '0 0 0 3px rgba(139,92,246,0.12)';
          e.target.style.background  = 'rgba(255,255,255,0.06)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = value ? 'rgba(139,92,246,0.55)' : 'rgba(255,255,255,0.1)';
          e.target.style.boxShadow   = value ? '0 0 0 3px rgba(139,92,246,0.1)' : 'none';
          e.target.style.background  = 'rgba(255,255,255,0.04)';
        }}
      />

      {/* Clear button */}
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Clear search"
          style={{
            position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', padding: '0.2rem',
            transition: 'color 0.2s ease',
            display: 'flex', alignItems: 'center',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#C4B5FD'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
});

export default CharacterSearch;
