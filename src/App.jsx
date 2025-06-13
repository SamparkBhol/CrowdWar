import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import { useCrowdWar } from '@/hooks/useCrowdWar';
import Header from '@/components/game/Header';
import ControlPanel from '@/components/game/ControlPanel';
import BattleArena from '@/components/game/BattleArena';

function App() {
  const {
    selectedTeam,
    strategies,
    battleState,
    aggregatedStrategies,
    actions,
  } = useCrowdWar();

  return (
    <div className="min-h-screen">
      <Toaster />
      <Header round={battleState.round} />
      
      <main className="container mx-auto px-4 pt-28 pb-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <ControlPanel 
            selectedTeam={selectedTeam}
            strategies={strategies}
            battleState={battleState}
            actions={actions}
          />
          <BattleArena
            battleState={battleState}
            aggregatedStrategies={aggregatedStrategies}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
