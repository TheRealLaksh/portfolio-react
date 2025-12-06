import React from 'react';
import { FiEye, FiDownload } from 'react-icons/fi';
import resumeFile from '../../assets/resume/laksh.pradhwani.resume.pdf'; // Ensure this file exists

const Resume = () => {
  return (
    <section id="resume" className="py-24 relative z-10 overflow-hidden" data-aos="fade-up">
      <div className="w-full max-w-7xl mx-auto px-6 text-center">
        
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Resume & CV
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A formal look at my experience, education, and technical expertise.
          </p>
        </div>

        {/* Buttons Container */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          
          {/* Button 1: View Resume (Emerald Theme) */}
          <a 
            href={resumeFile}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-64 h-16 rounded-full border border-slate-700 bg-slate-900/50 overflow-hidden flex items-center justify-center transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] cursor-pointer"
          >
            {/* Default Text */}
            <span className="font-semibold text-slate-300 group-hover:opacity-0 transition-opacity duration-300 relative z-10">
              View Resume
            </span>

            {/* Expanding Circle */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-500 rounded-full transition-all duration-500 group-hover:scale-[25] z-0"></div>

            {/* Hover Text */}
            <div className="absolute inset-0 z-20 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-bold tracking-wide">
              <FiEye className="text-xl" />
              <span>Open File</span>
            </div>
          </a>

          {/* Button 2: Download CV (Rose Theme) */}
          <a 
            href={resumeFile}
            download="Laksh_Pradhwani_Resume.pdf"
            className="group relative w-64 h-16 rounded-full border border-slate-700 bg-slate-900/50 overflow-hidden flex items-center justify-center transition-all duration-300 hover:border-rose-500/50 hover:shadow-[0_0_30px_rgba(244,63,94,0.3)] cursor-pointer"
          >
            <span className="font-semibold text-slate-300 group-hover:opacity-0 transition-opacity duration-300 relative z-10">
              Download CV
            </span>

            <div className="absolute left-6 top-1/2 -translate-y-1/2 w-3 h-3 bg-rose-500 rounded-full transition-all duration-500 group-hover:scale-[25] z-0"></div>

            <div className="absolute inset-0 z-20 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-bold tracking-wide">
              <FiDownload className="text-xl" />
              <span>Save File</span>
            </div>
          </a>

        </div>

      </div>
    </section>
  );
};

export default Resume;