import React, { memo, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import CharacterPortrait from './CharacterPortrait';
import { ALIGNMENT_COLORS, CATEGORIES } from '../../data/characters';

/* Maps category key → colour */
const CAT_COLOR = Object.fromEntries(CATEGORIES.map(c => [c.key, c.color]));

const CharacterCard = memo(function CharacterCard({ character, index, onSelect }) {
  const [hovered, setHovered]   = useState(false);
  const [tilt, setTilt]         = useState({ x: 0, y: 0 });
  const cardRef                 = useRef(null);

  const alignment = ALIGNMENT_COLORS[character.alignment] || ALIGNMENT_COLORS.Neutral;
  const catColor  = CAT_COLOR[character.category] || '#C4B5FD';

  /* ── 3-D tilt on mouse move ─────────────────────────────────── */
  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect  = card.getBoundingClientRect();
    const cx    = rect.left + rect.width  / 2;
    const cy    = rect.top  + rect.height / 2;
    const dx    = (e.clientX - cx) / (rect.width  / 2);
    const dy    = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: -dy * 8, y: dx * 8 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: 'easeOut' }}
      role="button"
      tabIndex={0}
      aria-label={`View ${character.name}`}
      onClick={() => onSelect(character)}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(character)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        cursor: 'pointer',
        perspective: '1000px',
        outline: 'none',
      }}
    >
      <div style={{
        position: 'relative',
        background: hovered
          ? `linear-gradient(160deg, rgba(14,6,32,0.95), rgba(${character.accentColor === '#F59E0B' ? '32,18,4' : character.accentColor === '#F87171' ? '32,4,4' : character.accentColor === '#38BDF8' ? '4,18,32' : character.accentColor === '#34D399' ? '4,24,14' : '14,6,32'},0.95))`
          : 'rgba(8,4,20,0.85)',
        backdropFilter: 'blur(20px)',
        border: hovered
          ? `1px solid ${character.accentColor}70`
          : '1px solid rgba(139,92,246,0.2)',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: hovered
          ? `0 24px 70px rgba(0,0,0,0.7), 0 0 45px ${character.accentColor}30, inset 0 1px 0 rgba(255,255,255,0.08)`
          : '0 8px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)',
        transform: hovered
          ? `translateY(-12px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : 'translateY(0) rotateX(0) rotateY(0)',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.15s ease, box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease',
        userSelect: 'none',
      }}>

        {/* ── Magic Symbol area ─────────────────────────────────── */}
        <div style={{
          position: 'relative',
          height: '180px',
          background: `radial-gradient(circle at 50% 50%, ${character.accentColor}15 0%, rgba(4,2,12,0.96) 80%)`,
          overflow: 'hidden',
          borderBottom: `1px solid ${hovered ? character.accentColor + '25' : 'rgba(255,255,255,0.04)'}`,
          transition: 'border-color 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Particle backdrop dots */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{
                position: 'absolute',
                left: `${(i * 47 + 15) % 80}%`,
                top:  `${(i * 61 + 20) % 75}%`,
                width: `${(i % 2) + 1.2}px`,
                height: `${(i % 2) + 1.2}px`,
                borderRadius: '50%',
                background: character.accentColor,
                opacity: hovered ? 0.6 : 0.2,
                transition: 'opacity 0.4s ease',
                animation: `twinkle${i % 4} ${2.5 + (i % 3)}s ease-in-out infinite`,
              }} />
            ))}
          </div>

          {/* Category badge */}
          <div style={{
            position: 'absolute', top: '12px', left: '12px', zIndex: 2,
            padding: '3px 10px',
            background: `${catColor}20`,
            border: `1px solid ${catColor}50`,
            borderRadius: '99px',
            color: catColor,
            fontSize: '0.62rem', fontWeight: '800', letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            {character.category}
          </div>

          {/* Alignment badge */}
          <div style={{
            position: 'absolute', top: '12px', right: '12px', zIndex: 2,
            padding: '3px 10px',
            background: alignment.secondary,
            border: `1px solid ${alignment.primary}40`,
            borderRadius: '99px',
            color: alignment.primary,
            fontSize: '0.6rem', fontWeight: '700', letterSpacing: '0.05em',
          }}>
            {alignment.label}
          </div>

          {/* Glowing Magic Symbol (Rune) */}
          <div style={{ width: '110px', height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CharacterPortrait
              type={character.iconKey}
              color={character.accentColor}
              hovered={hovered}
            />
          </div>

          {/* Bottom gradient fade into card body */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '40px',
            background: 'linear-gradient(to bottom, transparent, rgba(8,4,20,0.98))',
            pointerEvents: 'none',
          }} />

          {/* Hover glow line at top */}
          <div style={{
            position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px',
            background: `linear-gradient(90deg, transparent, ${character.accentColor}, transparent)`,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.35s ease',
          }} />
        </div>

        {/* ── Card Body ──────────────────────────────────────────── */}
        <div style={{ padding: '1.25rem 1.4rem 1.4rem' }}>
          {/* Status line at the top */}
          <div style={{
            color: character.statusColor || character.accentColor,
            fontSize: '0.62rem', fontWeight: '800',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            marginBottom: '0.4rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: character.statusColor || character.accentColor, boxShadow: `0 0 6px ${character.statusColor || character.accentColor}` }} />
            {character.status}
          </div>

          {/* Name */}
          <h3 style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '1.15rem', fontWeight: '900', lineHeight: 1.25,
            marginBottom: '0.2rem',
            color: hovered ? character.accentColor : '#E2E8F0',
            transition: 'color 0.3s ease',
          }}>
            {character.name}
          </h3>

          {/* Role */}
          <div style={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: '0.7rem', fontWeight: '700',
            letterSpacing: '0.08em',
            marginBottom: '0.8rem',
          }}>
            {character.role}
          </div>

          {/* Origin & Race */}
          <div style={{
            display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.85rem'
          }}>
            <span style={{
              fontSize: '0.68rem', fontWeight: '600', color: 'rgba(255,255,255,0.4)',
              background: 'rgba(255,255,255,0.03)', padding: '2px 8px', borderRadius: '4px'
            }}>{character.raceType}</span>
            <span style={{
              fontSize: '0.68rem', fontWeight: '600', color: 'rgba(255,255,255,0.4)',
              background: 'rgba(255,255,255,0.03)', padding: '2px 8px', borderRadius: '4px'
            }}>📍 {character.origin}</span>
          </div>

          {/* Short Lore / Story Summary */}
          <p style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: '0.82rem', lineHeight: 1.65,
            marginBottom: '1rem',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
          }}>
            {character.shortLore}
          </p>

          {/* Divider */}
          <div style={{
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${character.accentColor}30, transparent)`,
            marginBottom: '0.85rem',
          }} />

          {/* Weapon / Magical Ability line */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', minWidth: 0, flex: 1 }}>
              <span style={{ color: character.accentColor, fontSize: '0.7rem' }}>⚔</span>
              <span style={{
                color: 'rgba(255,255,255,0.38)', fontSize: '0.72rem', fontWeight: '600',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {character.weapon}
              </span>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.3rem',
              color: character.accentColor, fontSize: '0.72rem', fontWeight: '750',
              opacity: hovered ? 1 : 0.65,
              transition: 'opacity 0.2s ease',
              whiteSpace: 'nowrap',
            }}>
              View Lore →
            </div>
          </div>
        </div>

        {/* Hover border glow sides */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '20px', pointerEvents: 'none',
          boxShadow: hovered ? `inset 0 0 25px ${character.accentColor}15` : 'none',
          transition: 'box-shadow 0.35s ease',
        }} />
      </div>

      <style>{`
        @keyframes twinkle0 { 0%,100%{opacity:0.2} 50%{opacity:0.7} }
        @keyframes twinkle1 { 0%,100%{opacity:0.15} 50%{opacity:0.6} }
        @keyframes twinkle2 { 0%,100%{opacity:0.25} 50%{opacity:0.8} }
        @keyframes twinkle3 { 0%,100%{opacity:0.1}  50%{opacity:0.5} }
      `}</style>
    </motion.article>
  );
});

export default CharacterCard;
