import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { Product, CartItem, Order, UserProfile, SavedAddress } from '../types';
import { PRODUCTS } from '../data/products';

interface ToastItem {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface PromoCode {
  code: string;
  discountPercent: number;
  description: string;
}

interface ShopContextType {
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  userProfile: UserProfile;
  theme: 'light' | 'dark';
  currency: 'PKR' | 'USD' | 'EUR';
  promoCode: PromoCode | null;
  recentSearches: string[];
  recentlyViewed: string[];
  toasts: ToastItem[];
  quickViewProduct: Product | null;
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  
  // Cart actions
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  shippingFee: number;
  cartTotal: number;
  freeShippingThreshold: number;
  progressToFreeShipping: number;
  
  // Wishlist actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistProducts: Product[];
  
  // Promo code
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  
  // Orders
  placeOrder: (orderPayload: {
    customer: Order['customer'];
    shippingAddress: Order['shippingAddress'];
    deliveryMethod: Order['deliveryMethod'];
    paymentMethod: Order['paymentMethod'];
  }) => Order;
  getOrderById: (orderId: string) => Order | undefined;
  
  // Profile & Address
  updateProfile: (updated: Partial<UserProfile>) => void;
  addAddress: (address: Omit<SavedAddress, 'id'>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  
  // Utilities & Modals
  toggleTheme: () => void;
  setCurrency: (currency: 'PKR' | 'USD' | 'EUR') => void;
  formatPrice: (amountInPKR: number) => string;
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning', action?: { label: string; onClick: () => void }) => void;
  removeToast: (id: string) => void;
  setQuickViewProduct: (product: Product | null) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsMobileMenuOpen: (open: boolean) => void;
  addRecentSearch: (query: string) => void;
  trackProductView: (productId: string) => void;
}

const FREE_SHIPPING_THRESHOLD = 10000;
const STANDARD_SHIPPING_FEE = 250;

const DEFAULT_PROFILE: UserProfile = {
  name: 'Humayoon Khan',
  email: 'humayoonkhan003@gmail.com',
  phone: '+92 300 1234567',
  memberSince: 'March 2025',
  tier: 'Platinum Member',
  rewardPoints: 1250,
  marketingOptIn: true,
  addresses: [
    {
      id: 'addr-1',
      label: 'Home (Default)',
      address: 'House 42, Street 14, Sector F-7/2',
      city: 'Islamabad',
      province: 'Federal Capital',
      postalCode: '44000',
      country: 'Pakistan',
      isDefault: true
    },
    {
      id: 'addr-2',
      label: 'Office',
      address: 'Suite 302, Evacuee Trust Complex, F-5/1',
      city: 'Islamabad',
      province: 'Federal Capital',
      postalCode: '44000',
      country: 'Pakistan',
      isDefault: false
    }
  ],
  savedCards: [
    {
      id: 'card-1',
      cardHolder: 'HUMAYOON KHAN',
      lastFour: '4242',
      expiry: '08/28',
      brand: 'visa'
    }
  ]
};

// Initial sample seed orders to display analytical dashboard right away
const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'ord-10921',
    orderNumber: 'UC-94821',
    date: '2026-09-22T14:30:00Z',
    items: [
      {
        id: 'prod-05-Midnight Matte-',
        product: PRODUCTS.find(p => p.id === 'prod-05') || PRODUCTS[4],
        quantity: 1,
        selectedColor: 'Midnight Matte'
      },
      {
        id: 'prod-21-Carbon Black-',
        product: PRODUCTS.find(p => p.id === 'prod-21') || PRODUCTS[20],
        quantity: 1,
        selectedColor: 'Carbon Black'
      }
    ],
    customer: {
      fullName: 'Humayoon Khan',
      email: 'humayoonkhan003@gmail.com',
      phone: '+92 300 1234567'
    },
    shippingAddress: {
      address: 'House 42, Street 14, Sector F-7/2',
      city: 'Islamabad',
      province: 'Federal Capital',
      postalCode: '44000',
      country: 'Pakistan'
    },
    deliveryMethod: {
      id: 'standard',
      title: 'Standard Tracked Delivery',
      subtitle: '3-5 Business Days',
      price: 0,
      estimatedDays: '3-5 business days'
    },
    paymentMethod: 'card',
    subtotal: 22300,
    shippingFee: 0,
    discountAmount: 2230,
    promoCodeApplied: 'URBAN10',
    total: 20070,
    status: 'Delivered',
    trackingSteps: [
      { title: 'Order Placed', description: 'Demo order received and verified', date: 'Sep 22, 02:30 PM', completed: true, current: false },
      { title: 'Processing & Packed', description: 'Item inspected and boxed at urban depot', date: 'Sep 23, 10:15 AM', completed: true, current: false },
      { title: 'In Transit', description: 'Dispatched via Express Courier', date: 'Sep 24, 08:45 AM', completed: true, current: false },
      { title: 'Delivered', description: 'Delivered with recipient signature', date: 'Sep 25, 03:20 PM', completed: true, current: true }
    ]
  },
  {
    id: 'ord-10884',
    orderNumber: 'UC-88412',
    date: '2026-09-08T11:15:00Z',
    items: [
      {
        id: 'prod-01-Obsidian Black-L',
        product: PRODUCTS.find(p => p.id === 'prod-01') || PRODUCTS[0],
        quantity: 1,
        selectedColor: 'Obsidian Black',
        selectedSize: 'L'
      },
      {
        id: 'prod-13-Whiskey Tan-',
        product: PRODUCTS.find(p => p.id === 'prod-13') || PRODUCTS[12],
        quantity: 1,
        selectedColor: 'Whiskey Tan'
      }
    ],
    customer: {
      fullName: 'Humayoon Khan',
      email: 'humayoonkhan003@gmail.com',
      phone: '+92 300 1234567'
    },
    shippingAddress: {
      address: 'House 42, Street 14, Sector F-7/2',
      city: 'Islamabad',
      province: 'Federal Capital',
      postalCode: '44000',
      country: 'Pakistan'
    },
    deliveryMethod: {
      id: 'standard',
      title: 'Standard Tracked Delivery',
      subtitle: '3-5 Business Days',
      price: 0,
      estimatedDays: '3-5 business days'
    },
    paymentMethod: 'easypaisa',
    subtotal: 12100,
    shippingFee: 0,
    discountAmount: 1210,
    promoCodeApplied: 'URBAN10',
    total: 10890,
    status: 'Delivered',
    trackingSteps: [
      { title: 'Order Placed', description: 'Demo order confirmed', date: 'Sep 08, 11:15 AM', completed: true, current: false },
      { title: 'Processing & Packed', description: 'Packed at distribution hub', date: 'Sep 09, 09:00 AM', completed: true, current: false },
      { title: 'In Transit', description: 'Courier transit to destination city', date: 'Sep 10, 02:00 PM', completed: true, current: false },
      { title: 'Delivered', description: 'Successfully handed over to customer', date: 'Sep 11, 04:30 PM', completed: true, current: true }
    ]
  },
  {
    id: 'ord-10740',
    orderNumber: 'UC-74019',
    date: '2026-08-18T16:45:00Z',
    items: [
      {
        id: 'prod-09-Sand White-',
        product: PRODUCTS.find(p => p.id === 'prod-09') || PRODUCTS[8],
        quantity: 2,
        selectedColor: 'Sand White'
      }
    ],
    customer: {
      fullName: 'Humayoon Khan',
      email: 'humayoonkhan003@gmail.com',
      phone: '+92 300 1234567'
    },
    shippingAddress: {
      address: 'House 42, Street 14, Sector F-7/2',
      city: 'Islamabad',
      province: 'Federal Capital',
      postalCode: '44000',
      country: 'Pakistan'
    },
    deliveryMethod: {
      id: 'standard',
      title: 'Standard Tracked Delivery',
      subtitle: '3-5 Business Days',
      price: 0,
      estimatedDays: '3-5 business days'
    },
    paymentMethod: 'card',
    subtotal: 10400,
    shippingFee: 0,
    discountAmount: 0,
    total: 10400,
    status: 'Delivered',
    trackingSteps: [
      { title: 'Order Placed', description: 'Demo order confirmed', date: 'Aug 18, 04:45 PM', completed: true, current: false },
      { title: 'Processing & Packed', description: 'Carefully packaged with shock foam', date: 'Aug 19, 11:00 AM', completed: true, current: false },
      { title: 'In Transit', description: 'In transit', date: 'Aug 20, 01:30 PM', completed: true, current: false },
      { title: 'Delivered', description: 'Delivered to door', date: 'Aug 21, 05:00 PM', completed: true, current: true }
    ]
  }
];

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Theme
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('urbancart_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('urbancart_theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.warn('localStorage error', e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Currency
  const [currency, setCurrency] = useState<'PKR' | 'USD' | 'EUR'>('PKR');

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('urbancart_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: 'prod-01-Obsidian Black-M',
          product: PRODUCTS[0],
          quantity: 1,
          selectedColor: 'Obsidian Black',
          selectedSize: 'M'
        },
        {
          id: 'prod-14-Stealth Black-',
          product: PRODUCTS[13],
          quantity: 1,
          selectedColor: 'Stealth Black'
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('urbancart_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('localStorage cart save error', e);
    }
  }, [cart]);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('urbancart_wishlist');
      return saved ? JSON.parse(saved) : ['prod-02', 'prod-05', 'prod-09', 'prod-10'];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('urbancart_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('localStorage wishlist save error', e);
    }
  }, [wishlist]);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('urbancart_orders');
      return saved ? JSON.parse(saved) : INITIAL_DEMO_ORDERS;
    } catch {
      return INITIAL_DEMO_ORDERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('urbancart_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('localStorage orders save error', e);
    }
  }, [orders]);

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('urbancart_user_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('urbancart_user_profile', JSON.stringify(userProfile));
    } catch (e) {
      console.warn('localStorage profile save error', e);
    }
  }, [userProfile]);

  // Promo Code
  const [promoCode, setPromoCode] = useState<PromoCode | null>(null);

  // Search, modal, toast states
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('urbancart_recent_searches');
      return saved ? JSON.parse(saved) : ['Headphones', 'Minimal leather', 'Jacket', 'Lamp'];
    } catch {
      return ['Headphones', 'Minimal leather', 'Jacket', 'Lamp'];
    }
  });

  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('urbancart_recently_viewed');
      return saved ? JSON.parse(saved) : ['prod-01', 'prod-05', 'prod-09'];
    } catch {
      return ['prod-01', 'prod-05'];
    }
  });

  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const showToast = (
    title: string,
    message: string,
    type: 'success' | 'info' | 'warning' = 'success',
    action?: { label: string; onClick: () => void }
  ) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev.slice(-4), { id, title, message, type, action }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addRecentSearch = (query: string) => {
    if (!query.trim()) return;
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s.toLowerCase() !== query.toLowerCase());
      const updated = [query.trim(), ...filtered].slice(0, 8);
      try {
        localStorage.setItem('urbancart_recent_searches', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const trackProductView = (productId: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== productId);
      const updated = [productId, ...filtered].slice(0, 10);
      try {
        localStorage.setItem('urbancart_recently_viewed', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Cart actions
  const addToCart = (
    product: Product,
    quantity: number = 1,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    const color = selectedColor || (product.colors && product.colors.length > 0 ? product.colors[0].name : undefined);
    const size = selectedSize || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined);
    const cartItemId = `${product.id}-${color || ''}-${size || ''}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { id: cartItemId, product, quantity, selectedColor: color, selectedSize: size }];
      }
    });

    showToast('Added to Cart', `${product.name} (x${quantity}) is now in your cart.`);
  };

  const removeFromCart = (cartItemId: string) => {
    const item = cart.find(i => i.id === cartItemId);
    setCart(prev => prev.filter(i => i.id !== cartItemId));
    if (item) {
      showToast('Item Removed', `${item.product.name} was removed from your cart.`, 'info');
    }
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cart]);

  const cartDiscount = useMemo(() => {
    if (!promoCode) return 0;
    return Math.round((cartSubtotal * promoCode.discountPercent) / 100);
  }, [cartSubtotal, promoCode]);

  const shippingFee = useMemo(() => {
    if (cartSubtotal === 0) return 0;
    if (cartSubtotal >= FREE_SHIPPING_THRESHOLD) return 0;
    return STANDARD_SHIPPING_FEE;
  }, [cartSubtotal]);

  const cartTotal = useMemo(() => {
    return Math.max(0, cartSubtotal - cartDiscount + shippingFee);
  }, [cartSubtotal, cartDiscount, shippingFee]);

  const progressToFreeShipping = useMemo(() => {
    if (cartSubtotal >= FREE_SHIPPING_THRESHOLD) return 100;
    return Math.min(100, Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100));
  }, [cartSubtotal]);

  // Wishlist actions
  const toggleWishlist = (productId: string) => {
    const product = PRODUCTS.find(p => p.id === productId);
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist', `${product?.name || 'Product'} removed from saved items.`, 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to Wishlist', `${product?.name || 'Product'} added to your wishlist.`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const wishlistProducts = useMemo(() => {
    return PRODUCTS.filter(p => wishlist.includes(p.id));
  }, [wishlist]);

  // Promo Code
  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'URBAN10') {
      setPromoCode({ code: 'URBAN10', discountPercent: 10, description: '10% Sitewide Concept Discount' });
      showToast('Promo Code Applied!', '10% discount has been applied to your cart.', 'success');
      return { success: true, message: '10% discount applied!' };
    }
    if (cleanCode === 'WELCOME20') {
      setPromoCode({ code: 'WELCOME20', discountPercent: 20, description: '20% Welcome Voucher' });
      showToast('Welcome Voucher Applied!', '20% discount applied.', 'success');
      return { success: true, message: '20% welcome discount applied!' };
    }
    if (cleanCode === 'FREESHIP') {
      setPromoCode({ code: 'FREESHIP', discountPercent: 5, description: 'Free Shipping Voucher' });
      showToast('Promo Applied!', 'Voucher applied.', 'success');
      return { success: true, message: 'Special voucher applied!' };
    }
    showToast('Invalid Promo Code', 'Try using URBAN10 or WELCOME20 for testing.', 'warning');
    return { success: false, message: 'Invalid code. Try "URBAN10" or "WELCOME20"' };
  };

  const removePromoCode = () => {
    setPromoCode(null);
    showToast('Promo Removed', 'Discount removed from order.', 'info');
  };

  // Place Order
  const placeOrder = (orderPayload: {
    customer: Order['customer'];
    shippingAddress: Order['shippingAddress'];
    deliveryMethod: Order['deliveryMethod'];
    paymentMethod: Order['paymentMethod'];
  }): Order => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `UC-${randomSuffix}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      date: new Date().toISOString(),
      items: [...cart],
      customer: orderPayload.customer,
      shippingAddress: orderPayload.shippingAddress,
      deliveryMethod: orderPayload.deliveryMethod,
      paymentMethod: orderPayload.paymentMethod,
      subtotal: cartSubtotal,
      shippingFee: cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : orderPayload.deliveryMethod.price,
      discountAmount: cartDiscount,
      promoCodeApplied: promoCode?.code,
      total: Math.max(0, cartSubtotal - cartDiscount + (cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : orderPayload.deliveryMethod.price)),
      status: 'Processing',
      trackingSteps: [
        {
          title: 'Order Placed',
          description: 'Demo order confirmed and logged in browser storage.',
          date: 'Just now',
          completed: true,
          current: true
        },
        {
          title: 'Packaging & Quality Check',
          description: 'Preparing demo package for dispatch.',
          date: 'Pending',
          completed: false,
          current: false
        },
        {
          title: 'Out for Delivery',
          description: 'With local courier partner.',
          date: 'Pending',
          completed: false,
          current: false
        },
        {
          title: 'Delivered',
          description: 'Package delivered to recipient.',
          date: 'Pending',
          completed: false,
          current: false
        }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    // Reward points for order: 1 point per 50 PKR
    const pointsEarned = Math.floor(newOrder.total / 50);
    setUserProfile(prev => ({
      ...prev,
      rewardPoints: prev.rewardPoints + pointsEarned
    }));

    clearCart();
    setPromoCode(null);

    return newOrder;
  };

  const getOrderById = (orderId: string) => {
    return orders.find(o => o.id === orderId || o.orderNumber === orderId);
  };

  // Profile actions
  const updateProfile = (updated: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updated }));
    showToast('Profile Updated', 'Your profile details have been saved.');
  };

  const addAddress = (address: Omit<SavedAddress, 'id'>) => {
    const newAddr: SavedAddress = {
      ...address,
      id: `addr-${Date.now()}`
    };
    setUserProfile(prev => {
      const updatedAddresses = address.isDefault
        ? prev.addresses.map(a => ({ ...a, isDefault: false })).concat(newAddr)
        : [...prev.addresses, newAddr];
      return { ...prev, addresses: updatedAddresses };
    });
    showToast('Address Added', `${address.label} was added to your address book.`);
  };

  const deleteAddress = (id: string) => {
    setUserProfile(prev => ({
      ...prev,
      addresses: prev.addresses.filter(a => a.id !== id)
    }));
    showToast('Address Removed', 'Address deleted.', 'info');
  };

  const setDefaultAddress = (id: string) => {
    setUserProfile(prev => ({
      ...prev,
      addresses: prev.addresses.map(a => ({ ...a, isDefault: a.id === id }))
    }));
    showToast('Default Address Set', 'Preferred shipping address updated.');
  };

  // Formatting currency
  const formatPrice = (amountInPKR: number): string => {
    if (currency === 'USD') {
      // 1 USD approx 278 PKR
      const usd = (amountInPKR / 278).toFixed(2);
      return `$${usd}`;
    }
    if (currency === 'EUR') {
      // 1 EUR approx 302 PKR
      const eur = (amountInPKR / 302).toFixed(2);
      return `€${eur}`;
    }
    return `PKR ${amountInPKR.toLocaleString('en-PK')}`;
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        orders,
        userProfile,
        theme,
        currency,
        promoCode,
        recentSearches,
        recentlyViewed,
        toasts,
        quickViewProduct,
        isSearchOpen,
        isMobileMenuOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartDiscount,
        shippingFee,
        cartTotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        progressToFreeShipping,
        toggleWishlist,
        isInWishlist,
        wishlistProducts,
        applyPromoCode,
        removePromoCode,
        placeOrder,
        getOrderById,
        updateProfile,
        addAddress,
        deleteAddress,
        setDefaultAddress,
        toggleTheme,
        setCurrency,
        formatPrice,
        showToast,
        removeToast,
        setQuickViewProduct,
        setIsSearchOpen,
        setIsMobileMenuOpen,
        addRecentSearch,
        trackProductView
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
