import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'h-8 text-xs',
    md: 'h-10 text-sm',
    lg: 'h-12 text-base'
  }[size];

  const buttonPadding = {
    sm: 'w-7 px-1.5',
    md: 'w-9 px-2.5',
    lg: 'w-11 px-3'
  }[size];

  return (
    <div className={`inline-flex items-center border border-neutral-300 dark:border-neutral-750 rounded-lg overflow-hidden bg-white dark:bg-neutral-800 shadow-xs ${sizeClasses}`}>
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
        className={`h-full flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer ${buttonPadding}`}
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      <span className="min-w-8 text-center font-semibold text-neutral-900 dark:text-white px-2 select-none">
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className={`h-full flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer ${buttonPadding}`}
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
