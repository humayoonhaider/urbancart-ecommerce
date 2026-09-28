export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  avatar?: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: 'Fashion' | 'Electronics' | 'Home & Living' | 'Accessories' | 'Beauty' | 'Lifestyle';
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  badge?: string;
  images: string[];
  description: string;
  detailedDescription?: string;
  features: string[];
  specs?: Record<string, string>;
  colors?: ProductColor[];
  sizes?: string[];
  tags: string[];
  reviews?: Review[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
  featuredTag: string;
}

export interface CartItem {
  id: string; // unique item key: `${productId}-${selectedColor}-${selectedSize}`
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
}

export interface ShippingAddress {
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface DeliveryMethod {
  id: 'standard' | 'express';
  title: string;
  subtitle: string;
  price: number;
  estimatedDays: string;
}

export interface TrackingStep {
  title: string;
  description: string;
  date: string;
  completed: boolean;
  current: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  customer: CustomerInfo;
  shippingAddress: ShippingAddress;
  deliveryMethod: DeliveryMethod;
  paymentMethod: 'card' | 'easypaisa' | 'jazzcash' | 'bank' | 'cod';
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  promoCodeApplied?: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  trackingSteps: TrackingStep[];
}

export interface SavedAddress extends ShippingAddress {
  id: string;
  label: string;
  isDefault: boolean;
}

export interface SavedCard {
  id: string;
  cardHolder: string;
  lastFour: string;
  expiry: string;
  brand: 'visa' | 'mastercard' | 'amex';
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  memberSince: string;
  tier: 'Silver Member' | 'Gold Member' | 'Platinum Member';
  rewardPoints: number;
  addresses: SavedAddress[];
  savedCards: SavedCard[];
  marketingOptIn: boolean;
}

export interface FilterState {
  search: string;
  categories: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  sortBy: 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating';
}
