import React, { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  FiMessageSquare, FiX, FiSend, FiCopy, FiExternalLink, 
  FiBriefcase, FiMinimize2, FiMaximize2, FiMail // <--- ADDED FiMail HERE
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import resumeFile from '../../assets/resume/laksh.pradhwani.resume.pdf'; 
import { triggerHaptic } from '../../utils/triggerHaptic';
import { cn } from '../../utils/cn';

// API Configuration
const API_URL = 'https://ai-backend.lakshp.live/api/chat';
const API_KEY = 'oqLZh!P`U61f,m4iV?l556.N&O`A%%h';

// --- COMPONENTS ---

const TypingWave = () => (
  <div className="flex gap-1 items-center h-4 px-2">
    {[0, 1, 2, 3].map((i) => (
      <motion.div
        key={i}
        className="w-1 bg-sky-400 rounded-full"
        animate={{
          height: ["4px", "12px", "4px"],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.15
        }}
      />
    ))}
  </div>
);

const ActionChip = ({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-sky-500/10 hover:border-sky-500/30 transition-all active:scale-95 text-xs font-medium text-slate-300 hover:text-sky-300 hover:shadow-[0_0_15px_rgba(14,165,233,0.15)]"
  >
    <Icon size={14} className="opacity-70 group-hover:opacity-100" />
    <span>{label}</span>
  </button>
);

// --- CONTACT CARD COMPONENT ---
const ContactCard = () => {
  const handleCopy = () => {
    navigator.clipboard.writeText('contact@lakshp.live');
    triggerHaptic();
  };

  return (
    <div className="w-[260px] bg-slate-900/80 backdrop-blur-xl border border-sky-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-sky-500/10 mb-2">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 p-4 pb-6 relative">
        <div className="absolute top-0 right-0 p-3 opacity-30">
          <FiMessageSquare size={40} />
        </div>
        <h4 className="text-white font-bold text-lg">Let's Connect</h4>
        <p className="text-sky-100 text-xs opacity-90">I'm open for work!</p>
      </div>

      {/* Content Body */}
      <div className="p-4 -mt-4 relative z-10 space-y-3">
        {/* Email Button */}
        <button 
          onClick={handleCopy}
          className="w-full group flex items-center justify-between bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-xl p-3 transition-all active:scale-95"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400">
              <FiMail size={14} />
            </div>
            <div className="text-left">
              <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Email</div>
              <div className="text-xs text-white">contact@lakshp.live</div>
            </div>
          </div>
          <FiCopy className="text-slate-500 group-hover:text-white transition-colors" />
        </button>

        {/* LinkedIn / Socials */}
        <a 
          href="https://linkedin.com/in/laksh-pradhwani" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full flex items-center gap-3 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-xl p-3 transition-all active:scale-95"
        >
          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
            <FiExternalLink size={14} />
          </div>
          <span className="text-sm text-white font-medium">LinkedIn Profile</span>
        </a>
      </div>
    </div>
  );
};

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  
  // Boot & Chat State
  const [hasBooted, setHasBooted] = useState(false);
  const [isBooting, setIsBooting] = useState(false);
  const [bootLines, setBootLines] = useState([]);
  const [chatMessages, setChatMessages] = useState(() => {
    try {
      const stored = localStorage.getItem('auroraChatMessages');
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch { return []; }
  });
  const [userId, setUserId] = useState(() => {
    try { return localStorage.getItem('auroraUserId') || ''; } catch { return ''; }
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // --- EFFECTS ---
  
  // Show notification after 3s (Desktop only logic applied in render)
  useEffect(() => {
    const timer = setTimeout(() => {
        if (!isOpen) setShowNotification(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Hide notification when chat opens
  useEffect(() => {
    if (isOpen) setShowNotification(false);
  }, [isOpen]);

  useEffect(() => {
    if (!userId) {
      const newUserId = 'user-' + Date.now();
      setUserId(newUserId);
      localStorage.setItem('auroraUserId', newUserId);
    }
  }, [userId]);

  useEffect(() => {
    localStorage.setItem('auroraChatMessages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isLoading, isOpen, isExpanded]);

  // Listen for Navbar Event (Mobile Dock Trigger)
  useEffect(() => {
    const handleToggleEvent = () => {
      triggerHaptic();
      setIsOpen((prev) => !prev);
    };
    window.addEventListener('toggle-chat', handleToggleEvent);
    return () => window.removeEventListener('toggle-chat', handleToggleEvent);
  }, []);

  // Boot Sequence
  useEffect(() => {
    if (isOpen && !hasBooted) {
      setIsBooting(true);
      setBootLines([]); 
      const logs = [
        "> INITIALIZING NEURAL UPLINK...",
        "> CONNECTING TO LAKSH_CORE...",
        "> SECURITY HANDSHAKE::VERIFIED",
        "> ESTABLISHING SECURE CHANNEL..."
      ];
      let lineIndex = 0;
      const interval = setInterval(() => {
        if (lineIndex < logs.length) {
          setBootLines((prev) => [...prev, logs[lineIndex]]);
          lineIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setIsBooting(false);
            setHasBooted(true);
          }, 800);
        }
      }, 350); 
      return () => clearInterval(interval);
    }
  }, [isOpen, hasBooted]);

  // --- ACTIONS ---
  const handleToggle = () => {
      triggerHaptic();
      setIsOpen(!isOpen);
  };

  const handleCopyEmail = () => {
    setChatMessages(prev => [
      ...prev, 
      { sender: 'You', content: 'Can I get your contact info?', type: 'text' }
    ]);
    
    setTimeout(() => {
      triggerHaptic();
      setChatMessages(prev => [
        ...prev, 
        { sender: 'Aurora', type: 'contact' }
      ]);
    }, 600);
  };

  const handleViewProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleDownloadResume = () => {
    window.open(resumeFile, '_blank');
  };

  const sendMessage = async () => {
    const message = input.trim();
    if (!message || isLoading) return;
    
    setInput('');
    setChatMessages((prev) => [...prev, { sender: 'You', content: message, type: 'text' }]);
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
        body: JSON.stringify({ message, userId }),
      });

      if (!response.ok) throw new Error('Failed');
      const data = await response.json();
      
      let aiReply = typeof data?.reply === 'string' ? data.reply : String(data?.reply ?? '');
      let showCard = false;

      // Smart Logic: Detect the secret tag from backend
      if (aiReply.includes('[SHOW_CONTACT_CARD]')) {
        showCard = true;
        aiReply = aiReply.replace('[SHOW_CONTACT_CARD]', '');
      }

      setChatMessages((prev) => [...prev, { sender: 'Aurora', content: aiReply, type: 'mdx' }]);

      if (showCard) {
        setTimeout(() => {
            triggerHaptic();
            setChatMessages((prev) => [...prev, { sender: 'Aurora', type: 'contact' }]);
        }, 600);
      }

    } catch {
      setChatMessages((prev) => [...prev, { sender: 'Aurora', content: 'Error. Please try again.', type: 'text' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = async () => {
    setChatMessages([]);
    localStorage.removeItem('auroraChatMessages');
    try {
      await fetch(API_URL, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
        body: JSON.stringify({ userId }),
      });
    } catch {}
  };

  return (
    <>
      {/* 1. NOTIFICATION BUBBLE */}
      <AnimatePresence>
        {showNotification && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="fixed bottom-[85px] right-6 z-50 cursor-pointer origin-bottom-right hidden md:block"
            onClick={() => setIsOpen(true)}
          >
            <div className="relative bg-slate-900/90 backdrop-blur-xl text-white px-6 py-4 rounded-2xl rounded-br-sm border border-sky-500/30 shadow-[0_0_30px_-10px_rgba(14,165,233,0.4)] hover:border-sky-400/50 hover:shadow-sky-500/30 transition-all duration-300 max-w-[280px]">
              <button 
                onClick={(e) => { e.stopPropagation(); setShowNotification(false); }}
                className="absolute -top-2 -left-2 bg-slate-800 text-slate-400 hover:text-white border border-white/10 rounded-full p-1.5 transition-colors shadow-lg"
              >
                <FiX size={12} />
              </button>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
                  </span>
                  <p className="text-base font-bold text-white tracking-wide">Ask AI Laksh!</p>
                </div>
                <p className="text-sm text-slate-300 font-light leading-relaxed">
                  Curious about my work? I can answer questions about my skills & experience instantly.
                </p>
              </div>
              <div className="absolute bottom-0 right-0 translate-y-[40%] translate-x-[-10px] w-4 h-4 bg-slate-900/90 border-r border-b border-sky-500/30 rotate-45 clip-path-polygon -z-10"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
            />

            <motion.div 
              key="chat-window"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={cn(
                "fixed z-50 flex flex-col overflow-hidden shadow-[0_0_50px_-10px_rgba(0,0,0,0.6)] border-t border-x md:border border-white/10 bg-[#0a0a0b]/95 backdrop-blur-xl origin-bottom-right transition-all duration-300 ease-in-out",
                "bottom-0 left-0 right-0 w-full h-[85dvh] rounded-t-3xl",
                "md:bottom-[80px] md:right-6 md:left-auto md:max-w-[calc(100vw-3rem)] md:rounded-3xl",
                isExpanded ? "md:w-[600px] md:h-[700px]" : "md:w-[380px] md:h-[550px]"
              )}
            >
              <div className="w-full flex justify-center pt-3 pb-1 md:hidden" onClick={() => setIsOpen(false)}>
                  <div className="w-12 h-1.5 bg-slate-700 rounded-full"></div>
              </div>

              <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0 mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

              {isBooting ? (
                <div className="flex-1 flex flex-col justify-center items-start p-8 font-mono text-xs leading-7 text-sky-400 z-10">
                  {bootLines.map((line, index) => (
                    <motion.div key={index} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                      <span className="text-sky-600 mr-2">➜</span>{line}
                    </motion.div>
                  ))}
                  <div className="w-2 h-4 bg-sky-400/80 mt-2 animate-pulse" />
                </div>
              ) : (
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                        </span>
                        AI Laksh
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium ml-4 tracking-wider">Online and Ready • v2.0.4</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setIsExpanded(!isExpanded)} className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors hidden md:block">
                        {isExpanded ? <FiMinimize2 size={16} /> : <FiMaximize2 size={16} />}
                      </button>
                      <button onClick={clearChat} className="text-[10px] font-medium text-slate-400 hover:text-white px-3 py-1 rounded-full border border-white/10 hover:bg-white/5 transition-all">
                        Reset
                      </button>
                      <button onClick={() => setIsOpen(false)} className="md:hidden text-slate-400 p-2">
                          <FiX size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5 custom-scrollbar" onWheel={(e) => { e.stopPropagation(); }}>
                    {chatMessages.length === 0 && (
                      <div className="h-full flex flex-col items-center justify-center text-center p-6">
                        <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4 border border-white/5">
                          <FiMessageSquare size={24} className="text-sky-500/80" />
                        </div>
                        <p className="text-base font-medium text-white mb-2">System Ready</p>
                        <p className="text-xs text-slate-400 mb-8 leading-relaxed max-w-[200px]">
                          Ask anything about Laksh's tech stack, projects, or experience.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 w-full">
                          <ActionChip icon={FiBriefcase} label="View Projects" onClick={handleViewProjects} />
                          <ActionChip icon={FiCopy} label="Copy Email" onClick={handleCopyEmail} />
                          <ActionChip icon={FiExternalLink} label="Resume" onClick={handleDownloadResume} />
                        </div>
                      </div>
                    )}
                    {chatMessages.map((msg, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                        {msg.type === 'contact' ? (
                            <ContactCard />
                        ) : (
                            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed shadow-sm ${
                            msg.sender === 'You' 
                                ? 'bg-gradient-to-br from-sky-600 to-blue-600 text-white rounded-br-sm shadow-sky-900/20' 
                                : 'bg-slate-800/80 text-slate-200 border border-white/5 rounded-bl-sm'
                            }`}>
                            {msg.type === 'mdx' ? (
                                <div className="prose prose-invert prose-p:my-1 text-[13px] prose-a:text-sky-300 prose-code:bg-black/30 prose-code:rounded prose-code:px-1">
                                <ReactMarkdown>{String(msg.content)}</ReactMarkdown>
                                </div>
                            ) : msg.content}
                            </div>
                        )}
                      </motion.div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-slate-800/80 border border-white/5 rounded-2xl rounded-bl-sm px-4 py-3">
                          <TypingWave />
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="p-4 bg-gradient-to-t from-black/80 to-transparent pb-8 md:pb-4">
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-purple-500 rounded-full opacity-0 group-focus-within:opacity-20 transition duration-500 blur-md"></div>
                      <input
                        type="text"
                        className="relative w-full rounded-full border border-white/10 bg-slate-900/90 pl-5 pr-12 py-3.5 text-sm text-white outline-none focus:border-sky-500/50 transition-all placeholder:text-slate-500 shadow-inner"
                        placeholder="Ask AI anything..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                      />
                      <button 
                        onClick={sendMessage} 
                        disabled={isLoading || !input.trim()} 
                        className="absolute right-2 top-2 p-2 bg-sky-600 hover:bg-sky-500 rounded-full text-white transition-all disabled:opacity-0 disabled:scale-75 shadow-lg shadow-sky-500/20 active:scale-90"
                      >
                        <FiSend size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <button
        onClick={handleToggle}
        className="fixed bottom-6 right-6 z-[60] group hidden md:flex items-center justify-end w-12 hover:w-36 h-12 rounded-full overflow-hidden transition-all duration-500 ease-out bg-transparent border border-transparent hover:bg-slate-900 hover:border-slate-700 hover:shadow-2xl hover:shadow-sky-900/20 active:scale-95"
        aria-label="Toggle Chat"
      >
        <div className="absolute inset-0 w-full h-full bg-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <span className="absolute right-14 opacity-0 group-hover:opacity-100 text-sky-400 font-medium text-sm whitespace-nowrap transition-all duration-500 delay-75">
          AI Assistant
        </span>
        <div className={`relative w-12 h-12 flex items-center justify-center shrink-0 z-10 transition-colors duration-300 ${isOpen ? 'text-white' : 'text-slate-400 group-hover:text-sky-400'}`}>
          {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
        </div>
      </button>
    </>
  );
}

export default ChatWidget;