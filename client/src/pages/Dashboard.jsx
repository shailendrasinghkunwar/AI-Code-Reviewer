import React, { useEffect, useState } from 'react';
import { reviewService } from '../services/reviewService';
import { StatsOverview } from '../components/StatsOverview';
import { ReviewCard } from '../components/ReviewCard';
import { Toast } from '../components/Toast';
import { Search, Filter, RefreshCw, FileText, BarChart3 } from 'lucide-react';

export const Dashboard = () => {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedLang, setSelectedLang] = useState('');
  const [toast, setToast] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [reviewsRes, statsRes] = await Promise.all([
        reviewService.getUserReviews({ search, language: selectedLang }),
        reviewService.getUserStats(),
      ]);

      if (reviewsRes.success) {
        setReviews(reviewsRes.data);
      }
      if (statsRes.success) {
        setStats(statsRes.data);
      }
    } catch (error) {
      console.error('[Dashboard fetch error]', error);
      setToast({ type: 'error', message: 'Failed to load review history.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [selectedLang]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchDashboardData();
  };

  const handleDeleteReview = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review from history?')) return;
    try {
      const res = await reviewService.deleteReview(id);
      if (res.success) {
        setToast({ type: 'success', message: 'Review deleted.' });
        fetchDashboardData();
      }
    } catch (error) {
      setToast({ type: 'error', message: 'Failed to delete review.' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-6">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <div className="surface-card flex flex-col gap-5 rounded-3xl border border-slate-200/80 bg-white/80 p-5 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/75 sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-indigo-500/15 bg-indigo-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-300">
            <BarChart3 className="h-3.5 w-3.5" />
            Your quality pulse
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl">
            Review history
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Explore your review activity and spot the code-quality trends that matter.
          </p>
        </div>

        <button
          onClick={fetchDashboardData}
          className="flex items-center space-x-1.5 self-start rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-indigo-800 dark:hover:text-indigo-300 sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Analytics Overview Cards */}
      <StatsOverview stats={stats} />

      {/* Filters & Search Toolbar */}
      <div className="surface-card flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white/80 p-3 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/75 md:flex-row md:items-center md:justify-between">
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search code, title, or summary..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm font-medium text-slate-800 transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-indigo-500 dark:focus:bg-slate-800"
          />
        </form>

        {/* Language Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-700 transition focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <option value="">All Languages</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="csharp">C#</option>
            <option value="go">Go</option>
            <option value="typescript">TypeScript</option>
          </select>
        </div>
      </div>

      {/* Reviews Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="h-48 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/50 animate-pulse"
            />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="surface-card rounded-2xl border border-dashed border-slate-300 bg-white/50 p-12 text-center backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/50">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500">
            <FileText className="h-7 w-7" />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No reviews found</h3>
          <p className="mt-1 text-sm text-slate-400">Try another search or run your first AI code review.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <ReviewCard key={rev._id} review={rev} onDelete={handleDeleteReview} />
          ))}
        </div>
      )}
    </div>
  );
};
