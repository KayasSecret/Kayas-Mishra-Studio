import { useState, useEffect } from 'react';

/**
 * Custom hook for a realistic typewriter typing and deleting effect.
 * @param {string[]} words - Configurable array of texts to type.
 * @param {number} typeSpeed - Speed per character in ms while typing.
 * @param {number} deleteSpeed - Speed per character in ms while deleting.
 * @param {number} delay - Time to wait in ms once the word is fully typed.
 * @returns {string} - The currently displayed typewriter text.
 */
export default function useTypewriter(words, typeSpeed = 80, deleteSpeed = 45, delay = 2500) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const activeWord = words[currentWordIndex];
    let timer;

    if (!isDeleting) {
      // Typing phase
      if (currentText.length < activeWord.length) {
        timer = setTimeout(() => {
          setCurrentText(activeWord.substring(0, currentText.length + 1));
        }, typeSpeed);
      } else {
        // Word is fully typed: wait before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, delay);
      }
    } else {
      // Deleting (backspacing) phase
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(activeWord.substring(0, currentText.length - 1));
        }, deleteSpeed);
      } else {
        // Word is fully deleted: move to the next word index
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typeSpeed, deleteSpeed, delay]);

  return currentText;
}
