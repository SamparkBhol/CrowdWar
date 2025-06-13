import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { STRATEGY_CONFIG, ICONS } from '@/lib/constants';

const StrategyForm = ({ selectedTeam, onSubmit }) => {
  const [strategy, setStrategy] = useState({ attack: 33, defense: 33, resource: 34 });
  const { Brain } = ICONS;

  const handleSliderChange = (type, value) => {
    const numValue = parseInt(value, 10);
    setStrategy(prev => {
      const currentTotal = prev.attack + prev.defense + prev.resource;
      const otherTypes = Object.keys(prev).filter(key => key !== type);
      const othersTotal = currentTotal - prev[type];
      
      let newStrategy = { ...prev, [type]: numValue };
      let remaining = 100 - numValue;
      
      if (remaining <= 0) {
        otherTypes.forEach(t => newStrategy[t] = 0);
      } else {
        const other1Val = Math.round(remaining * (newStrategy[otherTypes[0]] / othersTotal || 0.5));
        const other2Val = remaining - other1Val;
        newStrategy[otherTypes[0]] = other1Val;
        newStrategy[otherTypes[1]] = other2Val;
      }
      
      const finalTotal = newStrategy.attack + newStrategy.defense + newStrategy.resource;
      if (finalTotal !== 100) {
        newStrategy[otherTypes[0]] += 100 - finalTotal;
      }

      return newStrategy;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(strategy);
    setStrategy({ attack: 33, defense: 33, resource: 34 });
  };

  return (
    <form onSubmit={handleSubmit} className="strategy-card rounded-xl p-6 space-y-4">
      <h3 className="font-semibold flex items-center">
        <Brain className="h-5 w-5 mr-3 text-orange-400" />
        Devise Strategy
      </h3>
      <div className="space-y-4 pt-2">
        {Object.entries(STRATEGY_CONFIG).map(([key, config]) => {
          const Icon = config.icon;
          return (
            <div key={key}>
              <label className={`flex items-center text-sm ${config.color} mb-2 font-medium`}>
                <Icon className="h-4 w-4 mr-2" />
                {config.label}: {strategy[key]}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={strategy[key]}
                onChange={(e) => handleSliderChange(key, e.target.value)}
                className={`w-full slider ${config.sliderClass}`}
              />
            </div>
          );
        })}
      </div>
      <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 !mt-6">
        Transmit to Collective
      </Button>
    </form>
  );
};

export default StrategyForm;
