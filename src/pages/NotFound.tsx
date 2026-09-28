import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center flex flex-col items-center">
      <span className="text-6xl sm:text-8xl font-black font-heading text-neutral-200 dark:text-neutral-800 select-none">
        404
      </span>
      <h1 className="text-2xl sm:text-3xl font-bold font-heading text-neutral-900 dark:text-white mt-4">
        Page Not Found
      </h1>
      <p className="mt-2 text-sm text-neutral-500 max-w-md">
        The page you are looking for might have been moved or does not exist in our demo catalog.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="px-6 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-xs flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/shop"
          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Browse Catalog</span>
        </Link>
      </div>
    </div>
  );
};
