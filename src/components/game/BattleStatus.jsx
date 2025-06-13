import React from 'react';
import { motion } from 'framer-motion';

const BattleStatus = ({ isRunning }) => {
  return (
    <div className="strategy-card rounded-xl p-6 flex items-center justify-center min-h-[168px]">
      <div className="text-center">
        {isRunning ? (
          <>
            <motion.div
              className="w-4 h-4 mx-auto bg-green-400 rounded-full mb-3"
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <div className="font-semibold text-green-400">SIMULATION ACTIVE</div>
            <div className="text-xs text-gray-400">Agents are engaged in combat.</div>
          </>
        ) : (
          <>
            <div className="w-4 h-4 mx-auto bg-yellow-400 rounded-full mb-3" />
            <div className="font-semibold text-yellow-400">SIMULATION PAUSED</div>
            <div className="text-xs text-gray-400">Awaiting new directives.</div>
          </>
        )}
      </div>
    </div>
  );
};

export default BattleStatus;
