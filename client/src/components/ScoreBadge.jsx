import React from 'react';
import { Award, ShieldAlert, CheckCircle, AlertTriangle } from 'lucide-react';

export const ScoreBadge = ({ score }) => {
  const numScore = Number(score) || 0;

  const getScoreTheme = (val) => {
    if (val >= 8) {
      return {
        bg: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/30 text-emerald-500 dark:text-emerald-400',
        ring: 'border-emerald-500',
        label: 'Excellent',
        icon: <CheckCircle className="w-5 h-5 text-emerald-500" />,
      };
    }
    if (val >= 5) {
      return {
        bg: 'from-amber-500/10 to-orange-500/10 border-amber-500/30 text-amber-500 dark:text-amber-400',
        ring: 'border-amber-500',
        label: 'Needs Work',
        icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
      };
    }
    return {
      bg: 'from-rose-500/10 to-pink-500/10 border-rose-500/30 text-rose-500 dark:text-rose-400',
      ring: 'border-rose-500',
      label: 'Critical Issues',
      icon: <ShieldAlert className="w-5 h-5 text-rose-500" />,
    };
  };

  const theme = getScoreTheme(numScore);

  return (
    <div className={`flex items-center space-x-3 px-4 py-2.5 rounded-2xl border bg-gradient-to-r ${theme.bg} shadow-sm backdrop-blur-md`}>
      <div className="flex items-center justify-center">
        {theme.icon}
      </div>
      <div className="flex flex-col">
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-black tracking-tight">{numScore}</span>
          <span className="text-xs font-semibold opacity-70">/ 10</span>
        </div>
        <span className="text-[11px] font-medium tracking-wide uppercase opacity-90">
          {theme.label}
        </span>
      </div>
    </div>
  );
};
