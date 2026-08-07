import React from 'react';
import { SAMPLE_CODES } from '../utils/sampleCodes';
import { Sparkles } from 'lucide-react';

export const PresetSelector = ({ onSelectPreset }) => {
  const presets = [
    { key: 'javascript', label: 'JS Security & Bug', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' },
    { key: 'python', label: 'Python Complexity', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' },
    { key: 'java', label: 'Java Resource Leak', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
    { key: 'cpp', label: 'C++ Memory Leak', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20' },
  ];

  return (
    <div className="flex items-center space-x-2 overflow-x-auto py-1">
      <div className="flex items-center space-x-1 text-slate-400 text-xs font-medium whitespace-nowrap mr-1">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>Try Presets:</span>
      </div>
      {presets.map((p) => (
        <button
          key={p.key}
          onClick={() => onSelectPreset(SAMPLE_CODES[p.key], p.key)}
          className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all hover:scale-105 active:scale-95 whitespace-nowrap ${p.color}`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
};
