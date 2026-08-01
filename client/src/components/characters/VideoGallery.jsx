import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { GiCrystalBall } from 'react-icons/gi';
import { FaYoutube, FaPlay } from 'react-icons/fa';
import posterImg from '../../assets/storyImg/Scene_1.png';

const VideoGallery = memo(function VideoGallery() {
  const channelUrl = "https://youtu.be/Llit4OXYrO8?si=nNx_0e_3J2spn6Zm";

  return (
    <div style={{ position: 'relative' }}>
      
      {/* ── Section Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: '3rem', textAlign: 'center' }}
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

      {/* ── Widescreen Video Poster Container ── */}
      <motion.a
        href={channelUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          display: 'block',
          width: '100%',
          maxWidth: '960px',
          margin: '0 auto',
          textDecoration: 'none',
          outline: 'none',
        }}
      >
        <motion.div
          whileHover="hover"
          style={{
            position: 'relative',
            borderRadius: '24px',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            background: 'rgba(15, 10, 30, 0.4)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 40px rgba(139, 92, 246, 0.1)',
            overflow: 'hidden',
            cursor: 'pointer',
            aspectRatio: '16/9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Background image */}
          <motion.div
            variants={{
              hover: { scale: 1.05 }
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: `url(${posterImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 1,
            }}
          />

          {/* Magical Dark Overlay */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(to top, rgba(13, 7, 34, 0.9) 15%, rgba(13, 7, 34, 0.4) 60%, rgba(13, 7, 34, 0.7) 100%)',
            zIndex: 2,
            transition: 'background 0.3s ease',
          }} />

          {/* Widescreen Content */}
          <div style={{
            position: 'relative',
            zIndex: 3,
            textAlign: 'center',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            boxSizing: 'border-box',
          }}>
            
            {/* Play Button Icon wrapper with glow */}
            <motion.div
              variants={{
                hover: { 
                  scale: 1.1,
                  boxShadow: '0 0 40px rgba(245, 158, 11, 0.8), inset 0 0 15px rgba(255, 255, 255, 0.2)'
                }
              }}
              transition={{ duration: 0.3 }}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 25px rgba(245, 158, 11, 0.4)',
                marginBottom: '1.5rem',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                paddingLeft: '6px', // Shift to visually center play arrow
                boxSizing: 'border-box',
              }}
            >
              <FaPlay style={{ color: '#0d0722', fontSize: '1.8rem' }} />
            </motion.div>

            {/* Glowing Text Overlay */}
            <motion.h3 
              variants={{
                hover: { color: '#F59E0B' }
              }}
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)',
                fontWeight: '900',
                color: '#E2E8F0',
                margin: '0 0 0.8rem',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
                letterSpacing: '0.01em',
                transition: 'color 0.3s ease',
              }}
            >
              Watch DRONZNIDO Cinematics
            </motion.h3>

            <motion.p
              variants={{
                hover: { scale: 1.02 }
              }}
              style={{
                color: '#C4B5FD',
                fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
                fontWeight: '700',
                letterSpacing: '0.04em',
                margin: '0 0 0.5rem',
                textShadow: '0 2px 5px rgba(0, 0, 0, 0.9)',
                background: 'rgba(13, 7, 34, 0.65)',
                padding: '0.5rem 1.5rem',
                borderRadius: '99px',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
              }}
            >
              👉 Click on the poster to watch the video
            </motion.p>

            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'rgba(255, 255, 255, 0.45)',
              fontSize: '0.8rem',
              marginTop: '1rem',
            }}>
              <FaYoutube style={{ color: '#EF4444', fontSize: '1rem' }} /> YouTube Channel · @Kayasverse
            </span>
          </div>

          {/* Border light sweep effect on hover */}
          <motion.div
            variants={{
              hover: { opacity: 0.15 }
            }}
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              boxShadow: 'inset 0 0 50px rgba(245, 158, 11, 0.5)',
              zIndex: 4,
              pointerEvents: 'none',
              borderRadius: '24px',
              opacity: 0,
              transition: 'opacity 0.3s ease',
            }}
          />
        </motion.div>
      </motion.a>

    </div>
  );
});

export default VideoGallery;
