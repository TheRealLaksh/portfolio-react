import React from 'react';
import useGitHub from '../../hooks/useGitHub';
import { FiGithub, FiExternalLink, FiMusic, FiPenTool, FiCalendar, FiShoppingCart, FiTv, FiCode } from 'react-icons/fi';

const genreIcons = {
  music: FiMusic,
  art: FiPenTool,
  calendar: FiCalendar,
  shop: FiShoppingCart,
  tv: FiTv,
  code: FiCode
};

const Projects = () => {
  const { projects, loading, error } = useGitHub();

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-16" data-aos="fade-right">
          <h2 className="text-3xl md:text-5xl font-bold text-white">GitHub Shipments</h2>
          <div className="h-px flex-grow bg-gradient-to-r from-slate-700 to-transparent"></div>
        </div>

        {/* Loading / Error States */}
        {loading && (
          <div className="text-center py-20 text-slate-500 font-mono animate-pulse">
            Loading neural interface...
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-red-400 font-mono">
            ⚠️ {error}
          </div>
        )}

        {/* Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="github-projects-grid">
            {projects.map((repo, index) => {
              const GenreIcon = genreIcons[repo.genre] || FiCode;

              return (
                <div 
                  key={repo.id} 
                  className="group relative bg-zinc-900/40 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 hover:border-zinc-600 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  
                  {/* Header Row */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-400 group-hover:text-white group-hover:border-zinc-600 transition-colors">
                      <GenreIcon size={20} />
                    </div>

                    <div className="flex gap-3">
                      {/* Live Demo Button */}
                      {repo.demo && (
                        <a 
                          href={repo.demo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-800/50 text-slate-400 hover:w-28 hover:bg-emerald-500/10 hover:border-emerald-500/50 hover:text-emerald-400 hover:shadow-lg hover:shadow-emerald-900/20 transition-all duration-500 overflow-hidden group/btn"
                        >
                          <div className="absolute right-3 flex items-center justify-center">
                            <FiExternalLink size={18} />
                          </div>
                          <span className="opacity-0 group-hover/btn:opacity-100 whitespace-nowrap text-sm font-bold mr-6 transition-opacity duration-300">Live Demo</span>
                        </a>
                      )}

                      {/* Code Button */}
                      <a 
                        href={repo.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-800/50 text-slate-400 hover:w-24 hover:bg-green-500/10 hover:border-green-500/50 hover:text-green-400 hover:shadow-lg hover:shadow-green-900/20 transition-all duration-500 overflow-hidden group/btn"
                      >
                        <div className="absolute right-3 flex items-center justify-center">
                          <FiGithub size={18} />
                        </div>
                        <span className="opacity-0 group-hover/btn:opacity-100 whitespace-nowrap text-sm font-bold mr-6 transition-opacity duration-300">Code</span>
                      </a>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors">
                    {repo.name}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed flex-grow">
                    {repo.description || "No description available for this confidential project."}
                  </p>

                  {/* Footer (Language) */}
                  <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between">
                    {repo.language && (
                      <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-500 bg-zinc-900 px-2 py-1 rounded">
                        {repo.language}
                      </span>
                    )}
                    <div className="flex items-center gap-1 text-zinc-600 text-xs">
                      <span>⭐ {repo.stars}</span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* View All Button */}
        <div className="mt-20 text-center">
          <a 
            href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1"
          >
            Explore all repositories <FiExternalLink />
          </a>
        </div>

      </div>
    </section>
  );
};

export default Projects;