import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaUser, FaLaptopCode, FaEnvelope, FaMapMarkerAlt,
  FaCalendarAlt, FaRocket, FaUsers, FaStar, FaGlobe,
  FaCopy, FaCheck, FaEllipsisH
} from 'react-icons/fa';
import GlassCard from '../components/ui/GlassCard';

export default function About() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("kayasmishra29s@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section
      id="about"
      style={{
        padding: '15px 0 50px 0',
        backgroundColor: '#020205',
        position: 'relative',
        zIndex: 5
      }}
    >
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            style={{
              textAlign: 'center',
              marginBottom: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <span
              style={{
                fontSize: '0.8rem',
                color: 'var(--accent-gold)',
                fontWeight: '700',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                paddingTop: '2rem'
              }}
            >
              <span style={{ color: '#C084FC' }}>✦</span> INTRODUCTION <span style={{ color: '#C084FC' }}>✦</span>
            </span>
            <h2
              style={{
                marginTop: '0.4rem',
                marginBottom: '0.6rem',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                fontWeight: '900',
                letterSpacing: '-0.02em',
                color: '#FFFFFF'
              }}
            >
              About <span style={{ background: 'linear-gradient(135deg, #F5A623 0%, #C084FC 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Me</span>
            </h2>
          </motion.div>

          <div className="about-grid">
            {/* Bio & Stats Left Column */}
            <motion.div variants={itemVariants}>
              <GlassCard hoverEffect={true} className="about-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Header Row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.75rem' }}>
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '14px',
                      border: '1px solid rgba(192, 132, 252, 0.25)',
                      background: 'rgba(192, 132, 252, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#C084FC',
                      fontSize: '1.4rem',
                      boxShadow: '0 0 15px rgba(192, 132, 252, 0.1)'
                    }}
                  >
                    <FaUser />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-gold)', fontSize: '1.4rem', fontWeight: '700', margin: 0 }}>
                      Who I Am
                    </h3>
                  </div>
                </div>

                {/* Bio text */}
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.02rem', marginBottom: '2.5rem', fontWeight: '400' }}>
                  I'm a Full Stack Software Engineer who loves turning ideas into real-world digital products. I enjoy solving complex problems, writing clean code, and creating seamless user experiences.
                </p>

                {/* Divider Line */}
                <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.08)', marginBottom: '2rem' }} />

                {/* Stats row */}
                <div className="stats-container-row">
                  {/* Years Exp */}
                  <div className="stat-column-box">
                    <FaCalendarAlt style={{ color: '#C084FC', fontSize: '1.35rem', marginBottom: '0.75rem' }} />
                    <div className="stat-number-value">10+</div>
                    <div className="stat-label-text">Months Experience</div>
                  </div>

                  {/* Projects Completed */}
                  <div className="stat-column-box stat-with-border">
                    <FaRocket style={{ color: 'var(--accent-gold)', fontSize: '1.35rem', marginBottom: '0.75rem' }} />
                    <div className="stat-number-value">5+</div>
                    <div className="stat-label-text">Projects Completed</div>
                  </div>

                  {/* Happy Clients */}
                  <div className="stat-column-box stat-with-border">
                    <FaUsers style={{ color: '#C084FC', fontSize: '1.35rem', marginBottom: '0.75rem' }} />
                    <div className="stat-number-value">4+</div>
                    <div className="stat-label-text">Happy Clients</div>
                  </div>

                  {/* Dedication */}
                  <div className="stat-column-box stat-with-border">
                    <FaStar style={{ color: 'var(--accent-gold)', fontSize: '1.35rem', marginBottom: '0.75rem' }} />
                    <div className="stat-number-value">100%</div>
                    <div className="stat-label-text">Dedication</div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Developer Info Right Column */}
            <motion.div variants={itemVariants}>
              <GlassCard hoverEffect={true} className="about-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Header Row */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem'
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--accent-gold)',
                      fontWeight: '800',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      fontFamily: 'var(--font-display)'
                    }}
                  >
                    DEVELOPER INFO
                  </span>
                  <FaEllipsisH style={{ color: 'rgba(255, 255, 255, 0.35)', fontSize: '1rem' }} />
                </div>

                {/* Rows Grid */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1 }}>

                  {/* Name Row */}
                  <div className="dev-info-row">
                    <div className="info-icon-box"><FaUser /></div>
                    <div style={{ flexGrow: 1 }}>
                      <span className="info-row-label">Name</span>
                      <span className="info-row-value">Kayas Mishra</span>
                    </div>
                  </div>

                  {/* Specialization Row */}
                  <div className="dev-info-row">
                    <div className="info-icon-box"><FaLaptopCode /></div>
                    <div style={{ flexGrow: 1 }}>
                      <span className="info-row-label">Specialization</span>
                      <span className="info-row-value">Full Stack Software Engineer</span>
                    </div>
                  </div>

                  {/* Email Row */}
                  <div className="dev-info-row">
                    <div className="info-icon-box"><FaEnvelope /></div>
                    <div style={{ flexGrow: 1 }}>
                      <span className="info-row-label">Email</span>
                      <span className="info-row-value email-value-container">
                        <a href="mailto:kayasmishra29s@gmail.com" className="email-link">
                          kayasmishra29s@gmail.com
                        </a>
                        <button
                          onClick={handleCopy}
                          className="copy-icon-btn"
                          title="Copy Email"
                        >
                          {copied ? <FaCheck style={{ color: '#2ecc71' }} /> : <FaCopy />}
                        </button>
                      </span>
                    </div>
                  </div>

                    {/* Location Row */}
                    <div className="dev-info-row">
                      <div className="info-icon-box"><FaMapMarkerAlt /></div>
                      <div style={{ flexGrow: 1 }}>
                        <a href="https://www.google.com/maps/place/Indore,+Madhya+Pradesh/@22.7239727,75.8638499,24473m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3962fcad1b410ddb:0x96ec4da356240f4!8m2!3d22.7195687!4d75.8577258!16zL20vMDFfeXZ5?entry=ttu&g_ep=EgoyMDI2MDcwNy4wIKXMDSoASAFQAw%3D%3D" target="_blank">
                          <span className="info-row-label">Location</span>
                          <span className="info-row-value location-value-container">
                            <span>India</span>
                            <FaGlobe style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }} />
                          </span>
                        </a>
                      </div>
                    </div>

                  {/* Availability Row */}
                  <div className="dev-info-row">
                    <div className="info-icon-box"><FaCalendarAlt /></div>
                    <div style={{ flexGrow: 1 }}>
                      <span className="info-row-label">Availability</span>
                      <span className="info-row-value availability-value-container">
                        <span>Open to Opportunities</span>
                        <span className="availability-ping-dot" />
                      </span>
                    </div>
                  </div>

                </div>
              </GlassCard>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 3rem;
          align-items: stretch;
        }

        .stats-container-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          text-align: center;
          align-items: center;
        }

        .stat-column-box {
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-with-border {
          border-left: 1px solid rgba(255, 255, 255, 0.08);
        }

        .stat-number-value {
          font-size: 1.75rem;
          font-weight: 800;
          color: #FFFFFF;
          font-family: var(--font-display);
          margin-bottom: 0.25rem;
        }

        .stat-label-text {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.4);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .dev-info-row {
          display: flex;
          align-items: center;
          gap: 1.15rem;
          padding: 0.8rem 1.15rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 14px;
          transition: var(--transition-fast);
        }

        .dev-info-row:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(245, 166, 35, 0.2);
          transform: translateY(-2px);
        }

        .info-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-gold);
          font-size: 1rem;
          flex-shrink: 0;
          transition: var(--transition-fast);
        }

        .dev-info-row:hover .info-icon-box {
          border-color: var(--accent-gold);
          box-shadow: 0 0 10px rgba(245, 166, 35, 0.2);
        }

        .info-row-label {
          display: block;
          font-size: 0.72rem;
          color: rgba(255, 255, 255, 0.4);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.15rem;
        }

        .info-row-value {
          display: block;
          font-size: 0.95rem;
          color: #FFFFFF;
          font-weight: 600;
        }

        .email-value-container, 
        .location-value-container, 
        .availability-value-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          width: 100%;
        }

        .email-link {
          color: #FFFFFF;
          transition: var(--transition-fast);
          text-decoration: none;
        }

        .email-link:hover {
          color: var(--accent-gold);
        }

        .copy-icon-btn {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.35);
          cursor: pointer;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.25rem;
          border-radius: 4px;
          transition: var(--transition-fast);
        }

        .copy-icon-btn:hover {
          color: var(--accent-gold);
          background: rgba(255, 255, 255, 0.05);
        }

        .availability-ping-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #2ecc71;
          display: inline-block;
          box-shadow: 0 0 8px #2ecc71;
          animation: dot-pulse 2s infinite;
        }

        @keyframes dot-pulse {
          0% { box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.7); }
          70% { box-shadow: 0 0 0 6px rgba(46, 204, 113, 0); }
          100% { box-shadow: 0 0 0 0 rgba(46, 204, 113, 0); }
        }

        .about-card {
          padding: 2.5rem;
        }
        @media (max-width: 768px) {
          .about-card {
            padding: 1.5rem !important;
          }
        }

        @media (max-width: 480px) {
          .email-link {
            font-size: 0.8rem;
            word-break: break-all;
          }
        }

        @media (max-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        @media (max-width: 576px) {
          .stats-container-row {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.5rem !important;
          }
          .stat-column-box {
            padding: 0;
          }
          .stat-with-border {
            border-left: none !important;
          }
        }
      `}</style>
    </section>
  );
}
