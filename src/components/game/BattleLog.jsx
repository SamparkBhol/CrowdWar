import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ICONS, TEAMS, TEAM_CONFIG } from '@/lib/constants';

const BattleLog = ({ lastBattleResult }) => {
  const { TrendingUp } = ICONS;
  return (
    <div className="strategy-card rounded-xl p-6 min-h-[168px]">
      <h3 className="font-semibold mb-4 flex items-center">
        <TrendingUp className="h-5 w-5 mr-3 text-orange-400" />
        Battle Log
      </h3>
      <AnimatePresence>
        {lastBattleResult ? (
          <motion.div
            key={lastBattleResult.round}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm space-y-2"
          >
            <div className="flex justify-between">
              <span className="text-red-400">RED: -{lastBattleResult.blueDamage} HP, +{lastBattleResult.redResourceGain} Res</span>
              <span className="text-cyan-400">BLUE: -{lastBattleResult.redDamage} HP, +{lastBattleResult.blueResourceGain} Res</span>
            </div>
            {lastBattleResult.winner ? (
              <div className={`mt-2 text-center font-bold ${TEAM_CONFIG[lastBattleResult.winner].colors.primary}`}>
                Round {lastBattleResult.round}: {TEAM_CONFIG[lastBattleResult.winner].name} was victorious.
              </div>
            ) : (
               <div className="mt-2 text-center font-bold text-gray-400">
                Round {lastBattleResult.round}: Stalemate.
              </div>
            )}
          </motion.div>
        ) : (
          <div className="text-sm text-gray-500 text-center pt-4">Awaiting simulation start...</div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BattleLog;
