import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { 
  FiMessageSquare, FiMail, FiExternalLink, FiCopy, 
  FiGithub, FiLinkedin, FiInstagram, FiDownload, 
  FiCalendar 
} from 'react-icons/fi';
import { triggerHaptic } from '../../utils/triggerHaptic';
import profileImg from '../../assets/images/laksh.pradhwani.webp';
import resumeFile from '../../assets/resume/laksh.pradhwani.resume.pdf';

// --- LOADING WAVE ---
export const TypingWave = () => (
  <div className="flex gap-1 items-center h-4 px-2">
    {[0, 1, 2, 3].map((i) => (
      <motion.div
        key={i}
        className="w-1 bg-sky-400 rounded-full"
        animate={{ height: ["4px", "12px", "4px"], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
      />
    ))}
  </div>
);

// --- ACTION CHIP BUTTON ---
export const ActionChip = ({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-sky-500/10 hover:border-sky-500/30 transition-all active:scale-95 text-xs font-medium text-slate-300 hover:text-sky-300"
  >
    <Icon size={14} className="opacity-70 group-hover:opacity-100" />
    <span>{label}</span>
  </button>
);

// --- ENHANCED CONTACT CARD ---
const ContactCard = () => {
  const [time, setTime] = useState('');
  const [isOnline, setIsOnline] = useState(false);

  // 1. Live Time & Availability Logic
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit', hour12: true };
      const timeString = now.toLocaleTimeString('en-US', options);
      
      // Determine "Online" status (e.g., 9 AM to 11 PM IST)
      const hours = now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', hour12: false });
      const currentHour = parseInt(hours, 10);
      const online = currentHour >= 9 && currentHour < 23;

      setTime(timeString);
      setIsOnline(online);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[280px] bg-slate-900/90 backdrop-blur-xl border border-sky-500/30 rounded-2xl shadow-2xl shadow-sky-500/10 mb-2 overflow-hidden">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 p-4 pb-8 relative">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
              <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-green-400 animate-pulse' : 'bg-slate-400'}`}></div>
              <span className="text-[10px] font-medium text-white/90 font-mono">
                {time} • {isOnline ? 'Online' : 'Away'}
              </span>
            </div>
            {/* Flip button removed */}
        </div>
      </div>

      {/* Avatar & Info */}
      <div className="px-5 pb-5 relative z-10 -mt-6">
          <div className="flex justify-between items-end mb-3">
            <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-b from-sky-300 to-blue-600 shadow-lg">
                <img src={profileImg} alt="Profile" className="w-full h-full rounded-full object-cover border-2 border-slate-900" />
            </div>
            <div className="flex gap-2">
                <a 
                  href="https://github.com/TheRealLaksh" target="_blank" rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all hover:scale-110"
                >
                  <FiGithub size={14} />
                </a>
                <a 
                  href="https://linkedin.com/in/laksh-pradhwani" target="_blank" rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-slate-700 transition-all hover:scale-110"
                >
                  <FiLinkedin size={14} />
                </a>
                <a 
                  href="https://www.instagram.com/_.lakshp/" target="_blank" rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-400 hover:text-pink-400 hover:bg-slate-700 transition-all hover:scale-110"
                >
                  <FiInstagram size={14} />
                </a>
            </div>
          </div>

          <h3 className="text-white font-bold text-lg leading-tight">Laksh Pradhwani</h3>
          <p className="text-sky-400/80 text-xs font-medium mb-4">Full Stack Developer</p>

          {/* Action Buttons */}
          <div className="space-y-2">
            <a 
              href="mailto:laksh.pradhwani@gmail.com"
              className="w-full flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 transition-all group active:scale-95"
            >
              <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400">
                    <FiMail size={12} />
                  </div>
                  <span className="text-xs font-medium text-slate-200">Email Me</span>
              </div>
              <FiExternalLink className="text-slate-500 group-hover:text-white transition-colors" size={12} />
            </a>

            <div className="flex gap-2">
                <a 
                    href={resumeFile} 
                    download="Laksh_Pradhwani_Resume.pdf"
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-xl py-2.5 transition-all active:scale-95"
                >
                    <FiDownload size={14} className="text-slate-400" />
                    <span className="text-[10px] font-bold text-slate-300">Resume</span>
                </a>
                
                <a 
                    href="https://calendly.com/" // Replace with actual Calendly link
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-[1.5] flex items-center justify-center gap-2 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white rounded-xl py-2.5 shadow-lg shadow-sky-900/20 transition-all active:scale-95"
                >
                    <FiCalendar size={14} />
                    <span className="text-[10px] font-bold">Book a Call</span>
                </a>
            </div>
          </div>
      </div>
    </div>
  );
};

// --- MESSAGE BUBBLE ---
export const ChatBubble = ({ msg }) => {
  if (msg.type === 'contact') return <ContactCard />;

  const isUser = msg.sender === 'You';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed shadow-sm ${
        isUser 
          ? 'bg-gradient-to-br from-sky-600 to-blue-600 text-white rounded-br-sm shadow-sky-900/20' 
          : 'bg-slate-800/80 text-slate-200 border border-white/5 rounded-bl-sm'
      }`}>
        {msg.type === 'mdx' ? (
          <div className="prose prose-invert prose-p:my-1 text-[13px] prose-a:text-sky-300 prose-code:bg-black/30 prose-code:rounded prose-code:px-1">
            <ReactMarkdown>{String(msg.content)}</ReactMarkdown>
          </div>
        ) : msg.content}
      </div>
    </div>
  );
};