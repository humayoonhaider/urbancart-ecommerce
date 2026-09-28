import React from 'react';
import { FilterState } from '../types';
import { CATEGORIES } from '../data/categories';
import { useShop } from '../context/ShopContext';
import { RotateCcw, Star, X } from 'lucide-react';

interface FilterPanelProps {
  filters: FilterState;
  onChange: (updated: Partial<FilterState>) => void;
  onReset: () => void;
  totalResults: number;
  isMobileDrawer?: boolean;
  onCloseMobile?: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onChange,
  onReset,
  totalResults,
  isMobileDrawer = false,
  onCloseMobile
}) => {
  const { formatPrice } = useShop();

  const handleCategoryToggle = (catName: string) => {
    const exists = filters.categories.includes(catName);
    const updated = exists
      ? filters.categories.filter(c => c !== catName)
      : [...filters.categories, catName];
    onChange({ categories: updated });
  };

  const handleRatingToggle = (rating: number) => {
    onChange({ minRating: filters.minRating === rating ? 0 : rating });
  };

  return (
    <div className={`flex flex-col gap-6 ${isMobileDrawer ? 'p-6' : ''}`}>
      {/* Header if mobile drawer */}
      {isMobileDrawer && (
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white font-heading">
              Filter Catalog
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">{totalResults} products available</p>
          </div>
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Reset button bar */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
          Filters
        </span>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Categories */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-bold text-neutral-900 dark:text-white font-heading">
          Categories
        </label>
        <div className="flex flex-col gap-2">
          {CATEGORIES.map(cat => {
            const isChecked = filters.categories.includes(cat.name);
            return (
              <label
                key={cat.id}
                className="flex items-center justify-between py-1 text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white cursor-pointer select-none"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCategoryToggle(cat.name)}
                    className="w-4 h-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                  />
                  <span>{cat.name}</span>
                </div>
                <span className="text-xs text-neutral-400 font-mono">({cat.itemCount})</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="flex flex-col gap-3 pt-4 border-t border-neutral-200/80 dark:border-neutral-800">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-neutral-900 dark:text-white font-heading">
            Price Range
          </label>
          <span className="text-xs font-semibold text-neutral-900 dark:text-white">
            Up to {formatPrice(filters.maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min="1500"
          max="30000"
          step="500"
          value={filters.maxPrice}
          onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
          className="w-full accent-blue-600 cursor-pointer"
        />
        <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono">
          <span>{formatPrice(1500)}</span>
          <span>{formatPrice(30000)}</span>
        </div>
      </div>

      {/* Rating */}
      <div className="flex flex-col gap-3 pt-4 border-t border-neutral-200/80 dark:border-neutral-800">
        <label className="text-sm font-bold text-neutral-900 dark:text-white font-heading">
          Customer Rating
        </label>
        <div className="flex flex-col gap-1.5">
          {[4.8, 4.5, 4.0].map(rating => (
            <button
              key={rating}
              type="button"
              onClick={() => handleRatingToggle(rating)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
                filters.minRating === rating
                  ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <div className="flex items-center gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-neutral-300 dark:text-neutral-600'
                    }`}
                  />
                ))}
              </div>
              <span>{rating} & above</span>
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-col gap-3 pt-4 border-t border-neutral-200/80 dark:border-neutral-800">
        <label className="text-sm font-bold text-neutral-900 dark:text-white font-heading">
          Availability & Offers
        </label>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2.5 text-sm text-neutral-700 dark:text-neutral-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) => onChange({ inStockOnly: e.target.checked })}
              className="w-4 h-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
            />
            <span>In Stock Only</span>
          </label>
          <label className="flex items-center gap-2.5 text-sm text-neutral-700 dark:text-neutral-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filters.onSaleOnly}
              onChange={(e) => onChange({ onSaleOnly: e.target.checked })}
              className="w-4 h-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
            />
            <span>On Discount / Sale</span>
          </label>
        </div>
      </div>

      {/* Close button for mobile */}
      {isMobileDrawer && (
        <div className="pt-4 mt-auto">
          <button
            onClick={onCloseMobile}
            className="w-full py-3 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold text-sm shadow-md cursor-pointer"
          >
            Show {totalResults} Results
          </button>
        </div>
      )}
    </div>
  );
};
