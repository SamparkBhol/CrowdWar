import React from 'react';
import { Button } from '@/components/ui/button';
import { ICONS } from '@/lib/constants';

const BattleControls = ({ isRunning, onStart, onPause, onReset }) => {
  const { Play, Pause, RotateCcw } = ICONS;
  return (
    <div className="strategy-card rounded-xl p-6">
      <h3 className="font-semibold mb-4 flex items-center">
        <Play className="h-5 w-5 mr-3 text-orange-400" />
        Simulation Controls
      </h3>
      <div className="flex space-x-2">
        {!isRunning ? (
          <Button onClick={onStart} className="flex-1 bg-green-600 hover:bg-green-700">
            <Play className="h-4 w-4 mr-2" /> Start
          </Button>
        ) : (
          <Button onClick={onPause} className="flex-1 bg-yellow-500 hover:bg-yellow-600">
            <Pause className="h-4 w-4 mr-2" /> Pause
          </Button>
        )}
        <Button onClick={onReset} variant="outline" className="flex-1">
          <RotateCcw className="h-4 w-4 mr-2" /> Reset
        </Button>
      </div>
    </div>
  );
};

export default BattleControls;
