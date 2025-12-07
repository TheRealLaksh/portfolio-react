import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiGithub, FiLinkedin, FiInstagram, FiMail, FiExternalLink, 
  FiCalendar, FiDownload, FiMusic, FiCpu, FiBriefcase, FiAward 
} from 'react-icons/fi';
import useSpotify from '../../hooks/useSpotify';
import profileImg from '../../assets/images/laksh.pradhwani.webp';
import resumeFile from '../../assets/resume/laksh.pradhwani.resume.pdf';
import { skillsData } from '../../data/skillsData';

// --- 1. CONTACT CARD (Updated) ---
export const ContactCard = () => {
  const [time, setTime] = useState('');
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit', hour12: true };
      const timeString = now.toLocaleTimeString('en-US', options);
      const hours = now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', hour12: false });
      const currentHour = parseInt(hours, 10);
      const online = currentHour >= 9 && currentHour < 23;

      setTime(timeString);
      setIsOnline(online);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[280px] bg-slate-900/90 backdrop-blur-xl border border-sky-500/30 rounded-2xl shadow-2xl shadow-sky-500/10 mb-2 overflow-hidden">
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 p-4 pb-8 relative">
        <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 w-max">
            <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-green-400 animate-pulse' : 'bg-slate-400'}`}></div>
            <span className="text-[10px] font-medium text-white/90 font-mono">
            {time} • {isOnline ? 'Online' : 'Away'}
            </span>
        </div>
      </div>

      <div className="px-5 pb-5 relative z-10 -mt-6">
          <div className="flex justify-between items-end mb-3">
            <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-b from-sky-300 to-blue-600 shadow-lg">
                <img src={profileImg} alt="Profile" className="w-full h-full rounded-full object-cover border-2 border-slate-900" />
            </div>
            <div className="flex gap-2">
                <a href="https://github.com/TheRealLaksh" target="_blank" rel="noreferrer" className="social-btn"><FiGithub size={14} /></a>
                <a href="https://linkedin.com/in/laksh-pradhwani" target="_blank" rel="noreferrer" className="social-btn"><FiLinkedin size={14} /></a>
                <a href="https://www.instagram.com/_.lakshp/" target="_blank" rel="noreferrer" className="social-btn"><FiInstagram size={14} /></a>
            </div>
          </div>

          <h3 className="text-white font-bold text-lg leading-tight">Laksh Pradhwani</h3>
          <p className="text-sky-400/80 text-xs font-medium mb-4">Full Stack Developer</p>

          <div className="space-y-2">
            <a href="mailto:contact@lakshp.live" className="w-full flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 transition-all group active:scale-95">
              <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400"><FiMail size={12} /></div>
                  <span className="text-xs font-medium text-slate-200">Email Me</span>
              </div>
              <FiExternalLink className="text-slate-500 group-hover:text-white transition-colors" size={12} />
            </a>

            <div className="flex gap-2">
                <a href={resumeFile} download="Laksh_Pradhwani_Resume.pdf" className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-xl py-2.5 transition-all active:scale-95">
                    <FiDownload size={14} className="text-slate-400" />
                    <span className="text-[10px] font-bold text-slate-300">Resume</span>
                </a>
                <a href="https://calendly.com/laksh-pradhwani/30min/" target="_blank" rel="noopener noreferrer" className="flex-[1.5] flex items-center justify-center gap-2 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white rounded-xl py-2.5 shadow-lg shadow-sky-900/20 transition-all active:scale-95">
                    <FiCalendar size={14} />
                    <span className="text-[10px] font-bold">Book a Call</span>
                </a>
            </div>
          </div>
      </div>
    </div>
  );
};

// --- 2. PROJECT SPOTLIGHT CARD ---
export const ProjectCard = () => (
  <div className="w-[280px] bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl">
     <div className="aspect-video w-full bg-slate-800 rounded-lg mb-3 overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
        {/* Placeholder for project image or gradient */}
        <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600"></div> 
        <div className="absolute bottom-3 left-3 z-20">
           <span className="text-[10px] font-bold text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded border border-indigo-500/30">FEATURED</span>
        </div>
     </div>
     <h4 className="text-white font-bold mb-1">GigX Platform</h4>
     <p className="text-xs text-slate-400 mb-4 line-clamp-2">A full-stack gig listing platform with secure auth, role-based dashboards, and scalable architecture.</p>
     <div className="flex gap-2">
        <a href="https://github.com/TheRealLaksh" target="_blank" rel="noreferrer" className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 py-2 rounded-lg text-center text-xs font-medium text-slate-300 transition-colors">View Code</a>
        <button className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg text-xs font-bold transition-colors">Live Demo</button>
     </div>
  </div>
);

