import React, { useState, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GiSpellBook } from 'react-icons/gi';
import CharacterGrid from './CharacterGrid';
import CharacterModal from './CharacterModal';
import { characters } from '../../data/characters';

/* ── Ambient floating light particles behind the gallery ───────── */
const AmbientParticles = memo(function AmbientParticles() {
  const particles = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    dur: Math.random() * 12 + 6,
    delay: Math.random() * 8,
    color: i % 5 === 0 ? '#F59E0B' : i % 5 === 1 ? '#8B5CF6' : i % 5 === 2 ? '#38BDF8' : i % 5 === 3 ? '#34D399' : '#C4B5FD',
  })), []);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', borderRadius: 'inherit' }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          animate={{ y: [0, -80, 0], opacity: [0, 0.7, 0] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            left: `${p.x}%`, top: `${p.y}%`,
            width: `${p.size}px`, height: `${p.size}px`,
            borderRadius: '50%', background: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
});

/* ── Main gallery ──────────────────────────────────────────────── */
const CharacterGallery = memo(function CharacterGallery() {
  const [selected, setSelected] = useState(null);

  const handleSelect = useCallback((char) => setSelected(char), []);
  const handleClose  = useCallback(() => setSelected(null), []);

  return (
    <div style={{ position: 'relative' }}>
      {/* Ambient particles */}
      <AmbientParticles />

      {/* ── Section header ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}
      >
        {/* Title row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <GiSpellBook style={{ color: '#F59E0B', fontSize: '1.2rem', filter: 'drop-shadow(0 0 6px rgba(245,158,11,0.6))' }} />
              <span style={{ color: '#F59E0B', fontSize: '0.68rem', fontWeight: '800', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                Character Encyclopedia
              </span>
            </div>
            <h2 style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 'clamp(1.4rem, 3.5vw, 1.9rem)',
              fontWeight: '900', margin: 0,
              background: 'linear-gradient(135deg, #E2E8F0, #C4B5FD, #F59E0B)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Denizens of DRONZNIDO
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.85rem', margin: '0.4rem 0 0', fontStyle: 'italic' }}>
              Total {characters.length} characters
            </p>
          </div>
        </div>

        {/* Thin separator */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)', marginTop: '0.5rem' }} />
      </motion.div>

      {/* ── Character grid ─────────────────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <CharacterGrid characters={characters} onSelect={handleSelect} />
      </div>

      {/* ── Character modal ─────────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <CharacterModal character={selected} onClose={handleClose} />
        )}
      </AnimatePresence>
    </div>
  );
});

export default CharacterGallery;
