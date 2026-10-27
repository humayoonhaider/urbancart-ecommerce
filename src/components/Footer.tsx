import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Mail, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export const Footer: React.FC = () => {
  const { showToast } = useShop();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email', 'Demo newsletter form requires an email format.', 'warning');
      return;
    }
    setIsSubscribed(true);
    showToast('Subscribed!', 'Thank you for testing the demo newsletter subscription.', 'success');
  };

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/90 transition-colors">
      {/* Top Banner Notice */}
      <div className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/60 dark:border-slate-800/80 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
                Fictional Concept Project by Zenvex
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Crafted for portfolio demonstration, showcasing responsive design, real-time analytics, and client UX.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              100% Frontend (Vercel Ready)
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Zero External Backend
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand & Mission (2 cols on lg) */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <Link to="/" className="flex items-center gap-1.5 mb-3">
                <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-heading">
                  URBANCART
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 mb-1" />
              </Link>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-2 font-heading">
                Shop Better. Live Better.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mb-6">
                Discover products you&apos;ll love, curated for modern everyday living. Thoughtfully designed with clean aesthetics, interactive spend charts, and intuitive cart management.
              </p>
            </div>

            {/* Newsletter input */}
            <div className="max-w-sm">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Join our demo newsletter
              </label>
              {isSubscribed ? (
                <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Subscribed! Check localStorage for logs.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-3 py-2.5 text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-blue-600 text-white dark:text-white text-xs font-semibold hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors shrink-0 cursor-pointer shadow-sm flex items-center gap-1"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-heading mb-4">
              Shop Collections
            </h5>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/shop" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  All Products
                </Link>
              </li>
              {CATEGORIES.map(cat => (
                <li key={cat.id}>
                  <Link to={`/category/${cat.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-heading mb-4">
              Customer Experience
            </h5>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/wishlist" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Spendings &amp; Analytics
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Profile &amp; Address Book
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Contact &amp; FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Concept Project details */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-heading mb-4">
              Studio &amp; Concept
            </h5>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  About UrbanCart
                </Link>
              </li>
              <li>
                <span className="text-slate-500">Developer: SH Web Studio</span>
              </li>
              <li>
                <span className="text-slate-500">Stack: React + Vite + Tailwind v4</span>
              </li>
              <li>
                <span className="text-slate-500">Deployment: Vercel Ready</span>
              </li>
              <li>
                <span className="text-slate-500">Storage: HTML5 LocalStorage</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-14 pt-8 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span>&copy; 2026 UrbanCart — Concept Project by <strong>Zenvex</strong></span>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg border border-slate-300 dark:border-slate-700 text-[10px] font-mono uppercase tracking-wider bg-slate-100 dark:bg-slate-900">
              Portfolio Demo
            </span>
            <span>No real transactions processed</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
