import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi';

// API Configuration
const API_URL = 'https://aiapi.ishan.vip/api/chat';
const API_KEY = 'oqLZh!P`U61f,m4iV?l556.N&O`A%%h';

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  // --- STATE MANAGEMENT ---
  const [chatMessages, setChatMessages] = useState(() => {
    try {
      const stored = localStorage.getItem('auroraChatMessages');
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      return [];
    }
  });

  const [userId, setUserId] = useState(() => {
    try {
      return localStorage.getItem('auroraUserId') || '';
    } catch {
      return '';
    }
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingDots, setLoadingDots] = useState('');

  // --- EFFECTS ---
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
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingDots((prev) => (prev.length < 3 ? prev + '.' : ''));
      }, 500);
      return () => clearInterval(interval);
    } else {
      setLoadingDots('');
    }
  }, [isLoading]);

  // --- HANDLERS ---
  const sendMessage = async () => {
    const message = input.trim();
    if (!message || isLoading) return;

    setInput('');
    setChatMessages((prev) => [
      ...prev,
      { sender: 'You', content: message, type: 'text' },
      { sender: 'AI Laksh', content: '...', type: 'loading' },
    ]);
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
        body: JSON.stringify({ message, userId }),
      });

      if (!response.ok) throw new Error('Failed');

      const data = await response.json();
      const aiReply = typeof data?.reply === 'string' ? data.reply : String(data?.reply ?? '');

      setChatMessages((prev) => {
        const updated = [...prev];
        if (updated.length && updated[updated.length - 1]?.type === 'loading') updated.pop();
        return [...updated, { sender: 'Aurora', content: aiReply, type: 'mdx' }];
      });
    } catch (error) {
      setChatMessages((prev) => {
        const updated = [...prev];
        if (updated.length && updated[updated.length - 1]?.type === 'loading') updated.pop();
        return [...updated, { sender: 'Aurora', content: 'Error. Please try again.', type: 'text' }];
      });
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
    } catch (e) { /* ignore */ }
  };

  const handleInnerWheel = (e) => {
    const el = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();
    el.scrollTop += e.deltaY;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* CHAT WINDOW */}
      {isOpen && (
        <div className="mb-4 w-[340px] max-w-[90vw] rounded-2xl bg-[#0a0a0b]/95 text-slate-200 shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] border border-white/10 backdrop-blur-xl p-4 flex flex-col animate-in slide-in-from-bottom-5 fade-in duration-300">
          
          <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-2">
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                </span>
                AI Laksh
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">
                Laksh's Digital Twin 
              </p>
            </div>
            <button onClick={clearChat} className="text-[10px] text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-white/5 transition-colors">
              Clear
            </button>
          </div>

          <div className="flex-1 min-h-[250px] max-h-[350px] overflow-y-auto space-y-3 pr-1 mb-3 custom-scrollbar" onWheel={handleInnerWheel}>
            {chatMessages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <div className="w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center mb-3">
                    <FiMessageSquare className="text-slate-400" size={20} />
                </div>
                <p className="text-xs text-slate-400">Ask me anything!</p>
              </div>
            )}
            {chatMessages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed shadow-sm ${message.sender === 'You' ? 'bg-sky-600 text-white rounded-br-sm' : 'bg-slate-800/80 text-slate-200 border border-white/5 rounded-bl-sm'}`}>
                  {message.type === 'loading' ? (
                    <span className="animate-pulse">...</span>
                  ) : message.type === 'mdx' ? (
                    <div className="prose prose-invert prose-p:my-1 text-[13px]"><ReactMarkdown>{String(message.content)}</ReactMarkdown></div>
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            <input
              type="text"
              className="w-full rounded-full border border-white/10 bg-black/40 pl-4 pr-12 py-3 text-[13px] text-white outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all placeholder:text-slate-600"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={sendMessage} disabled={isLoading || !input.trim()} className="absolute right-1.5 top-1.5 p-1.5 bg-sky-600 hover:bg-sky-500 rounded-full text-white transition-all disabled:opacity-50">
              <FiSend size={14} />
            </button>
          </div>
        </div>
      )}

      {/* --- SIDEBAR STYLE BUTTON --- */}
      {/* 1. Idle: Transparent bg/border, text hidden.
          2. Hover: Expands left, adds bg/border/shadow/text. 
      */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="group relative flex items-center justify-end w-12 hover:w-32 h-12 rounded-full overflow-hidden transition-all duration-500 ease-out bg-transparent border border-transparent hover:bg-slate-800 hover:border-slate-700 hover:shadow-lg hover:shadow-sky-900/20 active:scale-95"
        aria-label="Toggle Chat"
      >
        {/* Glow/Fill Effect on Hover */}
        <div className="absolute inset-0 w-full h-full bg-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Sliding Text Label */}
        <span className="opacity-0 group-hover:opacity-100 text-sky-400 font-medium text-sm whitespace-nowrap transition-all duration-500 delay-100 absolute right-12 pr-2">
          AI Laksh
        </span>

        {/* Icon (Always Visible) */}
        <div className="w-12 h-12 flex items-center justify-center shrink-0 z-10 text-slate-400 group-hover:text-sky-400 transition-colors duration-300">
          {isOpen ? <FiX size={22} /> : <FiMessageSquare size={22} />}
        </div>
      </button>

    </div>
  );
}

export default ChatWidget;