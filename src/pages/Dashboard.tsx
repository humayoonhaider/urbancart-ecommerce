import React from 'react';
import { AnalyticsDashboard } from '../components/AnalyticsDashboard';
import { useShop } from '../context/ShopContext';
import { BarChart3, User, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { userProfile } = useShop();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200/80 dark:border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Telemetry</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white font-heading tracking-tight">
            Customer Analytics Dashboard
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-neutral-500">
            Welcome back, <strong className="text-neutral-900 dark:text-white">{userProfile.name}</strong> • {userProfile.tier}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/profile"
            className="px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            <span>Profile &amp; Settings</span>
          </Link>

          <Link
            to="/shop"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-sm"
          >
            Shop Essentials
          </Link>
        </div>
      </div>

      {/* Analytics Dashboard Component */}
      <AnalyticsDashboard />
    </div>
  );
};
