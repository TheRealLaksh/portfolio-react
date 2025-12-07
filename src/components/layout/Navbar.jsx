import React, { useEffect, useState } from 'react';
import { FiHome, FiUser, FiBriefcase, FiCpu, FiCode, FiFileText, FiMail, FiDownload, FiMessageSquare } from 'react-icons/fi';
import useScrollSpy from '../../hooks/useScrollSpy';
import { cn } from '../../utils/cn';
import { triggerWarp } from '../../utils/triggerWarp';
import { triggerHaptic } from '../../utils/triggerHaptic';
import { useLenis } from '@studio-freight/react-lenis';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  
  const navIds = ['home', 'about', 'experience', 'skills', 'projects', 'resume', 'contact'];
  const activeSection = useScrollSpy(navIds);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = () => {
    triggerHaptic();
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          setDeferredPrompt(null);
        }
      });
    }
  };

  const openChat = () => {
    triggerHaptic();
    window.dispatchEvent(new Event('toggle-chat'));
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    triggerHaptic();
    triggerWarp();
    
    if (lenis) {
      lenis.scrollTo(`#${id}`, {
        offset: -50,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'auto' });
      }
    }
  };

  const getLinkClass = (id) => cn(
    "relative flex items-center justify-center rounded-full md:rounded-xl px-3 py-2 md:px-4 md:py-3 text-sm md:text-base font-medium transition-all duration-300 shrink-0 group hover:bg-white/5",
    activeSection === id 
      ? "bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)] scale-110 md:scale-100" 
      : "text-slate-400 hover:text-slate-200 active:scale-95"
  );

  const getTextClass = (id) => cn(
    "overflow-hidden transition-all duration-300 ease-in-out hidden md:block",
    activeSection === id 
      ? "w-auto opacity-100 ml-2" 
      : "w-0 opacity-0 group-hover:w-auto group-hover:opacity-100 group-hover:ml-2"
  );

  return (
    <nav className={cn(
      "fixed left-1/2 -translate-x-1/2 z-50 flex flex-nowrap items-center gap-1 md:gap-2 rounded-full md:rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl p-1 md:p-3 shadow-2xl shadow-black/80 transition-all duration-500 max-w-[95vw] overflow-x-auto no-scrollbar",
      "bottom-4 pb-safe",
      "md:bottom-auto md:top-6",
      !isVisible && "translate-y-[200%] opacity-0 md:translate-y-0 md:opacity-100"
    )}>
      
      <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className={getLinkClass('home')}>
        <FiHome className="w-4 h-4 md:w-5 md:h-5" />
        <span className={getTextClass('home')}>Home</span>
      </a>

      <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className={getLinkClass('about')}>
        <FiUser className="w-4 h-4 md:w-5 md:h-5" />
        <span className={getTextClass('about')}>About</span>
      </a>

      <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className={getLinkClass('experience')}>
        <FiBriefcase className="w-4 h-4 md:w-5 md:h-5" />
        <span className={getTextClass('experience')}>Work</span>
      </a>

      <a href="#skills" onClick={(e) => scrollToSection(e, 'skills')} className={getLinkClass('skills')}>
        <FiCpu className="w-4 h-4 md:w-5 md:h-5" />
        <span className={getTextClass('skills')}>Skills</span>
      </a>

      <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className={getLinkClass('projects')}>
        <FiCode className="w-4 h-4 md:w-5 md:h-5" />
        <span className={getTextClass('projects')}>Projects</span>
      </a>

      <div className="mx-1 h-6 w-[1px] bg-white/10 shrink-0 hidden md:block"></div>

      <a href="#resume" onClick={(e) => scrollToSection(e, 'resume')} className={getLinkClass('resume')}>
        <FiFileText className="w-4 h-4 md:w-5 md:h-5" />
        <span className={getTextClass('resume')}>Resume</span>
      </a>

      <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className={getLinkClass('contact')}>
        <FiMail className="w-4 h-4 md:w-5 md:h-5" />
        <span className={getTextClass('contact')}>Contact</span>
      </a>

      <button 
        onClick={openChat} 
        className="relative flex items-center justify-center rounded-full px-3 py-2 md:hidden text-sky-400 bg-sky-500/10 border border-sky-500/30 active:scale-95 transition-all"
      >
        <FiMessageSquare className="w-4 h-4" />
      </button>

      {deferredPrompt && (
        <button onClick={handleInstallClick} className="relative flex items-center rounded-full px-3 py-2 md:hidden text-green-400 bg-green-500/10 border border-green-500/30 active:scale-95 transition-all">
          <FiDownload className="w-4 h-4" />
        </button>
      )}

    </nav>
  );
};

export default Navbar;
