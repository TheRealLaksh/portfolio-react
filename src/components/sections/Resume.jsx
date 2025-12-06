import React from 'react';
import resumeFile from '../../assets/resume/laksh.pradhwani.resume.pdf';

const Resume = () => {
  return (
    <section id="resume" className="my-16 sm:my-32 scroll-mt-20 relative z-10" data-aos="fade-up">
      <div className="w-full px-6 md:px-12">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Resume & CV</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A formal look at my experience, education, and technical expertise.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-6 relative z-20">

          {/* View Resume (Emerald) */}
          <a 
            href={resumeFile} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative w-56 cursor-pointer overflow-hidden rounded-full border border-slate-700 bg-slate-900/50 p-3 text-center font-semibold shadow-lg transition-all duration-300 hover:border-emerald-500/50 hover:shadow-emerald-500/20"
          >
            <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 text-slate-300">
              View Resume
            </span>

            <div className="absolute left-5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-emerald-600 transition-all duration-500 group-hover:-top-24 group-hover:-left-16 group-hover:h-72 group-hover:w-72 group-hover:translate-y-0"></div>

            <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100 text-white">
              <span>View Resume</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
          </a>

          {/* Download CV (Rose) */}
          <a 
            href={resumeFile} 
            download="Laksh_Pradhwani_Resume.pdf"
            className="group relative w-56 cursor-pointer overflow-hidden rounded-full border border-slate-700 bg-slate-900/50 p-3 text-center font-semibold shadow-lg transition-all duration-300 hover:border-rose-500/50 hover:shadow-rose-500/20"
          >
            <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 text-slate-300">
              Download CV
            </span>

            <div className="absolute left-5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-rose-600 transition-all duration-500 group-hover:-top-24 group-hover:-left-16 group-hover:h-72 group-hover:w-72 group-hover:translate-y-0"></div>

            <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100 text-white">
              <span>Download CV</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
          </a>

        </div>
      </div>
    </section>
  );
};

export default Resume;