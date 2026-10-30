"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  ChevronDown,
  CircleDollarSign,
  Eye,
  IndianRupee,
  TrendingUp,
} from "lucide-react";

type Period = "1W" | "1M" | "3M" | "6M" | "1Y";
type HoldingFilter = "All" | "Profit" | "Loss";

interface Holding {
  name: string;
  symbol: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  allocation: number;
}

const holdings: Holding[] = [
  {
    name: "Tata Motors",
    symbol: "TATAMOTORS",
    quantity: 20,
    averagePrice: 920.5,
    currentPrice: 985.4,
    allocation: 21.5,
  },
  {
    name: "HDFC Bank",
    symbol: "HDFCBANK",
    quantity: 15,
    averagePrice: 1680.25,
    currentPrice: 1742.25,
    allocation: 18.2,
  },
  {
    name: "Reliance Industries",
    symbol: "RELIANCE",
    quantity: 10,
    averagePrice: 2820.4,
    currentPrice: 2945.6,
    allocation: 25.4,
  },
  {
    name: "Infosys",
    symbol: "INFY",
    quantity: 12,
    averagePrice: 1620.8,
    currentPrice: 1586.8,
    allocation: 16.1,
  },
  {
    name: "ICICI Bank",
    symbol: "ICICIBANK",
    quantity: 18,
    averagePrice: 1210.35,
    currentPrice: 1284.35,
    allocation: 18.8,
  },
];

const performanceData: Record<Period, number[]> = {
  "1W": [28, 34, 31, 42, 38, 49, 45, 58, 53, 65, 61, 72],
  "1M": [22, 30, 27, 39, 35, 48, 43, 55, 51, 66, 61, 78],
  "3M": [18, 25, 22, 35, 31, 44, 40, 54, 49, 64, 59, 76],
  "6M": [15, 23, 20, 33, 29, 43, 39, 52, 48, 63, 58, 82],
  "1Y": [12, 19, 17, 29, 26, 40, 36, 51, 46, 62, 57, 85],
};

const allocation = [
  { name: "Energy", percentage: 25.4, color: "#00a878" },
  { name: "Automobile", percentage: 21.5, color: "#3caa92" },
  { name: "Banking", percentage: 37.0, color: "#79cbb0" },
  { name: "Technology", percentage: 16.1, color: "#b1e4d1" },
];

const formatCurrency = (value: number) =>
  value.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  });

