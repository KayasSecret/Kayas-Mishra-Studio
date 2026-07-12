import React from 'react';
import { motion } from 'framer-motion';
import useMagneticButton from '../../hooks/useMagneticButton';

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  type = 'button', 
  onClick, 
  style = {},
  ...props 
}) {
  const { ref, position } = useMagneticButton();
  const isPrimary = variant === 'primary';

  const variantStyle = isPrimary 
    ? {
        backgroundColor: 'var(--accent-gold)',
        color: '#000000',
        border: '1px solid var(--accent-gold)',
        boxShadow: '0 4px 15px rgba(245, 166, 35, 0.3)',
      }
    : {
        backgroundColor: 'rgba(27, 39, 69, 0.3)',
        color: 'var(--text-primary)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(8px)',
      };

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.75rem 1.75rem',
        borderRadius: '8px',
        fontWeight: '600',
        fontSize: '0.95rem',
        fontFamily: 'var(--font-display)',
        cursor: 'pointer',
        gap: '0.5rem',
        outline: 'none',
        ...variantStyle,
        ...style
      }}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 120, damping: 12, mass: 0.1 }}
      whileHover={{ 
        scale: 1.03, 
        boxShadow: isPrimary 
          ? '0 6px 20px rgba(245, 166, 35, 0.5)' 
          : '0 6px 20px rgba(255, 255, 255, 0.08)',
        borderColor: isPrimary ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.25)'
      }}
      whileTap={{ scale: 0.98 }}
      className={`btn-magnetic ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
