import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  tag?: string;
  align?: 'left' | 'center' | 'right';
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  tag,
  align = 'left',
  action,
  className = ''
}) => {
  const alignmentClass = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto'
  }[align];

  return (
    <div className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 ${className}`}>
      <div className={`flex flex-col ${alignmentClass} max-w-2xl`}>
        {tag && (
          <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-2">
            {tag}
          </span>
        )}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white font-heading">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <button
          onClick={action.onClick}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group cursor-pointer self-start md:self-end"
        >
          <span>{action.label}</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </button>
      )}
    </div>
  );
};
