import React, { useState } from 'react';
import { MonacoEditor } from '../components/MonacoEditor';
import { ReviewOutput } from '../components/ReviewOutput';
import { LoadingState } from '../components/LoadingState';
import { FileUploader } from '../components/FileUploader';
import { PresetSelector } from '../components/PresetSelector';
import { Toast } from '../components/Toast';
import { reviewService } from '../services/reviewService';
import { Sparkles, Code2, ShieldCheck, Wand2, ArrowUpRight } from 'lucide-react';
import { SAMPLE_CODES } from '../utils/sampleCodes';

export const Home = () => {
  const [code, setCode] = useState(SAMPLE_CODES.javascript);
  const [language, setLanguage] = useState('javascript');
  const [title, setTitle] = useState('My JavaScript Review');
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const handleAnalyze = async () => {
    if (!code || !code.trim()) {
      setToast({ type: 'error', message: 'Please enter or paste code before analyzing.' });
      return;
    }

    setLoading(true);
    setReview(null);

    try {
      const res = await reviewService.analyzeCode({
        code,
        language,
        title: title || `${language.toUpperCase()} Code Review`,
      });

      if (res.success) {
        setReview(res.data);
        setToast({ type: 'success', message: 'AI Code Review completed successfully!' });
      } else {
        setToast({ type: 'error', message: res.message || 'Failed to complete review.' });
      }
    } catch (error) {
      console.error('[Analyze error]', error);
      setToast({
        type: 'error',
        message: error.response?.data?.message || 'An error occurred while connecting to Gemini AI.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePresetSelect = (presetCode, lang) => {
    setCode(presetCode);
    setLanguage(lang);
    setTitle(`${lang.toUpperCase()} Sample Analysis`);
    setReview(null);
    setToast({ type: 'info', message: `Loaded ${lang.toUpperCase()} preset snippet.` });
  };

  const handleFileSelected = ({ content, language: fileLang, fileName }) => {
    setCode(content);
    setLanguage(fileLang);
    setTitle(fileName || 'Uploaded Code File');
    setReview(null);
    setToast({ type: 'success', message: `Loaded file ${fileName}` });
  };

  const handleReset = () => {
    setCode('');
    setTitle('');
    setReview(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-6">
      {/* Toast feedback */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* File Upload Modal */}
      <FileUploader
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onFileSelect={handleFileSelected}
      />

      {/* Workspace introduction and controls */}
      <div className="surface-card relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-5 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/75 sm:p-7">
        <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="relative flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-500/15 bg-indigo-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-300">
              <Wand2 className="h-3.5 w-3.5" />
              AI-powered workspace
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl">
              Turn every pull request into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-violet-400">stronger codebase.</span>
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Drop in a file or paste a snippet to get a focused review of bugs, security, performance, and maintainability.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-500" /> Structured findings</span>
            <span className="hidden sm:flex items-center gap-1.5"><ArrowUpRight className="h-4 w-4 text-blue-500" /> Export-ready report</span>
          </div>
        </div>

        <div className="relative mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3 dark:border-slate-700/80 dark:bg-slate-950/30 lg:flex-row lg:items-center">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
            <label className="flex min-w-0 flex-1 items-center gap-3 rounded-xl bg-white px-3 py-2.5 shadow-sm ring-1 ring-slate-200/80 transition focus-within:ring-2 focus-within:ring-indigo-500 dark:bg-slate-900 dark:ring-slate-700">
              <span className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-slate-400">Review name</span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Authentication handler"
                className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:font-normal placeholder:text-slate-400 dark:text-slate-200"
              />
            </label>
            <PresetSelector onSelectPreset={handlePresetSelect} />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Sparkles className={`h-4 w-4 text-amber-200 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Analyzing code…' : 'Run AI review'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid Layout: Editor on Left, AI Output on Right */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:min-h-[620px]">
        {/* Code Editor Panel */}
        <div className="flex flex-col">
          <MonacoEditor
            code={code}
            onChange={setCode}
            language={language}
            onLanguageChange={setLanguage}
            onOpenUpload={() => setIsUploadOpen(true)}
            onReset={handleReset}
          />
        </div>

        {/* AI Output Panel */}
        <div className="flex flex-col">
          {loading ? (
            <LoadingState />
          ) : review ? (
            <ReviewOutput
              review={review}
              onCopyNotice={(msg) => setToast({ type: 'success', message: msg })}
            />
          ) : (
            <div className="surface-card flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/50 p-8 text-center backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/50">
              <div className="animate-float mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/15 to-indigo-500/15 text-blue-600 ring-1 ring-blue-500/10 dark:text-blue-400">
                <Code2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                Your review will appear here
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                Paste code, upload a file, or choose a preset. Then run a review to uncover practical improvements.
              </p>
              <div className="mt-5 flex gap-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                <span className="rounded-full bg-slate-100 px-3 py-1.5 dark:bg-slate-800">Bug detection</span>
                <span className="rounded-full bg-slate-100 px-3 py-1.5 dark:bg-slate-800">Security checks</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