export default function PortfolioPage() {
  const [period, setPeriod] = useState<Period>("1M");
  const [filter, setFilter] = useState<HoldingFilter>("All");

  const totalInvested = holdings.reduce(
    (total, holding) => total + holding.averagePrice * holding.quantity,
    0,
  );

  const currentValue = holdings.reduce(
    (total, holding) => total + holding.currentPrice * holding.quantity,
    0,
  );

  const totalReturns = currentValue - totalInvested;
  const returnPercentage = (totalReturns / totalInvested) * 100;

  const filteredHoldings = useMemo(() => {
    return holdings.filter((holding) => {
      const profit =
        (holding.currentPrice - holding.averagePrice) * holding.quantity;

      if (filter === "Profit") return profit >= 0;
      if (filter === "Loss") return profit < 0;
      return true;
    });
  }, [filter]);

  const chartPoints = performanceData[period]
    .map((value, index) => {
      const x = (index / 11) * 700;
      const y = 180 - value * 1.65;
      return `${x},${y}`;
    })
    .join(" ");

  const periods: Period[] = ["1W", "1M", "3M", "6M", "1Y"];

  return (
    <div className="space-y-6 pb-8">
      {/* Page Heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#00a878]">
            <BriefcaseBusiness size={15} />
            Investment overview
          </div>

          <h1 className="mt-1 text-2xl font-bold text-[#17231d]">
            My Portfolio
          </h1>

          <p className="mt-1 text-sm text-[#718078]">
            Track your investments, returns and asset allocation.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-lg border border-[#dcefe6] bg-[#f0fbf6] px-3 py-2 text-xs font-semibold text-[#00a878]">
          <span className="h-2 w-2 rounded-full bg-[#00a878]" />
          Sample portfolio data
        </div>
      </section>

      {/* Portfolio Summary */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-[#e7ece9] bg-white p-5 shadow-[0_4px_18px_rgba(20,45,35,0.03)]">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-[#718078]">
              Current Portfolio Value
            </p>
            <div className="rounded-lg bg-[#e9f8f2] p-2 text-[#00a878]">
              <BriefcaseBusiness size={18} />
            </div>
          </div>
          <p className="mt-4 text-2xl font-bold text-[#17231d]">
            {formatCurrency(currentValue)}
          </p>
          <p className="mt-2 text-xs text-[#8a9890]">
            Total market value of holdings
          </p>
        </div>

        <div className="rounded-xl border border-[#e7ece9] bg-white p-5 shadow-[0_4px_18px_rgba(20,45,35,0.03)]">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-[#718078]">Total Invested</p>
            <div className="rounded-lg bg-[#e9f8f2] p-2 text-[#00a878]">
              <IndianRupee size={18} />
            </div>
          </div>
          <p className="mt-4 text-2xl font-bold text-[#17231d]">
            {formatCurrency(totalInvested)}
          </p>
          <p className="mt-2 text-xs text-[#8a9890]">
            Amount invested in your holdings
          </p>
        </div>

        <div className="rounded-xl border border-[#e7ece9] bg-white p-5 shadow-[0_4px_18px_rgba(20,45,35,0.03)]">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-[#718078]">Total Returns</p>
            <div className="rounded-lg bg-[#e9f8f2] p-2 text-[#00a878]">
              <TrendingUp size={18} />
            </div>
          </div>
          <p className="mt-4 text-2xl font-bold text-[#00a878]">
            +{formatCurrency(totalReturns)}
          </p>
          <p className="mt-2 text-xs font-semibold text-[#00a878]">
            +{returnPercentage.toFixed(2)}% overall return
          </p>
        </div>

        <div className="rounded-xl border border-[#e7ece9] bg-white p-5 shadow-[0_4px_18px_rgba(20,45,35,0.03)]">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-[#718078]">
              Active Holdings
            </p>
            <div className="rounded-lg bg-[#e9f8f2] p-2 text-[#00a878]">
              <ChartNoAxesCombined size={18} />
            </div>
          </div>
          <p className="mt-4 text-2xl font-bold text-[#17231d]">
            {holdings.length}
          </p>
          <p className="mt-2 text-xs text-[#8a9890]">
            Different stocks in your portfolio
          </p>
        </div>
      </section>

      {/* Performance Chart */}
      <section className="rounded-2xl border border-[#e7ece9] bg-white p-5 shadow-[0_4px_18px_rgba(20,45,35,0.04)]">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-[#e9f8f2] p-2 text-[#00a878]">
                <ChartNoAxesCombined size={18} />
              </div>
              <h2 className="text-base font-bold text-[#17231d]">
                Portfolio Performance
              </h2>
            </div>

            <p className="mt-4 text-2xl font-bold text-[#17231d]">
              {formatCurrency(currentValue)}
            </p>

            <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-[#00a878]">
              <ArrowUpRight size={14} />+{formatCurrency(totalReturns)} (
              {returnPercentage.toFixed(2)}%)
              <span className="font-normal text-[#929d96]">
                overall returns
              </span>
            </p>
          </div>

          <div className="flex flex-wrap gap-1 rounded-lg bg-[#f5f8f6] p-1">
            {periods.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setPeriod(item)}
                className={`rounded-md px-3 py-2 text-xs font-semibold transition ${
                  period === item
                    ? "bg-white text-[#00a878] shadow-sm"
                    : "text-[#718078] hover:text-[#17231d]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 w-full overflow-hidden">
          <svg
            viewBox="0 0 700 200"
            preserveAspectRatio="none"
            className="h-52 w-full"
            role="img"
            aria-label={`Illustrative portfolio performance chart for ${period}`}
          >
            {[30, 75, 120, 165].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="700"
                y2={y}
                stroke="#edf1ee"
                strokeDasharray="4 5"
              />
            ))}

            <polyline
              points={chartPoints}
              fill="none"
              stroke="#00a878"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />

            <circle
              cx="700"
              cy={180 - performanceData[period][11] * 1.65}
              r="5"
              fill="#00a878"
              stroke="white"
              strokeWidth="3"
            />
          </svg>

          <div className="mt-2 flex justify-between text-[11px] text-[#929d96]">
            <span>Start</span>
            <span>{period} ago</span>
            <span>Current</span>
          </div>
        </div>

        <p className="mt-3 text-[11px] text-[#929d96]">
          Illustrative performance visualization. Historical chart data will be
          connected to the backend later.
        </p>
      </section>

      {/* Allocation */}
      <section className="rounded-2xl border border-[#e7ece9] bg-white p-5 shadow-[0_4px_18px_rgba(20,45,35,0.04)]">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-[#e9f8f2] p-2 text-[#00a878]">
            <CircleDollarSign size={18} />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#17231d]">
              Asset Allocation
            </h2>
            <p className="mt-1 text-xs text-[#718078]">
              Distribution of your portfolio across sectors.
            </p>
          </div>
        </div>

        <div className="mt-5 flex h-3 w-full overflow-hidden rounded-full bg-[#edf1ee]">
          {allocation.map((item) => (
            <div
              key={item.name}
              style={{
                width: `${item.percentage}%`,
                backgroundColor: item.color,
              }}
              title={`${item.name}: ${item.percentage}%`}
            />
          ))}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {allocation.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <div className="min-w-0">
                <p className="text-xs font-medium text-[#718078]">
                  {item.name}
                </p>
                <p className="mt-1 text-sm font-bold text-[#17231d]">
                  {item.percentage}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Holdings */}
      <section className="rounded-2xl border border-[#e7ece9] bg-white p-5 shadow-[0_4px_18px_rgba(20,45,35,0.04)]">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-base font-bold text-[#17231d]">
              Your Holdings
            </h2>
            <p className="mt-1 text-xs text-[#718078]">
              View the stocks currently included in your portfolio.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-[#e7ece9] px-3 py-2 text-xs font-semibold text-[#53645a] transition hover:bg-[#f7faf8]"
          >
            <Eye size={15} />
            View details
            <ChevronDown size={14} />
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-2 border-b border-[#edf1ee] pb-3">
          {(["All", "Profit", "Loss"] as HoldingFilter[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                filter === item
                  ? "bg-[#e9f8f2] text-[#00a878]"
                  : "text-[#718078] hover:bg-[#f5f8f6]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-170 text-left">
            <thead>
              <tr className="border-b border-[#edf1ee] text-[11px] uppercase tracking-wide text-[#929d96]">
                <th className="pb-3 pr-4 font-semibold">Company</th>
                <th className="pb-3 pr-4 font-semibold">Quantity</th>
                <th className="pb-3 pr-4 font-semibold">Avg. Price</th>
                <th className="pb-3 pr-4 font-semibold">Current Price</th>
                <th className="pb-3 pr-4 font-semibold">Returns</th>
                <th className="pb-3 font-semibold">Return %</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#edf1ee]">
              {filteredHoldings.map((holding) => {
                const invested = holding.averagePrice * holding.quantity;
                const value = holding.currentPrice * holding.quantity;
                const profit = value - invested;
                const percentage = (profit / invested) * 100;
                const positive = profit >= 0;

                return (
                  <tr
                    key={holding.symbol}
                    className="transition hover:bg-[#fbfdfb]"
                  >
                    <td className="py-4 pr-4">
                      <p className="text-sm font-semibold text-[#17231d]">
                        {holding.name}
                      </p>
                      <p className="mt-0.5 text-xs text-[#929d96]">
                        {holding.symbol}
                      </p>
                    </td>

                    <td className="py-4 pr-4 text-sm text-[#53645a]">
                      {holding.quantity}
                    </td>

                    <td className="py-4 pr-4 text-sm text-[#53645a]">
                      {formatCurrency(holding.averagePrice)}
                    </td>

                    <td className="py-4 pr-4 text-sm font-semibold text-[#17231d]">
                      {formatCurrency(holding.currentPrice)}
                    </td>

                    <td
                      className={`py-4 pr-4 text-sm font-semibold ${
                        positive ? "text-[#00a878]" : "text-[#d94c4c]"
                      }`}
                    >
                      {positive ? "+" : ""}
                      {formatCurrency(profit)}
                    </td>

                    <td className="py-4">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold ${
                          positive ? "text-[#00a878]" : "text-[#d94c4c]"
                        }`}
                      >
                        {positive ? (
                          <ArrowUpRight size={14} />
                        ) : (
                          <ArrowDownRight size={14} />
                        )}
                        {positive ? "+" : ""}
                        {percentage.toFixed(2)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredHoldings.length === 0 && (
            <p className="py-10 text-center text-sm text-[#929d96]">
              No holdings found for this filter.
            </p>
          )}
        </div>
      </section>

      {/* Disclaimer */}
      <div className="rounded-xl border border-[#f0eadb] bg-[#fffdf7] p-3 text-xs leading-5 text-[#8a7a57]">
        All portfolio balances, holdings and performance values are illustrative
        sample data for frontend development. They do not represent an actual
        investment account.
      </div>
    </div>
  );
}
