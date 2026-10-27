import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Layers,
  Zap,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Code2,
  Palette,
  Laptop
} from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="flex flex-col gap-16 sm:gap-24 pb-20">
      {/* Hero Section */}
      <section className="bg-neutral-900 text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80"
            alt="UrbanCart aesthetic"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Concept by Zenvex</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading text-white tracking-tight leading-tight">
            Modern Shopping, Thoughtfully Designed.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-neutral-300 leading-relaxed">
            UrbanCart is a fictional e-commerce concept created by <strong>Zenvex</strong> to demonstrate how a modern shopping experience can seamlessly combine product discovery, multi-dimensional filtering, wishlist persistence, dynamic cart calculation, and an interactive frontend checkout flow.
          </p>
        </div>
      </section>

      {/* Concept Disclaimer Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-10 sm:-mt-14 relative z-20">
        <div className="bg-amber-500/10 dark:bg-amber-950/40 border border-amber-500/30 rounded-2xl p-6 text-center text-xs sm:text-sm text-amber-900 dark:text-amber-200">
          <strong>Portfolio Demonstration:</strong> All brands (UrbanCore, NovaLine, Luma, Aero, North &amp; Co.), product specifications, reviews, prices in PKR, and user data are fictional demo content.
        </div>
      </div>

      {/* Core Architectural Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 block mb-1">
            Engineering &amp; UX
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-neutral-900 dark:text-white">
            Built for Speed, Polish &amp; Usability
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-neutral-900 dark:text-white mb-3">
                100% Frontend Only
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Zero external database dependencies or required server keys. Everything operates smoothly in-browser with HTML5 LocalStorage state management.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 text-xs font-semibold text-blue-600">
              Direct Vercel Deployment
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-neutral-900 dark:text-white mb-3">
                High-End Visual Identity
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Crafted using modern typography hierarchy, dark mode toggles, micro-animations, accessible buttons, and refined neutral palettes.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 text-xs font-semibold text-purple-600">
              Zero Generic Templates
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-neutral-900 dark:text-white mb-3">
                Real-Time Spend Analytics
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Visual SVG graphs tracking category concentration, monthly spend curves, loyalty points, and downloadable JSON transaction logs.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 text-xs font-semibold text-emerald-600">
              Instant Metric Computation
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-neutral-100 dark:bg-neutral-900/60 rounded-3xl p-8 sm:p-12 border border-neutral-200/60 dark:border-neutral-800">
          <h3 className="text-2xl font-bold font-heading text-neutral-900 dark:text-white mb-8 text-center">
            Technology Stack &amp; Libraries
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: 'React 19', role: 'Component Architecture' },
              { name: 'TypeScript', role: 'Strict Type Safety' },
              { name: 'Vite 8', role: 'Ultra Fast Bundler' },
              { name: 'Tailwind CSS', role: 'Utility Design System' },
              { name: 'React Router', role: 'Client-Side SPA Routing' },
              { name: 'Lucide Icons', role: 'Accessible Iconography' },
              { name: 'Canvas Confetti', role: 'Delightful UX micro-rewards' },
              { name: 'HTML5 LocalStorage', role: 'Zero-API Session Persistence' }
            ].map(tech => (
              <div
                key={tech.name}
                className="bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 flex flex-col"
              >
                <span className="font-bold text-sm text-neutral-900 dark:text-white">{tech.name}</span>
                <span className="text-xs text-neutral-400 mt-1">{tech.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-2xl sm:text-3xl font-bold font-heading text-neutral-900 dark:text-white mb-4">
          Ready to Experience UrbanCart?
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-8 max-w-xl mx-auto">
          Explore our collection of 24 fictional products, try the live search, save items to your wishlist, and simulate a complete checkout flow.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/shop"
            className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-600/30 flex items-center gap-2"
          >
            <span>Explore Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/contact"
            className="px-8 py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 text-sm font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            Contact Zenvex
          </Link>
        </div>
      </section>
    </div>
  );
};
