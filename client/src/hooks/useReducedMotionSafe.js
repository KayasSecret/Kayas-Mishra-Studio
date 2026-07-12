import { useReducedMotion } from 'framer-motion';

/**
 * Returns accessible animations. If prefers-reduced-motion is active,
 * it returns variants that only do simple fades instead of complex translations.
 * 
 * @param {Object} standardVariants - Normal Framer Motion variants
 * @returns {Object} Accessible variants
 */
export default function useReducedMotionSafe(standardVariants) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1, 
        y: 0, 
        x: 0,
        scale: 1,
        transition: { duration: 0.1 } 
      }
    };
  }

  return standardVariants;
}
