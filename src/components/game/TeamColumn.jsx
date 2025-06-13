import React from 'react';
import { motion } from 'framer-motion';
import { TEAM_CONFIG, STRATEGY_CONFIG, ICONS } from '@/lib/constants';

const TeamColumn = ({ teamId, score, resources, strategy }) => {
  const config = TEAM_CONFIG[teamId];
  const { Brain } = ICONS;
  const TeamIcon = config.icon;

  return (
    <div className={`space-y-6 ${config.className}`}>
      {/* Score Card */}
      <div className={`strategy-card rounded-xl p-6 text-center ${config.colors.glow}`}>
        <TeamIcon className={`h-12 w-12 mx-auto mb-3 ${config.colors.primary}`} />
        <div className={`text-4xl font-bold mb-1 ${config.colors.primary}`}>{score}</div>
        <div className="font-semibold text-gray-300">{config.name} Victories</div>
        <div className="mt-4">
          <div className="text-sm text-gray-400 mb-2">Resources</div>
          <div className="resource-bar-bg h-3 rounded-full overflow-hidden">
            <motion.div
              className="h-full resource-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${(resources / 200) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="text-xs text-gray-400 mt-1">{Math.round(resources)} / 200</div>
        </div>
      </div>

      {/* Aggregated Strategy Card */}
      <div className="strategy-card rounded-xl p-6">
        <h3 className={`font-semibold mb-4 flex items-center ${config.colors.primary}`}>
          <Brain className="h-5 w-5 mr-3" />
          Collective Strategy
        </h3>
        <div className="space-y-3">
          {Object.entries(strategy).map(([key, value]) => {
            const stratConfig = STRATEGY_CONFIG[key];
            const StratIcon = stratConfig.icon;
            return (
              <div key={key} className="flex justify-between items-center text-sm">
                <span className="flex items-center text-gray-300">
                  <StratIcon className={`h-4 w-4 mr-2 ${stratConfig.color}`} />
                  {stratConfig.label}
                </span>
                <span className="font-bold text-white">{value}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeamColumn;
