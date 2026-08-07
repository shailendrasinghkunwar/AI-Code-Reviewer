import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home as HomeIcon } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-4">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100">404</h1>
      <p className="text-base font-semibold text-slate-700 dark:text-slate-300 mt-2">Page Not Found</p>
      <p className="text-xs text-slate-400 max-w-sm mt-1 mb-6">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/30 transition-all"
      >
        <HomeIcon className="w-4 h-4" />
        <span>Return to Workspace</span>
      </Link>
    </div>
  );
};
