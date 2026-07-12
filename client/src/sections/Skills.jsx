import React from 'react';
import { motion } from 'framer-motion';
import {
  FaCode, FaServer, FaDatabase, FaTools,
  FaReact, FaHtml5, FaNodeJs, FaCloud, FaGitAlt,
  FaLanguage, FaGithub, FaExchangeAlt
} from 'react-icons/fa';
import { SiC, SiCplusplus, SiTailwindcss, SiCss, SiExpress, SiMongodb, SiMysql, SiJavascript, SiSqlite } from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { skills } from '../data/data';
import GlassCard from '../components/ui/GlassCard';
import useReducedMotionSafe from '../hooks/useReducedMotionSafe';

const getCategoryIcon = (key) => {
  switch (key.toLowerCase()) {
    case 'language':
      return <FaLanguage />;
    case 'frontend':
      return <FaCode />;
    case 'backend':
      return <FaServer />;
    case 'database':
      return <FaDatabase />;
    case 'tools':
      return <FaTools />;
    default:
      return <FaCode />;
  }
};

const getSkillIcon = (name) => {
  const n = name.toLowerCase();

  // Programming Languages
  if (n === "c") return <SiC style={{ color: "#A8B9CC" }} />;
  if (n.includes("c++")) return <SiCplusplus style={{ color: "#00599C" }} />;
  if (n.includes("javascript")) return <SiJavascript style={{ color: "#F7DF1E" }} />;

  // Frontend
  if (n.includes("tailwind")) return <SiTailwindcss style={{ color: "#06B6D4" }} />;
  if (n.includes("react")) return <FaReact style={{ color: "#61DAFB" }} />;
  if (n.includes("html")) return <FaHtml5 style={{ color: "#E34F26" }} />;
  if (n.includes("css")) return <SiCss style={{ color: "#1572B6" }} />;

  // Backend
  if (n.includes("node")) return <FaNodeJs style={{ color: "#339933" }} />;
  if (n.includes("express")) return <SiExpress style={{ color: "#ffffff" }} />;
  if (n.includes("rest")) return <FaCloud style={{ color: "#3B82F6" }} />;
  if (n.includes("crud")) return <FaExchangeAlt style={{ color: "#22C55E" }} />;

  // Database
  if (n.includes("mongodb")) return <SiMongodb style={{ color: "#47A248" }} />;
  if (n.includes("mysql")) return <SiMysql style={{ color: "#4479A1" }} />;
  if (n.includes("sql")) return <SiSqlite style={{ color: "#003B57" }} />;

  // Tools
  if (n.includes("github")) return <FaGithub style={{ color: "#ffffff" }} />;
  if (n.includes("git")) return <FaGitAlt style={{ color: "#F05032" }} />;
  if (n.includes("vs code") || n.includes("vscode"))
    return <VscVscode style={{ color: "#007ACC" }} />;

  return <FaCode />;
};

export default function Skills() {
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

  const barVariants = useReducedMotionSafe({
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }
    })
  });

  const categories = [
    { title: 'Programming Languages', key: 'Language' },
    { title: 'Frontend Engineering', key: 'frontend' },
    { title: 'Backend Systems', key: 'backend' },
    { title: 'Databases', key: 'database' },
    { title: 'Tools & Workflow', key: 'tools' }
  ];

  return (
    <section
      id="skills"
      style={{
        padding: '15px 0 50px 0',
        backgroundColor: '#020205',
        position: 'relative',
        zIndex: 5
      }}
    >
      {/* Decorative Blob */}
      <div
        className="glow-blob blob-navy float-1"
        style={{ top: '30%', left: '-10%', opacity: 0.3, width: '400px', height: '400px' }}
      />

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
              paddingTop: '20px' // Adjust: 60px–100px according to your navbar height
            }}
          >
            <span
              style={{
                fontSize: '0.8rem',
                color: 'var(--accent-gold)',
                fontWeight: '700',
                letterSpacing: '0.15em',
                textTransform: 'uppercase'
              }}
            >
              <span style={{ color: '#C084FC' }}>✦</span> EXPERTISE <span style={{ color: '#C084FC' }}>✦</span>
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
              <span style={{ color: '#FFFFFF' }}>Technical </span>
              <span style={{
                background: 'linear-gradient(135deg, #F5A623 30%, #C084FC 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>Skills</span>
            </h2>
          </motion.div>

          {/* Skills Grid */}
          <div className="skills-grid">
            {categories.map((cat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <GlassCard hoverEffect={true} style={{ height: '100%' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem',
                      color: '#FFFFFF',
                      marginBottom: '2rem',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                      paddingBottom: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}
                  >
                    <span style={{ color: 'var(--accent-gold)', display: 'flex' }}>
                      {getCategoryIcon(cat.key)}
                    </span>
                    {cat.title}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {skills[cat.key].map((skill, sIndex) => (
                      <div key={sIndex} style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <span style={{ fontWeight: '600', fontSize: '0.95rem', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ display: 'flex', fontSize: '1.1rem' }}>{getSkillIcon(skill.name)}</span>
                            {skill.name}
                          </span>
                          <span style={{ fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: '700' }}>{skill.level}%</span>
                        </div>
                        {/* Progress Bar Track */}
                        <div className="progress-glow-wrap">
                          {/* Animated Fill */}
                          <motion.div
                            variants={barVariants}
                            custom={skill.level}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="progress-glow-bar"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Currently Learning Section */}
        </motion.div>
      </div>

      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2.5rem;
        }
      `}</style>
    </section>
  );
}
