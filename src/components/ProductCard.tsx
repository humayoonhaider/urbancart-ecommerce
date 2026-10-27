import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { Badge } from './Badge';
import { SafeImage } from './SafeImage';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, layout = 'grid' }) => {
  const { isInWishlist, toggleWishlist, addToCart, setQuickViewProduct, formatPrice } = useShop();
  const wishlisted = isInWishlist(product.id);

  if (layout === 'list') {
    return (
      <div className="group flex flex-col sm:flex-row items-stretch bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg dark:hover:shadow-blue-950/20">
        {/* Image */}
        <div className="relative w-full sm:w-64 h-60 sm:h-auto shrink-0 bg-slate-100 dark:bg-slate-800/60 overflow-hidden">
          <Link to={`/product/${product.id}`} className="block w-full h-full">
            <SafeImage
              src={product.images[0]}
              alt={product.name}
              containerClassName="w-full h-full"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          </Link>
          {product.discount && (
            <div className="absolute top-3 left-3 z-10">
              <Badge variant="accent">-{product.discount}%</Badge>
            </div>
          )}
          {product.badge && !product.discount && (
            <div className="absolute top-3 left-3 z-10">
              <Badge variant="primary">{product.badge}</Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span className="font-semibold uppercase tracking-wider text-[11px] text-blue-600 dark:text-blue-400">
                {product.brand} • {product.category}
              </span>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/50">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-slate-800 dark:text-amber-300 text-xs">{product.rating}</span>
                <span className="text-slate-400 text-[11px]">({product.reviewsCount})</span>
              </div>
            </div>

            <Link to={`/product/${product.id}`} className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-heading line-clamp-1">
                {product.name}
              </h3>
            </Link>

            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <span className={`text-[11px] font-semibold flex items-center gap-1 mt-0.5 ${
                product.inStock ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                {product.inStock ? 'In Stock (Ready to Dispatch)' : 'Out of Stock'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuickViewProduct(product)}
                aria-label="Quick preview"
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                title="Quick View"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  wishlisted
                    ? 'border-rose-300 bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:border-rose-900 shadow-xs'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current text-rose-600' : ''}`} />
              </button>
              <button
                onClick={() => addToCart(product)}
                disabled={!product.inStock}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-blue-600 text-white dark:text-white text-sm font-semibold hover:bg-blue-600 dark:hover:bg-blue-500 transition-all duration-200 disabled:opacity-40 cursor-pointer shadow-sm hover:shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid layout
  return (
    <div className="group relative flex flex-col bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/90 rounded-2xl overflow-hidden hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl dark:hover:shadow-blue-950/30 [transform-style:preserve-3d] hover:[transform:rotateX(2deg)_rotateY(2deg)]">
      {/* Top Image Container */}
      <div className="relative aspect-square w-full bg-slate-100 dark:bg-slate-800/60 overflow-hidden">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <SafeImage
            src={product.images[0]}
            alt={product.name}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none z-10">
          {product.discount && (
            <Badge variant="accent">
              -{product.discount}%
            </Badge>
          )}
          {product.badge && !product.discount && (
            <Badge variant="primary">
              {product.badge}
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md shadow-md transition-all duration-200 z-10 cursor-pointer ${
            wishlisted
              ? 'bg-white/95 dark:bg-slate-900/95 text-rose-600 scale-105'
              : 'bg-white/85 dark:bg-slate-900/85 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-900 hover:text-rose-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current text-rose-600' : ''}`} />
        </button>

        {/* Quick Action Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
          <button
            onClick={() => setQuickViewProduct(product)}
            className="flex-1 py-2 px-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-900 dark:text-slate-100 rounded-xl text-xs font-bold shadow-md hover:bg-white dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200/70 dark:border-slate-700/70"
          >
            <Eye className="w-3.5 h-3.5 text-blue-500" />
            <span>Quick View</span>
          </button>
          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className="p-2 bg-slate-900 dark:bg-blue-600 text-white dark:text-white rounded-xl shadow-md hover:bg-blue-600 dark:hover:bg-blue-500 transition-all duration-200 disabled:opacity-50 cursor-pointer"
            title="Instant Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Details Container */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
            <span className="font-semibold uppercase tracking-wider text-[10px] text-blue-600 dark:text-blue-400">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-900/40">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-800 dark:text-amber-300 text-[11px]">{product.rating}</span>
            </div>
          </div>

          <Link to={`/product/${product.id}`} className="block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 font-heading line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-baseline justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-heading">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
            {product.category}
          </span>
        </div>
      </div>
    </div>
  );
};
