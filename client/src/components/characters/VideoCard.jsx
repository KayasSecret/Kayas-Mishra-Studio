import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';

const VideoCard = memo(function VideoCard({ video, index, onSelect }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
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
        height: '240px',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
      }}
      onClick={() => onSelect(index)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="video-card-container"
    >
      <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
        {/* Video Thumbnail */}
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            filter: hovered ? 'brightness(1.05)' : 'brightness(0.95)',
          }}
        />

        {/* Ambient Dark/Purple Gradient Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(10, 5, 25, 0.95) 0%, rgba(10, 5, 25, 0.4) 60%, transparent 100%)',
          transition: 'opacity 0.3s ease',
        }} />

        {/* Floating Play Button Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
        }}>
          <motion.div
            animate={{
              scale: hovered ? 1.15 : 1,
              backgroundColor: hovered ? 'rgba(245, 158, 11, 0.9)' : 'rgba(15, 8, 30, 0.75)',
              borderColor: hovered ? '#F59E0B' : 'rgba(245, 158, 11, 0.4)',
            }}
            transition={{ duration: 0.25 }}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: '2px solid rgba(245, 158, 11, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: hovered ? '#05020C' : '#F59E0B',
              boxShadow: hovered ? '0 0 25px rgba(245, 158, 11, 0.6)' : '0 4px 15px rgba(0, 0, 0, 0.4)',
            }}
          >
            <FaPlay style={{ fontSize: '1.25rem', marginLeft: '4px' }} />
          </motion.div>
        </div>

        {/* Highlight Gold Glow Border */}
        <div style={{
          position: 'absolute', inset: 0,
          border: '1px solid transparent',
          borderRadius: '16px',
          pointerEvents: 'none',
          borderColor: hovered ? '#F59E0B' : 'transparent',
          boxShadow: hovered ? 'inset 0 0 15px rgba(245, 158, 11, 0.15)' : 'none',
          transition: 'all 0.3s ease',
        }} />

        {/* Content Info overlay */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          padding: '1.25rem',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.2rem',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{
              color: '#F59E0B',
              fontSize: '0.62rem',
              fontWeight: '800',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}>
              {video.subtitle}
            </span>
            <span style={{
              color: 'rgba(255, 255, 255, 0.4)',
              fontSize: '0.65rem',
              fontWeight: '700',
              background: 'rgba(0, 0, 0, 0.4)',
              padding: '2px 8px',
              borderRadius: '4px',
            }}>
              {video.duration}
            </span>
          </div>
          <h3 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1.1rem',
            fontWeight: '900',
            color: '#E2E8F0',
            margin: 0,
            transition: 'color 0.25s ease',
            color: hovered ? '#F59E0B' : '#E2E8F0',
          }}>
            {video.title}
          </h3>
        </div>
      </div>
    </motion.article>
  );
});

export default VideoCard;
