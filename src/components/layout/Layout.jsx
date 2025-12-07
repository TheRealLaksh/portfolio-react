import React, { useState, Suspense } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion';
import Preloader from '../ui/Preloader';
import Navbar from './Navbar';
import SocialSidebar from './SocialSidebar';
import Footer from './Footer';
import Spotlight from '../ui/Spotlight';

// LAZY LOAD HEAVY COMPONENTS
const Background = React.lazy(() => import('../3d/Background'));
const ChatWidget = React.lazy(() => import('../chat/ChatWidget'));

// --- LIGHTWEIGHT SPINNER FALLBACK ---
// Prevents "blank space" while lazy components load
const LoadingSpinner = () => (
  <div className="flex items-center justify-center w-full h-full min-h-[100px] p-4">
    <div className="w-6 h-6 border-2 border-sky-500/30 border-t-sky-500 rounded-full animate-spin"></div>
  </div>
);

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-slate-300">
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
         <motion.div 
            className="fixed inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
         >
            {/* FIX: Added proper fallback for 3D Background */}
            <Suspense fallback={<div className="absolute inset-0 bg-black/90 flex items-center justify-center"><LoadingSpinner /></div>}>
               <Background />
            </Suspense>
            <Spotlight />
            <div className="bg-grain"></div>
         </motion.div>
      )}

      {!loading && (
        <>
          <Navbar />
          <SocialSidebar />
          
          <motion.main 
            className="relative z-10 flex flex-col items-center w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {children}
          </motion.main>

          <Footer />
          
          {/* FIX: Added fallback for ChatWidget */}
          <Suspense fallback={<div className="fixed bottom-6 right-6 z-50"><LoadingSpinner /></div>}>
            <ChatWidget />
          </Suspense>
        </>
      )}
    </div>
  );
};

export default Layout;