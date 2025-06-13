import React, { useState } from 'react';
import Header from '@/components/Header';
import HomePage from '@/components/HomePage';
import MainPage from '@/components/MainPage';
import ThreeVault from '@/components/ThreeVault';
import { Toaster } from "@/components/ui/toaster";
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const onEnterVault = () => setCurrentPage('vault');
  const onGoHome = () => setCurrentPage('home');

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <AnimatePresence>
        {currentPage === 'home' && <ThreeVault />}
      </AnimatePresence>
      <div className="relative z-10">
        <Header onTitleClick={onGoHome} />
        <main>
          <AnimatePresence mode="wait">
            {currentPage === 'home' && (
              <motion.div
                key="home"
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <HomePage onEnter={onEnterVault} />
              </motion.div>
            )}
            {currentPage === 'vault' && (
              <motion.div
                key="vault"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <MainPage />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
      <Toaster />
    </div>
  );
}

export default App;