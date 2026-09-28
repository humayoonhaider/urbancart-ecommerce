import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import {
  CheckCircle2,
  Truck,
  Printer,
  ArrowRight,
  ShieldAlert,
  BarChart3
} from 'lucide-react';
import { SafeImage } from '../components/SafeImage';

export const OrderConfirmation: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { orders, formatPrice } = useShop();

  const orderId = searchParams.get('orderId');
  const order = orders.find(o => o.id === orderId) || orders[0];

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold font-heading mb-3">No recent order found</h2>
        <p className="text-slate-500 mb-6">Looks like no active demo order session was detected.</p>
        <Link to="/shop" className="px-6 py-2.5 rounded-2xl bg-blue-600 text-white font-semibold text-sm shadow-md">
          Browse Catalog
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
      {/* Success Badge Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col items-center text-center mb-8">
        <div className="w-16 h-16 rounded-3xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5 shadow-inner">
          <CheckCircle2 className="w-9 h-9 stroke-[2]" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1">
          Demo Transaction Successful
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-heading tracking-tight">
          Order Confirmed!
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md">
          Your demo order has been successfully placed and logged into your local session storage.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
            Order Reference: <span className="text-blue-600 dark:text-blue-400">{order.orderNumber}</span>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-400">
            Placed: {new Date(order.date).toLocaleString()}
          </div>
        </div>

        {/* Fictional Disclaimer Notice */}
        <div className="mt-6 flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 rounded-2xl text-amber-900 dark:text-amber-200 text-xs max-w-lg">
          <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600" />
          <span>
            <strong>Concept Notice:</strong> This is a fictional demo order. No real purchase has been made and no physical items will be shipped.
          </span>
        </div>
      </div>

      {/* Simulated Tracking Stepper */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs mb-8">
        <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading mb-6 flex items-center gap-2">
          <Truck className="w-4 h-4 text-blue-600" />
          <span>Dispatch &amp; Delivery Progress</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
          {order.trackingSteps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-start sm:items-center text-left sm:text-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  step.completed
                    ? 'bg-emerald-600 text-white'
                    : step.current
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-900'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                }`}
              >
                {step.completed ? '✓' : idx + 1}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">{step.title}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{step.description}</div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">{step.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Itemized Invoice Receipt */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
              Invoice Summary
            </h3>
            <span className="text-xs text-slate-400">Payment: {order.paymentMethod.toUpperCase()}</span>
          </div>

          <button
            onClick={handlePrint}
            className="no-print inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
        </div>

        {/* Customer & Shipping Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
          <div>
            <span className="font-bold uppercase text-slate-400 block mb-1">Customer Info</span>
            <div className="font-semibold text-slate-900 dark:text-white">{order.customer.fullName}</div>
            <div>{order.customer.email}</div>
            <div>{order.customer.phone}</div>
          </div>

          <div>
            <span className="font-bold uppercase text-slate-400 block mb-1">Shipping Destination</span>
            <div>{order.shippingAddress.address}</div>
            <div>{order.shippingAddress.city}, {order.shippingAddress.province} {order.shippingAddress.postalCode}</div>
            <div>{order.shippingAddress.country}</div>
          </div>
        </div>

        {/* Ordered Items List */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800 py-4">
          {order.items.map(item => (
            <div key={item.id} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <SafeImage
                  src={item.product.images[0]}
                  alt=""
                  containerClassName="w-12 h-12 rounded-xl shrink-0"
                  className="w-12 h-12 rounded-xl object-cover bg-slate-100 dark:bg-slate-800"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.product.name}</h4>
                  <div className="text-[11px] text-slate-400">
                    Qty: {item.quantity} {item.selectedColor ? `• ${item.selectedColor}` : ''} {item.selectedSize ? `• ${item.selectedSize}` : ''}
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">
                {formatPrice(item.product.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-mono text-slate-900 dark:text-white">{formatPrice(order.subtotal)}</span>
          </div>

          {order.discountAmount > 0 && (
            <div className="flex justify-between text-emerald-600 font-semibold">
              <span>Discount ({order.promoCodeApplied || 'PROMO'})</span>
              <span className="font-mono">-{formatPrice(order.discountAmount)}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-mono text-slate-900 dark:text-white">
              {order.shippingFee === 0 ? 'FREE' : formatPrice(order.shippingFee)}
            </span>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between text-base font-bold text-slate-900 dark:text-white">
            <span>Total Paid</span>
            <span className="text-xl font-black font-heading text-blue-600 dark:text-blue-400 font-mono">
              {formatPrice(order.total)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Navigation Buttons */}
      <div className="no-print flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/"
          className="px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          Back to Home
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="px-6 py-3 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors shadow-sm flex items-center gap-2"
          >
            <BarChart3 className="w-4 h-4 text-blue-400" />
            <span>View Spend Analytics</span>
          </Link>

          <Link
            to="/shop"
            className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
