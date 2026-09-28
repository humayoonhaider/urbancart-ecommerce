import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { FilterState } from '../types';
import { ProductGrid } from '../components/ProductGrid';
import { FilterPanel } from '../components/FilterPanel';
import {
  SlidersHorizontal,
  LayoutGrid,
  Grid3X3,
  List,
  Search,
  X,
  ArrowUpDown
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { formatPrice } = useShop();

  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || '';

  const [filters, setFilters] = useState<FilterState>({
    search: initialSearch,
    categories: initialCategory ? [initialCategory] : [],
    minPrice: 0,
    maxPrice: 30000,
    minRating: 0,
    inStockOnly: false,
    onSaleOnly: false,
    sortBy: 'featured'
  });

  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [columns, setColumns] = useState<3 | 4>(4);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync URL search params with state
  useEffect(() => {
    const q = searchParams.get('search') || '';
    const cat = searchParams.get('category') || '';
    if (q !== filters.search || (cat && !filters.categories.includes(cat))) {
      setFilters(prev => ({
        ...prev,
        search: q,
        categories: cat ? [cat] : prev.categories
      }));
    }
  }, [searchParams]);

  const handleFilterChange = (updated: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      categories: [],
      minPrice: 0,
      maxPrice: 30000,
      minRating: 0,
      inStockOnly: false,
      onSaleOnly: false,
      sortBy: 'featured'
    });
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Search
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchBrand = product.brand.toLowerCase().includes(query);
        const matchCat = product.category.toLowerCase().includes(query);
        const matchTag = product.tags.some(t => t.toLowerCase().includes(query));
        if (!matchName && !matchBrand && !matchCat && !matchTag) return false;
      }

      // Categories
      if (filters.categories.length > 0) {
        if (!filters.categories.includes(product.category)) return false;
      }

      // Price
      if (product.price > filters.maxPrice) return false;

      // Rating
      if (filters.minRating > 0 && product.rating < filters.minRating) return false;

      // In stock
      if (filters.inStockOnly && !product.inStock) return false;

      // On sale
      if (filters.onSaleOnly && (!product.discount || product.discount <= 0)) return false;

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (filters.sortBy === 'price-low') return a.price - b.price;
      if (filters.sortBy === 'price-high') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      // Default: featured
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [filters]);

  const activeFiltersCount =
    (filters.search ? 1 : 0) +
    filters.categories.length +
    (filters.maxPrice < 30000 ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.onSaleOnly ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2 block">
            Catalog Explorer
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
            Shop All Products
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Browse our complete collection of modern essentials curated for functional living.
          </p>
        </div>

        {/* Quick Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleFilterChange({ search: e.target.value })}
            placeholder="Search products by keyword..."
            className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {filters.search && (
            <button
              onClick={() => handleFilterChange({ search: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Control Bar: Active Filter Chips, Sort Dropdown & Layout Toggles */}
      <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Active Chips / Status */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Showing <strong className="text-slate-900 dark:text-white">{filteredProducts.length}</strong> of {PRODUCTS.length} products
          </span>

          {filters.categories.map(cat => (
            <span
              key={cat}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-200/50 dark:border-blue-900/50"
            >
              <span>{cat}</span>
              <button
                onClick={() => handleFilterChange({ categories: filters.categories.filter(c => c !== cat) })}
                className="hover:text-blue-900 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {filters.maxPrice < 30000 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200/50 dark:border-slate-700/50">
              <span>Under {formatPrice(filters.maxPrice)}</span>
              <button onClick={() => handleFilterChange({ maxPrice: 30000 })} className="cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.inStockOnly && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200/50 dark:border-emerald-900/50">
              <span>In Stock</span>
              <button onClick={() => handleFilterChange({ inStockOnly: false })} className="cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {activeFiltersCount > 0 && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline ml-1 cursor-pointer"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Right Controls: Mobile Drawer Trigger, Sort Dropdown, View Toggles */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-xs cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-slate-400 hidden sm:inline" />
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange({ sortBy: e.target.value as FilterState['sortBy'] })}
              className="px-3 py-2 text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="newest">Sort: Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Layout Toggle Buttons (Grid / List) */}
          <div className="hidden sm:flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-1 gap-1">
            <button
              onClick={() => { setLayout('grid'); setColumns(4); }}
              aria-label="4-column grid layout"
              className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                layout === 'grid' && columns === 4
                  ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400'
                  : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="4 Columns"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => { setLayout('grid'); setColumns(3); }}
              aria-label="3-column grid layout"
              className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                layout === 'grid' && columns === 3
                  ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400'
                  : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="3 Columns"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayout('list')}
              aria-label="List view layout"
              className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                layout === 'list'
                  ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400'
                  : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout (Sidebar + Products Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Filter Sidebar (1 Col) */}
        <aside className="hidden lg:block bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs sticky top-28">
          <FilterPanel
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
            totalResults={filteredProducts.length}
          />
        </aside>

        {/* Product Grid Area (3 Cols on lg) */}
        <main className="lg:col-span-3">
          <ProductGrid
            products={filteredProducts}
            layout={layout}
            columns={columns}
            emptyTitle="No items match your criteria"
            emptyDescription="Try clearing your category checkboxes or broadening your price filter."
            onResetFilters={handleResetFilters}
          />
        </main>
      </div>

      {/* Mobile Filter Drawer Modal */}
      {isMobileFilterOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Catalog Filters"
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md lg:hidden flex justify-end"
          onClick={() => setIsMobileFilterOpen(false)}
        >
          <div
            className="w-full max-w-sm h-full bg-white dark:bg-slate-900 overflow-y-auto shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <FilterPanel
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleResetFilters}
              totalResults={filteredProducts.length}
              isMobileDrawer
              onCloseMobile={() => setIsMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
