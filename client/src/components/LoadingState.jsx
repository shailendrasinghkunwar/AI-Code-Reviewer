import React from 'react';
import { Sparkles, BrainCircuit } from 'lucide-react';

export const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 h-full min-h-[400px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-sm">
      <div className="relative flex items-center justify-center mb-6">
        {/* Animated outer ring */}
        <div className="w-20 h-20 rounded-full border-4 border-blue-500/20 border-t-blue-600 animate-spin" />
        <div className="absolute w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 animate-pulse">
          <BrainCircuit className="w-7 h-7" />
        </div>
      </div>

      <div className="flex items-center space-x-2 text-base font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
        <Sparkles className="w-5 h-5 text-blue-500 animate-bounce" />
        <span>Gemini AI is Reviewing Your Code...</span>
      </div>

      <p className="text-xs text-slate-400 text-center max-w-sm mt-2">
        Analyzing syntax errors, security flaws, space/time complexity, best practices, and generating refactored code.
      </p>

      {/* Shimmer Placeholder Lines */}
      <div className="w-full max-w-md mt-8 space-y-3">
        <div className="h-3 rounded bg-slate-200 dark:bg-slate-800 animate-pulse w-3/4 mx-auto" />
        <div className="h-3 rounded bg-slate-200 dark:bg-slate-800 animate-pulse w-1/2 mx-auto" />
        <div className="h-3 rounded bg-slate-200 dark:bg-slate-800 animate-pulse w-5/6 mx-auto" />
      </div>
    </div>
  );
};
