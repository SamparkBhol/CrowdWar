import React from 'react';
import TeamColumn from '@/components/game/TeamColumn';
import BattleLog from '@/components/game/BattleLog';
import BattleStatus from '@/components/game/BattleStatus';
import VisualEffects from '@/components/game/VisualEffects';
import { TEAMS } from '@/lib/constants';

const BattleArena = ({ battleState, aggregatedStrategies }) => {
  return (
    <div className="w-full lg:w-2/3 xl:w-3/4 flex flex-col space-y-6">
      <div className="relative flex-grow grid grid-cols-2 gap-6 items-start">
        <TeamColumn
          teamId={TEAMS.RED}
          score={battleState.scores[TEAMS.RED]}
          resources={battleState.resources[TEAMS.RED]}
          strategy={aggregatedStrategies[TEAMS.RED]}
        />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-5xl font-black text-gray-700 opacity-50">VS</div>
        </div>

        <TeamColumn
          teamId={TEAMS.BLUE}
          score={battleState.scores[TEAMS.BLUE]}
          resources={battleState.resources[TEAMS.BLUE]}
          strategy={aggregatedStrategies[TEAMS.BLUE]}
        />
        
        <VisualEffects battleState={battleState} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BattleLog lastBattleResult={battleState.lastBattleResult} />
        <BattleStatus isRunning={battleState.isRunning} />
      </div>
    </div>
  );
};

export default BattleArena;
