import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import { projects } from '../data/data';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import useReducedMotionSafe from '../hooks/useReducedMotionSafe';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setShowAll(false);
  }, [filter]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    }
    return () => {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    };
  }, [selectedProject]);

  const categories = ['All', 'Full Stack', 'Frontend', 'Backend', 'Tools'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const displayedProjects = isMobile && !showAll 
    ? filteredProjects.slice(0, 2) 
    : filteredProjects;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = useReducedMotionSafe({
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  });

  return (
    <section 
      id="projects" 
      style={{
        padding: '15px 0 50px 0',
        backgroundColor: '#020205',
        position: 'relative',
        zIndex: selectedProject ? 1100 : 5
      }}
    >
      {/* Decorative Blob */}
      <div 
        className="glow-blob blob-navy float-2" 
        style={{ bottom: '10%', right: '-10%', opacity: 0.3, width: '400px', height: '400px' }} 
      />

      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <span style={{ 
            fontSize: '0.75rem', 
            color: 'var(--accent-gold)', 
            fontWeight: '800', 
            letterSpacing: '0.2em', 
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'var(--font-display)',
            paddingTop: '30px'
          }}>
            ✦ MY WORKS ✦
          </span>
          <h2 style={{ 
            marginTop: '0.5rem', 
            marginBottom: '0', 
            fontSize: 'clamp(2.2rem, 4vw + 0.5rem, 3.4rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: '900',
            letterSpacing: '-0.03em',
            background: 'none',
            WebkitTextFillColor: 'initial'
          }}>
            <span style={{ color: '#FFFFFF' }}>Featured </span>
            <span style={{ 
              background: 'linear-gradient(135deg, #F5A623 30%, #C084FC 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>Projects</span>
          </h2>
        </div>

        {/* Filter Navigation */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '3.5rem'
          }}
        >
          {categories.map((cat) => {
            const isActive = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: '0.55rem 1.4rem',
                  borderRadius: '99px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  fontFamily: 'var(--font-display)',
                  backgroundColor: isActive ? 'rgba(245, 166, 35, 0.08)' : 'rgba(11, 15, 25, 0.4)',
                  color: isActive ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.65)',
                  border: '1px solid',
                  borderColor: isActive ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.06)',
                  boxShadow: isActive ? '0 0 15px rgba(245, 166, 35, 0.15)' : 'none',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)',
                }}
                className="filter-btn"
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="projects-grid"
        >
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, index) => {
              const glowColors = [
                'rgba(245, 166, 35, 0.35)', // Gold
                'rgba(139, 92, 246, 0.35)', // Purple
                'rgba(59, 130, 246, 0.35)'   // Blue
              ];
              const glowColor = glowColors[index % glowColors.length];

              return (
                <motion.div
                  key={project.id}
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  style={{ height: '100%' }}
                >
                  <GlassCard 
                    hoverEffect={true} 
                    onClick={() => setSelectedProject(project)}
                    style={{ 
                      cursor: 'pointer',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '0',
                      borderColor: glowColor,
                      boxShadow: `0 10px 30px rgba(0, 0, 0, 0.6), 0 0 15px ${glowColor.replace('0.35', '0.05')}`,
                    }}
                    className="project-glow-card"
                  >
                    {/* Project Image */}
                    <div style={{ position: 'relative', width: '100%', height: '220px', overflow: 'hidden' }}>
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease'
                        }}
                        className="project-card-image"
                      />
                      
                      {/* Category Tag */}
                      <div 
                        style={{
                          position: 'absolute',
                          top: '1rem',
                          left: '1rem',
                          padding: '0.3rem 0.75rem',
                          borderRadius: '6px',
                          backgroundColor: 'rgba(11, 15, 25, 0.85)',
                          border: '1px solid rgba(245, 166, 35, 0.35)',
                          fontSize: '0.72rem',
                          fontWeight: '700',
                          color: 'var(--accent-gold)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}
                      >
                        {project.category}
                      </div>

                      {/* Diagonal Arrow Icon */}
                      <div className="diagonal-arrow-wrap">
                        <span>↗</span>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', fontWeight: '600', marginBottom: '0.4rem' }}>
                        {project.year}
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-display)', color: '#FFFFFF', fontSize: '1.25rem', marginBottom: '0.75rem' }}>
                        {project.title}
                      </h3>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', flexGrow: 1, lineHeight: '1.5' }}>
                        {project.shortDescription}
                      </p>

                      {/* Tech Badges */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                        {project.techStack.map((tech, index) => (
                          <span 
                            key={index}
                            style={{
                              fontSize: '0.72rem',
                              padding: '0.2rem 0.6rem',
                              borderRadius: '99px',
                              backgroundColor: 'rgba(255, 255, 255, 0.03)',
                              border: '1px solid rgba(255, 255, 255, 0.05)',
                              color: 'rgba(255, 255, 255, 0.6)'
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Card Action Buttons (GitHub Code & Project View) */}
                      <div 
                        style={{ 
                          display: 'grid', 
                          gridTemplateColumns: '1fr 1fr', 
                          gap: '0.65rem', 
                          marginTop: 'auto',
                          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                          paddingTop: '1rem'
                        }}
                      >
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{ width: '100%' }}
                        >
                          <Button 
                            variant="secondary" 
                            style={{ 
                              width: '100%', 
                              padding: '0.5rem 0.75rem', 
                              fontSize: '0.8rem',
                              borderRadius: '8px',
                              gap: '0.4rem',
                              backgroundColor: 'rgba(11, 15, 25, 0.65)',
                              border: '1px solid rgba(255, 255, 255, 0.06)'
                            }}
                          >
                            <FaGithub style={{ fontSize: '0.9rem' }} /> Code
                          </Button>
                        </a>
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{ width: '100%' }}
                        >
                          <Button 
                            variant="primary" 
                            style={{ 
                              width: '100%', 
                              padding: '0.5rem 0.75rem', 
                              fontSize: '0.8rem',
                              borderRadius: '8px',
                              gap: '0.4rem'
                            }}
                          >
                            <FaExternalLinkAlt style={{ fontSize: '0.75rem' }} /> Live Demo
                          </Button>
                        </a>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {isMobile && filteredProjects.length > 2 && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem', marginBottom: '3.5rem', position: 'relative', zIndex: 10 }}>
            <Button
              variant="secondary"
              onClick={() => setShowAll(!showAll)}
              style={{
                borderRadius: '99px',
                padding: '0.65rem 1.85rem',
                fontSize: '0.85rem',
                fontWeight: '700',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(11, 15, 25, 0.65)',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.45)',
                color: '#FFFFFF'
              }}
            >
              {showAll ? 'Show Less ▴' : 'View More Projects ▾'}
            </Button>
          </div>
        )}

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div 
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem'
              }}
            >
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.85)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
              />

              {/* Modal Card */}
              <motion.div
                data-lenis-prevent
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                transition={{ duration: 0.4, cubicBezier: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '750px',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  backgroundColor: '#1B2745',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  boxShadow: '0 24px 64px rgba(0, 0, 0, 0.8)',
                  zIndex: 1001,
                }}
                className="modal-content"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  style={{
                    position: 'absolute',
                    top: '1.25rem',
                    right: '1.25rem',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 1002,
                    transition: 'var(--transition-fast)'
                  }}
                  className="close-modal-btn"
                >
                  <FaTimes />
                </button>

                {/* Hero Image */}
                <div style={{ width: '100%', height: '300px', position: 'relative', overflow: 'hidden' }}>
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div 
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, #1B2745 10%, transparent 100%)',
                      height: '100px'
                    }}
                  />
                </div>

                {/* Content */}
                <div style={{ padding: '2rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {selectedProject.category} — {selectedProject.year}
                  </span>
                  <h2 
                    style={{ 
                      fontFamily: 'var(--font-display)', 
                      color: '#FFFFFF', 
                      fontSize: '2rem', 
                      marginTop: '0.5rem', 
                      marginBottom: '1.5rem',
                      background: 'none',
                      WebkitTextFillColor: 'initial'
                    }}
                  >
                    {selectedProject.title}
                  </h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div>
                      <h4 style={{ color: '#FFFFFF', marginBottom: '0.4rem', fontFamily: 'var(--font-display)' }}>Overview</h4>
                      <p>{selectedProject.longDescription}</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                      <div>
                        <h4 style={{ color: '#FFFFFF', marginBottom: '0.4rem', fontFamily: 'var(--font-display)' }}>The Problem</h4>
                        <p style={{ fontSize: '0.95rem' }}>{selectedProject.problem}</p>
                      </div>
                      <div>
                        <h4 style={{ color: '#FFFFFF', marginBottom: '0.4rem', fontFamily: 'var(--font-display)' }}>The Solution</h4>
                        <p style={{ fontSize: '0.95rem' }}>{selectedProject.solution}</p>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                      <div>
                        <h4 style={{ color: '#FFFFFF', marginBottom: '0.4rem', fontFamily: 'var(--font-display)' }}>My Role</h4>
                        <p style={{ fontSize: '0.95rem' }}>{selectedProject.myRole}</p>
                      </div>
                      <div>
                        <h4 style={{ color: '#FFFFFF', marginBottom: '0.4rem', fontFamily: 'var(--font-display)' }}>Key Learning</h4>
                        <p style={{ fontSize: '0.95rem' }}>{selectedProject.learnings}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div 
                    style={{ 
                      display: 'flex', 
                      gap: '1rem', 
                      flexWrap: 'wrap', 
                      borderTop: '1px solid rgba(255, 255, 255, 0.05)', 
                      paddingTop: '1.5rem' 
                    }}
                  >
                    <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer">
                      <Button variant="secondary" className="gap-2">
                        <FaGithub /> GitHub Repository
                      </Button>
                    </a>
                    <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer">
                      <Button variant="primary" className="gap-2">
                        <FaExternalLinkAlt style={{ fontSize: '0.8rem' }} /> Live Demo
                      </Button>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2.5rem;
        }
        .filter-btn:hover {
          border-color: var(--accent-gold);
          color: #FFFFFF;
        }
        .glass-panel:hover .project-card-image {
          transform: scale(1.05);
        }
        .close-modal-btn:hover {
          background-color: var(--accent-gold);
          color: #000000;
          transform: rotate(90deg);
        }
        .modal-content::-webkit-scrollbar {
          width: 8px;
        }
        .modal-content::-webkit-scrollbar-track {
          background: #1B2745;
        }
        .modal-content::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        
        /* New Mockup Matching Project Card Styles */
        .project-glow-card {
          transition: border-color 0.4s, box-shadow 0.4s, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .project-glow-card:hover {
          transform: translateY(-8px) !important;
          border-color: var(--accent-gold) !important;
          box-shadow: 0 15px 45px rgba(0, 0, 0, 0.7), 0 0 25px rgba(245, 166, 35, 0.25) !important;
        }
        .diagonal-arrow-wrap {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background-color: rgba(11, 15, 25, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
          z-index: 10;
        }
        .project-glow-card:hover .diagonal-arrow-wrap {
          background-color: var(--accent-gold);
          border-color: var(--accent-gold);
          color: #000000;
          box-shadow: 0 0 12px rgba(245, 166, 35, 0.4);
          transform: rotate(45deg);
        }
        .project-glow-card:hover .project-card-image {
          transform: scale(1.08);
        }
        
        @media (max-width: 576px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
