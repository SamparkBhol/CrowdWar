import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Box, BrainCircuit, GitBranch, Layers } from 'lucide-react';

const HomePage = ({ onEnter }) => {
  const iconVariants = {
    initial: { y: 0, scale: 1 },
    hover: { y: -5, scale: 1.1, rotate: 5, transition: { type: 'spring', stiffness: 300 } },
  };

  const categories = [
    { name: 'Snippets', icon: <Layers className="h-8 w-8" /> },
    { name: 'Workflow', icon: <GitBranch className="h-8 w-8" /> },
    { name: 'AI Insights', icon: <BrainCircuit className="h-8 w-8" /> },
    { name: 'And More...', icon: <Box className="h-8 w-8" /> },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center p-4 hero-bg">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl"
      >
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
          <span className="gradient-text">Supercharge Your Development</span>
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          The ultimate toolkit for modern developers. Access a vast library of code snippets, plan your projects with an AI-driven workflow, and unlock powerful insights.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              variants={iconVariants}
              initial="initial"
              whileHover="hover"
              className="flex flex-col items-center gap-2 p-4 rounded-lg text-muted-foreground"
            >
              {cat.icon}
              <span className="text-sm font-medium">{cat.name}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
        >
          <Button size="lg" onClick={onEnter} className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/20">
            Enter the Vault
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;