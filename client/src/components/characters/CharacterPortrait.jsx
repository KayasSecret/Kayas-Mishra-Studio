import React, { memo } from 'react';

/* ── Arcane magical symbols / runes ── */
const runes = {
  // Divine spellbook symbol (God Skywooder)
  spellbook: ({ color }) => (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <circle cx="100" cy="100" r="85" stroke={color} strokeWidth="1.5" strokeDasharray="4 6" opacity="0.6" />
      <circle cx="100" cy="100" r="75" stroke={color} strokeWidth="0.8" opacity="0.4" />
      {/* Outer Triangle */}
      <polygon points="100,20 170,140 30,140" stroke={color} strokeWidth="1.2" opacity="0.5" />
      {/* Inner Book Icon */}
      <path d="M60,85 C60,75 80,70 100,80 C120,70 140,75 140,85 L140,125 C140,115 120,110 100,120 C80,110 60,115 60,125 Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="100" y1="80" x2="100" y2="120" stroke={color} strokeWidth="2.5" />
      {/* Floating Sparkles */}
      <circle cx="100" cy="50" r="3" fill={color} />
      <circle cx="65" cy="110" r="2" fill={color} />
      <circle cx="135" cy="110" r="2" fill={color} />
    </svg>
  ),

  // Magic gate / crescent moon symbol (Goddess Gimestrini)
  magicgate: ({ color }) => (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <circle cx="100" cy="100" r="80" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="100" cy="100" r="72" stroke={color} strokeWidth="0.8" strokeDasharray="2 3" opacity="0.4" />
      {/* Crescent moon shape */}
      <path d="M65,65 C65,115 115,135 135,135 C100,135 75,110 75,75 C75,70 76,67 77,65 C72,65 65,65 65,65 Z" fill={color} opacity="0.85" />
      {/* Radiant rays */}
      <line x1="100" y1="40" x2="100" y2="25" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="140" y1="60" x2="151" y2="49" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="160" y1="100" x2="175" y2="100" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Center magic spark */}
      <polygon points="115,85 120,70 125,85 140,90 125,95 120,110 115,95 100,90" fill="#FFF" opacity="0.9" />
    </svg>
  ),

  // Dragon / Dark Lord crest (Drathwedork, Sahoonj Krosa)
  dragon: ({ color }) => (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <polygon points="100,15 175,70 145,160 55,160 25,70" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="100" cy="100" r="65" stroke={color} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
      {/* Dragon wings silhouette / emblem */}
      <path d="M45,80 C65,70 95,85 100,95 C105,85 135,70 155,80 C135,95 120,130 100,140 C80,130 65,95 45,80 Z" fill={color} opacity="0.8" />
      {/* Central diamond */}
      <polygon points="100,80 110,100 100,120 90,100" fill="#FFF" opacity="0.85" />
      <circle cx="100" cy="100" r="3" fill={color} />
    </svg>
  ),

  // Open book of wisdom (Master Sefwang Kasagi)
  openbook: ({ color }) => (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <circle cx="100" cy="100" r="80" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <polygon points="100,30 160,80 135,155 65,155 40,80" stroke={color} strokeWidth="0.8" opacity="0.4" />
      {/* Wisdom key/eye */}
      <circle cx="100" cy="95" r="18" stroke={color} strokeWidth="2.5" />
      <circle cx="100" cy="95" r="6" fill={color} />
      <line x1="100" y1="113" x2="100" y2="135" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="90" y1="125" x2="110" y2="125" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Arcane points */}
      <circle cx="100" cy="30" r="4" fill={color} />
      <circle cx="65" cy="155" r="3" fill={color} />
      <circle cx="135" cy="155" r="3" fill={color} />
    </svg>
  ),

  // Warrior / Swordsman shield crest (Sentroz)
  swordman: ({ color }) => (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <circle cx="100" cy="100" r="80" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <path d="M50,60 C50,60 100,45 100,45 C100,45 150,60 150,60 C150,60 155,115 130,145 C110,165 100,170 100,170 C100,170 90,165 70,145 C45,115 50,60 50,60 Z" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Central Sword silhouette */}
      <path d="M96,65 L104,65 L104,120 L96,120 Z" fill={color} />
      <path d="M90,75 L110,75 L110,80 L90,80 Z" fill={color} />
      <path d="M98,120 L102,120 L102,135 L98,135 Z" fill={color} />
      <polygon points="100,50 106,65 94,65" fill={color} />
      <circle cx="100" cy="140" r="3" fill={color} />
      {/* Energy shield curves */}
      <path d="M72,75 Q100,90 128,75" stroke={color} strokeWidth="2.5" opacity="0.75" />
      <path d="M76,105 Q100,120 124,105" stroke={color} strokeWidth="2" opacity="0.6" />
    </svg>
  ),

  // Battle Axe / Shield Champion (Scrollt)
  wizardstaff: ({ color }) => (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <circle cx="100" cy="100" r="80" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="100" cy="100" r="72" stroke={color} strokeWidth="0.8" strokeDasharray="3 4" opacity="0.4" />
      {/* Crossed Axes symbol */}
      <g transform="translate(100,100) rotate(45) translate(-100,-100)">
        {/* Shaft */}
        <line x1="100" y1="35" x2="100" y2="165" stroke={color} strokeWidth="3" strokeLinecap="round" />
        {/* Axe Head */}
        <path d="M100,50 Q125,35 135,65 Q115,75 100,70" fill={color} />
        <path d="M100,50 Q75,35 65,65 Q85,75 100,70" fill={color} />
      </g>
      <circle cx="100" cy="100" r="10" fill="rgba(8,4,22,0.9)" stroke={color} strokeWidth="2" />
      <polygon points="100,93 105,103 95,103" fill="#FFF" />
    </svg>
  ),

  // Fire / Agniveta symbol (Voyan)
  magicportal: ({ color }) => (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <circle cx="100" cy="100" r="80" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <circle cx="100" cy="100" r="74" stroke={color} strokeWidth="0.8" strokeDasharray="5 5" opacity="0.4" />
      {/* Flame silhouette */}
      <path d="M100,40 C100,40 125,75 125,105 C125,130 110,150 100,150 C90,150 75,130 75,105 C75,75 100,40 100,40 Z" fill={color} opacity="0.75" />
      {/* Inner flame */}
      <path d="M100,70 C100,70 115,95 115,115 C115,130 105,140 100,140 C95,140 85,130 85,115 C85,95 100,70 100,70 Z" fill="#FFF" opacity="0.9" />
      {/* Glowing Sparks */}
      <circle cx="65" cy="80" r="2.5" fill={color} />
      <circle cx="135" cy="80" r="2.5" fill={color} />
      <circle cx="100" cy="30" r="3.5" fill={color} />
    </svg>
  ),

  // Crystal Ball / Prophet symbol (Prophet Witch, Magic Turtle)
  crystalball: ({ color }) => (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <circle cx="100" cy="100" r="80" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Crystal sphere */}
      <circle cx="100" cy="90" r="42" stroke={color} strokeWidth="2.5" fill={`${color}08`} />
      {/* Stand */}
      <path d="M70,145 L130,145 L115,130 L85,130 Z" fill={color} opacity="0.85" />
      <path d="M92,130 L108,130 L104,115 L96,115 Z" fill={color} opacity="0.9" />
      {/* Inner star spark */}
      <polygon points="100,72 103,84 115,87 103,90 100,102 97,90 85,87 97,84" fill="#FFF" />
      {/* Arcane rings */}
      <ellipse cx="100" cy="90" rx="55" ry="12" stroke={color} strokeWidth="1" opacity="0.45" transform="rotate(-15 100 90)" />
    </svg>
  ),
};

const CharacterPortrait = memo(function CharacterPortrait({ type = 'swordman', color = '#8B5CF6', hovered = false }) {
  const RuneSVG = runes[type] || runes.swordman;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.5s ease',
      transform: hovered ? 'scale(1.06)' : 'scale(1)',
      filter: hovered ? `drop-shadow(0 0 20px ${color}90)` : `drop-shadow(0 0 8px ${color}35)`,
    }}>
      <RuneSVG color={color} />
    </div>
  );
});

export default CharacterPortrait;
