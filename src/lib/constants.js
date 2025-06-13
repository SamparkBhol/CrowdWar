import { Swords, Shield, Zap, TrendingUp, Users, Brain, Target, Play, Pause, RotateCcw, Crown, Flame } from 'lucide-react';

export const TEAMS = {
  RED: 'red',
  BLUE: 'blue'
};

export const TEAM_CONFIG = {
  [TEAMS.RED]: {
    name: "Team Red",
    icon: Flame,
    className: "team-red",
    colors: {
      primary: "text-red-400",
      border: "border-red-500",
      bg: "bg-red-500/20",
      hoverBorder: "hover:border-red-500/60",
      glow: "glow-effect",
    }
  },
  [TEAMS.BLUE]: {
    name: "Team Blue",
    icon: Crown,
    className: "team-blue",
    colors: {
      primary: "text-cyan-400",
      border: "border-cyan-500",
      bg: "bg-cyan-500/20",
      hoverBorder: "hover:border-cyan-500/60",
      glow: "glow-effect",
    }
  }
};

export const STRATEGY_CONFIG = {
  attack: {
    label: "Attack",
    icon: Target,
    color: "text-red-400",
    sliderClass: "slider-red",
  },
  defense: {
    label: "Defense",
    icon: Shield,
    color: "text-cyan-400",
    sliderClass: "slider-blue",
  },
  resource: {
    label: "Resource",
    icon: Zap,
    color: "text-yellow-400",
    sliderClass: "slider-yellow",
  }
};

export const ICONS = {
  Swords, Shield, Zap, TrendingUp, Users, Brain, Target, Play, Pause, RotateCcw, Crown, Flame
};
