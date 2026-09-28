import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Search, X, TrendingUp, History, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SafeImage } from './SafeImage';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, recentSearches, addRecentSearch, formatPrice } = useShop();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim()
    ? PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 6)
    : [];

  const handleSelectProduct = (productId: string) => {
    addRecentSearch(query || 'Product');
    setIsSearchOpen(false);
    navigate(`/product/${productId}`);
  };

  const handleFullSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    addRecentSearch(searchTerm);
    setIsSearchOpen(false);
    navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search Catalog"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-in fade-in duration-200"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-slate-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-blue-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleFullSearch(query);
            }}
            placeholder="Search products, categories, styles, or brands..."
            className="flex-1 bg-transparent text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs font-semibold px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer border border-slate-200/50 dark:border-slate-700/50"
          >
            ESC
          </button>
        </div>

        {/* Search Content Body */}
        <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto">
          {/* If User has typed something */}
          {query.trim() ? (
            <div>
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                <span>Matching Products ({filteredProducts.length})</span>
                {filteredProducts.length > 0 && (
                  <button
                    onClick={() => handleFullSearch(query)}
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer font-semibold"
                  >
                    <span>View all results</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>

              {filteredProducts.length === 0 ? (
                <div className="py-10 text-center text-slate-500 text-sm">
                  No products matched &ldquo;{query}&rdquo;. Try another keyword or browse our categories.
                </div>
              ) : (
                <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredProducts.map(product => (
                    <button
                      key={product.id}
                      onClick={() => handleSelectProduct(product.id)}
                      className="flex items-center gap-4 py-3 px-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors text-left w-full cursor-pointer group"
                    >
                      <SafeImage
                        src={product.images[0]}
                        alt={product.name}
                        containerClassName="w-14 h-14 rounded-xl shrink-0"
                        className="w-14 h-14 rounded-xl object-cover bg-slate-100 dark:bg-slate-800"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                          <span className="font-semibold uppercase text-blue-600 dark:text-blue-400">{product.category}</span>
                          <span>•</span>
                          <span>{product.brand}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {product.name}
                        </h4>
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-200 mt-0.5 block font-heading">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-transform group-hover:translate-x-1" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {/* Recent searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                    <History className="w-3.5 h-3.5 text-blue-500" />
                    <span>Recent Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleFullSearch(s)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending tags */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
                  <span>Popular Trending Categories</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {['Wireless Headphones', 'Sneakers', 'Table Lamp', 'Crossbody Bag', 'Merino Wool', 'Facial Serum'].map((item) => (
                    <button
                      key={item}
                      onClick={() => handleFullSearch(item)}
                      className="p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 text-left text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer bg-slate-50/50 dark:bg-slate-800/40"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
