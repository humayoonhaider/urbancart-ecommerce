import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // Fashion
  {
    id: 'prod-01',
    name: 'Aero Essential Jacket',
    slug: 'aero-essential-jacket',
    brand: 'Aero Studio',
    category: 'Fashion',
    price: 8900,
    originalPrice: 11500,
    discount: 22,
    rating: 4.8,
    reviewsCount: 42,
    inStock: true,
    stockCount: 18,
    isFeatured: true,
    isBestseller: true,
    badge: 'Bestseller',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A lightweight, weather-resistant transitional jacket with tailored ergonomic cuts and breathable mesh lining.',
    detailedDescription: 'The Aero Essential Jacket is engineered for urban commuters who demand elegance without compromising on functional weather protection. Crafted with an ultra-durable matte polyester shell treated with a non-toxic water-repellent finish, it features YKK waterproof zippers, interior phone stash pockets, and an adjustable cinch hem.',
    features: [
      'Water-repellent matte twill outer shell',
      'Thermal micro-fleece internal collar',
      'Concealed double-entry hand pockets',
      'Reinforced seams for extended durability'
    ],
    specs: {
      'Material': '100% Recycled Poly-Twill',
      'Fit': 'Modern Relaxed',
      'Care': 'Machine wash cold, air dry',
      'Origin': 'Fictional Craft Studio'
    },
    colors: [
      { name: 'Obsidian Black', hex: '#1C1C1E' },
      { name: 'Sage Olive', hex: '#4A5B4E' },
      { name: 'Sand Taupe', hex: '#C2B69D' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['outerwear', 'jacket', 'waterproof', 'urban'],
    reviews: [
      {
        id: 'rev-1',
        author: 'Hamza Tariq',
        rating: 5,
        date: '2026-08-14',
        comment: 'Exceptional material quality and clean stitching. The fit is spot-on for daily commute.',
        verified: true
      },
      {
        id: 'rev-2',
        author: 'Zainab Bilal',
        rating: 4,
        date: '2026-08-02',
        comment: 'Very lightweight yet keeps chilly evening winds away. Pockets are well placed.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-02',
    name: 'Urban Classic Sneakers',
    slug: 'urban-classic-sneakers',
    brand: 'UrbanCore',
    category: 'Fashion',
    price: 12500,
    originalPrice: 15000,
    discount: 16,
    rating: 4.9,
    reviewsCount: 88,
    inStock: true,
    stockCount: 12,
    isFeatured: true,
    isBestseller: true,
    badge: 'Popular',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Minimalist leather cupsole sneakers designed for all-day cushioning and timeless city aesthetics.',
    detailedDescription: 'Handmade with supple micro-grain vegan leather and an engineered EVA bounce insole, the Urban Classic Sneaker pairs effortlessly with tailored trousers or casual denim. High-traction rubber outsoles ensure stable grip in any weather.',
    features: [
      'Supple micro-grain exterior leather',
      'Shock-absorbing memory foam footbed',
      'Non-marking vulcanized rubber outsole',
      'Antimicrobial organic cotton lining'
    ],
    specs: {
      'Sole': 'Natural Vulcanized Rubber',
      'Insole': 'High-density Ortho-foam',
      'Laces': 'Waxed organic cotton',
      'Weight': '360g per shoe'
    },
    colors: [
      { name: 'Monochrome White', hex: '#FFFFFF' },
      { name: 'Carbon Black', hex: '#222222' },
      { name: 'Alabaster Grey', hex: '#D1D5DB' }
    ],
    sizes: ['40', '41', '42', '43', '44', '45'],
    tags: ['footwear', 'sneakers', 'leather', 'comfort'],
    reviews: [
      {
        id: 'rev-3',
        author: 'Usman Ali',
        rating: 5,
        date: '2026-09-10',
        comment: 'Hands down the most comfortable minimalist sneakers I have ever owned. Super easy to clean.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-03',
    name: 'Everyday Overshirt',
    slug: 'everyday-overshirt',
    brand: 'North & Co.',
    category: 'Fashion',
    price: 6800,
    originalPrice: 8000,
    discount: 15,
    rating: 4.7,
    reviewsCount: 29,
    inStock: true,
    stockCount: 24,
    badge: 'New',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Heavyweight brushed cotton overshirt with utility chest pockets and horn buttons.',
    detailedDescription: 'The Everyday Overshirt is a versatile layer that can be worn over a tee or buttoned under an overcoat. Built from 320 GSM brushed organic cotton canvas that softens with every wash.',
    features: [
      'Heavyweight 320 GSM organic cotton',
      'Dual reinforced utility chest pockets',
      'Structured collar that retains shape',
      'Horn effect matte buttons'
    ],
    specs: {
      'Material': '100% Organic Brushed Cotton',
      'Fit': 'Boxy Relaxed',
      'Pattern': 'Solid Twill Weave'
    },
    colors: [
      { name: 'Oatmeal Khaki', hex: '#D7C4B7' },
      { name: 'Navy Blue', hex: '#1E3A8A' },
      { name: 'Olive Green', hex: '#3B4E3B' }
    ],
    sizes: ['M', 'L', 'XL'],
    tags: ['shirt', 'overshirt', 'cotton', 'layering']
  },
  {
    id: 'prod-04',
    name: 'Merino Wool Knit Beanie',
    slug: 'merino-wool-knit-beanie',
    brand: 'North & Co.',
    category: 'Fashion',
    price: 2400,
    originalPrice: 3000,
    discount: 20,
    rating: 4.6,
    reviewsCount: 19,
    inStock: true,
    stockCount: 30,
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Ultra-fine ribbed merino wool beanie providing natural thermoregulation and itch-free softness.',
    detailedDescription: 'Spun from 19.5-micron ethical merino wool yarn, this rib-knit beanie offers exceptional warmth while naturally resisting odors and moisture.',
    features: [
      '100% Extrafine Merino Wool',
      'Naturally antibacterial and moisture-wicking',
      'Foldable double-layer cuff',
      'Seamless 3D circular knit'
    ],
    colors: [
      { name: 'Charcoal', hex: '#333333' },
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Forest', hex: '#2D4A3E' }
    ],
    tags: ['accessories', 'beanie', 'winter', 'wool']
  },

  // Electronics
  {
    id: 'prod-05',
    name: 'Nova Wireless Headphones',
    slug: 'nova-wireless-headphones',
    brand: 'NovaLine',
    category: 'Electronics',
    price: 18900,
    originalPrice: 22500,
    discount: 16,
    rating: 4.9,
    reviewsCount: 114,
    inStock: true,
    stockCount: 15,
    isFeatured: true,
    isBestseller: true,
    badge: 'Featured',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Active hybrid noise-canceling headphones with 40mm beryllium drivers and 45-hour battery life.',
    detailedDescription: 'The Nova Wireless Headphones deliver studio-grade acoustic clarity with dynamic bass and pristine highs. Featuring five ambient mics for crystal clear calls and spatial audio tracking, they are wrapped in memory foam cushions with breathable lambskin-soft covers.',
    features: [
      'Active Hybrid ANC with Transparency Mode',
      'Custom tuned 40mm Beryllium Drivers',
      '45-Hour playback with Quick Charge (10m = 5h)',
      'Multipoint Bluetooth 5.3 instant pairing'
    ],
    specs: {
      'Frequency Response': '10Hz - 40,000Hz',
      'Battery': '800mAh Lithium-Ion',
      'Charging Port': 'USB-C Fast Charging',
      'Weight': '255 grams'
    },
    colors: [
      { name: 'Midnight Matte', hex: '#111827' },
      { name: 'Titanium Silver', hex: '#9CA3AF' },
      { name: 'Warm Cream', hex: '#E5E0D8' }
    ],
    tags: ['audio', 'headphones', 'bluetooth', 'anc'],
    reviews: [
      {
        id: 'rev-4',
        author: 'Saad Farooq',
        rating: 5,
        date: '2026-09-01',
        comment: 'Sound stage is wide and ANC blocks out airplane drone completely. Build quality feels ultra premium.',
        verified: true
      }
    ]
  },
  {
    id: 'prod-06',
    name: 'Pulse Smart Watch',
    slug: 'pulse-smart-watch',
    brand: 'NovaLine',
    category: 'Electronics',
    price: 14500,
    originalPrice: 17000,
    discount: 14,
    rating: 4.8,
    reviewsCount: 63,
    inStock: true,
    stockCount: 20,
    isFeatured: true,
    badge: 'Trending',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'AMOLED edge-to-edge smartwatch with continuous health tracking, GPS, and 10-day battery life.',
    detailedDescription: 'Crafted with an aerospace aluminum frame and sapphire crystal glass, the Pulse Smart Watch tracks SpO2, HRV, sleep cycles, and over 90 sports modes with surgical accuracy. 5ATM water resistance allows for open-water swimming.',
    features: [
      '1.43" Ultra-Bright AMOLED (1000 nits)',
      'Continuous Optical Heart Rate & SpO2',
      'Dual-frequency Precision GNSS GPS',
      '5ATM Water Resistance (50m depth)'
    ],
    specs: {
      'Display': '1.43" AMOLED 466x466',
      'Case': 'Aerospace Grade 6000 Aluminum',
      'Battery Life': 'Up to 10 Days typical use',
      'Compatibility': 'iOS & Android'
    },
    colors: [
      { name: 'Space Gray', hex: '#374151' },
      { name: 'Starlight Silver', hex: '#E5E7EB' },
      { name: 'Rose Gold', hex: '#E0B0B0' }
    ],
    tags: ['smartwatch', 'fitness', 'wearable', 'gps']
  },
  {
    id: 'prod-07',
    name: 'Orbit Portable Speaker',
    slug: 'orbit-portable-speaker',
    brand: 'Orbit',
    category: 'Electronics',
    price: 9800,
    originalPrice: 12000,
    discount: 18,
    rating: 4.7,
    reviewsCount: 51,
    inStock: true,
    stockCount: 14,
    badge: 'Sale',
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1000&q=80'
    ],
    description: '360-degree omnidirectional waterproof Bluetooth speaker with rich bass radiators.',
    detailedDescription: 'The Orbit Speaker delivers immersive, room-filling sound in a rugged IPX7 waterproof casing. Dual passive radiators enhance low frequencies while the acoustic mesh grille provides 360-degree audio dispersion.',
    features: [
      '360-Degree spatial acoustic design',
      'IPX7 Complete waterproof submersible',
      '20-Hour long battery on single charge',
      'True Wireless Stereo pairing support'
    ],
    colors: [
      { name: 'Basalt Black', hex: '#18181B' },
      { name: 'Slate Teal', hex: '#0F766E' },
      { name: 'Terracotta', hex: '#9A3412' }
    ],
    tags: ['speaker', 'audio', 'portable', 'waterproof']
  },
  {
    id: 'prod-08',
    name: 'Studio Wireless Charger Pad',
    slug: 'studio-wireless-charger-pad',
    brand: 'NovaLine',
    category: 'Electronics',
    price: 4600,
    originalPrice: 5500,
    discount: 16,
    rating: 4.6,
    reviewsCount: 38,
    inStock: true,
    stockCount: 22,
    images: [
      'https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Machined aluminum fast wireless charging pad with weighted non-slip Italian leather pad.',
    detailedDescription: 'A refined desktop charging pad supporting up to 15W Qi2 fast charging. Features thermal dissipation channels and auto-sensing safety shutoff.',
    features: [
      '15W Qi2 Fast Wireless standard',
      'Solid CNC anodized aluminum base',
      'Premium vegan leather top surface',
      'Braided 1.5m USB-C cable included'
    ],
    colors: [
      { name: 'Matte Gunmetal', hex: '#4B5563' },
      { name: 'Silver Oak', hex: '#D1D5DB' }
    ],
    tags: ['charger', 'desk', 'wireless', 'accessories']
  },

  // Home & Living
  {
    id: 'prod-09',
    name: 'Luma Table Lamp',
    slug: 'luma-table-lamp',
    brand: 'Luma',
    category: 'Home & Living',
    price: 5200,
    originalPrice: 6500,
    discount: 20,
    rating: 4.8,
    reviewsCount: 77,
    inStock: true,
    stockCount: 16,
    isFeatured: true,
    isBestseller: true,
    badge: 'Design Award',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Sculptural dimmable LED ambiance table lamp with warm tone diffuser and brass accents.',
    detailedDescription: 'The Luma Lamp transforms any desk, credenza, or bedside table into an intimate oasis. With 3-step stepless touch dimming and a 2700K warm LED core, it casts gentle ambient reflections without glaring harshness.',
    features: [
      'Stepless touch-sensitive brass dimmer switch',
      'Eye-care flicker-free 2700K warm LED',
      'Heavy weighted cast iron stability base',
      'Energy efficient 7W consumption'
    ],
    colors: [
      { name: 'Sand White', hex: '#F3F4F6' },
      { name: 'Matte Charcoal', hex: '#27272A' },
      { name: 'Brushed Brass', hex: '#B45309' }
    ],
    tags: ['lighting', 'lamp', 'decor', 'minimal']
  },
  {
    id: 'prod-10',
    name: 'Nordic Lounge Chair',
    slug: 'nordic-lounge-chair',
    brand: 'North & Co.',
    category: 'Home & Living',
    price: 24000,
    originalPrice: 28000,
    discount: 14,
    rating: 4.9,
    reviewsCount: 31,
    inStock: true,
    stockCount: 6,
    isFeatured: true,
    badge: 'Staff Pick',
    images: [
      'https://images.unsplash.com/photo-1580481077195-749b5072051f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Solid ash wood armchair with ergonomic curved backrest and high-resilience boucle fabric.',
    detailedDescription: 'Crafted with steam-bent solid ash wood and upholstered in premium soft boucle, the Nordic Lounge Chair offers an inviting seating posture ideal for reading nooks and minimalist living spaces.',
    features: [
      'Solid FSC-certified Ash Wood frame',
      'Plush textured cream boucle upholstery',
      'Ergonomically contoured lumber curve',
      'Felt padded foot protectors included'
    ],
    specs: {
      'Dimensions': '78cm W x 82cm D x 74cm H',
      'Weight Capacity': '160 kg',
      'Assembly': 'Fully Assembled'
    },
    colors: [
      { name: 'Cream Boucle', hex: '#F5F5DC' },
      { name: 'Charcoal Weave', hex: '#374151' }
    ],
    tags: ['furniture', 'chair', 'interior', 'nordic']
  },
  {
    id: 'prod-11',
    name: 'Aero Ceramic Set',
    slug: 'aero-ceramic-set',
    brand: 'Aero Studio',
    category: 'Home & Living',
    price: 4500,
    originalPrice: 5500,
    discount: 18,
    rating: 4.7,
    reviewsCount: 44,
    inStock: true,
    stockCount: 20,
    badge: 'Handmade',
    images: [
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80'
    ],
    description: '4-piece artisanal stoneware mug and bowl set finished in subtle reactive glaze.',
    detailedDescription: 'Hand-thrown by master potters using raw speckled clay and dipped in a satin reactive mineral glaze. Microwave, dishwasher, and oven safe up to 220°C.',
    features: [
      '4-piece handcrafted tableware set',
      'Durable chip-resistant stoneware',
      'Dishwasher and microwave safe',
      'Unique reactive glaze finish on each piece'
    ],
    colors: [
      { name: 'Speckled Stone', hex: '#E2E8F0' },
      { name: 'Earthy Terracotta', hex: '#C27D56' }
    ],
    tags: ['ceramics', 'kitchen', 'stoneware', 'tableware']
  },
  {
    id: 'prod-12',
    name: 'Pure Linen Bedding Duvet Set',
    slug: 'pure-linen-bedding-duvet-set',
    brand: 'Luma',
    category: 'Home & Living',
    price: 13500,
    originalPrice: 16000,
    discount: 15,
    rating: 4.9,
    reviewsCount: 39,
    inStock: true,
    stockCount: 11,
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80'
    ],
    description: '100% French flax pre-washed linen duvet cover set with matching pillow shams.',
    detailedDescription: 'Woven from authentic French flax linen, our stonewashed bedding gets softer with every wash while offering natural year-round breathability.',
    features: [
      '100% French flax linen (175 GSM)',
      'Natural coconut shell button closures',
      'Internal corner ties to secure duvet',
      'Hypoallergenic and temperature regulating'
    ],
    colors: [
      { name: 'Natural Oatmeal', hex: '#D7C4B7' },
      { name: 'Misty Grey', hex: '#9CA3AF' },
      { name: 'Sage Leaf', hex: '#6B7280' }
    ],
    sizes: ['Queen', 'King'],
    tags: ['bedding', 'linen', 'bedroom', 'comfort']
  },

  // Accessories
  {
    id: 'prod-13',
    name: 'Minimal Leather Wallet',
    slug: 'minimal-leather-wallet',
    brand: 'UrbanCore',
    category: 'Accessories',
    price: 3200,
    originalPrice: 4000,
    discount: 20,
    rating: 4.8,
    reviewsCount: 96,
    inStock: true,
    stockCount: 35,
    isFeatured: true,
    badge: 'Popular',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Slim bifold card wallet made of vegetable-tanned full-grain leather with RFID blocking.',
    detailedDescription: 'Engineered for pocket minimalism, holds up to 8 cards and folded banknotes without bulging. Features built-in RFID shielding to protect your cards from wireless theft.',
    features: [
      'Top-grain vegetable-tanned leather',
      'RFID protection layer on all slots',
      'Quick-draw front card access slot',
      'Ultra-thin 6mm empty profile'
    ],
    colors: [
      { name: 'Whiskey Tan', hex: '#8B5A2B' },
      { name: 'Midnight Black', hex: '#1C1C1E' },
      { name: 'Deep Mahogany', hex: '#4A2C2A' }
    ],
    tags: ['wallet', 'leather', 'accessories', 'edc']
  },
  {
    id: 'prod-14',
    name: 'Urban Crossbody Bag',
    slug: 'urban-crossbody-bag',
    brand: 'UrbanCore',
    category: 'Accessories',
    price: 6900,
    originalPrice: 8500,
    discount: 18,
    rating: 4.9,
    reviewsCount: 72,
    inStock: true,
    stockCount: 17,
    isFeatured: true,
    isBestseller: true,
    badge: 'Bestseller',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Weatherproof 4L sling bag with magnetic Fidlock buckle and padded tablet sleeve.',
    detailedDescription: 'The ultimate daily companion for urban exploration. Constructed with 500D Cordura ballistic nylon and sealed YKK aquaguard zippers to protect tech devices.',
    features: [
      'Weather-resistant 500D Cordura Nylon',
      'German Fidlock magnetic quick-release strap',
      'Padded compartment holds up to 11" tablets',
      'Hidden passport and keys organizer pocket'
    ],
    colors: [
      { name: 'Stealth Black', hex: '#111827' },
      { name: 'Concrete Grey', hex: '#6B7280' },
      { name: 'Coyote Sand', hex: '#A89F91' }
    ],
    tags: ['bag', 'sling', 'crossbody', 'travel']
  },
  {
    id: 'prod-15',
    name: 'Classic Metal Watch',
    slug: 'classic-metal-watch',
    brand: 'North & Co.',
    category: 'Accessories',
    price: 11500,
    originalPrice: 14000,
    discount: 17,
    rating: 4.8,
    reviewsCount: 47,
    inStock: true,
    stockCount: 14,
    badge: 'Timeless',
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80'
    ],
    description: '316L stainless steel analog watch with Japanese Miyota quartz movement and date window.',
    detailedDescription: 'Minimalist Bauhaus inspired dial encased in brushed stainless steel with scratch-resistant sapphire coated crystal and an interchangeable mesh strap.',
    features: [
      'Precision Japanese Miyota Quartz Movement',
      '316L Surgical-Grade Stainless Steel',
      'Sapphire coated scratch-proof crystal',
      '50m / 5 ATM Water Resistance'
    ],
    colors: [
      { name: 'Silver Mesh', hex: '#D1D5DB' },
      { name: 'Matte Black', hex: '#1F2937' },
      { name: 'Gold Dial', hex: '#D97706' }
    ],
    tags: ['watch', 'analog', 'steel', 'classic']
  },
  {
    id: 'prod-16',
    name: 'Acetate Polarized Sunglasses',
    slug: 'acetate-polarized-sunglasses',
    brand: 'North & Co.',
    category: 'Accessories',
    price: 4900,
    originalPrice: 6000,
    discount: 18,
    rating: 4.7,
    reviewsCount: 33,
    inStock: true,
    stockCount: 28,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Hand-polished cellulose acetate frames with category 3 UV400 polarized optics.',
    detailedDescription: 'Featuring custom barrel hinges and anti-reflective internal coatings, these sunglasses combine vintage silhouette styling with modern optical clarity.',
    features: [
      'Cellulose Italian bio-acetate frames',
      'UV400 100% UVA/UVB polarized lenses',
      'Reinforced five-barrel stainless hinges',
      'Includes hard case and micro-fiber cloth'
    ],
    colors: [
      { name: 'Tortoise Shell', hex: '#78350F' },
      { name: 'Gloss Black', hex: '#18181B' }
    ],
    tags: ['sunglasses', 'eyewear', 'uv400', 'acetate']
  },

  // Beauty
  {
    id: 'prod-17',
    name: 'Botanical Hydrating Facial Serum',
    slug: 'botanical-hydrating-facial-serum',
    brand: 'Pure Glow',
    category: 'Beauty',
    price: 3800,
    originalPrice: 4800,
    discount: 20,
    rating: 4.9,
    reviewsCount: 84,
    inStock: true,
    stockCount: 26,
    isFeatured: true,
    badge: 'Organic',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1608248597359-251f9a2e6121?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Triple-weight hyaluronic acid serum enriched with niacinamide and botanical rosehip extract.',
    detailedDescription: 'A deeply hydrating elixir that locks in moisture, refines skin barrier elasticity, and provides a dewy natural radiance. Formulated without synthetic fragrances or parabens.',
    features: [
      'Triple-weight Hyaluronic Acid (2%)',
      '5% Niacinamide for pore refinement',
      'Cold-pressed Organic Rosehip seed oil',
      '100% Vegan and Leaping Bunny cruelty-free'
    ],
    specs: {
      'Volume': '50 ml / 1.7 fl oz',
      'Skin Type': 'All skin types, sensitive friendly',
      'Texture': 'Silky fast-absorbing liquid'
    },
    tags: ['skincare', 'serum', 'hyaluronic', 'glow']
  },
  {
    id: 'prod-18',
    name: 'Organic Cedarwood & Sage Body Wash',
    slug: 'organic-cedarwood-sage-body-wash',
    brand: 'Pure Glow',
    category: 'Beauty',
    price: 2600,
    originalPrice: 3200,
    discount: 18,
    rating: 4.8,
    reviewsCount: 52,
    inStock: true,
    stockCount: 40,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Invigorating plant-based body cleanser scented with essential oils of atlas cedarwood and clary sage.',
    detailedDescription: 'Formulated with soothing aloe vera juice and antioxidant rich green tea leaf extract. Leaves skin supple, refreshed, and subtly aromatic.',
    features: [
      'Sulfate-free biodegradable foaming base',
      'Pure essential oil botanical aromatics',
      'Infused with provitamin B5 (Panthenol)',
      'Recycled amber pump bottle'
    ],
    specs: {
      'Volume': '500 ml / 16.9 fl oz',
      'Packaging': '100% Post-consumer recycled PET'
    },
    tags: ['bodywash', 'shower', 'organic', 'essential-oils']
  },
  {
    id: 'prod-19',
    name: 'Aromatherapy Soy Wax Candle',
    slug: 'aromatherapy-soy-wax-candle',
    brand: 'Pure Glow',
    category: 'Beauty',
    price: 2900,
    originalPrice: 3500,
    discount: 17,
    rating: 4.7,
    reviewsCount: 41,
    inStock: true,
    stockCount: 30,
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Hand-poured 100% natural soy wax candle in matte glass vessel with notes of amber and smoked oud.',
    detailedDescription: 'Features a natural lead-free cotton wick providing a clean 55-hour burn without soot. Creates a calming ambiance for meditation or relaxation.',
    features: [
      '55+ Hours of slow clean burn',
      '100% Renewable plant-based soy wax',
      'Phthalate-free premium fragrance oils',
      'Reusable heavyweight frosted glass tumbler'
    ],
    colors: [
      { name: 'Amber Oud', hex: '#92400E' },
      { name: 'White Santal', hex: '#E5E7EB' }
    ],
    tags: ['candle', 'aromatherapy', 'home-fragrance', 'relax']
  },
  {
    id: 'prod-20',
    name: 'Restorative Lip Balm Duo',
    slug: 'restorative-lip-balm-duo',
    brand: 'Pure Glow',
    category: 'Beauty',
    price: 1800,
    originalPrice: 2200,
    discount: 18,
    rating: 4.9,
    reviewsCount: 67,
    inStock: true,
    stockCount: 50,
    badge: 'Bestseller',
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Intense peptide and shea butter lip treatment that repairs dry lips with a velvety finish.',
    detailedDescription: 'Pack of two nourishing balms: Mint Leaf for refreshing day wear, and Vanilla Chamomile for overnight moisture recovery.',
    features: [
      'Raw organic shea and cocoa seed butters',
      'Plant squalane and vitamin E complex',
      'Non-sticky velvet cushion finish',
      'Biodegradable paperboard tube packaging'
    ],
    tags: ['lipbalm', 'beauty', 'skincare', 'organic']
  },

  // Lifestyle
  {
    id: 'prod-21',
    name: 'Vacuum Insulated Thermal Bottle (750ml)',
    slug: 'vacuum-insulated-thermal-bottle',
    brand: 'Orbit',
    category: 'Lifestyle',
    price: 3400,
    originalPrice: 4200,
    discount: 19,
    rating: 4.8,
    reviewsCount: 89,
    inStock: true,
    stockCount: 35,
    isFeatured: true,
    badge: 'Eco Pick',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Double-wall vacuum flask keeping cold drinks chilled for 24 hours and hot coffee for 12 hours.',
    detailedDescription: 'Crafted with pro-grade 18/8 food stainless steel with a sweat-free powder coat grip. Completely BPA-free with a silicone leakproof gasket seal.',
    features: [
      'TempShield double-wall vacuum insulation',
      '18/8 Food-grade stainless steel interior',
      'Zero condensation sweat-free matte finish',
      'Cup holder compatible base'
    ],
    colors: [
      { name: 'Matte Olive', hex: '#3F4E3F' },
      { name: 'Arctic White', hex: '#F9FAFB' },
      { name: 'Carbon Black', hex: '#18181B' },
      { name: 'Pacific Navy', hex: '#1E3A8A' }
    ],
    tags: ['bottle', 'hydration', 'thermal', 'travel']
  },
  {
    id: 'prod-22',
    name: 'Ergonomic Desk Felt Mat',
    slug: 'ergonomic-desk-felt-mat',
    brand: 'Aero Studio',
    category: 'Lifestyle',
    price: 2800,
    originalPrice: 3500,
    discount: 20,
    rating: 4.7,
    reviewsCount: 58,
    inStock: true,
    stockCount: 25,
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Extra-large wool felt desk blotter pad with anti-slip natural rubber backing and stitched border.',
    detailedDescription: 'Protects your workspace while providing an ultra-smooth glide surface for mice and a comfortable cushion for typing wrists. 90cm x 40cm large coverage.',
    features: [
      'Premium 3mm compressed merino wool felt',
      'Natural textured anti-slip rubber underside',
      'Laser-cut precision anti-fray edging',
      'Water and dust resistant surface treat'
    ],
    colors: [
      { name: 'Dark Heather Grey', hex: '#374151' },
      { name: 'Light Silver Grey', hex: '#9CA3AF' }
    ],
    tags: ['desk', 'workspace', 'felt', 'office']
  },
  {
    id: 'prod-23',
    name: 'Modula Travel Duffel 45L',
    slug: 'modula-travel-duffel-45l',
    brand: 'UrbanCore',
    category: 'Lifestyle',
    price: 15500,
    originalPrice: 18500,
    discount: 16,
    rating: 4.9,
    reviewsCount: 43,
    inStock: true,
    stockCount: 9,
    badge: 'Pro Travel',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Water-resistant weekender duffel with dedicated ventilated shoe compartment and luggage pass-through.',
    detailedDescription: 'Cabin-approved carry-on size. Transforms smoothly from handheld duffel to backpack with hideaway ergonomic shoulder straps.',
    features: [
      'Airline carry-on approved dimensions',
      'Isolated ventilated footwear compartment',
      'Luggage trolley handle pass-through strap',
      '1680D Ballistic ripstop exterior'
    ],
    colors: [
      { name: 'Graphite', hex: '#262626' },
      { name: 'Navy Stone', hex: '#1E293B' }
    ],
    tags: ['duffel', 'travel', 'luggage', 'weekender']
  },
  {
    id: 'prod-24',
    name: 'Organic Cork Yoga & Fitness Mat',
    slug: 'organic-cork-yoga-mat',
    brand: 'Orbit',
    category: 'Lifestyle',
    price: 5800,
    originalPrice: 7000,
    discount: 17,
    rating: 4.8,
    reviewsCount: 36,
    inStock: true,
    stockCount: 15,
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Natural antimicrobial cork surface with biodegradable rubber base for non-slip grip.',
    detailedDescription: 'Cork naturally increases its grip as you sweat, making this 5mm thick mat ideal for hot yoga, Pilates, and daily stretching routines.',
    features: [
      'Natural high-grip organic cork surface',
      'High-density 5mm cushioning support',
      'Naturally odor and mildew resistant',
      'Includes 100% cotton carrying harness'
    ],
    tags: ['fitness', 'yoga', 'cork', 'wellness']
  }
];
