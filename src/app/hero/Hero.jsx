import CyberTypewriter from './CyberTypewriter';
import './CyberTypewriter.css';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="cyber-typewriter-container">
          <CyberTypewriter />
        </div>
        
        <p className="hero-subtitle">
          Bringing ideas to life through stunning visuals
        </p>
        
        <div className="hero-cta">
          <button className="cyber-btn primary">View My Work</button>
          <button className="cyber-btn secondary">Contact Me</button>
        </div>
      </div>
    </section>
  );
}
