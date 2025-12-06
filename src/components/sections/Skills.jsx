import React from 'react';
import Tilt from 'react-parallax-tilt';

const Skills = () => {
  return (
    <section id="skills" className="my-24 relative z-10" data-aos="fade-up">
      <div className="w-full relative z-10">

        {/* Header */}
        <div className="text-center mb-20 px-6">
          <h2 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-500 inline-block mb-6">
            Technical Arsenal
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto text-xl md:text-2xl font-light leading-relaxed">
            My weapons of choice for building futuristic digital products.
          </p>
        </div>

        {/* Grid Container - WIDER (95%) for wider cards */}
        <div className="w-[95%] max-w-[2200px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mb-32">

          {/* Python */}
          <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02} transitionSpeed={1000} className="h-full">
            <div className="skill-card-glass group rounded-[2rem] p-6 flex flex-col items-center justify-center gap-5 relative overflow-hidden h-full min-h-[180px]">
              <div className="glow-python absolute inset-0 rounded-[2rem] border-2 border-transparent transition-all duration-300"></div>
              <div className="w-16 h-16 md:w-20 md:h-20 text-sky-400 relative z-10 drop-shadow-[0_0_15px_rgba(56,189,248,0.6)] transition-transform duration-300 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.7,2.8H8.3L2.8,8.3v7.4l5.5,5.5h7.4l5.5-5.5V8.3L15.7,2.8z M19.2,15.7L15.7,19.2h-7.4L4.8,15.7V8.3L8.3,4.8h7.4 l3.5,3.5V15.7z M12,7.5c-1.4,0-2.5,1.1-2.5,2.5s1.1,2.5,2.5,2.5s2.5-1.1,2.5-2.5S13.4,7.5,12,7.5z M12,12.5c-1.4,0-2.5,1.1-2.5,2.5 s1.1,2.5,2.5,2.5s2.5-1.1,2.5-2.5S13.4,12.5,12,12.5z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-200 relative z-10 group-hover:text-sky-400 transition-colors text-xl tracking-wide">Python</h3>
            </div>
          </Tilt>

          {/* Django */}
          <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02} transitionSpeed={1000} className="h-full">
            <div className="skill-card-glass group rounded-[2rem] p-6 flex flex-col items-center justify-center gap-5 relative overflow-hidden h-full min-h-[180px]">
              <div className="glow-django absolute inset-0 rounded-[2rem] border-2 border-transparent transition-all duration-300"></div>
              <div className="w-16 h-16 md:w-20 md:h-20 text-emerald-500 relative z-10 drop-shadow-[0_0_15px_rgba(16,185,129,0.6)] transition-transform duration-300 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L1 21h22L12 2zm0 3.5L19.5 19h-15L12 5.5z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-200 relative z-10 group-hover:text-emerald-400 transition-colors text-xl tracking-wide">Django</h3>
            </div>
          </Tilt>

          {/* JavaScript */}
          <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02} transitionSpeed={1000} className="h-full">
            <div className="skill-card-glass group rounded-[2rem] p-6 flex flex-col items-center justify-center gap-5 relative overflow-hidden h-full min-h-[180px]">
              <div className="glow-js absolute inset-0 rounded-[2rem] border-2 border-transparent transition-all duration-300"></div>
              <div className="w-16 h-16 md:w-20 md:h-20 text-yellow-400 relative z-10 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)] transition-transform duration-300 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2,2h20v20H2V2z M13,18h2V9h-2V18z M9,18h2V9H9V18z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-200 relative z-10 group-hover:text-yellow-400 transition-colors text-xl tracking-wide">JavaScript</h3>
            </div>
          </Tilt>

          {/* HTML5 */}
          <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02} transitionSpeed={1000} className="h-full">
            <div className="skill-card-glass group rounded-[2rem] p-6 flex flex-col items-center justify-center gap-5 relative overflow-hidden h-full min-h-[180px]">
              <div className="glow-html absolute inset-0 rounded-[2rem] border-2 border-transparent transition-all duration-300"></div>
              <div className="w-16 h-16 md:w-20 md:h-20 text-orange-500 relative z-10 drop-shadow-[0_0_15px_rgba(249,115,22,0.6)] transition-transform duration-300 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.3,1.1l1.8,20.8L12,24l7.9-2.1L21.7,1.1H2.3z M17.6,8.3l-0.3,3.3H12V8.3h5.6z M11,15.7h-4 l0.2,2.3l4.8,1.3v-3.6H11z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-200 relative z-10 group-hover:text-orange-400 transition-colors text-xl tracking-wide">HTML5</h3>
            </div>
          </Tilt>

          {/* CSS3 */}
          <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02} transitionSpeed={1000} className="h-full">
            <div className="skill-card-glass group rounded-[2rem] p-6 flex flex-col items-center justify-center gap-5 relative overflow-hidden h-full min-h-[180px]">
              <div className="glow-css absolute inset-0 rounded-[2rem] border-2 border-transparent transition-all duration-300"></div>
              <div className="w-16 h-16 md:w-20 md:h-20 text-blue-500 relative z-10 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-transform duration-300 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.3,1.1l1.8,20.8L12,24l7.9-2.1L21.7,1.1H2.3z M17.6,8.3l-0.3,3.3H12V8.3h5.6z M11,15.7h-4 l0.2,2.3l4.8,1.3v-3.6H11z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-200 relative z-10 group-hover:text-blue-400 transition-colors text-xl tracking-wide">CSS3</h3>
            </div>
          </Tilt>

          {/* Firebase */}
          <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02} transitionSpeed={1000} className="h-full">
            <div className="skill-card-glass group rounded-[2rem] p-6 flex flex-col items-center justify-center gap-5 relative overflow-hidden h-full min-h-[180px]">
              <div className="glow-firebase absolute inset-0 rounded-[2rem] border-2 border-transparent transition-all duration-300"></div>
              <div className="w-16 h-16 md:w-20 md:h-20 text-amber-500 relative z-10 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)] transition-transform duration-300 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.6 2.8l-2.5 7.7h5.8l-5.6-10c-.2-.4-.8-.4-1 .1-.2.5-.1 1.1.3 2.2zM5.6 15.6l2.5-4.6-1.8-3.4c-.3-.6-1.2-.6-1.5 0l-4.5 8.6c-.2.4 0 .9.4 1.1.4.2 1 .2 1.3-.1.9-.5 2.2-1.1 3.6-1.6zM13.9 10.8l-1.7 3.2 4.6 2.3c1.7.9 3.2 1.6 4.5 2.2l1.6-2.9c.3-.5.1-1.1-.4-1.3l-8.6-3.5z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-200 relative z-10 group-hover:text-amber-400 transition-colors text-xl tracking-wide">Firebase</h3>
            </div>
          </Tilt>

          {/* Kali Linux */}
          <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02} transitionSpeed={1000} className="h-full">
            <div className="skill-card-glass group rounded-[2rem] p-6 flex flex-col items-center justify-center gap-5 relative overflow-hidden h-full min-h-[180px]">
              <div className="glow-kali absolute inset-0 rounded-[2rem] border-2 border-transparent transition-all duration-300"></div>
              <div className="w-16 h-16 md:w-20 md:h-20 text-blue-500 relative z-10 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-transform duration-300 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 4h16v16H4V4m0-2c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H4zm2 9h4v2H6v-2zm0-4h8v2H6V7zm0 8h6v2H6v-2z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-200 relative z-10 group-hover:text-blue-400 transition-colors text-xl tracking-wide">Kali Linux</h3>
            </div>
          </Tilt>

          {/* Cybersecurity */}
          <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02} transitionSpeed={1000} className="h-full">
            <div className="skill-card-glass group rounded-[2rem] p-6 flex flex-col items-center justify-center gap-5 relative overflow-hidden h-full min-h-[180px]">
              <div className="glow-security absolute inset-0 rounded-[2rem] border-2 border-transparent transition-all duration-300"></div>
              <div className="w-16 h-16 md:w-20 md:h-20 text-red-500 relative z-10 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)] transition-transform duration-300 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-200 relative z-10 group-hover:text-red-400 transition-colors text-xl tracking-wide">Cybersecurity</h3>
            </div>
          </Tilt>

          {/* Gen AI */}
          <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02} transitionSpeed={1000} className="h-full">
            <div className="skill-card-glass group rounded-[2rem] p-6 flex flex-col items-center justify-center gap-5 relative overflow-hidden h-full min-h-[180px]">
              <div className="glow-ai absolute inset-0 rounded-[2rem] border-2 border-transparent transition-all duration-300"></div>
              <div className="w-16 h-16 md:w-20 md:h-20 text-purple-500 relative z-10 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)] transition-transform duration-300 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-200 relative z-10 group-hover:text-purple-400 transition-colors text-xl tracking-wide">Gen AI</h3>
            </div>
          </Tilt>

          {/* Databases */}
          <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02} transitionSpeed={1000} className="h-full">
            <div className="skill-card-glass group rounded-[2rem] p-6 flex flex-col items-center justify-center gap-5 relative overflow-hidden h-full min-h-[180px]">
              <div className="glow-db absolute inset-0 rounded-[2rem] border-2 border-transparent transition-all duration-300"></div>
              <div className="w-16 h-16 md:w-20 md:h-20 text-teal-500 relative z-10 drop-shadow-[0_0_15px_rgba(20,184,166,0.6)] transition-transform duration-300 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 3.34 2 5v14c0 1.66 4.48 3 10 3s10-1.34 10-3V5c0-1.66-4.48-3-10-3zm0 2c4.27 0 8 1.11 8 2s-3.73 2-8 2-8-1.11-8-2 3.73-2 8-2zm0 16c-4.27 0-8-1.11-8-2v-2.5c1.85 1.28 4.81 2 8 2s6.15-.72 8-2V20c0 .89-3.73 2-8 2zm0-5c-4.27 0-8-1.11-8-2v-2.5c1.85 1.28 4.81 2 8 2s6.15-.72 8-2V15c0 .89-3.73 2-8 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-200 relative z-10 group-hover:text-teal-400 transition-colors text-xl tracking-wide">Databases</h3>
            </div>
          </Tilt>

          {/* Git */}
          <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02} transitionSpeed={1000} className="h-full">
            <div className="skill-card-glass group rounded-[2rem] p-6 flex flex-col items-center justify-center gap-5 relative overflow-hidden h-full min-h-[180px]">
              <div className="glow-git absolute inset-0 rounded-[2rem] border-2 border-transparent transition-all duration-300"></div>
              <div className="w-16 h-16 md:w-20 md:h-20 text-rose-500 relative z-10 drop-shadow-[0_0_15px_rgba(244,63,94,0.6)] transition-transform duration-300 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.955 10.533c-.03-.245-.223-.424-.468-.424h-3.073c-.245 0-.438.179-.468.424l-1.396 9.875c-.03.245.163.49.407.49h2.327c.245 0 .438-.245.408-.49l.962-9.875zm-6.02-6.55c.245 0 .438-.18.468-.424l.962-9.11C19.425.18 19.232 0 18.988 0h-2.327c-.244 0-.437.245-.407.49l1.396 9.05c.03.244.223.424.468.424h.94v.019zm-5.998 19.952c-6.626 0-11.996-5.37-11.996-11.996S5.311.004 11.937.004s11.996 5.37 11.996 11.996-5.37 11.985-11.996 11.985zM9.542 8.528h2.094c.306 0 .407.245.407.489v2.296l2.094-2.122c.183-.153.316-.184.499-.184.366 0 .468.275.468.489v5.18c0 .245-.102.49-.468.49-.183 0-.316-.03-.499-.184l-2.094-2.122v2.296c0 .244-.102.489-.407.489H9.542c-.306 0-.407-.245-.407-.49V9.017c0-.244.101-.489.407-.489z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-200 relative z-10 group-hover:text-rose-400 transition-colors text-xl tracking-wide">Git</h3>
            </div>
          </Tilt>

          {/* GitHub */}
          <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02} transitionSpeed={1000} className="h-full">
            <div className="skill-card-glass group rounded-[2rem] p-6 flex flex-col items-center justify-center gap-5 relative overflow-hidden h-full min-h-[180px]">
              <div className="glow-github absolute inset-0 rounded-[2rem] border-2 border-transparent transition-all duration-300"></div>
              <div className="w-16 h-16 md:w-20 md:h-20 text-white relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] transition-transform duration-300 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2.1c-3.2.7-3.9-1.5-3.9-1.5-.5-1.2-1.1-1.6-1.1-1.6-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.6 2.5 1.1 3.1.8.1-.7.4-1.1.7-1.4-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.1-3.3-.1-.3-.5-1.5.1-3.1 0 0 .9-.3 3.4 1.2a11.5 11.5 0 0 1 6.2 0c2.5-1.5 3.4-1.2 3.4-1.2.6 1.6.2 2.8.1 3.1.7.9 1.1 2 1.1 3.3 0 4.6-2.8 5.6-5.5 5.9.4.3.8 1 .8 2v3c0 .4.2.7.8.6 4.6-1.5 7.9-5.9 7.9-10.9C23.5 5.65 18.35.5 12 .5z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-200 relative z-10 group-hover:text-white transition-colors text-xl tracking-wide">GitHub</h3>
            </div>
          </Tilt>

        </div>
      </div>
    </section>
  );
};

export default Skills;