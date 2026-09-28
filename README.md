# UrbanCart — Modern E-Commerce Platform Concept

> **Shop Better. Live Better.**  
> *Discover products you'll love, curated for modern everyday living.*

**UrbanCart** is a production-grade, 100% frontend-only e-commerce application built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**. Developed as a fictional portfolio and demonstration project by **SH Web Studio**, it highlights modern UI design, real-time spending telemetry, responsive catalogs, client-side session persistence, and simulated checkout flows.

---

## 🌟 Key Features

### 🛍️ Product Catalog & Discovery
* **24 Curated Fictional Products** across 6 primary categories: *Fashion, Electronics, Home & Living, Accessories, Beauty, and Lifestyle*.
* **Real-time Live Search** with modal autocomplete, recent query history, and category shortcuts.
* **Multi-dimensional Filtering**: Filter by category, price range slider (PKR 1,500 – 30,000+), minimum customer rating (4.0+ to 4.8+), stock status, and discount offerings.
* **Layout Switcher**: Toggle between 4-column grid, 3-column grid, and comprehensive list views.
* **Product Sorting**: Sort by Featured, Newest First, Price (Low to High / High to Low), and Highest Rated.

### 🖼️ Interactive Product Details & Quick View
* **Multi-Angle Gallery**: High-resolution zoom lightbox and responsive thumbnail navigation.
* **Variant Selectors**: Real-time color swatches with active ring indicators, sizing pickers, and accessible quantity counters.
* **Customer Reviews & Ratings**: Verified review breakdown bars with an interactive modal to submit new reviews.
* **Collapsible Accordions**: Detailed material specifications, delivery schedules, and maintenance guides.
* **Quick View Modal**: Inspect product variants and add directly to cart without page reloads.

### 🛒 Dynamic Cart & Promo Engine
* **Free Shipping Tracker**: Real-time visual progress bar targeting the **PKR 10,000 free delivery threshold**.
* **Promo Code Vouchers**: Support for demo coupons like `URBAN10` (10% off), `WELCOME20` (20% off), and `FREESHIP`.
* **State Management**: Full quantity adjustment, line-item recalculation, and instant deletion with toast notifications.

### ❤️ Persistent Wishlist
* Save favorite products locally in browser storage.
* Single-click **"Move All to Cart"** and rapid item toggle.

### 💳 Simulated Secure Checkout & Order Invoicing
* **Multi-Step Flow**: Contact Information, Address Book auto-selection, Delivery Speed (Standard vs Express), and Payment Method.
* **Demo Payment Simulation**: Credit/Debit cards (with live test card autofill), EasyPaisa / JazzCash mobile wallet simulation, and Cash on Delivery.
* **Order Placement Celebration**: Canvas confetti burst and automatic generation of tracked order numbers (e.g. `UC-94821`).
* **Itemized Receipt & Print Support**: Live milestone tracking stepper, item breakdown, and print-ready stylesheet formatting.

### 📊 Real-Time Spending Analytics & Metrics
* **Interactive Expenditure Curve**: Responsive SVG visual trajectory mapping 6-month & 1-year shopping expenditure.
* **Category Budget Distribution**: Live progress breakdown of spending across categories.
* **Customer Insights**: Order count, claimed discount savings, and loyalty reward tiers.
* **Data Export**: Single-click JSON export of customer telemetry.

### 👤 Profile & Address Management
* Editable user profile information, multiple saved delivery addresses with default flags, and local storage reset utilities.

### 🌓 Dark Mode & Currency Conversion
* Seamless Dark / Light mode toggle with system preference detection and zero flickering.
* Real-time currency formatting switcher supporting **PKR**, **USD ($)**, and **EUR (€)**.

---

## 🛠️ Technology Stack

* **Core Framework**: React 19 + TypeScript
* **Build Tooling**: Vite 8
* **Styling**: Tailwind CSS 4
* **Routing**: React Router DOM (SPA Architecture)
* **Icons**: Lucide React
* **Micro-interactions**: Canvas Confetti
* **Persistence**: HTML5 Web Storage API (`localStorage`)
* **Deployment Target**: Vercel / Netlify / Cloudflare Pages

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/your-username/urbancart.git
cd urbancart
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` to preview the app.

### 4. Build for production
```bash
npm run build
```

---

## 🌐 Deploy to Vercel

Because UrbanCart is **100% frontend-only** with zero backend or database requirements, it deploys directly to Vercel with zero environment variables needed:

1. Push your repository to GitHub.
2. Import the project in your [Vercel Dashboard](https://vercel.com).
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Click **Deploy**.

---

## 🔒 Storage Architecture

All data persists safely on the client-side:
* `urbancart_cart` — Cart items, quantities, and selected variants
* `urbancart_wishlist` — Saved product IDs
* `urbancart_orders` — Placed demo orders and shipment tracking history
* `urbancart_user_profile` — User addresses, name, reward points, and preferences
* `urbancart_contact_messages` — Contact form submissions
* `urbancart_theme` — Theme preference (`dark` | `light`)
* `urbancart_recent_searches` — Search autocomplete history

---

## ⚠️ Disclaimer

**UrbanCart** is a fictional concept project created by **SH Web Studio** for portfolio and demonstration purposes. Products, prices in PKR, brands (UrbanCore, NovaLine, Luma, Aero, North & Co.), orders, customer information, and business details shown in the application are fictional demo content. No real financial transactions are processed.

---

&copy; 2026 UrbanCart — Concept Project by **SH Web Studio**. All rights reserved.
