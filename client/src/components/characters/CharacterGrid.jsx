import React, { memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GiCrystalBall } from 'react-icons/gi';
import CharacterCard from './CharacterCard';

const CharacterGrid = memo(function CharacterGrid({ characters, onSelect }) {
  if (characters.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          textAlign: 'center', padding: '4rem 2rem',
          border: '1px dashed rgba(139,92,246,0.2)', borderRadius: '20px',
          background: 'rgba(139,92,246,0.03)',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.45 }}>
          <GiCrystalBall style={{ color: '#C4B5FD', filter: 'drop-shadow(0 0 12px rgba(196,181,253,0.4))' }} />
        </div>
        <p style={{ color: '#C4B5FD', fontWeight: '700', fontFamily: 'Georgia, serif', margin: '0 0 0.4rem' }}>
          No characters found
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <div className="dronznido-char-grid">
        <AnimatePresence mode="popLayout">
          {characters.map((char, i) => (
            <CharacterCard
              key={char.id}
              character={char}
              index={i}
              onSelect={onSelect}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Fluid auto-fill layout that guarantees cards never cut off by wrapping columns automatically */}
      <style>{`
        .dronznido-char-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(265px, 1fr));
          gap: 1.5rem;
          width: 100%;
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
});

export default CharacterGrid;
