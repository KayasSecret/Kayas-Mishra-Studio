import React, { useEffect, useCallback, useRef, memo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const VideoPlayerModal = memo(function VideoPlayerModal({ activeIndex, videos, onClose, onPrev, onNext }) {
  const activeVideo = videos[activeIndex];
  const videoRef = useRef(null);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  // Autoplay video on load or index change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Autoplay was prevented by browser policy, fallback to manual play.");
        });
      }
    }
  }, [activeIndex]);

  if (!activeVideo) return null;

  return createPortal(
    <div style={{ position: 'relative', zIndex: 9999999 }}>
      {/* Backdrop overlay */}
      <motion.div
        key="video-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(5, 2, 12, 0.95)', // Halka dark tint
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none',
          padding: '1rem',
          boxSizing: 'border-box',
        }}
      >
        {/* Floating circular Close (X) button in top-right corner */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close player"
          style={{
            position: 'absolute',
            top: '2.5rem',
            right: '2.5rem',
            zIndex: 10,
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid #F59E0B',
            borderRadius: '50%',
            width: '46px',
            height: '46px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            cursor: 'pointer',
            fontSize: '1.25rem',
            boxShadow: '0 0 15px rgba(245, 158, 11, 0.25)',
            transition: 'all 0.25s ease',
            outline: 'none',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(245, 158, 11, 0.2)';
            e.currentTarget.style.boxShadow = '0 0 25px rgba(245, 158, 11, 0.6)';
            e.currentTarget.style.transform = 'scale(1.08)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.boxShadow = '0 0 15px rgba(245, 158, 11, 0.25)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <FaTimes />
        </button>

        {/* ── Active Video & Controls Container ── */}
        <div 
          onClick={(e) => e.stopPropagation()} 
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '90vw',
            height: '62vh',
            maxWidth: '1100px',
            boxSizing: 'border-box',
          }}
        >
          {/* Navigation Arrow Left */}
          <button
            onClick={onPrev}
            aria-label="Previous video"
            style={{
              position: 'absolute',
              left: '-4rem',
              background: 'rgba(15, 8, 30, 0.7)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '12px',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F59E0B',
              cursor: 'pointer',
              fontSize: '1.1rem',
              transition: 'all 0.25s ease',
              zIndex: 2,
              outline: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(245, 158, 11, 0.15)';
              e.currentTarget.style.borderColor = '#F59E0B';
              e.currentTarget.style.transform = 'translateX(-4px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(15, 8, 30, 0.7)';
              e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.3)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
            className="video-nav-btn prev-btn"
          >
            <FaChevronLeft />
          </button>

          {/* Animated Video Wrapper */}
          <motion.div
            key={activeVideo.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              maxWidth: '100%',
              maxHeight: '100%',
              boxSizing: 'border-box',
            }}
          >
            {/* HTML5 Video Player with Premium Native Controls */}
            <video
              ref={videoRef}
              src={activeVideo.video}
              poster={activeVideo.thumbnail}
              controls
              playsInline
              style={{
                maxWidth: '95vw',
                maxHeight: '60vh',
                objectFit: 'contain',
                borderRadius: '12px',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                boxShadow: '0 25px 85px rgba(0, 0, 0, 0.95), 0 0 50px rgba(245, 158, 11, 0.18)',
                outline: 'none',
              }}
            >
              Your browser does not support the video tag.
            </video>
          </motion.div>

          {/* Navigation Arrow Right */}
          <button
            onClick={onNext}
            aria-label="Next video"
            style={{
              position: 'absolute',
              right: '-4rem',
              background: 'rgba(15, 8, 30, 0.7)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '12px',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F59E0B',
              cursor: 'pointer',
              fontSize: '1.1rem',
              transition: 'all 0.25s ease',
              zIndex: 2,
              outline: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(245, 158, 11, 0.15)';
              e.currentTarget.style.borderColor = '#F59E0B';
              e.currentTarget.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(15, 8, 30, 0.7)';
              e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.3)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
            className="video-nav-btn next-btn"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* ── Video Info Metadata Overlay at Bottom ── */}
        <motion.div
          key={`info-${activeVideo.id}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          style={{
            marginTop: '2rem',
            textAlign: 'center',
            maxWidth: '680px',
            padding: '0 1.5rem',
            boxSizing: 'border-box',
          }}
        >
          <div style={{
            color: '#F59E0B',
            fontSize: '0.72rem',
            fontWeight: '800',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '0.4rem',
          }}>
            {activeVideo.subtitle} ({activeVideo.duration})
          </div>
          <h3 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1.5rem',
            fontWeight: '900',
            color: '#E2E8F0',
            marginBottom: '0.65rem',
            letterSpacing: '0.02em',
          }}>
            {activeVideo.title}
          </h3>
          <p style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '0.88rem',
            lineHeight: 1.65,
            margin: 0,
          }}>
            {activeVideo.description}
          </p>

          {/* Indicator Dot counts */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.45rem',
            marginTop: '1.5rem',
          }}>
            {videos.map((vid, index) => (
              <div
                key={vid.id}
                style={{
                  width: index === activeIndex ? '22px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  background: index === activeIndex ? '#F59E0B' : 'rgba(255, 255, 255, 0.25)',
                  transition: 'all 0.25s ease',
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* CSS Breakpoints for Mobile Viewport Arrows */}
        <style>{`
          @media (max-width: 768px) {
            .video-nav-btn {
              width: 42px !important;
              height: 42px !important;
            }
            .prev-btn {
              left: -0.25rem !important;
            }
            .next-btn {
              right: -0.25rem !important;
            }
          }
        `}</style>
      </motion.div>
    </div>,
    document.body
  );
});

export default VideoPlayerModal;
