import { useState, useEffect, useRef, useCallback } from 'react';

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

export const useTextScramble = (text, trigger = true) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  
  useEffect(() => {
    if (!trigger) return;
    
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
