import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { SafeImage } from '../components/SafeImage';

export const CategoryPage: React.FC = () => {
  const { category: categorySlug } = useParams<{ category: string }>();

  const currentCategory = CATEGORIES.find(c => c.slug.toLowerCase() === categorySlug?.toLowerCase());

  const categoryProducts = useMemo(() => {
    if (!currentCategory) return [];
    return PRODUCTS.filter(p => p.category.toLowerCase() === currentCategory.name.toLowerCase());
  }, [currentCategory]);

  const otherCategories = useMemo(() => {
    return CATEGORIES.filter(c => c.slug !== categorySlug);
  }, [categorySlug]);

  if (!currentCategory) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4 font-heading text-slate-900 dark:text-white">Category not found</h2>
        <p className="text-slate-500 mb-6">The category you are looking for does not exist in our catalog.</p>
        <Link to="/shop" className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold shadow-md">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12 pb-16">
      {/* Category Hero Banner */}
      <div className="relative bg-slate-950 text-white py-16 sm:py-24 overflow-hidden">
        <SafeImage
          src={currentCategory.image}
          alt={currentCategory.name}
          containerClassName="absolute inset-0 w-full h-full"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-medium">{currentCategory.name}</span>
          </nav>

          <span className="inline-block px-3.5 py-1 rounded-full bg-blue-500/30 border border-blue-400/40 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-md">
            {currentCategory.featuredTag}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
            {currentCategory.name} Collection
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            {currentCategory.description}
          </p>
        </div>
      </div>

      {/* Main Content Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Showing {categoryProducts.length} items in <strong className="text-slate-800 dark:text-white">{currentCategory.name}</strong>
            </span>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Collections</span>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoryProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Other Categories Strip */}
        <div className="mt-20 pt-12 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-6">
            Explore Other Categories
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {otherCategories.map(cat => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="group p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all flex flex-col justify-between shadow-xs"
              >
                <SafeImage
                  src={cat.image}
                  alt={cat.name}
                  containerClassName="w-full h-24 rounded-xl mb-3"
                  className="w-full h-24 object-cover rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:scale-105 transition-transform"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {cat.name}
                  </h4>
                  <span className="text-[11px] text-slate-400 font-mono">{cat.itemCount} items</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
