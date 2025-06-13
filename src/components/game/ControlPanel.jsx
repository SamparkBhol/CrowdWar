import React from 'react';
import TeamSelector from '@/components/game/TeamSelector';
import StrategyForm from '@/components/game/StrategyForm';
import BattleControls from '@/components/game/BattleControls';
import { motion } from 'framer-motion';

const ControlPanel = ({ selectedTeam, strategies, battleState, actions }) => {
  return (
    <div className="w-full lg:w-1/3 xl:w-1/4 space-y-6">
      <TeamSelector 
        selectedTeam={selectedTeam} 
        strategies={strategies}
        onSelectTeam={actions.handleTeamSelect} 
      />
      
      {selectedTeam && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StrategyForm 
            selectedTeam={selectedTeam}
            onSubmit={actions.handleStrategySubmit} 
          />
        </motion.div>
      )}

      <BattleControls 
        isRunning={battleState.isRunning} 
        onStart={actions.startBattle} 
        onPause={actions.pauseBattle}
        onReset={actions.resetBattle} 
      />
    </div>
  );
};

export default ControlPanel;
