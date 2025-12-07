import React, { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  FiMessageSquare, FiX, FiSend, FiCopy, FiExternalLink, 
  FiBriefcase, FiMinimize2, FiMaximize2 
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import resumeFile from '../../assets/resume/laksh.pradhwani.resume.pdf'; 
import { triggerHaptic } from '../../utils/triggerHaptic';
import { cn } from '../../utils/cn';

const API_URL = 'https://aiapi.ishan.vip/api/chat';
const API_KEY = 'oqLZh!P`U61f,m4iV?l556.N&O`A%%h';

const TypingWave = () => (
  <div className="flex gap-1 items-center h-4 px-2">
    {[0, 1, 2, 3].map((i) => (
      <motion.div
        key={i}
        className="w-1 bg-sky-400 rounded-full"
        animate={{ height: ["4px", "12px", "4px"], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
      />
    ))}
  </div>
);

const ActionChip = ({ icon: Icon, label, onClick }) => (
  <button onClick={onClick} className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-sky-500/10 hover:border-sky-500/30 transition-all active:scale-95 text-xs font-medium text-slate-300 hover:text-sky-300">
    <Icon size={14} className="opacity-70 group-hover:opacity-100" />
    <span>{label}</span>
  </button>
);

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  
  const [hasBooted, setHasBooted] = useState(false);
  const [isBooting, setIsBooting] = useState(false);
  const [bootLines, setBootLines] = useState([]);
  const [chatMessages, setChatMessages] = useState(() => {
    try {
      const stored = localStorage.getItem('auroraChatMessages');
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });
  const [userId, setUserId] = useState(() => {
    try { return localStorage.getItem('auroraUserId') || ''; } catch { return ''; }
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Listen for Navbar Event
  useEffect(() => {
    const handleToggleEvent = () => {
      triggerHaptic();
      setIsOpen((prev) => !prev);
    };
    window.addEventListener('toggle-chat', handleToggleEvent);
    return () => window.removeEventListener('toggle-chat', handleToggleEvent);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => !isOpen && setShowNotification(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => { if (isOpen) setShowNotification(false); }, [isOpen]);

  useEffect(() => {
    if (!userId) {
      const newId = 'user-' + Date.now();
      setUserId(newId);
      localStorage.setItem('auroraUserId', newId);
    }
  }, [userId]);

  useEffect(() => {
    localStorage.setItem('auroraChatMessages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isLoading, isOpen, isExpanded]);

  useEffect(() => {
    if (isOpen && !hasBooted) {
      setIsBooting(true);
      setBootLines([]); 
      const logs = ["> INITIALIZING NEURAL UPLINK...", "> CONNECTING TO LAKSH_CORE...", "> SECURITY HANDSHAKE::VERIFIED", "> ESTABLISHING SECURE CHANNEL..."];
      let lineIndex = 0;
      const interval = setInterval(() => {
        if (lineIndex < logs.length) {
          setBootLines((prev) => [...prev, logs[lineIndex]]);
          lineIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => { setIsBooting(false); setHasBooted(true); }, 800);
        }
      }, 350); 
      return () => clearInterval(interval);
    }
  }, [isOpen, hasBooted]);

  const handleToggle = () => { triggerHaptic(); setIsOpen(!isOpen); };
  const handleCopyEmail = () => { navigator.clipboard.writeText('contact@lakshp.live'); setChatMessages(prev => [...prev, { sender: 'Aurora', content: '📧 Email copied!', type: 'text' }]); };
  const handleViewProjects = () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  const handleDownloadResume = () => window.open(resumeFile, '_blank');
  const clearChat = async () => { setChatMessages([]); localStorage.removeItem('auroraChatMessages'); try { await fetch(API_URL, { method: 'DELETE', headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY }, body: JSON.stringify({ userId }) }); } catch {} };

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
      setChatMessages((prev) => [...prev, { sender: 'Aurora', content: data.reply || '', type: 'mdx' }]);
    } catch {
      setChatMessages((prev) => [...prev, { sender: 'Aurora', content: 'Error. Please try again.', type: 'text' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

  return (
    <>
      <AnimatePresence>
        {showNotification && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-[85px] right-6 z-50 cursor-pointer origin-bottom-right hidden md:block"
            onClick={() => setIsOpen(true)}
          >
            <div className="relative bg-slate-900/90 backdrop-blur-xl text-white px-6 py-4 rounded-2xl border border-sky-500/30">
               {/* Close Button */}
               <button onClick={(e) => { e.stopPropagation(); setShowNotification(false); }} className="absolute -top-2 -left-2 bg-slate-800 text-slate-400 p-1 rounded-full"><FiX size={12} /></button>
               <p className="text-sm font-bold">Ask AI Laksh!</p>
               <div className="absolute bottom-0 right-0 translate-y-[40%] translate-x-[-10px] w-4 h-4 bg-slate-900/90 border-r border-b border-sky-500/30 rotate-45"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm" onClick={() => setIsOpen(false)} />

            <motion.div 
              key="chat-window"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={cn(
                "fixed z-50 flex flex-col overflow-hidden shadow-2xl border-t border-x md:border border-white/10 bg-[#0a0a0b]/95 backdrop-blur-xl origin-bottom-right transition-all duration-300",
                "bottom-0 left-0 right-0 w-full h-[85dvh] rounded-t-3xl", 
                "md:bottom-[90px] md:right-6 md:left-auto md:max-w-[calc(100vw-3rem)] md:rounded-3xl",
                isExpanded ? "md:w-[600px] md:h-[700px]" : "md:w-[380px] md:h-[550px]"
              )}
            >
              <div className="w-full flex justify-center pt-3 pb-1 md:hidden" onClick={() => setIsOpen(false)}><div className="w-12 h-1.5 bg-slate-700 rounded-full"></div></div>
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

              {isBooting ? (
                <div className="flex-1 flex flex-col justify-center items-start p-8 font-mono text-xs leading-7 text-sky-400 z-10">
                  {bootLines.map((line, i) => <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}><span className="text-sky-600 mr-2">➜</span>{line}</motion.div>)}
                </div>
              ) : (
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
                    <div className="text-sm font-bold text-white flex items-center gap-2">AI Laksh <span className="text-[10px] text-green-400">●</span></div>
                    <div className="flex gap-2">
                        <button onClick={() => setIsExpanded(!isExpanded)} className="text-slate-400 hover:text-white hidden md:block"><FiMaximize2 size={16} /></button>
                        <button onClick={clearChat} className="text-[10px] text-slate-400 hover:text-white border border-white/10 px-2 rounded-full">Reset</button>
                        <button onClick={() => setIsOpen(false)} className="md:hidden text-slate-400"><FiX size={20} /></button>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5 custom-scrollbar">
                    {chatMessages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                            <FiMessageSquare size={32} className="mb-4 opacity-50"/>
                            <p className="text-sm mb-4">Ask me anything about Laksh.</p>
                            <div className="flex flex-wrap justify-center gap-2"><ActionChip icon={FiBriefcase} label="Projects" onClick={handleViewProjects}/><ActionChip icon={FiCopy} label="Email" onClick={handleCopyEmail}/></div>
                        </div>
                    )}
                    {chatMessages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-[13px] ${msg.sender === 'You' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-200'}`}>
                           {msg.type === 'mdx' ? <ReactMarkdown>{String(msg.content)}</ReactMarkdown> : msg.content}
                        </div>
                      </div>
                    ))}
                    {isLoading && <div className="flex justify-start"><div className="bg-slate-800 rounded-2xl px-4 py-3"><TypingWave /></div></div>}
                    <div ref={messagesEndRef} />
                  </div>
                  <div className="p-4 bg-slate-900 border-t border-white/5 pb-8 md:pb-4">
                    <div className="relative"><input type="text" className="w-full bg-slate-800 rounded-full py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-sky-500" placeholder="Type a message..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} /><button onClick={sendMessage} className="absolute right-2 top-2 p-1.5 bg-sky-500 rounded-full text-white"><FiSend /></button></div>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <button onClick={handleToggle} className="fixed bottom-8 right-8 z-[60] hidden md:flex items-center justify-center w-14 h-14 rounded-full bg-slate-900 border border-slate-700 shadow-2xl shadow-sky-900/20 hover:scale-110 transition-transform text-sky-400" aria-label="Toggle Chat">
        {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
      </button>
    </>
  );
}

export default ChatWidget;