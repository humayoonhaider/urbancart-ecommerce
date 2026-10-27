import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import {
  Search,
  Heart,
  ShoppingBag,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  User,
  BarChart3
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { SafeImage } from './SafeImage';

export const Navbar: React.FC = () => {
  const {
    cartCount,
    wishlist,
    theme,
    toggleTheme,
    currency,
    setCurrency,
    setIsSearchOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen
  } = useShop();

  const location = useLocation();
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setIsCategoriesDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname, setIsMobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop All', href: '/shop' },
    { label: 'Analytics', href: '/dashboard', icon: BarChart3 },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <>
      {/* Top Demo Notification Banner */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white tracking-wider uppercase shadow-xs">
              Portfolio Concept
            </span>
            <span>Zenvex Demo • Use promo code <strong className="text-white font-mono bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">URBAN10</strong> for 10% off</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="text-emerald-400 font-medium">Free Shipping above PKR 10,000</span>
            <span className="hidden md:inline text-slate-600">•</span>
            <span className="hidden md:inline text-slate-300 font-medium">100% Frontend Architecture</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-md border-b border-slate-200/80 dark:border-slate-800/90'
            : 'bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/90'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex flex-col group cursor-pointer">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white font-heading">
                  URBANCART
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 mb-1 animate-pulse" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 group-hover:text-blue-500 transition-colors">
                Concept by Zenvex
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 ml-4">
              {navLinks.map(link => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/50 shadow-xs'
                        : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
                    }`}
                  >
                    {link.icon && <link.icon className="w-4 h-4 text-blue-500" />}
                    <span>{link.label}</span>
                  </Link>
                );
              })}

              {/* Categories Mega Dropdown Trigger */}
              <div
                className="relative"
                onMouseEnter={() => setIsCategoriesDropdownOpen(true)}
                onMouseLeave={() => setIsCategoriesDropdownOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setIsCategoriesDropdownOpen(prev => !prev)}
                  className="px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/70 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Categories</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCategoriesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isCategoriesDropdownOpen && (
                  <div className="absolute top-full left-0 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
                      Explore Collections
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      {CATEGORIES.map(cat => (
                        <Link
                          key={cat.id}
                          to={`/category/${cat.slug}`}
                          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                        >
                          <SafeImage
                            src={cat.image}
                            alt=""
                            containerClassName="w-10 h-10 rounded-lg shrink-0"
                            className="w-10 h-10 rounded-lg object-cover bg-slate-200 dark:bg-slate-800"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                              {cat.name}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{cat.featuredTag}</div>
                          </div>
                          <span className="text-xs text-slate-400 font-mono font-medium">{cat.itemCount}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Currency Picker */}
            <div className="hidden sm:flex items-center border border-slate-200 dark:border-slate-800 rounded-xl p-0.5 bg-slate-50 dark:bg-slate-900 text-xs font-semibold">
              {(['PKR', 'USD', 'EUR'] as const).map(curr => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    currency === curr
                      ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>

            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle color theme"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-amber-400 transition-colors cursor-pointer relative"
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-slate-700" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>

            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search catalog"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist Link with Badge */}
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
              title="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Profile Link */}
            <Link
              to="/profile"
              aria-label="User Profile"
              className="hidden sm:flex p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Profile & Settings"
            >
              <User className="w-4 h-4" />
            </Link>

            {/* Cart Link with Badge */}
            <Link
              to="/cart"
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 dark:bg-blue-600 text-white dark:text-white text-sm font-semibold hover:bg-blue-600 dark:hover:bg-blue-500 transition-all shadow-sm cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              <span className="px-1.5 py-0.5 rounded-md bg-blue-500 dark:bg-slate-900 text-white dark:text-white text-xs font-bold font-mono">
                {cartCount}
              </span>
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-6 shadow-2xl animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-2">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="px-4 py-3 rounded-xl text-base font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  {link.icon && <link.icon className="w-4 h-4 text-blue-500" />}
                </Link>
              ))}

              <Link
                to="/profile"
                className="px-4 py-3 rounded-xl text-base font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between"
              >
                <span>Profile &amp; Addresses</span>
                <User className="w-4 h-4 text-slate-400" />
              </Link>

              {/* Mobile Categories list */}
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-4 mb-2">
                  Shop Categories
                </div>
                <div className="grid grid-cols-2 gap-2 px-2">
                  {CATEGORIES.map(cat => (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.slug}`}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/40"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Currency Picker */}
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between px-4">
                <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Currency</span>
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  {(['PKR', 'USD', 'EUR'] as const).map(curr => (
                    <button
                      key={curr}
                      onClick={() => setCurrency(curr)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        currency === curr ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs' : 'text-slate-400'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
