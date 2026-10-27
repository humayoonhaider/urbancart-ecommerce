import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { SectionHeading } from '../components/SectionHeading';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  CheckCircle,
  Zap,
  Star,
  BarChart3
} from 'lucide-react';
import { Badge } from '../components/Badge';
import { SafeImage } from '../components/SafeImage';
import { ImmersiveHero } from '../components/ImmersiveHero';
import { ThreeDDivider } from '../components/ThreeDDivider';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'All' | 'Fashion' | 'Electronics' | 'Home & Living'>('All');

  // Flash Sale Demo Countdown (hours, minutes, seconds)
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredProducts = activeTab === 'All'
    ? PRODUCTS.filter(p => p.isFeatured || p.isBestseller).slice(0, 8)
    : PRODUCTS.filter(p => p.category === activeTab).slice(0, 8);

  const saleProducts = PRODUCTS.filter(p => p.discount && p.discount >= 18).slice(0, 4);

  return (
    <div className="flex flex-col gap-16 sm:gap-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-950 text-white min-h-[580px] sm:min-h-[660px] flex items-center">
        {/* Background lifestyle image with layered gradient overlay */}
        <div className="absolute inset-0 z-0">
          <ImmersiveHero />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-2xl">
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-400 text-xs font-semibold mb-6 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Modern Lifestyle • Zenvex Demo</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-heading leading-[1.1] mb-6">
              Shop Better. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-200">
                Live Better.
              </span>
            </h1>

            {/* Supporting text */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
              Discover products you&apos;ll love, curated for modern everyday living. Thoughtfully selected essentials designed for style, durability, and daily comfort.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-sm sm:text-base font-semibold transition-all duration-200 shadow-lg shadow-blue-600/30 flex items-center gap-2 group cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#categories"
                className="px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-sm sm:text-base font-semibold backdrop-blur-md border border-white/20 transition-all duration-200 cursor-pointer"
              >
                Explore Collections
              </a>
              <Link
                to="/dashboard"
                className="px-5 py-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white text-sm font-semibold border border-slate-700 flex items-center gap-2 transition-all cursor-pointer"
              >
                <BarChart3 className="w-4 h-4 text-blue-400" />
                <span>Live Analytics</span>
              </Link>
            </div>

            {/* Feature Micro-Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10 text-slate-300">
              <div>
                <div className="text-2xl font-bold font-heading text-white">24+</div>
                <div className="text-xs text-slate-400 mt-0.5">Curated Products</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-heading text-white">100%</div>
                <div className="text-xs text-slate-400 mt-0.5">Vercel Ready Frontend</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-heading text-white">4.9/5</div>
                <div className="text-xs text-slate-400 mt-0.5">Customer Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITIONS / TRUST STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-8 sm:-mt-12 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl dark:shadow-slate-950/40">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
                Free Demo Shipping
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Enjoy free automated shipping on all orders over PKR 10,000.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
                Secure Demo Checkout
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Zero real payments required. Safe simulation of credit cards &amp; COD.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
                Instant Persistence
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Your cart, wishlist, and orders persist seamlessly across browser reloads.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
                Modern UX &amp; Design
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Tailored with high responsive fidelity and dark mode support.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ThreeDDivider />

      {/* 3. FEATURED CATEGORIES SECTION */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full scroll-mt-24">
        <SectionHeading
          tag="Curated Collections"
          title="Explore by Category"
          subtitle="Discover premium handcrafted essentials across our top design categories."
          action={{
            label: 'View All Categories',
            onClick: () => navigate('/shop')
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="group relative h-80 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-end p-6"
            >
              {/* Background Image */}
              <SafeImage
                src={cat.image}
                alt={cat.name}
                containerClassName="absolute inset-0 w-full h-full"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

              {/* Card Content */}
              <div className="relative z-10 text-white">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md mb-2">
                  {cat.featuredTag}
                </span>
                <h3 className="text-2xl font-bold font-heading group-hover:text-blue-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>

                <div className="mt-4 flex items-center justify-between text-xs font-semibold text-slate-200 group-hover:text-white">
                  <span>{cat.itemCount} Products</span>
                  <div className="flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS & TAB FILTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-2 block">
              Handpicked Essentials
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-heading">
              Featured Products
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Explore some of our most popular picks loved by everyday shoppers.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl self-start overflow-x-auto max-w-full">
            {(['All', 'Fashion', 'Electronics', 'Home & Living'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-slate-900 dark:bg-blue-600 text-white dark:text-white text-sm font-semibold hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors shadow-sm cursor-pointer"
          >
            <span>View All 24 Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 5. FLASH SALE / LIMITED DEAL SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Zap className="w-3.5 h-3.5" />
                <span>Limited Time Promotion</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
                Urban Spotlight Flash Deals
              </h3>
              <p className="text-sm text-slate-400 mt-2 max-w-xl">
                Save up to 25% on selected audio gear, outerwear, and minimal lifestyle accessories.
              </p>
            </div>

            {/* Countdown Timer Boxes */}
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3.5 rounded-2xl backdrop-blur-md">
              <div className="flex flex-col items-center px-3">
                <span className="text-2xl sm:text-3xl font-black font-mono text-white">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400">Hours</span>
              </div>
              <span className="text-2xl font-bold text-slate-500">:</span>
              <div className="flex flex-col items-center px-3">
                <span className="text-2xl sm:text-3xl font-black font-mono text-white">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400">Mins</span>
              </div>
              <span className="text-2xl font-bold text-slate-500">:</span>
              <div className="flex flex-col items-center px-3">
                <span className="text-2xl sm:text-3xl font-black font-mono text-rose-400">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400">Secs</span>
              </div>
            </div>
          </div>

          {/* Flash Deals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {saleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. EDITORIAL STORY / CRAFT PHILOSOPHY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden aspect-4/3 shadow-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
            <SafeImage
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
              alt="Artisanal craftsmanship"
              containerClassName="w-full h-full"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Ethical Standards</span>
              <h4 className="text-lg font-bold font-heading mt-1">Designed for Longevity &amp; Daily Comfort</h4>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
              The UrbanCart Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
              Thoughtful Goods for the Modern Dweller
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Every fictional item in our collection embodies the balance between aesthetic simplicity, durable tactile materials, and ergonomic utility.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shrink-0">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-slate-900 dark:text-white">Premium Materials</h5>
                  <p className="text-xs text-slate-500 mt-0.5">Recycled textiles, full-grain vegan leather, and aerospace aluminum.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-slate-900 dark:text-white">Zero Carbon Footprint</h5>
                  <p className="text-xs text-slate-500 mt-0.5">Biodegradable packaging and recyclable cardboard containers.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                <span>Read more about our concept design</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS / TESTIMONIALS */}
      <section className="bg-slate-100/70 dark:bg-slate-900/40 py-16 border-y border-slate-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <SectionHeading
            align="center"
            tag="Customer Stories"
            title="Loved by Discerning Shoppers"
            subtitle="Read fictional feedback from demo customers who experienced our product curation."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "The Nova Wireless Headphones sound crisp with phenomenal bass response. UrbanCart's interface is ridiculously fast and clean.",
                author: "Danial Ahmed",
                role: "Product Designer, Lahore",
                rating: 5
              },
              {
                quote: "Purchased the Aero Essential Jacket and Luma Table Lamp. The attention to minimalist ergonomics and packaging is stellar.",
                author: "Sarah Mansoor",
                role: "Architect, Islamabad",
                rating: 5
              },
              {
                quote: "The live spend analytics dashboard is an innovative touch. You can instantly see your category distribution and savings in real time.",
                author: "Bilal Chaudhry",
                role: "Software Engineer, Karachi",
                rating: 5
              }
            ].map((review, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {Array.from({ length: review.rating }).map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
                      {review.author}
                    </h5>
                    <span className="text-xs text-slate-400">{review.role}</span>
                  </div>
                  <Badge variant="success">Verified Demo</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
