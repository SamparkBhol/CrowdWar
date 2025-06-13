import React from 'react';
import { motion } from 'framer-motion';
import { TEAMS, TEAM_CONFIG, ICONS } from '@/lib/constants';

const TeamSelector = ({ selectedTeam, strategies, onSelectTeam }) => {
  const { Users } = ICONS;
  return (
    <div className="strategy-card rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Users className="h-5 w-5 mr-3 text-orange-400" />
        Join a Faction
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.values(TEAMS).map(teamId => {
          const config = TEAM_CONFIG[teamId];
          const isSelected = selectedTeam === teamId;
          const TeamIcon = config.icon;
          return (
            <motion.button
              key={teamId}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelectTeam(teamId)}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${config.className} ${
                isSelected 
                  ? `${config.colors.border} ${config.colors.bg} ${config.colors.glow}` 
                  : `${config.colors.border}/30 ${config.colors.hoverBorder}`
              }`}
            >
              <div className="text-center">
                <TeamIcon className={`h-8 w-8 mx-auto mb-2 ${config.colors.primary}`} />
                <div className={`font-bold ${config.colors.primary}`}>{config.name}</div>
                <div className="text-xs text-gray-400">{strategies[teamId].length} Agents</div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default TeamSelector;
