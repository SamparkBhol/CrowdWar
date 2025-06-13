import React from 'react';
import { motion } from 'framer-motion';
import { Github, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = ({ onTitleClick }) => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <button onClick={onTitleClick} className="flex items-center gap-2 focus:outline-none">
          <Code className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold tracking-tighter gradient-text">
            CodeVault
          </h1>
        </button>
        <a href="http://github.com/SamparkBhol/CodeVault" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm" className="gap-2">
            <Github className="h-4 w-4" />
            View on GitHub
          </Button>
        </a>
      </div>
    </motion.header>
  );
};

export default Header;