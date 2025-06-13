import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VisualEffects = ({ battleState }) => {
  const { lastBattleResult, isRunning } = battleState;

  if (!isRunning || !lastBattleResult) {
    return null;
  }
  
  const redAttacks = lastBattleResult.redDamage > 0;
  const blueAttacks = lastBattleResult.blueDamage > 0;
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {redAttacks && (
          <motion.div
            key={`red-attack-${lastBattleResult.round}`}
            className="absolute top-1/2 left-1/4 w-1/2 h-1 bg-red-500 rounded-full"
            style={{ transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1, transition: { duration: 0.1 } }}
            exit={{ scaleX: 0, transition: { duration: 0.1, delay: 0.2 } }}
          />
        )}
        {blueAttacks && (
          <motion.div
            key={`blue-attack-${lastBattleResult.round}`}
            className="absolute top-1/2 right-1/4 w-1/2 h-1 bg-cyan-400 rounded-full"
            style={{ transformOrigin: 'right' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1, transition: { duration: 0.1 } }}
            exit={{ scaleX: 0, transition: { duration: 0.1, delay: 0.2 } }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default VisualEffects;
