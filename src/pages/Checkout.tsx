import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Banknote,
  Sparkles
} from 'lucide-react';
import { CustomerInfo, ShippingAddress, DeliveryMethod, Order } from '../types';
import { SafeImage } from '../components/SafeImage';

export const Checkout: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    userProfile,
    placeOrder,
    formatPrice,
    showToast
  } = useShop();

  const navigate = useNavigate();

  // Selected saved address or manual inputs
  const defaultAddress = userProfile.addresses.find(a => a.isDefault) || userProfile.addresses[0];

  const [customer, setCustomer] = useState<CustomerInfo>({
    fullName: userProfile.name || 'Humayoon Khan',
    email: userProfile.email || 'humayoonkhan003@gmail.com',
    phone: userProfile.phone || '+92 300 1234567'
  });

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    address: defaultAddress?.address || 'House 42, Street 14, Sector F-7/2',
    city: defaultAddress?.city || 'Islamabad',
    province: defaultAddress?.province || 'Federal Capital',
    postalCode: defaultAddress?.postalCode || '44000',
    country: defaultAddress?.country || 'Pakistan'
  });

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>({
    id: 'standard',
    title: 'Standard Tracked Delivery',
    subtitle: '3-5 Business Days',
    price: cartSubtotal >= 10000 ? 0 : 250,
    estimatedDays: '3-5 business days'
  });

  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('card');

  // Simulated Card Inputs
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [cardHolder, setCardHolder] = useState('HUMAYOON KHAN');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white mb-2">
          Your cart is empty
        </h2>
        <p className="text-sm text-slate-500 mb-6">Add products to your cart before proceeding to checkout.</p>
        <Link to="/shop" className="px-6 py-2.5 rounded-2xl bg-blue-600 text-white text-sm font-semibold shadow-md">
          Explore Shop
        </Link>
      </div>
    );
  }

  const finalDeliveryFee = cartSubtotal >= 10000
    ? (deliveryMethod.id === 'express' ? 250 : 0)
    : deliveryMethod.price;

  const finalOrderTotal = Math.max(0, cartSubtotal - cartDiscount + finalDeliveryFee);

  const handleApplyPresetAddress = (addr: typeof userProfile.addresses[0]) => {
    setShippingAddress({
      address: addr.address,
      city: addr.city,
      province: addr.province,
      postalCode: addr.postalCode,
      country: addr.country
    });
    showToast('Address Selected', `Loaded ${addr.label} address.`, 'info');
  };

  const handleFillDemoCard = () => {
    setCardNumber('4000 1234 5678 9010');
    setCardExpiry('12/29');
    setCardCvc('321');
    setCardHolder('DEMO SHOPPER');
    showToast('Demo Card Injected', 'Fictional test credentials filled in.', 'info');
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customer.fullName || !customer.email || !customer.phone) {
      showToast('Missing Contact Info', 'Please enter complete contact details.', 'warning');
      return;
    }

    if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode) {
      showToast('Missing Shipping Address', 'Please provide a valid shipping address.', 'warning');
      return;
    }

    setIsSubmitting(true);

    // Simulate payment authorization delay
    setTimeout(() => {
      const placedOrder = placeOrder({
        customer,
        shippingAddress,
        deliveryMethod,
        paymentMethod
      });

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.warn('Confetti unavailable', err);
      }

      setIsSubmitting(false);
      navigate(`/order-confirmation?orderId=${placedOrder.id}`);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb / Top Bar */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-200/80 dark:border-slate-800 mb-8">
        <div>
          <Link to="/cart" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 mb-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Cart</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
            Secure Demo Checkout
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
          <Lock className="w-3.5 h-3.5" />
          <span>Demo Simulation (No Real Charges)</span>
        </div>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
        {/* Left 7 Columns: Form Steps */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* Step 1: Contact Information */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-mono font-bold">
                  1
                </span>
                <span>Contact Information</span>
              </h2>
              <span className="text-xs text-slate-400 font-mono">Demo Account</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={customer.fullName}
                  onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                  placeholder="Humayoon Khan"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  placeholder="+92 300 1234567"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Shipping Address */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-mono font-bold">
                  2
                </span>
                <span>Shipping Address</span>
              </h2>
            </div>

            {/* Quick Preset Selector */}
            {userProfile.addresses.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">Load Saved:</span>
                {userProfile.addresses.map(addr => (
                  <button
                    key={addr.id}
                    type="button"
                    onClick={() => handleApplyPresetAddress(addr)}
                    className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-600 text-slate-700 dark:text-slate-300 transition-colors whitespace-nowrap cursor-pointer border border-slate-200 dark:border-slate-700"
                  >
                    {addr.label}
                  </button>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                  placeholder="House #, Street name, Sector"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  placeholder="Islamabad / Lahore / Karachi"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
                  Postal Code
                </label>
                <input
                  type="text"
                  required
                  value={shippingAddress.postalCode}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                  placeholder="44000"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
                  Province / State
                </label>
                <input
                  type="text"
                  required
                  value={shippingAddress.province}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, province: e.target.value })}
                  placeholder="Federal Capital"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
                  Country
                </label>
                <input
                  type="text"
                  required
                  value={shippingAddress.country}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                  placeholder="Pakistan"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Step 3: Delivery Speed */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col gap-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-mono font-bold">
                3
              </span>
              <span>Delivery Method</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <label
                onClick={() => setDeliveryMethod({
                  id: 'standard',
                  title: 'Standard Tracked Delivery',
                  subtitle: '3-5 Business Days',
                  price: cartSubtotal >= 10000 ? 0 : 250,
                  estimatedDays: '3-5 business days'
                })}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between gap-2 ${
                  deliveryMethod.id === 'standard'
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Standard Courier</span>
                  </div>
                  <span className="text-xs font-bold font-mono">
                    {cartSubtotal >= 10000 ? <span className="text-emerald-600">FREE</span> : formatPrice(250)}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">Delivered within 3-5 business days with live tracking.</p>
              </label>

              <label
                onClick={() => setDeliveryMethod({
                  id: 'express',
                  title: 'Express Priority Courier',
                  subtitle: '1-2 Business Days',
                  price: cartSubtotal >= 10000 ? 250 : 500,
                  estimatedDays: '1-2 business days'
                })}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between gap-2 ${
                  deliveryMethod.id === 'express'
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Express Air Priority</span>
                  </div>
                  <span className="text-xs font-bold font-mono">
                    {cartSubtotal >= 10000 ? formatPrice(250) : formatPrice(500)}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">Fast-track dispatch within 24-48 hours across major cities.</p>
              </label>
            </div>
          </div>

          {/* Step 4: Simulated Payment Method */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-mono font-bold">
                  4
                </span>
                <span>Payment Simulation</span>
              </h2>
              <button
                type="button"
                onClick={handleFillDemoCard}
                className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                Auto-fill Test Card
              </button>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {[
                { id: 'card', label: 'Credit Card', icon: CreditCard },
                { id: 'easypaisa', label: 'EasyPaisa', icon: Smartphone },
                { id: 'jazzcash', label: 'JazzCash', icon: Smartphone },
                { id: 'cod', label: 'Cash on Del.', icon: Banknote }
              ].map(method => {
                const isSelected = paymentMethod === method.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id as Order['paymentMethod'])}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-600'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    <method.icon className="w-5 h-5" />
                    <span className="text-xs font-bold">{method.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Simulated Card Form */}
            {paymentMethod === 'card' && (
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex flex-col gap-3 mt-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Demo Card Details (Safe & Simulated)</span>
                  <div className="flex items-center gap-1 font-mono text-[10px]">
                    <span>VISA</span> • <span>MC</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 •••• •••• 4242"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                      CVC / CVV
                    </label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="123"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    placeholder="Full Name as on card"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            {/* Mobile Wallet Simulation Form */}
            {(paymentMethod === 'easypaisa' || paymentMethod === 'jazzcash') && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs flex flex-col gap-3">
                <div className="font-bold text-slate-900 dark:text-white capitalize">
                  {paymentMethod} Wallet Transfer (Demo)
                </div>
                <p className="text-slate-500 leading-relaxed">
                  You will receive an automated demo approval prompt on your registered mobile number: <strong>{customer.phone}</strong>.
                </p>
              </div>
            )}

            {/* Cash on Delivery Simulation Form */}
            {paymentMethod === 'cod' && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs flex flex-col gap-3">
                <div className="font-bold text-slate-900 dark:text-white">
                  Cash on Delivery (Demo Mode)
                </div>
                <p className="text-slate-500 leading-relaxed">
                  Pay with exact cash to the courier upon delivery at your designated shipping address.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right 5 Columns: Sticky Order Review & Submit */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl sticky top-28 flex flex-col gap-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white font-heading pb-4 border-b border-slate-100 dark:border-slate-800">
            Order Review ({cart.length} unique items)
          </h2>

          {/* Mini Items Thumbnail List */}
          <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1 divide-y divide-slate-100 dark:divide-slate-800">
            {cart.map(item => (
              <div key={item.id} className="pt-2 first:pt-0 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700">
                    <SafeImage src={item.product.images[0]} alt="" containerClassName="w-full h-full" className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 right-0 px-1 py-0.2 bg-slate-900 text-white text-[9px] font-bold rounded-tl">
                      x{item.quantity}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {item.product.name}
                    </h4>
                    <span className="text-[10px] text-slate-400 block">
                      {item.selectedColor || ''} {item.selectedSize ? `• ${item.selectedSize}` : ''}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white font-mono shrink-0">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Cost Summary Breakdown */}
          <div className="flex flex-col gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900 dark:text-white font-mono">{formatPrice(cartSubtotal)}</span>
            </div>

            {cartDiscount > 0 && (
              <div className="flex items-center justify-between text-emerald-600 font-semibold">
                <span>Discount</span>
                <span className="font-mono">-{formatPrice(cartDiscount)}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span>Shipping ({deliveryMethod.title})</span>
              <span className="font-semibold text-slate-900 dark:text-white font-mono">
                {finalDeliveryFee === 0 ? <strong className="text-emerald-600">FREE</strong> : formatPrice(finalDeliveryFee)}
              </span>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-baseline justify-between text-base font-bold text-slate-900 dark:text-white">
              <span>Total Due</span>
              <span className="text-2xl font-black font-heading text-blue-600 dark:text-blue-400 font-mono">
                {formatPrice(finalOrderTotal)}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 group"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                <span>Simulating Authorization...</span>
              </span>
            ) : (
              <>
                <span>Confirm &amp; Place Demo Order</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Instant Demo Placement • Stored in LocalStorage</span>
          </div>
        </div>
      </form>
    </div>
  );
};
