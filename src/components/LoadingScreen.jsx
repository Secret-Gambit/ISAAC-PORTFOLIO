import { useEffect, useState } from 'react';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);

  const phases = ['INIT', 'LOAD', 'BOOT', 'EXEC'];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    const phaseInterval = setInterval(() => {
      setCurrentPhase(prev => {
        if (prev >= phases.length - 1) return prev;
        return prev + 1;
      });
    }, 1250);

    return () => clearInterval(phaseInterval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Main circle container */}
      <div style={{ position: 'relative', width: '200px', height: '200px', marginBottom: '40px' }}>
        
        {/* Background circle */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '4px solid #1f2937'
          }}
        />
        
        {/* Rotating spinner */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '4px solid transparent',
            borderTopColor: '#3b82f6',
            borderRightColor: '#3b82f6',
            animation: 'spin 1s linear infinite'
          }}
        />

        {/* Second counter-rotating spinner */}
        <div 
          style={{
            position: 'absolute',
            inset: '10px',
            borderRadius: '50%',
            border: '3px solid transparent',
            borderBottomColor: '#60a5fa',
            borderLeftColor: '#60a5fa',
            animation: 'spin 1.5s linear infinite reverse'
          }}
        />

        {/* Progress arc using conic gradient */}
        <div 
          style={{
            position: 'absolute',
            inset: '20px',
            borderRadius: '50%',
            background: `conic-gradient(from 0deg, #3b82f6 0deg, #3b82f6 ${progress * 3.6}deg, transparent ${progress * 3.6}deg)`,
            mask: 'radial-gradient(transparent 55%, black 56%)',
            WebkitMask: 'radial-gradient(transparent 55%, black 56%)'
          }}
        />

        {/* Center text */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div 
            style={{
              fontSize: '48px',
              fontWeight: 900,
              color: 'white',
              letterSpacing: '0.1em',
              fontFamily: 'system-ui, sans-serif'
            }}
          >
            {phases[currentPhase]}
          </div>
          <div 
            style={{
              fontSize: '24px',
              color: '#3b82f6',
              marginTop: '8px',
              fontFamily: 'monospace'
            }}
          >
            {'.'.repeat((currentPhase % 3) + 1)}
          </div>
        </div>
      </div>

      {/* Phase indicators */}
      <div style={{ display: 'flex', gap: '32px', marginBottom: '32px' }}>
        {phases.map((phase, index) => (
          <div 
            key={phase}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              opacity: index === currentPhase ? 1 : index < currentPhase ? 0.5 : 0.2,
              transform: index === currentPhase ? 'scale(1.1)' : 'scale(1)',
              transition: 'all 0.3s'
            }}
          >
            <div 
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: index <= currentPhase ? '#3b82f6' : '#374151',
                marginBottom: '8px'
              }}
            />
            <span 
              style={{
                fontSize: '14px',
                fontFamily: 'monospace',
                color: 'white',
                letterSpacing: '0.05em'
              }}
            >
              {phase}
            </span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div 
        style={{
          width: '300px',
          height: '4px',
          backgroundColor: '#1f2937',
          borderRadius: '2px',
          overflow: 'hidden',
          marginBottom: '16px'
        }}
      >
        <div 
          style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(to right, #3b82f6, #60a5fa)',
            transition: 'width 0.1s linear'
          }}
        />
      </div>

      {/* Percentage */}
      <div 
        style={{
          fontSize: '32px',
          fontFamily: 'monospace',
          fontWeight: 'bold',
          color: '#3b82f6',
          marginBottom: '8px'
        }}
      >
        {Math.floor(progress).toString().padStart(3, '0')}%
      </div>

      {/* Status text */}
      <div 
        style={{
          fontSize: '12px',
          fontFamily: 'monospace',
          color: '#6b7280',
          marginTop: '16px'
        }}
      >
        SYSTEM_SEQUENCE_ACTIVE
      </div>

      {/* Add spin keyframes */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
