import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { QuantitySelector } from '../components/QuantitySelector';
import { EmptyState } from '../components/EmptyState';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Truck,
  Tag,
  ShieldCheck,
  CheckCircle2,
  X
} from 'lucide-react';
import { SafeImage } from '../components/SafeImage';

export const Cart: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    cartDiscount,
    shippingFee,
    cartTotal,
    freeShippingThreshold,
    progressToFreeShipping,
    promoCode,
    applyPromoCode,
    removePromoCode,
    formatPrice
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    applyPromoCode(couponInput);
    setCouponInput('');
  };

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          icon={ShoppingBag}
          title="Your Shopping Cart is Empty"
          description="Looks like you haven't added any items to your cart yet. Discover our curated essentials."
          actionText="Start Shopping"
          actionHref="/shop"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 block mb-1">
            Order Review
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
            Shopping Cart ({cart.reduce((a, b) => a + b.quantity, 0)} items)
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1.5 self-start sm:self-end cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-3xl p-4 sm:p-5 mb-8">
        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-blue-600" />
            {amountNeededForFreeShipping === 0 ? (
              <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Congratulations! You qualified for Free Demo Shipping.
              </span>
            ) : (
              <span>
                Add <strong>{formatPrice(amountNeededForFreeShipping)}</strong> more to get Free Demo Delivery!
              </span>
            )}
          </div>
          <span className="font-mono">{progressToFreeShipping}%</span>
        </div>
        <div className="h-2 w-full bg-blue-200 dark:bg-blue-900 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${progressToFreeShipping}%` }}
          />
        </div>
      </div>

      {/* Main Grid: Items List & Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 items-start">
        {/* Left 2 Columns: Items Table */}
        <div className="lg:col-span-2 flex flex-col divide-y divide-slate-200 dark:divide-slate-800">
          {cart.map(item => (
            <div key={item.id} className="py-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 group">
              {/* Product Thumbnail */}
              <Link to={`/product/${item.product.id}`} className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
                <SafeImage
                  src={item.product.images[0]}
                  alt={item.product.name}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
                />
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {item.product.brand}
                </span>
                <Link to={`/product/${item.product.id}`} className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading truncate">
                    {item.product.name}
                  </h3>
                </Link>

                <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                  {item.selectedColor && (
                    <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                      Color: {item.selectedColor}
                    </span>
                  )}
                  {item.selectedSize && (
                    <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                      Size: {item.selectedSize}
                    </span>
                  )}
                </div>

                <div className="text-xs font-bold text-slate-900 dark:text-white mt-2 sm:hidden font-heading">
                  {formatPrice(item.product.price)} each
                </div>
              </div>

              {/* Price & Quantity & Remove */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4">
                <div className="text-right hidden sm:block">
                  <div className="text-base font-bold text-slate-900 dark:text-white font-heading">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                  {item.quantity > 1 && (
                    <div className="text-[11px] text-slate-400">
                      ({formatPrice(item.product.price)} each)
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <QuantitySelector
                    quantity={item.quantity}
                    onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                    onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                    size="sm"
                  />

                  <button
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.product.name} from cart`}
                    className="p-2 text-slate-400 hover:text-rose-500 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Continue Shopping Action */}
          <div className="pt-6">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping Catalog</span>
            </Link>
          </div>
        </div>

        {/* Right 1 Column: Order Summary Card */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl sticky top-28 flex flex-col gap-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white font-heading pb-4 border-b border-slate-100 dark:border-slate-800">
            Order Summary
          </h2>

          {/* Promo Code Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
              Have a Promo Code?
            </label>
            {promoCode ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs">
                <div>
                  <span className="font-bold text-emerald-800 dark:text-emerald-300 font-mono">{promoCode.code}</span>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">{promoCode.description}</p>
                </div>
                <button
                  onClick={removePromoCode}
                  className="p-1 text-emerald-700 hover:text-rose-600 cursor-pointer"
                  title="Remove coupon"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Try 'URBAN10'"
                    className="w-full pl-9 pr-3 py-2 text-xs uppercase bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 dark:bg-blue-600 text-white dark:text-white text-xs font-bold rounded-xl hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors shrink-0 cursor-pointer shadow-xs"
                >
                  Apply
                </button>
              </form>
            )}
          </div>

          {/* Pricing Breakdown */}
          <div className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900 dark:text-white font-mono">{formatPrice(cartSubtotal)}</span>
            </div>

            {cartDiscount > 0 && (
              <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                <span>Discount ({promoCode?.discountPercent}%)</span>
                <span className="font-mono">-{formatPrice(cartDiscount)}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span>Estimated Shipping</span>
              <span className="font-semibold text-slate-900 dark:text-white font-mono">
                {shippingFee === 0 ? <strong className="text-emerald-600 font-bold">FREE</strong> : formatPrice(shippingFee)}
              </span>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-baseline justify-between text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              <span>Estimated Total</span>
              <span className="text-xl sm:text-2xl font-black font-heading text-blue-600 dark:text-blue-400">
                {formatPrice(cartTotal)}
              </span>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted Demo Checkout • Instant Verification</span>
          </div>
        </div>
      </div>
    </div>
  );
};
