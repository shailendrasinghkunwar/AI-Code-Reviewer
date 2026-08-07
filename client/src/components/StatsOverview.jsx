import React from 'react';
import { LayoutDashboard, Award, Bug, Code2 } from 'lucide-react';

export const StatsOverview = ({ stats }) => {
  const { totalReviews = 0, averageScore = 0, totalBugsFound = 0, languagesCount = {} } = stats || {};

  const cards = [
    {
      title: 'Total Reviews',
      value: totalReviews,
      icon: LayoutDashboard,
      color: 'from-blue-500/10 to-indigo-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400',
      iconColor: 'text-blue-500',
    },
    {
      title: 'Average Code Score',
      value: `${averageScore} / 10`,
      icon: Award,
      color: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
      iconColor: 'text-emerald-500',
    },
    {
      title: 'Total Bugs Detected',
      value: totalBugsFound,
      icon: Bug,
      color: 'from-rose-500/10 to-pink-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400',
      iconColor: 'text-rose-500',
    },
    {
      title: 'Languages Reviewed',
      value: Object.keys(languagesCount).length,
      icon: Code2,
      color: 'from-purple-500/10 to-indigo-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400',
      iconColor: 'text-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`p-5 rounded-2xl border bg-gradient-to-br ${card.color} shadow-sm backdrop-blur-md flex items-center justify-between`}
          >
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {card.title}
              </span>
              <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100 mt-1">
                {card.value}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/60 dark:bg-slate-900/60 flex items-center justify-center shadow-inner">
              <Icon className={`w-6 h-6 ${card.iconColor}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
