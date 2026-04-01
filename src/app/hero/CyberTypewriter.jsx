import { useState, useEffect } from 'react';

const phrases = [
  "Hi, I'm Sogbola Isaac",
  "Creative Graphics Designer",
  "Motion Graphics Artist"
];

export default function CyberTypewriter() {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(pauseTimeout);
    }

    const timeout = setTimeout(() => {
      const currentPhrase = phrases[currentIndex];

      if (!isDeleting) {
        // Typing
        setCurrentText(currentPhrase.slice(0, currentText.length + 1));
        
        if (currentText.length + 1 === currentPhrase.length) {
          // Finished typing - pause then delete
          setIsPaused(true);
        }
      } else {
        // Deleting
        setCurrentText(currentPhrase.slice(0, currentText.length - 1));
        
        if (currentText.length === 1) {
          // Finished deleting - move to next phrase
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, isPaused]);

  return (
    <div className="cyber-typewriter">
      <span className="cyber-text glitch" data-text={currentText}>
        {currentText}
      </span>
      <span className="cyber-cursor" />
    </div>
  );
}
