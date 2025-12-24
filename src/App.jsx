import React, { useEffect } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
// 1. Import 'Navigate'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Home from './pages/Home';
import Booking from './components/sections/Booking';

function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 30,
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.refresh(); 
  }, [location]);

  const lenisOptions = {
    lerp: 0.07,
    duration: 1.2,
    smoothTouch: false,
    touchMultiplier: 2,
  };

  return (
    <ReactLenis root options={lenisOptions}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          
          {/* 2. ADD THIS CATCH-ALL ROUTE */}
          {/* If the URL doesn't match above, redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
          
        </Routes>
      </Layout>
    </ReactLenis>
  );
}

export default App;