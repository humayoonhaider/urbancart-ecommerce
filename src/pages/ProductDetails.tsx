import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';
import { ProductGallery } from '../components/ProductGallery';
import { QuantitySelector } from '../components/QuantitySelector';
import { ProductCard } from '../components/ProductCard';
import { Badge } from '../components/Badge';
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Share2,
  MessageSquarePlus,
  X
} from 'lucide-react';
import { Review } from '../types';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    addToCart,
    isInWishlist,
    toggleWishlist,
    formatPrice,
    showToast,
    trackProductView
  } = useShop();

  const product = PRODUCTS.find(p => p.id === id || p.slug === id);

  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<'specs' | 'shipping' | 'care' | null>('specs');

  // Reviews demo state
  const [localReviews, setLocalReviews] = useState<Review[]>([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  useEffect(() => {
    if (product) {
      trackProductView(product.id);
      setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0].name : '');
      setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : '');
      setQuantity(1);
      setLocalReviews(product.reviews || []);
      window.scrollTo(0, 0);
    }
  }, [id, product]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
          Product Not Found
        </h2>
        <p className="mt-2 text-sm text-slate-500 mb-6">
          The requested product item does not exist or has been removed.
        </p>
        <Link
          to="/shop"
          className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 shadow-md"
        >
          Back to Shop Catalog
        </Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied', 'Product link copied to clipboard.', 'success');
    } else {
      showToast('Share', window.location.href, 'info');
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) {
      showToast('Incomplete Form', 'Please fill in your name and comment.', 'warning');
      return;
    }

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: reviewName,
      rating: reviewRating,
      date: new Date().toISOString().split('T')[0],
      comment: reviewComment,
      verified: true
    };

    setLocalReviews(prev => [newRev, ...prev]);
    setIsReviewModalOpen(false);
    setReviewName('');
    setReviewComment('');
    showToast('Review Submitted', 'Thank you for your demo review!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-16">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
        <Link to="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/shop" className="hover:text-slate-900 dark:hover:text-white transition-colors">Shop</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/category/${product.category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-slate-900 dark:hover:text-white transition-colors">
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 dark:text-white font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left Column: Gallery */}
        <div className="sticky top-28">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Right Column: Information & Actions */}
        <div className="flex flex-col gap-6">
          {/* Brand & Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">
                {product.brand}
              </span>
              <span>•</span>
              <Link
                to={`/category/${product.category.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:underline"
              >
                {product.category}
              </Link>
            </div>

            <div className="flex items-center gap-2">
              {product.discount && <Badge variant="accent">-{product.discount}% OFF</Badge>}
              {product.badge && !product.discount && <Badge variant="primary">{product.badge}</Badge>}
              <button
                onClick={handleShare}
                aria-label="Share product"
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Share link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Product Title */}
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight leading-tight">
            {product.name}
          </h1>

          {/* Rating Summary Bar */}
          <div className="flex items-center gap-4 py-2 border-y border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center gap-1.5 text-amber-400">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300 dark:text-slate-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-900 dark:text-white">{product.rating}</span>
            </div>
            <span className="text-xs text-slate-400">({product.reviewsCount + localReviews.length - (product.reviews?.length || 0)} verified ratings)</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{product.inStock ? `In Stock (${product.stockCount} units available)` : 'Out of Stock'}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-heading">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-slate-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {product.discount && (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                You save {formatPrice(product.originalPrice! - product.price)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {product.detailedDescription || product.description}
          </p>

          {/* Features bullet list */}
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2.5">
              Key Highlights
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
              {product.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Select Color: <strong className="text-slate-900 dark:text-white capitalize">{selectedColor}</strong>
                </span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map(col => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColor(col.name)}
                    className={`w-9 h-9 rounded-full border-2 transition-all cursor-pointer relative flex items-center justify-center ${
                      selectedColor === col.name
                        ? 'border-blue-600 ring-2 ring-blue-600/30 scale-110'
                        : 'border-white dark:border-slate-700 shadow-sm opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                    aria-label={col.name}
                  >
                    {selectedColor === col.name && (
                      <span className={`w-2 h-2 rounded-full ${col.hex === '#FFFFFF' ? 'bg-black' : 'bg-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Select Size: <strong className="text-slate-900 dark:text-white">{selectedSize}</strong>
                </span>
                <span className="text-slate-400">Standard Fit Guide</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-12 py-2.5 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selectedSize === size
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

          {/* Quantity & CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => setQuantity(q => q + 1)}
              onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
              size="lg"
            />

            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-slate-900 dark:bg-blue-600 text-white dark:text-white text-sm font-bold hover:bg-blue-600 dark:hover:bg-blue-500 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={!product.inStock}
              className="py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
            >
              <span>Buy Now</span>
            </button>

            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              className={`p-3.5 rounded-2xl border transition-colors cursor-pointer flex items-center justify-center ${
                wishlisted
                  ? 'border-rose-300 bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:border-rose-900'
                  : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Save to Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current text-rose-600' : ''}`} />
            </button>
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-600" />
              <span>Free Delivery &gt; 10k PKR</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Demo Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-purple-600" />
              <span>30-Day Easy Returns</span>
            </div>
          </div>

          {/* Collapsible Accordions */}
          <div className="flex flex-col divide-y divide-slate-200 dark:divide-slate-800 border-y border-slate-200 dark:border-slate-800 mt-4">
            {/* Accordion 1: Specifications */}
            <div>
              <button
                onClick={() => setOpenAccordion(openAccordion === 'specs' ? null : 'specs')}
                className="w-full py-4 flex items-center justify-between text-left text-sm font-bold text-slate-900 dark:text-white font-heading cursor-pointer"
              >
                <span>Product Specifications</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'specs' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'specs' && (
                <div className="pb-4 text-xs text-slate-600 dark:text-slate-400 space-y-2 animate-in fade-in duration-150">
                  {product.specs ? (
                    Object.entries(product.specs).map(([key, val]) => (
                      <div key={key} className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/60">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{key}</span>
                        <span>{val}</span>
                      </div>
                    ))
                  ) : (
                    <p>Engineered to precision standards using verified sustainable methods.</p>
                  )}
                </div>
              )}
            </div>

            {/* Accordion 2: Shipping */}
            <div>
              <button
                onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
                className="w-full py-4 flex items-center justify-between text-left text-sm font-bold text-slate-900 dark:text-white font-heading cursor-pointer"
              >
                <span>Shipping &amp; Demo Delivery Policy</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'shipping' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'shipping' && (
                <div className="pb-4 text-xs text-slate-600 dark:text-slate-400 space-y-2 animate-in fade-in duration-150 leading-relaxed">
                  <p>• Standard Demo Shipping: 3-5 business days (PKR 250, free on orders over PKR 10,000).</p>
                  <p>• Express Demo Shipping: 1-2 business days (PKR 500 flat rate).</p>
                  <p>• All shipments include instant simulated tracking in your user dashboard.</p>
                </div>
              )}
            </div>

            {/* Accordion 3: Care Instructions */}
            <div>
              <button
                onClick={() => setOpenAccordion(openAccordion === 'care' ? null : 'care')}
                className="w-full py-4 flex items-center justify-between text-left text-sm font-bold text-slate-900 dark:text-white font-heading cursor-pointer"
              >
                <span>Care &amp; Sustainability</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'care' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'care' && (
                <div className="pb-4 text-xs text-slate-600 dark:text-slate-400 space-y-2 animate-in fade-in duration-150 leading-relaxed">
                  <p>Spot clean with a damp microfiber cloth. Avoid abrasive detergents. Keep away from extreme temperatures and direct open heat sources.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="pt-12 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
              Customer Reviews ({localReviews.length})
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Verified fictional feedback from registered shoppers
            </p>
          </div>

          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-blue-600 text-white dark:text-white text-xs font-bold hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors shadow-xs cursor-pointer self-start"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Demo Review</span>
          </button>
        </div>

        {/* Reviews List */}
        {localReviews.length === 0 ? (
          <div className="text-center py-10 text-slate-500 text-sm">
            No reviews yet. Be the first to submit a review!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {localReviews.map(rev => (
              <div
                key={rev.id}
                className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-slate-400">{rev.date}</span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 dark:text-white font-heading">{rev.author}</span>
                  <Badge variant="success">Verified Purchase</Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 block mb-1">
                More in {product.category}
              </span>
              <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                You May Also Like
              </h3>
            </div>
            <Link
              to={`/category/${product.category.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              View Category →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Demo Review Modal */}
      {isReviewModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Write a Review"
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsReviewModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                Write a Demo Review
              </h3>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="e.g. Humayoon Khan"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= reviewRating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300 dark:text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400 ml-2">
                    {reviewRating} out of 5
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Your Comments
                </label>
                <textarea
                  required
                  rows={4}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Write your honest thoughts about fit, durability, and materials..."
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex items-center justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer shadow-md"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
