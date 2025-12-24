import React, { useEffect } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import Layout from './components/layout/Layout';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Updated Imports with Numbered Prefixes
import Hero from './components/sections/01-Hero';
import About from './components/sections/02-About';
import Experience from './components/sections/03-Experience';
import Skills from './components/sections/04-Skills';
import Projects from './components/sections/05-Projects';
import Resume from './components/sections/06-Resume';
import Services from './components/sections/07-Services'; // Import Services
import Contact from './components/sections/08-Contact';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 30,
    });
  }, []);

  // Lenis Settings for "Butter Smooth" Feel
  const lenisOptions = {
    lerp: 0.07,         // Lower = smoother/heavier (default 0.1)
    duration: 1.2,      // Scroll duration
    smoothTouch: false, // Keep native touch feel for better mobile UX, or set true for unified feel
    touchMultiplier: 2, // Faster touch scrolling
  };

  return (
    <ReactLenis root options={lenisOptions}>
      <Layout>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Resume />
        <Services /> 
        <Contact />
        <div className="h-[100px]" />
      </Layout>
    </ReactLenis>
  );
}

export default App;