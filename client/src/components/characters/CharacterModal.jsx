import React, { useEffect, useCallback, memo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import CharacterPortrait from './CharacterPortrait';
import { ALIGNMENT_COLORS } from '../../data/characters';

const CharacterModal = memo(function CharacterModal({ character, onClose }) {
  const alignment = ALIGNMENT_COLORS[character?.alignment] || ALIGNMENT_COLORS.Neutral;

  /* close on Escape */
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  if (!character) return null;
  const color = character.accentColor;

  // Render via React Portals directly into document.body for correct viewport-relative centering
  return createPortal(
    <div style={{ position: 'relative', zIndex: 999999 }}>
      {/* Backdrop overlay */}
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(5, 2, 12, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.25rem',
          boxSizing: 'border-box',
        }}
      >
        {/* Modal panel card */}
        <motion.div
          key="modal-panel"
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 240, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            background: 'rgba(10, 5, 25, 0.99)',
            border: `1px solid ${color}50`,
            borderRadius: '24px',
            width: '100%',
            maxWidth: '840px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: `0 35px 120px rgba(0, 0, 0, 0.95), 0 0 50px ${color}22`,
            boxSizing: 'border-box',
          }}
        >
          {/* Top glow line */}
          <div style={{
            position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            borderRadius: '999px',
          }} />

          {/* Close (X) button */}
          <button
            onClick={onClose}
            aria-label="Close details"
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              zIndex: 10,
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255, 255, 255, 0.6)',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.2s ease',
              outline: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = `${color}20`;
              e.currentTarget.style.borderColor = `${color}50`;
              e.currentTarget.style.color = '#FFF';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
            }}
          >
            <FaTimes />
          </button>

          {/* ── Content layout ──────────────────────────────────── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '280px 1fr',
            gap: 0,
            width: '100%',
          }} className="char-modal-grid">

            {/* LEFT — Magic Icon column */}
            <div style={{
              background: `radial-gradient(circle at 50% 45%, ${color}15 0%, rgba(5, 2, 15, 0.98) 80%)`,
              borderRight: `1px solid ${color}20`,
              padding: '3rem 1.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxSizing: 'border-box',
            }}>
              {/* Magic Symbol */}
              <div style={{ width: '130px', height: '130px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CharacterPortrait type={character.iconKey} color={color} hovered />
              </div>

              {/* Status Badge */}
              <div style={{
                padding: '6px 16px',
                marginBottom: '1rem',
                background: `${color}15`,
                border: `1px solid ${color}40`,
                borderRadius: '99px',
                color: color,
                fontSize: '0.7rem',
                fontWeight: '800',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}>
                {character.status}
              </div>

              {/* Alignment Badge */}
              <div style={{
                padding: '5px 14px',
                marginBottom: '1.5rem',
                background: alignment.secondary,
                border: `1px solid ${alignment.primary}30`,
                borderRadius: '99px',
                color: alignment.primary,
                fontSize: '0.7rem',
                fontWeight: '700',
              }}>
                {alignment.label}
              </div>

              {/* Weapon Info */}
              <div style={{ marginTop: '0.5rem', textAlign: 'center', width: '100%' }}>
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.62rem', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Primary Weapon</div>
                <div style={{ color: color, fontSize: '0.85rem', fontWeight: '750' }}>⚔ {character.weapon}</div>
              </div>

              {/* Magical Ability Info */}
              {character.magicalAbility && (
                <div style={{ marginTop: '1.25rem', textAlign: 'center', width: '100%' }}>
                  <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.62rem', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Magical Ability</div>
                  <div style={{ color: '#E2E8F0', fontSize: '0.8rem', fontWeight: '600' }}>✦ {character.magicalAbility}</div>
                </div>
              )}
            </div>

            {/* RIGHT — details column */}
            <div style={{
              padding: '2.5rem 2.5rem 2.5rem 2rem',
              boxSizing: 'border-box',
            }}>
              {/* Category tag */}
              <div style={{
                display: 'inline-block',
                padding: '3px 12px', marginBottom: '0.75rem',
                background: `${color}15`, border: `1px solid ${color}35`,
                borderRadius: '99px', color: color,
                fontSize: '0.65rem', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase',
              }}>
                {character.category}
              </div>

              {/* Character Name */}
              <h2 style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                fontWeight: '900',
                lineHeight: 1.15,
                marginBottom: '0.35rem',
                background: `linear-gradient(135deg, #E2E8F0, ${color})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {character.name}
              </h2>

              {/* Role */}
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                {character.role}
              </div>

              {/* Origin & Race Info Cards */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <div style={{
                  background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                  padding: '8px 14px', borderRadius: '10px', flex: '1 1 120px'
                }}>
                  <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.58rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Race / Type</div>
                  <div style={{ color: '#E2E8F0', fontSize: '0.82rem', fontWeight: '700', marginTop: '2px' }}>{character.raceType}</div>
                </div>
                <div style={{
                  background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                  padding: '8px 14px', borderRadius: '10px', flex: '1 1 120px'
                }}>
                  <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.58rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Origin</div>
                  <div style={{ color: '#E2E8F0', fontSize: '0.82rem', fontWeight: '700', marginTop: '2px' }}>📍 {character.origin}</div>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: `linear-gradient(90deg, ${color}35, transparent)`, marginBottom: '1.5rem' }} />

              {/* Full Lore */}
              <Section title="Lore & Background" color={color}>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.92rem', lineHeight: 1.8, margin: 0, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                  {character.fullLore}
                </p>
              </Section>

              {/* Abilities */}
              {character.abilities.length > 0 && (
                <Section title="Abilities & Powers" color={color}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {character.abilities.map((ab, i) => (
                      <span key={i} style={{
                        padding: '4px 12px',
                        background: `${color}10`,
                        border: `1px solid ${color}30`,
                        borderRadius: '99px',
                        color: color, fontSize: '0.78rem', fontWeight: '700',
                      }}>
                        ✦ {ab}
                      </span>
                    ))}
                  </div>
                </Section>
              )}

              {/* Relationships */}
              {character.relationships.length > 0 && (
                <Section title="Key Relationships" color={color}>
                  <ul style={{ margin: 0, padding: '0 0 0 1.2rem' }}>
                    {character.relationships.map((rel, i) => (
                      <li key={i} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.65, marginBottom: '0.35rem' }}>
                        {rel}
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              {/* Story Importance */}
              <Section title="Story Importance" color={color} last>
                <div style={{
                  padding: '1rem',
                  background: `${color}08`,
                  border: `1px solid ${color}25`,
                  borderRadius: '12px',
                  color: 'rgba(255,255,255,0.68)', fontSize: '0.88rem', lineHeight: 1.7,
                }}>
                  {character.importance}
                </div>
              </Section>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        .char-modal-grid { display: grid; grid-template-columns: 280px 1fr; }
        @media (max-width: 680px) {
          .char-modal-grid { grid-template-columns: 1fr !important; }
          .char-modal-grid > div:first-child { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.06) !important; padding: 2.5rem 1.5rem 1.5rem !important; }
        }
      `}</style>
    </div>,
    document.body
  );
});

/* Helper section block */
function Section({ title, color, children, last = false }) {
  return (
    <div style={{ marginBottom: last ? 0 : '1.5rem' }}>
      <div style={{
        color: color, fontSize: '0.68rem', fontWeight: '800',
        letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.75rem',
        display: 'flex', alignItems: 'center', gap: '0.5rem',
      }}>
        <div style={{ width: '18px', height: '1px', background: color, opacity: 0.6 }} />
        {title}
        <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${color}40, transparent)` }} />
      </div>
      {children}
    </div>
  );
}

export default CharacterModal;
