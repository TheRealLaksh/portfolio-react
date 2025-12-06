import React, { useState, useRef } from 'react';
import { TextReveal } from '../ui/TextReveal';
import { Reveal } from '../ui/Reveal';
import { motion, useScroll, useTransform } from 'framer-motion';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); 
  const containerRef = useRef(null);

  // --- HOLOGRAPHIC SCROLL EFFECT ---
  // We track when the form enters the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  // 1. Scale: Pops slightly into view (0.95 -> 1.0)
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  
  // 2. Border: Goes from faint (0.1) to solid (0.6)
  const borderOpacity = useTransform(scrollYProgress, [0, 1], [0.1, 0.6]);
  
  // 3. Glow: Background fills with a very faint blue light
  const bgGlow = useTransform(scrollYProgress, [0, 1], ["rgba(14, 165, 233, 0)", "rgba(14, 165, 233, 0.05)"]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xrbyqrjb", {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        setTimeout(() => { setStatus(null); setIsSubmitting(false); }, 5000);
      } else {
        throw new Error('Failed');
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => { setStatus(null); setIsSubmitting(false); }, 3000);
    }
  };

  return (
    <section id="contact" ref={containerRef} className="my-16 sm:my-24 scroll-mt-20 relative z-10">
      <div className="w-full px-6 md:px-12 max-w-[1400px] mx-auto">

        <TextReveal className="flex justify-center mb-12">
           <h2 className="section-title text-3xl font-bold text-white text-center relative">
             Let's Build Something
           </h2>
        </TextReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Left Column - Keep standard animation */}
          <div className="lg:col-span-2 space-y-6">
            <Reveal delay={0.1}>
               <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-8 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold text-white mb-4">Get in Touch</h3>
                  <p className="text-slate-400 leading-relaxed mb-6">
                    I'm currently open to freelance projects and internship opportunities. Have an idea?
                    Let's discuss how we can craft it into reality.
                  </p>
                  <div className="space-y-4">
                     <div className="flex items-center gap-4 text-slate-300">
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-sky-400 shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div>
                        <div>
                           <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">Email</div>
                           <a href="mailto:contact@lakshp.live" className="hover:text-sky-400 transition-colors">contact@lakshp.live</a>
                        </div>
                     </div>
                     <div className="flex items-center gap-4 text-slate-300">
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-purple-400 shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>
                        <div>
                           <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">Location</div>
                           <span>Varanasi, India</span>
                        </div>
                     </div>
                  </div>
               </div>
            </Reveal>
            
            {/* Social Icons - (You can paste your existing Social Icons block here if needed) */}
          </div>

          {/* Right Column: The Holographic Form */}
          <div className="lg:col-span-3">
            <motion.div 
                style={{ 
                    scale, 
                    backgroundColor: bgGlow,
                    borderColor: `rgba(255, 255, 255, ${borderOpacity})` // Dynamic border opacity
                }}
                className="backdrop-blur-md border border-slate-800 p-8 rounded-2xl shadow-xl relative group overflow-hidden h-full transition-colors duration-500"
            >
                <form onSubmit={handleSubmit}>
                    {/* Animated Glow Spot inside form */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl group-hover:bg-sky-500/20 transition-all duration-700"></div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 relative z-10">
                        <div className="space-y-2">
                        <label className="text-sm text-slate-400 font-medium ml-1">Name</label>
                        <input type="text" name="name" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-600" placeholder="Your Name" required />
                        </div>
                        <div className="space-y-2">
                        <label className="text-sm text-slate-400 font-medium ml-1">Email</label>
                        <input type="email" name="email" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-600" placeholder="your@email.com" required />
                        </div>
                    </div>

                    <div className="space-y-2 mb-6 relative z-10">
                        <label className="text-sm text-slate-400 font-medium ml-1">Subject</label>
                        <select name="subject" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all">
                        <option value="Project Proposal">Project Proposal</option>
                        <option value="Internship Offer">Internship Offer</option>
                        <option value="Freelance Work">Freelance Work</option>
                        <option value="Just saying hi">Just saying hi!</option>
                        </select>
                    </div>

                    <div className="space-y-2 mb-8 relative z-10">
                        <label className="text-sm text-slate-400 font-medium ml-1">Message</label>
                        <textarea name="message" rows="5" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-600" placeholder="Tell me about your project..." required></textarea>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSubmitting || status === 'success'}
                        className="submit-button relative z-10 w-full bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-sky-900/20 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {status === 'success' ? (
                        <div className="flex items-center gap-2 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            <span>Message Sent!</span>
                        </div>
                        ) : status === 'error' ? (
                        <span>Error. Try again.</span>
                        ) : isSubmitting ? (
                        <span>Sending...</span>
                        ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                            <span>Send Message</span>
                        </>
                        )}
                    </button>
                </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;