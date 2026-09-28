import React from 'react';
import { LucideIcon, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = ShoppingBag,
  title,
  description,
  actionText = 'Explore Products',
  actionHref = '/shop',
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 max-w-md mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 dark:text-neutral-500 mb-6 shadow-inner">
        <Icon className="w-8 h-8 stroke-[1.5]" />
      </div>
      <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-heading">
        {title}
      </h3>
      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
        {description}
      </p>
      {actionText && (
        <div className="mt-6">
          {onAction ? (
            <button
              onClick={onAction}
              className="px-6 py-2.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-sm cursor-pointer"
            >
              {actionText}
            </button>
          ) : (
            <Link
              to={actionHref}
              className="inline-block px-6 py-2.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-sm cursor-pointer"
            >
              {actionText}
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
