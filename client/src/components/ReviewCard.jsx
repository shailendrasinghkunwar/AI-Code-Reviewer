import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Trash2, ChevronRight, Bug, Clock, ShieldAlert } from 'lucide-react';
import { ScoreBadge } from './ScoreBadge';

export const ReviewCard = ({ review, onDelete }) => {
  const { _id, title, language, score, summary, bugs = [], security = [], createdAt } = review;
  const formattedDate = new Date(createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="group relative flex flex-col justify-between p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-200">
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              {language ? language.toUpperCase() : 'CODE'}
            </span>
            <span className="flex items-center space-x-1 text-[11px] text-slate-400">
              <Calendar className="w-3 h-3" />
              <span>{formattedDate}</span>
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(_id);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            title="Delete review"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Title & Summary */}
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
          {title || 'Untitled Code Review'}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
          {summary}
        </p>

        {/* Key Indicators */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-1.5 text-xs text-slate-600 dark:text-slate-400">
            <Bug className="w-3.5 h-3.5 text-rose-500" />
            <span>{bugs.length} Bugs</span>
          </div>

          <div className="flex items-center space-x-1.5 text-xs text-slate-600 dark:text-slate-400">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
            <span>{security.length} Security</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <ScoreBadge score={score} />

        <Link
          to={`/review/${_id}`}
          className="flex items-center space-x-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:translate-x-0.5 transition-transform"
        >
          <span>View Details</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
