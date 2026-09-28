import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { EmptyState } from '../components/EmptyState';
import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';

export const Wishlist: React.FC = () => {
  const { wishlistProducts, addToCart, toggleWishlist, showToast } = useShop();

  const handleMoveAllToCart = () => {
    if (wishlistProducts.length === 0) return;
    wishlistProducts.forEach(product => {
      addToCart(product, 1);
    });
    showToast('Moved to Cart', `Added ${wishlistProducts.length} saved items to your cart.`, 'success');
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          icon={Heart}
          title="Your Wishlist is Empty"
          description="Save products you love and find them here later. Browse our latest arrivals and design picks."
          actionText="Continue Shopping"
          actionHref="/shop"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-neutral-200/80 dark:border-neutral-800 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 block mb-1">
            Saved Essentials
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white font-heading">
            My Wishlist ({wishlistProducts.length} items)
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-neutral-500">
            Items saved in your browser storage for future purchases.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-end">
          <button
            onClick={handleMoveAllToCart}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Move All to Cart</span>
          </button>
        </div>
      </div>

      {/* Grid of Wishlist Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistProducts.map(product => (
          <div key={product.id} className="relative group">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Explore More Products</span>
        </Link>
      </div>
    </div>
  );
};
