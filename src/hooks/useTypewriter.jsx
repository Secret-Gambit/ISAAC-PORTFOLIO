import { useState, useEffect } from 'react';

export const useTypewriter = (text, speed = 100, delay = 0) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayText('');
    setIsComplete(false);
    setIsTyping(false);
    
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
      let index = 0;
      
      const typeInterval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          setIsComplete(true);
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay]);

  return { displayText, isTyping, isComplete };
};

const chars = '!<>-_\\/[]{}—=+*^?#________';

export const useTextScramble = (text, trigger = true) => {
  const [displayText, setDisplayText] = useState(text);
  
  useEffect(() => {
    if (!trigger) {
      setDisplayText(text);
      return;
    }
    
    let iteration = 0;
    const originalText = text;
    
    const interval = setInterval(() => {
      setDisplayText(
        originalText
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      
      if (iteration >= originalText.length) {
        clearInterval(interval);
      }
      
      iteration += 1/3;
    }, 30);

    return () => clearInterval(interval);
  }, [text, trigger]);

  return displayText;
};

export const TypewriterText = ({ text, speed = 80, className = '', showCursor = true, delay = 0 }) => {
  const { displayText, isTyping } = useTypewriter(text, speed, delay);
  
  return (
    <span className={className}>
      {displayText}
      {showCursor && isTyping && <span className="typewriter-cursor" />}
    </span>
  );
};

export const ScrambleText = ({ text, className = '', trigger = true }) => {
  const displayText = useTextScramble(text, trigger);
  return <span className={`decode-text ${className}`}>{displayText}</span>;
};

export const GlitchText = ({ text, className = '' }) => {
  return (
    <span className={`glitch ${className}`} data-text={text}>
      {text}
    </span>
  );
};

export const RotatingTypewriter = ({ 
  phrases, 
  typeSpeed = 80, 
  deleteSpeed = 40, 
  pauseTime = 2000,
  className = '' 
}) => {
  const [currentLength, setCurrentLength] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentPhrase = phrases[phraseIndex];
  const fullText = typeof currentPhrase === 'string' ? currentPhrase : currentPhrase.text;
  const highlightStart = typeof currentPhrase === 'object' ? currentPhrase.highlightStart : -1;
  const highlightEnd = typeof currentPhrase === 'object' ? currentPhrase.highlightEnd : -1;

  useEffect(() => {
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(pauseTimeout);
    }

    if (isDeleting) {
      if (currentLength === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        return;
      }
      
      const deleteTimeout = setTimeout(() => {
        setCurrentLength((prev) => prev - 1);
      }, deleteSpeed);
      return () => clearTimeout(deleteTimeout);
    }

    if (currentLength === fullText.length) {
      setIsPaused(true);
      return;
    }

    const typeTimeout = setTimeout(() => {
      setCurrentLength((prev) => prev + 1);
    }, typeSpeed);
    return () => clearTimeout(typeTimeout);
  }, [currentLength, phraseIndex, isDeleting, isPaused, fullText, phrases.length, typeSpeed, deleteSpeed, pauseTime]);

  const displayText = fullText.slice(0, currentLength);
  
  const renderText = () => {
    if (highlightStart >= 0 && highlightEnd > highlightStart && currentLength > highlightStart) {
      const before = displayText.slice(0, highlightStart);
      const highlighted = displayText.slice(highlightStart, Math.min(highlightEnd, currentLength));
      const after = displayText.slice(Math.min(highlightEnd, currentLength));
      
      return (
        <>
          {before}
          <span className="text-primary">{highlighted}</span>
          {after}
        </>
      );
    }
    return displayText;
  };

  return (
    <span className={className}>
      {renderText()}
      <span className="typewriter-cursor" />
    </span>
  );
};
