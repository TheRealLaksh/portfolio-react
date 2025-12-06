import React from 'react';
import useGitHub from '../../hooks/useGitHub';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

// Username for the bottom button
const GITHUB_USERNAME = 'TheRealLaksh';

// SVG Paths from your script
const genreIcons = {
  code: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />,
  art: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />,
  calendar: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
  music: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />,
  shop: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />,
  tv: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
};

// Language Badge Colors
const langColors = {
  JavaScript: "text-yellow-300 bg-yellow-500/10 border-yellow-500/20",
  HTML: "text-orange-300 bg-orange-500/10 border-orange-500/20",
  CSS: "text-blue-300 bg-blue-500/10 border-blue-500/20",
  Python: "text-cyan-300 bg-cyan-500/10 border-cyan-500/20",
  TypeScript: "text-blue-400 bg-blue-600/10 border-blue-600/20",
  Vue: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
  React: "text-sky-300 bg-sky-500/10 border-sky-500/20",
  Java: "text-red-300 bg-red-500/10 border-red-500/20",
  default: "text-zinc-300 bg-zinc-800/80 border-zinc-700/50"
};

const Projects = () => {
  const { projects, loading, error } = useGitHub();

  return (
    <section id="projects" className="my-16 sm:my-32 scroll-mt-20 relative z-10" data-aos="fade-up">
      <div className="w-full px-6 md:px-12">

        {/* Header */}
        <div className="flex items-center justify-between mb-12 max-w-[1600px] mx-auto">
          <h2 className="text-3xl font-bold text-white">GitHub Shipments</h2>
          <div className="h-[1px] flex-grow bg-gradient-to-r from-slate-700 to-transparent ml-6"></div>
        </div>

        {/* Grid */}
        <div id="github-projects-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1600px] mx-auto">
          
          {loading && (
            <p className="text-slate-400 col-span-full text-center animate-pulse">Loading neural interface...</p>
          )}

          {error && (
            <p className="text-red-400 col-span-full text-center">⚠️ {error}</p>
          )}

          {!loading && !error && projects.map((repo, index) => {
             const iconSvg = genreIcons[repo.genre] || genreIcons.code;
             
             // Determine languages to display (max 3)
             // Note: useGitHub hook needs to return `languages` array or `language` string
             // Assuming repo object has { language: "JavaScript" } or similar based on previous hook code.
             // If you want exact multi-language support, the hook needs to fetch the /languages endpoint.
             // For now, we wrap the single primary language in an array.
             const langs = repo.languages || (repo.language ? [repo.language] : ["Code"]);

             return (
              <div 
                key={repo.id} 
                className="group relative flex flex-col h-full bg-zinc-900/40 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-500 hover:border-zinc-600 hover:shadow-2xl hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="p-6 flex flex-col flex-grow">

                  {/* Header Row */}
                  <div className="flex justify-between items-start mb-5">
                    {/* Genre Icon */}
                    <div className="p-2.5 bg-zinc-950 rounded-xl border border-zinc-800 text-zinc-400 group-hover:text-white group-hover:border-zinc-600 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {iconSvg}
                      </svg>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 items-center h-10">
                      
                      {/* Live Demo Button */}
                      {repo.demo && (
                        <a href={repo.demo} target="_blank" rel="noopener noreferrer"
                          className="group/btn relative flex items-center justify-start w-10 hover:w-28 h-10 bg-slate-800/50 border border-slate-700 rounded-full overflow-hidden transition-all duration-500 ease-out hover:border-emerald-500/50 shadow-lg hover:shadow-emerald-900/20"
                        >
                          <div className="absolute inset-0 w-full h-full bg-emerald-500/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                          <div className="w-10 h-10 flex items-center justify-center shrink-0 z-10 group-hover/btn:text-emerald-400 text-slate-400 transition-colors duration-300">
                            <FiExternalLink size={20} />
                          </div>
                          <span className="opacity-0 group-hover/btn:opacity-100 text-emerald-400 font-medium text-xs whitespace-nowrap transition-all duration-500 delay-100 absolute left-10">
                            Live Demo
                          </span>
                        </a>
                      )}

                      {/* Code Button */}
                      <a href={repo.url} target="_blank" rel="noopener noreferrer"
                        className="group/btn relative flex items-center justify-start w-10 hover:w-24 h-10 bg-slate-800/50 border border-slate-700 rounded-full overflow-hidden transition-all duration-500 ease-out hover:border-green-500/50 shadow-lg hover:shadow-green-900/20"
                      >
                        <div className="absolute inset-0 w-full h-full bg-green-500/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        <div className="w-10 h-10 flex items-center justify-center shrink-0 z-10 group-hover/btn:text-green-400 text-slate-400 transition-colors duration-300">
                          <FiGithub size={20} />
                        </div>
                        <span className="opacity-0 group-hover/btn:opacity-100 text-green-400 font-medium text-xs whitespace-nowrap transition-all duration-500 delay-100 absolute left-10">
                          Code
                        </span>
                      </a>

                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-3 tracking-tight group-hover:text-sky-100 transition-colors">
                    {repo.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-zinc-300 leading-relaxed font-light opacity-90 flex-grow">
                    {repo.description}
                  </p>

                  {/* Language Badges */}
                  <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between">
                    <div className="flex gap-2 flex-wrap">
                      {langs.slice(0, 3).map((lang, i) => {
                         const colorClass = langColors[lang] || langColors.default;
                         return (
                           <span key={i} className={`text-[10px] font-medium px-2 py-1 rounded border ${colorClass}`}>
                             {lang}
                           </span>
                         );
                      })}
                    </div>
                    <div className="flex items-center gap-1 text-zinc-600 text-xs">
                      <span>⭐ {repo.stars}</span>
                    </div>
                  </div>

                </div>
              </div>
             );
          })}
        </div>

        {/* Explore Button */}
        <div className="view-more-container mt-16 text-center" data-aos="fade-up">
          <a href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`} target="_blank" rel="noopener noreferrer"
            className="relative inline-flex group items-center justify-center px-8 py-3 overflow-hidden font-medium text-sky-400 border border-sky-400/30 rounded-lg hover:bg-sky-400/10 transition-all duration-300">
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-sky-400 rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
            <span className="relative flex items-center gap-2">
              Explore GitHub
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default Projects;