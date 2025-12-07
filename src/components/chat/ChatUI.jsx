import React from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { ContactCard, ProjectCard, ExperienceCard, TechStackCard, EducationCard, VibeCard } from './ChatCards';

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

// --- MESSAGE BUBBLE ---
export const ChatBubble = ({ msg }) => {
  const isUser = msg.sender === 'You';
  
  // 1. Render Specific Card Types
  if (msg.type === 'contact') return <ContactCard />;
  if (msg.type === 'project') return <ProjectCard />;
  if (msg.type === 'experience') return <ExperienceCard />;
  if (msg.type === 'stack') return <TechStackCard />;
  if (msg.type === 'education') return <EducationCard />;
  if (msg.type === 'vibe') return <VibeCard />;

  // 2. Render Standard Text
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