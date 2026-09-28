import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import {
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Award,
  Calendar,
  Layers,
  ArrowUpRight,
  Download,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AnalyticsDashboard: React.FC = () => {
  const { orders, userProfile, formatPrice, showToast } = useShop();
  const [activeChartPeriod, setActiveChartPeriod] = useState<'6M' | '1Y'>('6M');
  const [hoveredMonthIndex, setHoveredMonthIndex] = useState<number | null>(null);

  // Compute total spent across all placed demo orders
  const totalSpent = useMemo(() => {
    return orders.reduce((sum, order) => sum + order.total, 0);
  }, [orders]);

  const totalSaved = useMemo(() => {
    return orders.reduce((sum, order) => sum + (order.discountAmount || 0), 0);
  }, [orders]);

  // Compute spend by category
  const categorySpending = useMemo(() => {
    const categoryTotals: Record<string, number> = {
      'Fashion': 0,
      'Electronics': 0,
      'Home & Living': 0,
      'Accessories': 0,
      'Beauty': 0,
      'Lifestyle': 0
    };

    orders.forEach(order => {
      order.items.forEach(item => {
        const cat = item.product.category;
        const itemSpend = item.product.price * item.quantity;
        if (categoryTotals[cat] !== undefined) {
          categoryTotals[cat] += itemSpend;
        } else {
          categoryTotals[cat] = itemSpend;
        }
      });
    });

    const totalCalculated = Object.values(categoryTotals).reduce((a, b) => a + b, 0) || 1;

    return Object.entries(categoryTotals)
      .map(([name, amount]) => ({
        name,
        amount,
        percentage: Math.round((amount / totalCalculated) * 100)
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [orders]);

  // Monthly trends for SVG chart
  const monthlyData = useMemo(() => {
    const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
    // Realistic curve based on orders or seeded base
    const baseAmounts = [6500, 14200, 8900, 18500, 15600, totalSpent > 30000 ? totalSpent - 20000 : 20070];
    return months.map((month, idx) => ({
      month,
      amount: baseAmounts[idx] || 10000
    }));
  }, [totalSpent]);

  const maxMonthAmount = Math.max(...monthlyData.map(d => d.amount), 30000);

  // SVG Line Chart coordinates
  const svgPoints = useMemo(() => {
    const width = 600;
    const height = 180;
    const paddingX = 40;
    const paddingY = 25;
    const usableW = width - paddingX * 2;
    const usableH = height - paddingY * 2;

    const points = monthlyData.map((d, i) => {
      const x = paddingX + (i / (monthlyData.length - 1)) * usableW;
      const y = height - paddingY - (d.amount / maxMonthAmount) * usableH;
      return { x, y, ...d };
    });

    const pathString = points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '');
    const areaString = `${pathString} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

    return { points, pathString, areaString, width, height };
  }, [monthlyData, maxMonthAmount]);

  const handleExportData = () => {
    const report = {
      user: userProfile.name,
      email: userProfile.email,
      tier: userProfile.tier,
      totalSpent,
      totalOrders: orders.length,
      categorySpending,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `urbancart-analytics-export-${Date.now()}.json`;
    a.click();
    showToast('Analytics Exported', 'Your spending metrics data was downloaded as JSON.', 'success');
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Top Header with Metric Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Real-Time Analytics</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white font-heading">
            Spendings &amp; Customer Insights
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            Real-time telemetry of your orders, reward tiers, and category distribution.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportData}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Analytics JSON</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Spent */}
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Purchases</span>
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-neutral-900 dark:text-white font-heading">
              {formatPrice(totalSpent)}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{orders.length} Verified Orders</span>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Orders Completed</span>
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-neutral-900 dark:text-white font-heading">
              {orders.length}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              <span>All delivered &amp; processed</span>
            </div>
          </div>
        </div>

        {/* Savings & Discounts */}
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Discounts Claimed</span>
            <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-neutral-900 dark:text-white font-heading">
              {formatPrice(totalSaved)}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-purple-600 dark:text-purple-400 mt-1 font-medium">
              <span>Promo codes &amp; sales applied</span>
            </div>
          </div>
        </div>

        {/* Loyalty Tier */}
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-neutral-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Loyalty Rewards</span>
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-neutral-900 dark:text-white font-heading">
              {userProfile.rewardPoints} pts
            </div>
            <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 mt-1 font-semibold">
              <span>{userProfile.tier}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Spend History SVG Line Chart (2 Cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h4 className="text-base font-bold text-neutral-900 dark:text-white font-heading">
                Monthly Spending Trajectory
              </h4>
              <p className="text-xs text-neutral-500">Expenditure trends across recent shopping periods</p>
            </div>
            <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg self-start">
              <button
                onClick={() => setActiveChartPeriod('6M')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  activeChartPeriod === '6M'
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                6 Months
              </button>
              <button
                onClick={() => setActiveChartPeriod('1Y')}
                className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  activeChartPeriod === '1Y'
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                1 Year
              </button>
            </div>
          </div>

          {/* SVG Visual Canvas */}
          <div className="relative w-full h-56 flex items-center justify-center">
            <svg
              viewBox={`0 0 ${svgPoints.width} ${svgPoints.height}`}
              className="w-full h-full overflow-visible"
            >
              <defs>
                <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0.25, 0.5, 0.75, 1].map((factor, i) => (
                <line
                  key={i}
                  x1="30"
                  y1={svgPoints.height - 25 - factor * (svgPoints.height - 50)}
                  x2={svgPoints.width - 30}
                  y2={svgPoints.height - 25 - factor * (svgPoints.height - 50)}
                  stroke="currentColor"
                  className="text-neutral-100 dark:text-neutral-800"
                  strokeDasharray="4 4"
                />
              ))}

              {/* Shaded Area */}
              <path d={svgPoints.areaString} fill="url(#spendGradient)" />

              {/* Line */}
              <path
                d={svgPoints.pathString}
                fill="none"
                stroke="#2563EB"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Interactive Points */}
              {svgPoints.points.map((p, idx) => (
                <g key={idx}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={hoveredMonthIndex === idx ? 6 : 4}
                    className="fill-white dark:fill-neutral-900 stroke-blue-600 stroke-2 cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredMonthIndex(idx)}
                    onMouseLeave={() => setHoveredMonthIndex(null)}
                  />
                  {/* Labels on X axis */}
                  <text
                    x={p.x}
                    y={svgPoints.height - 5}
                    textAnchor="middle"
                    className="text-[10px] font-semibold fill-neutral-400 select-none"
                  >
                    {p.month}
                  </text>
                </g>
              ))}
            </svg>

            {/* Hover Tooltip */}
            {hoveredMonthIndex !== null && (
              <div
                className="absolute -top-4 bg-neutral-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg pointer-events-none transition-all"
                style={{
                  left: `${(svgPoints.points[hoveredMonthIndex].x / svgPoints.width) * 100}%`,
                  transform: 'translateX(-50%)'
                }}
              >
                <div className="font-bold">{svgPoints.points[hoveredMonthIndex].month} 2026</div>
                <div className="text-blue-400 font-mono">{formatPrice(svgPoints.points[hoveredMonthIndex].amount)}</div>
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
              <span>Verified Customer Spend</span>
            </span>
            <span>Average: {formatPrice(Math.round(totalSpent / Math.max(orders.length, 1)))} / order</span>
          </div>
        </div>

        {/* Right: Category Distribution Breakdown (1 Col) */}
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-bold text-neutral-900 dark:text-white font-heading">
                Category Distribution
              </h4>
              <Layers className="w-4 h-4 text-neutral-400" />
            </div>
            <p className="text-xs text-neutral-500 mb-5">
              Where your shopping budget is concentrated
            </p>

            {/* Progress Bars */}
            <div className="flex flex-col gap-3.5">
              {categorySpending.map((cat, idx) => (
                <div key={cat.name} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">{cat.name}</span>
                    <span className="font-mono text-neutral-500 dark:text-neutral-400">{cat.percentage}% ({formatPrice(cat.amount)})</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        idx === 0
                          ? 'bg-blue-600'
                          : idx === 1
                          ? 'bg-emerald-500'
                          : idx === 2
                          ? 'bg-purple-500'
                          : idx === 3
                          ? 'bg-amber-500'
                          : 'bg-neutral-400'
                      }`}
                      style={{ width: `${Math.max(cat.percentage, 5)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <Link
              to="/shop"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-between"
            >
              <span>Explore recommended categories</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Orders Timeline Summary */}
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-base font-bold text-neutral-900 dark:text-white font-heading">
              Recent Order Ledger
            </h4>
            <p className="text-xs text-neutral-500">Live order status and dispatch log</p>
          </div>
          <Link
            to="/shop"
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Create New Order
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-100 dark:border-neutral-800 text-neutral-400 text-xs uppercase tracking-wider">
                <th className="pb-3 font-semibold">Order ID</th>
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Items</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Payment</th>
                <th className="pb-3 font-semibold text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 text-xs sm:text-sm">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="py-3.5 font-mono font-bold text-neutral-900 dark:text-white">
                    {order.orderNumber}
                  </td>
                  <td className="py-3.5 text-neutral-500">
                    {new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="py-3.5 text-neutral-700 dark:text-neutral-300">
                    {order.items.map(i => i.product.name).join(', ').slice(0, 32)}
                    {order.items.length > 1 ? '...' : ''}
                  </td>
                  <td className="py-3.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" />
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3.5 uppercase font-mono text-[11px] text-neutral-500">
                    {order.paymentMethod}
                  </td>
                  <td className="py-3.5 text-right font-bold text-neutral-900 dark:text-white">
                    {formatPrice(order.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
