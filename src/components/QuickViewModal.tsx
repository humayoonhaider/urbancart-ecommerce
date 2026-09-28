import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, Star, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import { QuantitySelector } from './QuantitySelector';
import { Badge } from './Badge';
import { Link } from 'react-router-dom';
import { SafeImage } from './SafeImage';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, isInWishlist, toggleWishlist, formatPrice } = useShop();
  
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!quickViewProduct) return null;

  const currentColor = selectedColor || (quickViewProduct.colors && quickViewProduct.colors[0]?.name);
  const currentSize = selectedSize || (quickViewProduct.sizes && quickViewProduct.sizes[0]);
  const wishlisted = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, currentColor, currentSize);
    setQuickViewProduct(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Quick View Product"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={() => setQuickViewProduct(null)}
    >
      <div
        className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer border border-slate-200/50 dark:border-slate-700/50"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery Side */}
          <div className="p-6 bg-slate-50 dark:bg-slate-950/50 flex flex-col gap-3 justify-center">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
              <SafeImage
                src={quickViewProduct.images[activeImageIndex] || quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                containerClassName="w-full h-full"
                className="w-full h-full object-cover object-center"
              />
              {quickViewProduct.discount && (
                <div className="absolute top-3 left-3 z-10">
                  <Badge variant="accent">-{quickViewProduct.discount}%</Badge>
                </div>
              )}
            </div>

            {quickViewProduct.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-blue-600 ring-2 ring-blue-600/30 scale-105'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <SafeImage src={img} alt="" containerClassName="w-full h-full" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Side */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                <span className="font-semibold uppercase tracking-wider text-[11px] text-blue-600 dark:text-blue-400">
                  {quickViewProduct.category}
                </span>
                <span className="text-slate-400 font-medium">Brand: {quickViewProduct.brand}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-heading">
                {quickViewProduct.name}
              </h2>

              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1 text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-200/50 dark:border-amber-900/40">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="text-xs font-bold text-slate-900 dark:text-amber-300">
                    {quickViewProduct.rating}
                  </span>
                </div>
                <span className="text-xs text-slate-400">({quickViewProduct.reviewsCount} verified reviews)</span>
                <span className="text-slate-300 dark:text-slate-700">|</span>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {quickViewProduct.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
                  {formatPrice(quickViewProduct.price)}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatPrice(quickViewProduct.originalPrice)}
                  </span>
                )}
              </div>

              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Color Selector */}
              {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
                <div className="mt-5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Color: <span className="text-slate-500 dark:text-slate-400 font-normal">{currentColor}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {quickViewProduct.colors.map(col => (
                      <button
                        key={col.name}
                        onClick={() => setSelectedColor(col.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer relative ${
                          currentColor === col.name
                            ? 'border-blue-600 ring-2 ring-blue-600/30 scale-110'
                            : 'border-white dark:border-slate-800 shadow-sm opacity-80 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: col.hex }}
                        title={col.name}
                        aria-label={col.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
                <div className="mt-5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Size: <span className="text-slate-500 dark:text-slate-400 font-normal">{currentSize}</span>
                  </label>
                  <div className="flex items-center gap-2 flex-wrap">
                    {quickViewProduct.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-10 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          currentSize === size
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                            : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector & Action */}
              <div className="mt-6 flex items-center gap-3">
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() => setQuantity(q => q + 1)}
                  onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
                  size="md"
                />

                <button
                  onClick={handleAddToCart}
                  disabled={!quickViewProduct.inStock}
                  className="flex-1 py-3 px-6 rounded-xl bg-slate-900 dark:bg-blue-600 text-white dark:text-white text-sm font-semibold hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors disabled:opacity-40 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                  className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                    wishlisted
                      ? 'border-rose-300 bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:border-rose-900'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  title="Save to Wishlist"
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current text-rose-600' : ''}`} />
                </button>
              </div>
            </div>

            {/* Quick trust notes */}
            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-blue-600" />
                <span>Free shipping above PKR 10k</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Spec</span>
              </div>
              <Link
                to={`/product/${quickViewProduct.id}`}
                onClick={() => setQuickViewProduct(null)}
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                Full Details →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
