import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  FaGithub, FaLinkedin, FaTwitter, FaYoutube, FaInstagram,
  FaArrowRight, FaDownload, FaReact, FaNodeJs 
} from 'react-icons/fa';
import { SiExpress, SiMongodb } from 'react-icons/si';
import Button from '../components/ui/Button';
import { personalInfo } from '../data/data';
import useReducedMotionSafe from '../hooks/useReducedMotionSafe';
import useTypewriter from '../hooks/useTypewriter';

export default function Hero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const typewriterWords = [
    "I'm Software Engineer",
    "I'm Full Stack Developer",
    "I'm MERN Developer",
    "I'm Frontend Developer",
    "I'm Backend Developer"
  ];
  
  const displayedText = useTypewriter(typewriterWords, 80, 45, 2500);

  // 1. Mouse Spotlight coordinates
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      container.style.setProperty('--mouse-x', `${x}px`);
      container.style.setProperty('--mouse-y', `${y}px`);
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 2. Stars Particle & Rising Podium Sparks Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const stars = [];
    const sparks = [];
    
    const starCount = Math.min(35, Math.floor(width / 40));

    // Handle Resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Init Stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.2 + 0.4,
      });
    }

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Star Constellations
      stars.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;

        if (s.x < 0 || s.x > width) s.vx *= -1;
        if (s.y < 0 || s.y > height) s.vy *= -1;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.fill();
      });

      // Draw connection lines
      ctx.strokeStyle = 'rgba(245, 166, 35, 0.03)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dist = Math.hypot(stars[i].x - stars[j].x, stars[i].y - stars[j].y);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
      }

      // Generate Sparks rising from the podium area (right side of screen)
      // Estimate podium center: on desktop, it's roughly width * 0.75, height * 0.55
      const isMobile = width < 992;
      const px = isMobile ? width * 0.5 : width * 0.73;
      const py = isMobile ? height * 0.75 : height * 0.55;

      if (Math.random() < 0.25) {
        sparks.push({
          x: px + (Math.random() - 0.5) * 160,
          y: py + 20,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -Math.random() * 1.2 - 0.4,
          alpha: 1.0,
          size: Math.random() * 2 + 1,
          color: Math.random() < 0.5 ? 'rgba(245, 166, 35, ' : 'rgba(139, 92, 246, '
        });
      }

      // Update and Draw Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.alpha -= 0.007; // Fade out slowly

        if (sp.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fillStyle = `${sp.color}${sp.alpha})`;
        // Add a glowing blur to sparks
        ctx.shadowBlur = 4;
        ctx.shadowColor = sp.color.includes('245') ? 'var(--accent-gold)' : 'var(--accent-purple)';
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = useReducedMotionSafe({
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  });

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const target = document.querySelector('#projects');
    if (target) {
      const offsetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="spotlight-container"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#020205',
        padding: '120px 0 100px 0',
        zIndex: 5,
        overflow: 'hidden'
      }}
    >
      {/* Visual System Overlays */}
      <div className="grid-overlay" />
      <div className="spotlight-bg" />
      
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 2
        }}
      />

      {/* Floating Purple and Gold breathing glow blobs */}
      <div 
        className="glow-blob blob-navy float-1" 
        style={{ top: '5%', right: '15%', opacity: 0.5, width: '550px', height: '550px' }} 
      />
      <div 
        className="glow-blob blob-purple float-2" 
        style={{ top: '25%', right: '5%', opacity: 0.4 }} 
      />
      <div 
        className="glow-blob blob-gold float-1" 
        style={{ bottom: '10%', left: '5%', opacity: 0.18, width: '450px', height: '450px' }} 
      />

      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <div className="hero-grid">
          
          {/* LEFT COLUMN: HERO CONTENT */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              textAlign: 'left',
              minWidth: 0,
              width: '100%'
            }}
          >
            {/* Opportunities Badge */}
            <motion.div variants={itemVariants} style={{ marginBottom: '2.75rem' }}>
              <span 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.45rem 1.25rem',
                  borderRadius: '100px',
                  backgroundColor: 'rgba(245, 166, 35, 0.08)',
                  border: '1px solid rgba(245, 166, 35, 0.25)',
                  color: 'var(--accent-gold)',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  boxShadow: '0 0 15px rgba(245, 166, 35, 0.05)'
                }}
              >
                AVAILABLE FOR OPPORTUNITIES ✦
              </span>
            </motion.div>

            {/* Headline with Typewriter Animation */}
            <motion.h1 
              variants={itemVariants}
              className="hero-typewriter-h1"
            >
              <span className="typewriter-text">
                {displayedText || '\u00A0'}
              </span>
              <span className="typewriter-cursor">|</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              style={{
                fontSize: 'clamp(1.05rem, 0.3vw + 1rem, 1.25rem)',
                color: 'var(--text-secondary)',
                marginBottom: '2.5rem',
                maxWidth: '520px',
                lineHeight: '1.75'
              }}
            >
              Full Stack Software Engineer who bridges the gap between{' '}
              <span style={{ color: 'var(--accent-gold)', fontWeight: '600' }}>engineering precision</span>{' '}
              and{' '}
              <span style={{ color: 'var(--accent-gold)', fontWeight: '600' }}>design excellence</span>.
            </motion.p>

            {/* Buttons */}
            <motion.div 
              variants={itemVariants} 
              className="hero-buttons-container"
            >
              <Button variant="primary" onClick={handleScrollToProjects} style={{ borderRadius: '8px' }}>
                View My Work <FaArrowRight style={{ fontSize: '0.8rem' }} />
              </Button>
              <a href="/Resume (Kayas Mishra).pdf" download style={{ display: 'inline-block' }}>
                <Button 
                  variant="secondary" 
                  style={{ 
                    borderRadius: '8px', 
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    backgroundColor: 'rgba(11, 15, 25, 0.5)' 
                  }}
                >
                  Download Resume <FaDownload style={{ fontSize: '0.8rem' }} />
                </Button>
              </a>
            </motion.div>

            {/* Social link row */}
            <motion.div 
              variants={itemVariants}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
              }}
            >
              <span 
                style={{ 
                  fontSize: '0.75rem', 
                  color: 'rgba(255, 255, 255, 0.35)', 
                  letterSpacing: '0.1em', 
                  textTransform: 'uppercase', 
                  fontWeight: '700',
                  fontFamily: 'var(--font-display)' 
                }}
              >
                FOLLOW ME:
              </span>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hero-social-link"><FaLinkedin /></a>
                <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hero-social-link"><FaGithub /></a>
                <a href={personalInfo.instagram} target="_blank" rel="noreferrer" className="hero-social-link"><FaInstagram /></a>
                <a href={personalInfo.youtube} target="_blank" rel="noreferrer" className="hero-social-link"><FaYoutube /></a>
                <a href={personalInfo.twitter} target="_blank" rel="noreferrer" className="hero-social-link"><FaTwitter /></a>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: PORTRAIT + 3D GLOW PODIUM */}
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              gap: '3rem', // Proper spacing between image and buttons
              paddingBottom: '20px'
            }}
            className="hero-visual-column"
          >
            <div 
              style={{
                position: 'relative',
                width: 'min(75vw, 320px)',
                height: 'min(75vw, 320px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              
              {/* Orbiting 3D Shapes on the Right */}
              {/* 1. Purple Cube (Top Right) */}
              <div className="neon-shape-container shape-cube">
                <div className="cube-wrapper">
                  <div className="cube-face cube-front" />
                  <div className="cube-face cube-back" />
                  <div className="cube-face cube-left" />
                  <div className="cube-face cube-right" />
                  <div className="cube-face cube-top" />
                  <div className="cube-face cube-bottom" />
                </div>
              </div>


              {/* Glowing Outer Orbit Rings around Portrait */}
              <div className="glow-orbit-ring ring-outer" />
              <div className="glow-orbit-ring ring-inner" />

              {/* Circular Portrait Image wrapper */}
              <div
                style={{
                  width: '98%',
                  height: '98%',
                  borderRadius: '50%',
                  border: '2px solid rgba(245, 166, 35, 0.3)',
                  padding: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(11, 15, 25, 0.55)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 0 40px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.03)',
                  position: 'relative',
                  zIndex: 5
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    position: 'relative',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <img 
                    src="/Portfolio_Img.png" 
                    alt={personalInfo.name} 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: 'scale(1.03)',
                      zIndex: 3
                    }}
                  />
                </div>
              </div>

              {/* 3D Holographic Podium Pedestal under the Portrait */}
              <div className="podium-pedestal">
                <div className="podium-ring ring-3" />
                <div className="podium-ring ring-2" />
                <div className="podium-ring ring-1" />
                <div className="podium-glow-core" />
              </div>

            </div>

            {/* Stacked badge pills below the profile image */}
            <div className="badges-pills-stack">
              <div className="tech-pill">
                <FaReact style={{ color: '#61dafb' }} /> <span>React</span>
              </div>
              <div className="tech-pill">
                <FaNodeJs style={{ color: '#339933' }} /> <span>Node.js</span>
              </div>
              <div className="tech-pill">
                <SiExpress style={{ color: '#FFFFFF' }} /> <span>Express</span>
              </div>
              <div className="tech-pill">
                <SiMongodb style={{ color: '#47a248' }} /> <span>MongoDB</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 5rem;
          align-items: center;
        }

        .hero-social-link {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.45);
          transition: var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
        }

        .hero-social-link:hover {
          color: var(--accent-gold);
          border-color: rgba(245, 166, 35, 0.35);
          transform: translateY(-3px) rotate(6deg);
          box-shadow: 0 4px 10px rgba(245, 166, 35, 0.15);
        }

        /* Stacked badges style below the profile image */
        .badges-pills-stack {
          position: relative;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 12px;
          z-index: 10;
          width: 100%;
          max-width: 290px; /* Force 2 + 2 layout on desktop */
          margin: 0 auto;
        }

        .tech-pill {
          padding: 0.45rem 1.15rem;
          border-radius: 99px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(11, 15, 25, 0.65);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          gap: 0.65rem;
          color: #FFFFFF;
          font-size: 0.82rem;
          font-weight: 600;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
          transition: var(--transition-smooth);
        }

        .tech-pill:hover {
          border-color: var(--accent-gold);
          transform: translateY(-5px) scale(1.05);
          box-shadow: 
            0 10px 25px rgba(0, 0, 0, 0.5), 
            0 0 15px rgba(245, 166, 35, 0.15);
        }

        /* Orbiting glowing rings around portrait */
        .glow-orbit-ring {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 4;
        }

        @keyframes rotate-clockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes rotate-counter-clockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        .ring-outer {
          width: 108%;
          height: 108%;
          border: 1px solid rgba(139, 92, 246, 0.3);
          box-shadow: 
            0 0 20px rgba(139, 92, 246, 0.15),
            inset 0 0 15px rgba(139, 92, 246, 0.1);
          animation: rotate-clockwise 25s infinite linear;
        }

        .ring-inner {
          width: 104%;
          height: 104%;
          border: 1.5px dashed rgba(245, 166, 35, 0.35);
          box-shadow: 0 0 25px rgba(245, 166, 35, 0.15);
          animation: rotate-counter-clockwise 18s infinite linear;
        }

        /* 3D Podium Pedestal */
        .podium-pedestal {
          position: absolute;
          bottom: -45px;
          left: 50%;
          transform: translateX(-50%);
          width: 280px;
          height: 100px;
          perspective: 1000px;
          pointer-events: none;
          z-index: 1;
        }

        .podium-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          border-radius: 50%;
          transform: translate(-50%, -50%) rotateX(74deg);
          box-sizing: border-box;
        }

        @keyframes podium-pulse-1 {
          0%, 100% { transform: translate(-50%, -50%) rotateX(74deg) scale(1); opacity: 0.8; }
          50% { transform: translate(-50%, -50%) rotateX(74deg) scale(1.05); opacity: 1; }
        }

        @keyframes podium-pulse-2 {
          0%, 100% { transform: translate(-50%, -50%) rotateX(74deg) scale(1.1); opacity: 0.7; }
          50% { transform: translate(-50%, -50%) rotateX(74deg) scale(1.03); opacity: 0.9; }
        }

        .podium-ring.ring-1 {
          width: 250px;
          height: 250px;
          border: 4px solid var(--accent-purple);
          box-shadow: 
            0 0 20px rgba(139, 92, 246, 0.8),
            inset 0 0 20px rgba(139, 92, 246, 0.5);
          animation: podium-pulse-1 6s infinite ease-in-out;
        }

        .podium-ring.ring-2 {
          width: 190px;
          height: 190px;
          border: 3px solid var(--accent-gold);
          box-shadow: 
            0 0 20px rgba(245, 166, 35, 0.8),
            inset 0 0 10px rgba(245, 166, 35, 0.4);
          animation: podium-pulse-2 5s infinite ease-in-out;
        }

        .podium-ring.ring-3 {
          width: 130px;
          height: 130px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
        }

        .podium-glow-core {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) rotateX(74deg);
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245, 166, 35, 0.4) 0%, rgba(139, 92, 246, 0.2) 40%, transparent 75%);
          filter: blur(8px);
        }

        .hero-typewriter-h1 {
          font-size: clamp(2.9rem, 3vw, 2.2rem) !important;
          font-weight: 900;
          letter-spacing: -0.03em;
          white-space: nowrap;
          display: block;
          width: 100%;
          overflow: visible;
          height: 48px;
          line-height: 1.15;
          margin-bottom: 1.5rem;
        }
        .typewriter-text {
          background: linear-gradient(135deg, #F5A623 0%, #C084FC 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline;
        }
        @media (max-width: 992px) {
          .hero-typewriter-h1 {
            height: 36px;
            font-size: clamp(1.1rem, 5.5vw, 1.55rem) !important;
            letter-spacing: -0.01em;
          }
        }

        /* 3D Spinning Neon Shapes on the Right */
        .neon-shape-container {
          position: absolute;
          z-index: 10;
          pointer-events: none;
          perspective: 300px;
        }

        .shape-cube {
          right: -90px;
          top: 12%;
          width: 40px;
          height: 40px;
        }

        .shape-triangle {
          right: -75px;
          top: 46%;
          width: 40px;
          height: 40px;
        }

        .shape-circle {
          right: -90px;
          top: 78%;
          width: 40px;
          height: 40px;
        }

        /* Cube wrappers */
        .cube-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: spin-cube 12s infinite linear;
        }
        @keyframes spin-cube {
          0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }
        .cube-face {
          position: absolute;
          width: 32px;
          height: 32px;
          border: 1.5px solid rgba(139, 92, 246, 0.85);
          background: rgba(139, 92, 246, 0.05);
          box-shadow: 0 0 8px rgba(139, 92, 246, 0.4);
        }
        .cube-front  { transform: rotateY(0deg) translateZ(16px); }
        .cube-back   { transform: rotateY(180deg) translateZ(16px); }
        .cube-left   { transform: rotateY(-90deg) translateZ(16px); }
        .cube-right  { transform: rotateY(90deg) translateZ(16px); }
        .cube-top    { transform: rotateX(90deg) translateZ(16px); }
        .cube-bottom { transform: rotateX(-90deg) translateZ(16px); }

        /* Triangle (Pyramid) wrappers */
        .triangle-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: spin-triangle 10s infinite linear;
          filter: drop-shadow(0 0 6px rgba(245, 166, 35, 0.65));
        }
        @keyframes spin-triangle {
          0% { transform: rotateX(20deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(380deg) rotateY(360deg) rotateZ(360deg); }
        }
        .pyr-face {
          position: absolute;
          width: 28px;
          height: 32px;
          border: 1.5px solid rgba(245, 166, 35, 0.85);
          background: rgba(245, 166, 35, 0.05);
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          box-shadow: 0 0 8px rgba(245, 166, 35, 0.4);
          transform-origin: 50% 100%;
        }
        .pyr-front  { transform: rotateY(0deg) translateZ(14px) rotateX(20deg); }
        .pyr-back   { transform: rotateY(180deg) translateZ(14px) rotateX(20deg); }
        .pyr-left   { transform: rotateY(-90deg) translateZ(14px) rotateX(20deg); }
        .pyr-right  { transform: rotateY(90deg) translateZ(14px) rotateX(20deg); }
        .pyr-bottom { 
          width: 28px; 
          height: 28px; 
          transform: rotateX(-90deg) translateZ(0px); 
          border: 1.5px solid rgba(245, 166, 35, 0.85); 
          background: rgba(245, 166, 35, 0.05); 
        }

        /* Circle (Sphere) wrappers */
        .circle-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: spin-circle 14s infinite linear;
        }
        @keyframes spin-circle {
          0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(360deg) rotateY(-360deg) rotateZ(180deg); }
        }
        .sphere-ring {
          position: absolute;
          width: 32px;
          height: 32px;
          border: 1.5px solid rgba(6, 182, 212, 0.85);
          border-radius: 50%;
          background: rgba(6, 182, 212, 0.02);
          box-shadow: 0 0 8px rgba(6, 182, 212, 0.4);
        }
        .ring-h { transform: rotateX(0deg); }
        .ring-v { transform: rotateY(90deg); }
        .ring-d { transform: rotateX(90deg); }

        .hero-buttons-container {
          display: flex;
          flex-wrap: wrap;
          gap: 1.25rem;
          margin-bottom: 4rem;
        }
        @media (max-width: 576px) {
          .hero-buttons-container {
            justify-content: center;
            width: 100%;
          }
          .hero-buttons-container > a {
            width: 100%;
          }
          .hero-buttons-container button {
            width: 100% !important;
            justify-content: center !important;
          }
        }

        @media (max-width: 992px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
            text-align: center;
          }
          .hero-grid > div:first-child {
            align-items: center !important;
            text-align: center !important;
          }
          .badges-pills-stack {
            margin-top: 2rem !important;
            gap: 8px !important;
            max-width: 100% !important; /* Reset on mobile/tablet to wrap naturally */
          }
          .hero-visual-column {
            margin-top: 1rem;
            margin-bottom: 2rem;
            padding-bottom: 50px !important;
          }
          .neon-shape-container {
            display: none !important; /* Hide shapes on mobile */
          }
          .podium-pedestal {
            bottom: -45px !important;
          }
        }

        .typewriter-cursor {
          color: var(--accent-gold);
          font-weight: 200;
          animation: blink 1s step-end infinite;
          margin-left: 4px;
          display: inline-block;
          vertical-align: middle;
        }
        @keyframes blink {
          from, to { color: transparent }
          50% { color: var(--accent-gold) }
        }
      `}</style>
    </section>
  );
}
