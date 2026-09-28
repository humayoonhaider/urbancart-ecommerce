import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'fashion',
    name: 'Fashion',
    slug: 'fashion',
    description: 'Clean modern silhouettes, premium textiles, and everyday tailoring built to last.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80',
    itemCount: 8,
    featuredTag: 'New Season'
  },
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Acoustic clarity, smart wearables, and streamlined workspace gear for modern living.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    itemCount: 6,
    featuredTag: 'Best Acoustic'
  },
  {
    id: 'home-living',
    name: 'Home & Living',
    slug: 'home-living',
    description: 'Minimalist lighting, artisanal ceramics, and architectural comfort for your sanctuary.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
    itemCount: 6,
    featuredTag: 'Interior Picks'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Full-grain leather goods, timeless metal watches, and precision engineered bags.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    itemCount: 5,
    featuredTag: 'Handcrafted'
  },
  {
    id: 'beauty',
    name: 'Beauty',
    slug: 'beauty',
    description: 'Botanical formulations, nourishing skincare essentials, and clean aromatherapy.',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80',
    itemCount: 4,
    featuredTag: '100% Vegan'
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    slug: 'lifestyle',
    description: 'Insulated thermal bottles, desk organizers, yoga gear, and travel luggage.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80',
    itemCount: 5,
    featuredTag: 'Daily Essentials'
  }
];
