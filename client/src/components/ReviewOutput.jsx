import React, { useState } from 'react';
import { ScoreBadge } from './ScoreBadge';
import {
  Bug,
  ShieldAlert,
  Zap,
  CheckCircle,
  Clock,
  HardDrive,
  Copy,
  Download,
  Check,
  Code2,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { formatReviewAsMarkdown, downloadFile } from '../utils/exportHelpers';

export const ReviewOutput = ({ review, onCopyNotice }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);

  if (!review) return null;

  const {
    title,
    language,
    score,
    summary,
    timeComplexity,
    spaceComplexity,
    bugs = [],
    codeQuality = [],
    performance = [],
    security = [],
    bestPractices = [],
    readability = [],
    improvedCode = '',
  } = review;

  const handleCopyReport = () => {
    const markdown = formatReviewAsMarkdown(review);
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    if (onCopyNotice) onCopyNotice('Review report copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadReport = () => {
    const markdown = formatReviewAsMarkdown(review);
    const filename = `${(title || 'code_review').toLowerCase().replace(/\s+/g, '_')}_review.md`;
    downloadFile(markdown, filename);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Sparkles, count: null },
    { id: 'bugs', label: 'Bugs & Errors', icon: Bug, count: bugs.length, badgeColor: 'bg-rose-500/10 text-rose-500' },
    { id: 'security', label: 'Security', icon: ShieldAlert, count: security.length, badgeColor: 'bg-amber-500/10 text-amber-500' },
    { id: 'performance', label: 'Performance', icon: Zap, count: performance.length, badgeColor: 'bg-blue-500/10 text-blue-500' },
    { id: 'quality', label: 'Quality & Best Practices', icon: CheckCircle, count: codeQuality.length + bestPractices.length, badgeColor: 'bg-emerald-500/10 text-emerald-500' },
    { id: 'refactored', label: 'Refactored Code', icon: Code2, count: improvedCode ? 'AI Fix' : null, badgeColor: 'bg-purple-500/10 text-purple-500' },
  ];

  return (
    <div className="flex flex-col h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden transition-colors duration-200">
      {/* Review Header Banner */}
      <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                {language ? language.toUpperCase() : 'CODE'}
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 truncate max-w-xs sm:max-w-md">
                {title || 'AI Review Analysis'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              {summary}
            </p>
          </div>

          <div className="flex items-center space-x-3 self-start sm:self-auto">
            <ScoreBadge score={score} />

            {/* Action Buttons */}
            <div className="flex items-center space-x-1.5 border-l border-slate-200 dark:border-slate-800 pl-3">
              <button
                onClick={handleCopyReport}
                className="flex items-center space-x-1 px-3 py-2 text-xs font-semibold rounded-lg text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Copy markdown report"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleDownloadReport}
                className="flex items-center space-x-1 px-3 py-2 text-xs font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-600/30 transition-all"
                title="Download report (.md)"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Big-O Complexity Quick Cards */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="flex items-center space-x-2.5 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-800/40">
            <Clock className="w-4 h-4 text-indigo-500" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-semibold text-slate-400">Time Complexity</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-mono">
                {timeComplexity}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-800/40">
            <HardDrive className="w-4 h-4 text-purple-500" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-semibold text-slate-400">Space Complexity</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-mono">
                {spaceComplexity}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center overflow-x-auto border-b border-slate-200 dark:border-slate-800 px-4 bg-slate-50/30 dark:bg-slate-900/30 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
                isActive
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={`px-1.5 py-0.5 text-[10px] rounded-full font-bold ${tab.badgeColor || 'bg-slate-200 dark:bg-slate-800'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content Panel */}
      <div className="flex-1 p-5 overflow-y-auto max-h-[500px]">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-blue-500" />
                <span>Executive Summary</span>
              </h3>
              <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                {summary}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center space-x-1.5">
                    <Bug className="w-4 h-4" />
                    <span>Bugs Found</span>
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500">
                    {bugs.length}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {bugs.length > 0
                    ? `Detected ${bugs.length} potential issue(s) needing attention.`
                    : 'No critical syntax or logic bugs detected.'}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center space-x-1.5">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Security Notes</span>
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500">
                    {security.length}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {security.length > 0
                    ? `${security.length} security advisory suggestion(s) provided.`
                    : 'No severe security vulnerabilities identified.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* BUGS TAB */}
        {activeTab === 'bugs' && (
          <div className="space-y-3">
            {bugs.length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                <CheckCircle className="w-10 h-10 mx-auto text-emerald-500 mb-2" />
                <p className="text-sm font-semibold">No Bugs or Syntax Errors Detected!</p>
                <p className="text-xs text-slate-500 mt-1">Your code passed static analysis checks without critical bugs.</p>
              </div>
            ) : (
              bugs.map((bug, idx) => {
                const severityColors = {
                  Critical: 'border-rose-500/40 bg-rose-500/10 text-rose-500',
                  High: 'border-orange-500/40 bg-orange-500/10 text-orange-500',
                  Medium: 'border-amber-500/40 bg-amber-500/10 text-amber-500',
                  Low: 'border-blue-500/40 bg-blue-500/10 text-blue-500',
                };
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
                        <span>Line {bug.line || 'N/A'}</span>
                      </span>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${severityColors[bug.severity] || severityColors.Medium}`}>
                        {bug.severity || 'Medium'} Severity
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300">
                      {bug.description}
                    </p>
                    {bug.fix && (
                      <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300">
                        <span className="font-bold">Fix: </span>
                        {bug.fix}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* SECURITY TAB */}
        {activeTab === 'security' && (
          <div className="space-y-3">
            {security.length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                <CheckCircle className="w-10 h-10 mx-auto text-emerald-500 mb-2" />
                <p className="text-sm font-semibold">No Security Vulnerabilities Detected!</p>
              </div>
            ) : (
              security.map((sec, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-3 p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/5 text-xs text-amber-900 dark:text-amber-200"
                >
                  <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{sec}</span>
                </div>
              ))
            )}
          </div>
        )}

        {/* PERFORMANCE TAB */}
        {activeTab === 'performance' && (
          <div className="space-y-3">
            {performance.length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                <Zap className="w-10 h-10 mx-auto text-blue-500 mb-2" />
                <p className="text-sm font-semibold">Performance Looks Optimal!</p>
              </div>
            ) : (
              performance.map((perf, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-3 p-3.5 rounded-xl border border-blue-500/20 bg-blue-500/5 text-xs text-blue-900 dark:text-blue-200"
                >
                  <Zap className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <span>{perf}</span>
                </div>
              ))
            )}
          </div>
        )}

        {/* QUALITY TAB */}
        {activeTab === 'quality' && (
          <div className="space-y-4">
            {codeQuality.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Code Quality & Architecture</h4>
                <div className="space-y-2">
                  {codeQuality.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-xs">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-slate-700 dark:text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {bestPractices.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Language Best Practices</h4>
                <div className="space-y-2">
                  {bestPractices.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-xs">
                      <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span className="text-slate-700 dark:text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* REFACTORED CODE TAB */}
        {activeTab === 'refactored' && (
          <div className="space-y-3">
            {improvedCode ? (
              <div className="relative rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 p-4 font-mono text-xs text-slate-200 overflow-x-auto">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                  <span className="text-[11px] font-semibold text-slate-400">Refactored & Optimized Code ({language})</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(improvedCode);
                      if (onCopyNotice) onCopyNotice('Refactored code copied!');
                    }}
                    className="flex items-center space-x-1 px-2.5 py-1 text-[11px] rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </button>
                </div>
                <pre className="leading-relaxed whitespace-pre-wrap">{improvedCode}</pre>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400">
                <p className="text-sm font-semibold">No refactored code suggestion generated.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
