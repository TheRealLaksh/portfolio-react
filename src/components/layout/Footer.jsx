import React, { useState, useEffect, useRef } from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import useSpotify from '../../hooks/useSpotify';

const Footer = () => {
  const { song } = useSpotify();
  const [time, setTime] = useState(new Date());
  
  // Refs for animation control
  const maskRef = useRef(null);
  const containerRef = useRef(null);
  const isHovered = useRef(false);
  const animationRef = useRef(null);

  // 1. Clock Logic
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // 2. Animation Loop (The "Brain" of the spotlight)
  useEffect(() => {
    const animate = () => {
      if (!maskRef.current) return;

      if (!isHovered.current) {
        // --- IDLE STATE: Scan Left to Right ---
        const now = Date.now();
        // Complete one sweep every 3 seconds
        const progress = (now % 3000) / 3000; 
        
        // Map progress (0 to 1) to SVG coordinates (0 to 300 width)
        const x = progress * 300; 
        
        maskRef.current.setAttribute('cx', x);
        maskRef.current.setAttribute('cy', '50'); // Keep centered vertically
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start loop
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // 3. Interactive Logic (Mouse Follower)
  const handleMouseMove = (e) => {
    if (!containerRef.current || !maskRef.current) return;
    
    isHovered.current = true; // Pause auto-scan

    const rect = containerRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    // Map DOM mouse coordinates to SVG ViewBox coordinates (300x100)
    const svgX = (relX / rect.width) * 300;
    const svgY = (relY / rect.height) * 100;

    maskRef.current.setAttribute('cx', svgX);
    maskRef.current.setAttribute('cy', svgY);
  };

  const handleMouseLeave = () => {
    isHovered.current = false; // Resume auto-scan
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    });
  };

  return (
    <footer className="relative w-full bg-[#020203] border-t border-white/5 overflow-hidden pt-14 pb-28 md:pb-14">
      
      {/* Background Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none"
           style={{ background: "radial-gradient(125% 125% at 50% 10%, rgba(0, 0, 0, 0) 40%, rgba(60, 162, 250, 0.1) 100%)" }}>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center">
        
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full mb-12 text-center md:text-left">
          
          {/* 1. Brand Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Laksh Pradhwani</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Building fast, immersive and futuristic digital experiences.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-3 mt-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-xs font-medium text-green-400 uppercase tracking-wide">Open to Work</span>
            </div>
          </div>

          {/* 2. Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Resume', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="hover:text-sky-400 transition-colors">
                    {link === 'Experience' ? 'Work' : link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Connect & Spotify */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-white font-semibold mb-4">Connect</h3>

            <div className="flex items-center gap-4 mb-6">
              <a href="https://github.com/TheRealLaksh" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <FiGithub size={20} />
              </a>
              <a href="https://linkedin.com/in/laksh-pradhwani" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors">
                <FiLinkedin size={20} />
              </a>
              <a href="mailto:contact@lakshp.live" className="text-slate-400 hover:text-rose-400 transition-colors">
                <FiMail size={20} />
              </a>
            </div>

            {/* Spotify Widget */}
            {song && (
              <div 
                onClick={() => window.open(song.url, '_blank')}
                className={`flex items-center gap-3 bg-[#0a0a0b] border border-white/10 pr-4 pl-2 py-2 rounded-full w-max transition-all hover:border-green-500/30 hover:shadow-[0_0_15px_rgba(34,197,94,0.1)] mb-4 cursor-pointer ${song.isPlaying ? 'opacity-100' : 'hidden'}`}
              >
                <div className="relative w-8 h-8 shrink-0">
                  <img src={song.image} alt="Album Art" className="w-full h-full rounded-full object-cover border border-white/10 animate-spin-slow" />
                  <div className="absolute inset-0 flex items-center justify-center gap-0.5 bg-black/30 rounded-full backdrop-blur-[1px]">
                    <div className="w-0.5 bg-green-400 h-2 animate-pulse"></div>
                    <div className="w-0.5 bg-green-400 h-3 animate-pulse delay-75"></div>
                    <div className="w-0.5 bg-green-400 h-1.5 animate-pulse delay-150"></div>
                  </div>
                </div>
                <div className="flex flex-col justify-center text-left">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-[9px] font-bold tracking-widest text-green-500 uppercase">Vibing To</span>
                  </div>
                  <div className="flex gap-1 text-[10px] max-w-[140px] overflow-hidden">
                    <span className="text-white font-medium truncate">{song.name}</span>
                    <span className="text-slate-500">-</span>
                    <span className="text-slate-400 truncate">{song.artist}</span>
                  </div>
                </div>
              </div>
            )}

            <p className="text-xs text-slate-500 text-center md:text-left">
              Varanasi, India<br />
              <span className="text-slate-600 mt-1 block font-mono">{formatTime(time)}</span>
            </p>
          </div>
        </div>

        {/* --- INTERACTIVE TEXT (Auto-Scan + Mouse Follow) --- */}
        <div 
          id="footer-hover-container"
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={scrollToTop}
          className="w-full h-32 sm:h-48 md:h-64 relative cursor-pointer select-none flex items-center justify-center mb-8 group"
        >
          <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="xMidYMid meet">
            <defs>
              {/* Rainbow Gradient for the Text */}
              <linearGradient id="textGradient" gradientUnits="userSpaceOnUse" cx="50%" cy="50%" r="25%">
                <stop offset="0%" stopColor="#eab308" />
                <stop offset="25%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#80eeb4" />
                <stop offset="75%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>

              {/* The Spotlight Mask */}
              <radialGradient 
                id="revealMask" 
                gradientUnits="userSpaceOnUse" 
                r="25%" // Spotlight Size
                cx="0" // Initially 0, updated by JS
                cy="50" 
                ref={maskRef}
              >
                <stop offset="0%" stopColor="white" />
                <stop offset="100%" stopColor="black" />
              </radialGradient>

              <mask id="textMask">
                <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
              </mask>
            </defs>

            {/* Layer 1: Faint Outline (Always Visible) */}
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" strokeWidth="0.3"
              className="font-[helvetica] font-bold fill-transparent stroke-neutral-800 text-7xl opacity-50">
              LAKSH
            </text>
            
            {/* Layer 2: Revealed Gradient Text (Masked) */}
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" strokeWidth="0.3"
              className="font-[helvetica] font-bold fill-transparent stroke-[url(#textGradient)] text-7xl"
              mask="url(#textMask)">
              LAKSH
            </text>
          </svg>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 w-full pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} Laksh Pradhwani. All Rights Reserved.</p>

          <div className="flex items-center gap-2 bg-[#0a0a0b] px-3 py-1.5 rounded-full border border-white/10 shadow-inner shadow-white/5">
            <span>Built with</span>
            <span className="text-sky-400 font-medium">React</span>
            <span className="w-1 h-1 rounded-full bg-slate-700"></span>
            <span className="text-purple-400 font-medium">Tailwind</span>
            <span className="w-1 h-1 rounded-full bg-slate-700"></span>
            <span className="text-pink-400 font-medium">Three.js</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;