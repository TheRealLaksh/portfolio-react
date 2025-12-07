import React, { useRef } from 'react';
import { experienceData } from '../../data/timelineData';
import { TextReveal } from '../ui/TextReveal';
import { motion, useScroll, useSpring } from 'framer-motion';

const Experience = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" ref={containerRef} className="py-20 relative overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[100px] -z-10"></div>

      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16 md:mb-24">
          <TextReveal className="flex justify-center">
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Experience</h2>
          </TextReveal>
          <div className="h-1 w-20 bg-gradient-to-r from-sky-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="relative w-full max-w-5xl mx-auto timeline-container">
          
          {/* Vertical Line: Left on mobile, Center on desktop */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-zinc-800 md:-translate-x-1/2 ml-4 md:ml-0 overflow-hidden rounded-full">
            <motion.div 
              className="w-full bg-gradient-to-b from-sky-500 via-purple-500 to-teal-500 origin-top h-full"
              style={{ scaleY }} 
            ></motion.div>
          </div>

          {experienceData.map((item, index) => {
            const isLeft = index % 2 === 0;
            const themeColor = item.theme || 'sky'; 

            return (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="timeline-item relative mb-12 md:mb-16 flex flex-col md:flex-row items-center justify-between w-full group"
              >
                
                {/* Desktop Spacer */}
                {!isLeft && <div className="md:w-5/12 order-1 hidden md:block"></div>}

                {/* Content Card */}
                <div className={`w-full pl-12 md:w-5/12 md:pl-0 ${isLeft ? 'md:pr-10 order-2 md:order-1' : 'md:pl-10 order-2 md:order-3'}`}>
                  
                    <div 
                        className={`bg-zinc-900/60 backdrop-blur-xl p-5 md:p-6 rounded-2xl border border-white/5 transition-all duration-300 hover:bg-zinc-900/90 active:scale-95 group-hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]
                        hover:border-${themeColor}-500/30 group-hover:shadow-${themeColor}-500/10`}
                    >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                            <span className={`text-${themeColor}-400 text-[10px] md:text-xs font-mono border border-${themeColor}-500/20 bg-${themeColor}-500/10 px-2 py-0.5 rounded-full`}>
                                {item.date}
                            </span>
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{item.title}</h3>
                        <div className="text-slate-400 text-xs md:text-sm font-medium mb-3 flex items-center gap-2">
                            {/* ...icon... */}
                            {item.company}
                        </div>

                        <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-4">
                            {item.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {item.skills.map((skill, i) => (
                                <span key={i} className="text-[10px] md:text-[11px] text-slate-300 bg-slate-800/50 border border-white/5 px-2 py-1 rounded-md">
                                {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Dot: Left on mobile, Center on desktop */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center ml-0 order-1 z-10 bg-[#050505] rounded-full border-4 border-[#050505]">
                  <motion.div 
                    whileInView={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`w-2.5 h-2.5 md:w-3 md:h-3 bg-${themeColor}-500 rounded-full shadow-[0_0_10px_currentColor]`}
                  ></motion.div>
                </div>

                {/* Desktop Spacer */}
                {isLeft && <div className="md:w-5/12 order-3 hidden md:block"></div>}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;