import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { reviewService } from '../services/reviewService';
import { ReviewOutput } from '../components/ReviewOutput';
import { Toast } from '../components/Toast';
import { ArrowLeft, Trash2, Calendar, FileCode } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { useTheme } from '../context/ThemeContext';

export const ReviewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await reviewService.getReviewById(id);
        if (res.success) {
          setReview(res.data);
        }
      } catch (error) {
        console.error('[Fetch review details failed]', error);
        setToast({ type: 'error', message: 'Failed to load review details.' });
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this code review?')) return;
    try {
      const res = await reviewService.deleteReview(id);
      if (res.success) {
        navigate('/dashboard');
      }
    } catch (error) {
      setToast({ type: 'error', message: 'Failed to delete review.' });
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="h-96 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
      </div>
    );
  }

  if (!review) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Review Not Found</h2>
        <Link to="/dashboard" className="text-blue-500 hover:underline text-sm mt-2 inline-block">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          to="/dashboard"
          className="flex items-center space-x-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to History</span>
        </Link>

        <button
          onClick={handleDelete}
          className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 transition-colors self-start sm:self-auto"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete Record</span>
        </button>
      </div>

      {/* Main Grid: Original Code on Left, AI Analysis on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[600px]">
        {/* Original Submitted Code Reader */}
        <div className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70">
            <div className="flex items-center space-x-2">
              <FileCode className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Submitted Code ({review.language})
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              {new Date(review.createdAt).toLocaleString()}
            </span>
          </div>

          <div className="relative flex-1 min-h-[400px]">
            <Editor
              height="100%"
              language={review.language}
              value={review.code}
              theme={theme === 'dark' ? 'vs-dark' : 'light'}
              options={{
                readOnly: true,
                fontSize: 14,
                fontFamily: "'Fira Code', 'JetBrains Mono', Consolas, monospace",
                minimap: { enabled: false },
                wordWrap: 'on',
              }}
            />
          </div>
        </div>

        {/* AI Review Output Component */}
        <div className="flex flex-col">
          <ReviewOutput
            review={review}
            onCopyNotice={(msg) => setToast({ type: 'success', message: msg })}
          />
        </div>
      </div>
    </div>
  );
};