// --- 3. EXPERIENCE / ROLE CARD ---
export const ExperienceCard = () => (
  <div className="w-[260px] bg-slate-900/90 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden">
     <div className="absolute top-0 right-0 p-3 opacity-10 text-emerald-500"><FiBriefcase size={80} /></div>
     <div className="relative z-10">
        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center mb-3">
           {/* Placeholder for Company Logo */}
           <span className="text-black font-bold text-xs">UM</span>
        </div>
        <h4 className="text-white font-bold text-lg">Full Stack Dev</h4>
        <p className="text-emerald-400 text-xs font-medium mb-3">Unified Mentor • Oct 2025</p>
        <div className="h-[1px] w-full bg-white/10 mb-3"></div>
        <ul className="text-[11px] text-slate-400 space-y-1.5 list-disc pl-3">
           <li>Built dynamic React UIs & Redux states.</li>
           <li>Reduced load times by 20%.</li>
        </ul>
     </div>
  </div>
);

// --- 4. TECH STACK CARD ---
export const TechStackCard = () => (
  <div className="w-[260px] bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
     <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
        <FiCpu className="text-sky-400" />
        <span className="text-sm font-bold text-white">Core Tech Stack</span>
     </div>
     <div className="grid grid-cols-4 gap-3">
        {skillsData.slice(0, 8).map((skill, idx) => (
           <div key={idx} className="flex flex-col items-center gap-1 group">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl transition-all group-hover:bg-white/10 group-hover:scale-110" style={{ color: skill.color }}>
                 <skill.icon />
              </div>
           </div>
        ))}
     </div>
  </div>
);

// --- 5. EDUCATION BADGE ---
export const EducationCard = () => (
  <div className="w-[260px] bg-gradient-to-br from-slate-900 to-slate-950 border border-yellow-500/30 rounded-2xl p-1 shadow-xl">
     <div className="border border-white/5 rounded-xl p-4 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="w-12 h-12 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 mb-3 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
           <FiAward size={24} />
        </div>
        <h4 className="text-white font-bold text-sm mb-1">National Coding Champ</h4>
        <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-3">VVM National Finalist</p>
        <div className="text-[10px] text-yellow-500/80 bg-yellow-500/5 px-3 py-1 rounded-full border border-yellow-500/10">
           Ranked Top 1% in Region
        </div>
     </div>
  </div>
);

// --- 6. NOW PLAYING / VIBE CARD ---
export const VibeCard = () => {
  const { song } = useSpotify();
  
  if (!song || !song.isPlaying) return (
     <div className="w-[240px] bg-slate-900 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 animate-pulse">
           <FiCpu />
        </div>
        <div>
           <p className="text-xs text-slate-400">Not listening to music.</p>
           <p className="text-[10px] text-slate-600">Probably debugging code.</p>
        </div>
     </div>
  );

  return (
    <div className="w-[260px] bg-black/80 backdrop-blur-xl border border-green-500/30 rounded-2xl p-4 relative overflow-hidden group cursor-pointer" onClick={() => window.open(song.url, '_blank')}>
       <div className="absolute right-[-10px] top-[-10px] w-20 h-20 bg-green-500/20 blur-2xl rounded-full"></div>
       
       <div className="flex items-center gap-3 relative z-10">
          <div className="relative">
             <img src={song.image} alt="Art" className="w-12 h-12 rounded-md shadow-lg animate-[spin_4s_linear_infinite]" />
             <div className="absolute inset-0 bg-black/20 rounded-md flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
             </div>
          </div>
          <div className="flex-1 min-w-0">
             <div className="flex items-center gap-1.5 mb-0.5">
                <FiMusic size={10} className="text-green-400" />
                <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">Now Vibing</span>
             </div>
             <h4 className="text-white text-xs font-bold truncate">{song.name}</h4>
             <p className="text-slate-400 text-[10px] truncate">{song.artist}</p>
          </div>
       </div>
       
       {/* Audio Wave Animation */}
       <div className="flex items-end gap-0.5 h-3 mt-3 ml-1">
          {[...Array(12)].map((_, i) => (
             <motion.div 
               key={i}
               className="w-1 bg-green-500/50 rounded-full"
               animate={{ height: ["20%", "100%", "20%"] }}
               transition={{ 
                 duration: 0.8, 
                 repeat: Infinity, 
                 delay: i * 0.05,
                 ease: "easeInOut"
               }}
             />
          ))}
       </div>
    </div>
  );
};