import React, { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GiCrystalBall } from 'react-icons/gi';
import { galleryImages } from '../../data/galleryData';
import SceneModal from './SceneModal';

const SceneGallery = memo(function SceneGallery() {
  const [activeViewerIndex, setActiveViewerIndex] = useState(null);

  const handleOpen = useCallback((index) => {
    setActiveViewerIndex(index);
  }, []);

  const handleClose = useCallback(() => {
    setActiveViewerIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveViewerIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveViewerIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  }, []);

  const gridContainerStyle = {
    display: 'grid',
    gap: '1.5rem',
    width: '100%',
    boxSizing: 'border-box',
  };

  return (
    <div style={{ position: 'relative' }}>
      
      {/* ── Section Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: '2.5rem', textAlign: 'center' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <GiCrystalBall style={{ color: '#F59E0B', fontSize: '1.25rem', filter: 'drop-shadow(0 0 6px rgba(245,158,11,0.6))' }} />
          <span style={{ color: '#F59E0B', fontSize: '0.72rem', fontWeight: '800', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
            Concept Artwork
          </span>
        </div>
        <h2 style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
          fontWeight: '900', margin: '0 0 0.5rem',
          background: 'linear-gradient(135deg, #E2E8F0, #C4B5FD, #F59E0B)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Scene Gallery
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem', margin: 0 }}>
          Explore breathtaking moments from the magical world of DRONZNIDO.
        </p>
        <div style={{ width: '120px', height: '1.5px', background: 'linear-gradient(90deg, transparent, #F59E0B, transparent)', margin: '1.25rem auto 0' }} />
      </motion.div>

      {/* ── Responsive Masonry/Grid Layout ── */}
      <div className="dronznido-gallery-grid" style={gridContainerStyle}>
        {galleryImages.map((img, index) => {
          // Height styling based on aspect to simulate masonry look
          const height = img.aspect === 'portrait' ? '380px' : '220px';

          return (
            <motion.article
              key={img.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              style={{
                cursor: 'pointer',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                background: 'rgba(8, 4, 20, 0.8)',
                border: '1px solid rgba(139, 92, 246, 0.18)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
                height: height,
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
              }}
              onClick={() => handleOpen(index)}
              className="gallery-card"
            >
              {/* Image element with cover fit */}
              <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                <img
                  src={img.src}
                  alt={img.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                  className="gallery-img"
                />

                {/* Arcane subtle grid glow overlays */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(10, 5, 25, 0.92) 0%, rgba(10, 5, 25, 0.3) 50%, transparent 100%)',
                  transition: 'opacity 0.3s ease',
                }} />

                {/* Highlight Glow Border */}
                <div style={{
                  position: 'absolute', inset: 0,
                  border: '1px solid transparent',
                  borderRadius: '16px',
                  pointerEvents: 'none',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                }} className="card-border-glow" />

                {/* Content Overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.2rem',
                }}>
                  <span style={{
                    color: '#F59E0B',
                    fontSize: '0.62rem',
                    fontWeight: '800',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}>
                    {img.subtitle}
                  </span>
                  <h3 style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '1.1rem',
                    fontWeight: '900',
                    color: '#E2E8F0',
                    margin: 0,
                  }}>
                    {img.title}
                  </h3>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* ── Custom Lightbox Modal ── */}
      <AnimatePresence>
        {activeViewerIndex !== null && (
          <SceneModal
            activeIndex={activeViewerIndex}
            images={galleryImages}
            onClose={handleClose}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>

      {/* Responsive columns stylesheet */}
      <style>{`
        .dronznido-gallery-grid {
          grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 1024px) {
          .dronznido-gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .dronznido-gallery-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* Hover states for cards */
        .gallery-card:hover {
          transform: translateY(-8px);
          border-color: rgba(245, 158, 11, 0.45) !important;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(245, 158, 11, 0.15) !important;
        }
        .gallery-card:hover .gallery-img {
          transform: scale(1.06);
          filter: brightness(1.1);
        }
        .gallery-card:hover .card-border-glow {
          border-color: #F59E0B !important;
          box-shadow: inset 0 0 15px rgba(245, 158, 11, 0.15) !important;
        }
      `}</style>
    </div>
  );
});

export default SceneGallery;
