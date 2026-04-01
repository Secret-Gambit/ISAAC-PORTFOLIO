import { useEffect, useState } from 'react';
import { 
  Palette, 
  Sparkles, 
  Monitor, 
  PenTool, 
  Eye, 
  Video,
  Instagram,
  Twitter,
  ExternalLink,
  Menu,
  X,
  ChevronDown,
  Terminal,
  Cpu,
  Zap,
  Code,
  Binary,
  Fingerprint,
  ArrowUp
} from 'lucide-react';
import SpiderWebCanvas from './components/SpiderWebCanvas';
import { TypewriterText, ScrambleText, GlitchText, RotatingTypewriter } from './hooks/useTypewriter.jsx';
import CyberTypewriter from './app/hero/CyberTypewriter';
import './app/hero/CyberTypewriter.css';
import useScrollAnimation from './hooks/useScrollAnimation';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Scroll animation refs
  const [heroRef, heroVisible] = useScrollAnimation(0.1);
  const [aboutRef, aboutVisible] = useScrollAnimation(0.1);
  const [aboutImgRef, aboutImgVisible] = useScrollAnimation(0.1);
  const [aboutTextRef, aboutTextVisible] = useScrollAnimation(0.1);
  const [expRef, expVisible] = useScrollAnimation(0.1);
  const [skillsRef, skillsVisible] = useScrollAnimation(0.1);
  const [connectRef, connectVisible] = useScrollAnimation(0.1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      setShowBackToTop(scrollY > window.innerHeight * 0.5);
      
      // Calculate scroll progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 80; // Height of fixed navigation
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  }

  const skills = [
    { name: 'Adobe Photoshop', icon: <Palette className="w-6 h-6" />, level: 'Advanced' },
    { name: 'Adobe After Effects', icon: <Video className="w-6 h-6" />, level: 'Intermediate' },
    { name: 'Canva', icon: <Monitor className="w-6 h-6" />, level: 'Expert' },
    { name: 'Motion Graphics', icon: <Zap className="w-6 h-6" />, level: 'Basic' },
    { name: 'Visual Design', icon: <Sparkles className="w-6 h-6" />, level: 'Advanced' },
    { name: 'Brand Identity', icon: <Fingerprint className="w-6 h-6" />, level: 'Intermediate' },
  ];

  const socials = [
    { 
      name: 'TikTok', 
      handle: '@sg_marley', 
      url: 'https://www.tiktok.com/@sg_marley',
      icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>,
      color: 'hover:text-pink-500'
    },
    { 
      name: 'Instagram', 
      handle: '@sg_marley08', 
      url: 'https://www.instagram.com/sg_marley08',
      icon: <Instagram className="w-6 h-6" />,
      color: 'hover:text-purple-500'
    },
    { 
      name: 'X (Twitter)', 
      handle: '@SG_marley08', 
      url: 'https://x.com/SG_marley08',
      icon: <Twitter className="w-6 h-6" />,
      color: 'hover:text-blue-400'
    },
  ];

  const stats = [
    { value: '1+', label: 'Years Experience', icon: <Terminal className="w-5 h-5" /> },
    { value: '50+', label: 'Projects Done', icon: <Code className="w-5 h-5" /> },
    { value: '100%', label: 'Satisfaction', icon: <Cpu className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-dark perspective-container scanlines cyber-grid relative">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-gray-900/80 z-[100] shadow-lg">
        <div 
          className="h-full bg-gradient-to-r from-primary via-secondary to-primary transition-all duration-150 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <SpiderWebCanvas />
      
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute inset-0 matrix-bg" />
      </div>

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-dark/80 backdrop-blur-xl py-3 holographic' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between neon-border rounded-full px-6 py-2">
            <span className="text-xl font-bold text-white flex items-center gap-2">
              <Binary className="w-6 h-6 text-primary" />
              <ScrambleText text="SGI_ELITE" trigger={heroLoaded} />
            </span>
            
            <div className="hidden md:flex items-center space-x-6">
              {['about', 'experience', 'skills', 'connect'].map((section) => (
                <button 
                  key={section}
                  onClick={() => scrollToSection(section)} 
                  className="nav-link text-gray-400 hover:text-primary transition-all duration-300 text-sm uppercase tracking-wider relative group"
                >
                  <span className="relative z-10">
                    <ScrambleText text={section} trigger={true} />
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                </button>
              ))}
            </div>

            <button 
              className="md:hidden text-white p-2 neon-border rounded-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-dark-lighter/95 backdrop-blur-xl border-t border-primary/30 mt-2 mx-4 rounded-2xl overflow-hidden">
            <div className="px-4 py-4 space-y-3">
              {['about', 'experience', 'skills', 'connect'].map((section) => (
                <button 
                  key={section}
                  onClick={() => scrollToSection(section)} 
                  className="block w-full text-left text-gray-300 hover:text-primary decode-text py-2"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden perspective-container">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-lighter/50 to-dark" />
        
        {/* Static Background Orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-primary/10 rounded-full blur-2xl" />
        
        <div className="max-w-6xl w-full px-6 md:px-12 py-20 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            
            {/* LEFT SIDE - Content */}
            <div ref={heroRef} className="max-w-lg text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-primary text-sm">SYSTEM_ONLINE</span>
              </div>
              
              <div className="mb-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white whitespace-nowrap">
                  <RotatingTypewriter 
                    phrases={[
                      { text: "Hi, I'm Sogbola Isaac", highlightStart: 8, highlightEnd: 15 },
                      { text: "Creative Designer", highlightStart: 0, highlightEnd: 8 },
                      { text: "Visual Artist", highlightStart: 0, highlightEnd: 6 }
                    ]} 
                    typeSpeed={80} 
                    deleteSpeed={40}
                    pauseTime={2000}
                  />
                </h1>
              </div>
              
              <p className="text-gray-500 mb-8 max-w-md">
                Initializing creative protocols... Bringing ideas to life through visually stunning designs.
              </p>
              
              {/* Stats Row */}
              <div className="flex flex-wrap gap-6 justify-start mb-8">
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg bg-dark-lighter/50 border border-primary/20 neon-border stagger-${index + 1}`}
                  >
                    <span className="text-primary">{stat.icon}</span>
                    <div>
                      <span className="text-white font-bold">{stat.value}</span>
                      <span className="text-gray-500 text-xs block">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className={`flex flex-col sm:flex-row gap-4 justify-start stagger-4`}>
                <button 
                  onClick={() => scrollToSection('connect')}
                  className="px-6 py-3 bg-primary hover:bg-blue-600 text-white rounded-full font-medium transition-all glow btn-3d group relative overflow-hidden whitespace-nowrap"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    CONNECT
                  </span>
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="px-6 py-3 border border-gray-700 hover:border-primary text-gray-300 hover:text-white rounded-full font-medium transition-all btn-3d whitespace-nowrap"
                >
                  DECODE_PROFILE
                </button>
              </div>
            </div>
            
            {/* RIGHT SIDE - Image */}
            <div ref={aboutImgRef} className="hidden md:block relative shrink-0">
              <div className={`relative image-3d always-glow rounded-3xl`}>
                <div className="image-3d-shadow" />
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-3xl blur-xl opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl transform rotate-6" />
                <div className="relative holographic rounded-3xl p-1">
                  <img 
                    src="/pportrait.png" 
                    alt="Sogbola Isaac" 
                    className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-3xl shadow-2xl"
                    loading="eager"
                    decoding="async"
                    fetchpriority="high"
                  />
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-transparent via-primary/5 to-primary/20 pointer-events-none" />
                </div>
                
                {/* Status Badge */}
                <div className="absolute -bottom-4 -right-4 px-4 py-2 bg-dark-lighter border border-primary/50 rounded-lg neon-border">
                  <span className="text-primary text-sm">STATUS: ACTIVE</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <button 
          onClick={() => scrollToSection('about')}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500 hover:text-primary transition-colors flex flex-col items-center gap-2"
        >
          <span className="text-xs">SCROLL_DOWN</span>
          <ChevronDown className="w-6 h-6" />
        </button>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-20 md:py-32 bg-dark-lighter/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`order-2 md:order-1`}>
              <div className="relative">
                <img 
                  src="/picbw.png" 
                  alt="Sogbola Isaac" 
                  className="w-full max-w-md mx-auto rounded-2xl depth-shadow grayscale hover:grayscale-0 transition-all duration-500 image-3d neon-border"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute -right-4 top-1/4 flex flex-col gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-1 h-8 bg-primary/50 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className={`order-1 md:order-2`}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-4">
                <Fingerprint className="w-4 h-4 text-primary" />
                <span className="text-primary text-xs">IDENTITY_VERIFIED</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                <GlitchText text="PROFILE_DATA" className="gradient-text" />
              </h2>
              
              <div className="space-y-4 text-gray-400 text-lg leading-relaxed">
                <p className="neon-border p-4 rounded-lg bg-dark/50">
                  &gt; Name: Sogbola Isaac
                </p>
                <p className="neon-border p-4 rounded-lg bg-dark/50">
                  &gt; Role: Creative Graphic Designer
                </p>
                <p className="neon-border p-4 rounded-lg bg-dark/50">
                  &gt; Mission: Bringing ideas to life through visually stunning designs with attention to detail and modern aesthetics.
                </p>
                <p className="neon-border p-4 rounded-lg bg-dark/50">
                  &gt; Experience: 1+ years of hands-on creative projects, continuously evolving with design trends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" ref={expRef} className="py-20 md:py-32 bg-dark relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16`}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-4">
              <Cpu className="w-4 h-4 text-primary" />
              <span className="text-primary text-xs">SYSTEM_LOGS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <GlitchText text="EXPERIENCE_DATA" className="gradient-text" />
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Loading creative achievements...
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 perspective-container">
            {[
              { 
                icon: <span className="text-2xl font-bold text-primary">1+</span>, 
                title: 'Years Active', 
                desc: 'Hands-on experience in diverse creative projects',
                pulse: true
              },
              { 
                icon: <Palette className="w-7 h-7 text-primary" />, 
                title: 'Visual Systems', 
                desc: 'Creating stunning visuals across all platforms'
              },
              { 
                icon: <Sparkles className="w-7 h-7 text-primary" />, 
                title: 'Creative Modules', 
                desc: 'Expanding design capabilities through challenges'
              },
            ].map((item, index) => (
              <div 
                key={index}
                className={`card-3d always-glow bg-dark-lighter rounded-2xl p-8 border border-gray-800 hover:border-primary/50 depth-shadow neon-border group stagger-${index + 1}`}
              >
                <div className="card-3d-inner">
                  <div className={`w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 ${item.pulse ? 'glow-pulse' : ''}`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                  
                  <div className="mt-4 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      style={{ width: `${85 + index * 5}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={skillsRef} className="py-20 md:py-32 bg-dark-lighter/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16`}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-4">
              <Code className="w-4 h-4 text-primary" />
              <span className="text-primary text-xs">TECH_STACK</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <GlitchText text="SKILLS_MATRIX" className="gradient-text" />
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Technologies and abilities loaded
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 perspective-container">
            {skills.map((skill, index) => (
              <div 
                key={index}
                className={`group card-3d always-glow bg-dark rounded-xl p-6 border border-gray-800 hover:border-primary/50 depth-shadow neon-border stagger-${(index % 6) + 1}`}
              >
                <div className="card-3d-inner">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                        {skill.icon}
                      </div>
                      <div>
                        <span className="text-white font-medium block">{skill.name}</span>
                        <span className="text-primary text-xs">{skill.level}</span>
                      </div>
                    </div>
                    <Binary className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors" />
                  </div>
                  
                  <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
                      style={{ width: skill.level === 'Expert' ? '95%' : skill.level === 'Advanced' ? '85%' : '70%' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Socials Section */}
      <section id="connect" ref={connectRef} className="py-20 md:py-32 bg-dark relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16`}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-4">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-primary text-xs">NETWORK_PORTS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <GlitchText text="ESTABLISH_LINK" className="gradient-text" />
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Connect through available channels
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto perspective-container">
            {socials.map((social, index) => (
              <a 
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group card-3d always-glow bg-dark-lighter rounded-2xl p-6 border border-gray-800 hover:border-primary/50 depth-shadow neon-border flex items-center justify-between stagger-${index + 1} ${social.color}`}
              >
                <div className="card-3d-inner flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    {social.icon}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{social.name}</p>
                    <p className="text-gray-400 text-sm">{social.handle}</p>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-dark-lighter border-t border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Binary className="w-5 h-5 text-primary" />
              <span className="text-gray-500 text-sm decode-text">
                <TypewriterText text={`SGI_ELITE_DESIGNS v1.0.0 // ${new Date().getFullYear()}`} speed={50} />
              </span>
            </div>
            <p className="text-gray-600 text-xs decode-text">
              ALL_SYSTEMS_OPERATIONAL
            </p>
          </div>
        </div>
      </footer>
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-10 right-6 w-12 h-12 bg-primary hover:bg-blue-600 text-white rounded-full shadow-lg shadow-primary/30 transition-all duration-300 flex items-center justify-center z-[60] ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
}

export default App
