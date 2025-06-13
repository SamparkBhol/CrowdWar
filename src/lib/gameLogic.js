import { TEAMS } from '@/lib/constants';

export const aggregateStrategies = (strategies) => {
  const newAggregated = {};
  
  Object.values(TEAMS).forEach(team => {
    const teamStrategies = strategies[team];
    
    if (teamStrategies.length === 0) {
      newAggregated[team] = { attack: 33, defense: 33, resource: 34 };
    } else {
      const totals = teamStrategies.reduce(
        (acc, strategy) => ({
          attack: acc.attack + strategy.attack,
          defense: acc.defense + strategy.defense,
          resource: acc.resource + strategy.resource
        }),
        { attack: 0, defense: 0, resource: 0 }
      );
      
      const count = teamStrategies.length;
      const attack = Math.round(totals.attack / count);
      const defense = Math.round(totals.defense / count);
      const resource = 100 - attack - defense;

      newAggregated[team] = { attack, defense, resource };
    }
  });
  
  return newAggregated;
};

export const runBattleRound = (currentBattleState, aggregatedStrategies) => {
  const redStrategy = aggregatedStrategies[TEAMS.RED];
  const blueStrategy = aggregatedStrategies[TEAMS.BLUE];

  const redAttackPower = redStrategy.attack * (currentBattleState.resources[TEAMS.RED] / 100);
  const blueAttackPower = blueStrategy.attack * (currentBattleState.resources[TEAMS.BLUE] / 100);
  
  const redDefensePower = redStrategy.defense;
  const blueDefensePower = blueStrategy.defense;

  const redDamage = Math.max(0, redAttackPower - (blueDefensePower * 0.75));
  const blueDamage = Math.max(0, blueAttackPower - (redDefensePower * 0.75));

  const redResourceGain = redStrategy.resource * 0.35;
  const blueResourceGain = blueStrategy.resource * 0.35;

  const newResources = {
    [TEAMS.RED]: Math.max(0, Math.min(200, currentBattleState.resources[TEAMS.RED] - blueDamage + redResourceGain)),
    [TEAMS.BLUE]: Math.max(0, Math.min(200, currentBattleState.resources[TEAMS.BLUE] - redDamage + blueResourceGain))
  };

  const redScoreDelta = (redDamage * 0.6) + (redResourceGain * 0.4);
  const blueScoreDelta = (blueDamage * 0.6) + (blueResourceGain * 0.4);

  let roundWinner = null;
  if (redScoreDelta > blueScoreDelta) {
    roundWinner = TEAMS.RED;
  } else if (blueScoreDelta > redScoreDelta) {
    roundWinner = TEAMS.BLUE;
  }

  const newScores = { ...currentBattleState.scores };
  if (roundWinner) {
    newScores[roundWinner] += 1;
  }

  const battleResult = {
    round: currentBattleState.round + 1,
    redDamage: Math.round(redDamage),
    blueDamage: Math.round(blueDamage),
    redResourceGain: Math.round(redResourceGain),
    blueResourceGain: Math.round(blueResourceGain),
    winner: roundWinner
  };

  return {
    round: currentBattleState.round + 1,
    scores: newScores,
    resources: newResources,
    lastBattleResult: battleResult,
    isRunning: currentBattleState.isRunning
  };
};
