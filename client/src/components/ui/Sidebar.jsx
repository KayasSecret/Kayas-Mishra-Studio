import React, { useState, useEffect } from 'react';
import { FaHome, FaUser, FaBriefcase, FaEnvelope } from 'react-icons/fa';

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState('home');
  const [lineTop, setLineTop] = useState(0);

  const sections = [
    { id: 'home', icon: <FaHome />, label: 'Home', order: 0 },
    { id: 'about', icon: <FaUser />, label: 'About', order: 1 },
    { id: 'experience', icon: <FaBriefcase />, label: 'Work', order: 2 },
    { id: 'contact', icon: <FaEnvelope />, label: 'Contact', order: 3 },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      
      let current = 'home';
      for (const section of sections) {
        const el = document.querySelector(`#${section.id}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            current = section.id;
          }
        }
      }
      
      setActiveSection(current);

      // Calculate vertical dot position based on current section
      const activeObj = sections.find(s => s.id === current);
      if (activeObj) {
        // Line top corresponds to current index (e.g. 0, 1, 2, 3) mapped to spacing
        // Icon spacing is 40px icon + 24px gap = 64px
        setLineTop(activeObj.order * 64 + 20); // 20px is half icon height for center alignment
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once initially
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const target = document.querySelector(`#${id}`);
    if (target) {
      const headerOffset = id === 'about' ? 65 : 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <>
      <div className="sidebar-nav">
        {/* Connection Line */}
        <div className="sidebar-line">
          {/* Active Glow Dot */}
          <div 
            className="sidebar-glow-dot"
            style={{ top: `${lineTop}px` }}
          />
        </div>

        {/* Navigation Items */}
        <div className="sidebar-icons-list">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                onClick={(e) => handleScrollTo(e, sec.id)}
                className={`sidebar-icon-btn ${isActive ? 'active' : ''}`}
                aria-label={`Scroll to ${sec.label}`}
                title={sec.label}
              >
                {sec.icon}
              </a>
            );
          })}
        </div>
      </div>

      <style>{`
        .sidebar-nav {
          position: fixed;
          left: 2rem;
          top: 50%;
          transform: translateY(-50%);
          z-index: 99;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: auto;
          pointer-events: none; /* Let clicks pass through outside buttons */
        }
        
        .sidebar-icons-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
          pointer-events: auto; /* Re-enable pointer events for buttons */
        }

        .sidebar-line {
          position: absolute;
          left: 50%;
          top: 20px;
          bottom: 20px;
          width: 2px;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.02),
            rgba(255, 255, 255, 0.08) 20%,
            rgba(255, 255, 255, 0.08) 80%,
            rgba(255, 255, 255, 0.02)
          );
          transform: translateX(-50%);
          z-index: 1;
        }

        .sidebar-glow-dot {
          position: absolute;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--accent-gold);
          box-shadow: 
            0 0 10px var(--accent-gold),
            0 0 20px var(--accent-gold);
          z-index: 2;
          transition: top 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sidebar-icon-btn {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: rgba(11, 15, 25, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          cursor: pointer;
          position: relative;
          z-index: 3;
          transition: var(--transition-smooth);
        }

        .sidebar-icon-btn:hover {
          color: var(--accent-gold);
          border-color: rgba(245, 166, 35, 0.3);
          transform: scale(1.1);
          box-shadow: 0 4px 15px rgba(245, 166, 35, 0.1);
        }

        .sidebar-icon-btn.active {
          color: #000000;
          background: var(--accent-gold);
          border-color: var(--accent-gold);
          box-shadow: 
            0 0 15px rgba(245, 166, 35, 0.45),
            0 0 30px rgba(245, 166, 35, 0.15);
        }

        @media (max-width: 992px) {
          .sidebar-nav {
            display: none; /* Hide on smaller viewports for readability */
          }
        }
      `}</style>
    </>
  );
}
