import React, { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GiCrystalBall } from 'react-icons/gi';
import { videoGalleryData } from '../../data/videoGalleryData';
import VideoCard from './VideoCard';
import VideoPlayerModal from './VideoPlayerModal';

const VideoGallery = memo(function VideoGallery() {
  const [activeViewerIndex, setActiveViewerIndex] = useState(null);

  const handleOpen = useCallback((index) => {
    setActiveViewerIndex(index);
  }, []);

  const handleClose = useCallback(() => {
    setActiveViewerIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveViewerIndex((prev) => (prev === 0 ? videoGalleryData.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveViewerIndex((prev) => (prev === videoGalleryData.length - 1 ? 0 : prev + 1));
  }, []);

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
            Cinematic Archives
          </span>
        </div>
        <h2 style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
          fontWeight: '900', margin: '0 0 0.5rem',
          background: 'linear-gradient(135deg, #E2E8F0, #C4B5FD, #F59E0B)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Videos
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem', margin: 0 }}>
          Watch the cinematic world of DRONZNIDO come alive.
        </p>
        <div style={{ width: '120px', height: '1.5px', background: 'linear-gradient(90deg, transparent, #F59E0B, transparent)', margin: '1.25rem auto 0' }} />
      </motion.div>

      {/* ── Video Grid (Desktop: 3, Tablet: 2, Mobile: 1) ── */}
      <div className="dronznido-video-grid">
        {videoGalleryData.map((vid, index) => (
          <VideoCard
            key={vid.id}
            video={vid}
            index={index}
            onSelect={handleOpen}
          />
        ))}
      </div>

      {/* ── Full Screen Video Player Modal ── */}
      <AnimatePresence>
        {activeViewerIndex !== null && (
          <VideoPlayerModal
            activeIndex={activeViewerIndex}
            videos={videoGalleryData}
            onClose={handleClose}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>

      {/* Responsive layout styles */}
      <style>{`
        .dronznido-video-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          width: 100%;
          box-sizing: border-box;
        }
        @media (max-width: 1024px) {
          .dronznido-video-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .dronznido-video-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* Hover animations */
        .video-card-container:hover {
          transform: translateY(-8px);
          border-color: rgba(245, 158, 11, 0.45) !important;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(245, 158, 11, 0.15) !important;
        }
      `}</style>
    </div>
  );
});

export default VideoGallery;
