import { useState, useEffect, useCallback, useMemo } from 'react';
import { TEAMS } from '@/lib/constants';
import { aggregateStrategies, runBattleRound } from '@/lib/gameLogic';
import { useToast } from '@/components/ui/use-toast';

const getInitialState = (key, defaultValue) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading localStorage key “${key}”:`, error);
    return defaultValue;
  }
};

const usePersistentState = (key, defaultValue) => {
  const [state, setState] = useState(() => getInitialState(key, defaultValue));
  
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  }, [key, state]);

  return [state, setState];
};


export const useCrowdWar = () => {
  const { toast } = useToast();
  const [selectedTeam, setSelectedTeam] = usePersistentState('crowdwar-selected-team', null);
  const [strategies, setStrategies] = usePersistentState('crowdwar-strategies', { [TEAMS.RED]: [], [TEAMS.BLUE]: [] });
  const [battleState, setBattleState] = usePersistentState('crowdwar-battle-state', {
    isRunning: false,
    round: 0,
    scores: { [TEAMS.RED]: 0, [TEAMS.BLUE]: 0 },
    resources: { [TEAMS.RED]: 100, [TEAMS.BLUE]: 100 },
    lastBattleResult: null,
  });

  const aggregatedStrategies = useMemo(() => aggregateStrategies(strategies), [strategies]);

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
    toast({
      title: `Team ${team.charAt(0).toUpperCase() + team.slice(1)} Joined!`,
      description: `You are now contributing to their collective intelligence.`,
    });
  };

  const handleStrategySubmit = (strategyInput) => {
    if (!selectedTeam) {
      toast({ title: "No Team Selected", description: "Choose a side before devising a strategy.", variant: "destructive" });
      return;
    }
    const total = Object.values(strategyInput).reduce((sum, val) => sum + val, 0);
    if (total !== 100) {
      toast({ title: "Invalid Allocation", description: "Strategy points must sum to 100.", variant: "destructive" });
      return;
    }
    const newStrategy = { id: Date.now(), ...strategyInput };
    setStrategies(prev => ({ ...prev, [selectedTeam]: [...prev[selectedTeam], newStrategy] }));
    toast({ title: "Strategy Transmitted", description: `Your plan has been integrated into the hive mind.` });
  };
  
  const tick = useCallback(() => {
    setBattleState(prev => runBattleRound(prev, aggregatedStrategies));
  }, [aggregatedStrategies, setBattleState]);

  useEffect(() => {
    if (!battleState.isRunning) return;
    const timer = setInterval(tick, 2000);
    return () => clearInterval(timer);
  }, [battleState.isRunning, tick]);

  const startBattle = () => {
    setBattleState(prev => ({ ...prev, isRunning: true }));
    toast({ title: "Simulation Engaged", description: "The agents are now active." });
  };
  
  const pauseBattle = () => {
    setBattleState(prev => ({ ...prev, isRunning: false }));
    toast({ title: "Simulation Paused", description: "The agents are holding." });
  };

  const resetBattle = () => {
    setBattleState({
      isRunning: false,
      round: 0,
      scores: { [TEAMS.RED]: 0, [TEAMS.BLUE]: 0 },
      resources: { [TEAMS.RED]: 100, [TEAMS.BLUE]: 100 },
      lastBattleResult: null
    });
    setStrategies({ [TEAMS.RED]: [], [TEAMS.BLUE]: [] });
    setSelectedTeam(null);
    localStorage.removeItem('crowdwar-selected-team');
    toast({ title: "Simulation Reset", description: "Ready for a new conflict." });
  };

  return {
    selectedTeam,
    strategies,
    battleState,
    aggregatedStrategies,
    actions: {
      handleTeamSelect,
      handleStrategySubmit,
      startBattle,
      pauseBattle,
      resetBattle,
    }
  };
};
