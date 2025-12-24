import React, { useEffect } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import Layout from './components/layout/Layout';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Hero from './components/sections/01-Hero';
import About from './components/sections/02-About';
import Experience from './components/sections/03-Experience';
import Skills from './components/sections/04-Skills';
import Projects from './components/sections/05-Projects';
import Resume from './components/sections/06-Resume';
import Services from './components/sections/07-Services';
import Booking from './components/sections/Booking';
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

  const lenisOptions = {
    lerp: 0.07,
    duration: 1.2,
    smoothTouch: false,
    touchMultiplier: 2,
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
        <Booking />
        <Contact />
        <div className="h-[100px]" />
      </Layout>
    </ReactLenis>
  );
}

export default App;